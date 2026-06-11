import { test as setup } from '@playwright/test';
import { Login } from '../../Pages/Login/login.mjs';
import { Homepage } from '../../Pages/Homepage/homepagePage.mjs';


/*Setup script: Logs in using an existing user's account (from the .env file)
and saves the login session for reuse in auth-based tests.
This is NOT a test — it prepares an authenticated user session.
This script does NOT store or update usernames/passwords — it only reads them.
*/

// ===== Set up data and pages =====
/* Username and password are pulled from the .env file
This script only reads the credentials, it does not store or modify them*/
setup('Authenticate existing user', async ({ page, context }) => {
  const username = process.env.USER_EXISTING;
  const password = process.env.PASSWORD;

  //Error handling if the .env file is incorrect or missing
  if (!username || !password) {
    throw new Error('Missing USER_EXISTING or PASSWORD in .env');
  }

  //Set up the main pages used in the login process (login and homepage)
  const loginPage = new login(page);
  const homePage = new homepage(page);

  // ===== Login =====
  //Open the login page, enter the user's credentials and log in
  await loginPage.gotoLogin();
  await loginPage.loginUser(username, password);
  await loginPage.loginErrorCheck();
  await homePage.verifyHomeLoaded();
  console.log('✅ Existing user logged in successfully');

  // ===== Save user for reuse =====
  //Save the logged-in session so future auth-based tests execute as logged in 
  await context.storageState({
    path: 'auth/existing-user.json',
  });
  console.log(`✅ Existing User login session stored for future tests`);
});

