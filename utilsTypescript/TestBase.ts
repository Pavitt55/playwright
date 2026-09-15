import { test } from '@playwright/test';

interface TestData {
  username: string;
  password: string;
  productName: string;
}
export const customTest = test.extend<{ testDataForOrder: TestData }>({
  testDataForOrder: {
    username: 'pavitttt@gmail.com',
    password: 'Pavitt@1234567',
    productName: 'ZARA COAT 3',
  },
});
