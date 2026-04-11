import { createBdd } from "playwright-bdd";
import { test } from "../../fixtures/commonHelper";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

When("the user clicks on {string} link", async ({ homePage }, linkName) => {
  throw new Error(`Unsupported link: "${linkName}". Please add a specific step definition for this link.`);
});

When("the user clicks on the Upload your first document link", async ({ homePage }) => {
  await homePage.clickUploadFirstDocument();
});

When(
  "the user clicks on {string} button",
  async ({ documentUploadPage }, buttonName) => {
    throw new Error(`Unsupported button: "${buttonName}". Please add a specific step definition for this button.`);
  },
);

When("the user clicks on the Upload file button", async ({ documentUploadPage }) => {
  await documentUploadPage.clickUploadFile();
});

Then(
  "the user should see the {string} heading",
  async ({ documentUploadPage }, headingName) => {
    throw new Error(`Unsupported heading: "${headingName}". Please add a specific step definition for this heading.`);
  },
);

Then("the user should see the New knowledge envelope heading", async ({ documentUploadPage }) => {
  await expect(documentUploadPage.newKnowledgeEnvelopeHeading).toBeVisible();
});
