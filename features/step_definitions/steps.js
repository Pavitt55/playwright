import { When, Then, Given } from '@cucumber/cucumber';
import { PageObjectManager } from '../../pageObjects/pageObjectManager.js';
import { chromium } from '@playwright/test';

Given(
  'A login to Ecommerce Application with {string} and {string}',
  { timeout: 30000 },
  async function (username, password) {
    //login functionality

    const loginPage = this.pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  }
);

When('Add {string} to the cart', async function (productName) {
  const dashboardPage = this.pageObjectManager.getDashboardPage();
  await dashboardPage.searchProduct(productName);
  await dashboardPage.navigateToCart();
});

Then(
  'Verify {string} is displayed in the cart page',
  async function (productName) {
    const cartPage = this.pageObjectManager.getCartPage();
    await cartPage.verifyProductsDisplayed(productName);
    await cartPage.clickCheckout();
  }
);

When(
  'Enter valid details and place the order',
  { timeout: 30000 },
  async function () {
    this.placeOrder = this.pageObjectManager.getPlaceOrderPage();
    await this.placeOrder.getPlaceOrder();
  }
);

Then('Verify order is present in the order history page', async function () {
  //   const placeOrder = this.pageObjectManager.getPlaceOrderPage();
  await this.placeOrder.verifyOrderPlaced();
});

Given(
  'A login to Ecommerce Application1 with {string} and {string}',
  async function (username, pass) {
    const userName = this.page.locator('#username');
    const password = this.page.locator('[type="password"]');
    const signInBtn = this.page.locator('#signInBtn');
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());
    await userName.fill(username);
    await password.fill(pass);
    await signInBtn.click();
  }
);

Then('Verify Error Message is displayed', async function () {
  await this.page.locator("[style*='block']").textContent();
  await expect(this.page.locator("[style*='block']")).toContainText(
    'Incorrect'
  );
});
