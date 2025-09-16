import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calculator, ArrowRightLeft } from "lucide-react";

interface ConversionUnit {
  name: string;
  symbol: string;
  toBase: number; // multiplier to convert to base unit
}

interface UnitCategory {
  name: string;
  baseUnit: string;
  units: ConversionUnit[];
}

export const UnitConverter = () => {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const categories: Record<string, UnitCategory> = {
    length: {
      name: "Length",
      baseUnit: "meter",
      units: [
        { name: "millimeter", symbol: "mm", toBase: 0.001 },
        { name: "centimeter", symbol: "cm", toBase: 0.01 },
        { name: "meter", symbol: "m", toBase: 1 },
        { name: "kilometer", symbol: "km", toBase: 1000 },
        { name: "inch", symbol: "in", toBase: 0.0254 },
        { name: "foot", symbol: "ft", toBase: 0.3048 },
        { name: "yard", symbol: "yd", toBase: 0.9144 },
        { name: "mile", symbol: "mi", toBase: 1609.344 },
      ]
    },
    weight: {
      name: "Weight",
      baseUnit: "gram",
      units: [
        { name: "milligram", symbol: "mg", toBase: 0.001 },
        { name: "gram", symbol: "g", toBase: 1 },
        { name: "kilogram", symbol: "kg", toBase: 1000 },
        { name: "ounce", symbol: "oz", toBase: 28.3495 },
        { name: "pound", symbol: "lb", toBase: 453.592 },
        { name: "stone", symbol: "st", toBase: 6350.29 },
        { name: "ton", symbol: "t", toBase: 1000000 },
      ]
    },
    temperature: {
      name: "Temperature",
      baseUnit: "celsius",
      units: [
        { name: "celsius", symbol: "°C", toBase: 1 },
        { name: "fahrenheit", symbol: "°F", toBase: 1 },
        { name: "kelvin", symbol: "K", toBase: 1 },
      ]
    },
    volume: {
      name: "Volume",
      baseUnit: "liter",
      units: [
        { name: "milliliter", symbol: "ml", toBase: 0.001 },
        { name: "liter", symbol: "l", toBase: 1 },
        { name: "gallon", symbol: "gal", toBase: 3.78541 },
        { name: "quart", symbol: "qt", toBase: 0.946353 },
        { name: "pint", symbol: "pt", toBase: 0.473176 },
        { name: "cup", symbol: "cup", toBase: 0.236588 },
        { name: "fluid ounce", symbol: "fl oz", toBase: 0.0295735 },
      ]
    },
    area: {
      name: "Area",
      baseUnit: "square meter",
      units: [
        { name: "square millimeter", symbol: "mm²", toBase: 0.000001 },
        { name: "square centimeter", symbol: "cm²", toBase: 0.0001 },
        { name: "square meter", symbol: "m²", toBase: 1 },
        { name: "square kilometer", symbol: "km²", toBase: 1000000 },
        { name: "square inch", symbol: "in²", toBase: 0.00064516 },
        { name: "square foot", symbol: "ft²", toBase: 0.092903 },
        { name: "square yard", symbol: "yd²", toBase: 0.836127 },
        { name: "acre", symbol: "ac", toBase: 4046.86 },
      ]
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case "fahrenheit":
        celsius = (value - 32) * 5/9;
        break;
      case "kelvin":
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target
    switch (to) {
      case "fahrenheit":
        return celsius * 9/5 + 32;
      case "kelvin":
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      toast({
        title: "Error",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (!fromUnit || !toUnit) {
      toast({
        title: "Error",
        description: "Please select both units",
        variant: "destructive",
      });
      return;
    }

    const currentCategory = categories[category];
    let convertedValue: number;

    if (category === "temperature") {
      convertedValue = convertTemperature(value, fromUnit, toUnit);
    } else {
      const fromUnitData = currentCategory.units.find(u => u.name === fromUnit);
      const toUnitData = currentCategory.units.find(u => u.name === toUnit);
      
      if (!fromUnitData || !toUnitData) return;

      // Convert to base unit, then to target unit
      const baseValue = value * fromUnitData.toBase;
      convertedValue = baseValue / toUnitData.toBase;
    }

    setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ""));
    
    toast({
      title: "Converted!",
      description: "Unit conversion completed",
    });
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result && inputValue) {
      setInputValue(result);
      setResult(inputValue);
    }
  };

  const currentCategory = categories[category];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary animate-bounce-in">
              <Calculator className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Unit Converter</h1>
          <p className="text-muted-foreground">Convert between different units of measurement</p>
        </div>

        <div className="grid gap-6">
          {/* Category Selection */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Category</h2>
            <Select value={category} onValueChange={(value) => {
              setCategory(value);
              setFromUnit("");
              setToUnit("");
              setInputValue("");
              setResult("");
            }}>
              <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categories).map(([key, cat]) => (
                  <SelectItem key={key} value={key}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Conversion Interface */}
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {/* From Unit */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="from-value">Value</Label>
                  <Input
                    id="from-value"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                <div>
                  <Label htmlFor="from-unit">From</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentCategory.units.map((unit) => (
                        <SelectItem key={unit.name} value={unit.name}>
                          {unit.name} ({unit.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={swapUnits}
                className="hover:scale-110 transition-transform duration-200"
                disabled={!fromUnit || !toUnit}
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* To Unit */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="to-value">Result</Label>
                  <Input
                    id="to-value"
                    value={result}
                    readOnly
                    placeholder="Result will appear here"
                    className="bg-muted/50 font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="to-unit">To</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentCategory.units.map((unit) => (
                        <SelectItem key={unit.name} value={unit.name}>
                          {unit.name} ({unit.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Convert Button */}
          <div className="text-center">
            <Button 
              onClick={convert} 
              size="lg" 
              className="hover:scale-105 transition-transform duration-200"
              disabled={!inputValue || !fromUnit || !toUnit}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Convert
            </Button>
          </div>

          {/* Common Conversions */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h3 className="text-lg font-semibold mb-3 text-card-foreground">Common Conversions</h3>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {category === "length" && (
                <>
                  <div>1 meter = 3.28084 feet</div>
                  <div>1 kilometer = 0.621371 miles</div>
                  <div>1 inch = 2.54 centimeters</div>
                  <div>1 foot = 30.48 centimeters</div>
                </>
              )}
              {category === "weight" && (
                <>
                  <div>1 kilogram = 2.20462 pounds</div>
                  <div>1 pound = 16 ounces</div>
                  <div>1 stone = 14 pounds</div>
                  <div>1 ton = 1000 kilograms</div>
                </>
              )}
              {category === "temperature" && (
                <>
                  <div>0°C = 32°F = 273.15K</div>
                  <div>100°C = 212°F = 373.15K</div>
                  <div>°F = °C × 9/5 + 32</div>
                  <div>K = °C + 273.15</div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};