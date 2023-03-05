import { Page, Locator, expect } from '@playwright/test';

export class CalculatorPage {
  private readonly page: Page;
  private readonly calculatorDisplay: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.calculatorDisplay = page.getByTestId('display');
  }

  public async render() {
    await this.page.goto('http://localhost:5173');
    await expect(this.calculatorDisplay).toHaveText('');
  }

  public async clickEntryButtonsShouldDisplay(entries: string) {
    for (const entry of entries) {
      await this.clickEntryButtonShouldAppendEntryToDisplay(entry);
    }
  }

  private async clickEntryButtonShouldAppendEntryToDisplay(entry: string) {
    const currentDisplay = await this.calculatorDisplay.textContent();
    await this.page.getByRole('button', { name: entry }).click({ force: true });
    await expect(this.calculatorDisplay).toHaveText(currentDisplay + entry);
  }

  public async clickCalculateButtonShouldOutput(output: string) {
    await this.page.getByRole('button', { name: '=' }).click({ force: true });
    await expect(this.calculatorDisplay).toHaveText(output);
  }
}