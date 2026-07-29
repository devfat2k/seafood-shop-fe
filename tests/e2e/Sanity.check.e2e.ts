import { expect, test } from '@playwright/test';

test.describe('Sanity', () => {
  test.describe('Static pages', () => {
    test('should display the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Hải Sản Phan Thiết — Tươi từ biển, ngon tận nhà',
        }),
      ).toBeVisible();
    });

    test('should navigate to the about page', async ({ page }) => {
      await page.goto('/');

      await page.getByRole('link', { name: 'About' }).click();

      await expect(page).toHaveURL(/about$/u);

      await expect(page.getByText('Welcome to our About page', { exact: false })).toBeVisible();
    });

    test('should navigate to the products page', async ({ page }) => {
      await page.goto('/');

      await page.getByRole('link', { name: 'Products' }).click();

      await expect(page).toHaveURL(/products$/u);
    });
  });
});
