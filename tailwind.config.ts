import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  presets: [require("@premieroctet/next-admin/dist/preset")],
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
export default config;
