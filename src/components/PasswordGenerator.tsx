import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Key, Copy, RefreshCw, Shield } from "lucide-react";

export const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const { toast } = useToast();

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const similar = "il1Lo0O";

    let charset = "";
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (excludeSimilar) {
      charset = charset.split('').filter(char => !similar.includes(char)).join('');
    }

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(result);
    toast({
      title: "Password Generated!",
      description: "Your secure password is ready",
    });
  };

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: "None", color: "text-muted-foreground", percentage: 0 };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { strength: "Weak", color: "text-red-500", percentage: 33 };
    if (score <= 4) return { strength: "Medium", color: "text-yellow-500", percentage: 66 };
    return { strength: "Strong", color: "text-green-500", percentage: 100 };
  };

  const strengthInfo = getPasswordStrength();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Key className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Password Generator</h1>
          <p className="text-muted-foreground">Generate secure, random passwords for your accounts</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Settings Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Password Settings</h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium">
                  Password Length: {length[0]}
                </Label>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  max={128}
                  min={4}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>4</span>
                  <span>128</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-card-foreground">Character Types</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
                  />
                  <Label htmlFor="uppercase" className="text-sm">
                    Uppercase Letters (A-Z)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
                  />
                  <Label htmlFor="lowercase" className="text-sm">
                    Lowercase Letters (a-z)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                  />
                  <Label htmlFor="numbers" className="text-sm">
                    Numbers (0-9)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
                  />
                  <Label htmlFor="symbols" className="text-sm">
                    Symbols (!@#$%^&*)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exclude-similar"
                    checked={excludeSimilar}
                    onCheckedChange={(checked) => setExcludeSimilar(checked === true)}
                  />
                  <Label htmlFor="exclude-similar" className="text-sm">
                    Exclude Similar Characters (il1Lo0O)
                  </Label>
                </div>
              </div>

              <Button onClick={generatePassword} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Password
              </Button>
            </div>
          </Card>

          {/* Result Section */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Generated Password</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <Input
                  value={password}
                  readOnly
                  placeholder="Click 'Generate Password' to create a secure password"
                  className="font-mono text-sm pr-10"
                />
                {password && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {password && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Password Strength:</span>
                    <span className={`text-sm font-medium ${strengthInfo.color}`}>
                      {strengthInfo.strength}
                    </span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strengthInfo.strength === 'Weak' ? 'bg-red-500' :
                        strengthInfo.strength === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${strengthInfo.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Length: {password.length} characters</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};