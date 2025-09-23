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
      className={`group cursor-pointer transition-all duration-500 hover:shadow-glow hover:-translate-y-3 hover:scale-[1.03] border-0 shadow-soft bg-card/80 backdrop-blur-sm animate-scale-in hover:bg-card/95 relative overflow-hidden ${className}`} 
      onClick={onClick}
      style={style}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
      
      <div className="relative p-6 flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-xl bg-gradient-primary text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-glow group-hover:shadow-glow-intense animate-pulse-glow">
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-all duration-300 group-hover:animate-wiggle">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-card-foreground transition-colors duration-300">{description}</p>
        </div>
        
        <div className="mt-auto transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="px-4 py-2 bg-gradient-primary text-white text-sm rounded-lg shadow-medium">
            Open Tool →
          </div>
        </div>
      </div>
    </Card>
  );
};