import { Card } from "@/components/ui/card";

const TutorialHeader = () => {
  return (
    <Card className="border-b border-border bg-background shadow-none rounded-none">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Kustomize Interactive Tutorial
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn Kustomize through hands-on examples and interactive demonstrations. 
            Master configuration management for Kubernetes applications.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TutorialHeader;