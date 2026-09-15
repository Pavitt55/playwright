import { test, expect } from '@playwright/test';
let webContext;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.locator('#userEmail').fill('pavitttt@gmail.com');
  await page.locator('#userPassword').fill('Pavitt@1234567');
  await page.locator("[type='submit']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'state.json' }); //here we created a file under state.json
  webContext = await browser.newContext({ storageState: 'state.json' }); //here we injected the state.json in newly created browser context
});

test('Add to cart', async () => {
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  const allProducts = page.locator('.card-body');
  const titles = page.locator('.card-body h5');
  const addToCart = page.locator("[routerlink='/dashboard/cart']");
  const checkoutButton = page.getByRole('button', { name: 'Checkout' });
  const listSection = page.locator(
    '[class="ta-results list-group ng-star-inserted"]'
  );
  const inputCVV = page
    .locator('.field.small', { hasText: 'CVV Code' })
    .locator('input');
  const inputName = page
    .locator('.field', { hasText: 'Name on Card' })
    .locator('input');
  const applyCoupon = page
    .locator('.field.small', {
      hasText: 'Apply Coupon',
    })
    .locator('input');
  const applyCouponButton = page.locator('button', {
    hasText: 'Apply Coupon',
  });
  const selectCountry = page.locator("[placeholder='Select Country']");
  const couponAppliedConfirmation = page.locator('p', {
    hasText: 'Coupon Applied',
  });
  const placeOrder = page.locator('a', { hasText: 'Place Order' });
  const orderConfirmation = page.locator('h1', { hasText: 'THANKYOU' });
  const allOrdersPage = page.locator(
    'button[routerlink="/dashboard/myorders"]'
  );
  const allOrders = page.locator('.table');

  await titles.first().waitFor();
  const allTitles = await titles.allTextContents(); // titles of all the cards h5
  await allProducts.first().waitFor();
  const secondProduct = allProducts.nth(1);
  const numOfProducts = await allProducts.count();
  const productName = await secondProduct.locator('b').textContent();
  const india = listSection.getByRole('button', { name: /India$/ });

  for (let i = 0; i < numOfProducts; i++) {
    if ((await allProducts.nth(i).locator('b').textContent()) === productName) {
      await allProducts
        .filter({ hasText: 'ZARA COAT 3' })
        .getByRole('button', { name: /Add To Cart/i })
        .click();
      break;
    }
  }
  await addToCart.click();
  await page.locator('div li').first().waitFor();
  const isAvailable = await page
    .locator(`h3:has-text("${productName}")`)
    .isVisible();
  expect(isAvailable).toBeTruthy();

  await checkoutButton.click();

  await inputCVV.fill('123');
  await inputName.fill('Pavit');
  await applyCoupon.fill('rahulshettyacademy');
  await applyCouponButton.click();
  await couponAppliedConfirmation.waitFor();

  await selectCountry.pressSequentially('Indi');
  expect(listSection).toBeVisible();

  await india.click();
  await placeOrder.click();
  await expect(orderConfirmation).toHaveText('Thankyou for the order.');
  const orderID = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .first()
    .textContent();
  console.log(orderID);
  await allOrdersPage.click();
  await allOrders.first().waitFor();
  const rows = allOrders.locator('tbody tr');
  const numOfOrders = await rows.count();

  for (let i = 0; i < numOfOrders; i++) {
    const currentProduct = await rows.nth(i).locator('th').textContent();
    console.log(currentProduct);
    if (orderID.includes(currentProduct)) {
      await rows.nth(i).locator('button', { hasText: 'View' }).click();
    }

    break;
  }
  const orderDetails = await page.locator('.col-text.-main').textContent();
  expect(orderID.includes(orderDetails)).toBeTruthy();
  await page.pause();
});
