import type { HeroSlide } from '@/types/home';

export type SlideDisplayItem = {
  id: string;
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  bgImage: string;
  productCard?: {
    title: string;
    subtitle?: string;
    comboBadge?: string;
    discountBadge?: string;
    salePrice?: number;
    originalPrice?: number;
    imageAlt?: string;
  };
};

export const getSlideBadge = (s: HeroSlide): string => {
  if (typeof s.badge === 'string') {
    return s.badge;
  }
  if (s.badge?.text) {
    return s.badge.text;
  }
  return s.badgeText ?? 'Hải sản Phan Thiết';
};

export const getSlideCtas = (s: HeroSlide) => ({
  primaryLabel: s.ctaText ?? s.primaryCtaLabel ?? s.primaryCta?.label ?? 'Khám Phá Ngay',
  primaryHref: s.ctaLink ?? s.primaryCtaHref ?? s.primaryCta?.href ?? '/products',
  secondaryLabel: s.secondaryCta?.label ?? 'Xem Bảng Giá',
  secondaryHref: s.secondaryCta?.href ?? '/products',
});

function parsePrice(value: string | number | null | undefined): number | undefined {
  if (typeof value === 'number') {
    return value;
  }
  if (value) {
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
  }
  return undefined;
}

function extractHeroSlideImage(s: HeroSlide): string {
  const rawUrl =
    s.imageUrl ??
    s.cardImageUrl ??
    s.productCard?.imageUrl ??
    s.productCard?.image ??
    s.image ??
    '';

  // Khắc phục ảnh c9fca3ab bị lỗi mảng đen một nửa từ seed data
  if (rawUrl.includes('c9fca3ab-16a6-4e4d-a566-38763d532d4a')) {
    return 'http://localhost:9000/mini-ecommerce/productImage/a41c799d-e3ea-4e7a-b9de-fc91610688c3.jpg';
  }

  return rawUrl;
}

function extractHeroProductCard(
  s: HeroSlide,
  titleHighlight: string,
): SlideDisplayItem['productCard'] {
  if (!s.productCard && !s.cardTitle) {
    return undefined;
  }

  const originalPrice = parsePrice(s.productCard?.originalPrice ?? s.cardOriginalPrice);
  const salePrice = parsePrice(s.productCard?.salePrice ?? s.cardSalePrice);

  return {
    title: s.productCard?.title ?? s.cardTitle ?? titleHighlight,
    subtitle:
      s.productCard?.subtitle ?? s.cardSubtitle ?? 'Tươi sống 100%, đánh bắt tại biển Phan Thiết',
    comboBadge: s.productCard?.comboBadge ?? undefined,
    discountBadge: s.productCard?.discountBadge ?? undefined,
    salePrice,
    originalPrice,
    imageAlt: s.productCard?.imageAlt ?? titleHighlight,
  };
}

export const formatHeroSlide = (s: HeroSlide): SlideDisplayItem => {
  const badgeText = getSlideBadge(s);
  const ctas = getSlideCtas(s);
  const bgImage = extractHeroSlideImage(s);

  const titlePrefix = s.titlePrefix ?? (s.title ? '' : 'HẢI SẢN PHAN THIẾT');
  const titleHighlight = s.titleHighlight ?? s.title ?? 'TƯƠI NGON';
  const titleSuffix = s.titleSuffix ?? 'MỖI NGÀY';
  const description =
    s.description ??
    s.subtitle ??
    'Đánh bắt và vận chuyển trực tiếp từ biển Phan Thiết vào bờ, giữ trọn vị ngọt tự nhiên, giao nhanh trong 2H tại TP.HCM & các tỉnh lân cận.';

  const productCard = extractHeroProductCard(s, titleHighlight);

  return {
    id: String(s.id),
    badgeText,
    titlePrefix,
    titleHighlight,
    titleSuffix,
    description,
    primaryLabel: ctas.primaryLabel,
    primaryHref: ctas.primaryHref,
    secondaryLabel: ctas.secondaryLabel,
    secondaryHref: ctas.secondaryHref,
    bgImage,
    productCard,
  };
};
