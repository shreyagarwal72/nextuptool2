import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileType, Download, Upload } from "lucide-react";

const SUPPORTED_FORMATS = {
  image: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'svg'],
  document: ['pdf', 'docx', 'txt', 'rtf', 'odt'],
  archive: ['zip', 'rar', '7z', 'tar', 'gz'],
  audio: ['mp3', 'wav', 'ogg', 'aac', 'flac'],
  video: ['mp4', 'avi', 'mkv', 'mov', 'webm']
};

export const UniversalConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const getFileType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    for (const [type, formats] of Object.entries(SUPPORTED_FORMATS)) {
      if (formats.includes(ext || '')) return type;
    }
    return 'unknown';
  };

  const getAvailableFormats = () => {
    if (!file) return [];
    const fileType = getFileType(file.name);
    return SUPPORTED_FORMATS[fileType as keyof typeof SUPPORTED_FORMATS] || [];
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setOutputFormat("");
    toast({
      title: "File Selected",
      description: `${selectedFile.name} loaded successfully`,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const convertFile = async () => {
    if (!file || !outputFormat) return;

    setIsConverting(true);
    try {
      // For images, we can do client-side conversion
      if (getFileType(file.name) === 'image' && ['png', 'jpg', 'jpeg', 'webp'].includes(outputFormat)) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          
          const mimeType = outputFormat === 'jpg' || outputFormat === 'jpeg' ? 'image/jpeg' : `image/${outputFormat}`;
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${file.name.split('.')[0]}.${outputFormat}`;
              a.click();
              URL.revokeObjectURL(url);
              
              toast({
                title: "Conversion Complete!",
                description: `File converted to ${outputFormat.toUpperCase()}`,
              });
            }
          }, mimeType);
          setIsConverting(false);
        };
        
        img.src = URL.createObjectURL(file);
      } else {
        // For other file types, show a message about server-side conversion
        toast({
          title: "Conversion Not Available",
          description: "This file type conversion requires server-side processing. Feature coming soon!",
          variant: "destructive",
        });
        setIsConverting(false);
      }
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "An error occurred during conversion. Please try again.",
        variant: "destructive",
      });
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-large border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-2xl bg-gradient-primary w-fit mb-4">
            <FileType className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-hero bg-clip-text text-transparent">
            Universal File Converter
          </CardTitle>
          <p className="text-muted-foreground">
            Convert between multiple file formats - images, documents, archives & more
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragOver ? 'border-primary bg-primary/10' : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop your file here</p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports images, documents, archives, audio & video files
            </p>
            <input
              type="file"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
              id="file-input"
              accept="*"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-input" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>

          {file && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* File Info */}
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Selected File</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {file.name}</p>
                  <p><span className="font-medium">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><span className="font-medium">Type:</span> {getFileType(file.name)}</p>
                </div>
              </Card>

              {/* Conversion Options */}
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Convert To</h3>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableFormats().map((format) => (
                      <SelectItem key={format} value={format}>
                        {format.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={convertFile} 
                  disabled={!outputFormat || isConverting}
                  className="w-full mt-4"
                >
                  {isConverting ? (
                    <>Converting...</>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Convert & Download
                    </>
                  )}
                </Button>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};