import { expect } from '@playwright/test';

export class PlaceOrderPage {
  constructor(page) {
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
    this.emailId = page.locator(".user__name [type='text']").first();

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
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
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

    const orderID = this.page.locator('.em-spacer-1 .ng-star-inserted').first();
    await this.allOrdersPage.click();
    await this.allOrders.first().waitFor();
    const rows = this.allOrders.locator('tbody tr');
    const numOfOrders = await rows.count();

    for (let i = 0; i < numOfOrders; i++) {
      const currentProduct = await rows.nth(i).locator('th').textContent();
      if (orderID.includes(currentProduct)) {
        await rows.nth(i).locator('button', { hasText: 'View' }).click();
        break;
      }
    }
  }

  async verifyOrderPlaced() {
    await expect(this.orderConfirmation).toHaveText(
      ' Thankyou for the order. '
    );
  }
}
