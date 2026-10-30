import { useEffect } from "react";
import { AdminNotice, AdminToast } from "@/components/AdminNotice";
import { CookieBanner, CookiePreferences } from "@/components/CookieConsent";
import { CAMPAIGN } from "@/config/campaign";
import { ConsentProvider } from "@/lib/consent";
import { ROUTES, usePathname } from "@/lib/router";
import { Index } from "@/pages/Index";
import { NotFound } from "@/pages/NotFound";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";

const PAGES: Record<string, { title: string; element: () => JSX.Element }> = {
  [ROUTES.home]: { title: CAMPAIGN.SEO_TITLE, element: Index },
  [ROUTES.privacy]: { title: `Política de Privacidade | ${CAMPAIGN.DOCTOR_NAME}`, element: PrivacyPolicy },
};

export default function App() {
  const path = usePathname();
  const page = PAGES[path] ?? { title: `Página não encontrada | ${CAMPAIGN.DOCTOR_NAME}`, element: NotFound };
  const Page = page.element;

  useEffect(() => {
    document.title = page.title;
  }, [page.title]);

  return (
    <ConsentProvider>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-graphite focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
      >
        Pular para o conteúdo
      </a>
      <AdminNotice />
      <Page />
      <CookieBanner />
      <CookiePreferences />
      <AdminToast />
    </ConsentProvider>
  );
}
