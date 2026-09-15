import { expect, test, request } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';
const yahooPayload = { email: 'yahoopavit@gmail.com', password: 'Yahoo@123' };
const gmailPayload = { email: 'gmailpavit@gmail.com', password: 'Gmail@123' };

async function loginAs(page, user, request) {
  const loginResponse = await request.post(`${API_URL}/auth/login`, {
    data: user,
  });
  await expect(loginResponse).toBeOK();
  const loginJSON = await loginResponse.json();
  const token = loginJSON.token;
  await page.addInitScript((tokenValue) => {
    window.localStorage.setItem('eventhub_token', tokenValue);
  }, token);
  await page.goto(BASE_URL);
  return token;
}

test('Assignment 3', async ({ page, request }) => {
  //first login
  const token = await loginAs(page, yahooPayload, request);
  //fetching events
  const eventsResposnse = await request.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  await expect(eventsResposnse).toBeOK();
  const eventJSON = await eventsResposnse.json();
  const eventID = eventJSON.data[0].id;
  //create booking via yahoo user
  const newEventResponse = await request.post(`${API_URL}/bookings`, {
    data: {
      eventId: eventID,
      customerName: 'PavitKaur Sra',
      customerEmail: yahooPayload.email,
      customerPhone: '+91-9876543210',
      quantity: 2,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  await expect(newEventResponse).toBeOK();
  const newEventJSON = await newEventResponse.json();
  const yahooBookingId = newEventJSON.data.id;
  //login as gmail
  await loginAs(page, gmailPayload, request);
  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Access Denied')).toBeVisible();
  await expect(
    page.getByText('You are not authorized to view this booking')
  ).toBeVisible();
});
