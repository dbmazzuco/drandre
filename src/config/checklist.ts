/**
 * Checklist de publicação calculado a partir de src/config/campaign.ts.
 * Exibido no aviso de pré-visualização e repetido como alerta no `npm run build`.
 */
import { CAMPAIGN } from "./campaign";
import {
  filled,
  hasSpecialty,
  isGtmIdValid,
  isMetaPixelIdValid,
  isValidIsoDate,
  isValidTime,
  isWhatsappGroupUrlValid,
} from "./rules";

export type ChecklistLevel = "blocker" | "recommended";

export interface ChecklistItem {
  id: string;
  label: string;
  /** Campo(s) de src/config/campaign.ts que resolvem o item. */
  field: string;
  level: ChecklistLevel;
  done: boolean;
  hint?: string;
}

export function getPublishChecklist(): ChecklistItem[] {
  const c = CAMPAIGN;
  const p = c.PRIVACY;
  const clinic = c.CLINIC_DETAILS;
  const clinicStarted = filled(clinic.legalName) || filled(clinic.cnpj);
  const dateFilled = filled(c.OFFER_ANNOUNCEMENT_DATE);

  const items: ChecklistItem[] = [
    {
      id: "whatsapp",
      label: "Link oficial de convite do grupo VIP",
      field: "WHATSAPP_GROUP_URL",
      level: "blocker",
      done: isWhatsappGroupUrlValid,
      hint: filled(c.WHATSAPP_GROUP_URL)
        ? "O link informado não está no formato https://chat.whatsapp.com/…"
        : "Sem o link, os botões exibem apenas um aviso de configuração.",
    },
    {
      id: "crm",
      label: "CRM e UF do médico",
      field: "DOCTOR_CRM, DOCTOR_CRM_UF",
      level: "blocker",
      done: filled(c.DOCTOR_CRM) && filled(c.DOCTOR_CRM_UF),
      hint: "Identificação obrigatória na publicidade médica.",
    },
    {
      id: "rqe",
      label: hasSpecialty ? "RQE da especialidade informada" : "Especialidade (nenhuma divulgada nesta campanha)",
      field: "DOCTOR_SPECIALTY, DOCTOR_RQE",
      level: hasSpecialty ? "blocker" : "recommended",
      done: hasSpecialty ? filled(c.DOCTOR_RQE) : true,
      hint: "Especialidade só pode ser divulgada com o RQE correspondente.",
    },
    {
      id: "bio",
      label: "Área de atuação e diferenciais reais do profissional",
      field: "DOCTOR_PRACTICE_AREA, DOCTOR_DIFFERENTIALS (ou DOCTOR_BIO)",
      level: "recommended",
      done: c.DOCTOR_BIO.length > 0 || (filled(c.DOCTOR_PRACTICE_AREA) && filled(c.DOCTOR_DIFFERENTIALS)),
      hint: "Enquanto vazio, a seção usa um texto neutro, sem informações inventadas.",
    },
    {
      id: "education",
      label: "Formação e experiência comprovadas",
      field: "DOCTOR_EDUCATION",
      level: "recommended",
      done: c.DOCTOR_EDUCATION.length > 0,
    },
    {
      id: "tracking",
      label: "Mensuração: Pixel da Meta ou Google Tag Manager",
      field: "META_PIXEL_ID ou GTM_ID",
      level: "blocker",
      done: isMetaPixelIdValid || isGtmIdValid,
      hint:
        filled(c.META_PIXEL_ID) && !isMetaPixelIdValid
          ? "O ID do Pixel deve ter 15 ou 16 dígitos."
          : filled(c.GTM_ID) && !isGtmIdValid
            ? "O ID do GTM deve ter o formato GTM-XXXXXXX."
            : "Depois de configurar, valide os eventos no Events Manager / no modo de visualização do GTM.",
    },
    {
      id: "privacy-controller",
      label: "Dados do controlador e canal de contato na Política de Privacidade",
      field: "PRIVACY.controllerName, PRIVACY.controllerDocument, PRIVACY.contactEmail",
      level: "blocker",
      done: filled(p.controllerName) && filled(p.controllerDocument) && filled(p.contactEmail),
    },
    {
      id: "privacy-review",
      label: "Revisão jurídica da Política de Privacidade",
      field: "PRIVACY.legallyReviewed",
      level: "blocker",
      done: p.legallyReviewed,
      hint: "O texto atual é uma minuta e está sinalizado como tal na página.",
    },
    {
      id: "compliance",
      label: "Revisão final de conformidade (CFM 2.336/2023, LGPD e políticas da Meta)",
      field: "COMPLIANCE_REVIEWED",
      level: "blocker",
      done: c.COMPLIANCE_REVIEWED,
      hint: [
        c.CAMPAIGN_BADGE.show && "Inclui validar o uso do selo “Black Friday” na fotografia do hero.",
        isGtmIdValid && "Revise as tags do contêiner do GTM: consentimento, nenhum dado de saúde e sem Pixel duplicado.",
      ]
        .filter(Boolean)
        .join(" ") || undefined,
    },
    {
      id: "site-url",
      label: "Endereço final da página (para o compartilhamento em redes sociais)",
      field: "SITE_URL",
      level: "recommended",
      done: /^https:\/\/[^\s/]+/.test(c.SITE_URL.trim()),
    },
    {
      id: "colors",
      label: "Paleta oficial de cores da marca",
      field: "BRAND_COLORS, BRAND_COLORS_ARE_OFFICIAL",
      level: "recommended",
      done: c.BRAND_COLORS_ARE_OFFICIAL,
    },
    {
      id: "date",
      label: "Data de divulgação da condição especial",
      field: "OFFER_ANNOUNCEMENT_DATE, OFFER_ANNOUNCEMENT_TIME, SHOW_ANNOUNCEMENT_DATE",
      level: "recommended",
      done:
        dateFilled &&
        isValidIsoDate(c.OFFER_ANNOUNCEMENT_DATE) &&
        (!filled(c.OFFER_ANNOUNCEMENT_TIME) || isValidTime(c.OFFER_ANNOUNCEMENT_TIME)),
      hint:
        dateFilled && !isValidIsoDate(c.OFFER_ANNOUNCEMENT_DATE)
          ? "Data em formato inválido — use AAAA-MM-DD."
          : "Enquanto vazia, a página informa que a data será anunciada pela equipe.",
    },
  ];

  if (isMetaPixelIdValid && isGtmIdValid) {
    items.push({
      id: "tracking-duplicate",
      label: "Pixel da Meta configurado direto e também pelo GTM",
      field: "META_PIXEL_ID, GTM_ID",
      level: "recommended",
      done: false,
      hint: "Se o contêiner do GTM já tiver o Pixel, deixe META_PIXEL_ID vazio para não duplicar eventos.",
    });
  }

  if (clinicStarted) {
    items.push({
      id: "clinic",
      label: "Dados da clínica e do diretor técnico",
      field: "CLINIC_DETAILS",
      level: "blocker",
      done: filled(clinic.legalName) && filled(clinic.cnpj) && filled(clinic.technicalDirectorName) && filled(clinic.technicalDirectorCrm),
      hint: "Obrigatórios quando a divulgação é feita em nome de pessoa jurídica.",
    });
  }

  return items;
}

export const pendingBlockers = () => getPublishChecklist().filter((i) => i.level === "blocker" && !i.done);

/**
 * Modo de pré-visualização: ativo enquanto houver pendência obrigatória.
 * Nele, a página mostra o aviso ao administrador e marca os campos "a definir".
 */
export const IS_PREVIEW = pendingBlockers().length > 0;
