import type { ReactNode } from "react";
import { ArrowLeftIcon } from "@/components/icons";
import { LogoLockup } from "@/components/Logo";
import { CAMPAIGN } from "@/config/campaign";
import { IS_PREVIEW } from "@/config/checklist";
import { filled, isValidIsoDate } from "@/config/rules";
import { useConsent } from "@/lib/consent";
import { valueOr } from "@/lib/content";
import { Link, ROUTES } from "@/lib/router";
import { Footer } from "@/sections/Footer";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-graphite/10 py-9">
      <h2 className="text-[1.75rem] leading-tight sm:text-[2rem]">{title}</h2>
      <div className="mt-4 space-y-4 text-muted [&_strong]:font-semibold [&_strong]:text-graphite">{children}</div>
    </section>
  );
}

function formatUpdated(value: string) {
  if (!isValidIsoDate(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

const COOKIES = [
  { name: "dam.cookie-consent", provider: "Esta página (armazenamento local)", category: "Essencial", purpose: "Registrar a sua escolha sobre cookies.", duration: "Até ser apagado no navegador" },
  { name: "_fbp", provider: "Meta", category: "Marketing", purpose: "Identificar o navegador para medir o desempenho dos anúncios.", duration: "90 dias" },
  { name: "_fbc", provider: "Meta", category: "Marketing", purpose: "Associar a visita ao clique em um anúncio.", duration: "90 dias" },
];

/**
 * Política de Privacidade — MINUTA. Os campos vêm de CAMPAIGN.PRIVACY.
 * O texto precisa de revisão jurídica antes da publicação (PRIVACY.legallyReviewed).
 */
export function PrivacyPolicy() {
  const { openPreferences } = useConsent();
  const p = CAMPAIGN.PRIVACY;
  const updated = formatUpdated(p.lastUpdated);

  return (
    <>
      <header className="border-b border-graphite/10 bg-ivory">
        <div className="container-page flex h-[4.25rem] items-center justify-between gap-4 sm:h-20">
          <Link to={ROUTES.home} aria-label={`${CAMPAIGN.DOCTOR_NAME} — página do Grupo VIP`}>
            <LogoLockup compact />
          </Link>
          <Link
            to={ROUTES.home}
            className="inline-flex min-h-[2.75rem] items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-graphite hover:text-gold-ink"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar para a página
          </Link>
        </div>
      </header>

      <main id="conteudo" className="container-page max-w-3xl py-14 sm:py-20">
        <p className="eyebrow">Privacidade</p>
        <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-[3.25rem]">Política de Privacidade</h1>
        <p className="mt-4 text-[0.9375rem] text-muted">
          Última atualização: {valueOr(updated, "data a definir", { fallback: "—" })}
        </p>

        {!p.legallyReviewed && (
          <div role="note" className="mt-8 border border-dashed border-gold bg-sand/50 p-5 text-[0.9375rem] leading-relaxed text-graphite">
            <strong className="font-semibold">Minuta em elaboração.</strong> Este texto é um modelo inicial e ainda não passou
            por revisão jurídica. Os dados do controlador devem ser preenchidos e o documento validado antes da publicação da
            página.
          </div>
        )}

        <div className="mt-10">
          <Section title="1. Quem é o responsável pelos seus dados">
            <p>
              O controlador dos dados pessoais tratados nesta página é{" "}
              <strong>{valueOr(p.controllerName, "nome ou razão social do controlador")}</strong>, inscrito(a) sob o nº{" "}
              {valueOr(p.controllerDocument, "CPF/CNPJ")}
              {filled(p.controllerAddress) ? <>, com endereço em {p.controllerAddress}</> : null}.
            </p>
            <p>Contato para assuntos de privacidade: {valueOr(p.contactEmail, "e-mail de contato")}.</p>
            {(filled(p.dpoName) || IS_PREVIEW) && (
              <p>
                Encarregado pelo tratamento de dados (DPO): {valueOr(p.dpoName, "nome do encarregado")}
                {filled(p.dpoContact) ? ` — ${p.dpoContact}` : ""}.
              </p>
            )}
          </Section>

          <Section title="2. Quais dados tratamos">
            <p>Esta página não possui formulários e não solicita nome, telefone, e-mail ou informações de saúde.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Registros técnicos de acesso</strong> (como endereço IP, data, horário e tipo de navegador), mantidos
                pelo provedor de hospedagem para o funcionamento e a segurança da página.
              </li>
              <li>
                <strong>Registro da sua escolha sobre cookies</strong>, armazenado no seu próprio navegador.
              </li>
              <li>
                <strong>Somente com o seu consentimento:</strong> cookies e identificadores do Pixel da Meta, que registram a
                visualização da página e o clique no botão de acesso ao grupo VIP. Esses eventos não incluem dados de saúde
                nem o nome de procedimentos.
              </li>
            </ul>
            <p>
              Ao clicar no botão, você é direcionado ao WhatsApp. Se decidir entrar no grupo, o tratamento de dados no
              aplicativo — como número de telefone e nome de perfil, que podem ficar visíveis aos administradores e aos
              demais participantes, conforme as configurações do WhatsApp — também está sujeito às políticas do próprio
              WhatsApp.
            </p>
          </Section>

          <Section title="3. Para que usamos os dados e com qual base legal">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Funcionamento e segurança da página:</strong> legítimo interesse (art. 7º, IX, da LGPD).
              </li>
              <li>
                <strong>Registro da sua escolha sobre cookies:</strong> legítimo interesse e cumprimento de obrigação legal
                (art. 7º, II e IX, da LGPD).
              </li>
              <li>
                <strong>Medição do desempenho dos anúncios (Pixel da Meta):</strong> consentimento (art. 7º, I, da LGPD),
                que pode ser revogado a qualquer momento.
              </li>
              <li>
                <strong>Comunicações no grupo VIP do WhatsApp:</strong> consentimento, manifestado ao ingressar no grupo
                (art. 7º, I, da LGPD).
              </li>
            </ul>
          </Section>

          <Section title="4. Com quem compartilhamos">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Meta Platforms</strong> (Facebook e Instagram), somente se você autorizar os cookies de marketing.
              </li>
              <li>
                <strong>WhatsApp</strong>, quando você opta por acessar o grupo.
              </li>
              <li>
                <strong>Provedor de hospedagem</strong> da página.
              </li>
              <li>Autoridades públicas, quando houver obrigação legal ou ordem judicial.</li>
            </ul>
            <p>
              Alguns desses fornecedores podem armazenar dados fora do Brasil. Nesses casos, a transferência internacional
              observa as hipóteses previstas no art. 33 da LGPD.
            </p>
          </Section>

          <Section title="5. Cookies e tecnologias semelhantes">
            <p>
              Os cookies de marketing ficam desativados até que você os aceite. Você pode mudar sua escolha quando quiser:
            </p>
            <p>
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex min-h-[2.75rem] items-center rounded-full border border-graphite/25 px-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-graphite hover:border-graphite"
              >
                Abrir configurações de cookies
              </button>
            </p>
            <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[34rem] text-left text-[0.875rem]">
                <caption className="sr-only">Cookies utilizados nesta página</caption>
                <thead>
                  <tr className="border-b border-graphite/15 text-[0.75rem] uppercase tracking-[0.1em] text-graphite">
                    <th scope="col" className="py-3 pr-4 font-semibold">Nome</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Fornecedor</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Categoria</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Finalidade</th>
                    <th scope="col" className="py-3 font-semibold">Duração</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite/10">
                  {COOKIES.map((cookie) => (
                    <tr key={cookie.name} className="align-top">
                      <td className="py-3 pr-4 font-mono text-[0.8125rem] text-graphite">{cookie.name}</td>
                      <td className="py-3 pr-4">{cookie.provider}</td>
                      <td className="py-3 pr-4">{cookie.category}</td>
                      <td className="py-3 pr-4">{cookie.purpose}</td>
                      <td className="py-3">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="6. Por quanto tempo mantemos os dados">
            <p>
              O registro da sua escolha sobre cookies permanece no seu navegador até ser apagado por você. Os dados coletados
              pela Meta seguem os prazos definidos pela própria Meta. Os registros técnicos de acesso são mantidos pelo
              período necessário à segurança da página e ao cumprimento de obrigações legais.
            </p>
          </Section>

          <Section title="7. Seus direitos">
            <p>Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>confirmação da existência de tratamento e acesso aos dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>portabilidade dos dados;</li>
              <li>eliminação dos dados tratados com base no consentimento;</li>
              <li>informação sobre com quem os dados foram compartilhados;</li>
              <li>informação sobre a possibilidade de não consentir e suas consequências;</li>
              <li>revogação do consentimento.</li>
            </ul>
            <p>
              Para exercer seus direitos, entre em contato pelo e-mail {valueOr(p.contactEmail, "e-mail de contato")}. Você
              também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </Section>

          <Section title="8. Segurança">
            <p>
              Adotamos medidas técnicas e administrativas razoáveis para proteger os dados pessoais contra acessos não
              autorizados e situações acidentais ou ilícitas.
            </p>
          </Section>

          <Section title="9. Atualizações desta política">
            <p>
              Esta política pode ser atualizada para refletir mudanças na página ou na legislação. A data da última
              atualização é indicada no início do documento.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
