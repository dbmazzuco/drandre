import { StickyMobileCta } from "@/components/StickyMobileCta";
import { About } from "@/sections/About";
import { Benefits } from "@/sections/Benefits";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { HowItWorks } from "@/sections/HowItWorks";

/** Jornada: Atenção (Hero) → Interesse (Benefícios) → Confiança (Médico) → Clareza (Como funciona, FAQ) → Ação (CTA final). */
export function Index() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Benefits />
        <About />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
