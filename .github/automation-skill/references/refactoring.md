# Refactoring — small iterative rules

Goal: Remove duplication, improve readability, preserve behavior.

Rules:
- Make one refactor per PR; keep scope small.
- Replace duplicated locator strings with POM getters.
- Consolidate repeated waits into a single helper in `fixtures/commonHelper.ts`.
- Prefer `const` and small helpers; avoid large API changes.

Refactor steps (safe):
- 1. Run tests to capture baseline failures.
- 2. Change code minimal: extract duplicate selector to POM.
- 3. Run unit/test suite locally.
- 4. Push branch + CI runs; require 3 successful runs before merge.

Examples (do):
- Many tests use `page.getByTestId('submit')` → add `getSubmit()` to FormPage and replace usages.

Examples (don’t):
- Large rewrites of test architecture in the same PR as a feature change.

Code hygiene checklist:
- Remove unused imports.
- Keep methods <60 lines.
- Add short JSDoc on non-trivial helpers.

End.
