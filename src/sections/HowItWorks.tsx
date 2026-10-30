import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CAMPAIGN } from "@/config/campaign";
import { getAnnouncement } from "@/lib/announcement";

function steps() {
  const a = getAnnouncement();
  return [
    {
      title: "Acesse o grupo",
      text: "Clique no botão de entrada e abra o convite para o grupo VIP no WhatsApp.",
    },
    {
      title: "Acompanhe os comunicados",
      text: `Fique atento às informações compartilhadas pela equipe do ${CAMPAIGN.DOCTOR_NAME}.`,
    },
    {
      title: "Conheça a condição especial",
      text:
        a.kind === "upcoming"
          ? `Em ${a.full}, os detalhes da campanha serão divulgados no próprio grupo.`
          : "Na data anunciada, os detalhes da campanha serão divulgados no próprio grupo.",
    },
  ];
}

export function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona-title" className="bg-ivory py-20 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Como funciona</p>
          <h2 id="como-funciona-title" className="section-title mt-5">
            Participar é simples.
          </h2>
        </Reveal>

        <ol className="relative mx-auto mt-12 grid max-w-5xl gap-9 md:mt-16 md:grid-cols-3 md:gap-8 lg:mt-20">
          <span aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gold/45 md:block" />
          {steps().map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 120}
              className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-ivory font-serif text-[1.625rem] leading-none text-gold-ink">
                {index + 1}
              </span>
              <div className="pt-2 md:pt-7">
                <h3 className="text-[1.5rem] leading-tight sm:text-[1.625rem]">{step.title}</h3>
                <p className="mt-2 text-muted md:mx-auto md:max-w-[17rem]">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center lg:mt-20">
          <WhatsAppButton label="Quero participar do Grupo VIP" location="como-funciona" className="w-full sm:w-auto sm:px-10" />
          <p className="text-[0.875rem] text-muted">O convite abre diretamente no WhatsApp.</p>
        </Reveal>
      </div>
    </section>
  );
}
