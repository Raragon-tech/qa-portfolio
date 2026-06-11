import { expect } from '@playwright/test';


export class Community {
  constructor(page) {
    this.page = page;
    this.communityText = page.getByText(/My Communities/i);
  }

  async verifyCommunityLoaded() {
    await this.page.waitForURL(/community/);
    await expect(this.communityText).toBeVisible();
  }
}
