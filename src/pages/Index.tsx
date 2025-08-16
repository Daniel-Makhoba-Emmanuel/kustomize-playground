const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-12">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground">
          KUSTOMIZED CLUSTER
        </h1>
        
        <div className="space-y-8">
          <div className="text-xl md:text-2xl text-muted-foreground">
            this is the dev environment
          </div>
          
          <div className="text-xl md:text-2xl text-muted-foreground">
            this is the prod environment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
