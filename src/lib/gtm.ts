/**
 * Google Tag Manager — carregado SOMENTE quando:
 *   1. GTM_ID for válido (src/config/campaign.ts), e
 *   2. o visitante aceitar os cookies de marketing.
 *
 * O estado de consentimento é informado ao contêiner pelo Consent Mode v2 antes do
 * carregamento e atualizado para "denied" se o visitante revogar a escolha.
 *
 * Evento enviado ao dataLayer:
 *   - group_link_click → a cada clique em um botão do grupo VIP, sem parâmetros.
 *     No GTM, use-o como acionador do tipo "Evento personalizado". Representa
 *     INTENÇÃO de entrar no grupo, não entrada confirmada.
 */
import { gtmId, isGtmIdValid } from "@/config/rules";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const CONSENT_GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};
const CONSENT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

let loaded = false;
let granted = false;

function gtag(..._args: unknown[]) {
  // O Consent Mode exige o objeto `arguments`, como no snippet oficial do Google.
  // eslint-disable-next-line prefer-rest-params
  (window.dataLayer ??= []).push(arguments);
}

export function grantGtm() {
  if (!isGtmIdValid) return;

  if (!loaded) {
    window.dataLayer ??= [];
    gtag("consent", "default", CONSENT_DENIED);
    gtag("consent", "update", CONSENT_GRANTED);
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
    loaded = true;
  } else if (!granted) {
    gtag("consent", "update", CONSENT_GRANTED);
  }
  granted = true;
}

export function revokeGtm() {
  if (loaded && granted) {
    gtag("consent", "update", CONSENT_DENIED);
    window.dataLayer?.push({ event: "consent_revoked" });
  }
  granted = false;
}

export function pushGtmGroupLinkClick() {
  if (!loaded || !granted) return;
  window.dataLayer?.push({ event: "group_link_click" });
}
