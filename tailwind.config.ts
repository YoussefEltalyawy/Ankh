import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: "3rem",
        h2: "2.5rem",
        h3: "3.6875rem",
        h4: "2.625rem",
        h5: "1.43rem",
        h6: "1.25rem",
        p: "1rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        manrope: ["var(--font-marope)"],
        brico: ["var(--font-brico)"],
      },
      zIndex: {
        1: "1",
      },
      backgroundImage: {
        cozy: "url('/cozy.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
