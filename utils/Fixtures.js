import { test as base } from '@playwright/test';
import { request } from '@playwright/test';

import { ApiUtils } from './ApiUtils';
const loginPayload = {
  userEmail: 'pavitttt@gmail.com',
  userPassword: 'Pavitt@1234567',
};
const orderPayload = {
  orders: [{ country: 'India', productOrderedId: '6960eae1c941646b7a8b3ed3' }],
};

export const customTest = base.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('pavitttt@gmail.com');
    await page.locator('#userPassword').fill('Pavitt@1234567');
    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle');
    await use(page);
    await page.context.close();
  },
  createOrder: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
    await apiContext.dispose();
  },
  testDataForOrder: {
    productName: 'adidas original',
    loginPayload: loginPayload,
  },
});
