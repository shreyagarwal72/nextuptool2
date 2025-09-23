import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Minimize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CSSMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const minifyCSS = () => {
    try {
      // Basic CSS minification
      const minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\s*{\s*/g, '{') // Remove spaces around opening braces
        .replace(/;\s*/g, ';') // Remove spaces after semicolons
        .replace(/\s*}\s*/g, '}') // Remove spaces around closing braces
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .trim();

      setOutput(minified);
      toast({
        title: "CSS Minified Successfully",
        description: `Reduced size by ${((1 - minified.length / input.length) * 100).toFixed(1)}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to minify CSS",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied",
      description: "Minified CSS copied to clipboard",
    });
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>CSS Minifier & Optimizer - Compress CSS Files Online</title>
        <meta name="description" content="Free CSS minifier tool to compress and optimize CSS files. Remove whitespace, comments, and reduce file size for better web performance." />
        <meta name="keywords" content="css minifier, css compressor, css optimizer, minify css, compress css, css tool" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
                <Minimize2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              CSS Minifier & Optimizer
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Compress and optimize your CSS files by removing unnecessary whitespace, comments, and formatting for improved web performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Original CSS</h3>
                <Button variant="outline" size="sm" onClick={minifyCSS} disabled={!input.trim()}>
                  <Minimize2 className="w-4 h-4 mr-2" />
                  Minify
                </Button>
              </div>
              <Textarea
                placeholder="Paste your CSS code here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Minified CSS</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!output}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadFile} disabled={!output}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[400px] font-mono text-sm bg-muted"
                placeholder="Minified CSS will appear here..."
              />
            </Card>
          </div>

          {input && output && (
            <Card className="mt-6 p-4 animate-fade-in">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{input.length}</div>
                  <div className="text-sm text-muted-foreground">Original Size</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">{output.length}</div>
                  <div className="text-sm text-muted-foreground">Minified Size</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">
                    {((1 - output.length / input.length) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Size Reduction</div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};