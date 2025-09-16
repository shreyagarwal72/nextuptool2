import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Scissors } from "lucide-react";

export const CircleImageCropper = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setCroppedImageUrl(null);
  };

  const cropToCircle = async () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsProcessing(true);
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        
        // Set canvas size to be square based on the smaller dimension
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        // Clear canvas
        ctx.clearRect(0, 0, size, size);
        
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();

        // Calculate center crop coordinates
        const sourceX = (img.width - size) / 2;
        const sourceY = (img.height - size) / 2;

        // Draw the image centered and cropped to circle
        ctx.drawImage(img, sourceX, sourceY, size, size, 0, 0, size, size);

        // Convert to blob and create URL
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCroppedImageUrl(url);
            toast({
              title: "Success!",
              description: "Image cropped to circle successfully",
            });
          }
        }, 'image/png');
        
        setIsProcessing(false);
      };
      img.src = previewUrl!;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to crop image",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!croppedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = croppedImageUrl;
    link.download = `circle_${selectedFile.name.replace(/\.[^/.]+$/, '')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Scissors className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Circle Image Cropper</h1>
          <p className="text-muted-foreground">Crop any image into a perfect circle shape</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Select Image</h2>
            
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
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
                <div className="space-y-4">
                  <div className="aspect-square max-w-xs mx-auto">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg border border-border"
                    />
                  </div>
                  
                  <Button 
                    onClick={cropToCircle}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    <Scissors className="w-4 h-4 mr-2" />
                    {isProcessing ? "Cropping..." : "Crop to Circle"}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Result Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Cropped Result</h2>
            
            {croppedImageUrl ? (
              <div className="space-y-4">
                <div className="aspect-square max-w-xs mx-auto">
                  <img 
                    src={croppedImageUrl} 
                    alt="Cropped" 
                    className="w-full h-full object-cover rounded-full border border-border shadow-medium"
                  />
                </div>
                
                <Button onClick={downloadImage} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Circle Image
                </Button>
              </div>
            ) : (
              <div className="aspect-square max-w-xs mx-auto flex items-center justify-center border-2 border-dashed border-border rounded-full">
                <p className="text-muted-foreground text-center">
                  Cropped image will appear here
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