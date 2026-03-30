import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Button as HeroButton, Chip } from "@heroui/react";
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
import { HashGenerator } from "@/components/HashGenerator";
import { 
  Image, Scale, Code, ArrowLeft, Zap, FileText, Scissors, Fingerprint,
  Clock, Calculator, Code2, Minimize2, Shield, Palette, QrCode,
  FileText as FileDiff, Key, LinkIcon, Search, FileCode, Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";

type ActiveTool = 'home' | 'image-converter' | 'image-resizer' | 'json-formatter' | 'base64-converter' | 'url-shortener' | 'universal-converter' | 'circle-cropper' | 'uuid-generator' | 'timestamp-converter' | 'unit-converter' | 'html-formatter' | 'image-compressor' | 'css-minifier' | 'password-generator' | 'color-picker' | 'qr-generator' | 'text-diff' | 'jwt-decoder' | 'url-encoder' | 'regex-tester' | 'xml-formatter' | 'hash-generator';

const allTools = [
  { id: 'base64-converter' as ActiveTool, title: 'Base64 Encoder/Decoder', description: 'Convert text and files to/from Base64', icon: FileText },
  { id: 'circle-cropper' as ActiveTool, title: 'Circle Image Cropper', description: 'Crop images into perfect circle shapes', icon: Scissors },
  { id: 'css-minifier' as ActiveTool, title: 'CSS Minifier & Optimizer', description: 'Compress and optimize CSS files', icon: Minimize2 },
  { id: 'color-picker' as ActiveTool, title: 'Color Picker & Converter', description: 'Pick colors and convert HEX, RGB, HSL', icon: Palette },
  { id: 'hash-generator' as ActiveTool, title: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256 hashes', icon: Hash },
  { id: 'html-formatter' as ActiveTool, title: 'HTML Formatter & Minifier', description: 'Format, beautify, and minify HTML code', icon: Code2 },
  { id: 'image-compressor' as ActiveTool, title: 'Image Compressor', description: 'Reduce image file size with quality control', icon: Zap },
  { id: 'image-converter' as ActiveTool, title: 'Image Format Converter', description: 'Convert PNG, JPG, WebP & other formats', icon: Image },
  { id: 'image-resizer' as ActiveTool, title: 'Image Resizer & Optimizer', description: 'Resize, crop and optimize images', icon: Scale },
  { id: 'json-formatter' as ActiveTool, title: 'JSON Formatter & Validator', description: 'Format, validate, and minify JSON data', icon: Code },
  { id: 'jwt-decoder' as ActiveTool, title: 'JWT Decoder & Validator', description: 'Decode and validate JSON Web Tokens', icon: Key },
  { id: 'password-generator' as ActiveTool, title: 'Password Generator', description: 'Create secure, random passwords', icon: Shield },
  { id: 'qr-generator' as ActiveTool, title: 'QR Code Generator', description: 'Generate QR codes for URLs and text', icon: QrCode },
  { id: 'regex-tester' as ActiveTool, title: 'Regex Tester & Validator', description: 'Test regular expressions with real-time matching', icon: Search },
  { id: 'text-diff' as ActiveTool, title: 'Text Difference Checker', description: 'Compare two texts and find differences', icon: FileDiff },
  { id: 'timestamp-converter' as ActiveTool, title: 'Timestamp Converter', description: 'Convert between Unix timestamps and dates', icon: Clock },
  { id: 'unit-converter' as ActiveTool, title: 'Unit Converter', description: 'Convert between units of measurement', icon: Calculator },
  { id: 'universal-converter' as ActiveTool, title: 'Universal File Converter', description: 'Convert between multiple file formats', icon: FileText },
  { id: 'url-encoder' as ActiveTool, title: 'URL Encoder & Decoder', description: 'Encode and decode URLs safely', icon: LinkIcon },
  { id: 'url-shortener' as ActiveTool, title: 'URL Shortener', description: 'Create short, shareable links', icon: LinkIcon },
  { id: 'uuid-generator' as ActiveTool, title: 'UUID Generator', description: 'Generate unique identifiers', icon: Fingerprint },
  { id: 'xml-formatter' as ActiveTool, title: 'XML Formatter & Validator', description: 'Format, validate, and minify XML', icon: FileCode },
];

const toolComponents: Record<string, React.FC> = {
  'image-converter': ImageConverter,
  'image-resizer': ImageResizer,
  'json-formatter': JsonFormatter,
  'base64-converter': Base64Converter,
  'url-shortener': BrokenURLShortener,
  'universal-converter': BrokenUniversalConverter,
  'circle-cropper': CircleImageCropper,
  'uuid-generator': UUIDGenerator,
  'timestamp-converter': TimestampConverter,
  'unit-converter': UnitConverter,
  'html-formatter': HTMLFormatter,
  'image-compressor': ImageCompressor,
  'css-minifier': CSSMinifier,
  'password-generator': PasswordGenerator,
  'color-picker': ColorPicker,
  'qr-generator': QRGenerator,
  'text-diff': TextDiff,
  'jwt-decoder': JWTDecoder,
  'url-encoder': URLEncoder,
  'regex-tester': RegexTester,
  'xml-formatter': XMLFormatter,
  'hash-generator': HashGenerator,
};

const Index = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('home');
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByAlpha, setSortByAlpha] = useState(false);

  const filteredTools = allTools
    .filter(tool => 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => sortByAlpha ? a.title.localeCompare(b.title) : 0);

  if (activeTool !== 'home') {
    const currentTool = allTools.find(tool => tool.id === activeTool);
    const ToolComponent = toolComponents[activeTool];
    
    return (
      <>
        <Helmet>
          <title>{currentTool?.title} - Professional Web Tools Suite</title>
          <meta name="description" content={`${currentTool?.description} - Free online tool for developers and creators.`} />
          <meta name="keywords" content={`${currentTool?.title?.toLowerCase()}, web tools, developer tools`} />
          <link rel="canonical" href={`https://webtoolssuite.com/${activeTool}`} />
        </Helmet>
        <AnimatedBackground>
          <div className="container mx-auto">
            <motion.div 
              className="pt-6 pb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                variant="ghost" 
                onClick={() => setActiveTool('home')}
                className="mb-4 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Tools
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {ToolComponent && <ToolComponent />}
            </motion.div>
          </div>
        </AnimatedBackground>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Professional Web Tools Suite - File Converters & Developer Utilities</title>
        <meta name="description" content="Free online web tools for developers and creators. Convert images, format JSON, generate UUIDs, convert timestamps, compress images, and more." />
        <meta name="keywords" content="web tools, file converter, image converter, json formatter, base64 encoder, uuid generator, developer tools" />
        <meta name="author" content="Nextup Studio" />
        <meta property="og:title" content="Professional Web Tools Suite - File Converters & Developer Utilities" />
        <meta property="og:description" content="Free online web tools for developers and creators." />
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
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>
      
      <AnimatedBackground>
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <header className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="p-4 rounded-2xl bg-gradient-hero shadow-glow-intense animate-float">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-animated bg-[length:400%_400%] animate-gradient-shift bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Web Tools Suite
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Professional web utilities for developers and creators. Convert files, transform data, and boost your productivity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <Chip variant="bordered" className="border-primary/30 text-muted-foreground">
                {allTools.length} Free Tools Available
              </Chip>
            </motion.div>
          </header>

          {/* Search and Filter */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                classNames={{
                  input: "bg-transparent",
                  inputWrapper: "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 focus-within:bg-white/10",
                }}
                startContent={<Search className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            <HeroButton
              variant={sortByAlpha ? "solid" : "bordered"}
              onPress={() => setSortByAlpha(!sortByAlpha)}
              className={sortByAlpha ? "bg-gradient-primary text-white" : "border-white/20 text-foreground"}
            >
              Sort A-Z
            </HeroButton>
          </motion.div>

          {/* Tools Grid */}
          <main>
            <AnimatePresence mode="wait">
              <motion.section 
                key={searchTerm + String(sortByAlpha)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    onClick={() => setActiveTool(tool.id)}
                    index={index}
                  />
                ))}
              </motion.section>
            </AnimatePresence>

            {filteredTools.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-muted-foreground text-lg">No tools found matching "{searchTerm}"</p>
              </motion.div>
            )}

            {/* Coming Soon */}
            <motion.section 
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                More Tools Coming Soon
              </h2>
              <p className="text-muted-foreground">
                We're constantly adding new tools to help streamline your workflow.
              </p>
            </motion.section>
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-background/30 backdrop-blur-xl mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-muted-foreground">
              <p>© 2025 Nextup Studio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </AnimatedBackground>
    </>
  );
};

export default Index;
