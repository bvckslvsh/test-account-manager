export function validateLogin(value: string): boolean {
  return !!value && value.length <= 100;
}

export function validatePassword(value: string | null, type: string): boolean {
  if (type === 'LDAP') return true;
  return !!value && value.length <= 100;
}

export function validateLabels(value: string): boolean {
  return value.length <= 50;
}
