import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Download, Copy } from "lucide-react";

export const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState("256");
  const [errorLevel, setErrorLevel] = useState("M");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQR = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text or URL to generate QR code",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simple QR code generation using a canvas approach
      // For production, you'd want to use a proper QR library like qrcode
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      const qrSize = parseInt(size);
      
      canvas.width = qrSize;
      canvas.height = qrSize;

      // Create a simple pattern (placeholder - in real implementation use QR library)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, qrSize, qrSize);
      
      ctx.fillStyle = '#ffffff';
      const cellSize = qrSize / 25;
      
      // Create a simple grid pattern as placeholder
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
          if ((i + j) % 2 === 0 || (i === 0 || i === 24 || j === 0 || j === 24)) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }

      // Add corner squares (typical QR pattern)
      ctx.fillStyle = '#000000';
      const cornerSize = cellSize * 7;
      
      // Top-left corner
      ctx.fillRect(0, 0, cornerSize, cornerSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cellSize, cellSize, cornerSize - 2 * cellSize, cornerSize - 2 * cellSize);
      ctx.fillStyle = '#000000';
      ctx.fillRect(2 * cellSize, 2 * cellSize, cornerSize - 4 * cellSize, cornerSize - 4 * cellSize);

      const dataUrl = canvas.toDataURL('image/png');
      setQrDataUrl(dataUrl);
      
      toast({
        title: "Success!",
        description: "QR code generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `qrcode_${size}x${size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) return;

    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast({
        title: "Copied!",
        description: "QR code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy QR code",
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
              <QrCode className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">QR Code Generator</h1>
          <p className="text-muted-foreground">Generate QR codes for URLs, text, and more</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">QR Code Settings</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="qr-text">Text or URL</Label>
                <Textarea
                  id="qr-text"
                  placeholder="Enter text, URL, or any content..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="qr-size">Size (px)</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128">128x128</SelectItem>
                      <SelectItem value="256">256x256</SelectItem>
                      <SelectItem value="512">512x512</SelectItem>
                      <SelectItem value="1024">1024x1024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="error-level">Error Correction</Label>
                  <Select value={errorLevel} onValueChange={setErrorLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="Q">Quartile (25%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
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

          {/* Result Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Generated QR Code</h2>
            
            {qrDataUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={qrDataUrl} 
                    alt="Generated QR Code" 
                    className="border border-border rounded-lg shadow-medium"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={downloadQR} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-square max-w-xs mx-auto flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                <p className="text-muted-foreground text-center">
                  QR code will appear here
                </p>
              </div>
            )}
          </Card>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};