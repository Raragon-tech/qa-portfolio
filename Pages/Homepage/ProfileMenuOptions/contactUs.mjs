import { expect } from '@playwright/test';

export class ContactUs {
  constructor(page) {
    this.page = page;
    this.contactText = page.getByText(/If you have questions or concerns/i);
  }

  async verifyContactUsLoaded() {
    await this.page.waitForURL(/contact/);
    await expect(this.contactText).toBeVisible();
  }
}





