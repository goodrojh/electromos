import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0B0D",
        graphite: "#15171B",
        steel: "#23262D",
        paper: "#F4F2ED",
        volt: { DEFAULT: "#FFC61A", deep: "#F5A300", soft: "#FFF4CC" },
        muted: "#8A8C91",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
