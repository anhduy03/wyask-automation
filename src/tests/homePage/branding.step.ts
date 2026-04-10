import { createBdd } from "playwright-bdd";
import { test } from "../../fixtures/commonHelper";
import { expect } from "@playwright/test";

const { When, Then } = createBdd(test);

When("the user scroll down to the bottom of the page", async ({ homePage }) => {
  await homePage.scrollToBottom();
  await homePage.brandingLogo.waitFor({ state: "visible" });
});

Then("the user will see the {string} image", async ({ homePage }) => {
  // Verify visibility of the branding logo
  await expect(homePage.brandingLogo).toBeVisible();
});
