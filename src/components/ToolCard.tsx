import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ToolCard = ({ title, description, icon: Icon, onClick, className, style }: ToolCardProps) => {
  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-2 hover:scale-[1.02] border-0 shadow-soft bg-card/80 backdrop-blur-sm animate-fade-in hover:bg-card/90 ${className}`} 
      onClick={onClick}
      style={style}
    >
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-xl bg-gradient-primary text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <Button variant="ghost" size="sm" className="mt-auto group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 hover:scale-105">
          Open Tool
        </Button>
      </div>
    </Card>
  );
};