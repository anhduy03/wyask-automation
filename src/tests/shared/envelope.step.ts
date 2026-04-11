import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/commonHelper';
import { EnvelopesPage } from '../../pages/EnvelopesPage';
import type { LanguageOption, ToneOption } from '../../pages/EnvelopesPage';

const { Given, When, Then } = createBdd(test);

Given('the user is on the envelopes page', async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.goto();
});

When('the user clicks on the {string} button', async ({ envelopesPage }, buttonName: string) => {
  if (buttonName.includes('New envelope')) {
    await envelopesPage.openNewEnvelopeForm();
  } else {
    throw new Error(`Unsupported button: "${buttonName}". Add a specific step definition.`);
  }
});

When('the user leaves the {string} field blank', async ({ envelopesPage }, fieldName: string) => {
  if (fieldName.toLowerCase() === 'name') {
    await envelopesPage.leaveNameFieldBlank();
  }
});

When('the user uploads a mock file to the Knowledge field', async ({ envelopesPage }) => {
  await envelopesPage.uploadKnowledgeFile('mock_file_1.png');
});

When('the user enters {string} in the {string} field', async ({ envelopesPage }, value: string, fieldName: string) => {
  if (fieldName.toLowerCase() === 'name') {
    await envelopesPage.enterName(value);
  } else {
    throw new Error(`Unsupported field: "${fieldName}"`);
  }
});

When('the user enters a name in the {string} field', async ({ envelopesPage }, fieldName: string) => {
  if (fieldName.toLowerCase() === 'name') {
    await envelopesPage.enterName(`${fieldName} ${Date.now()}`);
  } else {
    throw new Error(`Unsupported field: "${fieldName}"`);
  }
});

When('the user uploads {string} to the Knowledge field', async ({ envelopesPage }, fileName: string) => {
  await envelopesPage.uploadKnowledgeFile(fileName);
});

When('the user selects {string} from the Language dropdown', async ({ envelopesPage }, language: string) => {
  await envelopesPage.selectLanguage(language as LanguageOption);
});

When('the user selects {string} from the Tone dropdown', async ({ envelopesPage }, tone: string) => {
  await envelopesPage.selectTone(tone as ToneOption);
});

When('the user submits the envelope form', async ({ envelopesPage }) => {
  await envelopesPage.submitForm();
});

Then('the Continue button should be disabled', async ({ envelopesPage }) => {
  await expect(envelopesPage.continueButton).toBeDisabled();
});

Then('the Continue button should be enabled', async ({ envelopesPage }) => {
  await expect(envelopesPage.continueButton).toBeEnabled();
});

Then('a successful notification should display', async ({ envelopesPage }) => {
  const notification = envelopesPage.notificationMessages.filter({
    hasText: /envelope created successfully/i,
  });
  await expect(notification.first()).toBeVisible({ timeout: 15000 });
});

Then('the {string} page should display', async ({ envelopesPage }, pageName: string) => {
  if (pageName.toLowerCase().includes('brand')) {
    await expect(envelopesPage.brandYourEnvelopeHeading).toBeVisible({ timeout: 10000 });
  } else {
    throw new Error(`Unsupported page check: "${pageName}"`);
  }
});

Then('the Language dropdown should be visible', async ({ envelopesPage }) => {
  await expect(envelopesPage.languageButton).toBeVisible();
});

Then('the Tone dropdown should be visible', async ({ envelopesPage }) => {
  await expect(envelopesPage.toneButton).toBeVisible();
});

Then('the user should see the envelopes list', async ({ page }) => {
  await expect(page).toHaveURL(/\/workspace\/envelopes/, { timeout: 10000 });
});
