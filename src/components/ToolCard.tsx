import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
}

export const ToolCard = ({ title, description, icon: Icon, onClick, className, style, index = 0 }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={style}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className={`group border-0 rounded-2xl bg-white/5 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/10 transition-all duration-500 hover:shadow-glow h-full ${className}`}>
        <div className="flex flex-col items-center text-center gap-4 p-6">
          <motion.div 
            className="p-4 rounded-2xl bg-gradient-primary text-white shadow-glow"
            whileHover={{ scale: 1.15, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-card-foreground/80 transition-colors duration-300">
              {description}
            </p>
          </div>

          <div className="px-4 py-2 bg-gradient-primary text-white text-sm rounded-xl shadow-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Open Tool →
          </div>
        </div>
      </div>
    </motion.div>
  );
};
