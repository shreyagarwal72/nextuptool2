import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
  });
  const { toast } = useToast();

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const similar = "il1Lo0O";

    let charset = "";
    if (options.uppercase) charset += uppercase;
    if (options.lowercase) charset += lowercase;
    if (options.numbers) charset += numbers;
    if (options.symbols) charset += symbols;

    if (options.excludeSimilar) {
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
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied",
      description: "Password copied to clipboard",
    });
  };

  const getStrengthColor = () => {
    if (length[0] < 8) return "text-red-500";
    if (length[0] < 12) return "text-yellow-500";
    return "text-green-500";
  };

  const getStrengthText = () => {
    if (length[0] < 8) return "Weak";
    if (length[0] < 12) return "Medium";
    return "Strong";
  };

  return (
    <>
      <Helmet>
        <title>Secure Password Generator - Create Strong Passwords Online</title>
        <meta name="description" content="Generate secure, random passwords with customizable length and character sets. Create strong passwords for better online security." />
        <meta name="keywords" content="password generator, secure password, random password, strong password, password creator, security tool" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Secure Password Generator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate strong, secure passwords with customizable options to protect your accounts and sensitive information.
            </p>
          </div>

          <Card className="p-6 animate-fade-in">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Generated Password</h3>
                  <div className={`text-sm font-medium ${getStrengthColor()}`}>
                    Strength: {getStrengthText()}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={password}
                    readOnly
                    className="font-mono text-lg"
                    placeholder="Click 'Generate Password' to create a secure password"
                  />
                  <Button variant="outline" onClick={copyToClipboard} disabled={!password}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Password Length</label>
                    <span className="text-sm text-muted-foreground">{length[0]} characters</span>
                  </div>
                  <Slider
                    value={length}
                    onValueChange={setLength}
                    min={4}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={options.uppercase}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, uppercase: !!checked }))
                      }
                    />
                    <label htmlFor="uppercase" className="text-sm">Uppercase (A-Z)</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={options.lowercase}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, lowercase: !!checked }))
                      }
                    />
                    <label htmlFor="lowercase" className="text-sm">Lowercase (a-z)</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={options.numbers}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, numbers: !!checked }))
                      }
                    />
                    <label htmlFor="numbers" className="text-sm">Numbers (0-9)</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={options.symbols}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, symbols: !!checked }))
                      }
                    />
                    <label htmlFor="symbols" className="text-sm">Symbols (!@#$%)</label>
                  </div>

                  <div className="flex items-center space-x-2 col-span-2">
                    <Checkbox
                      id="excludeSimilar"
                      checked={options.excludeSimilar}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, excludeSimilar: !!checked }))
                      }
                    />
                    <label htmlFor="excludeSimilar" className="text-sm">Exclude similar characters (i, l, 1, L, o, 0, O)</label>
                  </div>
                </div>

                <Button onClick={generatePassword} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Password
                </Button>
              </div>
            </div>
          </Card>

          <Card className="mt-6 p-4 bg-muted/50 animate-fade-in">
            <h4 className="font-semibold mb-2">Password Security Tips:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use different passwords for each account</li>
              <li>• Consider using a password manager</li>
              <li>• Enable two-factor authentication when available</li>
              <li>• Avoid using personal information in passwords</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
};