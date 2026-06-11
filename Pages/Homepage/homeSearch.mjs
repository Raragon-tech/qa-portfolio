import { expect } from '@playwright/test';
export class HomeSearch {
  constructor(page) {
    this.page = page;
    this.userSearchText = page.getByText(/User Information/i);
    this.groupSearchText = page.getByText(/Group Information/i);
    this.viewAllSearchText = page.getByText(/All User Results/i);
  }

  async verifyUserLoaded() {
    await this.page.waitForURL(/user/);
    await expect(this.userSearchText).toBeVisible();
  }

  async verifyGroupLoaded() {
    await this.page.waitForURL(/group/);
    await expect(this.groupSearchText).toBeVisible();
  }

  async verifyViewAllLoaded() {
    await this.page.waitForURL(/users/);
    await expect(this.viewAllSearchText).toBeVisible();
  }
}


