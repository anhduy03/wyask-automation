import { Page, Locator } from "@playwright/test";

export class DocumentUploadPage {
  readonly uploadFileButton: Locator;
  readonly newKnowledgeEnvelopeHeading: Locator;

  constructor(public readonly page: Page) {
    // Locate the upload file button
    this.uploadFileButton = page.getByRole("button", { name: "Upload file" });
    // Locate the new knowledge envelope heading
    this.newKnowledgeEnvelopeHeading = page.getByRole("heading", {
      name: "New knowledge envelope",
    });
  }

  async clickUploadFile() {
    await this.uploadFileButton.click();
  }

  async isNewKnowledgeEnvelopeVisible() {
    return await this.newKnowledgeEnvelopeHeading.isVisible();
  }
}
