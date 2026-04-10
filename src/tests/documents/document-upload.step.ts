import { createBdd } from "playwright-bdd";
import { test } from "../../fixtures/commonHelper";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

When("the user clicks on {string} link", async ({ homePage }, linkName) => {
  if (linkName === "Upload your first document") {
    await homePage.clickUploadFirstDocument();
  }
});

When(
  "the user clicks on {string} button",
  async ({ documentUploadPage }, buttonName) => {
    if (buttonName === "Upload file") {
      await documentUploadPage.clickUploadFile();
    }
  },
);

Then(
  "the user should see the {string} heading",
  async ({ documentUploadPage }, headingName) => {
    if (headingName === "New knowledge envelope") {
      await expect(
        documentUploadPage.newKnowledgeEnvelopeHeading,
      ).toBeVisible();
    }
  },
);
