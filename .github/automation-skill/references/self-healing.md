# Self-healing — locator recovery and retry rules

Objective: When tests fail, detect root cause and apply minimal safe fixes automatically or propose them.

Phases on failure (ordered):
- 1. Classify failure: locator not found / timeout / assertion mismatch / other
- 2. If locator not found → run locator fallback strategy (below)
- 3. If timing → remove hard waits; replace with `waitFor` patterns
- 4. If assertion mismatch → validate data and adjust expected value or fix setup
- 5. Retry the test (max 3 attempts)

Locator fallback strategy (short):
- Primary: data-testid
- Fallback 1: role + name
- Fallback 2: aria-label
- Fallback 3: text (exact/regex)
- Fallback 4: scoped CSS anchored to nearest stable container
- Fallback 5: xpath (generate with clear anchor and small scope)

Locator regeneration rules:
- When replacing a locator, create 2 selectors: primary and fallback.
- Validate both on a local DOM snapshot (see DOM snapshot idea below).
- Add a short comment in POM explaining why fallback exists and its risk level.

DOM snapshot idea (minimal):
- Save HTML snippet of the element's outerHTML and nearest stable container (200–500 chars).
- Store snapshot in test-results/<test>/locators/<timestamp>.json for debugging.

Safe update logic (automated):
- If test fails with locator-not-found AND an alternate selector passes validation on snapshot, then:
  1. Update the POM locator in a branch.
  2. Add a brief changelog comment and link to snapshot.
  3. Re-run the failing scenario up to 2 more times. If passes, create PR candidate, else revert and escalate.

Retry policy:
- Retry ≤3 times total per failure: immediate automatic retries for timing+locator regeneration; escalate after.

When not to auto-fix:
- If fallback uses xpath or long positional selectors (risk high) — propose fix but do not auto-merge.

End.
