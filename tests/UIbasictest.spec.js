import { expect, test } from '@playwright/test';

test('@login First Playwright Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator('#username');
  const password = page.locator('[type="password"]');
  const signInBtn = page.locator('#signInBtn');
  const titles = page.locator('.card-body a');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await userName.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');
  await signInBtn.click();
  console.log(await titles.first().textContent());
  console.log(await titles.allTextContents());
  // await page.locator("[style*='block']").textContent();
  // await expect(page.locator("[style*='block']")).toContainText('Incorrect');
  await page.pause();
});

test('Second Playwright Test', async ({ page }) => {
  //   const context = await browser.newContext();
  //   const page = await context.newPage();
  await page.goto('https://google.com');
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
});
