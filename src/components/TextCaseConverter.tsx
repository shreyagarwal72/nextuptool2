import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Type, Copy, ArrowUpDown } from "lucide-react";

export const TextCaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const convertText = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to convert",
        variant: "destructive",
      });
      return;
    }

    const conversions = {
      "UPPER CASE": inputText.toUpperCase(),
      "lower case": inputText.toLowerCase(),
      "Title Case": inputText.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
      "Sentence case": inputText.toLowerCase().replace(/^\w/, c => c.toUpperCase()),
      "camelCase": inputText
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, ''),
      "PascalCase": inputText
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
        .replace(/\s+/g, ''),
      "snake_case": inputText
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w_]/g, ''),
      "kebab-case": inputText
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, ''),
      "CONSTANT_CASE": inputText
        .toUpperCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w_]/g, ''),
      "dot.case": inputText
        .toLowerCase()
        .replace(/\s+/g, '.')
        .replace(/[^\w.]/g, ''),
      "Alternating Case": inputText
        .split('')
        .map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join(''),
      "InVeRsE cAsE": inputText
        .split('')
        .map(char => 
          char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
        )
        .join('')
    };

    setResults(conversions);
    toast({
      title: "Text Converted!",
      description: "All case variations generated successfully",
    });
  };

  const copyText = async (text: string, caseName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${caseName} text copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const clearAll = () => {
    setInputText("");
    setResults({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Type className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Text Case Converter</h1>
          <p className="text-muted-foreground">Convert text between different case formats</p>
        </div>

        <div className="grid gap-6">
          {/* Input Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Input Text</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-text">Text to Convert</Label>
                <Textarea
                  id="input-text"
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={convertText} disabled={!inputText.trim()}>
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Convert Text
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  Clear All
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          {Object.keys(results).length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results).map(([caseName, convertedText]) => (
                <Card key={caseName} className="p-4 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground">{caseName}</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyText(convertedText, caseName)}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <code className="text-sm break-all font-mono text-foreground">
                      {convertedText}
                    </code>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    {convertedText.length} characters
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Info Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h3 className="text-lg font-semibold mb-3 text-card-foreground">Case Types</h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div><strong>UPPER CASE:</strong> ALL LETTERS CAPITALIZED</div>
                <div><strong>lower case:</strong> all letters lowercase</div>
                <div><strong>Title Case:</strong> First Letter Of Each Word Capitalized</div>
                <div><strong>Sentence case:</strong> Only first letter capitalized</div>
                <div><strong>camelCase:</strong> firstWordLowercaseOthersCapitalized</div>
                <div><strong>PascalCase:</strong> AllWordsCapitalizedNoSpaces</div>
              </div>
              <div className="space-y-2">
                <div><strong>snake_case:</strong> words_separated_by_underscores</div>
                <div><strong>kebab-case:</strong> words-separated-by-hyphens</div>
                <div><strong>CONSTANT_CASE:</strong> UPPER_SNAKE_CASE</div>
                <div><strong>dot.case:</strong> words.separated.by.dots</div>
                <div><strong>Alternating Case:</strong> aLtErNaTiNg CaPiTaLs</div>
                <div><strong>InVeRsE cAsE:</strong> oPpOsItE cAsE</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};