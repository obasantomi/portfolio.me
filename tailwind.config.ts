import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        rainbowGlow: {
          "0%, 100%": { boxShadow: "0 0 20px 3px rgba(255,110,196,0.5)" },
          "25%": { boxShadow: "0 0 20px 3px rgba(120,115,245,0.5)" },
          "50%": { boxShadow: "0 0 20px 3px rgba(74,222,222,0.5)" },
          "75%": { boxShadow: "0 0 20px 3px rgba(255,221,87,0.5)" },
        },
      },
      animation: {
        rainbowGlow: "rainbowGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
