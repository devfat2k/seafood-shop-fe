import { describe, expect, it } from 'vitest';
import { routing } from '@/libs/I18nRouting';
import { formatCurrency, getI18nPath } from './Helpers';

describe('Helpers', () => {
  describe('I18n path helper', () => {
    it('keeps path unchanged when locale is default', () => {
      const url = '/random-url';
      const locale = routing.defaultLocale;

      expect(getI18nPath(url, locale)).toBe(url);
    });

    it('prefixes path with locale when locale is not default', () => {
      const url = '/random-url';
      const locale = 'fr';

      expect(getI18nPath(url, locale)).toBe(`/fr${url}`);
    });
  });

  describe(formatCurrency, () => {
    it('formats standard prices correctly with vi-VN dot separator and attached ₫', () => {
      expect(formatCurrency(320_000)).toBe('320.000₫');
      expect(formatCurrency(1_500_000)).toBe('1.500.000₫');
      expect(formatCurrency(50_000)).toBe('50.000₫');
    });

    it('handles zero and edge numbers', () => {
      expect(formatCurrency(0)).toBe('0₫');
      expect(formatCurrency(Number.NaN)).toBe('0₫');
      expect(formatCurrency(1234.56)).toBe('1.235₫');
    });
  });
});
