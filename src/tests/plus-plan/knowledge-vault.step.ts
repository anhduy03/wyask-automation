import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/commonHelper';

const { Then } = createBdd(test);

Then('the Knowledge Vault page should NOT be accessible', async ({ knowledgeVaultPage }) => {
  const isVisible = await knowledgeVaultPage.isPageVisible();
  expect(isVisible, 'Knowledge Vault page should NOT be accessible for Plus users').toBe(false);
});
