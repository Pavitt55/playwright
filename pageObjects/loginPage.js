export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginEmail = page.locator('#userEmail');
    this.loginPassword = page.locator('#userPassword');
    this.loginButton = page.locator("[type='submit']");
  }

  async goTo() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  }

  async validLogin(username, password) {
    await this.loginEmail.fill(username);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
