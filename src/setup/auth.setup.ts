import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { getAccount, type AccountRole } from '../helpers/accountHelper';
import { ensureAuthDir, getStorageStatePath } from '../helpers/storageStateHelper';

type SetupFixtures = {
  accountRole: AccountRole;
};

const test = base.extend<SetupFixtures>({
  accountRole: ['pro', { option: true }],
});

test.describe.configure({ mode: 'serial' });

test('authenticate and save storage state', async ({ page, accountRole }) => {
  ensureAuthDir();
  const account = getAccount(accountRole);

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // Navigate directly to login page
  await page.goto(`${process.env.BASE_URL}login`);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Dismiss any dialogs that might block interaction
  try {
    const leaveBtn = page.getByRole('button', { name: 'Leave' });
    if (await leaveBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await leaveBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  try {
    const okBtn = page.getByRole('button', { name: 'OK' });
    if (await okBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await okBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  // Fill credentials using exact selectors from LoginPage
  const emailInput = page.getByRole('textbox', { name: 'Email address' });
  const passwordInput = page.getByRole('textbox', { name: 'Enter your password here' });
  const signInButton = page.getByRole('button', { name: 'Sign in', exact: true });

  await emailInput.fill(account.email);
  await passwordInput.fill(account.password);
  await signInButton.click();

  // Wait for login to complete - the sign in button should disappear
  await signInButton.waitFor({ state: 'hidden', timeout: 30000 });
  await page.waitForLoadState('load', { timeout: 30000 });
  await page.waitForTimeout(3000);

  // Verify we're logged in by checking branding is visible
  await homePage.brandingLogo.waitFor({ state: 'visible', timeout: 15000 });

  // Save storageState for this role
  const storagePath = getStorageStatePath(accountRole);
  await page.context().storageState({ path: storagePath });
  console.log(`✅ Storage state saved for ${accountRole} at ${storagePath}`);
});
