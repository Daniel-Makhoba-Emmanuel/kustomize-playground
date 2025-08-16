const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Floating animated bubbles - larger and more numerous */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large bubbles */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-foreground/8 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-foreground/6 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-foreground/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
        <div className="absolute top-60 left-1/3 w-18 h-18 bg-foreground/5 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-foreground/9 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}></div>
        <div className="absolute top-32 right-1/3 w-24 h-24 bg-foreground/4 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4.2s' }}></div>
        
        {/* Additional bubbles */}
        <div className="absolute top-80 left-1/4 w-10 h-10 bg-foreground/7 rounded-full animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3.8s' }}></div>
        <div className="absolute bottom-60 right-1/4 w-22 h-22 bg-foreground/6 rounded-full animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.2s' }}></div>
        <div className="absolute top-96 right-16 w-8 h-8 bg-foreground/11 rounded-full animate-bounce" style={{ animationDelay: '2.2s', animationDuration: '2.9s' }}></div>
        <div className="absolute bottom-40 left-1/2 w-16 h-16 bg-foreground/5 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '4.5s' }}></div>
        <div className="absolute top-52 left-16 w-12 h-12 bg-foreground/8 rounded-full animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '3.1s' }}></div>
        <div className="absolute bottom-80 right-1/2 w-18 h-18 bg-foreground/7 rounded-full animate-bounce" style={{ animationDelay: '2.8s', animationDuration: '3.7s' }}></div>
      </div>

      <div className="text-center space-y-12 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-3d animate-fade-in" data-text="KUSTOMIZED CLUSTER">
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
