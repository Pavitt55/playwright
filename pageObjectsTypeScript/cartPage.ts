import { Locator, Page } from '@playwright/test';

export class CartPage {
  page: Page;
  cart: Locator;
  checkoutButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.cart = this.page.locator("[routerlink='/dashboard/cart']");
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  }
  async goToCart() {
    await this.cart.click();
    await this.checkoutButton.click();
  }
}
