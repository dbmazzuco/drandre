import { DoctorPhoto } from "@/components/DoctorPhoto";
import { CalendarIcon, LockIcon } from "@/components/icons";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CAMPAIGN } from "@/config/campaign";
import { crmLabel, HERO_PHOTO_SIZES } from "@/config/rules";
import { ANNOUNCEMENT_PENDING_TEXT, getAnnouncement } from "@/lib/announcement";
import { valueOr } from "@/lib/content";

function announcementText() {
  const a = getAnnouncement();
  if (a.kind === "pending") return ANNOUNCEMENT_PENDING_TEXT;
  if (a.kind === "past") return `A condição especial foi apresentada no grupo em ${a.full}.`;
  return `Divulgação no grupo: ${a.full}.`;
}

export function Hero() {
  const photo = CAMPAIGN.DOCTOR_PHOTO;
  const badge = CAMPAIGN.CAMPAIGN_BADGE;

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page grid items-center gap-14 pb-20 pt-9 sm:pt-14 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:gap-10 lg:py-12 xl:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#3b4141] ring-1 ring-gold/40 lg:hidden">
              <img
                src={photo.src}
                srcSet={photo.webp}
                sizes="36px"
                alt=""
                width={36}
                height={36}
                className="h-full w-full scale-[1.9] object-cover object-[50%_12%]"
                style={{ transformOrigin: "50% 12%" }}
              />
            </span>
            <span aria-hidden="true" className="hidden h-px w-10 bg-gold lg:block" />
            <span>
              Grupo VIP <span className="mx-1.5 text-gold" aria-hidden="true">|</span> {CAMPAIGN.DOCTOR_NAME}
            </span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] leading-[1.03] tracking-[-0.015em] max-[359px]:text-[2.25rem] sm:mt-8 sm:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.25rem] 2xl:text-[4.75rem]"
          >
            Uma <em className="font-medium italic text-gold-ink">condição especial</em> em toxina botulínica será
            revelada no nosso <span className="whitespace-nowrap">Grupo VIP.</span>
          </h1>

          <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.65] text-muted sm:mt-7 sm:text-[1.1875rem]">
            Entre no grupo exclusivo do {CAMPAIGN.DOCTOR_NAME} e acompanhe em primeira mão a divulgação de uma condição
            especial para o procedimento.
          </p>

          <div className="mt-8 sm:mt-10">
            <WhatsAppButton label="Quero entrar no Grupo VIP" location="hero" className="w-full sm:w-auto sm:px-10" />
          </div>

          <ul className="mt-7 space-y-3 text-[0.9375rem] leading-snug text-muted">
            <li className="flex items-start gap-3">
              <LockIcon className="mt-px h-[1.125rem] w-[1.125rem] shrink-0 text-gold" />
              <span>Os detalhes da condição especial serão divulgados exclusivamente no grupo.</span>
            </li>
            <li className="flex items-start gap-3">
              <CalendarIcon className="mt-px h-[1.125rem] w-[1.125rem] shrink-0 text-gold" />
              <span>{announcementText()}</span>
            </li>
          </ul>
        </div>

        {/* No desktop, a altura da foto acompanha a tela para que todo o hero caiba na primeira dobra. */}
        <figure className="relative mx-auto w-full max-w-[24rem] lg:col-span-5 lg:mr-0 lg:max-w-[min(100%,calc((100svh_-_12rem)*0.8))]">
          <div aria-hidden="true" className="absolute -right-3 -top-3 bottom-3 left-3 border border-gold/50 sm:-right-4 sm:-top-4 sm:bottom-4 sm:left-4" />
          <div className="relative aspect-[4/5] overflow-hidden bg-[#3b4141]">
            <DoctorPhoto
              photo={photo}
              sizes={HERO_PHOTO_SIZES}
              priority
              className="block h-full w-full"
              imgClassName="h-full w-full object-cover object-[50%_20%]"
            />
          </div>
          {badge.show && (
            <img
              src={badge.src}
              alt={badge.alt}
              width={360}
              height={360}
              decoding="async"
              className="absolute -bottom-7 -left-4 w-[6.5rem] rounded-full shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)] sm:-left-8 sm:w-32 lg:-left-12 lg:w-36"
            />
          )}
          <figcaption className="mt-6 flex flex-wrap items-baseline justify-end gap-x-3 gap-y-1 pl-28 text-right sm:pl-32 lg:pl-28">
            <span className="font-serif text-[1.25rem] text-graphite">{CAMPAIGN.DOCTOR_NAME}</span>
            <span className="text-[0.8125rem] uppercase tracking-[0.12em] text-muted">
              {valueOr(crmLabel(), "CRM/UF a definir")}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
