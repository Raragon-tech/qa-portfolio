import { test } from '../../Fixtures/baseHomeTest.mjs';
import { expect } from '@playwright/test';
import { Profile } from '../../Pages/Homepage/profileMenuOptions/profile.mjs';
import { createUser } from '../../Factories/userCreation.factory.mjs';
import { generatePassword } from '../../Helpers/updatePassword.mjs';




// These tests verify that a user can view and update their personal details, username, password, along with visible account data.

test.describe('User Profile Updates', () => {

  // End-to-end test: Navigates to the user's profile, 
  // updates the Email, City, State, Phone#, First name, and Last name. Saves changes*/
  test('User can update their profile information', async ({ homepage, page }) => {
    const profilePage = new Profile(page);
    await homepage.goToProfile();
    await profilePage.verifyProfileLoaded();
    await profilePage.updateEmail();
    await profilePage.updateCityState();
    await profilePage.updatePhone();
    await profilePage.updateName();
    await profilePage.saveChanges();
    //If the save message is open, close it to prevent it from blocking other actions
    await profilePage.closeSaveToast();
  });

  /* ===== Username Management =====  
  End-to-end test: Navigates to the user's profile, 
  updates the username. Saves new username, then reverts username back to original*/
  test('User can update their username', async ({ homepage, page }) => {
    const profilePage = new Profile(page);
    //The original username is stored
    const originalUsername = process.env.USER_EXISTING;
    //A new unique username is generated
    const { newUsername } = createUser();
    await homepage.goToProfile();
    await profilePage.verifyProfileLoaded();
    await profilePage.changeUsernameBox();
    //Update and save the new username
    await profilePage.newUsernameField.fill(newUsername);
    await profilePage.newUsernameSubmit.click();
    //If the save message is open, close it to prevent it from blocking other actions
    await profilePage.closeSaveToast();
    //Verify the new username is displayed (fails if it did not update)
    await expect(page.getByText(newUsername), `Username did not update to "${newUsername}"`).toBeVisible();
    //Revert and save original username
    await profilePage.revertUsername();
    await profilePage.newUsernameField.fill(originalUsername);
    await profilePage.newUsernameSubmit.click();
    //Verify the original username is displayed (fails if it did not revert)
    await profilePage.closeSaveToast();
    await expect(
      page.getByText(originalUsername, { exact: true }), `Username did not revert to "${originalUsername}"`).toBeVisible();
    console.log(`✅ Username reverted: ${originalUsername}`);
  });

  /*                    ===== Profile Visibility Checks (Groups & Qualifications) =====
  End-to-end test: Navigates to the user's profile and checks that group and qualifications cards are visible*/
  test('Groups are displayed on the user profile (if available)', async ({ homepage, page }) => {
    const profilePage = new Profile(page);
    const groups = profilePage.groupCard;
    await homepage.goToProfile();
    await profilePage.verifyProfileLoaded();
    //If the save message is open, close it to prevent it from blocking other actions
    await profilePage.closeSaveToast();
    const count = await groups.count();
    //Checks for at least 1 group to be visible
    if (count > 0) {
      await expect(groups.first()).toBeVisible();
    } else {
      await expect(page.getByText('No Groups')).toBeVisible();
    }
  });

  test('Qualifications are displayed on the user profile (if available)', async ({ homepage, page }) => {
    const profilePage = new Profile(page);
    const qualifications = profilePage.qualificationCard;
    await homepage.goToProfile();
    await profilePage.verifyProfileLoaded();
    //If the save message is open, close it to prevent it from blocking other actions
    await profilePage.closeSaveToast();
    const count = await qualifications.count();
    //Checks for at least 1 qualification to be visible
    if (count > 0) {
      await expect(qualifications.first()).toBeVisible();
    } else {
      await expect(page.getByText('No Qualifications')).toBeVisible();
    }
  });
  /*                        ===== Password Change =====
  End-to-end test: Navigates to the user's profile, changes the password,
  then reverts it back to the original */

  test('User can change their password', async ({ homepage, page }) => {
    const profilePage = new Profile(page);
    const originalPassword = process.env.PASSWORD || 'Password123!';
    const newPassword = generatePassword();
    await homepage.goToProfile();
    await profilePage.verifyProfileLoaded();
    // Change password
    await profilePage.updatePassword(newPassword);
    await profilePage.saveChanges();
    console.log('✅ Password changed');
    // Revert password
    await profilePage.updatePassword(originalPassword);
    await profilePage.saveChanges();
    console.log('✅ Password reverted');
  });
});