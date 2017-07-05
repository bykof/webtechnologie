export function INVOICE_EDITOR(invoice_id) {
  if (!invoice_id) {
    return '/invoice-editor/:invoice_id';
  } else {
    return '/invoice-editor/' + invoice_id;
  }
}

export const ROOT = '/';
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const REGISTRATION = '/registration';
export const GROUPS = '/groups';