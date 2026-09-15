import ExcelJS from 'exceljs';
import { expect, test } from '@playwright/test';

async function writeExcel(searchText, replacedText, change) {
  const filePath = '/Users/pavitkaursra/Downloads/download.xlsx';
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');

  const output = await readExcel(worksheet, searchText);
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replacedText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    console.log(`Row:${rowNumber}`);
    row.eachCell((cell, colNumber) => {
      console.log(`Col : ${colNumber} -- `, cell.value);
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}

// writeExcel('Orange', 390, { rowChange: 0, colChange: 1 });

test('upload dowload', async ({ page }) => {
  const searchText = 'Mango';
  const replacedText = 33390;
  await page.goto('https://rahulshettyacademy.com/upload-download-test/');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  await writeExcel(searchText, replacedText, { rowChange: 0, colChange: 2 });
  await downloadPromise;

  await page
    .getByRole('button', { name: 'Choose File' })
    .setInputFiles('/Users/pavitkaursra/Downloads/download.xlsx');

  const textLocator = page.getByText(searchText);
  const desiredRow = page.getByRole('row').filter({ has: textLocator });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(
    String(replacedText)
  );
  await page.pause();
});
