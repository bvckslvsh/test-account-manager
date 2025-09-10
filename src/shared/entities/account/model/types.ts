export type AccountType = 'Локальная' | 'LDAP';

export interface Account {
  id: string;
  labels: { text: string }[];
  type: AccountType;
  login: string;
  password: string | null;
}
