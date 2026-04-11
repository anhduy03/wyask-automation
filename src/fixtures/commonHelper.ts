import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { DocumentUploadPage } from '../pages/DocumentUploadPage';
import { EnvelopesPage } from '../pages/EnvelopesPage';
import { KnowledgeVaultPage } from '../pages/KnowledgeVaultPage';
import { AddOnsPage } from '../pages/AddOnsPage';
import { SubscriptionSettingsPage } from '../pages/SubscriptionSettingsPage';
import type { AccountRole } from '../helpers/accountHelper';

type CommonFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  documentUploadPage: DocumentUploadPage;
  envelopesPage: EnvelopesPage;
  knowledgeVaultPage: KnowledgeVaultPage;
  addOnsPage: AddOnsPage;
  subscriptionSettingsPage: SubscriptionSettingsPage;
  accountRole: AccountRole;
};

export const test = base.extend<CommonFixtures>({
  accountRole: ['pro', { option: true }],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  documentUploadPage: async ({ page }, use) => {
    await use(new DocumentUploadPage(page));
  },

  envelopesPage: async ({ page }, use) => {
    await use(new EnvelopesPage(page));
  },

  knowledgeVaultPage: async ({ page }, use) => {
    await use(new KnowledgeVaultPage(page));
  },

  addOnsPage: async ({ page }, use) => {
    await use(new AddOnsPage(page));
  },

  subscriptionSettingsPage: async ({ page }, use) => {
    await use(new SubscriptionSettingsPage(page));
  },
});

export { expect } from '@playwright/test';
