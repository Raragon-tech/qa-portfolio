import { expect } from '@playwright/test';

export class Statistics {
  constructor(page) {
    this.page = page;
    this.statText = page.getByText(/Network connectivity/i);
  }

  async verifyStatisticsLoaded() {
    await this.page.waitForURL(/network-connectivity/);
    await expect(this.statText).toBeVisible();
  }
}
