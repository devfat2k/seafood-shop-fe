import { describe, expect, it } from 'vitest';
import { normalizeImageUrl } from './image';

describe(normalizeImageUrl, () => {
  it('returns empty string for null or empty inputs', () => {
    expect(normalizeImageUrl(null)).toBe('');
    expect(normalizeImageUrl()).toBe('');
    expect(normalizeImageUrl('')).toBe('');
  });

  it('fixes missing slash in protocol (https:/ -> https://)', () => {
    const malformed = 'https:/example.com/test.jpg';
    expect(normalizeImageUrl(malformed)).toBe('https://example.com/test.jpg');
  });

  it('converts Cloudflare R2 internal storage endpoint to public CDN', () => {
    const internalUrl =
      'https://2812adef964fed94d42990dd6290d3ad.r2.cloudflarestorage.com/mini-ecommerce-storage/productImage/11984359-6cb8-428c-b0a2-72e34c9aa7f4.jpg';
    expect(normalizeImageUrl(internalUrl)).toBe(
      'https://pub-2b46d3c416734df8807474e64c55b5cb.r2.dev/productImage/11984359-6cb8-428c-b0a2-72e34c9aa7f4.jpg',
    );
  });

  it('handles both malformed single slash and R2 storage endpoint together', () => {
    const malformedR2 =
      'https:/2812adef964fed94d42990dd6290d3ad.r2.cloudflarestorage.com/mini-ecommerce-storage/categoryImage/8cf16f5a-4ce8-4a6e-9f07-e7056ff36ac0.jpg';
    expect(normalizeImageUrl(malformedR2)).toBe(
      'https://pub-2b46d3c416734df8807474e64c55b5cb.r2.dev/categoryImage/8cf16f5a-4ce8-4a6e-9f07-e7056ff36ac0.jpg',
    );
  });

  it('leaves already valid CDN URLs intact', () => {
    const validCdn =
      'https://pub-2b46d3c416734df8807474e64c55b5cb.r2.dev/productImage/01fca212-6193-4fab-b168-02d74f6c4c5e.jpg';
    expect(normalizeImageUrl(validCdn)).toBe(validCdn);
  });
});
