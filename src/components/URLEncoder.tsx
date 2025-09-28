import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Link, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const URLEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { toast } = useToast();

  const processURL = () => {
    try {
      if (!input.trim()) {
        toast({
          title: "Error",
          description: "Please enter text to process",
          variant: "destructive",
        });
        return;
      }

      let result = "";
      if (mode === "encode") {
        result = encodeURIComponent(input);
      } else {
        result = decodeURIComponent(input);
      }
      setOutput(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input for URL decoding",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  const swapInputOutput = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <>
      <Helmet>
        <title>URL Encoder & Decoder - Professional Web Tools Suite</title>
        <meta name="description" content="Encode and decode URLs online. Convert special characters for safe URL transmission. Fast, secure URL encoder and decoder tool." />
        <meta name="keywords" content="url encoder, url decoder, uri encoder, percent encoding, url escape, web development tools" />
        <link rel="canonical" href="https://webtoolssuite.com/url-encoder" />
      </Helmet>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-slide-down">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-hero shadow-glow-intense animate-float">
                <Link className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-animated bg-clip-text text-transparent">
              URL Encoder & Decoder
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Encode and decode URLs for safe transmission. Convert special characters to percent-encoded format.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Mode Selection */}
            <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-scale-in">
              <Tabs value={mode} onValueChange={(value) => setMode(value as "encode" | "decode")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="encode" className="transition-all duration-300">
                    URL Encode
                  </TabsTrigger>
                  <TabsTrigger value="decode" className="transition-all duration-300">
                    URL Decode
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="encode" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Encode URL</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert special characters to percent-encoded format for safe URL transmission.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="decode" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Decode URL</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert percent-encoded URLs back to readable format.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Input Section */}
            <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-slide-up">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Link className="w-5 h-5 text-primary animate-wiggle" />
                Input
              </h2>
              <Textarea
                placeholder={mode === "encode" ? "Enter text to encode (e.g., Hello World! @#$%)" : "Enter encoded URL to decode (e.g., Hello%20World%21%20%40%23%24%25)"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] mb-4 font-mono text-sm focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              
              <div className="flex gap-3 flex-wrap">
                <Button 
                  onClick={processURL}
                  className="bg-gradient-primary hover:bg-gradient-hero hover:scale-105 transition-all duration-300"
                >
                  {mode === "encode" ? "Encode URL" : "Decode URL"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={swapInputOutput}
                  className="hover:scale-105 transition-all duration-300"
                  disabled={!output}
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Swap
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearAll}
                  className="hover:scale-105 transition-all duration-300"
                >
                  Clear All
                </Button>
              </div>
            </Card>

            {/* Output Section */}
            {output && (
              <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Link className="w-5 h-5 text-primary animate-wiggle" />
                    Output
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(output)}
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[120px] font-mono text-sm bg-muted/50 border border-border/50"
                />
              </Card>
            )}

            {/* Examples Section */}
            <Card className="p-6 bg-gradient-subtle border-primary/20 animate-fade-in-slow">
              <h3 className="text-lg font-semibold mb-4 text-primary">Common URL Encoding Examples</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Before Encoding:</h4>
                  <div className="bg-muted/50 p-3 rounded-lg text-sm font-mono space-y-1">
                    <div>Hello World!</div>
                    <div>user@example.com</div>
                    <div>50% off sale</div>
                    <div>path/to/file.txt</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">After Encoding:</h4>
                  <div className="bg-muted/50 p-3 rounded-lg text-sm font-mono space-y-1">
                    <div>Hello%20World%21</div>
                    <div>user%40example.com</div>
                    <div>50%25%20off%20sale</div>
                    <div>path%2Fto%2Ffile.txt</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p><strong>Note:</strong> URL encoding is essential when passing data through URLs to ensure special characters don't break the URL structure.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};