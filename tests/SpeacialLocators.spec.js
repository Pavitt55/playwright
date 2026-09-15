import { expect, test } from '@playwright/test';

test('Playwright  locator', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel('Check me out if you love IceCreams!').check();
  await page.getByLabel('Employed').check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByPlaceholder('Password').fill('abc@123');
  await page.getByRole('button', { name: 'Submit' }).click();

  const isSuccess = await page
    .getByText('Success! The Form has been submitted successfully!')
    .isVisible();

  expect(
    page.getByText('Success! The Form has been submitted successfully!')
  ).toBeVisible({ timeout: 10000 });

  await page.getByRole('link', { name: 'Shop' }).click();
  const allCards = page.locator('app-card');
  const nokiaCard = await allCards
    .filter({ hasText: 'Nokia Edge' })
    .getByRole('button')
    .click();
});

test('Playwright speacial locator', async ({ page }) => {
  test.setTimeout(60000); // test level global timeout
  const slowExpect = expect.configure({ timeout: 10000 }); // test level expect timeout
  page.setDefaultTimeout(9000); // test level action timeout
  page.setDefaultNavigationTimeout(9000); // test level nagigation timeout
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel('Check me out if you love IceCreams!').check();
  await page.getByLabel('Employed').check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByPlaceholder('Password').fill('abc@123');
  await page.getByRole('button', { name: 'Submit' }).click({ timeout: 9000 }); // step level action timeout

  const isSuccess = await page
    .getByText('Success! The Form has been submitted successfully!')
    .isVisible();

  slowExpect(
    page.getByText('Success! The Form has been submitted successfully!')
  ).toBeVisible({ timeout: 10000 }); // step level expect timeout

  await page.getByRole('link', { name: 'Shop' }).click();
  const allCards = page.locator('app-card');
  const nokiaCard = await allCards
    .filter({ hasText: 'Nokia Edge' })
    .getByRole('button')
    .click();
});
