import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';

const loginPayload = {
  userEmail: 'pavitttt@gmail.com',
  userPassword: 'Pavitt@1234567',
};
const orderPayload = {
  orders: [{ country: 'India', productOrderedId: '6960eae1c941646b7a8b3ed3' }],
};
const fakePayloadOrders = { data: [], message: 'No Orders' };
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test('Network Test Part 2', async ({ page }) => {
  //login and reach orders page
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('pavitttt@gmail.com');
  await page.locator('#userPassword').fill('Pavitt@1234567');
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    (route) => {
      route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=628c001321054ba465edcae2',
      });
    }
  );
  await page.locator("button:has-text('View')").first().click();

  const errorMessage = page.locator('.blink_me');
  await expect(errorMessage).toHaveText(
    'You are not authorize to view this order'
  );
  await page.pause();
});
