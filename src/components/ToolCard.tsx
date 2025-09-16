import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

export const ToolCard = ({ title, description, icon: Icon, onClick, className }: ToolCardProps) => {
  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1 border-0 shadow-soft bg-card/80 backdrop-blur-sm ${className}`} onClick={onClick}>
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-xl bg-gradient-primary text-white group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <Button variant="ghost" size="sm" className="mt-auto group-hover:bg-secondary/50 transition-colors">
          Open Tool
        </Button>
      </div>
    </Card>
  );
};