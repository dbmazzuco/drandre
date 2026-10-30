import { useEffect, useState } from "react";
import { useConsent } from "@/lib/consent";
import { FINAL_CTA_ID } from "@/sections/FinalCta";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * CTA fixo no rodapé da tela (somente celular). Aparece depois que o botão do hero
 * sai da tela e some ao chegar no CTA final ou enquanto o aviso de cookies estiver aberto.
 */
export function StickyMobileCta() {
  const { bannerVisible } = useConsent();
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const hero = document.querySelector('[data-cta="hero"]');
      const finalCta = document.getElementById(FINAL_CTA_ID);
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > viewport * 0.6;
      const beforeFinal = finalCta ? finalCta.getBoundingClientRect().top > viewport : true;
      setInRange(pastHero && beforeFinal);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const visible = inRange && !bannerVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-graphite/10 bg-ivory/95 px-4 pt-3 pb-safe backdrop-blur-md transition-[transform,visibility] duration-500 ease-soft lg:hidden ${
        visible ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <WhatsAppButton variant="sticky" label="Quero entrar no Grupo VIP" location="fixo-mobile" />
    </div>
  );
}
