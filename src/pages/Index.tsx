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
  Key,
  LinkIcon,
  Search,
  FileCode,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

type ActiveTool =
  | "home"
  | "image-converter"
  | "image-resizer"
  | "json-formatter"
  | "base64-converter"
  | "url-shortener"
  | "universal-converter"
  | "circle-cropper"
  | "uuid-generator"
  | "timestamp-converter"
  | "unit-converter"
  | "html-formatter"
  | "image-compressor"
  | "css-minifier"
  | "password-generator"
  | "color-picker"
  | "qr-generator"
  | "text-diff"
  | "jwt-decoder"
  | "url-encoder"
  | "regex-tester"
  | "xml-formatter";

type ToolColor = "primary" | "secondary" | "tertiary";

const allTools: {
  id: ActiveTool;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: ToolColor;
  category: string;
}[] = [
  { id: "image-converter",  title: "Image Format Converter",      description: "Convert PNG, JPG, WebP & other image formats",               icon: Image,       color: "primary",   category: "Image" },
  { id: "image-resizer",    title: "Image Resizer & Optimizer",   description: "Resize, crop and optimize images for web",                    icon: Scale,       color: "primary",   category: "Image" },
  { id: "image-compressor", title: "Image Compressor",            description: "Reduce image file size while maintaining quality",            icon: Zap,         color: "primary",   category: "Image" },
  { id: "circle-cropper",   title: "Circle Image Cropper",        description: "Crop images into perfect circle shapes",                      icon: Scissors,    color: "primary",   category: "Image" },
  { id: "json-formatter",   title: "JSON Formatter & Validator",  description: "Format, validate, and minify JSON data",                      icon: Code,        color: "secondary", category: "Code"  },
  { id: "html-formatter",   title: "HTML Formatter & Minifier",   description: "Format, beautify, and minify HTML code",                      icon: Code2,       color: "secondary", category: "Code"  },
  { id: "css-minifier",     title: "CSS Minifier & Optimizer",    description: "Compress and optimize CSS files for better performance",       icon: Minimize2,   color: "secondary", category: "Code"  },
  { id: "xml-formatter",    title: "XML Formatter & Validator",   description: "Format, validate, and minify XML documents",                  icon: FileCode,    color: "secondary", category: "Code"  },
  { id: "regex-tester",     title: "Regex Tester & Validator",    description: "Test and validate regular expressions with real-time matching",icon: Search,      color: "secondary", category: "Code"  },
  { id: "base64-converter", title: "Base64 Encoder/Decoder",      description: "Convert text and files to/from Base64",                       icon: FileText,    color: "tertiary",  category: "Encode"},
  { id: "url-encoder",      title: "URL Encoder & Decoder",       description: "Encode and decode URLs for safe transmission",                icon: LinkIcon,    color: "tertiary",  category: "Encode"},
  { id: "jwt-decoder",      title: "JWT Decoder & Validator",     description: "Decode and validate JSON Web Tokens",                         icon: Key,         color: "tertiary",  category: "Encode"},
  { id: "uuid-generator",   title: "UUID Generator",              description: "Generate unique identifiers for applications",                icon: Fingerprint, color: "tertiary",  category: "Generate"},
  { id: "password-generator",title: "Password Generator",         description: "Create secure, random passwords with custom options",         icon: Shield,      color: "tertiary",  category: "Generate"},
  { id: "qr-generator",     title: "QR Code Generator",           description: "Generate QR codes for URLs, text, and more",                  icon: QrCode,      color: "primary",   category: "Generate"},
  { id: "timestamp-converter",title: "Timestamp Converter",       description: "Convert between Unix timestamps and dates",                   icon: Clock,       color: "secondary", category: "Convert"},
  { id: "unit-converter",   title: "Unit Converter",              description: "Convert between different units of measurement",              icon: Calculator,  color: "secondary", category: "Convert"},
  { id: "universal-converter",title: "Universal File Converter",  description: "Convert between multiple file formats",                       icon: FileText,    color: "tertiary",  category: "Convert"},
  { id: "url-shortener",    title: "URL Shortener",               description: "Create short, shareable links",                               icon: LinkIcon,    color: "primary",   category: "Convert"},
  { id: "color-picker",     title: "Color Picker & Converter",    description: "Pick colors and convert between HEX, RGB, HSL formats",       icon: Palette,     color: "tertiary",  category: "Design"},
  { id: "text-diff",        title: "Text Difference Checker",     description: "Compare two texts and find differences",                      icon: FileText,    color: "secondary", category: "Text"  },
];

