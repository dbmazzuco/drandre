/**
 * Marca visual de informação pendente ("a definir"). Aparece apenas enquanto o
 * campo correspondente de src/config/campaign.ts estiver vazio — a página não
 * deve ser publicada com estes marcadores.
 */
export function Pending({ label, onDark = false }: { label: string; onDark?: boolean }) {
  return (
    <span
      title="Informação pendente — preencha em src/config/campaign.ts"
      className={`inline-block rounded-sm border border-dashed px-1.5 py-px align-baseline font-sans text-[0.8em] font-medium not-italic leading-snug ${
        onDark ? "border-champagne/50 text-champagne/90" : "border-gold/70 bg-sand/50 text-gold-ink"
      }`}
    >
      [{label}]
    </span>
  );
}
