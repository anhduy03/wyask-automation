# Locator Discovery — rules and quick probes

Goal: Propose minimal, stable locators when none exist or when validation fails.

Discovery steps (ordered):
- 1. Inspect existing POMs and features for reuse (always reuse first).
- 2. Query DOM attributes: data-testid, data-qa, id, role, aria-label.
- 3. If none, choose semantic role or visible label text.
- 4. If still none, propose a scoped CSS anchored to a stable container.
- 5. Only use xpath when no attribute or semantic anchor exists.

Probe examples (manual snippets for reviewers):
- data-testid: // look for [data-testid="..."]
- role: find element with role="button" and name text
- aria-label: find aria-label="Upload file"
- text: text=Upload or /Upload/i

Proposal template (always include):
- Selector (preferred syntax)
- Why chosen (1 line)
- Risk level: low/medium/high
- Recovery (self-healing) rule: alternate selector + regeneration hint

Example proposal:
- Selector: page.getByTestId('doc-upload-input')
- Why: dev-provided attribute attached to input used across app
- Risk: low
- Recovery: fallback to page.getByRole('textbox', { name: /document/i })

Discovery anti-patterns:
- Using positional selectors (nth-child) without anchor.
- Selecting by visible CSS color, font-size, or layout classes that change often.

End.