const categories = ["All", ...Array.from(new Set(allTools.map((t) => t.category)))];

const renderActiveTool = (activeTool: ActiveTool) => {
  switch (activeTool) {
    case "image-converter":   return <ImageConverter />;
    case "image-resizer":     return <ImageResizer />;
    case "json-formatter":    return <JsonFormatter />;
    case "base64-converter":  return <Base64Converter />;
    case "url-shortener":     return <BrokenURLShortener />;
    case "universal-converter":return <BrokenUniversalConverter />;
    case "circle-cropper":    return <CircleImageCropper />;
    case "uuid-generator":    return <UUIDGenerator />;
    case "timestamp-converter":return <TimestampConverter />;
    case "unit-converter":    return <UnitConverter />;
    case "html-formatter":    return <HTMLFormatter />;
    case "image-compressor":  return <ImageCompressor />;
    case "css-minifier":      return <CSSMinifier />;
    case "password-generator":return <PasswordGenerator />;
    case "color-picker":      return <ColorPicker />;
    case "qr-generator":      return <QRGenerator />;
    case "text-diff":         return <TextDiff />;
    case "jwt-decoder":       return <JWTDecoder />;
    case "url-encoder":       return <URLEncoder />;
    case "regex-tester":      return <RegexTester />;
    case "xml-formatter":     return <XMLFormatter />;
    default:                  return null;
  }
};

