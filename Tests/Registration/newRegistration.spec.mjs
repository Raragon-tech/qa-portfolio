import { test } from '@playwright/test';
import fs from 'fs';
import { createUser } from '../../factories/userCreation.factory.mjs';
import { Register } from '../../Pages/Registration/register.mjs';
import { Mailinator } from '../../Pages/Registration/mailinator.mjs';
import { PasswordCreation } from '../../Pages/Registration/passwordCreation.mjs';
import { Login } from '../../Pages/Login/login.mjs';
import { Homepage } from '../../Pages/Homepage/homepagePage.mjs';


test.describe('New User Registration', () => {
test('User can register successfully', async ({ page }) => {

  // ===== Set up test data and pages =====
  //Set up the main pages used in the registration process (login, registration form, and email inbox)
  const loginPage = new Login(page);
  const registerPage = new Register(page);
  const mailinatorPage = new Mailinator(page);

  //Create a new test user with generated details (username, password, location, etc.)
  const user = createUser();

  //Open the login page 
  await loginPage.gotoLogin();
  await loginPage.verifyLoginLoaded();


  // ===== Complete registration form =====
  //Open the registration page and fill out the sign-up form with the new user's info
  await loginPage.openRegistration();
  await registerPage.verifyRegistrationLoaded();
  await registerPage.fillForm(user);
  console.log(`✅ Creating user: ${user.newUsername}`);
  console.log(`✅ Role: ${user.role} | State: ${user.state} | City: ${user.city}`);
  await registerPage.submitRegistration();
  await registerPage.confirmSignup();

  // ===== Activate account via email =====
  //Open the test email inbox and activate the account using the email link
  await mailinatorPage.openInboxByUsername(user.newUsername);
  await mailinatorPage.openActivationEmail(user.newEmail);

  //Click the activation link and switch to the new browser tab that opens
const activationPage = await mailinatorPage.clickActivationLink();

  // ===== Set password and log in =====
  //Set the password for the new account on the activation page
  const passwordPage = new PasswordCreation(activationPage);
  await Promise.all([
    activationPage.waitForURL(/registration\.company\.org/, { timeout: 60000 }),
    passwordPage.setPassword(user.newPassword),
  ]);

  //Confirm first login works and close the tour pop-up
  const home = new Homepage(activationPage);
  await home.verifyFirstLogin();
  await home.closeTourText();
  const newUser = {
    username: user.newUsername,
    password: user.newPassword,
  };
  // ===== Save user for reuse =====
  //Save the new user's login details so they can be used in other tests later
  fs.writeFileSync('auth/newUser.json', JSON.stringify(newUser));
  console.log(`✅ New User login session stored`);
});
});



