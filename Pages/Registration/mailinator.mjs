import { expect } from '@playwright/test';
export class Mailinator {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search');
    this.goButton = page.getByRole('button', { name: 'GO' });
    this.iframe = page.frameLocator('iframe[name="html_msg_body"]');
  }

  async openInboxByUsername(username) {
    await this.page.goto(process.env.EMAIL_URL);
    await this.searchInput.fill(username);
    await this.goButton.click();
    await expect(this.page.locator('table')).toBeVisible();


  }
  // Waits for activation email to appear and opens it
  async openActivationEmail(email) {
    const emailRow = this.page
      .getByText(email)
      .filter({ hasText: /Activate/i })
      .first();
    await expect(emailRow).toBeVisible({ timeout: 20000 });
    await emailRow.click();
  }

  // Clicks activation link and returns the new tab
  async clickActivationLink() {
    const activationLink = this.iframe.locator('#Activate-account');
    const [popup] = await Promise.all([
      this.page.waitForEvent('page'),
      activationLink.click(),
    ]);

    await popup.waitForLoadState();
    return popup;
  }
}