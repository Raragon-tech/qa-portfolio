import { test } from '../../Fixtures/baseHomeTest.mjs';
import { HomeSearch } from '../../Pages/Homepage/homeSearch.mjs';


//Verifies search functionality for groups, users, and full results

test.describe('Homepage Search Bar', () => {
  // End-to-end test: Verify a user can search for a group

  test('User can search for a group', async ({ homepage, page }) => {
    const searchPage = new HomeSearch(page);
    // Search for a group using a hardcoded value (This is safe to change and is not stored or reused elsewhere)
    await homepage.searchForGroup('Example Group');
    // Verify the selected search result for the group loads
    await searchPage.verifyGroupLoaded();
  });

  // End-to-end test: Verify a user can search for a user
  test('User can search for a user', async ({ homepage, page }) => {
    const searchPage = new HomeSearch(page);
    // Search for a user using a hardcoded value (This is safe to change and is not stored or reused elsewhere)
    await homepage.searchForUser('Example user');
    // Verify the selected search result for the user loads 
    await searchPage.verifyUserLoaded();
  });

  // End-to-end test: Verify a user can view all users
  test('User can view all users in the search results', async ({ homepage, page }) => {
    const searchPage = new HomeSearch(page);
    // Search for a user using a hardcoded value (This is safe to change and is not stored or reused elsewhere)
    // Select the "View All" option to display all users
    await homepage.searchAndViewAllUsers('Example Name');
    // Verify the "View All" option loads 
    await searchPage.verifyViewAllLoaded();
  });
});








