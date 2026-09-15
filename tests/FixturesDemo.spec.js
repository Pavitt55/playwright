import { expect } from '@playwright/test';
import { customTest } from '../utils/Fixtures';
customTest(
  'Fixtures Demo Test',
  async ({ authenticatedPage, createOrder, testDataForOrder }) => {
    //login to application, create order and verify if the order is created from history page
    await authenticatedPage.goto('https://rahulshettyacademy.com/client/');
console.log(`Testing for product: ${testDataForOrder.productName}`);
    await authenticatedPage
      .locator('button[routerlink="/dashboard/myorders"]')
      .click();

    await authenticatedPage.locator('tbody').waitFor();

    await expect(
      authenticatedPage.getByText(createOrder.orderID)
    ).toBeVisible();
  }
);
