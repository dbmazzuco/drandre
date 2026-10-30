/**
 * Validações e valores derivados da configuração. Funções puras (sem DOM),
 * usadas tanto pela página quanto pelo build (vite.config.ts).
 */
import { CAMPAIGN } from "./campaign";

const WHATSAPP_INVITE = /^https:\/\/chat\.whatsapp\.com\/(?:invite\/)?[A-Za-z0-9]{10,40}(?:\?[\w=&.-]*)?$/;
const META_PIXEL = /^\d{15,16}$/;
const GTM = /^GTM-[A-Z0-9]{4,12}$/;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const filled = (value: string | null | undefined): value is string => !!value && value.trim() !== "";

export const whatsappGroupUrl = CAMPAIGN.WHATSAPP_GROUP_URL.trim();
export const isWhatsappGroupUrlValid = WHATSAPP_INVITE.test(whatsappGroupUrl);

export const metaPixelId = CAMPAIGN.META_PIXEL_ID.trim();
export const isMetaPixelIdValid = META_PIXEL.test(metaPixelId);

export const gtmId = CAMPAIGN.GTM_ID.trim().toUpperCase();
export const isGtmIdValid = GTM.test(gtmId);

/** Há alguma ferramenta de marketing/medição que dependa de consentimento? */
export const hasMarketingTools = isMetaPixelIdValid || isGtmIdValid;

export function isValidIsoDate(value: string): boolean {
  const match = ISO_DATE.exec(value.trim());
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

export const isValidTime = (value: string): boolean => TIME.test(value.trim());

/** "CRM/SP 123456" — ou null enquanto número ou UF estiverem pendentes. */
export function crmLabel(crm = CAMPAIGN.DOCTOR_CRM, uf = CAMPAIGN.DOCTOR_CRM_UF): string | null {
  if (!filled(crm) || !filled(uf)) return null;
  return `CRM/${uf.trim().toUpperCase()} ${crm.trim()}`;
}

export const hasSpecialty = filled(CAMPAIGN.DOCTOR_SPECIALTY);

/** Atributo `sizes` da foto do hero — compartilhado com o preload do <head>. */
export const HERO_PHOTO_SIZES = "(min-width: 1024px) 440px, (min-width: 640px) 384px, 92vw";

/** Converte "#A88C65" em "168 140 101" (formato usado pelas variáveis CSS do Tailwind). */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}
