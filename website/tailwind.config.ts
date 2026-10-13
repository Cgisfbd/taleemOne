import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bah: {
          lavender: "#B18CE5",
          rose: "#F68EA2",
          aqua: "#75CFCB",
          gold: "#F4BE77",
          base: "#F6F1F5",
          surface: "#FFFFFF",
          "border-card": "#EDE6EC",
          "input-bg": "#FCFAFC",
          "text-primary": "#2D1F33",
          "text-secondary": "#6B5A73",
          "text-muted": "#A394AB",
          // Dark Mode Tokens (Deep Celestial Midnight Luxe)
          "dark-base": "#080C14",
          "dark-surface": "rgba(15, 23, 42, 0.75)",
          "dark-border": "rgba(255, 255, 255, 0.08)",
          "dark-text-primary": "#F8FAFC",
          "dark-text-secondary": "#94A3B8",
          "dark-text-muted": "#64748B",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        urduTitle: ["'Jameel Noori Kasheeda'", "'Noto Nastaliq Urdu'", "serif"],
        urduBody: ["'Jameel Noori Nastaleeq'", "'Noto Nastaliq Urdu'", "serif"],
        arabic: ["'Alyamama'", "'Noto Sans Arabic'", "'Amiri'", "serif"],
        hindi: ["'Mukta'", "'Noto Sans Devanagari'", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
