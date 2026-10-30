/**
 * Pixel da Meta — carregado SOMENTE quando:
 *   1. META_PIXEL_ID for válido (src/config/campaign.ts), e
 *   2. o visitante aceitar os cookies de marketing.
 *
 * Eventos enviados:
 *   - PageView        → uma única vez por carregamento da página.
 *   - GroupLinkClick  → evento personalizado, sem parâmetros, a cada clique em um botão
 *                       do grupo VIP. Representa INTENÇÃO de entrar, não entrada confirmada.
 *
 * Nenhum dado pessoal, de saúde ou nome de procedimento é enviado nos eventos.
 * Os eventos automáticos/microdados do Pixel ficam desativados (autoConfig = false) para
 * que textos da página não sejam coletados.
 */
import { isMetaPixelIdValid, metaPixelId } from "@/config/rules";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
  disablePushState?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialized = false;
let granted = false;
let pageViewSent = false;
let lastClickAt = 0;

function injectPixelScript() {
  if (window.fbq) return;
  const fbq = function (this: unknown) {
    // Mesmo comportamento do snippet oficial da Meta.
    // eslint-disable-next-line prefer-rest-params
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments as unknown as unknown[]) : fbq.queue.push(arguments);
  } as unknown as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

function clearMetaCookies() {
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`.${parts.slice(i).join(".")}`);
  for (const name of ["_fbp", "_fbc"]) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function grantMetaPixel() {
  if (!isMetaPixelIdValid) return;

  if (!initialized) {
    injectPixelScript();
    const fbq = window.fbq!;
    fbq.disablePushState = true; // sem PageViews automáticos ao trocar de rota
    fbq("consent", "grant");
    fbq("set", "autoConfig", false, metaPixelId);
    fbq("init", metaPixelId);
    initialized = true;
  } else if (!granted) {
    window.fbq?.("consent", "grant");
  }
  granted = true;

  if (!pageViewSent) {
    window.fbq?.("track", "PageView");
    pageViewSent = true;
  }
}

export function revokeMetaPixel() {
  if (initialized && granted) window.fbq?.("consent", "revoke");
  granted = false;
  clearMetaCookies();
}

/** Clique em qualquer botão do grupo VIP. Ignora cliques repetidos em menos de 1 s. */
export function trackGroupLinkClick() {
  if (!initialized || !granted) return;
  const now = Date.now();
  if (now - lastClickAt < 1000) return;
  lastClickAt = now;
  window.fbq?.("trackCustom", "GroupLinkClick");
}
