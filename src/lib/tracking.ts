/**
 * Ponto único de mensuração: liga e desliga as ferramentas de marketing conforme o
 * consentimento (Pixel da Meta e Google Tag Manager) e registra os cliques nos botões
 * do grupo VIP. Nenhum dado pessoal, de saúde ou nome de procedimento é enviado.
 */
import { grantGtm, pushGtmGroupLinkClick, revokeGtm } from "./gtm";
import { grantMetaPixel, revokeMetaPixel, trackMetaGroupLinkClick } from "./metaPixel";

/** Cookies de marketing/medição apagados quando o consentimento é revogado. */
const MARKETING_COOKIE = /^(_fbp|_fbc|_ga(_.+)?|_gid|_gcl_.+)$/;

let active = false;
let lastClickAt = 0;

export function grantMarketing() {
  grantMetaPixel();
  grantGtm();
  active = true;
}

export function revokeMarketing() {
  active = false;
  revokeMetaPixel();
  revokeGtm();
  clearMarketingCookies();
}

/** Clique em qualquer botão do grupo VIP. Ignora cliques repetidos em menos de 1 s. */
export function trackGroupLinkClick() {
  // Sem consentimento nada é enviado — e o clique não conta para o intervalo de 1 s.
  if (!active) return;
  const now = Date.now();
  if (now - lastClickAt < 1000) return;
  lastClickAt = now;
  trackMetaGroupLinkClick();
  pushGtmGroupLinkClick();
}

function clearMarketingCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => MARKETING_COOKIE.test(name));
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`.${parts.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
