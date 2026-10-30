import { LogoLockup } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CAMPAIGN } from "@/config/campaign";
import { Link, ROUTES } from "@/lib/router";

export function Header() {
  return (
    <header className="relative z-30 border-b border-graphite/10 bg-ivory/90 backdrop-blur-md lg:sticky lg:top-0">
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-3 sm:h-[4.75rem] lg:h-20">
        <Link to={ROUTES.home} aria-label={`${CAMPAIGN.DOCTOR_NAME} — início`} className="shrink-0">
          <LogoLockup />
        </Link>
        <WhatsAppButton variant="header" label="Entrar no Grupo VIP" location="header" />
      </div>
    </header>
  );
}
