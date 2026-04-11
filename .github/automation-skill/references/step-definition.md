# Step Definition — concise rules and examples

Rules:
- Steps bind Gherkin to POM methods or helpers.
- Steps may assert results (use Playwright `expect`).
- Avoid business logic inside steps; delegate to helpers/POMs.
- Reuse existing step text exactly; add new step only when necessary.

Binding pattern (short):
- Given/When → actions (navigate, fill, click)
- Then → assertions using `expect`

Example bindings (pseudo):
- Given I am on the login page → await loginPage.navigate()
- When I login with "user"/"pass" → await loginPage.login(user, pass)
- Then I see the dashboard → await expect(dashboardPage.header()).toBeVisible()

Best practices:
- Keep steps idempotent and independent where possible.
- Reuse fixtures for auth and test data.
- Keep step files small; group by feature area.

Duplication policy:
- If a textual step exists, reference it instead of creating new synonyms.

End.
