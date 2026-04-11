# Best Practices — short rules and examples

General:
- Keep tests deterministic and independent.
- Use fixtures for repeated setup/teardown.
- Keep CI runs lean: run only impacted tests when possible.

Playwright specifics:
- Use `locator` or `getBy*` helpers, not CSS strings when possible.
- Avoid `waitForTimeout` or `page.waitForTimeout` anywhere.
- Prefer `await locator.waitFor({ state: 'visible' })` or `toBeVisible()` in step assertions.

Assertions:
- Place assertions in step definitions, not in POMs.
- Use explicit expectations, e.g., `await expect(locator).toHaveText('x')`.

Locator reuse:
- Reuse existing POM getters. If missing, propose new ones in plan.

CI flakiness mitigation:
- Use snapshots of failing tests (`trace`, `trace.zip`) and include DOM snapshot for failed locators.
- Mark high-flakiness tests for later stabilization; do not block merges unless regression.

Naming conventions:
- Files: kebab-case for feature and step files. POM classes: PascalCase.

Security and data:
- Use test accounts and never commit secrets. Use env vars and fixtures.

End.
