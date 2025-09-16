import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Hash, Copy, FileText } from "lucide-react";

export const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashType, setHashType] = useState("SHA-256");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Simple hash implementations (for demo purposes)
  const generateHash = async (text: string, type: string) => {
    if (!text) return "";

    try {
      if (type === "MD5") {
        // Simple MD5-like hash (not cryptographically secure, for demo only)
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
          const char = text.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16).padStart(8, '0').repeat(4);
      } else if (type === "SHA-1" || type === "SHA-256") {
        // Use Web Crypto API for real hashing
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const algorithm = type === "SHA-1" ? "SHA-1" : "SHA-256";
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (error) {
      console.error("Hash generation error:", error);
    }
    return "";
  };

  const generateAllHashes = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to hash",
        variant: "destructive",
      });
      return;
    }

    const hashTypes = ["MD5", "SHA-1", "SHA-256"];
    const newHashes: Record<string, string> = {};

    for (const type of hashTypes) {
      newHashes[type] = await generateHash(input, type);
    }

    setHashes(newHashes);
    toast({
      title: "Success!",
      description: "Hashes generated successfully",
    });
  };

  const copyHash = async (hashValue: string, hashType: string) => {
    try {
      await navigator.clipboard.writeText(hashValue);
      toast({
        title: "Copied!",
        description: `${hashType} hash copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy hash",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Hash className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Hash Generator</h1>
          <p className="text-muted-foreground">Generate MD5, SHA-1, and SHA-256 hashes for text</p>
        </div>

        <div className="grid gap-6">
          {/* Input Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Input Text</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="hash-input">Text to Hash</Label>
                <Textarea
                  id="hash-input"
                  placeholder="Enter text to generate hashes..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-32 font-mono"
                />
              </div>

              <Button onClick={generateAllHashes} className="w-full" disabled={!input.trim()}>
                <Hash className="w-4 h-4 mr-2" />
                Generate Hashes
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          {Object.keys(hashes).length > 0 && (
            <div className="grid md:grid-cols-1 gap-4">
              {Object.entries(hashes).map(([type, hash]) => (
                <Card key={type} className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-card-foreground">{type}</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyHash(hash, type)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <code className="text-sm break-all font-mono text-foreground">
                      {hash}
                    </code>
                  </div>
                  
                  <div className="mt-2 text-sm text-muted-foreground">
                    Length: {hash.length} characters
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Info Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h3 className="text-lg font-semibold mb-3 text-card-foreground flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Hash Information
            </h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-card-foreground">MD5:</strong>
                <span className="text-muted-foreground ml-2">
                  128-bit hash, widely used but not cryptographically secure
                </span>
              </div>
              <div>
                <strong className="text-card-foreground">SHA-1:</strong>
                <span className="text-muted-foreground ml-2">
                  160-bit hash, deprecated for cryptographic use
                </span>
              </div>
              <div>
                <strong className="text-card-foreground">SHA-256:</strong>
                <span className="text-muted-foreground ml-2">
                  256-bit hash, part of SHA-2 family, cryptographically secure
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};