import { useState } from "react";
import { Helmet } from "react-helmet";
import { ToolCard } from "@/components/ToolCard";
import { ImageConverter } from "@/components/ImageConverter";
import { ImageResizer } from "@/components/ImageResizer";
import { JsonFormatter } from "@/components/JsonFormatter";
import { UniversalConverter } from "@/components/UniversalConverter";
import { Base64Converter } from "@/components/Base64Converter";
import { UrlShortener } from "@/components/UrlShortener";
import { 
  Image, 
  Scale, 
  Code, 
  ArrowLeft,
  Zap,
  FileType,
  FileText,
  Link
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ActiveTool = 'home' | 'image-converter' | 'image-resizer' | 'json-formatter' | 'universal-converter' | 'base64-converter' | 'url-shortener';

const Index = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('home');

  const tools = [
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
      id: 'universal-converter' as ActiveTool,
      title: 'Universal File Converter',
      description: 'Convert between multiple file formats',
      icon: FileType,
    },
    {
      id: 'base64-converter' as ActiveTool,
      title: 'Base64 Encoder/Decoder',
      description: 'Convert text and files to/from Base64',
      icon: FileText,
    },
    {
      id: 'url-shortener' as ActiveTool,
      title: 'URL Shortener',
      description: 'Create short, shareable links',
      icon: Link,
    },
  ];

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
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Professional Web Tools Suite - File Converters & Developer Utilities</title>
        <meta name="description" content="Free online web tools for developers and creators. Convert images, format JSON, encode Base64, shorten URLs and more. Fast, secure, and easy to use." />
        <meta name="keywords" content="web tools, file converter, image converter, json formatter, base64 encoder, url shortener, developer tools, online utilities" />
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
      <div className="min-h-screen bg-gradient-secondary">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <header className="text-center mb-16">
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
          </header>

          {/* Tools Grid */}
          <main>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  onClick={() => setActiveTool(tool.id)}
                />
              ))}
            </section>

            {/* Coming Soon */}
            <section className="text-center">
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