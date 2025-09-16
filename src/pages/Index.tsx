import { useState } from "react";
import { Helmet } from "react-helmet";
import { ToolCard } from "@/components/ToolCard";
import { ImageConverter } from "@/components/ImageConverter";
import { ImageResizer } from "@/components/ImageResizer";
import { JsonFormatter } from "@/components/JsonFormatter";
import { UniversalConverter } from "@/components/UniversalConverter";
import { Base64Converter } from "@/components/Base64Converter";
import { UrlShortener } from "@/components/UrlShortener";
import { CircleImageCropper } from "@/components/CircleImageCropper";
import { UUIDGenerator } from "@/components/UUIDGenerator";
import { TimestampConverter } from "@/components/TimestampConverter";
import { UnitConverter } from "@/components/UnitConverter";
import { HTMLFormatter } from "@/components/HTMLFormatter";
import { ImageCompressor } from "@/components/ImageCompressor";
import { 
  Image, 
  Scale, 
  Code, 
  ArrowLeft,
  Zap,
  FileType,
  FileText,
  Link,
  Scissors,
  Fingerprint,
  Clock,
  Calculator,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ActiveTool = 'home' | 'image-converter' | 'image-resizer' | 'json-formatter' | 'universal-converter' | 'base64-converter' | 'url-shortener' | 'circle-cropper' | 'uuid-generator' | 'timestamp-converter' | 'unit-converter' | 'html-formatter' | 'image-compressor';

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
      icon: FileType,
    },
    {
      id: 'url-shortener' as ActiveTool,
      title: 'URL Shortener',
      description: 'Create short, shareable links',
      icon: Link,
    },
    {
      id: 'uuid-generator' as ActiveTool,
      title: 'UUID Generator',
      description: 'Generate unique identifiers for applications',
      icon: Fingerprint,
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
      case 'universal-converter':
        return <UniversalConverter />;
      case 'base64-converter':
        return <Base64Converter />;
      case 'url-shortener':
        return <UrlShortener />;
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
        <div className="min-h-screen bg-gradient-secondary animate-fade-in">
          <div className="container mx-auto">
            <div className="pt-6 pb-4 animate-slide-up">
              <Button 
                variant="ghost" 
                onClick={() => setActiveTool('home')}
                className="mb-4 hover:bg-white/50 hover:scale-105 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Button>
            </div>
            {renderActiveTool()}
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
          <header className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-hero shadow-large animate-bounce-in">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Web Tools Suite
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Professional web utilities for developers and creators. Convert files, transform data, and boost your productivity with our comprehensive toolkit.
            </p>
          </header>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            <Button
              variant={sortByAlpha ? "default" : "outline"}
              onClick={() => setSortByAlpha(!sortByAlpha)}
              className="whitespace-nowrap hover:scale-105 transition-transform duration-200"
            >
              Sort A-Z
            </Button>
          </div>

          {/* Tools Grid */}
          <main>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  onClick={() => setActiveTool(tool.id)}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                />
              ))}
            </section>

            {/* Coming Soon */}
            <section className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">More Tools Coming Soon</h2>
              <p className="text-muted-foreground">
                We're constantly adding new tools to help streamline your workflow.
              </p>
            </section>
          </main>
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
    </>
  );
};

export default Index;