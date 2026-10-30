import { LogoLockup } from "@/components/Logo";
import { Link, ROUTES } from "@/lib/router";

export function NotFound() {
  return (
    <main id="conteudo" className="container-page flex min-h-[100svh] flex-col items-center justify-center py-16 text-center">
      <LogoLockup />
      <h1 className="mt-12 text-[2.5rem] leading-tight">Página não encontrada</h1>
      <p className="mt-4 text-muted">O endereço acessado não existe ou foi alterado.</p>
      <Link
        to={ROUTES.home}
        className="mt-8 inline-flex min-h-[3rem] items-center rounded-full bg-graphite px-7 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ivory"
      >
        Ir para a página do Grupo VIP
      </Link>
    </main>
  );
}
