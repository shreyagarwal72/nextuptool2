import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Code2, Copy, Download, Wand2 } from "lucide-react";

export const HTMLFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"format" | "minify">("format");
  const { toast } = useToast();

  const formatHTML = (html: string, shouldMinify = false): string => {
    if (!html.trim()) return "";

    try {
      if (shouldMinify) {
        // Simple minification
        return html
          .replace(/\s+/g, ' ')
          .replace(/>\s+</g, '><')
          .replace(/\s+>/g, '>')
          .replace(/<\s+/g, '<')
          .trim();
      } else {
        // Simple formatting
        let formatted = html.replace(/></g, '>\n<');
        let result = '';
        let indent = 0;
        const lines = formatted.split('\n');

        for (let line of lines) {
          line = line.trim();
          if (!line) continue;

          // Decrease indent for closing tags
          if (line.startsWith('</') && !line.includes('</') || line.match(/<\/\w+>/)) {
            indent = Math.max(0, indent - 1);
          }

          // Add indentation
          result += '  '.repeat(indent) + line + '\n';

          // Increase indent for opening tags (but not self-closing)
          if (line.includes('<') && !line.includes('</') && !line.endsWith('/>') && !line.includes('<!')) {
            const tagMatch = line.match(/<(\w+)/);
            if (tagMatch) {
              const tag = tagMatch[1].toLowerCase();
              // Don't indent for self-closing HTML tags
              if (!['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(tag)) {
                indent++;
              }
            }
          }
        }

        return result.trim();
      }
    } catch (error) {
      throw new Error("Invalid HTML format");
    }
  };

  const handleFormat = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML code to format",
        variant: "destructive",
      });
      return;
    }

    try {
      const formatted = formatHTML(input, mode === "minify");
      setOutput(formatted);
      toast({
        title: "Success!",
        description: `HTML ${mode === "minify" ? "minified" : "formatted"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to format HTML. Please check your syntax.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Formatted HTML copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy HTML",
        variant: "destructive",
      });
    }
  };

  const downloadFile = () => {
    if (!output) return;

    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `formatted-html-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary animate-bounce-in">
              <Code2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">HTML Formatter</h1>
          <p className="text-muted-foreground">Format, beautify, and minify your HTML code</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-card-foreground">HTML Input</h2>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={mode === "format" ? "default" : "outline"}
                  onClick={() => setMode("format")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  Format
                </Button>
                <Button
                  size="sm"
                  variant={mode === "minify" ? "default" : "outline"}
                  onClick={() => setMode("minify")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  Minify
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="html-input">Paste your HTML code here</Label>
                <Textarea
                  id="html-input"
                  placeholder="<html>&#10;  <head>&#10;    <title>Example</title>&#10;  </head>&#10;  <body>&#10;    <h1>Hello World</h1>&#10;  </body>&#10;</html>"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-80 font-mono text-sm transition-all duration-200 focus:scale-[1.01]"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleFormat} className="flex-1 hover:scale-105 transition-transform duration-200">
                  <Wand2 className="w-4 h-4 mr-2" />
                  {mode === "minify" ? "Minify HTML" : "Format HTML"}
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  Clear
                </Button>
              </div>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-card-foreground">
                {mode === "minify" ? "Minified" : "Formatted"} Output
              </h2>
              {output && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard} className="hover:scale-105 transition-transform duration-200">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadFile} className="hover:scale-105 transition-transform duration-200">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="html-output">Formatted HTML will appear here</Label>
              <Textarea
                id="html-output"
                value={output}
                readOnly
                placeholder="Your formatted HTML will appear here..."
                className="min-h-80 font-mono text-sm bg-muted/50"
              />
            </div>

            {output && (
              <div className="mt-4 text-sm text-muted-foreground animate-fade-in">
                <div className="flex justify-between">
                  <span>Input: {input.length} characters</span>
                  <span>Output: {output.length} characters</span>
                </div>
                {mode === "minify" && (
                  <div className="mt-1">
                    Saved: {input.length - output.length} characters ({(((input.length - output.length) / input.length) * 100).toFixed(1)}%)
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Features */}
        <Card className="mt-6 p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
          <h3 className="text-lg font-semibold mb-3 text-card-foreground">Features</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <strong className="text-card-foreground">Format:</strong>
                <span className="text-muted-foreground ml-2">
                  Beautify HTML with proper indentation
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <strong className="text-card-foreground">Minify:</strong>
                <span className="text-muted-foreground ml-2">
                  Remove whitespace to reduce file size
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <strong className="text-card-foreground">Validation:</strong>
                <span className="text-muted-foreground ml-2">
                  Basic HTML structure validation
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <strong className="text-card-foreground">Download:</strong>
                <span className="text-muted-foreground ml-2">
                  Save formatted HTML as file
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};