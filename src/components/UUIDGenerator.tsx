import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Fingerprint, Copy, RefreshCw } from "lucide-react";

export const UUIDGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState("1");
  const [version, setVersion] = useState("v4");
  const { toast } = useToast();

  const generateUUID = () => {
    if (version === "v4") {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    
    // Simple v1-like UUID (timestamp based)
    const timestamp = Date.now().toString(16);
    const random1 = Math.random().toString(16).substr(2, 8);
    const random2 = Math.random().toString(16).substr(2, 8);
    return `${timestamp.substr(0, 8)}-${timestamp.substr(8, 4)}-1${random1.substr(0, 3)}-${random2.substr(0, 4)}-${random2.substr(4, 8)}${random1.substr(3, 4)}`;
  };

  const generateUUIDs = () => {
    const numCount = parseInt(count);
    if (isNaN(numCount) || numCount <= 0 || numCount > 100) {
      toast({
        title: "Error",
        description: "Please enter a number between 1 and 100",
        variant: "destructive",
      });
      return;
    }

    const newUuids = [];
    for (let i = 0; i < numCount; i++) {
      newUuids.push(generateUUID());
    }

    setUuids(newUuids);
    toast({
      title: "Generated!",
      description: `${numCount} UUID${numCount > 1 ? 's' : ''} generated successfully`,
    });
  };

  const copyUUID = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      toast({
        title: "Copied!",
        description: `UUID ${index + 1} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy UUID",
        variant: "destructive",
      });
    }
  };

  const copyAllUUIDs = async () => {
    if (uuids.length === 0) return;

    try {
      const allUuids = uuids.join('\n');
      await navigator.clipboard.writeText(allUuids);
      toast({
        title: "Copied!",
        description: "All UUIDs copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy UUIDs",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary animate-bounce-in">
              <Fingerprint className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">UUID Generator</h1>
          <p className="text-muted-foreground">Generate unique identifiers for your applications</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Settings Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Generator Settings</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="count">Count</Label>
                  <Input
                    id="count"
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>

                <div>
                  <Label htmlFor="version">Version</Label>
                  <Select value={version} onValueChange={setVersion}>
                    <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v4">UUID v4 (Random)</SelectItem>
                      <SelectItem value="v1">UUID v1 (Timestamp)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={generateUUIDs} className="w-full hover:scale-105 transition-transform duration-200">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate UUIDs
              </Button>
            </div>
          </Card>

          {/* Info Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">UUID Information</h2>
            
            <div className="space-y-3 text-sm">
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <strong className="text-card-foreground">UUID v4:</strong>
                <span className="text-muted-foreground ml-2">
                  Randomly generated, most commonly used
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <strong className="text-card-foreground">UUID v1:</strong>
                <span className="text-muted-foreground ml-2">
                  Based on timestamp and MAC address
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <strong className="text-card-foreground">Format:</strong>
                <span className="text-muted-foreground ml-2">
                  8-4-4-4-12 hexadecimal digits
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <strong className="text-card-foreground">Use Cases:</strong>
                <span className="text-muted-foreground ml-2">
                  Database keys, session IDs, file names
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        {uuids.length > 0 && (
          <Card className="mt-6 p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-card-foreground">Generated UUIDs</h2>
              <Button variant="outline" onClick={copyAllUUIDs} className="hover:scale-105 transition-transform duration-200">
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <code className="flex-1 font-mono text-sm text-foreground">
                    {uuid}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyUUID(uuid, index)}
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};