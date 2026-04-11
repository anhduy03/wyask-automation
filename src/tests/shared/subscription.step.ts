import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/commonHelper';
import { SubscriptionSettingsPage } from '../../pages/SubscriptionSettingsPage';

const { Given, Then } = createBdd(test);

Given('the user is on the subscription settings page', async ({ subscriptionSettingsPage }) => {
  await subscriptionSettingsPage.goto();
  await test.info().page?.waitForTimeout(3000);
});

Then('the {string} button should be visible', async ({ page }, buttonName: string) => {
  const button = page.getByRole('button', { name: new RegExp(buttonName, 'i') });
  await expect(button).toBeVisible({ timeout: 10000 });
});

Then('the {string} button should not be visible', async ({ page }, buttonName: string) => {
  const button = page.getByRole('button', { name: new RegExp(buttonName, 'i') });
  await expect(button).not.toBeVisible({ timeout: 5000 });
});

Then('the user should see the current plan indicator', async ({ subscriptionSettingsPage }) => {
  await expect(subscriptionSettingsPage.currentPlanButton).toBeVisible();
});
