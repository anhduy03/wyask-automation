// Pro-plan subscription uses shared step definitions from shared/subscription.step.ts
// This file exists for future pro-plan-specific subscription steps if needed.
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/commonHelper';

const { Given, When, Then } = createBdd(test);
