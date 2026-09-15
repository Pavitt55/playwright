import { expect, test } from '@playwright/test';

test('Playwright 3rd sl test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  const email = page.getByPlaceholder('email@example.com');
  const password = page.getByPlaceholder('enter your passsword');
  const loginButton = page.getByRole('button', { name: 'Login' });
  const allCards = page.locator('.card-body');

  await email.fill('pavitttt@gmail.com');
  await password.fill('Pavitt@1234567');
  await loginButton.click();
  await allCards.first().waitFor();
  await allCards
    .filter({ hasText: 'ADIDAS ORIGINAL' })
    .getByRole('button', { name: 'Add to Cart' })
    .click();
  await page.locator('[routerlink="/dashboard/cart"]').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page
    .locator('.field.small', { hasText: 'CVV Code' })
    .locator('input')
    .fill('123');
  await page
    .locator('.field', { hasText: 'Name on Card' })
    .locator('input')
    .fill('Pavit');
  await page
    .locator('.field.small', { hasText: 'Apply Coupon ' })
    .locator('input')
    .fill('rahulshettyacademy');
  await page.getByRole('button', { name: 'Apply Coupon' }).click();
  await page.getByText('* Coupon Applied').waitFor();
  await page.getByPlaceholder('Select Country').pressSequentially('Indi');
  await expect(page.locator('.ta-results.list-group')).toBeVisible();
  await page
    .locator('.ta-results.list-group')
    .getByRole('button', { name: /India$/ })
    .click();

  await page.locator('.action__submit').click();
  await expect(page.getByText('Thankyou for the order.')).toBeVisible();
  const orderID = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();
  await page.getByRole('button', { name: 'Orders' }).click();
  await page.locator('.table tbody tr').first().waitFor();
  const cleanOrderId = orderID.replace(/[^a-zA-Z0-9]/g, '').trim();

  await page
    .locator('.table')
    .locator('tbody tr')
    .filter({ hasText: cleanOrderId })
    .getByRole('button', { name: 'View' })
    .click();

  expect(orderID.includes(cleanOrderId)).toBeTruthy();

  await page.pause();
});
