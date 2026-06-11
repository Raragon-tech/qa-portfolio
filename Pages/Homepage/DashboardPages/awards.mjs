import { expect } from '@playwright/test';

export class Awards {
  constructor(page) {
    this.page = page;
    this.awardsText = page.getByText(/My Awards/i);
  }

  async verifyAwardsLoaded() {
    await this.page.waitForURL(/awards/);
    await expect(this.awardsText).toBeVisible();
  }
}