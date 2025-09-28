import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Key, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const JWTDecoder = () => {
  const [jwt, setJwt] = useState("");
  const [decodedHeader, setDecodedHeader] = useState("");
  const [decodedPayload, setDecodedPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const decodeJWT = () => {
    try {
      setError("");
      if (!jwt.trim()) {
        setError("Please enter a JWT token");
        return;
      }

      const parts = jwt.split('.');
      if (parts.length !== 3) {
        setError("Invalid JWT format. JWT should have 3 parts separated by dots.");
        return;
      }

      // Decode header
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      setDecodedHeader(JSON.stringify(header, null, 2));

      // Decode payload
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setDecodedPayload(JSON.stringify(payload, null, 2));

      // Set signature
      setSignature(parts[2]);

    } catch (err) {
      setError("Invalid JWT token. Please check your input.");
      setDecodedHeader("");
      setDecodedPayload("");
      setSignature("");
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const clearAll = () => {
    setJwt("");
    setDecodedHeader("");
    setDecodedPayload("");
    setSignature("");
    setError("");
  };

  return (
    <>
      <Helmet>
        <title>JWT Decoder & Validator - Professional Web Tools Suite</title>
        <meta name="description" content="Decode and validate JWT tokens online. View header, payload, and signature of JSON Web Tokens. Fast, secure, and easy to use JWT decoder tool." />
        <meta name="keywords" content="jwt decoder, json web token, jwt validator, token decoder, jwt parser, web security tools" />
        <link rel="canonical" href="https://webtoolssuite.com/jwt-decoder" />
      </Helmet>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-slide-down">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-hero shadow-glow-intense animate-float">
                <Key className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-animated bg-clip-text text-transparent">
              JWT Decoder & Validator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Decode and validate JSON Web Tokens (JWT). View header, payload, and signature information.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Input Section */}
            <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 animate-scale-in">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-primary animate-wiggle" />
                JWT Token Input
              </h2>
              <Textarea
                placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
                value={jwt}
                onChange={(e) => setJwt(e.target.value)}
                className="min-h-[120px] mb-4 font-mono text-sm focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              
              {error && (
                <div className="flex items-center gap-2 text-destructive mb-4 animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={decodeJWT}
                  className="bg-gradient-primary hover:bg-gradient-hero hover:scale-105 transition-all duration-300"
                >
                  Decode JWT
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearAll}
                  className="hover:scale-105 transition-all duration-300"
                >
                  Clear All
                </Button>
              </div>
            </Card>

            {/* Results Section */}
            {(decodedHeader || decodedPayload || signature) && (
              <div className="grid gap-6 lg:grid-cols-2 animate-slide-up">
                {/* Header */}
                <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Badge variant="secondary" className="animate-pulse-glow">Header</Badge>
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(decodedHeader, "Header")}
                      className="hover:scale-110 transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto border border-border/50">
                    {decodedHeader}
                  </pre>
                </Card>

                {/* Payload */}
                <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Badge variant="secondary" className="animate-pulse-glow">Payload</Badge>
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(decodedPayload, "Payload")}
                      className="hover:scale-110 transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto border border-border/50 max-h-[400px] overflow-y-auto">
                    {decodedPayload}
                  </pre>
                </Card>

                {/* Signature */}
                <Card className="p-6 shadow-glow hover:shadow-glow-intense transition-all duration-500 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Badge variant="secondary" className="animate-pulse-glow">Signature (Base64url Encoded)</Badge>
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(signature, "Signature")}
                      className="hover:scale-110 transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto border border-border/50 break-all">
                    {signature}
                  </pre>
                </Card>
              </div>
            )}

            {/* Info Section */}
            <Card className="p-6 bg-gradient-subtle border-primary/20 animate-fade-in-slow">
              <h3 className="text-lg font-semibold mb-3 text-primary">About JWT Tokens</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• JWT (JSON Web Token) is a compact, URL-safe means of representing claims between two parties</p>
                <p>• A JWT consists of three parts: Header, Payload, and Signature, separated by dots (.)</p>
                <p>• The header contains metadata about the token (algorithm, type)</p>
                <p>• The payload contains the claims (user data, permissions, expiration)</p>
                <p>• The signature ensures the token hasn't been tampered with</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};