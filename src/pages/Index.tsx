import { useState } from "react";
import { ToolCard } from "@/components/ToolCard";
import { ImageConverter } from "@/components/ImageConverter";
import { ImageResizer } from "@/components/ImageResizer";
import { 
  Image, 
  Scale, 
  Type, 
  Palette, 
  QrCode, 
  Code, 
  Key, 
  ArrowLeft,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ActiveTool = 'home' | 'image-converter' | 'image-resizer' | 'text-case' | 'color-picker' | 'qr-generator' | 'json-formatter' | 'password-generator';

const Index = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('home');

  const tools = [
    {
      id: 'image-converter' as ActiveTool,
      title: 'Image Converter',
      description: 'Convert between PNG, JPG, WebP formats',
      icon: Image,
    },
    {
      id: 'image-resizer' as ActiveTool,
      title: 'Image Resizer',
      description: 'Resize images to custom dimensions',
      icon: Scale,
    },
    {
      id: 'text-case' as ActiveTool,
      title: 'Text Case Converter',
      description: 'Convert text between different cases',
      icon: Type,
    },
    {
      id: 'color-picker' as ActiveTool,
      title: 'Color Converter',
      description: 'Convert between HEX, RGB, HSL colors',
      icon: Palette,
    },
    {
      id: 'qr-generator' as ActiveTool,
      title: 'QR Code Generator',
      description: 'Generate QR codes for text or URLs',
      icon: QrCode,
    },
    {
      id: 'json-formatter' as ActiveTool,
      title: 'JSON Formatter',
      description: 'Format and validate JSON data',
      icon: Code,
    },
    {
      id: 'password-generator' as ActiveTool,
      title: 'Password Generator',
      description: 'Generate secure random passwords',
      icon: Key,
    },
  ];

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'image-converter':
        return <ImageConverter />;
      case 'image-resizer':
        return <ImageResizer />;
      default:
        return null;
    }
  };

  if (activeTool !== 'home') {
    return (
      <div className="min-h-screen bg-gradient-secondary">
        <div className="container mx-auto">
          <div className="pt-6 pb-4">
            <Button 
              variant="ghost" 
              onClick={() => setActiveTool('home')}
              className="mb-4 hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </div>
          {renderActiveTool()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-hero shadow-large">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Web Tools Suite
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional web utilities for developers and creators. Convert files, transform data, and boost your productivity with our comprehensive toolkit.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              onClick={() => setActiveTool(tool.id)}
            />
          ))}
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">More Tools Coming Soon</h2>
          <p className="text-muted-foreground">
            We're constantly adding new tools to help streamline your workflow.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 Nextup Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;