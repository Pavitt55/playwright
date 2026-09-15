import { test, expect, request } from '@playwright/test';

test('Aborting Network Requests & Listening to Network Events ', async ({
  page,
}) => {
  page.on('request', (request) => {
    console.log(`[REQUEST MADE] -> ${request.url()}`);
  });
  page.on('response', (response) => {
    console.log(
      `[RESPONSE RECEIVED] -> ${response.url()} | STATUS : ${response.status()}`
    );
  });
  await page.route('**/*.{jpg,jpeg,png}', async (route) => {
    await route.abort();
  });
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('pavitttt@gmail.com');
  await page.locator('#userPassword').fill('Pavitt@1234567');
  await page.locator("[value='Login']").click();

  await page.waitForLoadState('networkidle');
});
