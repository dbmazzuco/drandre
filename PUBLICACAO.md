# Checklist de publicação

A página **não deve receber tráfego** enquanto os itens obrigatórios estiverem pendentes. O mesmo checklist aparece no
botão "Ver checklist" do aviso de pré-visualização e como alerta no `npm run build`. Todos os campos ficam em
`src/config/campaign.ts`.

## Obrigatórios

- [x] **Link do grupo** — `WHATSAPP_GROUP_URL` configurado. Falta testar o clique no Android, no iOS e no desktop,
      inclusive dentro do navegador do Instagram e do Facebook.
- [x] **CRM e UF** — CRM/SC 13389, conferido no portal do CFM em 30/10/2026 (situação regular).
- [x] **Especialidade e RQE** — a única especialidade registrada é Medicina do Trabalho (RQE 21082), não divulgada nesta
      campanha. Não usar "especialista em minilipo" ou "em contorno corporal": não são especialidades registradas.
- [x] **Mensuração** — Google Tag Manager `GTM-K94HHX9M` configurado. Falta revisar as tags do contêiner e validar no
      modo Visualizar (ver README).
- [ ] **Política de Privacidade** — controlador preenchido (Clínica Médica Pieri e Menegat Ltda). Falta o **e-mail de
      contato** para os titulares (`PRIVACY.contactEmail`), a revisão jurídica e `PRIVACY.legallyReviewed: true`.
- [ ] **Clínica** — a página está em nome do médico, então `CLINIC_DETAILS` ficou vazio. Se a divulgação também for em
      nome da clínica, preencher razão social, CNPJ, inscrição no CRM e diretor técnico. Atenção: em 30/10/2026 o
      cadastro da clínica no CRM-SC (nº 6042) aparecia com outro nome ("Clínica Médica Corrêa e Menegat Ltda"), outro
      diretor técnico e certificado de regularidade vencido desde 24/06/2020 — regularizar antes de usar o nome da
      clínica em anúncios.
- [ ] **Revisão de conformidade** — revisão final pelo responsável pela campanha (Resolução CFM nº 2.336/2023, LGPD e
      políticas de publicidade da Meta) e `COMPLIANCE_REVIEWED: true`.

## Recomendados

- [x] `DOCTOR_BIO` e `DOCTOR_EDUCATION` com dados verificados (CFM e perfil oficial). Números de atendimentos, tempo
      de experiência em procedimentos e depoimentos **não** foram usados: só incluir dados comprovados e após a
      revisão de conformidade.
- [x] **Antes e depois** — 3 casos publicados. A equipe confirmou em 04/11/2026 que as fotos são de pacientes do
      Dr. André, com autorização por escrito (`RESULTS.consentOnFile`); manter os termos arquivados.
      Na revisão de conformidade, conferir o texto informativo da seção (`RESULTS.note`) e que as fotos não têm edição.
- [x] `SITE_URL` com o domínio da Vercel. Trocar se houver domínio próprio e conferir no Depurador de Compartilhamento
      da Meta.
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
