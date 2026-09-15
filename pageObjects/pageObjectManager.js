import { LoginPage } from './loginPage.js';
import { DashboardPage } from './dashboardPage.js';
import { CartPage } from './cartPage.js';
import { PlaceOrderPage } from './placeOrderPage.js';

export class PageObjectManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.placeOrderPage = new PlaceOrderPage(this.page);
  }
  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }
  getPlaceOrderPage() {
    return this.placeOrderPage;
  }
}
