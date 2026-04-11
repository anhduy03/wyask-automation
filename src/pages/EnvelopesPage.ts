import { Page, Locator, expect } from "@playwright/test";
import { createTempUploadFile } from "../fixtures/uploadTestFile";

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

  constructor(public readonly page: Page) {
    this.newEnvelopeButton = page.getByRole("button", {
      name: /plus|New envelope/i,
    });
    this.nameField = page.getByRole("textbox", { name: /Name/i });
    this.knowledgeFileInput = page.locator('input[type="file"]').first();
    this.languageButton = page.getByRole("button", { name: /Language/i });
    this.toneButton = page.getByRole("button", { name: /Tone/i });
    this.continueButton = page.getByRole("button", { name: /Continue/i });
    this.brandYourEnvelopeHeading = page.getByRole("heading", {
      name: /Brand your envelope/i,
    });
    this.brandSkipLink = page.getByRole("link", { name: /^Skip$/i });
    this.notificationsRegion = page.getByRole("region", {
      name: /Notifications/i,
    });
    this.notificationMessages = this.notificationsRegion.getByRole("listitem");
    this.unsavedChangesLeaveButton = page.getByRole("button", { name: /^Leave$/i });
  }

  async dismissUnsavedChangesIfPresent(timeoutMs: number = 10000) {
    const shown = await this.unsavedChangesLeaveButton
      .waitFor({ state: "visible", timeout: timeoutMs })
      .then(() => true)
      .catch(() => false);
    if (shown) {
      await this.unsavedChangesLeaveButton.click();
    }
  }

  async goto() {
    await this.page.goto("/workspace/envelopes");
    await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(
      () => {
        // Best-effort wait only (some environments keep long polling open).
      },
    );
    if (this.page.url().includes("/login")) {
      throw new Error(`User session lost: redirected to login (${this.page.url()})`);
    }
  }

  async openNewEnvelopeForm() {
    await this.newEnvelopeButton.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.newEnvelopeButton).toBeEnabled({ timeout: 30000 });
    await this.newEnvelopeButton.click();
    await this.nameField.waitFor({ state: "visible", timeout: 10000 });
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
    // Some flows show an app-level "Unsaved Changes" confirm when navigating.
    await this.dismissUnsavedChangesIfPresent(10000);
  }

  async submitWithEnterKey() {
    // Using Enter key simulates form submission without depending on button text.
    await this.continueButton.focus();
    await this.page.keyboard.press("Enter");

    const notificationShown = await this.notificationMessages
      .first()
      .waitFor({ state: "visible", timeout: 2000 })
      .then(() => true)
      .catch(() => false);
    if (!notificationShown) {
      await this.clickContinue();
    }

    // Some flows show an app-level "Unsaved Changes" confirm when navigating.
    await this.dismissUnsavedChangesIfPresent(5000);
  }

  async selectRandomLanguage() {
    await this.languageButton.click({ timeout: 5000, force: true });
    const wrapper = this.languageButton.locator("..");
    const buttons = wrapper.locator("button");
    await buttons.nth(1).waitFor({ state: "visible", timeout: 5000 });
    const buttonCount = await buttons.count();
    if (buttonCount < 2) throw new Error("No language options found");
    const optionIndex = 1 + Math.floor(Math.random() * (buttonCount - 1));
    await buttons.nth(optionIndex).click({ force: true });
  }

  async selectRandomTone() {
    await this.toneButton.scrollIntoViewIfNeeded();
    await this.toneButton.click({ timeout: 5000, force: true });
    const wrapper = this.toneButton.locator("..");
    const buttons = wrapper.locator("button");
    await buttons.nth(1).waitFor({ state: "visible", timeout: 5000 });
    const buttonCount = await buttons.count();
    if (buttonCount < 2) throw new Error("No tone options found");
    const optionIndex = 1 + Math.floor(Math.random() * (buttonCount - 1));
    await buttons.nth(optionIndex).click({ force: true });
  }

  async isContinueButtonDisabled(): Promise<boolean> {
    return await this.continueButton.isDisabled();
  }

  async isContinueButtonEnabled(): Promise<boolean> {
    return await this.continueButton.isEnabled();
  }
}
