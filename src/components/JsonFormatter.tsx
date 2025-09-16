import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, FileJson } from "lucide-react";

export const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormatted(formatted);
      setIsValid(true);
      toast({
        title: "JSON Formatted",
        description: "Your JSON has been successfully formatted and validated.",
      });
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax and try again.",
        variant: "destructive",
      });
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      setIsValid(true);
      toast({
        title: "JSON Minified",
        description: "Your JSON has been minified successfully.",
      });
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax and try again.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    toast({
      title: "Copied!",
      description: "Formatted JSON copied to clipboard.",
    });
  };

  const downloadJson = () => {
    const blob = new Blob([formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="shadow-large border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-2xl bg-gradient-primary w-fit mb-4">
            <FileJson className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-hero bg-clip-text text-transparent">
            JSON Formatter & Validator
          </CardTitle>
          <p className="text-muted-foreground">
            Format, validate, and minify JSON data with syntax highlighting
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Input JSON</h3>
              <Textarea
                placeholder="Paste your JSON here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`min-h-[300px] font-mono text-sm ${!isValid && input ? 'border-destructive' : ''}`}
              />
              <div className="flex gap-2">
                <Button onClick={formatJson} className="flex-1">
                  Format & Validate
                </Button>
                <Button onClick={minifyJson} variant="outline" className="flex-1">
                  Minify
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Formatted Output</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyToClipboard}
                    disabled={!formatted}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={downloadJson}
                    disabled={!formatted}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                readOnly
                value={formatted}
                className="min-h-[300px] font-mono text-sm bg-muted/50"
                placeholder="Formatted JSON will appear here..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};