import { expect } from '@playwright/test';
export class Homepage {
  constructor(page) {
    this.page = page;
    this.welcomeText = page.getByText(/Welcome!/i);
    this.announcementText = page.getByText(/Announcements/i);
    this.notificationIcon = page.getByTestId('InboxIcon');
    this.classesIcon = page.getByText(/Classes/i);
    this.learningIcon = page.getByText(/Learning/i);
    this.storeIcon = page.getByText(/Store/i);
    this.communityIcon = page.getByText(/Community/i);
    this.awardsIcon = page.getByText(/Awards/i);
    this.helpIcon = page.getByRole('link', { name: 'Help' });
    this.homeSearch = page.getByRole('combobox', { name: 'Search for Sites and Users' });
    this.profileIcon = page.locator('button[aria-haspopup="true"]');
    this.joinGroupLink = page.getByTestId('joinGroup');
  }

  async verifyFirstLogin() {
    await expect(this.welcomeText).toBeVisible();
    await this.closeTourText();
  }

  //If tour text is present on the homepage, it is closed to prevent blockage of tests
  async closeTourText() {
    try {
      const tour = this.page.getByText("Let's get started!");
      await tour.waitFor({ state: 'visible', timeout: 3000 });
      const closeBtns = this.page.locator('[data-test-id="button-close"]');
      await closeBtns.first().click();
      await expect(tour).toBeHidden();
    } catch (e) {
      console.log("Tour is not present or already skipped");
    }
  }


  async verifyHomeLoaded() {
    await expect(this.welcomeText).toBeVisible({ timeout: 10000 });
    await expect(this.homeSearch).toBeVisible();
    await expect(this.profileIcon).toBeVisible();
  }

  async goToHomepage() {
    await this.page.goto(process.env.QA_URL);
  }


  async goToAnnouncements() {
    await this.announcementText.click();
  }

  async goToNotifications() {
    await this.notificationIcon.click();
  }

  async goToClasses() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('page'),
      this.classesIcon.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async goToLearning() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('page'),
      this.learningIcon.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async goToStore() {
    await this.storeIcon.click();
  }

  async goToCommunity() {
    await this.communityIcon.click();
  }

  async goToAwards() {
    await this.awardsIcon.click();
  }

  async goToHelp() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('page'),
      this.helpIcon.click(),
    ]);

    await newPage.waitForURL(/FAQ/);
    return newPage;
  }

  async searchForUser(name) {
    await this.homeSearch.fill(name);
    const userOption = this.page.getByRole('option', { name: new RegExp(name, 'i') }).first();
    await expect(userOption).toBeVisible();
    await userOption.click();
  }

  async searchForSite(location) {
    await this.homeSearch.fill(location);
    const groupOption = this.page.getByRole('option', { name: new RegExp(location, 'i') }).first();
    await expect(groupOption).toBeVisible();
    await groupOption.click();
  }

  async searchAndViewAllUsers(name) {
    await this.homeSearch.fill(name);
    const viewAll = this.page.getByText('View All Users', { exact: true });
    await expect(viewAll).toBeVisible();
    await viewAll.click();
  }

  async goToProfile() {
    const profileOption = this.page.getByRole('menuitem', { name: 'User Profile' });
    await this.profileIcon.hover();
    await expect(profileOption).toBeVisible();
    await profileOption.click();
  }

  async goToContactUs() {
    const contactUsOption = this.page.getByRole('menuitem', { name: /Contact Us/i });
    await this.profileIcon.hover();
    await expect(contactUsOption).toBeVisible();
    await contactUsOption.click();
  }

  async goToStatistics() {
    const stastisticsOption = this.page.getByRole('menuitem', { name: /Statistics Insights/i });
    await this.profileIcon.hover();
    await expect(stastisticsOption).toBeVisible();
    await stastisticsOption.click();
  }

  async goToLogout() {
    const logoutOption = this.page.getByRole('menuitem', { name: /Logout/i });
    await this.profileIcon.hover();
    await expect(logoutOption).toBeVisible();
    await logoutOption.click();
  }

  async goToNewUserGroupJoin() {
    await expect(this.joinGroupLink).toBeVisible();
    await this.joinGroupLink.click();
  }
}













