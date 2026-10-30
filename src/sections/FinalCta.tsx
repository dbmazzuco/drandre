import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CAMPAIGN } from "@/config/campaign";
import { ANNOUNCEMENT_PENDING_TEXT, getAnnouncement } from "@/lib/announcement";

export const FINAL_CTA_ID = "grupo-vip";

export function FinalCta() {
  const a = getAnnouncement();

  return (
    <section
      id={FINAL_CTA_ID}
      aria-labelledby="cta-final-title"
      className="relative isolate overflow-hidden bg-graphite py-24 text-ivory sm:py-28 lg:py-36"
    >
      <img
        src={CAMPAIGN.BRAND_LOGO.monogramOnDark}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={204}
        height={160}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[40rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.045]"
      />
      <Reveal className="container-page text-center">
        <span aria-hidden="true" className="mx-auto block h-px w-12 bg-gold" />
        <h2
          id="cta-final-title"
          className="mx-auto mt-8 max-w-3xl text-[2.375rem] leading-[1.08] tracking-[-0.01em] sm:text-[3rem] lg:text-[3.75rem]"
        >
          Entre para o Grupo VIP do <span className="whitespace-nowrap">{CAMPAIGN.DOCTOR_NAME}.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-ivory/75 sm:text-[1.125rem]">
          Acompanhe as informações sobre a condição especial de toxina botulínica que será apresentada exclusivamente no
          grupo.
        </p>
        <div className="mt-10">
          <WhatsAppButton
            variant="inverse"
            label="Acessar Grupo VIP no WhatsApp"
            location="cta-final"
            className="w-full sm:w-auto sm:px-10"
          />
        </div>
        {a.kind !== "past" && (
          <p className="mt-6 text-[0.875rem] text-ivory/60">
            {a.kind === "upcoming" ? `Divulgação no grupo: ${a.full}.` : ANNOUNCEMENT_PENDING_TEXT}
          </p>
        )}
      </Reveal>
    </section>
  );
}
