import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("jpg");
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setConvertedImage(null);
      toast.success("Image selected successfully!");
    } else {
      toast.error("Please select a valid image file.");
    }
  }, []);

  const convertImage = useCallback(async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(selectedFile);
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const quality = targetFormat === 'jpg' ? 0.9 : undefined;
      const mimeType = targetFormat === 'jpg' ? 'image/jpeg' : 
                      targetFormat === 'png' ? 'image/png' : 'image/webp';
      
      const convertedDataUrl = canvas.toDataURL(mimeType, quality);
      setConvertedImage(convertedDataUrl);
      toast.success("Image converted successfully!");
    } catch (error) {
      toast.error("Failed to convert image. Please try again.");
    } finally {
      setIsConverting(false);
    }
  }, [selectedFile, targetFormat]);

  const downloadImage = useCallback(() => {
    if (!convertedImage || !selectedFile) return;

    const link = document.createElement('a');
    link.download = `${selectedFile.name.split('.')[0]}.${targetFormat}`;
    link.href = convertedImage;
    link.click();
    toast.success("Image downloaded!");
  }, [convertedImage, selectedFile, targetFormat]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Image Format Converter
        </h1>
        <p className="text-muted-foreground">Convert your images between PNG, JPG, and WebP formats</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Image
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload an image or drag and drop
                </p>
              </label>
            </div>
            
            {selectedFile && (
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Convert to:</label>
              <Select value={targetFormat} onValueChange={setTargetFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={convertImage} 
              disabled={!selectedFile || isConverting} 
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {isConverting ? "Converting..." : "Convert Image"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Result
          </h3>
          <div className="space-y-4">
            {convertedImage ? (
              <>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={convertedImage} 
                    alt="Converted" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <Button 
                  onClick={downloadImage} 
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download {targetFormat.toUpperCase()}
                </Button>
              </>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                  <Download className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Converted image will appear here
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};