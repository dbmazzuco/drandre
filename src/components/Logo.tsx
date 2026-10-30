import { CAMPAIGN } from "@/config/campaign";

/** Assinatura horizontal para o cabeçalho: monograma oficial + nome em tipografia. */
export function LogoLockup({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={CAMPAIGN.BRAND_LOGO.monogram}
        alt=""
        width={201}
        height={160}
        className="h-9 w-auto sm:h-10"
        decoding="async"
      />
      {/* compact: no celular mostra só o monograma (o nome segue disponível para leitores de tela). */}
      <span
        className={`whitespace-nowrap font-serif text-[1.0625rem] font-semibold uppercase leading-none tracking-[0.12em] text-graphite max-[359px]:text-[0.9375rem] sm:text-[1.1875rem] ${
          compact ? "sr-only sm:not-sr-only" : ""
        }`}
      >
        {CAMPAIGN.DOCTOR_NAME}
      </span>
    </span>
  );
}

/** Logotipo oficial completo. */
export function LogoFull({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <img
      src={onDark ? CAMPAIGN.BRAND_LOGO.onDark : CAMPAIGN.BRAND_LOGO.onLight}
      alt={CAMPAIGN.BRAND_LOGO.alt}
      width={720}
      height={onDark ? 400 : 379}
      loading="lazy"
      decoding="async"
      className={`h-auto ${className}`}
    />
  );
}
