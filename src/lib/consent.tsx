import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { isMetaPixelIdValid } from "@/config/rules";
import { grantMetaPixel, revokeMetaPixel } from "@/lib/metaPixel";

/**
 * Consentimento de cookies (LGPD).
 * - Essenciais: apenas o registro desta escolha (localStorage). Sempre ativos.
 * - Marketing: Pixel da Meta. Desativado até o visitante aceitar.
 */
const STORAGE_KEY = "dam.cookie-consent";
const CONSENT_VERSION = 1;

interface StoredConsent {
  version: number;
  marketing: boolean;
  updatedAt: string;
}

interface ConsentApi {
  decided: boolean;
  marketing: boolean;
  bannerVisible: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (marketing: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  /** Uso administrativo: exibe o banner mesmo sem Pixel configurado. */
  previewBanner: () => void;
}

const ConsentContext = createContext<ConsentApi | null>(null);

function readStored(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    return parsed.version === CONSENT_VERSION && typeof parsed.marketing === "boolean" ? parsed : null;
  } catch {
    return null;
  }
}

function writeStored(marketing: boolean) {
  try {
    const value: StoredConsent = { version: CONSENT_VERSION, marketing, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Sem armazenamento disponível (ex.: navegação privada): a escolha vale só nesta visita.
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [stored] = useState(readStored);
  const [decided, setDecided] = useState(stored !== null);
  const [marketing, setMarketing] = useState(stored?.marketing ?? false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [forceBanner, setForceBanner] = useState(false);
  const wasGranted = useRef(false);

  useEffect(() => {
    if (marketing) {
      grantMetaPixel();
      wasGranted.current = true;
    } else if (wasGranted.current) {
      revokeMetaPixel();
      wasGranted.current = false;
    }
  }, [marketing]);

  const save = useCallback((value: boolean) => {
    writeStored(value);
    setMarketing(value);
    setDecided(true);
    setForceBanner(false);
    setPreferencesOpen(false);
  }, []);

  const api = useMemo<ConsentApi>(
    () => ({
      decided,
      marketing,
      bannerVisible: (!decided && isMetaPixelIdValid) || forceBanner,
      preferencesOpen,
      acceptAll: () => save(true),
      rejectAll: () => save(false),
      save,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      previewBanner: () => setForceBanner(true),
    }),
    [decided, marketing, forceBanner, preferencesOpen, save],
  );

  return <ConsentContext.Provider value={api}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentApi {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent deve ser usado dentro de <ConsentProvider>.");
  return ctx;
}
