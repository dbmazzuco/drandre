/** Mensagens rápidas para o administrador durante a pré-visualização. */
export const ADMIN_TOAST_EVENT = "app:admin-toast";

export function showAdminToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(ADMIN_TOAST_EVENT, { detail: message }));
}
