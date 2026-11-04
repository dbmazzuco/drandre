import type { ResultCase } from "@/config/campaign";
import { Reveal } from "@/components/Reveal";
import { CAMPAIGN } from "@/config/campaign";

function Shot({ src, label, alt, item }: { src: string; label: string; alt: string; item: ResultCase }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[#2b2b2b]">
      <img
        src={src}
        alt={alt}
        width={item.width}
        height={item.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <span className="absolute left-3 top-3 rounded-full bg-graphite/75 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ivory backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

/**
 * Antes e depois de pacientes do próprio médico, com autorização de imagem.
 * Só aparece quando RESULTS.show é true e há casos configurados.
 */
export function Results() {
  const r = CAMPAIGN.RESULTS;
  if (!r.show || r.cases.length === 0) return null;

  return (
    <section aria-labelledby="resultados-title" className="border-t border-graphite/10 bg-white py-20 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">Resultados</p>
            <h2 id="resultados-title" className="section-title mt-5">
              {r.title}
            </h2>
          </div>
          <p className="max-w-xl text-muted lg:col-span-4 lg:col-start-9">{r.intro}</p>
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {r.cases.map((item, index) => (
            <Reveal as="li" key={item.before} delay={index * 110}>
              <figure>
                <div className="grid gap-1.5">
                  <Shot src={item.before} label="Antes" alt={`Antes: ${item.area.toLowerCase()}`} item={item} />
                  <Shot src={item.after} label="Depois" alt={`Depois: ${item.area.toLowerCase()}, mesma pessoa`} item={item} />
                </div>
                <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-graphite/10 pb-4">
                  <span className="font-serif text-[1.25rem] text-graphite">{item.area}</span>
                  {item.interval && <span className="text-[0.8125rem] text-muted">{item.interval}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 max-w-3xl space-y-3 text-[0.9375rem] leading-relaxed text-muted">
          <p>{r.note}</p>
          <p className="text-[0.8125rem]">
            Imagens publicadas com autorização dos pacientes. Os resultados variam de pessoa para pessoa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
