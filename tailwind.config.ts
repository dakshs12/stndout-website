import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E7C70", // Blue Spruce
          cream: "#ECDCC9",   // Almond Cream
          beige: "#F5F5DC",   // Beige
          dark: "#070707",    // Almost Black
          white: "#FFFFFF",   // White
          gray: "#6B7280",    // Slate Gray
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;