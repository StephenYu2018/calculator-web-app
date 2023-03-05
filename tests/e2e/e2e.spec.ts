import { test } from '@playwright/test';

import { CalculatorPage } from './calculator-page.ts';

test('Enter a decimal number', async ({ page }) => {
  const app = new CalculatorPage(page);
  await app.render();

  await app.clickEntryButtonsShouldDisplay('2.07');
});

test('Support basic math operations', async ({ page }) => {
  const app = new CalculatorPage(page);
  await app.render();

  await app.clickEntryButtonsShouldDisplay('3+6');
  await app.clickCalculateButtonShouldOutput('9');

  await app.clickEntryButtonsShouldDisplay('-4.85');
  await app.clickCalculateButtonShouldOutput('4.15');

  await app.clickEntryButtonsShouldDisplay('*2');
  await app.clickCalculateButtonShouldOutput('8.3');

  await app.clickEntryButtonsShouldDisplay('/0.2');
  await app.clickCalculateButtonShouldOutput('41.5');
});