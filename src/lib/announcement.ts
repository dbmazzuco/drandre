import { CAMPAIGN } from "@/config/campaign";
import { filled, isValidIsoDate, isValidTime } from "@/config/rules";

export type Announcement =
  | { kind: "pending" }
  | { kind: "upcoming" | "past"; date: string; time: string | null; full: string };

const TIME_ZONE = "America/Sao_Paulo";

function todayIso(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const sameYear = Number(todayIso().slice(0, 4)) === y;
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    ...(sameYear ? {} : { year: "numeric" }),
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** "19:00" → "19h"; "19:30" → "19h30" */
function formatTime(time: string): string {
  const [h, m] = time.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
}

/**
 * Data oficial de divulgação da condição especial.
 * Só é exibida quando há data válida E SHOW_ANNOUNCEMENT_DATE = true.
 * Nunca gera datas, prazos ou contadores por conta própria.
 */
export function getAnnouncement(): Announcement {
  const { OFFER_ANNOUNCEMENT_DATE: date, OFFER_ANNOUNCEMENT_TIME: time, SHOW_ANNOUNCEMENT_DATE: show } = CAMPAIGN;
  if (!show || !filled(date) || !isValidIsoDate(date)) return { kind: "pending" };

  const dateLabel = formatDate(date.trim());
  const timeLabel = filled(time) && isValidTime(time) ? formatTime(time.trim()) : null;
  return {
    kind: date.trim() < todayIso() ? "past" : "upcoming",
    date: dateLabel,
    time: timeLabel,
    full: timeLabel ? `${dateLabel}, às ${timeLabel}` : dateLabel,
  };
}

export const ANNOUNCEMENT_PENDING_TEXT = "A data será anunciada pela equipe.";
