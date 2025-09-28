import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Code, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const XMLFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ elements: 0, attributes: 0, size: 0 });
  const { toast } = useToast();

  const formatXML = (xml: string, indent: string = "  "): string => {
    let formatted = "";
    let level = 0;
    const tokens = xml.split(/(<[^>]*>)/);

    tokens.forEach(token => {
      if (token.trim()) {
        if (token.startsWith('</')) {
          level--;
          formatted += indent.repeat(level) + token.trim() + '\n';
        } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<?') && !token.startsWith('<!--')) {
          formatted += indent.repeat(level) + token.trim() + '\n';
          level++;
        } else if (token.startsWith('<')) {
          formatted += indent.repeat(level) + token.trim() + '\n';
        } else {
          const content = token.trim();
          if (content) {
            formatted += indent.repeat(level) + content + '\n';
          }
        }
      }
    });

    return formatted.trim();
  };

  const minifyXML = (xml: string): string => {
    return xml
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const validateXML = (xml: string): boolean => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");
      const parserError = doc.querySelector("parsererror");
      return !parserError;
    } catch {
      return false;
    }
  };

  const getXMLStats = (xml: string) => {
    const elements = (xml.match(/<[^>!?][^>]*>/g) || []).length;
    const attributes = (xml.match(/\s\w+\s*=/g) || []).length;
    const size = new Blob([xml]).size;
    return { elements, attributes, size };
  };

  const processXML = (action: "format" | "minify") => {
    try {
      setError("");
      if (!input.trim()) {
        setError("Please enter XML content");
        setIsValid(false);
        return;
      }

      const isValidXML = validateXML(input);
      setIsValid(isValidXML);

      if (!isValidXML) {
        setError("Invalid XML syntax");
        return;
      }

      let result = "";
      if (action === "format") {
        result = formatXML(input);
      } else {
        result = minifyXML(input);
      }

      setOutput(result);
      setStats(getXMLStats(result));
    } catch (err) {
      setError("Error processing XML: " + (err as Error).message);
      setIsValid(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "XML copied to clipboard",
    });
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(true);
    setStats({ elements: 0, attributes: 0, size: 0 });
  };

  const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
<book id="1" category="fiction">
<title>The Great Gatsby</title>
<author>F. Scott Fitzgerald</author>
<year>1925</year>
<price currency="USD">12.99</price>
</book>
<book id="2" category="science">
<title>A Brief History of Time</title>
<author>Stephen Hawking</author>
<year>1988</year>
<price currency="USD">15.99</price>
</book>
</bookstore>`;

  return (
    <>
      <Helmet>
        <title>XML Formatter & Validator - Professional Web Tools Suite</title>
        <meta name="description" content="Format, validate, and minify XML documents online. Real-time XML syntax validation with statistics and error reporting." />
        <meta name="keywords" content="xml formatter, xml validator, xml minifier, xml beautifier, xml parser, developer tools" />
        <link rel="canonical" href="https://webtoolssuite.com/xml-formatter" />
      </Helmet>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-slide-down">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-hero shadow-glow-intense animate-float">
                <FileText className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-animated bg-clip-text text-transparent">
              XML Formatter & Validator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Format, validate, and minify XML documents with real-time syntax checking and statistics.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Section */}
            <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary animate-wiggle" />
                  XML Input
                  {input && (
                    isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500 animate-pulse-glow" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive animate-shake" />
                    )
                  )}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInput(sampleXML)}
                  className="hover:scale-110 transition-all duration-300"
                >
                  Load Sample
                </Button>
              </div>
              
              <Textarea
                placeholder="Paste your XML content here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[400px] mb-4 font-mono text-sm focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              
              {error && (
                <div className="flex items-center gap-2 text-destructive mb-4 animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                <Button 
                  onClick={() => processXML("format")}
                  className="bg-gradient-primary hover:bg-gradient-hero hover:scale-105 transition-all duration-300"
                >
                  Format XML
                </Button>
                <Button 
                  onClick={() => processXML("minify")}
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300"
                >
                  Minify XML
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
            <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary animate-wiggle" />
                  Formatted Output
                </h2>
                {output && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(output)}
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
              
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted XML will appear here..."
                className="min-h-[400px] mb-4 font-mono text-sm bg-muted/50 border border-border/50"
              />

              {/* Statistics */}
              {output && (
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="animate-pulse-glow">
                    {stats.elements} Elements
                  </Badge>
                  <Badge variant="secondary" className="animate-pulse-glow">
                    {stats.attributes} Attributes
                  </Badge>
                  <Badge variant="secondary" className="animate-pulse-glow">
                    {stats.size} bytes
                  </Badge>
                </div>
              )}
            </Card>
          </div>

          {/* XML Features */}
          <Card className="p-6 bg-gradient-subtle border-primary/20 animate-fade-in-slow mt-6">
            <h3 className="text-lg font-semibold mb-4 text-primary">XML Processing Features</h3>
            <Tabs defaultValue="features">
              <TabsList>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="validation">Validation Rules</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Formatting Features</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Pretty print with proper indentation</div>
                      <div>• Syntax validation and error reporting</div>
                      <div>• Minification for size optimization</div>
                      <div>• Element and attribute counting</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Supported Features</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• XML declarations</div>
                      <div>• Comments and processing instructions</div>
                      <div>• Self-closing tags</div>
                      <div>• Nested elements and attributes</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="validation" className="mt-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Well-formed XML Requirements:</strong></p>
                  <div className="ml-4 space-y-1">
                    <div>• Must have a root element</div>
                    <div>• All tags must be properly closed</div>
                    <div>• Elements must be properly nested</div>
                    <div>• Attribute values must be quoted</div>
                    <div>• Special characters must be escaped</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Basic XML Structure</h4>
                    <pre className="bg-muted/50 p-3 rounded-lg text-xs overflow-x-auto">
{`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <element attribute="value">Content</element>
  <self-closing-element />
</root>`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
};