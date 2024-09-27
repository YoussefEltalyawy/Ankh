import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|checkbox|dropdown|ripple|spinner|menu|divider|popover).js"
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
        manrope: ["Manrope", "sans-serif"],
        brico: ["Bricolage Grotesque", "sans-serif"],
      },
      zIndex: {
        1: "1",
      },
      backgroundImage: {
        cozy: "url('/cozy.webp')",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
