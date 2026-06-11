import { expect } from '@playwright/test';
export class Announcements {
  constructor(page) {
    this.page = page;

    this.announcementText = page.getByRole('heading', { name: 'Announcements' });
    this.returnText = page.getByText(/Return Home/i);
  }

  async verifyLoaded() {
    await this.page.waitForURL(/announcements/i);
    await expect(this.announcementText).toBeVisible();

  }
}
