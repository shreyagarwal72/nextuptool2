import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Zap } from "lucide-react";

export const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setOriginalSize(file.size);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setCompressedUrl(null);
    setCompressedSize(0);
  };

  const compressImage = async () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsCompressing(true);
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw and compress
        ctx.drawImage(img, 0, 0);
        
        const qualityValue = quality[0] / 100;
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedUrl(url);
            setCompressedSize(blob.size);
            
            const savings = ((originalSize - blob.size) / originalSize * 100).toFixed(1);
            toast({
              title: "Success!",
              description: `Image compressed by ${savings}%`,
            });
          }
          setIsCompressing(false);
        }, selectedFile.type === 'image/png' ? 'image/png' : 'image/jpeg', qualityValue);
      };
      
      img.src = previewUrl!;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress image",
        variant: "destructive",
      });
      setIsCompressing(false);
    }
  };

  const downloadImage = () => {
    if (!compressedUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = compressedUrl;
    const extension = selectedFile.type === 'image/png' ? 'png' : 'jpg';
    link.download = `compressed_${selectedFile.name.replace(/\.[^/.]+$/, '')}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary animate-bounce-in">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Image Compressor</h1>
          <p className="text-muted-foreground">Reduce image file size while maintaining quality</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Select Image</h2>
            
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors duration-300"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2 text-card-foreground">
                  {selectedFile ? selectedFile.name : "Choose an image"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Click to select or drag and drop
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {previewUrl && (
                <div className="space-y-4 animate-fade-in">
                  <div className="aspect-video max-w-sm mx-auto">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg border border-border shadow-soft"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Quality: {quality[0]}%
                      </Label>
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        max={100}
                        min={10}
                        step={5}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>High compression</span>
                        <span>High quality</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={compressImage}
                      disabled={isCompressing}
                      className="w-full hover:scale-105 transition-transform duration-200"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {isCompressing ? "Compressing..." : "Compress Image"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Result Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Compressed Result</h2>
            
            {compressedUrl ? (
              <div className="space-y-4 animate-slide-up">
                <div className="aspect-video max-w-sm mx-auto">
                  <img 
                    src={compressedUrl} 
                    alt="Compressed" 
                    className="w-full h-full object-cover rounded-lg border border-border shadow-soft"
                  />
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-card-foreground">Original Size</p>
                      <p className="text-muted-foreground">{formatFileSize(originalSize)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">Compressed Size</p>
                      <p className="text-muted-foreground">{formatFileSize(compressedSize)}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="font-medium text-green-700 dark:text-green-400">
                      Space Saved: {formatFileSize(originalSize - compressedSize)}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Compression: {((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <Button onClick={downloadImage} className="w-full hover:scale-105 transition-transform duration-200">
                  <Download className="w-4 h-4 mr-2" />
                  Download Compressed Image
                </Button>
              </div>
            ) : (
              <div className="aspect-video max-w-sm mx-auto flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                <p className="text-muted-foreground text-center">
                  Compressed image will appear here
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-6 p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
          <h3 className="text-lg font-semibold mb-3 text-card-foreground">Compression Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <strong className="text-card-foreground">JPEG:</strong>
                <span className="text-muted-foreground ml-2">
                  Best for photos, supports quality adjustment
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <strong className="text-card-foreground">PNG:</strong>
                <span className="text-muted-foreground ml-2">
                  Best for graphics with transparency
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <strong className="text-card-foreground">Quality 80-90%:</strong>
                <span className="text-muted-foreground ml-2">
                  Good balance between size and quality
                </span>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <strong className="text-card-foreground">Web Use:</strong>
                <span className="text-muted-foreground ml-2">
                  60-80% quality is usually sufficient
                </span>
              </div>
            </div>
          </div>
        </Card>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};