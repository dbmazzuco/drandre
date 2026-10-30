import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { CAMPAIGN } from "./src/config/campaign";
import { pendingBlockers } from "./src/config/checklist";
import { HERO_PHOTO_SIZES, hexToRgbChannels } from "./src/config/rules";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Gera as tags do <head> (SEO, Open Graph, cores da marca e preload da foto)
 * a partir de src/config/campaign.ts, para que a configuração fique num só lugar.
 */
function campaignHead(): Plugin {
  return {
    name: "campaign-head",
    transformIndexHtml(html) {
      const site = CAMPAIGN.SITE_URL.trim().replace(/\/$/, "");
      const absolute = (p: string) => (site ? `${site}${p}` : p);
      const title = escapeHtml(CAMPAIGN.SEO_TITLE);
      const description = escapeHtml(CAMPAIGN.SEO_DESCRIPTION);
      const og = CAMPAIGN.OG_IMAGE;
      const photo = CAMPAIGN.DOCTOR_PHOTO;
      const ready = pendingBlockers().length === 0;

      const colors = Object.entries(CAMPAIGN.BRAND_COLORS)
        .map(([name, hex]) => `--color-${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${hexToRgbChannels(hex)};`)
        .join(" ");

      const tags = [
        `<title>${title}</title>`,
        `<meta name="description" content="${description}" />`,
        // Enquanto houver pendências obrigatórias, a página não deve ser indexada.
        `<meta name="robots" content="${ready ? "index, follow" : "noindex, nofollow"}" />`,
        `<meta name="theme-color" content="${CAMPAIGN.BRAND_COLORS.ivory}" />`,
        site ? `<link rel="canonical" href="${site}/" />` : "",
        `<meta property="og:type" content="website" />`,
        `<meta property="og:locale" content="pt_BR" />`,
        `<meta property="og:site_name" content="${escapeHtml(CAMPAIGN.DOCTOR_NAME)}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        site ? `<meta property="og:url" content="${site}/" />` : "",
        `<meta property="og:image" content="${absolute(og.src)}" />`,
        `<meta property="og:image:width" content="${og.width}" />`,
        `<meta property="og:image:height" content="${og.height}" />`,
        `<meta property="og:image:alt" content="${escapeHtml(CAMPAIGN.BRAND_LOGO.alt)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${title}" />`,
        `<meta name="twitter:description" content="${description}" />`,
        `<meta name="twitter:image" content="${absolute(og.src)}" />`,
        // No desktop a foto do hero é o maior elemento da primeira tela (LCP).
        photo.avif
          ? `<link rel="preload" as="image" type="image/avif" media="(min-width: 1024px)" imagesrcset="${photo.avif}" imagesizes="${HERO_PHOTO_SIZES}" fetchpriority="high" />`
          : "",
        `<style>:root { ${colors} }</style>`,
      ];
      return html.replace("<!-- campaign:head -->", tags.filter(Boolean).join("\n    "));
    },
    buildStart() {
      const blockers = pendingBlockers();
      if (blockers.length === 0) return;
      this.warn(
        [
          "",
          "ATENÇÃO — a página ainda NÃO está pronta para publicação. Pendências obrigatórias:",
          ...blockers.map((item) => `  • ${item.label}  →  ${item.field}`),
          "Edite src/config/campaign.ts. Veja também PUBLICACAO.md.",
        ].join("\n"),
      );
    },
  };
}

export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [react(), campaignHead()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
