# create-test.flow.md

Start: Planning (must read `planning.md`)

Step-by-step:
- 1. Plan: complete plan template from `planning.md`.
- 2. Locator Validation: check `src/pages/*` for existing locators.
- 3. Locator Discovery: if missing, propose candidate locators per `locator-discovery.md`.
- 4. Implementation:
  - Add minimal POM methods (no assertions)
  - Add feature (BDD) with one scenario
  - Add step def that calls POM and asserts
- 5. Execution: run tests locally (single scenario)
- 6. Self-healing: if failure due to locator/timing, follow `self-healing.md` rules ≤3 retries
- 7. Refactor: extract duplicated code into POM or helper
- 8. Validation: confirm 3 consecutive runs green before merge

Use references: locator-strategy, pom-design, step-definition, test-generation

Stop conditions:
- If planning shows >3 files impacted, split.
- If no stable locator can be proposed, stop and escalate.

End.
