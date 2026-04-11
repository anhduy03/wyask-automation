import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/commonHelper';
import { KnowledgeVaultPage } from '../../pages/KnowledgeVaultPage';

const { Then } = createBdd(test);

Then('the Knowledge Vault page should be accessible', async ({ knowledgeVaultPage }) => {
  const isVisible = await knowledgeVaultPage.isPageVisible();
  expect(isVisible, 'Knowledge Vault page should be accessible for Pro users').toBe(true);
});
