// Extends Playwright test with reusable homepage fixtures
import { test as base } from '@playwright/test';
import { Homepage } from '../Pages/Homepage/homepagePage.mjs';
import { openHomepage } from '../Helpers/homeNavHelper.mjs';
import { loginRawHomePage } from '../Helpers/homeNavHelper.mjs';

// Navigates to the homepage
export const test = base.extend({
  homepage: async ({ page }, use) => {
    const home = await openHomepage(page);
    await use(home);
  },

  // Homepage state immediately after user login (used for first-login scenarios)
  newUserHomepage: async ({ page }, use) => {
    await loginRawHomePage(page);
    const home = new Homepage(page);
    await use(home);
  },

});
