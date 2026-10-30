import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from "react";

/**
 * Roteamento mínimo para as duas páginas do projeto (landing e política de privacidade),
 * sem dependências externas.
 */
export const ROUTES = {
  home: "/",
  privacy: "/politica-de-privacidade",
} as const;

const NAVIGATE_EVENT = "app:navigate";

export function navigate(to: string) {
  if (to === window.location.pathname) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  window.scrollTo({ top: 0, behavior: "auto" });
}

export function usePathname(): string {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    window.addEventListener(NAVIGATE_EVENT, update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, onClick, ...props }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handleClick} {...props} />;
}
