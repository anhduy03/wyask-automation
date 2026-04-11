import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly loginLink: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(public readonly page: Page) {
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.emailInput = page.getByRole("textbox", { name: "Email address" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Enter your password here",
    });
    this.signInButton = page.getByRole("button", {
      name: "Sign in",
      exact: true,
    });
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async login(email: string, pass: string) {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.signInButton.click();
    await this.signInButton.waitFor({ state: 'hidden', timeout: 30000 });
    await this.page.waitForLoadState('load', { timeout: 30000 });
  }
}
