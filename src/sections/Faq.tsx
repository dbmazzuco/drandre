import { useId, useState } from "react";
import { PlusIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { getAnnouncement } from "@/lib/announcement";

function questions() {
  const a = getAnnouncement();
  return [
    {
      q: "Quando a condição especial será divulgada?",
      a:
        a.kind === "upcoming"
          ? `A condição especial será divulgada em ${a.full}. Os detalhes serão compartilhados diretamente no grupo VIP.`
          : "A data será informada pela equipe. Os detalhes serão compartilhados diretamente no grupo VIP.",
    },
    {
      q: "Onde receberei as informações?",
      a: "As informações da campanha serão divulgadas no grupo VIP do WhatsApp.",
    },
    {
      q: "Participar do grupo garante a realização do procedimento?",
      a: "Não. A realização de qualquer procedimento depende de avaliação médica individualizada, indicação clínica e das condições de atendimento.",
    },
    {
      q: "O procedimento é indicado para todas as pessoas?",
      a: "Não necessariamente. A indicação da toxina botulínica depende de avaliação profissional, considerando as necessidades individuais e possíveis contraindicações.",
    },
  ];
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div className="border-b border-graphite/10">
      <h3 className="font-sans">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-[1.375rem] font-medium leading-snug text-graphite transition-colors hover:text-gold-ink sm:text-[1.5rem]"
        >
          <span>{question}</span>
          <span
            aria-hidden="true"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              open ? "border-graphite bg-graphite text-ivory" : "border-graphite/15 text-graphite group-hover:border-gold"
            }`}
          >
            <PlusIcon className={`h-4 w-4 transition-transform duration-500 ease-soft ${open ? "rotate-45" : ""}`} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows,visibility] duration-500 ease-soft ${open ? "visible" : "invisible"}`}
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-7 pr-2 text-muted sm:pr-16">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-graphite/10 bg-white py-20 sm:py-24 lg:py-32">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Dúvidas</p>
          <h2 id="faq-title" className="section-title mt-5">
            Perguntas frequentes
          </h2>
        </Reveal>
        <Reveal className="border-t border-graphite/10 lg:col-span-7 lg:col-start-6" delay={100}>
          {questions().map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
