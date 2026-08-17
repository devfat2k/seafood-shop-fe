export type ProductCardItem = {
  id: string | number;
  name: string;
  category: string;
  categorySlug?: string;
  badges?: string[];
  spec?: string;
  price: number;
  originalPrice?: number;
  unit?: string;
  image?: string;
  origin?: string;
  rating?: number;
  salesCount?: number;
  inStock?: boolean;
};

export type ProductCardProps<T extends ProductCardItem = ProductCardItem> = {
  product: T;
  viewMode?: 'grid' | 'list';
  onAddToCart?: (product: T) => void;
  onQuickView?: (product: T) => void;
};

export function getBadgeStyle(badge: string): { bg: string; text: string } {
  if (badge.includes('🟢') || badge.includes('Còn hàng') || badge.includes('TƯƠI SỐNG')) {
    return { bg: 'bg-tertiary/15 border-tertiary/30', text: 'text-tertiary' };
  }
  if (badge.includes('HOT') || badge.includes('BÁN CHẠY')) {
    return { bg: 'bg-primary/15 border-primary/30', text: 'text-primary' };
  }
  if (badge.includes('SALE') || badge.includes('Giảm') || badge.includes('Nổi bật')) {
    return { bg: 'bg-accent/20 border-accent/40', text: 'text-accent' };
  }
  return { bg: 'bg-secondary/15 border-secondary/30', text: 'text-secondary' };
}
