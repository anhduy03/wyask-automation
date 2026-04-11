import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, test as bddTest } from 'playwright-bdd';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { LoginPage } from './src/pages/LoginPage';
import { HomePage } from './src/pages/HomePage';
import { getAccount, type AccountRole } from './src/helpers/accountHelper';
import { ensureAuthDir, getStorageStatePath, storageStateExists } from './src/helpers/storageStateHelper';

dotenv.config();
ensureAuthDir();

/**
 * Playwright configuration for multi-plan BDD testing.
 *
 * Test execution strategy:
 * - `setup` projects: log in and save storageState per role (runs once)
 * - `pro` project: runs tests tagged @pro and @shared using PRO account
 * - `plus` project: runs tests tagged @plus and @shared using PLUS account
 *
 * CLI usage:
 *   npx playwright test --project=pro        # Pro plan tests only
 *   npx playwright test --project=plus       # Plus plan tests only
 *   npx playwright test                       # Both plans (includes setup)
 *   npx playwright test --grep "@pro"        # Only @pro tagged tests
 *   npx playwright test --grep "@plus"       # Only @plus tagged tests
 *   npx playwright test --grep "@shared"     # Only @shared tagged tests
 */

// Setup projects to generate storageState for each role
const setupProjects = ['pro', 'plus'].map((role) => ({
  name: `setup:${role}`,
  testDir: './src/setup',
  testMatch: /.*\.setup\.ts/,
  grep: /.*/,
  fullyParallel: false,
  use: {
    ...devices['Desktop Chrome'],
    accountRole: role as AccountRole,
  },
}));

export default defineConfig({
  timeout: 60_000,
  testDir: './.bdd-gen',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    viewport: { width: 1440, height: 900 },
  },

  projects: [
    ...setupProjects,
    {
      name: 'pro',
      use: {
        ...devices['Desktop Chrome'],
        accountRole: 'pro',
        storageState: getStorageStatePath('pro'),
      },
      grep: /@pro|@shared/,
      grepInvert: /@plus/,
      // Only depend on setup if storage state doesn't exist
      dependencies: storageStateExists('pro') ? [] : ['setup:pro'],
    },
    {
      name: 'plus',
      use: {
        ...devices['Desktop Chrome'],
        accountRole: 'plus',
        storageState: getStorageStatePath('plus'),
      },
      grep: /@plus|@shared/,
      grepInvert: /@pro/,
      // Only depend on setup if storage state doesn't exist
      dependencies: storageStateExists('plus') ? [] : ['setup:plus'],
    },
  ],
});

defineBddConfig({
  features: './src/tests/**/*.feature',
  steps: [
    './src/tests/shared/*.ts',
    './src/tests/pro-plan/*.ts',
    './src/tests/plus-plan/*.ts',
    './src/fixtures/commonHelper.ts',
  ],
  outputDir: './.bdd-gen',
});
