import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'Google Sans Text'", "Roboto", "Inter", "system-ui", "sans-serif"],
        display: ["'Google Sans Display'", "'Google Sans'", "Roboto", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          container: "hsl(var(--primary-container))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          container: "hsl(var(--secondary-container))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
          container: "hsl(var(--tertiary-container))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          variant: "hsl(var(--surface-variant))",
          container: "hsl(var(--surface-container))",
          "container-high": "hsl(var(--surface-container-high))",
        },
        outline: {
          DEFAULT: "hsl(var(--outline))",
          variant: "hsl(var(--outline-variant))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-hero":    "var(--gradient-hero)",
        "gradient-shimmer": "var(--gradient-shimmer)",
        "gradient-animated":"var(--gradient-animated)",
        "gradient-surface": "var(--gradient-surface)",
        "gradient-card":    "var(--gradient-card)",
      },
      boxShadow: {
        "1": "var(--shadow-1)",
        "2": "var(--shadow-2)",
        "3": "var(--shadow-3)",
        "4": "var(--shadow-4)",
        "5": "var(--shadow-5)",
        "soft":         "var(--shadow-soft)",
        "medium":       "var(--shadow-medium)",
        "large":        "var(--shadow-large)",
        "glow":         "var(--shadow-glow)",
        "glow-intense": "var(--shadow-glow-intense)",
      },
      borderRadius: {
        lg:   "var(--radius)",
        md:   "var(--radius-md)",
        xl:   "var(--radius-xl)",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "var(--radius-full)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to:   { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to:   { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%":   { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%":   { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%":   { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-in": {
          "0%":   { transform: "scale(0.5)",  opacity: "0" },
          "60%":  { transform: "scale(1.05)", opacity: "0.9" },
          "100%": { transform: "scale(1)",    opacity: "1" },
        },
        "rotate-in": {
          "0%":   { transform: "rotate(-180deg) scale(0.8)", opacity: "0" },
          "100%": { transform: "rotate(0deg) scale(1)",      opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%":      { transform: "rotate(2deg)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px hsl(243 75% 59% / 0.25)" },
          "50%":      { boxShadow: "0 0 32px hsl(243 75% 59% / 0.50)" },
        },
        "bg-float": {
          "0%, 100%": { transform: "scale(1) translateY(0px)",    filter: "hue-rotate(0deg)" },
          "50%":      { transform: "scale(1.04) translateY(-8px)", filter: "hue-rotate(8deg)" },
        },
        "bg-pulse": {
          "0%":   { opacity: "0.4" },
          "100%": { opacity: "0.65" },
        },
        "card-hover": {
          "0%":   { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-6px)" },
        },
        "m3-ripple": {
          "0%":   { transform: "scale(0)", opacity: "0.3" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.25s cubic-bezier(0.2,0,0,1)",
        "accordion-up":    "accordion-up 0.2s cubic-bezier(0.3,0,1,1)",
        "fade-in":         "fade-in 0.4s cubic-bezier(0.2,0,0,1) both",
        "fade-in-fast":    "fade-in 0.2s cubic-bezier(0.2,0,0,1) both",
        "fade-in-slow":    "fade-in 0.6s cubic-bezier(0.2,0,0,1) both",
        "fade-in-up":      "fade-in-up 0.5s cubic-bezier(0.2,0,0,1) both",
        "slide-up":        "slide-up 0.4s cubic-bezier(0,0,0,1)",
        "slide-down":      "slide-down 0.4s cubic-bezier(0,0,0,1)",
        "scale-in":        "scale-in 0.3s cubic-bezier(0.2,0,0,1) both",
        "bounce-in":       "bounce-in 0.5s cubic-bezier(0.2,0,0,1) both",
        "rotate-in":       "rotate-in 0.5s cubic-bezier(0.2,0,0,1) both",
        "float":           "float 4s ease-in-out infinite",
        "wiggle":          "wiggle 1s ease-in-out infinite",
        "shimmer":         "shimmer 2.5s linear infinite",
        "gradient-shift":  "gradient-shift 6s ease infinite",
        "pulse-glow":      "pulse-glow 2.5s ease-in-out infinite",
        "bg-float":        "bg-float 25s ease-in-out infinite",
        "bg-pulse":        "bg-pulse 18s ease-in-out infinite alternate",
        "m3-ripple":       "m3-ripple 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
