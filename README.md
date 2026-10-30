# Grupo VIP | Dr. André Menegat — Landing page

Landing page de conversão para a campanha de toxina botulínica do Dr. André Menegat. O único objetivo da página é
levar o visitante (tráfego de Meta Ads) ao **grupo VIP do WhatsApp**. Não há formulários, vendas ou agendamentos.

- **Stack:** Vite + React 18 + TypeScript + Tailwind CSS 3 (a mesma base usada pelo Lovable). Sem bibliotecas de UI.
- **Fontes:** Cormorant Garamond (títulos) e Manrope (textos), hospedadas no próprio site (sem Google Fonts).
- **Páginas:** `/` (landing) e `/politica-de-privacidade`.

> Antes de publicar, siga o [PUBLICACAO.md](PUBLICACAO.md). Enquanto houver pendência obrigatória, a página mostra um
> aviso de pré-visualização, fica com `noindex` e o `npm run build` lista o que falta.

## Como rodar

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:8080`. Para gerar a versão de produção (pasta `dist/`):

```bash
npm run build
```

## Onde editar — `src/config/campaign.ts`

Todo o conteúdo variável fica **num único arquivo**. Campo vazio (`""`) significa "a definir": a página nunca inventa
o conteúdo e o item aparece no checklist.

| Campo | O que é |
| --- | --- |
| `WHATSAPP_GROUP_URL` | Convite oficial `https://chat.whatsapp.com/...`. Usado por **todos** os botões. Não adicione parâmetros. |
| `DOCTOR_CRM`, `DOCTOR_CRM_UF` | Identificação obrigatória. Aparece no hero, na seção do médico e no rodapé. |
| `DOCTOR_SPECIALTY`, `DOCTOR_RQE` | Só preencha especialidade registrada; com especialidade, o RQE vira obrigatório. |
| `DOCTOR_PRACTICE_AREA`, `DOCTOR_DIFFERENTIALS` | Completam o texto-base da seção "Conheça". Ou use `DOCTOR_BIO` (parágrafos prontos). |
| `DOCTOR_EDUCATION` | Formação e experiência comprovadas (lista). |
| `DOCTOR_PHOTO`, `DOCTOR_PHOTO_ABOUT` | Fotografia oficial (hero) e, opcionalmente, uma segunda para a seção "Conheça". |
| `BRAND_LOGO`, `BRAND_COLORS` | Logotipos e paleta (provisória). Trocar as cores aqui atualiza o site inteiro. |
| `OFFER_ANNOUNCEMENT_DATE` / `_TIME` | Data (`AAAA-MM-DD`) e horário (`HH:MM`) da divulgação. |
| `SHOW_ANNOUNCEMENT_DATE` | Controle de exibição: a data só aparece quando `true` (divulgação autorizada). |
| `CAMPAIGN_BADGE` | Selo circular sobre a foto do hero (`show: false` para ocultar). |
| `META_PIXEL_ID` | ID do Pixel (15–16 dígitos). |
| `CLINIC_CITY`, `CLINIC_DETAILS` | Dados da clínica e do diretor técnico, se a divulgação também for em nome da clínica. |
| `SITE_URL` | Endereço final (necessário para a imagem de compartilhamento funcionar no Facebook/WhatsApp). |
| `PRIVACY` | Dados do controlador para a Política de Privacidade. |
| `COMPLIANCE_REVIEWED` | Marque `true` só depois da revisão final de conformidade. |

Os títulos de SEO, Open Graph, cores e o preload da foto são gerados a partir deste arquivo pelo plugin em
`vite.config.ts` — não é preciso editar o `index.html`.

### Data da divulgação

- Sem data, ou com `SHOW_ANNOUNCEMENT_DATE: false`: a página diz apenas "A data será anunciada pela equipe."
- Com data válida e `SHOW_ANNOUNCEMENT_DATE: true`: hero, "Como funciona", FAQ e CTA final passam a exibir a data
  (ex.: "sexta-feira, 27 de novembro, às 19h"). Sem horário, mostra só a data.
- Não existe contador regressivo. Se for solicitado no futuro, ele deve usar exclusivamente essa data configurada.

