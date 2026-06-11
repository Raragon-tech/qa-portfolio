import { Homepage } from '../Pages/Homepage/homepagePage.mjs';
import { Login } from '../Pages/Login/login.mjs';
import fs from 'fs';

//Navigates to the homepage and verifies it is loaded
export async function openHomepage(page) {
  const home = new Homepage(page);
  await home.goToHomepage();
  await home.verifyHomeLoaded();
  return home;
}

//Logs in a newly created user using the user's stored credentials
export async function firstUserLogin(page) {
  const home = new Homepage(page);
  const user = JSON.parse(fs.readFileSync('auth/newUser.json'));
  const login = new Login(page);
  await login.gotoLogin();
  await login.loginUser(user.username, user.password);
  await home.verifyHomeLoaded();
  return home;
}

//Clears cookies and closes a new tab to prevent session bleed
export async function cleanupTab(tab) {
  await tab.context().clearCookies();
  await tab.close();
}