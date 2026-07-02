import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Premium dark / glow palette -----------------------------
        ink: "#0A0A0C", // deep rich black base
        panel: "#131316", // raised panel surface
        panel2: "#1B1B20", // secondary raised surface (cards, inputs)
        line: "#2A2A30", // hairline / divider
        mist: "#9A9AA4", // muted secondary text
        paper: "#F2F1ED", // primary text (warm off-white, not pure white)
        glow: "#7C5CFF", // primary glowing accent — violet
        glow2: "#3FE0C5", // secondary glow accent — teal (used sparingly)
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(124, 92, 255, 0.45)",
        glowSm: "0 0 20px -6px rgba(124, 92, 255, 0.5)",
        glowTeal: "0 0 30px -8px rgba(63, 224, 197, 0.4)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
        glowRadial:
          "radial-gradient(60% 50% at 50% 0%, rgba(124,92,255,0.18) 0%, rgba(10,10,12,0) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
