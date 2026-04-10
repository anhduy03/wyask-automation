import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly brandingLogo: Locator;
  readonly uploadFirstDocumentLink: Locator;

  constructor(public readonly page: Page) {
    // Locate the WYASK image by role
    this.brandingLogo = page.getByRole("img", { name: "WYASK" });
    // Locate the upload document link
    this.uploadFirstDocumentLink = page.getByRole("link", {
      name: "Upload your first document",
    });
  }

  async scrollToBottom() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
  }

  async clickUploadFirstDocument() {
    await this.uploadFirstDocumentLink.click();
  }
}
