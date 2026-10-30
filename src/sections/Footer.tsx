import { LogoFull } from "@/components/Logo";
import { CAMPAIGN } from "@/config/campaign";
import { crmLabel, filled, hasSpecialty } from "@/config/rules";
import { useConsent } from "@/lib/consent";
import { valueOr } from "@/lib/content";
import { Link, ROUTES } from "@/lib/router";

const linkClass =
  "underline decoration-ivory/25 underline-offset-4 transition-colors hover:text-ivory hover:decoration-champagne";

export function Footer() {
  const { openPreferences } = useConsent();
  const c = CAMPAIGN;
  const clinic = c.CLINIC_DETAILS;
  const showClinic = filled(clinic.legalName) || filled(clinic.cnpj);

  return (
    <footer className="bg-night pb-10 pt-16 text-[0.9375rem] text-ivory/70 sm:pt-20">
      <div className="container-page">
        <div className="grid gap-10 border-b border-ivory/10 pb-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <LogoFull onDark className="w-44 sm:w-52" />
          </div>

          <div className="space-y-1.5 lg:col-span-5">
            <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-label text-champagne">Identificação</p>
            <p className="text-ivory">{c.DOCTOR_NAME}</p>
            <p>{valueOr(crmLabel(), "CRM/UF a definir", { onDark: true })}</p>
            {hasSpecialty && (
              <p>
                {c.DOCTOR_SPECIALTY} · RQE {valueOr(c.DOCTOR_RQE, "RQE a definir", { onDark: true })}
              </p>
            )}
            {filled(c.CLINIC_CITY) && <p>{c.CLINIC_CITY}</p>}
            {showClinic && (
              <div className="space-y-1.5 pt-4">
                {filled(clinic.legalName) && <p className="text-ivory">{clinic.legalName}</p>}
                {filled(clinic.cnpj) && <p>CNPJ {clinic.cnpj}</p>}
                {filled(clinic.crmRegistration) && <p>{clinic.crmRegistration}</p>}
                {filled(clinic.address) && <p>{clinic.address}</p>}
                {filled(clinic.technicalDirectorName) && (
                  <p>
                    Diretor técnico: {clinic.technicalDirectorName}
                    {filled(clinic.technicalDirectorCrm) && ` · ${clinic.technicalDirectorCrm}`}
                    {filled(clinic.technicalDirectorRqe) && ` · RQE ${clinic.technicalDirectorRqe}`}
                  </p>
                )}
              </div>
            )}
          </div>

          <nav aria-label="Informações legais" className="lg:col-span-3">
            <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-label text-champagne">Privacidade</p>
            <ul className="space-y-3">
              <li>
                <Link to={ROUTES.privacy} className={linkClass}>
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <button type="button" onClick={openPreferences} className={linkClass}>
                  Configurações de cookies
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[0.8125rem] leading-relaxed text-ivory/60 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <p className="max-w-md">A indicação de procedimentos estéticos depende de avaliação médica individualizada.</p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {c.DOCTOR_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
