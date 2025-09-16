import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, FileText, Upload } from "lucide-react";

export const Base64Converter = () => {
  const [textInput, setTextInput] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const encodeToBase64 = () => {
    if (textInput) {
      const encoded = btoa(unescape(encodeURIComponent(textInput)));
      setBase64Output(encoded);
      toast({
        title: "Text Encoded",
        description: "Text has been encoded to Base64",
      });
    }
  };

  const decodeFromBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(textInput)));
      setBase64Output(decoded);
      toast({
        title: "Base64 Decoded",
        description: "Base64 has been decoded to text",
      });
    } catch (error) {
      toast({
        title: "Invalid Base64",
        description: "Please enter valid Base64 encoded text",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setBase64Output(base64);
        toast({
          title: "File Encoded",
          description: `${selectedFile.name} has been encoded to Base64`,
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64Output);
    toast({
      title: "Copied!",
      description: "Base64 data copied to clipboard",
    });
  };

  const downloadBase64 = () => {
    const blob = new Blob([base64Output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "base64-output.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-large border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-2xl bg-gradient-primary w-fit mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-hero bg-clip-text text-transparent">
            Base64 Encoder/Decoder
          </CardTitle>
          <p className="text-muted-foreground">
            Convert text and files to/from Base64 encoding
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Input</h3>
              <Textarea
                placeholder="Enter text to encode or Base64 to decode..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={encodeToBase64} className="flex-1">
                  Encode to Base64
                </Button>
                <Button onClick={decodeFromBase64} variant="outline" className="flex-1">
                  Decode from Base64
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Or upload a file:</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild variant="outline" size="sm">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </label>
                  </Button>
                  {file && <span className="text-sm text-muted-foreground">{file.name}</span>}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Output</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyToClipboard}
                    disabled={!base64Output}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={downloadBase64}
                    disabled={!base64Output}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                readOnly
                value={base64Output}
                className="min-h-[300px] font-mono text-sm bg-muted/50"
                placeholder="Encoded/decoded result will appear here..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};