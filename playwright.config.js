// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  reporter: 'html',
  use: {
    screenshot: 'on',

    browserName: 'chromium',
    headless: false,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    trace: 'retain-on-failure',
  },
});
