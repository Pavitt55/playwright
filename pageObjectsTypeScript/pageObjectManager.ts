import { LoginPage } from './loginPage';
import { DashboardPage } from './dashboardPage';
import { CartPage } from './cartPage';
import { PlaceOrderPage } from './placeOrderPage';
import { Page } from '@playwright/test';

export class PageObjectManager {
  readonly page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
  placeOrderPage: PlaceOrderPage;
  constructor(page: Page) {
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
