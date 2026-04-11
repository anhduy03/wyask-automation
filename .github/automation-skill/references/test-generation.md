# Test Generation — minimal generator rules

Purpose: Provide compact templates and rules to generate BDD scenarios and step bindings.

Rules:
- Generate one scenario per behavior change.
- Keep scenarios short: 3–6 steps.
- Reuse existing steps; avoid duplicate textual steps.
- Generated step definitions must call POM methods; no assertions in POM.

Scenario template (Example):
- Feature: Document management
  Scenario: Upload a valid document
    Given I am on the document upload page
    When I upload a file named "sample.pdf"
    Then I see the upload success message

Step generation rules (mapping):
- Given I am on <page> → call POM::navigate()
- When I upload a file named "X" → call POM::uploadFile(filePath)
- Then I see <message> → use assert in step: await expect(page.locator...).toBeVisible()

Implementation notes:
- Steps implement assertions; POMs only return locators or perform actions.
- Use fixtures/commonHelper.ts for shared helpers (upload, auth, waitForReady).

Generator example (pseudo-snippet):
- Create feature file with minimal scenario
- Create step file with stubs wired to existing POMs

End.
