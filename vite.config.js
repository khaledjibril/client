import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Literata", "serif"],
        headline: ["Literata", "serif"],
        code: ["monospace"],
      },
      colors: {
        secondary: "#ededd4",
        primary: "#a68b64",
      },
    },
  },
  content: [
    "index.html",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
});
