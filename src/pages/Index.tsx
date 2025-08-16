const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Floating animated bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-foreground/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-foreground/8 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-foreground/12 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
        <div className="absolute top-60 left-1/3 w-5 h-5 bg-foreground/6 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-foreground/10 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}></div>
        <div className="absolute top-32 right-1/3 w-7 h-7 bg-foreground/5 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4.2s' }}></div>
      </div>

      <div className="text-center space-y-12 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground animate-fade-in">
          KUSTOMIZED CLUSTER
        </h1>
        
        <div className="text-xl md:text-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
          this is the dev environment
        </div>
      </div>
    </div>
  );
};

export default Index;
