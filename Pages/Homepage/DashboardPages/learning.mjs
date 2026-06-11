import { expect } from '@playwright/test';
export class Learning {
  constructor(page) {
    this.page = page;
    this.learningText = page.getByRole('link', { name: 'Learning Catalog' });
  }

  async verifyLearningLoaded() {
    await this.page.waitForURL(/catalog/)
    await expect(this.learningText).toBeVisible();
  }
}
