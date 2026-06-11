import { expect } from '@playwright/test';
export class Notifications {
  constructor(page) {
    this.page = page;
    this.notificationText = page.getByRole('heading', { name: 'My Notifications' });
  }

  async verifyLoaded() {
    await this.page.waitForURL(/notifications/);
    await expect(this.notificationText).toBeVisible();
  }
}



