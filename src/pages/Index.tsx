import { useState } from "react";
import { Helmet } from "react-helmet";
import { ToolCard } from "@/components/ToolCard";
import { ImageConverter } from "@/components/ImageConverter";
import { ImageResizer } from "@/components/ImageResizer";
import { JsonFormatter } from "@/components/JsonFormatter";
import { Base64Converter } from "@/components/Base64Converter";
import { BrokenURLShortener } from "@/components/BrokenURLShortener";
import { BrokenUniversalConverter } from "@/components/BrokenUniversalConverter";
import { CircleImageCropper } from "@/components/CircleImageCropper";
import { UUIDGenerator } from "@/components/UUIDGenerator";
import { TimestampConverter } from "@/components/TimestampConverter";
import { UnitConverter } from "@/components/UnitConverter";
import { HTMLFormatter } from "@/components/HTMLFormatter";
import { ImageCompressor } from "@/components/ImageCompressor";
import { CSSMinifier } from "@/components/CSSMinifier";
import { PasswordGenerator } from "@/components/PasswordGenerator";
import { ColorPicker } from "@/components/ColorPicker";
import { QRGenerator } from "@/components/QRGenerator";
import { TextDiff } from "@/components/TextDiff";
import { JWTDecoder } from "@/components/JWTDecoder";
import { URLEncoder } from "@/components/URLEncoder";
import { RegexTester } from "@/components/RegexTester";
import { XMLFormatter } from "@/components/XMLFormatter";
import { 
  Image, 
  Scale, 
  Code, 
  ArrowLeft,
  Zap,
  FileText,
  Scissors,
  Fingerprint,
  Clock,
  Calculator,
  Code2,
  Minimize2,
  Shield,
  Palette,
  QrCode,
  FileText as FileDiff,
  Key,
  LinkIcon,
  Search,
  FileCode
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ActiveTool = 'home' | 'image-converter' | 'image-resizer' | 'json-formatter' | 'base64-converter' | 'url-shortener' | 'universal-converter' | 'circle-cropper' | 'uuid-generator' | 'timestamp-converter' | 'unit-converter' | 'html-formatter' | 'image-compressor' | 'css-minifier' | 'password-generator' | 'color-picker' | 'qr-generator' | 'text-diff' | 'jwt-decoder' | 'url-encoder' | 'regex-tester' | 'xml-formatter';

const Index = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('home');
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByAlpha, setSortByAlpha] = useState(false);

  const allTools = [
    {
      id: 'base64-converter' as ActiveTool,
      title: 'Base64 Encoder/Decoder',
      description: 'Convert text and files to/from Base64',
      icon: FileText,
    },
    {
      id: 'circle-cropper' as ActiveTool,
      title: 'Circle Image Cropper',
      description: 'Crop images into perfect circle shapes',
      icon: Scissors,
    },
    {
      id: 'html-formatter' as ActiveTool,
      title: 'HTML Formatter & Minifier',
      description: 'Format, beautify, and minify HTML code',
      icon: Code2,
    },
    {
      id: 'image-compressor' as ActiveTool,
      title: 'Image Compressor',
      description: 'Reduce image file size while maintaining quality',
      icon: Zap,
    },
    {
      id: 'image-converter' as ActiveTool,
      title: 'Image Format Converter',
      description: 'Convert PNG, JPG, WebP & other image formats',
      icon: Image,
    },
    {
      id: 'image-resizer' as ActiveTool,
      title: 'Image Resizer & Optimizer',
      description: 'Resize, crop and optimize images for web',
      icon: Scale,
    },
    {
      id: 'json-formatter' as ActiveTool,
      title: 'JSON Formatter & Validator',
      description: 'Format, validate, and minify JSON data',
      icon: Code,
    },
    {
      id: 'timestamp-converter' as ActiveTool,
      title: 'Timestamp Converter',
      description: 'Convert between Unix timestamps and dates',
      icon: Clock,
    },
    {
      id: 'unit-converter' as ActiveTool,
      title: 'Unit Converter',
      description: 'Convert between different units of measurement',
      icon: Calculator,
    },
    {
      id: 'universal-converter' as ActiveTool,
      title: 'Universal File Converter',
      description: 'Convert between multiple file formats',
      icon: FileText,
    },
    {
      id: 'url-shortener' as ActiveTool,
      title: 'URL Shortener',
      description: 'Create short, shareable links',
      icon: LinkIcon,
    },
    {
      id: 'uuid-generator' as ActiveTool,
      title: 'UUID Generator',
      description: 'Generate unique identifiers for applications',
      icon: Fingerprint,
    },
    {
      id: 'css-minifier' as ActiveTool,
      title: 'CSS Minifier & Optimizer',
      description: 'Compress and optimize CSS files for better performance',
      icon: Minimize2,
    },
    {
      id: 'password-generator' as ActiveTool,
      title: 'Password Generator',
      description: 'Create secure, random passwords with custom options',
      icon: Shield,
    },
    {
      id: 'color-picker' as ActiveTool,
      title: 'Color Picker & Converter',
      description: 'Pick colors and convert between HEX, RGB, HSL formats',
      icon: Palette,
    },
    {
      id: 'qr-generator' as ActiveTool,
      title: 'QR Code Generator',
      description: 'Generate QR codes for URLs, text, and more',
      icon: QrCode,
    },
    {
      id: 'text-diff' as ActiveTool,
      title: 'Text Difference Checker',
      description: 'Compare two texts and find differences',
      icon: FileDiff,
    },
    {
      id: 'jwt-decoder' as ActiveTool,
      title: 'JWT Decoder & Validator',
      description: 'Decode and validate JSON Web Tokens',
      icon: Key,
    },
    {
      id: 'url-encoder' as ActiveTool,
      title: 'URL Encoder & Decoder',
      description: 'Encode and decode URLs for safe transmission',
      icon: LinkIcon,
    },
    {
      id: 'regex-tester' as ActiveTool,
      title: 'Regex Tester & Validator',
      description: 'Test and validate regular expressions with real-time matching',
      icon: Search,
    },
    {
      id: 'xml-formatter' as ActiveTool,
      title: 'XML Formatter & Validator',
      description: 'Format, validate, and minify XML documents',
      icon: FileCode,
    },
  ];

  const filteredTools = allTools
    .filter(tool => 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByAlpha) {
        return a.title.localeCompare(b.title);
      }
      return 0; // Keep original order if not sorting alphabetically
    });

  const tools = filteredTools;

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'image-converter':
        return <ImageConverter />;
      case 'image-resizer':
        return <ImageResizer />;
      case 'json-formatter':
        return <JsonFormatter />;
      case 'base64-converter':
        return <Base64Converter />;
      case 'url-shortener':
        return <BrokenURLShortener />;
      case 'universal-converter':
        return <BrokenUniversalConverter />;
      case 'circle-cropper':
        return <CircleImageCropper />;
      case 'uuid-generator':
        return <UUIDGenerator />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'html-formatter':
        return <HTMLFormatter />;
      case 'image-compressor':
        return <ImageCompressor />;
      case 'css-minifier':
        return <CSSMinifier />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'color-picker':
        return <ColorPicker />;
      case 'qr-generator':
        return <QRGenerator />;
      case 'text-diff':
        return <TextDiff />;
      case 'jwt-decoder':
        return <JWTDecoder />;
      case 'url-encoder':
        return <URLEncoder />;
      case 'regex-tester':
        return <RegexTester />;
      case 'xml-formatter':
        return <XMLFormatter />;
      default:
        return null;
    }
  };

  if (activeTool !== 'home') {
    const currentTool = tools.find(tool => tool.id === activeTool);
    return (
      <>
        <Helmet>
          <title>{currentTool?.title} - Professional Web Tools Suite</title>
          <meta name="description" content={`${currentTool?.description} - Free online tool for developers and creators. Fast, secure, and easy to use.`} />
          <meta name="keywords" content={`${currentTool?.title.toLowerCase()}, file converter, web tools, online utilities, developer tools`} />
          <link rel="canonical" href={`https://webtoolssuite.com/${activeTool}`} />
        </Helmet>
        <div className="min-h-screen bg-gradient-secondary animate-fade-in-slow">
          <div className="container mx-auto">
            <div className="pt-6 pb-4 animate-slide-down">
              <Button 
                variant="ghost" 
                onClick={() => setActiveTool('home')}
                className="mb-4 hover:bg-white/50 hover:scale-105 transition-all duration-300 hover:shadow-medium group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:animate-wiggle" />
                Back to Tools
              </Button>
            </div>
            <div className="animate-scale-in">
              {renderActiveTool()}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Professional Web Tools Suite - File Converters & Developer Utilities</title>
        <meta name="description" content="Free online web tools for developers and creators. Convert images, format JSON, generate UUIDs, convert timestamps, compress images, format HTML, and more. Fast, secure, and easy to use." />
        <meta name="keywords" content="web tools, file converter, image converter, json formatter, base64 encoder, url shortener, uuid generator, timestamp converter, unit converter, html formatter, image compressor, circle image cropper, developer tools, online utilities" />
        <meta name="author" content="Nextup Studio" />
        <meta property="og:title" content="Professional Web Tools Suite - File Converters & Developer Utilities" />
        <meta property="og:description" content="Free online web tools for developers and creators. Convert files, transform data, and boost productivity." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://webtoolssuite.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Web Tools Suite",
            "description": "Professional web utilities for developers and creators",
            "url": "https://webtoolssuite.com",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-secondary animate-fade-in">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <header className="text-center mb-16 animate-slide-down">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-hero shadow-glow-intense animate-float">
                <Zap className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-bounce-in bg-gradient-animated bg-[length:400%_400%] animate-gradient-shift bg-clip-text text-transparent">
              Web Tools Suite
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-slow" style={{ animationDelay: '0.4s' }}>
              Professional web utilities for developers and creators. Convert files, transform data, and boost your productivity with our comprehensive toolkit.
            </p>
          </header>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 focus:scale-[1.02] focus:shadow-glow"
              />
            </div>
            <Button
              variant={sortByAlpha ? "default" : "outline"}
              onClick={() => setSortByAlpha(!sortByAlpha)}
              className="whitespace-nowrap hover:scale-105 transition-all duration-300 hover:shadow-medium bg-gradient-primary hover:bg-gradient-hero"
            >
              Sort A-Z
            </Button>
          </div>

          {/* Tools Grid */}
          <main>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  onClick={() => setActiveTool(tool.id)}
                  className="animate-fade-in hover:animate-float"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                />
              ))}
            </section>

            {/* Coming Soon */}
            <section className="text-center animate-rotate-in" style={{ animationDelay: '1.2s' }}>
              <h2 className="text-2xl font-semibold mb-4 text-foreground bg-gradient-primary bg-clip-text text-transparent">More Tools Coming Soon</h2>
              <p className="text-muted-foreground animate-pulse">
                We're constantly adding new tools to help streamline your workflow.
              </p>
            </section>
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-gradient-primary/10 backdrop-blur-sm mt-16 animate-slide-up">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-muted-foreground">
              <p className="animate-fade-in">© 2025 Nextup Studio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;