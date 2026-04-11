# fix-test.flow.md

Start: Planning (open `planning.md` and note failing test and files impacted)

Step-by-step:
- 1. Reproduce: run failing scenario locally with `–trace` or browser headed.
- 2. Classify failure: locator / timing / assertion / infra.
- 3. Locator Validation: compare failing selector against `src/pages/*`.
- 4. If locator missing or broken → run `self-healing.md` fallback strategy.
- 5. If timing → replace sleeps with explicit waits (waitFor, toBeVisible)
- 6. If assertion mismatch → verify test data and update expected value or test setup
- 7. Implement minimal code change (POM locator or step assertion)
- 8. Run retries ≤3. If passes, push branch with changelog + snapshot attachments.
- 9. Refactor small duplications introduced during fix.

Escalation rules:
- If auto-fix requires xpath or long positional selector, do NOT auto-merge; create PR and ping UI owner.

Use references: self-healing, locator-discovery, refactoring

End.
