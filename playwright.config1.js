// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  projects: [
    {
      name: 'Safari execution',
      use: {
        screenshot: 'off',
        browserName: 'webkit',
        headless: false,
        trace: 'retain-on-failure',
        ...devices['iPhone 11'],
        video: 'retain-on-failure',
      },
    },
    {
      name: 'Chrome execution',
      use: {
        screenshot: 'on',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        browserName: 'chromium',
        headless: true,
        // viewport: { width: 720, height: 720 },
        trace: 'retain-on-failure',
      },
    },
  ],

  reporter: 'html',
  use: {
    screenshot: 'on',

    browserName: 'webkit',
    headless: true,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    trace: 'retain-on-failure',
  },
});
