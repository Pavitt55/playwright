import { Locator, Page } from '@playwright/test';

export class LoginPage {
  page: Page;
  loginEmail: Locator;
  loginPassword: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginEmail = this.page.locator('#userEmail');
    this.loginPassword = this.page.locator('#userPassword');
    this.loginButton = this.page.locator("[type='submit']");
  }

  async goTo() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  }

  async validLogin(username: string, password: string) {
    await this.loginEmail.fill(username);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
