import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ColorPicker = () => {
  const [color, setColor] = useState("#3b82f6");
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyToClipboard = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied",
      description: `${format} color value copied to clipboard`,
    });
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const colorFormats = [
    { name: "HEX", value: color.toUpperCase() },
    { name: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "" },
    { name: "RGBA", value: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : "" },
    { name: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "" },
    { name: "HSLA", value: hsl ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)` : "" },
  ];

  const presetColors = [
    "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7",
    "#dda0dd", "#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3",
    "#ff9f43", "#ee5a24", "#0abde3", "#10ac84", "#f368e0",
    "#3742fa", "#2f3542", "#ff3838", "#7bed9f", "#70a1ff",
  ];

  return (
    <>
      <Helmet>
        <title>Color Picker & Converter - Extract & Convert Colors Online</title>
        <meta name="description" content="Pick colors and convert between HEX, RGB, HSL formats. Professional color picker tool with preset colors and format conversion." />
        <meta name="keywords" content="color picker, hex to rgb, color converter, color palette, rgb to hex, hsl color, color tool" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
                <Palette className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Color Picker & Converter
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pick colors and convert between different color formats including HEX, RGB, HSL, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Color Picker</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-20 h-20 rounded-lg border-2 border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <Input
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="#000000"
                      className="font-mono"
                    />
                  </div>
                </div>

                <div
                  className="w-full h-32 rounded-lg border-2 border-border"
                  style={{ backgroundColor: color }}
                />
              </div>
            </Card>

            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Color Formats</h3>
              
              <div className="space-y-3">
                {colorFormats.map((format) => (
                  <div key={format.name} className="flex items-center gap-2">
                    <div className="w-12 text-sm font-medium">{format.name}:</div>
                    <Input
                      value={format.value}
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(format.value, format.name)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Preset Colors</h3>
            
            <div className="grid grid-cols-10 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => setColor(presetColor)}
                  className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors hover:scale-105"
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};