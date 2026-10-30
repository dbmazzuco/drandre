import type { Config } from "tailwindcss";

/** As cores vêm de BRAND_COLORS (src/config/campaign.ts), injetadas como variáveis CSS. */
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: token("ivory"),
        graphite: token("graphite"),
        sand: token("sand"),
        gold: token("gold"),
        "gold-ink": token("gold-ink"),
        muted: token("muted"),
        night: token("night"),
        champagne: token("champagne"),
        white: token("white"),
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Manrope Variable"', "Manrope", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      maxWidth: {
        page: "75rem",
      },
      letterSpacing: {
        label: "0.18em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
