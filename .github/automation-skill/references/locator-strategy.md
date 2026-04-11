# Locator Strategy

Priority order (strict):
1. data-testid (stable, developer-assigned)
2. role (semantic
3. aria-label
4. text (exact or regex)
5. css (class/id; prefer scoped selectors)
6. xpath (last resort)

Rules:
- Prefer attributes added by devs: data-testid or data-qa.
- Avoid brittle descendant chains (e.g., .a > .b > .c) unless scoped to a stable container.
- Prefer `getByRole` variants when available (Playwright Testing Library / default role).
- Use text matching with exact or regex only for user-visible strings that are stable.
- Never choose xpath as first-choice. Document reason when xpath used.

Examples (Playwright locator preference):
- Prefer: page.getByTestId('submit-button')
- Fallback: page.getByRole('button', { name: 'Submit' })
- Next: page.getByLabel('Email')
- Next: page.locator('text=Confirm')
- Avoid: page.locator('div.container > div:nth-child(3) button')

Locator naming guideline for devs (recommendation to add in PRs):
- data-testid should be kebab-case and describe role: data-testid="document-upload-input"

When to add data-testid:
- When UI element is used in automated flows and text/role are unstable.

End.
