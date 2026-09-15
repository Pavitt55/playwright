import { Locator, Page } from '@playwright/test';

export class PlaceOrderPage {
  page: Page;
  inputCVV: Locator;
  inputName: Locator;
  applyCoupon: Locator;
  applyCouponButton: Locator;
  selectCountry: Locator;
  placeOrder: Locator;
  couponAppliedConfirmation: Locator;
  orderConfirmation: Locator;
  allOrdersPage: Locator;
  allOrders: Locator;
  listSection: Locator;
  india: Locator;
  constructor(page: Page) {
    this.page = page;
    this.inputCVV = this.page
      .locator('.field.small', { hasText: 'CVV Code' })
      .locator('input');
    this.inputName = this.page
      .locator('.field', { hasText: 'Name on Card' })
      .locator('input');
    this.applyCoupon = this.page
      .locator('.field.small', {
        hasText: 'Apply Coupon',
      })
      .locator('input');
    this.applyCouponButton = this.page.locator('button', {
      hasText: 'Apply Coupon',
    });
    this.selectCountry = this.page.locator("[placeholder='Select Country']");

    this.placeOrder = this.page.locator('a', { hasText: 'Place Order' });
    this.couponAppliedConfirmation = page.locator('p', {
      hasText: 'Coupon Applied',
    });
    this.orderConfirmation = page.locator('h1', { hasText: 'THANKYOU' });
    this.allOrdersPage = page.locator(
      'button[routerlink="/dashboard/myorders"]'
    );
    this.allOrders = page.locator('.table');
    this.listSection = page.locator(
      '[class="ta-results list-group ng-star-inserted"]'
    );
    this.india = this.listSection.getByRole('button', { name: /India$/ });
  }
  async getPlaceOrder() {
    await this.inputCVV.fill('123');
    await this.inputName.fill('Pavit');
    await this.applyCoupon.fill('rahulshettyacademy');
    await this.applyCouponButton.click();
    await this.couponAppliedConfirmation.waitFor();
    await this.selectCountry.fill('Ind');
    await this.india.click();
    await this.placeOrder.click();

    const orderIDText = await this.page
      .locator('.em-spacer-1 .ng-star-inserted')
      .first()
      .textContent();
    await this.allOrdersPage.click();
    await this.allOrders.first().waitFor();
    const rows = this.allOrders.locator('tbody tr');
    const numOfOrders = await rows.count();

    for (let i = 0; i < numOfOrders; i++) {
      const currentProduct = await rows.nth(i).locator('th').textContent();

      if (
        orderIDText &&
        currentProduct &&
        orderIDText.includes(currentProduct.trim())
      ) {
        await rows.nth(i).locator('button', { hasText: 'View' }).click();
        break;
      }
    }
  }
}
