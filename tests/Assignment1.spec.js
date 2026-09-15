import { expect, test } from '@playwright/test';
const BASE_URL = 'https://eventhub.rahulshettyacademy.com/';
const email = 'pavit@gmail.com';
const password = 'Pavit123@';
const eventTitle = ` Test-${Date.now()}`;

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

async function enterDetails(page) {
  await page.getByLabel('Full Name').fill('Pavit');
  await page.getByLabel('Email').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('+91 98765 43210');
  await page.locator('.confirm-booking-btn').click();
  await expect(page.getByText('Confirmed')).toBeVisible();
}

test(' Assignment-1', async ({ page }) => {
  await login(page);
  await expect(page.getByText('Discover & Book')).toBeVisible();
  await page.getByRole('button', { name: 'Admin' }).click();
  await expect(page.getByText('Manage EventsManage Bookings')).toBeVisible();
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Manage Events' })
    .click();
  await page.locator('#event-title-input').fill(eventTitle);
  await page
    .locator('#admin-event-form textarea')
    .fill(`This is a random test with the name of ${eventTitle}`);
  await page.getByLabel('Category').selectOption('Conference');
  await page.getByLabel('City').fill('Bathinda');
  await page.getByLabel('Venue').fill('Green City Bathinda');
  await page.getByLabel('Event Date & Time').fill('2026-10-25T14:30');
  await page.getByLabel('Price ($)').fill('100');
  await page.getByLabel('Total Seats').fill('50');
  await page.getByRole('button', { name: '+ Add Event' }).click();
  await expect(page.getByText('Event created!')).toBeVisible();
  await page.getByTestId('nav-events').click();
  await page
    .locator('[data-testid="event-card"]')
    .filter({ hasText: eventTitle })
    .first()
    .waitFor();
  await expect(
    page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle })
  ).toBeVisible({ timeout: 5000 });
  const seatsText = await page
    .locator('[data-testid="event-card"]')
    .filter({ hasText: eventTitle })
    .locator('span.text-emerald-600')
    .textContent();
  const seatsBeforeBooking = parseInt(seatsText);

  await page
    .locator('[data-testid="event-card"]')
    .filter({ hasText: eventTitle })
    .getByRole('link', { name: 'Book now' })
    .click();
  await expect(page.locator('#ticket-count')).toHaveText('1');
  await enterDetails(page);

  const bookingRef = await page.locator('.booking-ref').textContent();
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}bookings`);
  await page.getByTestId('booking-card').first().waitFor();
  await expect(
    page.getByTestId('booking-card').filter({ hasText: bookingRef })
  ).toBeVisible();
  await expect(
    page
      .getByTestId('booking-card')
      .filter({ hasText: bookingRef })
      .locator('.font-semibold.text-gray-900.text-base.truncate.mb-1')
  ).toHaveText(eventTitle);
  await page.getByTestId('nav-events').click();
  await page
    .locator('[data-testid="event-card"]')
    .filter({ hasText: eventTitle })
    .first()
    .waitFor();

  await expect(
    page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle })
  ).toBeVisible({ timeout: 5000 });
  const seatsText1 = await page
    .locator('[data-testid="event-card"]')
    .filter({ hasText: eventTitle })
    .locator('span.text-emerald-600')
    .textContent();
  const seatsAfterBooking = parseInt(seatsText1);

  await expect(seatsAfterBooking === seatsBeforeBooking - 1).toBeTruthy();

  await page.pause();
});

test('Eligible for refund', async ({ page }) => {
  await login(page);
  await page.getByTestId('nav-events').click();
  await page
    .getByTestId('event-card')
    .first()
    .getByTestId('book-now-btn')
    .click();

  await enterDetails(page);
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}bookings`);
  await page.locator('.booking-card').first().waitFor();
  await page
    .locator('.booking-card')
    .first()
    .getByRole('button', { name: 'View Details' })
    .click();
  await expect(page.getByText('confirmed')).toBeVisible();
  const confirmedBookingRef = await page
    .locator('.text-gray-900.font-mono')
    .textContent();
  const eveTitle = await page
    .locator('.text-2xl.font-bold.text-gray-900')
    .textContent();
  expect(confirmedBookingRef[0] === eveTitle[0]).toBeTruthy();
  await page
    .getByRole('button', { name: 'Check eligibility for refund?' })
    .click();
  await expect(page.locator('#refund-spinner')).toBeVisible();
  await expect(page.locator('#refund-spinner')).not.toBeVisible({
    timeout: 6000,
  });

  const refundResult = page.locator('#refund-result');

  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText(
    'Single-ticket bookings qualify for a full refund'
  );
  await expect(refundResult).toContainText('Eligible for refund.');
});

test('Not eligible for refund', async ({ page }) => {
  await login(page);
  await page.getByTestId('nav-events').click();
  await page
    .getByTestId('event-card')
    .first()
    .getByTestId('book-now-btn')
    .click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.locator('#ticket-count')).toHaveText('3');
  await enterDetails(page);
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}bookings`);
  await page.locator('.booking-card').first().waitFor();
  await page
    .locator('.booking-card')
    .first()
    .getByRole('button', { name: 'View Details' })
    .click();
  await expect(page.getByText('confirmed')).toBeVisible();
  const confirmedBookingRef = await page
    .locator('.text-gray-900.font-mono')
    .textContent();
  const eveTitle = await page
    .locator('.text-2xl.font-bold.text-gray-900')
    .textContent();
  expect(confirmedBookingRef[0] === eveTitle[0]).toBeTruthy();
  await page
    .getByRole('button', { name: 'Check eligibility for refund?' })
    .click();
  await expect(page.locator('#refund-spinner')).toBeVisible();
  await expect(page.locator('#refund-spinner')).not.toBeVisible({
    timeout: 6000,
  });

  const refundResult = page.locator('#refund-result');

  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText(
    ' Group bookings (3 tickets) are non-refundable'
  );
  await expect(refundResult).toContainText('Not eligible for refund.');
});
