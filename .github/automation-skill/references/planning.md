# Planning — Automation Agent Skill

Purpose: Mandatory planning checklist before any coding. Keep it brief and actionable.

Steps (must complete in order):
- 1. Scope: one feature / scenario. Minimal change.
- 2. Files impacted: list exact files (POMs, step defs, feature, tests).
- 3. Locators: reuse existing; list candidate locators to validate.
- 4. Risks: enumerate 1–3 measurable risks (locator fragility, timing, auth).
- 5. Acceptance: define pass criteria (3 clean runs, no flaky assertions).

Files impacted — template (example):
- src/pages/NamePage.ts (POM additions only)
- tests/<area>/feature-name.feature (BDD feature)
- tests/<area>/feature-name.step.ts (step definitions)
- fixtures/commonHelper.ts (if reusable helpers needed)

Minimal plan example:
- Scope: Add test for document upload success.
- Files impacted:
  - src/pages/DocumentUploadPage.ts (add upload method)
  - tests/documents/document-upload.feature (add scenario)
  - tests/documents/document-upload.step.ts (bind step)
  - fixtures/commonHelper.ts (reuse upload helper)
- Locators: reuse `data-testid=doc-upload-input`; fallback propose `role=fileinput`.
- Risks: network flakiness, file chooser race, missing data-testid.
- Acceptance: 3 runs on CI (chromium) without flaky failure.

Risks — how to phrase (one-liners):
- Locator missing → regression risk; mitigation: propose fallback and add data-testid.
- Timing (e.g., spinner) → mitigation: use wait-for visible/hidden, not sleep.
- Environment auth → mitigation: use fixture token or test account.

Stop rules for planning phase:
- If plan impacts >3 files, split into smaller tasks.
- If no stable locators can be proposed, escalate to UI owner instead of coding.

End.
