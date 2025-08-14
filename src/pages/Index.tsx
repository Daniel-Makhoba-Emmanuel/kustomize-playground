import { useState } from "react";
import TutorialHeader from "@/components/TutorialHeader";
import CodeBlock from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [environment, setEnvironment] = useState<"dev" | "prod">("dev");
  const { toast } = useToast();

  const switchEnvironment = (env: "dev" | "prod") => {
    setEnvironment(env);
    toast({
      description: `Switched to ${env} environment`,
    });
  };

  const devOutput = `apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
  namespace: development
data:
  app.properties: |
    environment=development
    debug=true
    database.url=dev-db.example.com
    log.level=debug
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: development
  labels:
    environment: development
    version: v1.0.0
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
        environment: development
        version: v1.0.0
    spec:
      containers:
      - name: my-app
        image: nginx:1.21-dev
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "32Mi"
            cpu: "100m"
          limits:
            memory: "64Mi"
            cpu: "200m"`;

  const prodOutput = `apiVersion: v1
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
  replicas: 3
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
            cpu: "500m"`;

  return (
    <div className="min-h-screen bg-background">
      <TutorialHeader environment={environment} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant={environment === "dev" ? "default" : "outline"}
              onClick={() => switchEnvironment("dev")}
            >
              Show Dev Output
            </Button>
            <Button 
              variant={environment === "prod" ? "default" : "outline"}
              onClick={() => switchEnvironment("prod")}
            >
              Show Prod Output
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <CodeBlock 
              code={environment === "dev" ? devOutput : prodOutput}
              language="yaml"
              title={`Merged YAML Output - ${environment.toUpperCase()}`}
              filename={`kustomize-build-${environment}.yaml`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
