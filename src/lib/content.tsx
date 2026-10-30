import type { ReactNode } from "react";
import { IS_PREVIEW } from "@/config/checklist";
import { filled } from "@/config/rules";
import { Pending } from "@/components/Pending";

/**
 * Exibe o valor configurado. Se estiver vazio: na pré-visualização mostra o
 * marcador "a definir"; fora dela, usa o `fallback` (ou nada).
 */
export function valueOr(
  value: string | null | undefined,
  pendingLabel: string,
  { fallback = null, onDark = false }: { fallback?: ReactNode; onDark?: boolean } = {},
): ReactNode {
  if (filled(value)) return value;
  return IS_PREVIEW ? <Pending label={pendingLabel} onDark={onDark} /> : fallback;
}
