import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/commonHelper';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { getAccount } from '../../helpers/accountHelper';
import type { AccountRole } from '../../helpers/accountHelper';

const { Given, When, Then } = createBdd(test);

/**
 * Shared login step that uses the accountRole fixture to determine credentials.
 * When storageState is configured, the user is already authenticated, so we
 * just navigate to the home page. When running without storageState (first run),
 * we perform a full login.
 */
Given('the user is logged in', async ({ page, loginPage, homePage, accountRole }) => {
  const role: AccountRole = accountRole || 'pro';
  const account = getAccount(role);

  // Check if we're already authenticated (storageState loaded)
  const currentUrl = page.url();
  const hasSessionCookie = await page.context().cookies().then(cookies =>
    cookies.some(c => c.name.includes('session') || c.name.includes('auth') || c.name.includes('token') || c.name.includes('next-auth')),
  ).catch(() => false);

  // If already on a post-login page or has session cookies, skip login
  if (!currentUrl.includes('/login') && hasSessionCookie) {
    await page.goto(process.env.BASE_URL!);
    await homePage.brandingLogo.waitFor({ state: 'visible', timeout: 10000 });
    return;
  }

  // Navigate directly to login page
  await page.goto(`${process.env.BASE_URL}login`);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Perform full login
  await loginPage.login(account.email, account.password);
  await homePage.brandingLogo.waitFor({ state: 'visible', timeout: 15000 });

  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
    test.info().annotations.push({ type: 'INFO', description: 'Network idle after login timed out, continuing...' });
  });
});

/**
 * Login step for a specific plan (used in plan-specific test directories).
 * Example: Given the user is logged in as "pro"
 */
Given('the user is logged in as {string}', async ({ page, loginPage, homePage }, plan: string) => {
  const role = plan as AccountRole;
  const account = getAccount(role);

  // Navigate directly to login page
  await page.goto(`${process.env.BASE_URL}login`);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await loginPage.login(account.email, account.password);
  await homePage.brandingLogo.waitFor({ state: 'visible', timeout: 15000 });

  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
    test.info().annotations.push({ type: 'INFO', description: 'Network idle after login timed out, continuing...' });
  });
});

Given('the user is on the home page', async ({ homePage }) => {
  await homePage.brandingLogo.waitFor({ state: 'visible', timeout: 10000 });
});

When('the user navigates to {string}', async ({ page }, path: string) => {
  // Construct full URL, handling trailing slashes properly
  const baseUrl = process.env.BASE_URL?.replace(/\/+$/, '') || '';
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = path.startsWith('http') ? path : `${baseUrl}${fullPath}`;
  
  await page.goto(fullUrl);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  
  // Check if we were redirected to login (session might be expired)
  if (page.url().includes('/login')) {
    throw new Error(`Session expired: redirected to login when navigating to ${path}`);
  }
});

When('the user scrolls to the bottom of the page', async ({ homePage }) => {
  await homePage.scrollToBottom();
});

Then('the user should see {string} branding', async ({ homePage }, brandName: string) => {
  await expect(homePage.brandingLogo).toBeVisible();
});
