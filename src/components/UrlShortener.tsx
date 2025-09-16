import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Link, ExternalLink } from "lucide-react";

export const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateShortUrl = () => {
    if (!originalUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    // Validate URL
    try {
      new URL(originalUrl);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call - in real implementation, this would call a URL shortening service
    setTimeout(() => {
      const shortCode = customAlias || Math.random().toString(36).substring(2, 8);
      const shortened = `https://short.ly/${shortCode}`;
      setShortUrl(shortened);
      setIsGenerating(false);
      
      toast({
        title: "URL Shortened!",
        description: "Your short URL has been generated successfully",
      });
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    });
  };

  const openUrl = () => {
    window.open(shortUrl, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-large border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-2xl bg-gradient-primary w-fit mb-4">
            <Link className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-hero bg-clip-text text-transparent">
            URL Shortener
          </CardTitle>
          <p className="text-muted-foreground">
            Create short, shareable links from long URLs
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Original URL</label>
              <Input
                type="url"
                placeholder="https://example.com/very-long-url..."
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Custom Alias (Optional)</label>
              <Input
                type="text"
                placeholder="my-custom-link"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave blank for auto-generated short code
              </p>
            </div>
            
            <Button 
              onClick={generateShortUrl} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Shorten URL"}
            </Button>
          </div>

          {shortUrl && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
              <h3 className="font-semibold">Your Short URL</h3>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={shortUrl}
                  className="flex-1 bg-background"
                />
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={openUrl}>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Original: {originalUrl}</p>
                <p>Shortened: {shortUrl}</p>
                <p className="text-xs mt-2">
                  Note: This is a demo implementation. In production, this would integrate with a real URL shortening service.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};