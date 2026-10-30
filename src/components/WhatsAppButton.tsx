import type { MouseEvent } from "react";
import { isWhatsappGroupUrlValid, whatsappGroupUrl } from "@/config/rules";
import { showAdminToast } from "@/lib/adminToast";
import { trackGroupLinkClick } from "@/lib/metaPixel";
import { WhatsAppIcon } from "./icons";

type Variant = "primary" | "inverse" | "header" | "sticky";

interface Props {
  label: string;
  variant?: Variant;
  /** Identifica a posição do botão (atributo data-cta, útil para QA). Não é enviado à Meta. */
  location: string;
  className?: string;
}

const base =
  "group inline-flex select-none items-center justify-center gap-2.5 rounded-full sm:gap-3 font-semibold uppercase transition-[background-color,color,box-shadow,transform] duration-300 ease-soft active:scale-[0.985]";

const variants: Record<Variant, string> = {
  primary:
    "min-h-[3.5rem] px-6 py-3 text-[0.8125rem] leading-tight tracking-[0.08em] text-balance sm:px-8 sm:tracking-[0.14em] bg-graphite text-ivory shadow-[0_14px_32px_-16px_rgb(var(--color-graphite)/0.7)] hover:bg-graphite/90 hover:shadow-[0_18px_36px_-16px_rgb(var(--color-graphite)/0.75)]",
  inverse:
    "min-h-[3.5rem] px-6 py-3 text-[0.8125rem] leading-tight tracking-[0.08em] text-balance sm:px-8 sm:tracking-[0.14em] bg-ivory text-graphite shadow-[0_14px_40px_-18px_rgb(0_0_0/0.9)] hover:bg-white",
  // No celular, vira um botão circular só com o ícone (o CTA fixo inferior assume o destaque).
  header:
    "h-11 w-11 shrink-0 text-[0.6875rem] tracking-[0.14em] border border-graphite/70 text-graphite hover:bg-graphite hover:text-ivory sm:w-auto sm:px-5",
  sticky: "min-h-[3.25rem] w-full px-6 text-[0.8125rem] tracking-[0.12em] bg-graphite text-ivory",
};

const iconColor: Record<Variant, string> = {
  primary: "text-champagne",
  inverse: "text-gold-ink",
  header: "text-gold-ink group-hover:text-champagne",
  sticky: "text-champagne",
};

/**
 * Botão único de conversão. Todos os CTAs da página usam este componente e,
 * portanto, o mesmo destino: WHATSAPP_GROUP_URL.
 */
export function WhatsAppButton({ label, variant = "primary", location, className = "" }: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isWhatsappGroupUrlValid) {
      event.preventDefault();
      showAdminToast("Link do grupo ainda não configurado. Defina WHATSAPP_GROUP_URL em src/config/campaign.ts.");
      return;
    }
    trackGroupLinkClick();
  };

  return (
    <a
      href={isWhatsappGroupUrlValid ? whatsappGroupUrl : "#"}
      {...(isWhatsappGroupUrlValid ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={handleClick}
      data-cta={location}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon
        className={`shrink-0 transition-colors ${variant === "header" ? "h-[1.125rem] w-[1.125rem] sm:h-[1.15em] sm:w-[1.15em]" : "h-[1.15em] w-[1.15em]"} ${iconColor[variant]}`}
      />
      <span className={variant === "header" ? "sr-only sm:not-sr-only" : undefined}>{label}</span>
      <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
    </a>
  );
}
