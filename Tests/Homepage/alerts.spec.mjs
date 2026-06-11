import { test } from '../../Fixtures/baseHomeTest.mjs';
import { Announcements } from '../../Pages/Homepage/NoticePages/announcements.mjs';
import { Notifications } from '../../Pages/Homepage/NoticePages/notifications.mjs';


// Verifies access to alert-related pages from the homepage
test.describe('Alerts', () => {

  test('User can access announcements', async ({ homepage, page }) => {
    await homepage.goToAnnouncements();
    const announcementsPage = new Announcements(page);
    await announcementsPage.verifyLoaded();
  });

  test('User can access notifications', async ({ homepage, page }) => {
    await homepage.goToNotifications();
    const notificationsPage = new Notifications(page);
    await notificationsPage.verifyLoaded();
  });
});