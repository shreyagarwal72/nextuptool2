import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Copy, RefreshCw } from "lucide-react";

export const LoremIpsumGenerator = () => {
  const [count, setCount] = useState("5");
  const [type, setType] = useState("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState("");
  const { toast } = useToast();

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "reprehenderit", "in", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
    "accusamus", "accusantium", "doloremque", "laudantium", "totam", "rem",
    "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis"
  ];

  const generateWords = (wordCount: number): string => {
    const words = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words.join(" ");
  };

  const generateSentence = (): string => {
    const sentenceLength = Math.floor(Math.random() * 10) + 8; // 8-17 words
    const words = generateWords(sentenceLength).split(" ");
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };

  const generateParagraph = (): string => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(" ");
  };

  const generateText = () => {
    const numCount = parseInt(count);
    if (isNaN(numCount) || numCount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    let result = "";

    switch (type) {
      case "words":
        result = generateWords(numCount);
        if (startWithLorem && numCount > 2) {
          const words = result.split(" ");
          words[0] = "Lorem";
          words[1] = "ipsum";
          result = words.join(" ");
        }
        break;

      case "sentences":
        const sentences = [];
        for (let i = 0; i < numCount; i++) {
          sentences.push(generateSentence());
        }
        result = sentences.join(" ");
        if (startWithLorem && sentences.length > 0) {
          sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
          result = sentences.join(" ");
        }
        break;

      case "paragraphs":
        const paragraphs = [];
        for (let i = 0; i < numCount; i++) {
          paragraphs.push(generateParagraph());
        }
        result = paragraphs.join("\n\n");
        if (startWithLorem && paragraphs.length > 0) {
          paragraphs[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + paragraphs[0].substring(paragraphs[0].indexOf(".") + 2);
          result = paragraphs.join("\n\n");
        }
        break;
    }

    setGeneratedText(result);
    toast({
      title: "Generated!",
      description: `${numCount} ${type} of Lorem Ipsum text generated`,
    });
  };

  const copyToClipboard = async () => {
    if (!generatedText) return;

    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        title: "Copied!",
        description: "Lorem Ipsum text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text",
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
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Lorem Ipsum Generator</h1>
          <p className="text-muted-foreground">Generate placeholder text for your designs and layouts</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Settings Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
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
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="words">Words</SelectItem>
                      <SelectItem value="sentences">Sentences</SelectItem>
                      <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="start-lorem"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="rounded border-border"
                />
                <Label htmlFor="start-lorem" className="text-sm">
                  Start with "Lorem ipsum"
                </Label>
              </div>

              <Button onClick={generateText} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Lorem Ipsum
              </Button>
            </div>
          </Card>

          {/* Result Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-card-foreground">Generated Text</h2>
              {generatedText && (
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              )}
            </div>
            
            <Textarea
              value={generatedText}
              placeholder="Generated Lorem Ipsum text will appear here..."
              className="min-h-64 resize-none"
              readOnly
            />

            {generatedText && (
              <div className="mt-3 text-sm text-muted-foreground">
                Characters: {generatedText.length} | Words: {generatedText.split(/\s+/).length}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};