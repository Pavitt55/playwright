import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator('div li').first();
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  }

  async verifyProductsDisplayed(productName) {
    await this.cartProducts.waitFor();
    const bool = await this.page.getByText(productName).isVisible();
    expect(bool).toBeTruthy();
  }
  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
