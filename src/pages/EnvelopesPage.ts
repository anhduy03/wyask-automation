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
    this.unsavedChangesStayButton = page.getByRole("button", { name: /^Stay$/i });

    this.languageDropdown = page.locator('[data-testid="language-dropdown"], [role="listbox"]').first();
    this.toneDropdown = page.locator('[data-testid="tone-dropdown"], [role="listbox"]').last();
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
    await this.dismissUnsavedChangesIfPresent(10000);
  }

  async submitForm() {
    await this.continueButton.scrollIntoViewIfNeeded();
    await this.continueButton.click();
  }

  async selectLanguage(language: LanguageOption = "English") {
    await this.languageButton.click();
    // Wait for dropdown to open, then find the option button by text
    await this.page.waitForTimeout(500);
    const languageOption = this.page.getByRole("button", { name: language, exact: true });
    await languageOption.waitFor({ state: "visible", timeout: 5000 });
    await languageOption.click();
  }

  async selectTone(tone: ToneOption = "Formal") {
    await this.toneButton.scrollIntoViewIfNeeded();
    await this.toneButton.click();
    // Wait for dropdown to open, then find the option button by text
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
}
