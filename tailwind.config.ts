import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fit: {
          bg: "#080808",
          surface: "#111111",
          card: "#151515",
          "card-hover": "#1c1c1c",
          border: "#222222",
          "border-light": "rgba(255, 255, 255, 0.12)",
          lime: "#CCFF00",
          "lime-hover": "#b8e600",
          "lime-dim": "rgba(204, 255, 0, 0.1)",
          text: "#F5F5F5",
          muted: "#8E8E93",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
