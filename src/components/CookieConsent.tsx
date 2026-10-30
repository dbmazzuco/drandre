import { useEffect, useRef, useState } from "react";
import { hasMarketingTools, isGtmIdValid, isMetaPixelIdValid } from "@/config/rules";
import { useConsent } from "@/lib/consent";
import { Link, ROUTES } from "@/lib/router";
import { CloseIcon } from "./icons";

const choiceButton =
  "inline-flex items-center justify-center rounded-full px-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] transition-colors";
// "Aceitar" e "Rejeitar" têm o mesmo peso visual: a escolha não é induzida.
const solid = `${choiceButton} bg-graphite text-ivory hover:bg-graphite/90`;
const outline = `${choiceButton} border border-graphite/25 text-graphite hover:border-graphite`;

/** Aviso inicial de cookies — exibido somente quando há ferramenta de marketing configurada. */
export function CookieBanner() {
  const { bannerVisible, acceptAll, rejectAll, openPreferences } = useConsent();
  if (!bannerVisible) return null;

  return (
    // Compacto no celular para não esconder o conteúdo principal da primeira tela.
    <div role="region" aria-label="Aviso de cookies" className="fixed inset-x-0 bottom-0 z-50 px-2 pb-safe sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-4xl border border-graphite/10 bg-white px-4 py-3.5 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.4)] sm:flex sm:items-center sm:gap-8 sm:p-6">
        <p className="text-[0.875rem] leading-snug text-muted sm:text-[0.9375rem] sm:leading-relaxed">
          Usamos cookies essenciais e, somente com a sua autorização, cookies de marketing e medição para avaliar o
          desempenho dos anúncios.{" "}
          <Link to={ROUTES.privacy} className="text-graphite underline underline-offset-4">
            Saiba mais
          </Link>
          .
        </p>
        <div className="mt-3 flex items-center gap-2 sm:mt-0 sm:shrink-0">
          <button type="button" onClick={rejectAll} className={`${solid} min-h-[2.75rem] flex-1 sm:flex-none`}>
            Rejeitar
          </button>
          <button type="button" onClick={acceptAll} className={`${solid} min-h-[2.75rem] flex-1 sm:flex-none`}>
            Aceitar
          </button>
          <button
            type="button"
            onClick={openPreferences}
            className="min-h-[2.75rem] shrink-0 px-2 text-[0.8125rem] font-medium text-graphite underline underline-offset-4 sm:px-3"
          >
            Personalizar
          </button>
        </div>
      </div>
    </div>
  );
}

function Switch({ checked, onChange, labelledBy }: { checked: boolean; onChange: (v: boolean) => void; labelledBy: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-300 ${
        checked ? "border-graphite bg-graphite" : "border-graphite/25 bg-sand/60"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ease-soft ${
          checked ? "translate-x-[1.375rem]" : "translate-x-[0.1875rem]"
        }`}
      />
    </button>
  );
}

/** Central de preferências: permite aceitar, rejeitar ou alterar a escolha a qualquer momento. */
export function CookiePreferences() {
  const { preferencesOpen, closePreferences, marketing, save, acceptAll, rejectAll } = useConsent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(marketing);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (preferencesOpen && !dialog.open) {
      setDraft(marketing);
      dialog.showModal();
    } else if (!preferencesOpen && dialog.open) {
      dialog.close();
    }
  }, [preferencesOpen, marketing]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closePreferences}
      aria-labelledby="cookie-prefs-title"
      className="max-h-[calc(100svh-2rem)] w-[min(38rem,calc(100vw-2rem))] border-0 bg-white p-0 text-graphite shadow-[0_30px_80px_-30px_rgb(0_0_0/0.5)]"
    >
      <div className="p-6 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">Privacidade</p>
            <h2 id="cookie-prefs-title" className="mt-3 text-[1.875rem] leading-tight">
              Preferências de cookies
            </h2>
          </div>
          <button
            type="button"
            onClick={closePreferences}
            aria-label="Fechar preferências de cookies"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite/15 hover:border-graphite"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
          Escolha quais categorias autoriza. Você pode alterar sua decisão a qualquer momento pelo link “Configurações de
          cookies”, no rodapé da página.
        </p>

        <div className="mt-7 divide-y divide-graphite/10 border-y border-graphite/10">
          <div className="py-5">
            <div className="flex items-center justify-between gap-6">
              <h3 className="font-sans text-[0.9375rem] font-semibold">Essenciais</h3>
              <span className="shrink-0 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-gold-ink">
                Sempre ativos
              </span>
            </div>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
              Necessários para o funcionamento da página e para registrar a sua escolha sobre cookies. Não podem ser
              desativados.
            </p>
          </div>
          <div className="py-5">
            <div className="flex items-center justify-between gap-6">
              <h3 id="cookie-marketing-label" className="font-sans text-[0.9375rem] font-semibold">
                Marketing e medição
              </h3>
              <Switch checked={draft} onChange={setDraft} labelledBy="cookie-marketing-label" />
            </div>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
              Medem visitas à página e cliques no botão do grupo VIP para avaliar o desempenho dos anúncios. Não enviam nome,
              telefone, e-mail ou informações de saúde.
              {hasMarketingTools
                ? ` Ferramentas: ${[isMetaPixelIdValid && "Pixel da Meta", isGtmIdValid && "Google Tag Manager e as ferramentas de anúncios e análise configuradas nele"].filter(Boolean).join("; ")}.`
                : " No momento, nenhuma ferramenta de marketing está ativa nesta página."}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={rejectAll} className={`${outline} min-h-[2.75rem]`}>
            Rejeitar todos
          </button>
          <button type="button" onClick={acceptAll} className={`${outline} min-h-[2.75rem]`}>
            Aceitar todos
          </button>
          <button type="button" onClick={() => save(draft)} className={`${solid} min-h-[2.75rem]`}>
            Salvar preferências
          </button>
        </div>
      </div>
    </dialog>
  );
}
