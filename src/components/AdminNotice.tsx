import { useEffect, useRef, useState } from "react";
import { getPublishChecklist, IS_PREVIEW, type ChecklistItem } from "@/config/checklist";
import { ADMIN_TOAST_EVENT } from "@/lib/adminToast";
import { useConsent } from "@/lib/consent";
import { AlertCircleIcon, CheckCircleIcon, CloseIcon } from "./icons";

/*
 * Elementos exclusivos da pré-visualização (cores neutras de "sistema", fora da identidade
 * da marca). Desaparecem automaticamente quando não houver pendências obrigatórias.
 */

const DISMISS_KEY = "dam.admin-notice-hidden";

function readDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function ChecklistGroup({ title, items }: { title: string; items: ChecklistItem[] }) {
  return (
    <div className="mt-6">
      <h3 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#6b5a2e]">{title}</h3>
      <ul className="mt-3 divide-y divide-black/5 border-y border-black/5">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 py-3">
            {item.done ? (
              <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#2f7a4a]" strokeWidth={1.6} />
            ) : (
              <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#b7791f]" strokeWidth={1.6} />
            )}
            <div className="min-w-0 text-[0.875rem] leading-snug">
              <p className={item.done ? "text-[#555]" : "font-medium text-[#222]"}>{item.label}</p>
              <p className="mt-1 break-words font-mono text-[0.75rem] text-[#7a6a40]">{item.field}</p>
              {!item.done && item.hint && <p className="mt-1 text-[0.8125rem] text-[#666]">{item.hint}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AdminNotice() {
  const [hidden, setHidden] = useState(readDismissed);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { previewBanner } = useConsent();

  if (!IS_PREVIEW) return null;

  const checklist = getPublishChecklist();
  const blockers = checklist.filter((i) => i.level === "blocker");
  const recommended = checklist.filter((i) => i.level === "recommended");
  const pending = blockers.filter((i) => !i.done).length;

  const dismiss = () => {
    setHidden(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* sem armazenamento: oculta só nesta visualização */
    }
  };

  return (
    <>
      {!hidden && (
        <div role="region" aria-label="Aviso de configuração" className="relative z-40 border-b border-[#ead9a6] bg-[#fbf3dc] text-[#4a3b12]">
          <div className="container-page flex items-center gap-3 py-2 text-[0.8125rem] leading-snug">
            <AlertCircleIcon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            <p className="min-w-0 flex-1">
              <strong className="font-semibold">Pré-visualização</strong> —{" "}
              <span className="hidden sm:inline">página ainda não pronta para publicação: </span>
              {pending} {pending === 1 ? "pendência obrigatória" : "pendências obrigatórias"}.
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="shrink-0 rounded-full border border-[#4a3b12]/30 px-3 py-1 font-semibold hover:bg-[#4a3b12] hover:text-[#fbf3dc]"
            >
              Ver checklist
            </button>
            <button type="button" onClick={dismiss} aria-label="Ocultar aviso nesta sessão" className="shrink-0 p-1 opacity-70 hover:opacity-100">
              <CloseIcon className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="checklist-title"
        className="max-h-[calc(100svh-2rem)] w-[min(40rem,calc(100vw-2rem))] border-0 bg-white p-0 text-[#222] shadow-2xl"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#b7791f]">Somente para a equipe</p>
              <h2 id="checklist-title" className="mt-2 font-sans text-[1.375rem] font-semibold">
                Checklist de publicação
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Fechar checklist"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 hover:border-black/40"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-[0.875rem] leading-relaxed text-[#555]">
            Todos os campos ficam em <code className="font-mono text-[0.8125rem]">src/config/campaign.ts</code>. Este aviso
            some sozinho quando os itens obrigatórios estiverem concluídos. Não publique a página antes disso.
          </p>
          <ChecklistGroup title="Obrigatórios para publicar" items={blockers} />
          <ChecklistGroup title="Recomendados" items={recommended} />
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                dialogRef.current?.close();
                previewBanner();
              }}
              className="rounded-full border border-black/15 px-4 py-2 text-[0.8125rem] font-medium hover:border-black/50"
            >
              Pré-visualizar aviso de cookies
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

/** Mensagem rápida para o administrador (ex.: clique em botão sem link configurado). */
export function AdminToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer = 0;
    const onToast = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 5000);
    };
    window.addEventListener(ADMIN_TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(ADMIN_TOAST_EVENT, onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
      {message && (
        <p className="pointer-events-auto max-w-md rounded-md border border-[#ead9a6] bg-[#fbf3dc] px-4 py-3 text-[0.875rem] leading-snug text-[#4a3b12] shadow-lg">
          {message}
        </p>
      )}
    </div>
  );
}
