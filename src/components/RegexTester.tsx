import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Search, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const testRegex = () => {
    try {
      setError("");
      if (!pattern.trim()) {
        setError("Please enter a regex pattern");
        setIsValid(false);
        return;
      }

      const regex = new RegExp(pattern, flags);
      setIsValid(true);

      if (!testString.trim()) {
        setMatches([]);
        return;
      }

      const allMatches: RegExpMatchArray[] = [];
      let match;
      
      if (flags.includes('g')) {
        const globalRegex = new RegExp(pattern, flags);
        while ((match = globalRegex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === globalRegex.lastIndex) {
            globalRegex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          allMatches.push(match);
        }
      }

      setMatches(allMatches);
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
      setMatches([]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Copied to clipboard",
    });
  };

  const clearAll = () => {
    setPattern("");
    setTestString("");
    setMatches([]);
    setError("");
    setIsValid(true);
  };

  const commonPatterns = [
    { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
    { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-\\s]?\\d{3}[-\\s]?\\d{4}" },
    { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)" },
    { name: "IP Address", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b" },
    { name: "Hex Color", pattern: "#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}" },
    { name: "Credit Card", pattern: "\\b(?:\\d{4}[-\\s]?){3}\\d{4}\\b" },
  ];

  const flagOptions = [
    { value: "g", label: "Global", description: "Find all matches" },
    { value: "i", label: "Case Insensitive", description: "Ignore case" },
    { value: "m", label: "Multiline", description: "^ and $ match line breaks" },
    { value: "s", label: "Dot All", description: ". matches newlines" },
    { value: "u", label: "Unicode", description: "Unicode support" },
    { value: "y", label: "Sticky", description: "Match from lastIndex" },
  ];

  return (
    <>
      <Helmet>
        <title>Regex Tester & Validator - Professional Web Tools Suite</title>
        <meta name="description" content="Test and validate regular expressions online. Real-time regex testing with match highlighting and common pattern examples." />
        <meta name="keywords" content="regex tester, regular expression, pattern matching, regex validator, regex tool, developer tools" />
        <link rel="canonical" href="https://webtoolssuite.com/regex-tester" />
      </Helmet>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-slide-down">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-hero shadow-glow-intense animate-float">
                <Search className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-animated bg-clip-text text-transparent">
              Regex Tester & Validator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Test and validate regular expressions with real-time matching and detailed results.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Pattern Input */}
            <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-scale-in">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary animate-wiggle" />
                Regular Expression Pattern
                {isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-500 animate-pulse-glow" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-destructive animate-shake" />
                )}
              </h2>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-muted-foreground">/</span>
                <Input
                  placeholder="Enter your regex pattern (e.g., \d+|[a-z]+)"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="font-mono flex-1 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                />
                <span className="text-muted-foreground">/</span>
                <Input
                  placeholder="flags"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-20 font-mono focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive mb-4 animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Flags Selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Flags:</h3>
                <div className="flex flex-wrap gap-2">
                  {flagOptions.map((flag) => (
                    <Badge
                      key={flag.value}
                      variant={flags.includes(flag.value) ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        if (flags.includes(flag.value)) {
                          setFlags(flags.replace(flag.value, ''));
                        } else {
                          setFlags(flags + flag.value);
                        }
                      }}
                    >
                      {flag.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={testRegex}
                className="bg-gradient-primary hover:bg-gradient-hero hover:scale-105 transition-all duration-300 mr-3"
              >
                Test Regex
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAll}
                className="hover:scale-105 transition-all duration-300"
              >
                Clear All
              </Button>
            </Card>

            {/* Test String Input */}
            <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-slide-up">
              <h2 className="text-xl font-semibold mb-4">Test String</h2>
              <Textarea
                placeholder="Enter text to test against your regex pattern..."
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="min-h-[150px] mb-4 font-mono text-sm focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
            </Card>

            {/* Results */}
            {matches.length > 0 && (
              <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Matches ({matches.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(matches.map(m => m[0]).join('\n'))}
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {matches.map((match, index) => (
                    <Card key={index} className="p-4 bg-muted/50 border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="animate-pulse-glow">
                          Match {index + 1}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(match[0])}
                          className="hover:scale-110 transition-all duration-300"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-sm space-y-1">
                        <div><strong>Match:</strong> <code className="bg-background px-1 rounded">{match[0]}</code></div>
                        <div><strong>Position:</strong> {match.index} - {(match.index || 0) + match[0].length - 1}</div>
                        {match.length > 1 && (
                          <div>
                            <strong>Groups:</strong>
                            <div className="ml-4 space-y-1">
                              {match.slice(1).map((group, groupIndex) => (
                                <div key={groupIndex}>
                                  Group {groupIndex + 1}: <code className="bg-background px-1 rounded">{group || 'undefined'}</code>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Common Patterns */}
            <Card className="p-6 bg-gradient-subtle border-primary/20 animate-fade-in-slow">
              <h3 className="text-lg font-semibold mb-4 text-primary">Common Regex Patterns</h3>
              <Tabs defaultValue="patterns">
                <TabsList>
                  <TabsTrigger value="patterns">Patterns</TabsTrigger>
                  <TabsTrigger value="syntax">Syntax Guide</TabsTrigger>
                </TabsList>
                
                <TabsContent value="patterns" className="mt-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    {commonPatterns.map((item, index) => (
                      <Card key={index} className="p-3 bg-background/50 cursor-pointer hover:bg-background/80 transition-all duration-300 hover:scale-[1.02]"
                            onClick={() => setPattern(item.pattern)}>
                        <div className="font-medium text-sm mb-1">{item.name}</div>
                        <code className="text-xs text-muted-foreground break-all">{item.pattern}</code>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="syntax" className="mt-4">
                  <div className="grid gap-4 md:grid-cols-2 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Character Classes</h4>
                      <div className="space-y-1 text-muted-foreground">
                        <div><code>\d</code> - Digits (0-9)</div>
                        <div><code>\w</code> - Word characters</div>
                        <div><code>\s</code> - Whitespace</div>
                        <div><code>.</code> - Any character</div>
                        <div><code>[abc]</code> - Any of a, b, or c</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Quantifiers</h4>
                      <div className="space-y-1 text-muted-foreground">
                        <div><code>*</code> - 0 or more</div>
                        <div><code>+</code> - 1 or more</div>
                        <div><code>?</code> - 0 or 1</div>
                        <div><code>{'{n}'}</code> - Exactly n times</div>
                        <div><code>{'{n,m}'}</code> - Between n and m</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};