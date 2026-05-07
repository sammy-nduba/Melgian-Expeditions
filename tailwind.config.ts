import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#2F4F3A",
        olive: "#556B2F",
        savannah: "#C8A96B",
        ivory: "#F5F1E8",
        bronze: "#8B5A2B",
        charcoal: "#3B3128",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 24px 80px rgba(59, 49, 40, 0.16)",
      },
      borderRadius: {
        premium: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;