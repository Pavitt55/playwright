import { test } from '@playwright/test';

export const customTest = test.extend({
  testDataForOrder: {
    username: 'xwpavitttt@gmail.com',
    password: 'Pavitt@1234567',
    productName: 'ZARA COAT 3',
  },
});

