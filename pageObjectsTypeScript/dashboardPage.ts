import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  page: Page;
  allProducts: Locator;
  titles: Locator;
  addToCart: Locator;
  constructor(page: Page) {
    this.page = page;
    this.allProducts = this.page.locator('.card-body');

    this.titles = this.page.locator('.card-body h5');
    this.addToCart = this.page.locator('[routerlink*="cart"]');
  }

  async searchProduct(productName: any) {
    await this.titles.first().waitFor();
    const allTitles = await this.titles.allTextContents();
    console.log(allTitles);
    const numOfProducts = await this.allProducts.count();

    for (let i = 0; i < numOfProducts; i++) {
      if (
        (await this.allProducts.nth(i).locator('b').textContent()) ===
        productName
      ) {
        await this.allProducts
          .nth(i)
          .getByRole('button', { name: /Add To Cart/i })
          .click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.addToCart.click();
  }
}
