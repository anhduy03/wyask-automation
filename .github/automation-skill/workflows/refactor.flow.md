# refactor.flow.md

Start: Planning (use `planning.md` with refactor scope)

Step-by-step:
- 1. Identify duplication hotspots via grep or code review.
- 2. Create a small plan: one change per PR, list files.
- 3. Write tests (or reuse existing scenario) that cover behavior.
- 4. Extract selectors into POM getters or helpers.
- 5. Run full test suite locally for changed area.
- 6. Push branch; require 3 successful CI runs before merge.

References: refactoring.md, pom-design.md, best-practices.md

End.
