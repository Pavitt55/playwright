import { expect, test } from '@playwright/test';

test(' Client App Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  const firstName = page.locator("[type='firstName']");
  const lastName = page.locator("[type='lastName']");
  const email = page.locator("[type='email']");
  const phone = page.locator('#userMobile');
  const occupation = page.locator('.custom-select');
  const gender = page.locator("input[value='Male']");
  const password = page.locator('#userPassword');
  const confirmPassword = page.locator('#confirmPassword');
  const checkBox = page.locator("input[type='checkbox']");
  const registerButton = page.locator('#login');
  const loginButtonAuth = page.locator("[routerlink='/auth']");
  const loginEmail = page.locator('#userEmail');
  const loginPassword = page.locator('#userPassword');
  const loginButton = page.locator("[type='submit']");
  const allProducts = page.locator('.card-body');

  const secondElement = page.locator(".card-body [tabindex='0']").nth(1);

  const titles = page.locator('.card-body h5');

  const addToCart = page.locator('.btn-primary');
  const cart = page.locator("[routerlink='/dashboard/cart']");
  const checkoutButton = page.getByRole('button', { name: 'Checkout' });
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
  const applyCouponButton = page.locator('button', { hasText: 'Apply Coupon' });
  const selectCountry = page.locator("[placeholder='Select Country']");
  const india = page.locator('button.ta-item').filter({ hasText: /^India$/ });
  const placeOrder = page.locator('a', { hasText: 'Place Order' });

  await firstName.fill('Pavit');
  await lastName.fill('Kaur Sra');
  await email.fill('pavitttt@gmail.com');
  await phone.fill('9876533219');
  await occupation.selectOption('Engineer');
  await gender.check();
  await password.fill('Pavitt@1234567');
  await confirmPassword.fill('Pavitt@1234567');
  await checkBox.check();
  await registerButton.click();
  await loginButtonAuth.click();

  await loginEmail.fill('pavitttt@gmail.com');
  await loginPassword.fill('Pavitt@1234567');
  await loginButton.click();
  //   await page.waitForLoadState('networkidle');
  await titles.first().waitFor();
  const allTitles = await titles.allTextContents(); // titles of all the cards h5
  await allProducts.first().waitFor();
  const secondProduct = allProducts.nth(1);
  const numOfProducts = await allProducts.count();
  const productName = await secondProduct.locator('b').textContent();
  for (let i = 0; i < numOfProducts; i++) {
    if ((await allProducts.nth(i).locator('b').textContent()) === productName) {
      await allProducts
        .nth(i)
        .getByRole('button', { name: /Add To Cart/i })
        .click();
      break;
    }
  }

  await secondElement.click();
  await addToCart.click();
  await cart.click();
  await checkoutButton.click();
  await inputCVV.fill('123');
  await inputName.fill('Pavit');
  await applyCoupon.fill('rahulshettyacademy');
  await applyCouponButton.click();
  await selectCountry.fill('India');
  //   await india.click();
  await placeOrder.click();
  await page.pause();
});

test('Child windows test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator('#username');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentsLink = page.locator("[href*='documents-request']");
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentsLink.click(),
  ]);

  const text = await newPage.locator('.red').textContent();
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  console.log(domain);
  await username.fill(domain);
  await page.pause();
});

test('Add to cart', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  const loginEmail = page.locator('#userEmail');
  const loginPassword = page.locator('#userPassword');
  const loginButton = page.locator("[type='submit']");
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

  await loginEmail.fill('pavitttt@gmail.com');
  await loginPassword.fill('Pavitt@1234567');
  await loginButton.click();
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
