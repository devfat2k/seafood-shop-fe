import { expect, test } from '@playwright/test';

test.describe('Sanity Check', () => {
  test.describe('Navigation and Storefront Pages', () => {
    test('should display the homepage', async ({ page }) => {
      await page.goto('/');

      // Verify page loads with logo or hero
      await expect(page).toHaveURL(/\/(en|fr)?$/u);
      await expect(page.getByRole('link', { name: /trang chủ/iu }).first()).toBeVisible();
    });

    test('should navigate to the products catalog page', async ({ page }) => {
      await page.goto('/');

      const productsLink = page.getByRole('link', { name: /sản phẩm/iu }).first();
      await productsLink.click();

      await expect(page).toHaveURL(/products/u);
    });

    test('should navigate to the about/contact page', async ({ page }) => {
      await page.goto('/');

      const aboutLink = page.getByRole('link', { name: /liên hệ/iu }).first();
      await aboutLink.click();

      await expect(page).toHaveURL(/about/u);
    });
  });
});
