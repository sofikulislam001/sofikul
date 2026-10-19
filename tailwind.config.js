/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ground: "rgb(var(--ground) / <alpha-value>)",
        deep: "rgb(var(--deep) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface2) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accent2: "rgb(var(--accent2) / <alpha-value>)",
        onaccent: "rgb(var(--onaccent) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Hind Siliguri"', "system-ui", "sans-serif"],
        body: ['"Space Grotesk"', '"Hind Siliguri"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Hind Siliguri"', "ui-monospace", "monospace"],
        serif: ['"Instrument Serif"', '"Hind Siliguri"', "serif"],
      },
    },
  },
  plugins: [],
};
