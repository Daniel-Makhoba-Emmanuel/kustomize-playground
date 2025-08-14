import { useState } from "react";
import TutorialHeader from "@/components/TutorialHeader";
import TutorialStep from "@/components/TutorialStep";
import CodeBlock from "@/components/CodeBlock";
import ApiResponseBox from "@/components/ApiResponseBox";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [apiResponse, setApiResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState<"success" | "error" | "loading" | "idle">("idle");
  const { toast } = useToast();

  const simulateKustomizeBuild = async (stepNumber: number) => {
    setResponseStatus("loading");
    setApiResponse("Processing Kustomize build...");
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate different responses based on step
    const responses = {
      1: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx:1.21
        ports:
        - containerPort: 80`,
      2: `apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
  namespace: production
data:
  app.properties: |
    environment=production
    debug=false
    database.url=prod-db.example.com
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
  labels:
    environment: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
        environment: production
    spec:
      containers:
      - name: my-app
        image: nginx:1.21
        ports:
        - containerPort: 80
        env:
        - name: CONFIG_FILE
          value: /etc/config/app.properties`,
      3: `# Generated resources for production environment
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
  namespace: production
data:
  app.properties: |
    environment=production
    debug=false
    database.url=prod-db.example.com
    log.level=info
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
  labels:
    environment: production
    version: v1.2.0
spec:
  replicas: 5
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
        environment: production
        version: v1.2.0
    spec:
      containers:
      - name: my-app
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"`
    };

    const response = responses[stepNumber as keyof typeof responses] || "Build completed successfully!";
    
    setApiResponse(response);
    setResponseStatus("success");
    
    // Mark step as completed
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    
    toast({
      description: `Step ${stepNumber} completed successfully!`,
    });
  };

  const resetTutorial = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setApiResponse("");
    setResponseStatus("idle");
    toast({
      description: "Tutorial reset successfully",
    });
  };

  const kustomizationYaml = `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml

namePrefix: my-app-
namespace: production

commonLabels:
  app: my-app
  version: v1.0.0`;

  const deploymentYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx:1.21
        ports:
        - containerPort: 80`;

  const overlayKustomization = `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../base

patchesStrategicMerge:
  - deployment-patch.yaml

configMapGenerator:
  - name: app-config
    files:
      - app.properties

replicas:
  - name: my-app-deployment
    count: 3`;

  return (
    <div className="min-h-screen bg-background">
      <TutorialHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tutorial Steps */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Interactive Tutorial</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetTutorial}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>

            <TutorialStep
              stepNumber={1}
              title="Create Basic Kustomization"
              description="Start with a simple kustomization.yaml file that defines your base resources and common configurations."
              active={currentStep === 1}
              completed={completedSteps.includes(1)}
            >
              <CodeBlock 
                code={kustomizationYaml}
                filename="kustomization.yaml"
                title="Base Kustomization"
              />
              <CodeBlock 
                code={deploymentYaml}
                filename="deployment.yaml"
                title="Deployment Resource"
              />
              <Button 
                onClick={() => simulateKustomizeBuild(1)}
                disabled={responseStatus === "loading"}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Run kustomize build
              </Button>
            </TutorialStep>

            <TutorialStep
              stepNumber={2}
              title="Add ConfigMap Generator"
              description="Learn how to generate ConfigMaps dynamically and inject configuration into your applications."
              active={currentStep === 2}
              completed={completedSteps.includes(2)}
            >
              <CodeBlock 
                code={overlayKustomization}
                filename="overlays/production/kustomization.yaml"
                title="Production Overlay"
              />
              <Button 
                onClick={() => simulateKustomizeBuild(2)}
                disabled={responseStatus === "loading"}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Build with ConfigMap
              </Button>
            </TutorialStep>

            <TutorialStep
              stepNumber={3}
              title="Apply Strategic Merge Patches"
              description="Use strategic merge patches to customize resources for specific environments without duplicating configuration."
              active={currentStep === 3}
              completed={completedSteps.includes(3)}
            >
              <CodeBlock 
                code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment
spec:
  replicas: 5
  template:
    spec:
      containers:
      - name: my-app
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"`}
                filename="deployment-patch.yaml"
                title="Strategic Merge Patch"
              />
              <Button 
                onClick={() => simulateKustomizeBuild(3)}
                disabled={responseStatus === "loading"}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Apply Patches
              </Button>
            </TutorialStep>
          </div>

          {/* API Response */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Build Output</h2>
            <ApiResponseBox 
              title="Kustomize Build Result"
              response={apiResponse}
              status={responseStatus}
              statusCode={responseStatus === "success" ? 200 : responseStatus === "error" ? 400 : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
