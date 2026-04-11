/**
 * Account configuration helper for multi-plan testing.
 * Reads credentials from environment variables based on role.
 *
 * Usage:
 *   const account = getAccount('pro');
 *   const account = getAccount('plus');
 *
 * Environment variables:
 *   PRO_EMAIL, PRO_PASSWORD
 *   PLUS_EMAIL, PLUS_PASSWORD
 */

export type AccountRole = 'pro' | 'plus';

export interface Account {
  email: string;
  password: string;
  plan: 'pro' | 'plus';
}

const ACCOUNT_CONFIGS: Record<AccountRole, Account> = {
  pro: {
    email: process.env.PRO_EMAIL || '',
    password: process.env.PRO_PASSWORD || '',
    plan: 'pro',
  },
  plus: {
    email: process.env.PLUS_EMAIL || '',
    password: process.env.PLUS_PASSWORD || '',
    plan: 'plus',
  },
};

export function getAccount(role: AccountRole): Account {
  const account = ACCOUNT_CONFIGS[role];
  if (!account.email || !account.password) {
    throw new Error(
      `Missing credentials for "${role}" account. ` +
        `Set ${role.toUpperCase()}_EMAIL and ${role.toUpperCase()}_PASSWORD in your .env file.`,
    );
  }
  return account;
}

/**
 * Returns all available account roles for parameterized testing.
 */
export function getAllAccountRoles(): AccountRole[] {
  return Object.keys(ACCOUNT_CONFIGS) as AccountRole[];
}
