/**
 * ============================================================================
 *  CONFIGURAÇÃO CENTRAL DA CAMPANHA — Grupo VIP | Dr. André Menegat
 * ============================================================================
 *
 *  Este é o ÚNICO arquivo que precisa ser editado para colocar a página no ar.
 *  Todos os componentes, metadados de SEO, cores e o checklist de publicação
 *  leem os valores daqui.
 *
 *  Regras:
 *  - Campo vazio ("") significa "a definir". A página nunca inventa o conteúdo:
 *    enquanto um campo estiver vazio, ela usa um texto neutro e o item aparece
 *    no checklist de pré-visualização.
 *  - Preencha somente com informações reais e verificadas.
 *  - Depois de editar, recarregue a pré-visualização.
 */
export const CAMPAIGN: CampaignConfig = {
  // ---------------------------------------------------------------------------
  //  PROFISSIONAL
  // ---------------------------------------------------------------------------
  DOCTOR_NAME: "Dr. André Menegat",

  /** Número do CRM, somente dígitos. Ex.: "123456" */
  DOCTOR_CRM: "13389",
  /** UF do CRM. Ex.: "SP" */
  DOCTOR_CRM_UF: "SC",

  /**
   * Especialidade médica — preencha SOMENTE se for especialidade registrada no CRM.
   * Se preencher, o RQE passa a ser obrigatório.
   *
   * Consulta ao CFM (30/10/2026): a única especialidade registrada é Medicina do
   * Trabalho (RQE 21082). Ela não é divulgada nesta campanha por não ter relação
   * com o procedimento. "Contorno corporal" e "minilipo" NÃO são especialidades.
   */
  DOCTOR_SPECIALTY: "",
  /** Número do RQE da especialidade acima, quando aplicável. */
  DOCTOR_RQE: "",

  /** Completa a frase "O Dr. André Menegat é médico e atua na área de ___." */
  DOCTOR_PRACTICE_AREA: "",
  /** Completa a frase "Seu trabalho é orientado por ___, valorizando a avaliação…" */
  DOCTOR_DIFFERENTIALS: "",
  /**
   * Texto de apresentação completo (opcional). Se preenchido, substitui o
   * texto-base montado com os dois campos acima. Um parágrafo por item.
   */
  DOCTOR_BIO: [
    "O Dr. André Menegat é médico, atua na área de contorno corporal e realiza atendimentos em Orleans (SC).",
    "Seu trabalho valoriza a avaliação individualizada e o cuidado com cada paciente.",
  ],
  /** Formação e experiência efetivamente comprovadas. Um item por linha. */
  DOCTOR_EDUCATION: [
    "Graduação em Medicina pela Universidade do Extremo Sul Catarinense (UNESC), 2006",
    "Inscrito no CRM-SC desde 2006",
  ],

  /**
   * Fotografia oficial do médico. Para trocar: substitua o arquivo em
   * /brand-assets/dr-andre-menegat.jpg e rode `npm run images`, ou aponte
   * `src` para outra imagem em /public/images (e esvazie `avif`/`webp`).
   */
  DOCTOR_PHOTO: {
    src: "/images/dr-andre-menegat.jpg",
    avif: "/images/dr-andre-menegat-480.avif 480w, /images/dr-andre-menegat-640.avif 640w, /images/dr-andre-menegat-807.avif 807w",
    webp: "/images/dr-andre-menegat-480.webp 480w, /images/dr-andre-menegat-640.webp 640w, /images/dr-andre-menegat-807.webp 807w",
    width: 807,
    height: 1178,
    alt: "Retrato do Dr. André Menegat, de terno escuro, sorrindo, em estúdio com fundo cinza.",
  },
  /** Segunda fotografia para a seção "Conheça". Deixe null para reutilizar a principal. */
  DOCTOR_PHOTO_ABOUT: null,

  // ---------------------------------------------------------------------------
  //  MARCA
  // ---------------------------------------------------------------------------
  BRAND_LOGO: {
    /** Logotipo completo para fundos claros. */
    onLight: "/images/logo-dourado.webp",
    /** Logotipo completo para fundos escuros. */
    onDark: "/images/logo-champagne.webp",
    /** Monograma "AM" usado no cabeçalho. */
    monogram: "/images/logo-dourado-monograma.webp",
    monogramOnDark: "/images/logo-champagne-monograma.webp",
    alt: "Dr. André Menegat — Contorno Corporal",
  },

  /**
   * Paleta PROVISÓRIA. Substitua pelos códigos oficiais da marca e marque
   * BRAND_COLORS_ARE_OFFICIAL como true. Valores em hexadecimal.
   */
  BRAND_COLORS: {
    ivory: "#F7F5F1", // off-white — fundo principal
    graphite: "#252525", // grafite profundo — textos e botões
    sand: "#E9E2D7", // bege sofisticado — fundos de apoio
    gold: "#A88C65", // dourado fosco — detalhes, linhas e ícones
    white: "#FFFFFF",
    goldInk: "#6F5638", // dourado escurecido — textos pequenos em dourado (contraste AA)
    muted: "#5C5852", // texto secundário
    night: "#1C1C1C", // rodapé
    champagne: "#D8C6A6", // dourado claro sobre fundos escuros
  },
  BRAND_COLORS_ARE_OFFICIAL: false,

  // ---------------------------------------------------------------------------
  //  CAMPANHA
  // ---------------------------------------------------------------------------
  /**
   * Link oficial de convite do grupo. Formato: https://chat.whatsapp.com/XXXXXXXX
   * Não adicione parâmetros de rastreamento. Todos os botões usam este link.
   */
  WHATSAPP_GROUP_URL: "https://chat.whatsapp.com/Je8i3OZbYLh00AJuBGpL2s",

  /** Data de divulgação da condição especial. Formato: "AAAA-MM-DD". Ex.: "2026-11-27" */
  OFFER_ANNOUNCEMENT_DATE: "",
  /** Horário de divulgação (opcional). Formato: "HH:MM". Ex.: "19:00" */
  OFFER_ANNOUNCEMENT_TIME: "",
  /**
   * Controle de exibição da data. Mesmo com a data preenchida, ela só aparece
   * na página quando este campo for true (divulgação autorizada pela equipe).
   */
  SHOW_ANNOUNCEMENT_DATE: false,

  /**
   * Selo circular da campanha exibido sobre a fotografia do hero.
   * Valide o uso com a revisão de conformidade antes de publicar.
   */
  CAMPAIGN_BADGE: {
    show: true,
    // Versões: selo-grupo-vip-claro.webp ou selo-grupo-vip-escuro.webp (geradas por `npm run images`).
    src: "/images/selo-grupo-vip-claro.webp",
    alt: "Selo Black Friday — Grupo VIP Dr. André Menegat",
  },

  // ---------------------------------------------------------------------------
  //  RESULTADOS (ANTES E DEPOIS)
  // ---------------------------------------------------------------------------
  /**
   * Fotos de antes e depois de PACIENTES DO PRÓPRIO MÉDICO, com autorização de uso
   * de imagem por escrito (CFM 2.336/2023 e LGPD). Os arquivos originais ficam em
   * /brand-assets/resultados; `npm run images` gera as versões usadas aqui.
   * A seção só aparece quando `show` é true e há pelo menos um caso.
   */
  RESULTS: {
    show: true,
    /** Confirmação de que os termos de autorização dos pacientes estão arquivados. */
    consentOnFile: true, // confirmado pela equipe em 04/11/2026
    title: "Resultados de pacientes do Dr. André Menegat",
    intro:
      "Imagens de pacientes atendidos pelo Dr. André Menegat, publicadas com autorização. Cada resultado é individual e depende de avaliação médica.",
    note: "A toxina botulínica atua na contração dos músculos responsáveis pelas linhas de expressão. O efeito é temporário, e a indicação, a resposta ao tratamento, a duração e os possíveis efeitos adversos variam de pessoa para pessoa e são discutidos na consulta.",
    cases: [
      { before: "/images/resultados/caso-1-antes.webp", after: "/images/resultados/caso-1-depois.webp", width: 960, height: 540, area: "Região frontal (testa)" },
      { before: "/images/resultados/caso-2-antes.webp", after: "/images/resultados/caso-2-depois.webp", width: 960, height: 540, area: "Região frontal (testa)" },
      { before: "/images/resultados/caso-3-antes.webp", after: "/images/resultados/caso-3-depois.webp", width: 960, height: 540, area: "Região frontal (testa)" },
    ],
  },

  // ---------------------------------------------------------------------------
  //  MENSURAÇÃO
  // ---------------------------------------------------------------------------
  /**
   * ID do Pixel da Meta (15 ou 16 dígitos). O Pixel só é carregado depois que o
   * visitante aceita os cookies de marketing. Veja o README.
   */
  META_PIXEL_ID: "",

  /**
   * ID do contêiner do Google Tag Manager (formato "GTM-XXXXXXX"). Assim como o
   * Pixel, o GTM só é carregado depois do aceite dos cookies de marketing.
   * Se o Pixel da Meta estiver dentro do GTM, deixe META_PIXEL_ID vazio para não
   * duplicar eventos. Veja o README.
   */
  GTM_ID: "GTM-K94HHX9M",

  // ---------------------------------------------------------------------------
  //  CLÍNICA (preencha somente se a divulgação também for em nome de clínica)
  // ---------------------------------------------------------------------------
  CLINIC_CITY: "Orleans (SC)",
  CLINIC_DETAILS: {
    legalName: "", // razão social
    cnpj: "",
    address: "",
    crmRegistration: "", // inscrição da clínica no CRM, quando aplicável
    technicalDirectorName: "",
    technicalDirectorCrm: "", // ex.: "CRM/SP 123456"
    technicalDirectorRqe: "",
  },

  // ---------------------------------------------------------------------------
  //  SITE, SEO E PRIVACIDADE
  // ---------------------------------------------------------------------------
  /** Endereço final da página, sem barra no fim. Ex.: "https://grupovip.drandremenegat.com.br" */
  SITE_URL: "https://drandremenegat.vercel.app",
  SEO_TITLE: "Grupo VIP | Dr. André Menegat",
  SEO_DESCRIPTION:
    "Entre no Grupo VIP do Dr. André Menegat e acompanhe a divulgação de uma condição especial para toxina botulínica.",
  OG_IMAGE: { src: "/images/og-image.jpg", width: 1200, height: 630 },

  /** Dados da Política de Privacidade (LGPD). */
  PRIVACY: {
    controllerName: "Clínica Médica Pieri e Menegat Ltda", // nome ou razão social do controlador dos dados
    controllerDocument: "CNPJ 33.261.414/0001-23", // ex.: "CNPJ 00.000.000/0001-00"
    controllerAddress: "Rua Miguel Couto, 520, Centro, Orleans (SC), CEP 88870-000",
    contactEmail: "carolpizzolatti@hotmail.com", // canal para o titular exercer seus direitos
    dpoName: "André Roberto Menegat", // encarregado pelo tratamento de dados (DPO)
    dpoContact: "", // vazio = atende pelo e-mail de contato acima
    lastUpdated: "2026-10-30", // "AAAA-MM-DD"
    /** Marque true somente após revisão jurídica do texto da política. */
    legallyReviewed: false,
  },

  /**
   * Marque true somente após a revisão final de conformidade (CFM, LGPD e
   * políticas da Meta) feita pelo responsável pela campanha.
   */
  COMPLIANCE_REVIEWED: false,
};

