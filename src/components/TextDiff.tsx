import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TextDiff = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showDiff, setShowDiff] = useState(false);
  const { toast } = useToast();

  const compareTexts = () => {
    if (!text1.trim() && !text2.trim()) {
      toast({
        title: "Error",
        description: "Please enter text in both fields to compare",
        variant: "destructive",
      });
      return;
    }
    setShowDiff(true);
  };

  const clearAll = () => {
    setText1("");
    setText2("");
    setShowDiff(false);
  };

  const getDifferences = () => {
    if (!showDiff) return null;

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    
    const differences = [];
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";
      
      if (line1 !== line2) {
        differences.push({
          lineNumber: i + 1,
          original: line1,
          modified: line2,
          type: !line1 ? 'added' : !line2 ? 'removed' : 'modified'
        });
      }
    }

    return differences;
  };

  const differences = getDifferences();

  return (
    <>
      <Helmet>
        <title>Text Difference Checker - Compare Two Texts Online</title>
        <meta name="description" content="Compare and find differences between two text documents. Free online text diff tool to identify changes, additions, and deletions." />
        <meta name="keywords" content="text diff, text compare, difference checker, text comparison, diff tool, compare documents" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Text Difference Checker
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Compare two text documents to find differences, changes, additions, and deletions with visual highlighting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Original Text</h3>
              <Textarea
                placeholder="Paste or type the original text here..."
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </Card>

            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Modified Text</h3>
              <Textarea
                placeholder="Paste or type the modified text here..."
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </Card>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <Button onClick={compareTexts}>
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Compare Texts
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          </div>

          {showDiff && (
            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">
                Differences Found: {differences?.length || 0}
              </h3>
              
              {differences && differences.length > 0 ? (
                <div className="space-y-4">
                  {differences.map((diff, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-2">
                        Line {diff.lineNumber} - {diff.type === 'added' ? 'Added' : diff.type === 'removed' ? 'Removed' : 'Modified'}
                      </div>
                      
                      {diff.type !== 'added' && (
                        <div className="mb-2">
                          <div className="text-xs text-muted-foreground">Original:</div>
                          <div className="font-mono text-sm p-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded">
                            {diff.original || <span className="italic text-muted-foreground">(empty line)</span>}
                          </div>
                        </div>
                      )}
                      
                      {diff.type !== 'removed' && (
                        <div>
                          <div className="text-xs text-muted-foreground">Modified:</div>
                          <div className="font-mono text-sm p-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded">
                            {diff.modified || <span className="italic text-muted-foreground">(empty line)</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No differences found. The texts are identical.</p>
                </div>
              )}
            </Card>
          )}

          <Card className="mt-6 p-4 bg-muted/50 animate-fade-in">
            <h4 className="font-semibold mb-2">How to use:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Paste your original text in the left panel</li>
              <li>• Paste the modified text in the right panel</li>
              <li>• Click "Compare Texts" to see the differences</li>
              <li>• Added lines are highlighted in green, removed lines in red</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
};