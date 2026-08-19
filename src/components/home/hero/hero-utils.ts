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
};

export const getSlideBadge = (s: HeroSlide): string => {
  if (typeof s.badge === 'string') {
    return s.badge;
  }
  if (s.badge?.text) {
    return s.badge.text;
  }
  return s.badgeText ?? '🌊 Hải sản Phan Thiết';
};

export const getSlideCtas = (s: HeroSlide) => ({
  primaryLabel: s.ctaText ?? s.primaryCtaLabel ?? s.primaryCta?.label ?? 'Khám Phá Ngay',
  primaryHref: s.ctaLink ?? s.primaryCtaHref ?? s.primaryCta?.href ?? '/products',
  secondaryLabel: s.secondaryCta?.label ?? 'Xem Bảng Giá',
  secondaryHref: s.secondaryCta?.href ?? '/products',
});

export const formatHeroSlide = (s: HeroSlide): SlideDisplayItem => {
  const badgeText = getSlideBadge(s);
  const ctas = getSlideCtas(s);
  const bgImage =
    s.imageUrl ??
    s.cardImageUrl ??
    s.productCard?.imageUrl ??
    s.productCard?.image ??
    s.image ??
    '';

  const titlePrefix = s.titlePrefix ?? (s.title ? '' : 'Hải Sản Phan Thiết');
  const titleHighlight = s.titleHighlight ?? s.title ?? 'Tươi Ngon';
  const titleSuffix = s.titleSuffix ?? 'Mỗi Ngày';
  const description =
    s.description ??
    s.subtitle ??
    'Đánh bắt và vận chuyển trực tiếp từ biển Phan Thiết vào bờ, giữ trọn vị ngọt tự nhiên, giao nhanh trong 2H tại TP.HCM & các tỉnh lân cận.';

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
  };
};
