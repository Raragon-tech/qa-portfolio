export class PasswordCreation {
  constructor(page) {
    this.page = page;
    this.newPassword = page.locator('#loginForm\\.newPassword');
    this.verifyPassword = page.locator('#loginForm\\.verifyPassword');
    this.submitButton = page.getByRole('button', { name: 'Create My Account' });
  }



  async fillPassword(password) {
    await expect(this.newPassword).toBeVisible();
    await this.newPassword.fill(password);
    await expect(this.verifyPassword).toBeVisible();
    await this.verifyPassword.fill(password);
  }

  async submitPassword() {
    await this.submitButton.click();
  }

  async verifySuccess() {
    await expect(this.page.getByText(/Success!/i)).toBeVisible();
  }
}