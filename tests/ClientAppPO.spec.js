import { expect, test } from '@playwright/test';
import { customTest } from '../utils/TestBase';
import { PageObjectManager } from '../pageObjects/pageObjectManager';
import dataSet from '../utils/PlaceOrderTestData.json' with { type: 'json' };

customTest('Custom test', async ({ page, testDataForOrder }) => {
  const pageObjectManager = new PageObjectManager(page);
  //login functionality

  const loginPage = pageObjectManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password
  );

  //dashboard functionality
  const dashboardPage = pageObjectManager.getDashboardPage();
  await dashboardPage.searchProduct(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  //go to cart functionality
  const cartPage = pageObjectManager.getCartPage();
  await cartPage.goToCart();
  await cartPage.verifyProductsDisplayed(testDataForOrder.productName);
  await cartPage.clickCheckout();

  //place order functionality
  const placeOrder = pageObjectManager.getPlaceOrderPage();
  await placeOrder.getPlaceOrder();

  await page.pause();
});

for (const data of dataSet) {
  test(`Client App Test for ${data.productName}`, async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page);
    //login functionality

    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    //dashboard functionality
    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();

    //go to cart functionality
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.goToCart();
    await cartPage.verifyProductsDisplayed(testDataForOrder.productName);
    await cartPage.clickCheckout();

    //place order functionality
    const placeOrder = pageObjectManager.getPlaceOrderPage();
    await placeOrder.getPlaceOrder();
    await placeOrder.verifyOrderPlaced();

    await page.pause();
  });
}
