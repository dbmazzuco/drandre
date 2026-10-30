# Checklist de publicação

A página **não deve receber tráfego** enquanto os itens obrigatórios estiverem pendentes. O mesmo checklist aparece no
botão "Ver checklist" do aviso de pré-visualização e como alerta no `npm run build`. Todos os campos ficam em
`src/config/campaign.ts`.

## Obrigatórios

- [ ] **Link do grupo** — `WHATSAPP_GROUP_URL` com o convite oficial (`https://chat.whatsapp.com/...`). Testar o clique
      no Android, no iOS e no desktop, inclusive dentro do navegador do Instagram e do Facebook.
- [ ] **CRM e UF** — `DOCTOR_CRM`, `DOCTOR_CRM_UF`, conferidos no portal do CFM.
- [ ] **Especialidade e RQE** — só se houver especialidade registrada a divulgar (`DOCTOR_SPECIALTY` + `DOCTOR_RQE`).
- [ ] **Pixel da Meta** — `META_PIXEL_ID` configurado e eventos validados (ver README).
- [ ] **Política de Privacidade** — `PRIVACY.controllerName`, `controllerDocument`, `contactEmail` (e encarregado, se
      houver) preenchidos; texto revisado por assessoria jurídica e `PRIVACY.legallyReviewed: true`.
- [ ] **Clínica** — se a divulgação também for em nome de pessoa jurídica, preencher `CLINIC_DETAILS` (razão social,
      CNPJ, inscrição no CRM e diretor técnico com CRM/RQE).
- [ ] **Revisão de conformidade** — revisão final pelo responsável pela campanha (Resolução CFM nº 2.336/2023, LGPD e
      políticas de publicidade da Meta) e `COMPLIANCE_REVIEWED: true`.

## Recomendados

- [ ] `DOCTOR_PRACTICE_AREA` e `DOCTOR_DIFFERENTIALS` (ou `DOCTOR_BIO`) com informações reais e verificáveis.
- [ ] `DOCTOR_EDUCATION` com formação e experiência comprovadas.
- [ ] `SITE_URL` com o domínio final (para a imagem de compartilhamento aparecer no WhatsApp/Facebook). Depois de
      publicar, conferir no Depurador de Compartilhamento da Meta.
- [ ] Paleta oficial em `BRAND_COLORS` e `BRAND_COLORS_ARE_OFFICIAL: true`.
- [ ] Data de divulgação (`OFFER_ANNOUNCEMENT_DATE`, `OFFER_ANNOUNCEMENT_TIME`) e `SHOW_ANNOUNCEMENT_DATE: true`
      somente quando a equipe autorizar a divulgação.

## Pontos para a revisão de conformidade

- **Selo "Black Friday Exclusive"** — o selo enviado aparece sobre a foto do hero (`CAMPAIGN_BADGE`). Confirmar se o
  uso dessa chamada promocional é adequado às regras de publicidade médica; para ocultar, use `show: false`.
- **"Botox"** — a página usa apenas o termo genérico "toxina botulínica". Mencionar uma marca só após confirmar o
  produto efetivamente utilizado e a adequação do uso publicitário.
- **"Contorno Corporal"** — está no logotipo oficial, mas não foi usado como área de atuação ou especialidade no texto.
- **Fotografia** — confirmar a autorização de uso da imagem do médico.
- **Anúncios** — manter a promessa dos anúncios igual à da página (condição especial revelada no grupo, sem preços,
  descontos ou prazos) e aplicar a segmentação para maiores de 18 anos exigida pela Meta para procedimentos estéticos.
- **Métricas** — `GroupLinkClick` mede cliques no convite, não entradas confirmadas no grupo. Acompanhar o número
  real de participantes pelo próprio WhatsApp.

## Testes antes de ativar os anúncios

- [ ] Todos os botões (cabeçalho, hero, "Como funciona", CTA final e botão fixo no celular) abrem o mesmo convite.
- [ ] O aviso de pré-visualização desapareceu e a página não mostra marcadores "[a definir]".
- [ ] Aviso de cookies: aceitar, rejeitar e alterar pelo rodapé funcionam; com rejeição, o Pixel Helper não detecta
      eventos.
- [ ] Página conferida em celular (Android e iPhone) e desktop.
- [ ] `npm run build` sem o alerta "ainda NÃO está pronta para publicação".
