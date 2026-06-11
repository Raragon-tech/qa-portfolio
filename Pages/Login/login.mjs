import { expect } from '@playwright/test';

export class Login {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel(/username/i);
    this.nextButton = page.getByRole('button', { name: /Next/i });
    this.passwordInput = page.getByLabel(/password/i);
    this.signInButton = page.getByRole('button', { name: /Sign in/i });
    this.createUserAccountLink = page.getByRole('link', { name: 'Create User Account' });
    this.alert = page.getByRole('alert');

  }

  async gotoLogin() {
    await this.page.goto(process.env.QA_URL);
  }

  async loginUser(username, password) {
    await this.usernameInput.fill(username);
    await this.nextButton.click();
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  //Verify if an error appears when credentials are entered, if not, move forward
async checkForLoginError() {
  try {
    await this.alert.first().waitFor({ state: 'attached', timeout: 5000 });
    const isVisible = await this.alert.first().isVisible();
    if (isVisible) {
      throw new Error('❌ Login failed: The username or password entered is incorrect or your password may have expired.');
    }
  } catch (err) {
    if (!err.message.includes('Timeout')) {
      throw err;
    }
  }
}

  //Wait for the invalid credentials error to display
  async verifyInvalidLoginError() {
   await expect(this.alert.first()).toBeVisible();
  }

  async verifyLoginLoaded() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.nextButton).toBeVisible();
  }

  async openRegistration() {
    await this.createUserAccountLink.click();
  }
}