import { expect } from '@playwright/test';
export class Help {
  constructor(page) {
    this.page = page;
    this.helpText = page.getByRole('heading', { name: 'How can we help?' });
  }

  async verifyHelpLoaded() {
    await this.page.waitForURL(/help/);
    await expect(this.helpText).toBeVisible();
  }
}

