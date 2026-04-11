/**
 * StorageState helper for caching authenticated sessions.
 * Saves browser storage state per account role to avoid repeated logins.
 *
 * Usage in playwright.config.ts:
 *   storageState: getStorageStatePath('pro'),
 */

import * as fs from 'fs';
import * as path from 'path';
import type { AccountRole } from './accountHelper';

const STORAGE_DIR = path.resolve(__dirname, '../../.auth');

export function getStorageStatePath(role: AccountRole): string {
  return path.join(STORAGE_DIR, `${role}.json`);
}

export function storageStateExists(role: AccountRole): boolean {
  return fs.existsSync(getStorageStatePath(role));
}

/**
 * Ensure the .auth directory exists.
 */
export function ensureAuthDir(): void {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}
