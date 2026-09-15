import { test, request } from '@playwright/test';
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

test('Network API for mocking my orders', async ({ page }) => {
  //login automation
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto('https://rahulshettyacademy.com/client/');

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a74203485b8849b49310135',
    async (route) => {
      //intercepting response->Api gives the response->{playwright fake response}->send it to browser->browser will render data on frontend
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayloadOrders);
      route.fulfill({ response, body });
    }
  );

  const allOrdersPage = page.locator(
    'button[routerlink="/dashboard/myorders"]'
  );

  await allOrdersPage.click();
  await page.waitForResponse(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'
  );
  console.log(await page.locator('.mt-4').textContent());
  await page.pause();
});
