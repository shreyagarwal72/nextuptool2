import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, Copy, RefreshCw } from "lucide-react";

export const TimestampConverter = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("timestamp");
  const [results, setResults] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000).toString());
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    
    return {
      "Unix Timestamp": timestamp.toString(),
      "Milliseconds": (timestamp * 1000).toString(),
      "ISO 8601": date.toISOString(),
      "UTC": date.toUTCString(),
      "Local": date.toLocaleString(),
      "Date Only": date.toLocaleDateString(),
      "Time Only": date.toLocaleTimeString(),
      "Relative": getRelativeTime(date),
    };
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleConvert = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a value to convert",
        variant: "destructive",
      });
      return;
    }

    try {
      let timestamp: number;

      if (inputType === "timestamp") {
        timestamp = parseInt(inputValue);
        if (isNaN(timestamp)) {
          throw new Error("Invalid timestamp");
        }
        // Handle both seconds and milliseconds
        if (timestamp > 9999999999) {
          timestamp = Math.floor(timestamp / 1000);
        }
      } else {
        // Date string input
        const date = new Date(inputValue);
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date");
        }
        timestamp = Math.floor(date.getTime() / 1000);
      }

      const converted = convertTimestamp(timestamp);
      setResults(converted);

      toast({
        title: "Converted!",
        description: "Timestamp converted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input format",
        variant: "destructive",
      });
    }
  };

  const copyValue = async (value: string, format: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied!",
        description: `${format} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy value",
        variant: "destructive",
      });
    }
  };

  const useCurrentTimestamp = () => {
    setInputValue(currentTimestamp);
    setInputType("timestamp");
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary animate-bounce-in">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Timestamp Converter</h1>
          <p className="text-muted-foreground">Convert between Unix timestamps and human-readable dates</p>
        </div>

        {/* Current Time */}
        <Card className="mb-6 p-4 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Unix Timestamp</p>
              <p className="font-mono text-lg font-semibold text-foreground">{currentTimestamp}</p>
            </div>
            <Button variant="outline" onClick={useCurrentTimestamp} className="hover:scale-105 transition-transform duration-200">
              Use Current
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Convert From</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-type">Input Type</Label>
                <Select value={inputType} onValueChange={setInputType}>
                  <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="timestamp">Unix Timestamp</SelectItem>
                    <SelectItem value="date">Date String</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="input-value">
                  {inputType === "timestamp" ? "Timestamp" : "Date"}
                </Label>
                <Input
                  id="input-value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    inputType === "timestamp" 
                      ? "1704067200 or 1704067200000" 
                      : "2024-01-01 or January 1, 2024"
                  }
                  className="font-mono transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <Button onClick={handleConvert} className="w-full hover:scale-105 transition-transform duration-200">
                <RefreshCw className="w-4 h-4 mr-2" />
                Convert
              </Button>
            </div>
          </Card>

          {/* Info Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">About Timestamps</h2>
            
            <div className="space-y-3 text-sm">
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <strong className="text-card-foreground">Unix Timestamp:</strong>
                <span className="text-muted-foreground ml-2">
                  Seconds since January 1, 1970 UTC
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <strong className="text-card-foreground">Milliseconds:</strong>
                <span className="text-muted-foreground ml-2">
                  Same as Unix but × 1000
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <strong className="text-card-foreground">ISO 8601:</strong>
                <span className="text-muted-foreground ml-2">
                  International standard format
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <strong className="text-card-foreground">Examples:</strong>
                <div className="mt-2 font-mono text-xs text-muted-foreground">
                  <div>1704067200 → Jan 1, 2024</div>
                  <div>1735689600 → Jan 1, 2025</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        {Object.keys(results).length > 0 && (
          <Card className="mt-6 p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft animate-slide-up">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Conversion Results</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results).map(([format, value], index) => (
                <div 
                  key={format} 
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{format}</p>
                    <p className="font-mono text-sm text-muted-foreground break-all">{value}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyValue(value, format)}
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