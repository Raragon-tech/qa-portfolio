import { expect } from '@playwright/test';
export class Register {
  constructor(page) {
    this.page = page;
    this.newUsername = page.getByLabel('Username');
    this.newFirstName = page.getByLabel('First Name');
    this.newLastName = page.getByLabel('Last Name');
    this.newPhone = page.getByLabel('Phone');
    this.newEmail = page.locator('input[name="email"]');
    this.stateDropdown = page.locator('#registration-state');
    this.roleDropdown = page.locator('#registration-describeYou');
    this.city = page.getByLabel('City');
    this.termsCheckbox = page.getByLabel(/Terms of Service/i);
    this.submitButton = page.getByRole('button', { name: 'Create User Account' });
    this.confirmationMessage = page.getByText(/Thank you for signing up/i);
  }

  async verifyRegistrationLoaded() {
    await this.page.waitForURL(/registration/);
    await expect(this.termsCheckbox).toBeVisible();
  }

  //Required fields on registration page are populated with unique generated data
  async fillForm(user) {
    const stateOption = this.page.getByRole('option', { name: user.state });
    const roleOption = this.page.locator('option', { name: user.role });
    await expect(this.newUsername).toBeVisible();
    await this.newUsername.fill(user.newUsername);
    await this.newFirstName.fill(user.newFirstName);
    await this.newLastName.fill(user.newLastName);
    await this.newPhone.fill(user.newPhone);
    await this.newEmail.fill(user.newEmail);
    await this.stateDropdown.click();
    await expect(stateOption).toBeVisible();
    await stateOption.click();
    await this.city.fill(user.city);
    await this.roleDropdown.click();
    await expect(roleOption).toBeVisible();
    await roleOption.click();
  }

  async submitRegistration() {
    await this.termsCheckbox.check();
    await this.submitButton.click();
  }

  async confirmSignup() {
    await expect(this.confirmationMessage).toBeVisible();
  }
}