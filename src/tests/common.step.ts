import { createBdd } from "playwright-bdd";
import { test } from "../fixtures/commonHelper";
import { expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

const { Given } = createBdd(test);

Given("the user is logged in to the application", async ({ loginPage, homePage, page }: { loginPage: LoginPage; homePage: HomePage; page: Page }) => {
  const email = process.env.LOGIN_EMAIL;
  const password = process.env.LOGIN_PASSWORD;
  
  if (!email || !password) {
    throw new Error("Missing required environment variables: LOGIN_EMAIL and LOGIN_PASSWORD must be set");
  }
  
  await loginPage.login(email, password);
  await homePage.brandingLogo.waitFor({ state: 'visible', timeout: 10000 });
  
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
    test.info().annotations.push({ type: 'WARNING', description: 'Network idle timeout after login, continuing...' });
  });
});

Given("the user is on the home page", async ({ page, homePage }: { page: Page; homePage: HomePage }) => {
  // After login, the page might still show /login URL due to app architecture
  // Instead, verify we can see home page elements
  await homePage.brandingLogo.waitFor({ state: 'visible', timeout: 10000 });
});
