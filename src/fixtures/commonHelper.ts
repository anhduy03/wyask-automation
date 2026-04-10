import { test as base } from "playwright-bdd";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { DocumentUploadPage } from "../pages/DocumentUploadPage";
import { EnvelopesPage } from "../pages/EnvelopesPage";

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  documentUploadPage: DocumentUploadPage;
  envelopesPage: EnvelopesPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  documentUploadPage: async ({ page }, use) => {
    await use(new DocumentUploadPage(page));
  },
  envelopesPage: async ({ page }, use) => {
    await use(new EnvelopesPage(page));
  },
});
