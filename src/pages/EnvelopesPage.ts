import { Page, Locator } from "@playwright/test";
import { createTempUploadFile } from "../fixtures/uploadTestFile";

export type LanguageOption = "English" | "French" | "German" | "Spanish";
export type ToneOption = "Formal" | "Informal" | "Friendly" | "Professional";

export class EnvelopesPage {
  readonly newEnvelopeButton: Locator;
  readonly nameField: Locator;
  readonly knowledgeFileInput: Locator;
  readonly languageButton: Locator;
  readonly toneButton: Locator;
  readonly continueButton: Locator;
  readonly brandYourEnvelopeHeading: Locator;
  readonly brandSkipLink: Locator;
  readonly notificationsRegion: Locator;
  readonly notificationMessages: Locator;
  readonly unsavedChangesLeaveButton: Locator;
  readonly unsavedChangesStayButton: Locator;
  readonly languageDropdown: Locator;
  readonly toneDropdown: Locator;

  constructor(public readonly page: Page) {
    this.newEnvelopeButton = page.getByRole("button", { name: /New envelope/i });
    this.nameField = page.getByRole("textbox", { name: /Name/i });
    this.knowledgeFileInput = page.locator('input[type="file"]').first();
    this.languageButton = page.getByRole("button", { name: /Language/i });
    this.toneButton = page.getByRole("button", { name: /Tone/i });
    this.continueButton = page.getByRole("button", { name: /Continue/i });
    this.brandYourEnvelopeHeading = page.getByRole("heading", { name: /Brand your envelope/i });
    this.brandSkipLink = page.getByRole("link", { name: /^Skip$/i });
    this.notificationsRegion = page.getByRole("region", { name: /Notifications/i });
    this.notificationMessages = this.notificationsRegion.getByRole("listitem");
    this.unsavedChangesLeaveButton = page.getByRole("button", { name: /^Leave$/i });
    this.unsavedChangesStayButton = page.getByRole("button", { name: /^Stay$/i });
    this.languageDropdown = page.locator('[data-testid="language-dropdown"], [role="listbox"]').first();
    this.toneDropdown = page.locator('[data-testid="tone-dropdown"], [role="listbox"]').last();
  }

  async goto() {
    await this.page.goto("/workspace/envelopes");
    await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => {});

    // Dismiss any blocking dialogs that appear on page load
    await this.dismissBlockingDialogs();

    // Check if we were redirected to login
    if (this.page.url().includes("/login")) {
      throw new Error(`User session lost: redirected to login (${this.page.url()})`);
    }

    // Additional wait for page content to stabilize
    await this.page.waitForTimeout(1000);
  }

  async openNewEnvelopeForm() {
    // Dismiss any dialogs that might be present on page load
    await this.dismissBlockingDialogs();

    // Try clicking the New envelope button first
    await this.newEnvelopeButton.waitFor({ state: "visible", timeout: 15000 });
    await this.newEnvelopeButton.click();
    
    // After clicking, a storage limit dialog might appear. Wait and check.
    await this.page.waitForTimeout(2000);
    await this.dismissBlockingDialogs();
    
    // If dialog wasn't dismissed or form didn't open, navigate directly
    const formVisible = await this.nameField.isVisible({ timeout: 3000 }).catch(() => false);
    if (!formVisible) {
      await this.page.goto('/workspace/envelopes/new');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
      await this.dismissBlockingDialogs();
    }
    
    // Final wait for the form
    await this.nameField.waitFor({ state: "visible", timeout: 10000 });
  }

  private async dismissBlockingDialogs(): Promise<void> {
    // Try pressing Escape to dismiss any open modals/dialogs
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
    
    // Check for storage limit dialog
    const storageDialog = this.page.locator('text=/Storage Limit/i');
    const hasStorageDialog = await storageDialog.count().then(c => c > 0).catch(() => false);
    
    if (hasStorageDialog) {
      // The storage limit dialog's Cancel button redirects to home.
      // Navigate to envelopes list page to clear the dialog state.
      await this.page.goto('/workspace/envelopes');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
    }
    
    // Check for unsaved changes dialog
    const unsavedDialog = this.page.locator('text=/Unsaved Changes/i');
    if (await unsavedDialog.count().then(c => c > 0).catch(() => false)) {
      const leaveBtn = this.page.getByRole('button', { name: 'Leave' });
      if (await leaveBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await leaveBtn.click();
        await this.page.waitForTimeout(500);
      }
    }
  }

  async leaveNameFieldBlank() {
    await this.nameField.fill("");
  }

  async enterName(name: string) {
    await this.nameField.fill(name);
  }

  async uploadKnowledgeFile(mockFileName: string) {
    const filePath = await createTempUploadFile(mockFileName);
    await this.knowledgeFileInput.waitFor({ state: "attached", timeout: 10000 });
    await this.knowledgeFileInput.setInputFiles(filePath);
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.dismissUnsavedChangesIfPresent(10000);
  }

  async submitForm() {
    await this.continueButton.scrollIntoViewIfNeeded();
    await this.continueButton.click();
  }

  async selectLanguage(language: LanguageOption = "English") {
    // Flexible selector: try multiple patterns for the language button
    const langBtn = this.page.getByRole("button", { name: /Language|language|lang/i }).first();
    await langBtn.waitFor({ state: "visible", timeout: 10000 });
    await langBtn.scrollIntoViewIfNeeded();
    await langBtn.click();
    await this.page.waitForTimeout(500);
    const languageOption = this.page.getByRole("button", { name: language, exact: true });
    await languageOption.waitFor({ state: "visible", timeout: 5000 });
    await languageOption.click();
  }

  async selectTone(tone: ToneOption = "Formal") {
    const toneBtn = this.page.getByRole("button", { name: /Tone|tone/i }).first();
    await toneBtn.waitFor({ state: "visible", timeout: 10000 });
    await toneBtn.scrollIntoViewIfNeeded();
    await toneBtn.click();
    await this.page.waitForTimeout(500);
    const toneOption = this.page.getByRole("button", { name: tone, exact: true });
    await toneOption.waitFor({ state: "visible", timeout: 5000 });
    await toneOption.click();
  }

  async isContinueButtonDisabled(): Promise<boolean> {
    return await this.continueButton.isDisabled();
  }

  async isContinueButtonEnabled(): Promise<boolean> {
    return await this.continueButton.isEnabled();
  }

  private async dismissUnsavedChangesIfPresent(timeout: number = 5000): Promise<void> {
    try {
      const leaveBtn = this.page.getByRole("button", { name: /^Leave$/i });
      if (await leaveBtn.isVisible({ timeout }).catch(() => false)) {
        await leaveBtn.click();
        await this.page.waitForTimeout(500);
      }
    } catch {
      // Dialog not present, continue
    }
  }
}
