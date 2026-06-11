import { test } from '@playwright/test';
import { Login } from '../../Pages/Login/login.mjs';

// These tests verify that a user receives an error upon login when credentials are invalid.
test.describe('Invalid Login Scenarios', () => {

  // End-to-end test: Attempts log in with an invalid username and valid password.
  test('User cannot login with an invalid username', async ({ page }) => {
    // This is a hardcoded username for testing (not stored or reused anywhere)
    const username = 'invalidusername';
    // Valid password is read from the .env file (this test does not modify .env)
    const password = process.env.PASSWORD;
    const login = new Login(page);
    await login.gotoLogin();
    await login.loginUser(username, password);
    // Verify that the login error message is displayed 
    // Note: The same error is expected for both invalid username and password
    await login.verifyInvalidLoginError();
  });

  // End-to-end test: Attempts log in with an invalid password and valid username. 
  test('User cannot login with an invalid password', async ({ page }) => {
    // Valid username is read from the .env file (this test does not modify .env)
    const username = process.env.USER_EXISTING;
    // This is a hardcoded password for testing (not stored or reused anywhere)
    const password = 'invalidpassword';
    const login = new Login(page);
    await login.gotoLogin();
    await login.loginUser(username, password);
    // Verify that the login error message is displayed
    // Note: The same error is expected for both invalid username and password
    await login.verifyInvalidLoginError();
  });
});

