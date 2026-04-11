---
title: Automation Agent Skill — Playwright + TypeScript + BDD + POM
version: 1.0.0
summary: Compact skill for building, fixing, and healing Playwright BDD tests in a POM project.
---

Execution model (strict order):
- 1 Planning
- 2 Locator Validation
- 3 Locator Discovery (if needed)
- 4 Implementation
- 5 Execution
- 6 Self-healing
- 7 Refactor
- 8 Validation

Principles (short):
- Plan before code. Minimal changes per run.
- Prefer stable locators: data-testid > role > aria-label > text > css > xpath.
- No hard waits. No assertions inside POMs. Reuse first, avoid duplication.

Quick checklist for an agent run:
- Read `planning.md` → confirm files impacted and risks.
- Validate locators against existing POMs.
- If missing, run `locator-discovery.md` rules and propose locators.
- Implement only after acceptance; create small focused PR.
- Run tests; on failure apply self-healing (≤3 retries).
- Refactor incremental duplication.
- Stop only after 3 consecutive clean runs.

Artifacts produced:
- Updated/created Page Objects under `src/pages/` (if needed)
- New step definitions under `tests/...` (BDD glue)
- Small test generator snippets (from `test-generation.md`)

How to use this skill (one-liner):
- Follow `workflows/create-test.flow.md` to add tests, `fix-test.flow.md` to repair failures, `refactor.flow.md` to clean.

Constraints enforced by skill:
- No use of global `waitForTimeout` or hard sleeps.
- Page Objects contain no assertions.
- Locator fallback rule baked into self-healing.

Contact / governance:
- Commit small, named changes: feat/skill/<short>
- Raise risk flags in PR body when a locator fallback promotes xpath or fragile css.

End.