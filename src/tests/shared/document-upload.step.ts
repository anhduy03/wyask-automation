import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/commonHelper';
import { DocumentUploadPage } from '../../pages/DocumentUploadPage';

const { When, Then } = createBdd(test);

When('the user clicks on Upload your first document', async ({ homePage }) => {
  await homePage.clickUploadFirstDocument();
});

When('the user clicks the Upload file button', async ({ documentUploadPage }) => {
  await documentUploadPage.clickUploadFile();
});

Then('the user should see the New knowledge envelope heading', async ({ documentUploadPage }) => {
  await expect(documentUploadPage.newKnowledgeEnvelopeHeading).toBeVisible();
});
