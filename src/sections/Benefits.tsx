import { BellIcon, ChatIcon, CompassIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { CAMPAIGN } from "@/config/campaign";

const BENEFITS = [
  {
    icon: ChatIcon,
    title: "Acesso às informações",
    text: "Acompanhe os comunicados relacionados à campanha diretamente pelo WhatsApp.",
  },
  {
    icon: BellIcon,
    title: "Divulgação exclusiva",
    text: "Receba os detalhes da condição especial na data anunciada pela equipe.",
  },
  {
    icon: CompassIcon,
    title: "Orientações sobre os próximos passos",
    text: "Saiba como obter mais informações sobre o atendimento e as condições apresentadas.",
  },
];

export function Benefits() {
  return (
    <section aria-labelledby="beneficios-title" className="border-t border-graphite/10 bg-white py-20 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">Por que participar do Grupo VIP?</p>
            <h2 id="beneficios-title" className="section-title mt-5">
              Um acesso especial para acompanhar todas as novidades.
            </h2>
          </div>
          <p className="max-w-xl text-muted lg:col-span-4 lg:col-start-9">
            O grupo VIP foi criado para reunir, em um único canal, as informações sobre a próxima condição especial do{" "}
            {CAMPAIGN.DOCTOR_NAME}.
          </p>
        </Reveal>

        <ol className="mt-12 grid border-t border-graphite/10 md:grid-cols-3 lg:mt-20">
          {BENEFITS.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 110}
              className="border-b border-graphite/10 py-8 md:border-b-0 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l lg:px-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-[1.375rem] text-gold-ink">{String(index + 1).padStart(2, "0")}</span>
                <Icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mt-6 text-[1.625rem] leading-[1.15] md:mt-10">{title}</h3>
              <p className="mt-3 text-muted">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
