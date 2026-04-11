import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Knowledge Vault page (Pro plan only).
 */
export class KnowledgeVaultPage {
  readonly pageTitle: Locator;
  readonly uploadDocumentButton: Locator;

  constructor(public readonly page: Page) {
    this.pageTitle = page.getByRole('heading', { name: /knowledge vault/i });
    this.uploadDocumentButton = page.getByRole('button', { name: /upload/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/workspace/knowledge-vault');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isPageVisible(): Promise<boolean> {
    return this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
  }
}
