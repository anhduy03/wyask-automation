# POM Design — concise rules and examples

Goal: Keep Page Objects thin, reusable and assertion-free.

Rules:
- POMs expose actions and locators only. No expect/assert inside POM.
- Methods return either:
  - void (action performed)
  - Locator (Playwright Locator) when caller must assert
  - primitive (string/boolean) for small reads
- Prefer small methods: navigate(), clickSubmit(), enterEmail(), uploadFile(path)
- Use dependency injection for Page (pass page fixture) not global page.

Structure example (TypeScript sketch, not code here):
- class DocumentUploadPage {
  constructor(page) { this.page = page }
  uploadFile(path) { await this.page.getByTestId('...').setInputFiles(path) }
  getSuccessMessage() { return this.page.locator('text=Uploaded') }
}

Locator exposure rule:
- Expose locator getters only when tests must assert visibility or read text.

Avoid:
- hard waits, network mocking inside POMs, or page-level assertions.

Small example of usage in step:
- const page = new DocumentUploadPage(pageFixture)
- await page.uploadFile('sample.pdf')
- await expect(page.getSuccessMessage()).toBeVisible()

End.