const Index = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortByAlpha, setSortByAlpha] = useState(false);

  const filteredTools = allTools
    .filter((tool) => {
      const matchSearch =
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === "All" || tool.category === activeCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => (sortByAlpha ? a.title.localeCompare(b.title) : 0));

  /* ── Tool view ── */
  if (activeTool !== "home") {
    const currentTool = allTools.find((t) => t.id === activeTool);
    return (
      <>
        <Helmet>
          <title>{currentTool?.title} – Nextup Websuite</title>
          <meta name="description" content={`${currentTool?.description} – Free online tool. Fast, secure, runs in your browser.`} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://nextuptool2.lovable.app/${activeTool}`} />
        </Helmet>
        <AnimatedBackground>
          {/* M3 Top App Bar */}
          <header className="m3-top-bar flex items-center gap-3">
            <button
              onClick={() => setActiveTool("home")}
              aria-label="Back to tools"
              className="m3-fab w-10 h-10 rounded-xl shrink-0 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: "hsl(var(--surface-container))",
                color: "hsl(var(--foreground))",
                boxShadow: "none",
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(var(--primary-container))" }}
              >
                <Wrench className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
              </div>
              <span className="title-large text-foreground truncate">{currentTool?.title}</span>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8 animate-fade-in">
            {renderActiveTool(activeTool)}
          </main>
        </AnimatedBackground>
      </>
    );
  }

  /* ── Home view ── */
  return (
    <>
      <Helmet>
        <title>Nextup Websuite – All Web Tools in One Place</title>
        <meta name="description" content="Free online web tools for developers and creators. Convert images, format JSON, generate UUIDs, encode URLs, compress images, and much more. Fast, secure, browser-based." />
        <meta name="keywords" content="web tools, file converter, image converter, json formatter, base64 encoder, url shortener, uuid generator, timestamp converter, unit converter, html formatter, developer tools, online utilities, nextup websuite" />
        <meta name="author" content="Nextup Studio" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Nextup Websuite – All Web Tools in One Place" />
        <meta property="og:description" content="Free online tools for developers and creators. Convert files, transform data, and boost productivity." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextuptool2.lovable.app" />
        <meta property="og:image" content="https://nextuptool2.lovable.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nextup Websuite – All Web Tools in One Place" />
        <meta name="twitter:description" content="Free online tools for developers and creators." />
        <meta name="twitter:image" content="https://nextuptool2.lovable.app/og-image.png" />
        <link rel="canonical" href="https://nextuptool2.lovable.app" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Nextup Websuite",
            description: "All-in-one professional web utilities for developers and creators",
            url: "https://nextuptool2.lovable.app",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          })}
        </script>
      </Helmet>

      <AnimatedBackground>
        {/* ── M3 Top App Bar ── */}
        <header className="m3-top-bar flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center animate-float"
              style={{ background: "var(--gradient-primary)" }}
              aria-hidden="true"
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="title-large font-display text-foreground hidden sm:block">
              Nextup <span className="text-gradient">Websuite</span>
            </span>
          </div>

          <button
            onClick={() => setSortByAlpha(!sortByAlpha)}
            aria-pressed={sortByAlpha}
            aria-label="Toggle alphabetical sort"
            className={`m3-chip ${sortByAlpha ? "active" : ""}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            Sort A–Z
          </button>
        </header>

        <div className="container mx-auto px-4 pb-20">
          {/* ── Hero ── */}
          <section className="text-center py-16 md:py-20 animate-fade-in-up" aria-labelledby="hero-heading">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 label-large animate-scale-in"
              style={{
                background: "hsl(var(--primary-container))",
                color: "hsl(var(--on-primary-container))",
                animationDelay: "0.1s",
              }}
            >
              <Zap className="w-3.5 h-3.5" aria-hidden="true" />
              21 free tools · No account needed
            </div>

            <h1
              id="hero-heading"
              className="display-small md:display-medium font-display font-normal mb-5 bg-gradient-animated bg-[length:400%_400%] animate-gradient-shift bg-clip-text text-transparent"
            >
              All Web Tools,<br className="hidden md:block" /> One Place
            </h1>

            <p className="body-large text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-in-slow" style={{ animationDelay: "0.3s" }}>
              Developer utilities, image tools, converters, and generators —
              all running instantly in your browser. No uploads, no tracking.
            </p>
          </section>

          {/* ── Search ── */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search tools…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search tools"
                className="m3-search pl-11 pr-5"
              />
            </div>
          </div>

          {/* ── Category chips ── */}
          <nav aria-label="Filter by category" className="flex flex-wrap gap-2 justify-center mb-10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`m3-chip ${activeCategory === cat ? "active" : ""}`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* ── Tools Grid ── */}
          <main>
            {filteredTools.length === 0 ? (
              <div className="text-center py-24 animate-fade-in">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "hsl(var(--surface-container))" }}
                >
                  <Search className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="headline-small text-muted-foreground">No tools found</p>
                <p className="body-medium text-muted-foreground mt-1">Try a different search or category</p>
              </div>
            ) : (
              <section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20"
                aria-label="Available tools"
              >
                {filteredTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    onClick={() => setActiveTool(tool.id)}
                    color={tool.color}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.04}s` }}
                  />
                ))}
              </section>
            )}

            {/* Coming soon */}
            <section className="text-center py-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div
                className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-3xl"
                style={{ background: "hsl(var(--surface-container))" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse"
                  style={{ background: "hsl(var(--primary-container))" }}
                >
                  <Zap className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h2 className="title-large text-foreground">More tools coming soon</h2>
                <p className="body-medium text-muted-foreground max-w-xs">
                  We're constantly expanding the toolkit. Check back regularly.
                </p>
              </div>
            </section>
          </main>
        </div>

        {/* ── Footer ── */}
        <footer
          className="border-t py-8"
          style={{
            borderColor: "hsl(var(--outline-variant))",
            background: "hsl(var(--surface-container) / 0.6)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="label-large text-muted-foreground">Nextup Websuite</span>
            </div>
            <p className="body-small text-muted-foreground">© 2025 Nextup Studio · All rights reserved</p>
          </div>
        </footer>
      </AnimatedBackground>
    </>
  );
};

export default Index;
