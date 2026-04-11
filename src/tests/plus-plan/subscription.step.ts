// Plus-plan subscription uses shared step definitions from shared/subscription.step.ts
// This file exists for future plus-plan-specific subscription steps if needed.
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/commonHelper';

const { Given, When, Then } = createBdd(test);
