import { Page, Locator } from "@playwright/test";

export class EnvelopesPage {
  private readonly newEnvelopeButton: Locator;
  private readonly nameField: Locator;
  private readonly uploadFileButton: Locator;
  private readonly languageButton: Locator;
  private readonly toneButton: Locator;
  private readonly continueButton: Locator;
  private readonly fileInput: Locator;

  constructor(public readonly page: Page) {
    this.newEnvelopeButton = page.getByRole('button', { name: /plus|New envelope/i });
    this.nameField = page.getByRole('textbox', { name: /Name/i });
    this.uploadFileButton = page.getByRole('button', { name: /Upload file/i });
    this.languageButton = page.getByRole('button', { name: /Language/i });
    this.toneButton = page.getByRole('button', { name: /Tone/i });
    this.continueButton = page.getByRole('button', { name: /Continue/i });
    this.fileInput = page.locator('input[type="file"]');
  }

  async clickNewEnvelopeButton() {
    await this.newEnvelopeButton.click();
  }

  async leaveNameFieldBlank() {
    // Just ensure the field is empty - no action needed
    await this.nameField.fill('');
  }

  async uploadMockFile(fieldType: 'knowledge' | 'name' = 'knowledge') {
    const fs = require('fs');
    const path = require('path');
    
    // Create a temporary PNG test file
    const tempDir = '/tmp';
    const filePath = path.join(tempDir, `test-file-${Date.now()}.png`);
    
    // Create a minimal valid PNG file (1x1 pixel, white background)
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
      0x00, 0x00, 0x03, 0x00, 0x01, 0x4B, 0xE5, 0x27, 0xDE, 0x00, 0x00, 0x00,
      0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    fs.writeFileSync(filePath, pngBuffer);
    console.log(`Created PNG test file at: ${filePath}`);

    // Find all file inputs on the page
    const fileInputs = await this.page.locator('input[type="file"]').all();
    console.log(`Found ${fileInputs.length} file inputs`);
    
    if (fileInputs.length > 0) {
      try {
        // For knowledge field (first file input), use the first one
        // For name field (second file input), use appropriate index
        const fileInputIndex = fieldType === 'knowledge' ? 0 : 1;
        
        if (fileInputs[fileInputIndex]) {
          await fileInputs[fileInputIndex].setInputFiles(filePath);
          console.log(`File uploaded successfully to ${fieldType} field`);
        } else {
          console.log(`File input at index ${fileInputIndex} not found`);
          throw new Error(`File input for ${fieldType} field not found`);
        }
      } catch (e) {
        console.log(`Error uploading file: ${e}`);
        throw e;
      }
    } else {
      console.log(`No file input found`);
      throw new Error('File input not found on the page');
    }
  }

  async selectRandomLanguage() {
    // Click the language button using force click
    await this.languageButton.click({ force: true, timeout: 5000 });    
    // Get all language options and pick a random one
    const languageOptions = await this.page.locator('[role="option"]').all();
    if (languageOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * languageOptions.length);
      const selectedOption = languageOptions[randomIndex];
      console.log(`Selecting language option at index ${randomIndex}`);
      await selectedOption.click({ force: true });
    }
  }

  async selectRandomTone() {
    // Scroll to ensure tone button is visible and not covered
    await this.toneButton.scrollIntoViewIfNeeded();
    
    // Click the tone button using force click
    await this.toneButton.click({ force: true, timeout: 5000 });

    // Get all tone options and pick a random one
    const toneOptions = await this.page.locator('[role="option"]').all();
    if (toneOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * toneOptions.length);
      const selectedOption = toneOptions[randomIndex];
      console.log(`Selecting tone option at index ${randomIndex}`);
      await selectedOption.click({ force: true });
    }
  }

  async isContinueButtonDisabled(): Promise<boolean> {
    return await this.continueButton.isDisabled();
  }

  async isContinueButtonEnabled(): Promise<boolean> {
    // Wait for any dialog/modal to be open
    const dialog = this.page.locator('[role="dialog"]').first();
    await dialog.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
      // Dialog might not exist, continue anyway
    });
        
    // Check if button exists and is enabled
    return !(await this.continueButton.isDisabled());
  }

  async enterNameInField(name: string) {
    await this.nameField.fill(name);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}
