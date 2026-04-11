import { createBdd } from "playwright-bdd";
import { test } from "../../fixtures/commonHelper";
import { expect } from "@playwright/test";
import { EnvelopesPage } from "../../pages/EnvelopesPage";
import type { LanguageOption, ToneOption } from "../../pages/EnvelopesPage";

const { Given, When, Then } = createBdd(test);

Given("the user is on the envelopes page", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.goto();
});

When("the user clicks on the \"plus New envelope\" button", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.openNewEnvelopeForm();
});

When("the user leaves the \"Name\" field blank", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.leaveNameFieldBlank();
});

When("the user leaves the \"Knowledge\" field blank", async () => {
  // Intentionally empty - the Knowledge upload is expected to be empty by default for this scenario.
});

When("the user uploads a mock file to the Knowledge field", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.uploadKnowledgeFile("mock_file_1.png");
});

When(
  "the user uploads {string} to the Knowledge field",
  async ({ envelopesPage }: { envelopesPage: EnvelopesPage }, fileName: string) => {
    await envelopesPage.uploadKnowledgeFile(fileName);
  },
);

When(
  "the user enters {string} in the {string} field",
  async ({ envelopesPage }: { envelopesPage: EnvelopesPage }, value: string, fieldName: string) => {
    if (fieldName.trim().toLowerCase() !== "name") {
      throw new Error(`Unsupported field: "${fieldName}"`);
    }
    await envelopesPage.enterName(value);
  },
);

When(
  "the user enters a name in the {string} field",
  async ({ envelopesPage }: { envelopesPage: EnvelopesPage }, fieldName: string) => {
    const testName = `${fieldName} ${Date.now()}`;
    if (fieldName.trim().toLowerCase() !== "name") {
      throw new Error(`Unsupported field: "${fieldName}"`);
    }
    await envelopesPage.enterName(testName);
  },
);

When(
  "the user selects {string} from the {string} dropdown",
  async ({ envelopesPage }: { envelopesPage: EnvelopesPage }, value: string, dropdownName: string) => {
    const dropdown = dropdownName.trim().toLowerCase();
    if (dropdown === "language") {
      await envelopesPage.selectLanguage(value as LanguageOption);
    } else if (dropdown === "tone") {
      await envelopesPage.selectTone(value as ToneOption);
    } else {
      throw new Error(`Unsupported dropdown: "${dropdownName}"`);
    }
  },
);

When("the user submits the form", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.submitForm();
});

Then("a successful notification displays", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  // Wait for success toast - the app shows "Envelope created successfully"
  const successNotification = envelopesPage.notificationMessages.filter({
    hasText: /envelope created successfully/i,
  });
  await expect(successNotification.first()).toBeVisible({ timeout: 15000 });
});

Then("the Brand your envelope page displays", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  // Wait for the Brand your envelope heading to be visible
  await expect(envelopesPage.brandYourEnvelopeHeading).toBeVisible({ timeout: 10000 });
});

Then("the \"Continue\" button should be disabled", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await expect(envelopesPage.continueButton).toBeDisabled();
});

Then("the \"Continue\" button should be enabled", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await expect(envelopesPage.continueButton).toBeEnabled();
});
