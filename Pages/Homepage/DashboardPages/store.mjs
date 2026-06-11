import { expect } from '@playwright/test';
export class Store {
  constructor(page) {
    this.page = page;
    this.storeBanner = page.getByText(/Make a purchase/i);
  }

  async verifyStoreLoaded() {
    await this.page.waitForURL(/webstore/);
    await expect(this.storeBanner).toBeVisible();
  }
}





