export default function SetupScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-card-background rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-foreground mb-4">Welcome to ForumNex</h1>
        <p className="text-muted-foreground mb-6">
          Let's get your forum set up. You'll need to configure a few things before you can start using the platform.
        </p>
        <button
          onClick={() => window.location.href = '/setup'}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
        >
          Start Setup
        </button>
      </div>
    </div>
  );
} 