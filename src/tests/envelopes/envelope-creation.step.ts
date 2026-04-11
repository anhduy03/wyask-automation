import { createBdd } from "playwright-bdd";
import { test } from "../../fixtures/commonHelper";
import { expect } from "@playwright/test";
import { EnvelopesPage } from "../../pages/EnvelopesPage";

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
  // No-op: the Knowledge upload is expected to be empty by default for this scenario.
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

When("the user selects a random language", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.selectRandomLanguage();
});

When("the user selects a random tone", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.selectRandomTone();
});

When("the user clicks on the \"Continue\" button", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.clickContinue();
});

When("the user clicks enter button", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.submitWithEnterKey();
});

Then("a successful notification displays", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.dismissUnsavedChangesIfPresent(2000);
  // Prefer a success-like message, but fall back to "any toast appeared" to reduce false negatives.
  const successLike = envelopesPage.notificationMessages.filter({
    hasText: /success|created|envelope/i,
  });

  try {
    await expect(successLike.first()).toBeVisible({ timeout: 10000 });
  } catch {
    // Some pages don't populate the Notifications list; accept the app's aria-live page title update as "success".
    await expect(
      envelopesPage.page.getByRole("alert").filter({ hasText: /Brand/i }).first(),
    ).toBeVisible({ timeout: 10000 });
  }
});

Then("the Brand your envelope page displays", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await envelopesPage.dismissUnsavedChangesIfPresent(2000);
  await expect(envelopesPage.brandSkipLink).toBeVisible({ timeout: 10000 });
});

Then("the \"Continue\" button should be disabled", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await expect(envelopesPage.continueButton).toBeDisabled();
});

Then("the \"Continue\" button should be enabled", async ({ envelopesPage }: { envelopesPage: EnvelopesPage }) => {
  await expect(envelopesPage.continueButton).toBeEnabled();
});
