import { createBdd } from "playwright-bdd";
import { test } from "../fixtures/commonHelper";
import { expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

const { Given } = createBdd(test);

// Background step using credentials from .env
Given("the user is logged in to the application", async ({ loginPage }: { loginPage: LoginPage }) => {
  const email = process.env.LOGIN_EMAIL!;
  const password = process.env.LOGIN_PASSWORD!;
  await loginPage.login(email, password);
});

Given("the user is on the home page", async ({ page, homePage }: { page: Page; homePage: HomePage }) => {
  // After login, the page might still show /login URL due to app architecture
  // Instead, verify we can see home page elements
  await homePage.brandingLogo.waitFor({ state: 'visible', timeout: 10000 });
});
