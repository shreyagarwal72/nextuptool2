import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  color?: "primary" | "secondary" | "tertiary";
}

const colorMap = {
  primary: {
    container: "hsl(var(--primary-container))",
    onContainer: "hsl(var(--on-primary-container))",
    icon: "hsl(var(--primary))",
  },
  secondary: {
    container: "hsl(var(--secondary-container))",
    onContainer: "hsl(var(--on-secondary-container))",
    icon: "hsl(var(--secondary))",
  },
  tertiary: {
    container: "hsl(var(--tertiary-container))",
    onContainer: "hsl(var(--on-tertiary-container))",
    icon: "hsl(var(--tertiary))",
  },
};

export const ToolCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  className = "",
  style,
  color = "primary",
}: ToolCardProps) => {
  const c = colorMap[color];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`
        group relative cursor-pointer select-none outline-none
        rounded-[1.75rem] overflow-hidden
        bg-card border border-border/40
        transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
        hover:-translate-y-2 hover:scale-[1.02]
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${className}
      `}
      style={{
        boxShadow: "var(--shadow-2)",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-2)";
      }}
    >
      {/* State layer */}
      <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
           style={{ background: `hsl(var(--primary) / 0.04)` }} />

      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.06) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s linear infinite",
        }}
      />

      <div className="relative p-6 flex flex-col h-full gap-4">
        {/* Icon container – M3 tonal color surface */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: c.container,
          }}
        >
          <Icon
            className="w-7 h-7 transition-transform duration-300"
            style={{ color: c.icon }}
            aria-hidden="true"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="title-medium text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="body-small text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Open label – slides in on hover */}
        <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]">
          <span
            className="label-medium inline-flex items-center gap-1 px-3 py-1 rounded-full"
            style={{
              background: c.container,
              color: c.onContainer,
            }}
          >
            Open tool →
          </span>
        </div>
      </div>
    </div>
  );
};
