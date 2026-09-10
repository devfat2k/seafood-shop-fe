const R2_PUBLIC_CDN_BASE = 'https://pub-2b46d3c416734df8807474e64c55b5cb.r2.dev';

/**
 * Chuẩn hóa URL hình ảnh sản phẩm, danh mục, banner.
 * - Sửa lỗi cú pháp thiếu dấu gạch chéo (https:/ -> https://)
 * - Chuyển đổi endpoint S3 nội bộ của Cloudflare R2 sang R2 Public CDN
 * @param url URL hình ảnh thô từ database hoặc API
 * @returns URL hình ảnh hợp lệ, có thể hiển thị trực tiếp trên trình duyệt
 */
export const normalizeImageUrl = (url?: string | null): string => {
  if (!url || typeof url !== 'string') {
    return '';
  }

  let normalized = url.trim();

  // Sửa lỗi gõ thiếu dấu gạch chéo: https:/example.com -> https://example.com
  if (normalized.startsWith('https:/') && !normalized.startsWith('https://')) {
    normalized = normalized.replace(/^https:\//u, 'https://');
  } else if (normalized.startsWith('http:/') && !normalized.startsWith('http://')) {
    normalized = normalized.replace(/^http:\//u, 'http://');
  }

  // Chuyển đổi endpoint S3 nội bộ Cloudflare R2 sang R2 Public CDN
  // Pattern: https://<account_id>.r2.cloudflarestorage.com/mini-ecommerce-storage/<objectName>
  normalized = normalized.replace(
    /^https:\/\/(?:[a-zA-Z0-9_-]+\.)?r2\.cloudflarestorage\.com\/mini-ecommerce-storage\//u,
    `${R2_PUBLIC_CDN_BASE}/`,
  );

  return normalized;
};
