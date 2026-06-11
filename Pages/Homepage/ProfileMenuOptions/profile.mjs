import { expect } from '@playwright/test';
import { getRandomStateAndCity } from '../../../Factories/userCreation.factory.mjs';
import { getRandomPhoneNumber } from '../../../Factories/userCreation.factory.mjs';
import { createUser } from '../../../Factories/userCreation.factory.mjs';

export class Profile {
  constructor(page) {
    this.page = page;
    this.profileText = page.getByText(/Profile Details/i);
    this.profileEmail = page.locator('#user-editAccountInfo-email');
    this.profileAltEmail = page.locator('#user-editAccountInfo-alt_email');
    this.profileCity = page.locator('#user-editAccountInfo-city');
    this.profileState = page.locator('#user-editAccountInfo-state');
    this.profilePhone = page.locator('#user-editAccountInfo-phone');
    this.profileRole = page.getByRole('combobox', { name: 'user-editAccountInfo-primaryJob' });
    this.profileFirstName = page.locator('#user-editProfile-firstName');
    this.profileLastName = page.locator('#user-editProfile-lastName');
    this.usernameText = page.locator('h6:has-text("Username")').locator('xpath=following::div[1]');
    this.saveButton = page.getByRole('button', { name: 'Save Changes' });
    this.saveToast = page.getByText(/Success/i);
    this.closeSaveToast = page.locator('div.close-toastr[role="button"]');
    this.siteCard = page.locator('.MuiCard-root').filter({ has: page.getByText('View') }).first();
    this.programCred = page.locator('.MuiCard-root').filter({ has: page.locator('svg[data-testid^="program-"]') });
    this.usernameButton = page.getByRole('button', { name: 'Change Username' });
    this.newUsernameField = page.getByRole('dialog', { name: 'Update Username' }).locator('input[type="text"]');
    this.newUsernameSubmit = page.getByRole('button', { name: 'Submit' });
    this.newPassword = page.locator('#user-changePassword-pass1');
    this.confirmPassword = page.locator('#user-changePassword-pass2');
  }


  //If "Successfully Saved" popup is present, it is closed to prevent blockage of tests
  async closeSaveToast() {
    const toast = this.saveToast.first();
    const closeBtn = toast.getByRole('button');
    try {
      await toast.waitFor({ state: 'visible', timeout: 3000 });
      await closeBtn.click();
      await toast.waitFor({ state: 'hidden', timeout: 5000 });
    }
    catch (e) {
      console.log('Save toast not found or already dismissed');
    }
  }

  async verifyProfileLoaded() {
    await this.page.waitForURL(/profile/);
    await expect(this.profileText).toBeVisible();
  }

  async updateEmail() {
    const usernameCurrent = await this.usernameText.textContent() || '';
    const cleanUsername = usernameCurrent.trim();
    const email = `${cleanUsername}.update@mailinator.com`;
    await expect(this.profileEmail).toBeVisible();
    await this.profileEmail.fill(email);
  }

  async updateCityState() {
    const { city, state } = getRandomStateAndCity();
    await this.profileCity.waitFor();
    await this.profileCity.fill(city);
    await this.profileState.waitFor();
    await this.profileState.click();
    await this.page.getByRole('option', { name: state }).click();
  }

  async updatePhone() {
    const phoneNumber = getRandomPhoneNumber();
    await this.profilePhone.waitFor();
    await this.profilePhone.fill(phoneNumber);
  }

  async updateName() {
    const { newFirstName, newLastName } = createUser();
    await expect(this.profileFirstName).toBeVisible();
    await this.profileFirstName.fill(newFirstName);
    await expect(this.profileLastName).toBeVisible();
    await this.profileLastName.fill(newLastName);
  }

  async changeUsernameBox() {
    const { newUsername } = createUser();
    console.log(`✅ Username Generated: ${newUsername}`);
    await this.usernameButton.click();
    await expect(this.newUsernameField).toBeVisible();
    await this.newUsernameField.fill(newUsername)
  }

  async revertUsername() {
    await this.usernameButton.click();
    await expect(this.newUsernameField).toBeVisible();
  }

  async updatePassword() {
    const password = generatePassword();
    await expect(this.newPassword).toBeVisible();
    await this.newPassword.fill(password);
    await expect(this.confirmPassword).toBeVisible();
    await this.confirmPassword.fill(password);
  }

}




