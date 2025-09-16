import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Scale } from "lucide-react";
import { toast } from "sonner";

export const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{width: number, height: number} | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResizedImage(null);
      
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setTargetWidth(img.width);
        setTargetHeight(img.height);
      };
      img.src = URL.createObjectURL(file);
      
      toast.success("Image selected successfully!");
    } else {
      toast.error("Please select a valid image file.");
    }
  }, []);

  const handleWidthChange = useCallback((value: number) => {
    setTargetWidth(value);
    if (maintainAspectRatio && originalDimensions) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setTargetHeight(Math.round(value * ratio));
    }
  }, [maintainAspectRatio, originalDimensions]);

  const handleHeightChange = useCallback((value: number) => {
    setTargetHeight(value);
    if (maintainAspectRatio && originalDimensions) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setTargetWidth(Math.round(value * ratio));
    }
  }, [maintainAspectRatio, originalDimensions]);

  const resizeImage = useCallback(async () => {
    if (!selectedFile) return;

    setIsResizing(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(selectedFile);
      });

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);

      const resizedDataUrl = canvas.toDataURL('image/png');
      setResizedImage(resizedDataUrl);
      toast.success("Image resized successfully!");
    } catch (error) {
      toast.error("Failed to resize image. Please try again.");
    } finally {
      setIsResizing(false);
    }
  }, [selectedFile, targetWidth, targetHeight]);

  const downloadImage = useCallback(() => {
    if (!resizedImage || !selectedFile) return;

    const link = document.createElement('a');
    link.download = `${selectedFile.name.split('.')[0]}_resized.png`;
    link.href = resizedImage;
    link.click();
    toast.success("Image downloaded!");
  }, [resizedImage, selectedFile]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Image Resizer
        </h1>
        <p className="text-muted-foreground">Resize your images to custom dimensions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload & Configure
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload-resize"
              />
              <label htmlFor="file-upload-resize" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload an image
                </p>
              </label>
            </div>
            
            {selectedFile && originalDimensions && (
              <>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Original: {originalDimensions.width} × {originalDimensions.height}px
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={targetWidth}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={targetHeight}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aspect-ratio"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="aspect-ratio" className="text-sm">
                    Maintain aspect ratio
                  </Label>
                </div>

                <Button 
                  onClick={resizeImage} 
                  disabled={isResizing} 
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  {isResizing ? "Resizing..." : "Resize Image"}
                  <Scale className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Preview & Download
          </h3>
          <div className="space-y-4">
            {resizedImage ? (
              <>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={resizedImage} 
                    alt="Resized" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="text-sm text-muted-foreground text-center">
                  New size: {targetWidth} × {targetHeight}px
                </div>
                <Button 
                  onClick={downloadImage} 
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resized Image
                </Button>
              </>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                  <Scale className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Resized image preview will appear here
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};