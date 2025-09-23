import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrSize, setQrSize] = useState("200");
  const [errorLevel, setErrorLevel] = useState("M");
  const [qrUrl, setQrUrl] = useState("");
  const { toast } = useToast();

  const generateQR = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text or URL to generate QR code",
        variant: "destructive",
      });
      return;
    }

    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&ecc=${errorLevel}&data=${encodeURIComponent(text)}`;
    setQrUrl(apiUrl);
    
    toast({
      title: "QR Code Generated",
      description: "Your QR code has been generated successfully",
    });
  };

  const downloadQR = () => {
    if (!qrUrl) return;

    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded",
      description: "QR code downloaded successfully",
    });
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator - Create QR Codes for URLs, Text & More</title>
        <meta name="description" content="Generate QR codes for URLs, text, contact info, and more. Free online QR code generator with customizable size and error correction." />
        <meta name="keywords" content="qr code generator, create qr code, qr code maker, url to qr code, text to qr code, free qr generator" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
                <QrCode className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              QR Code Generator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate QR codes for URLs, text, contact information, WiFi credentials, and more with customizable options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">QR Code Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text or URL</label>
                  <Textarea
                    placeholder="Enter text, URL, or any content for the QR code..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Size (px)</label>
                    <Select value={qrSize} onValueChange={setQrSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100x100</SelectItem>
                        <SelectItem value="200">200x200</SelectItem>
                        <SelectItem value="300">300x300</SelectItem>
                        <SelectItem value="400">400x400</SelectItem>
                        <SelectItem value="500">500x500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Error Correction</label>
                    <Select value={errorLevel} onValueChange={setErrorLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Low (~7%)</SelectItem>
                        <SelectItem value="M">Medium (~15%)</SelectItem>
                        <SelectItem value="Q">Quartile (~25%)</SelectItem>
                        <SelectItem value="H">High (~30%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={generateQR} className="w-full" disabled={!text.trim()}>
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Generated QR Code</h3>
                {qrUrl && (
                  <Button variant="outline" size="sm" onClick={downloadQR}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
              
              <div className="flex items-center justify-center min-h-[300px] border-2 border-dashed border-border rounded-lg">
                {qrUrl ? (
                  <img
                    src={qrUrl}
                    alt="Generated QR Code"
                    className="max-w-full max-h-full"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p>QR code will appear here</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-4 bg-muted/50 animate-fade-in">
            <h4 className="font-semibold mb-2">QR Code Use Cases:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <ul className="space-y-1">
                <li>• Website URLs and social media links</li>
                <li>• Contact information (vCard)</li>
                <li>• WiFi network credentials</li>
                <li>• Product information and reviews</li>
              </ul>
              <ul className="space-y-1">
                <li>• Event tickets and invitations</li>
                <li>• Payment information</li>
                <li>• App download links</li>
                <li>• Location coordinates (GPS)</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};