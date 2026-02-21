import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a78bfa",
          600: "#9333ea",
        },
        brand: {
          sky: "#38BDF8",
          purple: "#A78BFA",
          dark: "#0A0F1E",
          card: "#0D1526",
          border: "rgba(56,189,248,0.15)",
        },
      },

      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        display: ["Arial", "Helvetica", "sans-serif"],
        body: ["Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)",
        "gradient-dark": "linear-gradient(180deg, #0A0F1E 0%, #0D1526 100%)",
        "mesh-1":
          "radial-gradient(at 40% 20%, hsla(199,89%,60%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(270,60%,80%,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(199,89%,60%,0.2) 0px, transparent 50%)",
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        pulse2: "pulse2 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(56,189,248,0.3)" },
          "100%": { boxShadow: "0 0 60px rgba(167,139,250,0.5)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },

  plugins: [],
};
export default config;
