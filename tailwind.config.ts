import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        muted: "#667085",
        ivory: "#F9FAFB",
        gold: "#B9894B",
        graphite: "#171717"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Playfair Display", "serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(15, 23, 42, 0.12)"
      },
      animation: {
        "fade-up": "fadeUp 700ms ease both"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
