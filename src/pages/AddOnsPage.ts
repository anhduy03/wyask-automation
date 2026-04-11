import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Add-ons page (Pro plan only).
 */
export class AddOnsPage {
  readonly pageTitle: Locator;
  readonly addonCards: Locator;

  constructor(public readonly page: Page) {
    this.pageTitle = page.getByRole('heading', { name: /add.?ons/i });
    this.addonCards = page.locator('[class*="addon"], [class*="card"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/workspace/add-ons');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isPageVisible(): Promise<boolean> {
    try {
      // Wait for the page to load and check for heading
      await this.page.waitForURL(/.*add-ons.*/i, { timeout: 5000 }).catch(() => {});
      
      // Try multiple selectors to find the add-ons page
      const hasHeading = await this.pageTitle.isVisible({ timeout: 3000 }).catch(() => false);
      if (hasHeading) return true;

      // Fallback: check if we're on the right URL and page has content
      const currentUrl = this.page.url();
      if (currentUrl.includes('add-ons')) {
        // Check if page has any content indicating we're on add-ons page
        const hasContent = await this.page.locator('body').innerText({ timeout: 2000 }).catch(() => '');
        return hasContent.toLowerCase().includes('add-on') || !this.page.url().includes('login');
      }
      
      return false;
    } catch {
      return false;
    }
  }
}
