import { expect } from '@playwright/test';

export class Classes {
  constructor(page) {
    this.page = page;
    this.classesText = page.getByRole('button', { name: 'View Classes' });
  }

  async verifyClassesLoaded() {
    await this.page.waitForURL(/classes/);
    await expect(this.classesText).toBeVisible();

  }
}
