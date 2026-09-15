import {
  After,
  AfterStep,
  Before,
  BeforeStep,
  Status,
} from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { PageObjectManager } from '../../pageObjects/pageObjectManager.js';

Before(async function () {
  //runs before each scenario
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.pageObjectManager = new PageObjectManager(this.page);
});

After(async function () {
  console.log('Clenaed');
});

BeforeStep({ tags: '@foo' }, function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure

  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: 'screenshot-cucumber.png' });
  }
});