// ---------------------------------------------------------------------------
//  Tipos (não é necessário editar abaixo desta linha)
// ---------------------------------------------------------------------------
export interface Photo {
  src: string;
  avif?: string;
  webp?: string;
  width: number;
  height: number;
  alt: string;
}

export interface ResultCase {
  /** Caminhos das imagens geradas em /public/images/resultados. */
  before: string;
  after: string;
  width: number;
  height: number;
  /** Região tratada, ex.: "Região frontal (testa)". */
  area: string;
  /** Intervalo entre as fotos, se informado. Ex.: "15 dias após a aplicação". */
  interval?: string;
}

export interface CampaignConfig {
  DOCTOR_NAME: string;
  DOCTOR_CRM: string;
  DOCTOR_CRM_UF: string;
  DOCTOR_SPECIALTY: string;
  DOCTOR_RQE: string;
  DOCTOR_PRACTICE_AREA: string;
  DOCTOR_DIFFERENTIALS: string;
  DOCTOR_BIO: string[];
  DOCTOR_EDUCATION: string[];
  DOCTOR_PHOTO: Photo;
  DOCTOR_PHOTO_ABOUT: Photo | null;
  BRAND_LOGO: { onLight: string; onDark: string; monogram: string; monogramOnDark: string; alt: string };
  BRAND_COLORS: Record<
    "ivory" | "graphite" | "sand" | "gold" | "white" | "goldInk" | "muted" | "night" | "champagne",
    string
  >;
  BRAND_COLORS_ARE_OFFICIAL: boolean;
  WHATSAPP_GROUP_URL: string;
  OFFER_ANNOUNCEMENT_DATE: string;
  OFFER_ANNOUNCEMENT_TIME: string;
  SHOW_ANNOUNCEMENT_DATE: boolean;
  CAMPAIGN_BADGE: { show: boolean; src: string; alt: string };
  RESULTS: {
    show: boolean;
    consentOnFile: boolean;
    title: string;
    intro: string;
    note: string;
    cases: ResultCase[];
  };
  META_PIXEL_ID: string;
  GTM_ID: string;
  CLINIC_CITY: string;
  CLINIC_DETAILS: {
    legalName: string;
    cnpj: string;
    address: string;
    crmRegistration: string;
    technicalDirectorName: string;
    technicalDirectorCrm: string;
    technicalDirectorRqe: string;
  };
  SITE_URL: string;
  SEO_TITLE: string;
  SEO_DESCRIPTION: string;
  OG_IMAGE: { src: string; width: number; height: number };
  PRIVACY: {
    controllerName: string;
    controllerDocument: string;
    controllerAddress: string;
    contactEmail: string;
    dpoName: string;
    dpoContact: string;
    lastUpdated: string;
    legallyReviewed: boolean;
  };
  COMPLIANCE_REVIEWED: boolean;
}
