import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to French using dropdown and verify text on the homepage', async ({
      page,
    }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Hải Sản Phan Thiết — Tươi từ biển, ngon tận nhà',
        }),
      ).toBeVisible();

      await page.getByLabel('Change language').selectOption('fr');

      await expect(
        page.getByRole('heading', {
          name: 'Hải Sản Phan Thiết — Tươi từ biển, ngon tận nhà',
        }),
      ).toBeVisible();
    });

    test('should switch language from English to French using URL and verify text on the about page', async ({
      page,
    }) => {
      await page.goto('/about');

      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

      await page.goto('/fr/about');

      await expect(page.getByRole('link', { name: 'À propos' })).toBeVisible();
    });
  });
});
