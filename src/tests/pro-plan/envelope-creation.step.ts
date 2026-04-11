import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../fixtures/commonHelper';
import { EnvelopesPage } from '../../pages/EnvelopesPage';
import type { LanguageOption, ToneOption } from '../../pages/EnvelopesPage';

const { Given, When, Then } = createBdd(test);

// Shared envelope steps are in src/tests/shared/envelope.step.ts
// This file is for pro-plan-specific envelope steps only.
