// Plus-plan envelope creation uses shared step definitions from shared/envelope.step.ts
// This file exists for future plus-plan-specific envelope steps if needed.
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/commonHelper';

const { Given, When, Then } = createBdd(test);
