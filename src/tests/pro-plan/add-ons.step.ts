import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/commonHelper';
import { AddOnsPage } from '../../pages/AddOnsPage';

const { Then } = createBdd(test);

Then('the Add-ons page should be accessible', async ({ addOnsPage }) => {
  const isVisible = await addOnsPage.isPageVisible();
  expect(isVisible, 'Add-ons page should be accessible for Pro users').toBe(true);
});
