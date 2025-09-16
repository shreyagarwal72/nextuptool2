import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Palette, Copy, RefreshCw, Download } from "lucide-react";

interface Color {
  hex: string;
  rgb: string;
  hsl: string;
}

export const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [paletteType, setPaletteType] = useState("complementary");
  const [colors, setColors] = useState<Color[]>([]);
  const { toast } = useToast();

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const generatePalette = () => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const palette: Color[] = [];

    // Add base color
    palette.push({
      hex: baseColor,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    });

    switch (paletteType) {
      case "complementary":
        const compHue = (hsl.h + 180) % 360;
        const compHex = hslToHex(compHue, hsl.s, hsl.l);
        const compRgb = hexToRgb(compHex);
        palette.push({
          hex: compHex,
          rgb: `rgb(${compRgb.r}, ${compRgb.g}, ${compRgb.b})`,
          hsl: `hsl(${compHue}, ${hsl.s}%, ${hsl.l}%)`
        });
        break;

      case "triadic":
        for (let i = 1; i <= 2; i++) {
          const triadHue = (hsl.h + i * 120) % 360;
          const triadHex = hslToHex(triadHue, hsl.s, hsl.l);
          const triadRgb = hexToRgb(triadHex);
          palette.push({
            hex: triadHex,
            rgb: `rgb(${triadRgb.r}, ${triadRgb.g}, ${triadRgb.b})`,
            hsl: `hsl(${triadHue}, ${hsl.s}%, ${hsl.l}%)`
          });
        }
        break;

      case "analogous":
        for (let i = 1; i <= 4; i++) {
          const anaHue = (hsl.h + i * 30) % 360;
          const anaHex = hslToHex(anaHue, hsl.s, hsl.l);
          const anaRgb = hexToRgb(anaHex);
          palette.push({
            hex: anaHex,
            rgb: `rgb(${anaRgb.r}, ${anaRgb.g}, ${anaRgb.b})`,
            hsl: `hsl(${anaHue}, ${hsl.s}%, ${hsl.l}%)`
          });
        }
        break;

      case "monochromatic":
        const lightnesses = [25, 50, 75, 90];
        lightnesses.forEach(lightness => {
          const monoHex = hslToHex(hsl.h, hsl.s, lightness);
          const monoRgb = hexToRgb(monoHex);
          palette.push({
            hex: monoHex,
            rgb: `rgb(${monoRgb.r}, ${monoRgb.g}, ${monoRgb.b})`,
            hsl: `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`
          });
        });
        break;
    }

    setColors(palette);
    toast({
      title: "Palette Generated!",
      description: `${paletteType} color palette created`,
    });
  };

  const copyColor = async (color: string, format: string) => {
    try {
      await navigator.clipboard.writeText(color);
      toast({
        title: "Copied!",
        description: `${format} color copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy color",
        variant: "destructive",
      });
    }
  };

  const exportPalette = () => {
    if (colors.length === 0) return;

    const paletteData = {
      type: paletteType,
      baseColor,
      colors: colors.map((color, index) => ({
        name: `Color ${index + 1}`,
        ...color
      }))
    };

    const dataStr = JSON.stringify(paletteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `color-palette-${paletteType}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Palette className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Color Palette Generator</h1>
          <p className="text-muted-foreground">Generate beautiful color palettes for your designs</p>
        </div>

        <div className="grid gap-6">
          {/* Settings Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Palette Settings</h2>
            
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <Label htmlFor="base-color">Base Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="base-color"
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-12 h-10 p-1 border-2"
                  />
                  <Input
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="font-mono"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="palette-type">Palette Type</Label>
                <Select value={paletteType} onValueChange={setPaletteType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complementary">Complementary</SelectItem>
                    <SelectItem value="triadic">Triadic</SelectItem>
                    <SelectItem value="analogous">Analogous</SelectItem>
                    <SelectItem value="monochromatic">Monochromatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generatePalette}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate
              </Button>

              {colors.length > 0 && (
                <Button variant="outline" onClick={exportPalette}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </Card>

          {/* Palette Display */}
          {colors.length > 0 && (
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">Color Palette</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {colors.map((color, index) => (
                  <div key={index} className="group">
                    <div 
                      className="w-full h-24 rounded-lg mb-3 border border-border shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono flex-1">{color.hex}</code>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyColor(color.hex, "HEX")}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono flex-1">{color.rgb}</code>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyColor(color.rgb, "RGB")}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono flex-1">{color.hsl}</code>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyColor(color.hsl, "HSL")}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};