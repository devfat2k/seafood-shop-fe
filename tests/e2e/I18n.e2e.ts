import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Locale Routing', () => {
    test('should load default locale and localized routes', async ({ page }) => {
      await page.goto('/en');
      await expect(page).toHaveURL(/\/en/u);

      await page.goto('/fr');
      await expect(page).toHaveURL(/\/fr/u);
    });

    test('should access about page on different locales', async ({ page }) => {
      await page.goto('/en/about');
      await expect(page).toHaveURL(/about/u);

      await page.goto('/fr/about');
      await expect(page).toHaveURL(/about/u);
    });
  });
});
