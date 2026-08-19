import type { Product } from '@/types/api';

const TAB_KEYWORDS: Record<string, string[]> = {
  tom: ['tôm', 'shrimp', 'prawn'],
  'cua-ghe': ['cua', 'ghẹ', 'crab', 'lobster'],
  'ca-bien-tuoi': ['cá', 'fish'],
  muc: ['mực', 'bạch tuộc', 'squid', 'octopus'],
  'so-ngheu-oc': ['sò', 'nghêu', 'ốc', 'clam', 'snail', 'oyster'],
  'hai-san-kho': ['khô', 'ruốc', 'mực khô', 'tôm khô', 'dried'],
  'nuoc-mam-gia-vi-bien': ['mắm', 'gia vị', 'muối', 'sauce', 'spice'],
};

export const matchesTab = (p: Product, tabSlug: string): boolean => {
  if (tabSlug === 'all') {
    return true;
  }
  if (p.categorySlug === tabSlug || String(p.categoryId) === tabSlug) {
    return true;
  }
  const keywords = TAB_KEYWORDS[tabSlug];
  const label = (
    p.categoryLabel ??
    p.categoryName ??
    p.category?.name ??
    p.category?.categoryName ??
    p.name ??
    ''
  ).toLowerCase();

  if (keywords && keywords.some((kw) => label.includes(kw))) {
    return true;
  }
  return label.includes(tabSlug.toLowerCase().replaceAll('-', ' '));
};
