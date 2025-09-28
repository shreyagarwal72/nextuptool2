import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertTriangle } from "lucide-react";

interface ToolRedirectProps {
  toolName: string;
  description: string;
  alternativeUrl: string;
  alternativeName: string;
  reason?: string;
}

export const ToolRedirect = ({ 
  toolName, 
  description, 
  alternativeUrl, 
  alternativeName,
  reason = "This tool is currently under maintenance"
}: ToolRedirectProps) => {
  
  const redirectToAlternative = () => {
    window.open(alternativeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-slide-down">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-hero shadow-glow-intense animate-float">
              <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-animated bg-clip-text text-transparent">
            {toolName}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <Card className="p-8 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-scale-in">
          <div className="text-center space-y-6">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Tool Temporarily Unavailable
                </h3>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {reason}. We're redirecting you to a reliable alternative.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">
                Recommended Alternative: {alternativeName}
              </h4>
              <p className="text-muted-foreground">
                We've partnered with trusted third-party tools to ensure you can complete your tasks without interruption.
              </p>
            </div>

            <Button 
              onClick={redirectToAlternative}
              size="lg"
              className="bg-gradient-primary hover:bg-gradient-hero hover:scale-105 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Continue to {alternativeName}
            </Button>

            <div className="text-xs text-muted-foreground">
              <p>This will open {alternativeName} in a new tab</p>
              <p>We'll notify you when our tool is back online</p>
            </div>
          </div>
        </Card>

        <Card className="mt-6 p-4 bg-gradient-subtle border-primary/20 animate-fade-in-slow">
          <h4 className="font-semibold mb-2 text-primary">Why do we redirect?</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• We want to ensure you can always complete your tasks</p>
            <p>• Our recommended alternatives are trusted and reliable</p>
            <p>• We're working to bring all tools back online as soon as possible</p>
            <p>• Your productivity shouldn't be interrupted by technical issues</p>
          </div>
        </Card>
      </div>
    </div>
  );
};