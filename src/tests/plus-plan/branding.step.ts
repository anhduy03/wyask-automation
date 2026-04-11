// Plus-plan branding uses shared step definitions from shared/common.step.ts
// This file exists for future plus-plan-specific branding steps if needed.
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/commonHelper';

const { Given, When, Then } = createBdd(test);

// All branding steps are defined in shared/common.step.ts
