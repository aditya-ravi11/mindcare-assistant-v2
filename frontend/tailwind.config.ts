import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mindcare: {
          blue: "hsl(var(--mindcare-blue))",
          green: "hsl(var(--mindcare-green))",
          purple: "hsl(var(--mindcare-purple))",
          pink: "hsl(var(--mindcare-pink))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "gentle-pulse": "gentlePulse 6s ease-in-out infinite",
        "fade-in": "fadeIn 1s ease-in-out",
        "slide-up": "slideUp 0.8s ease-out",
        "float-orb": "floatOrb 12s ease-in-out infinite",
        "particle-float": "particleFloat 15s linear infinite",
        "section-fade-in": "sectionFadeIn 1s ease-out forwards",
        "stagger-in": "staggerIn 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateY(-15px) rotate(1deg)" },
          "50%": { transform: "translateY(-25px) rotate(0deg)" },
          "75%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        gentlePulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        floatOrb: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-30px) translateX(-5px)" },
          "75%": { transform: "translateY(-15px) translateX(-10px)" },
        },
        particleFloat: {
          "0%": { transform: "translateY(100vh) translateX(0px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) translateX(50px) rotate(360deg)", opacity: "0" },
        },
        sectionFadeIn: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        staggerIn: {
          from: { opacity: "0", transform: "translateY(20px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        "3xl": "0 35px 60px -12px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
}

export default config
