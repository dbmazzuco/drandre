import type { ReactNode } from "react";
import { DoctorPhoto } from "@/components/DoctorPhoto";
import { Pending } from "@/components/Pending";
import { Reveal } from "@/components/Reveal";
import { CAMPAIGN } from "@/config/campaign";
import { IS_PREVIEW } from "@/config/checklist";
import { crmLabel, filled, hasSpecialty } from "@/config/rules";
import { valueOr } from "@/lib/content";

function Bio() {
  const c = CAMPAIGN;
  if (c.DOCTOR_BIO.length > 0) {
    return c.DOCTOR_BIO.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
  }
  const hasArea = filled(c.DOCTOR_PRACTICE_AREA);
  const hasDiff = filled(c.DOCTOR_DIFFERENTIALS);

  // Fora da pré-visualização e sem dados confirmados: texto neutro, sem informações inventadas.
  if (!IS_PREVIEW && !hasArea && !hasDiff) {
    return <p>O {c.DOCTOR_NAME} é médico e valoriza a avaliação individualizada e o cuidado com cada paciente.</p>;
  }

  return (
    <p>
      O {c.DOCTOR_NAME} é médico
      {hasArea || IS_PREVIEW ? <> e atua na área de {valueOr(c.DOCTOR_PRACTICE_AREA, "área de atuação confirmada")}</> : null}.{" "}
      {hasDiff || IS_PREVIEW ? (
        <>
          Seu trabalho é orientado por {valueOr(c.DOCTOR_DIFFERENTIALS, "diferenciais reais do profissional")}, valorizando
          a avaliação individualizada e o cuidado com cada paciente.
        </>
      ) : (
        <>Seu trabalho valoriza a avaliação individualizada e o cuidado com cada paciente.</>
      )}
    </p>
  );
}

function Credential({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
      <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-ink">{label}</dt>
      <dd className="text-graphite">{children}</dd>
    </div>
  );
}

export function About() {
  const c = CAMPAIGN;
  const photo = c.DOCTOR_PHOTO_ABOUT ?? c.DOCTOR_PHOTO;
  const reusingHeroPhoto = c.DOCTOR_PHOTO_ABOUT === null;

  return (
    <section aria-labelledby="sobre-title" className="bg-sand/55 py-20 sm:py-24 lg:py-32">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure className="relative mx-auto max-w-[26rem] lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden bg-[#3b4141]">
              <DoctorPhoto
                photo={photo}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 416px, 92vw"
                className="block h-full w-full"
                // Com a mesma foto do hero, usa um enquadramento mais próximo para variar a composição.
                imgClassName={`h-full w-full object-cover ${reusingHeroPhoto ? "origin-[50%_10%] scale-[1.22] object-[50%_10%]" : ""}`}
              />
            </div>
          </figure>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <p className="eyebrow">O profissional</p>
          <h2 id="sobre-title" className="section-title mt-5">
            Conheça o <span className="whitespace-nowrap">{c.DOCTOR_NAME}</span>
          </h2>
          <div className="mt-7 space-y-5 text-[1.0625rem] leading-[1.75] text-muted">
            <Bio />
          </div>

          <dl className="mt-10 divide-y divide-graphite/10 border-y border-graphite/10">
            <Credential label="Registro">
              {c.DOCTOR_NAME} · {valueOr(crmLabel(), "CRM/UF a definir")}
            </Credential>
            {hasSpecialty && (
              <Credential label="Especialidade">
                {c.DOCTOR_SPECIALTY} · RQE {valueOr(c.DOCTOR_RQE, "nº do RQE a definir")}
              </Credential>
            )}
            {c.DOCTOR_EDUCATION.length > 0 ? (
              <Credential label="Formação">
                <ul className="space-y-1.5">
                  {c.DOCTOR_EDUCATION.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Credential>
            ) : (
              IS_PREVIEW && (
                <Credential label="Formação">
                  <Pending label="formação e experiência comprovadas" />
                </Credential>
              )
            )}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
