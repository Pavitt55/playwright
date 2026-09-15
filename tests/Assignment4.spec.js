import { expect, test } from '@playwright/test';

const assignmentTest = test.extend({
  loginFixture: async ({ page }, use) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill('yahoopavit@gmail.com');
    await page.getByPlaceholder('••••••').fill('Yahoo@123');
    await page.locator('#login-btn').click();
    await use(page);
  },
  eventCreationFixture: async ({ request }, use) => {
    const loginResponse = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
      {
        data: { email: 'yahoopavit@gmail.com', password: 'Yahoo@123' },
      }
    );
    const { token } = await loginResponse.json();
    const response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/events',
      {
        data: {
          title: 'Tech Summit 2026',
          description: 'A premier technology conference.',
          category: 'Conference',
          venue: 'Bangalore International Centre',
          city: 'Bangalore',
          eventDate: '2027-06-15T09:00:00.000Z',
          price: 1500,
          totalSeats: 500,
          imageUrl: 'https://example.com/banner.jpg',
        },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const responseJson = await response.json();
    console.log(responseJson);
    await use(responseJson);
  },
});

assignmentTest(
  'Assignment 4',
  async ({ loginFixture, eventCreationFixture }) => {
    await loginFixture.goto('https://eventhub.rahulshettyacademy.com/events');
    await expect(
      loginFixture.getByText(eventCreationFixture.data.title)
    ).toBeVisible();
  }
);
