import { test } from '../../Fixtures/baseHomeTest.mjs';
import { Profile } from '../../Pages/Homepage/ProfileMenuOptions/profile.mjs';
import { Homepage } from '../../Pages/Homepage/homepagePage.mjs';
import { ContactUs } from '../../Pages/Homepage/profileMenuOptions/contactUs.mjs';
import { Statistics } from '../../Pages/Homepage/profileMenuOptions/statistics.mjs';
import { Login } from '../../Pages/Login/login.mjs';


//These tests verify that a user can access each option in the profile dropdown
test.describe('Homepage Profile Menu Navigation', () => {

  test('User can access their profile', async ({ homepage, page }) => {
    await homepage.goToProfile();
    const profilePage = new Profile(page)
    await profilePage.verifyProfileLoaded();
  });


  test('User can access Contact Us page', async ({ homepage, page }) => {
    await homepage.goToContactUs();
    const contactUsPage = new ContactUs(page);
    await contactUsPage.verifyContactUsLoaded();
  });


  test('User can access Statistics page', async ({ homepage, page }) => {
    await homepage.goToStatistics();
    const statisticsPage = new Statistics(page);
    await statisticsPage.verifyStatisticsLoaded();
  });


  test('User can log out', async ({ homepage, page }) => {
    await homepage.goToLogout();
    const logoutPage = new Login(page);
    await logoutPage.verifyLoginLoaded();
    // Re-login to prevent test interference
    const user = JSON.parse(fs.readFileSync('auth/newUser.json'));
    await logoutPage.loginUser(user.username, user.password);

  });
});


