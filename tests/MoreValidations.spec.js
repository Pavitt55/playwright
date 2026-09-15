import { expect, test } from '@playwright/test';
test.describe.configure({ mode: 'parallel' });

test('Popup validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  //   await page.goto('https://www.google.com/');
  //   await page.goBack();
  //   await page.goForward();
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });
  await page.locator('#confirmbtn').click();
  await page.locator('#mousehover').hover();
  const framepage = page.frameLocator('#courses-iframe');
  await framepage.locator('li a[href*="lifetime-access"]:visible').click();
  const textContent = await framepage.locator('.text h2').textContent();
  console.log(textContent.split(' ')[1]);
  await page.pause();
});

test('Screenshot and visual comparison', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page
    .locator('#displayed-text')
    .screenshot({ path: 'partialScreenshot.png' });
  await page.locator('#hide-textbox').click();
  await page.screenshot({ path: 'playwrightScreenshot.png' });
  await expect(page.locator('#displayed-text')).toBeHidden();
});

test('visual ', async ({ page }) => {
  await page.goto('https://google.com/');
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
