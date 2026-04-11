import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Subscription/Settings page.
 * Different behavior per plan:
 *   - Pro: shows "Switch plan" button
 *   - Plus: shows "Upgrade to Pro" button
 */
export class SubscriptionSettingsPage {
  readonly pageTitle: Locator;
  readonly currentPlanButton: Locator;
  readonly switchPlanButton: Locator;
  readonly upgradeToProButton: Locator;
  readonly teamPlanButton: Locator;

  constructor(public readonly page: Page) {
    this.pageTitle = page.getByRole('heading', { name: /subscription|plan/i });
    this.currentPlanButton = page.getByRole('button', { name: 'Your Current Plan' });
    this.switchPlanButton = page.getByRole('button', { name: 'Switch plan' });
    this.upgradeToProButton = page.getByRole('button', { name: 'Upgrade to Pro' });
    this.teamPlanButton = page.getByRole('button', { name: /contact.*team plan|start team plan/i });
  }

  async goto(): Promise<void> {
    // Navigate to home first, then click Settings from nav
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    
    // Click Settings link from navigation
    const settingsLink = this.page.getByRole('link', { name: 'Settings' });
    if (await settingsLink.isVisible({ timeout: 10000 }).catch(() => false)) {
      await settingsLink.click();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
    }
  }

  async isSwitchPlanButtonVisible(): Promise<boolean> {
    return this.switchPlanButton.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isUpgradeToProButtonVisible(): Promise<boolean> {
    return this.upgradeToProButton.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isCurrentPlanButtonVisible(): Promise<boolean> {
    return this.currentPlanButton.isVisible({ timeout: 5000 }).catch(() => false);
  }
}
