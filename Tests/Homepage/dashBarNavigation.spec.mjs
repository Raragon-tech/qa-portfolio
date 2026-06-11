import { test } from '../../Fixtures/baseHomeTest.mjs';
import { cleanupTab } from '../../Helpers/homeNavHelper.mjs';
import { Classes } from '../../Pages/Homepage/DashboardPages/classes.mjs';
import { Learning } from '../../Pages/Homepage/DashboardPages/learning.mjs';
import { Store } from '../../Pages/Homepage/DashboardPages/store.mjs';
import { Community } from '../../Pages/Homepage/DashboardPages/community.mjs';
import { Awards } from '../../Pages/Homepage/DashboardPages/awards.mjs';
import { Help } from '../../Pages/Homepage/DashboardPages/help.mjs';


//These tests verify that a user can access each area of the navigation bar on the homepage 
test.describe('Homepage Navigation Bar', () => {

test('User can access the Classes Dashboard', async ({ homepage, page }) => {
  const classesTab = await homepage.goToClasses();
  const classesPage = new Classes(classesTab);
  await classesPage.verifyClassesLoaded();
  // The new tab is cleared of cookies and closed to prevent session bleed in other tests
  await cleanupTab(classesTab);
});

test('User can access the Learning Dashboard', async ({ homepage, page }) => {
  const learningTab = await homepage.goToLearning();
  const learningPage = new Learning(learningTab);
  await learningPage.verifyLearningLoaded();
  // The new tab is cleared of cookies and closed to prevent session bleed in other tests
  await cleanupTab(learningTab);
});

test('User can access the Store', async ({ homepage, page }) => {
  await homepage.goToStore();
  const storePage = new Store(page);
  await storePage.verifyStoreLoaded();
});

test('User can access the Community page', async ({ homepage, page }) => {
  await homepage.goToCommunity();
  const communityPage = new Community(page);
  await communityPage.verifyCommunityLoaded();
});

test('User can access their awards', async ({ homepage, page }) => {
  await homepage.goToAwards();
  const awardsPage = new Awards(page);
  await awardsPage.verifyAwardsLoaded();
});

test('User can access Help page', async ({ homepage, page }) => {
  const helpTab = await homepage.goToHelp();
  const helpPage = new Help(helpTab);
  await helpPage.verifyHelpLoaded();
  // The new tab is cleared of cookies and closed to prevent session bleed in other tests
  await cleanupTab(helpTab);
});

  });