### Imagens

Os arquivos originais ficam em `brand-assets/`. Para trocar a foto ou o logotipo, substitua o arquivo mantendo o nome e
rode:

```bash
npm run images
```

O script gera em `public/images/` as versões AVIF/WebP responsivas da foto, os logotipos, o monograma, o selo, os ícones
(favicon) e a imagem de compartilhamento `og-image.jpg` (1200×630).

## Botões do WhatsApp

Todos os CTAs usam o componente `src/components/WhatsAppButton.tsx` e o mesmo destino (`WHATSAPP_GROUP_URL`):
cabeçalho, hero, "Como funciona", CTA final e botão fixo no celular. O link abre em nova aba com
`rel="noopener noreferrer"`. Sem link configurado, o clique mostra apenas um aviso para o administrador.

## Pixel da Meta e consentimento (LGPD)

Implementação em `src/lib/metaPixel.ts` e `src/lib/consent.tsx`.

- O Pixel **só é carregado** com `META_PIXEL_ID` válido **e** depois que o visitante aceita os cookies de marketing.
  Antes disso, nenhum script da Meta é baixado.
- O aviso de cookies só aparece quando há Pixel configurado. Aceitar e rejeitar têm o mesmo peso visual, e o link
  "Configurações de cookies" no rodapé permite mudar a escolha a qualquer momento. Ao revogar, o Pixel recebe
  `consent revoke` e os cookies `_fbp`/`_fbc` são apagados.
- Eventos enviados:
  - `PageView` — uma vez por carregamento.
  - `GroupLinkClick` — evento personalizado, **sem parâmetros**, a cada clique em qualquer botão do grupo (cliques
    repetidos em menos de 1 s são ignorados). Ele mede **intenção** de entrar; não confirma que a pessoa entrou no
    grupo. Ao criar conversões personalizadas, nomeie de acordo (ex.: "Clique no convite do grupo").
- `autoConfig` fica desativado: o Pixel não coleta textos de botões nem metadados da página (que mencionam o
  procedimento). Os eventos automáticos de troca de rota também ficam desligados.

### Como ativar

1. Copie o ID do Pixel no Meta Events Manager e cole em `META_PIXEL_ID`.
2. No Events Manager, deixe **desativada** a correspondência avançada automática (Automatic Advanced Matching).
3. Não use nomes de procedimentos ou termos de saúde nos parâmetros UTM dos anúncios — a URL da página é enviada à Meta.
4. Teste com a extensão **Meta Pixel Helper** e na aba **Testar eventos** do Events Manager: aceite os cookies,
   confirme o `PageView` e clique em um botão para ver o `GroupLinkClick`. Rejeitando os cookies, nada deve aparecer.

## Estrutura

```
src/
  config/      campaign.ts (edite aqui), rules.ts (validações), checklist.ts (pendências de publicação)
  sections/    Header, Hero, Benefits, About, HowItWorks, Faq, FinalCta, Footer
  components/  WhatsAppButton, CookieConsent, AdminNotice, StickyMobileCta, Logo, DoctorPhoto, ícones…
  lib/         consent, metaPixel, announcement (data), router (2 rotas, sem dependências), content
  pages/       Index, PrivacyPolicy, NotFound
brand-assets/  arquivos originais da marca
scripts/       process-images.mjs
```

## Publicação e hospedagem

É um site estático (pasta `dist/`). Como a política de privacidade é uma rota da aplicação, o servidor precisa
redirecionar todas as rotas para `index.html` — já incluído para Vercel (`vercel.json`) e Netlify
(`public/_redirects`). Também pode ser levado ao Lovable pelo GitHub, mantendo a mesma estrutura.

## Acessibilidade e desempenho

HTML semântico com um único `h1`, link "Pular para o conteúdo", foco visível, accordion e diálogos acessíveis por
teclado, botões com área de toque de 44 px ou mais, contraste AA nas cores de texto e respeito a "reduzir movimento". A foto
do hero tem prioridade de carregamento (e preload no desktop); as demais imagens usam lazy loading; animações usam
apenas opacidade e deslocamento, sem saltos de layout.
