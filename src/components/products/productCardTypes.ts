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
  const upper = badge.toUpperCase();
  if (upper.includes('TẠM HẾT') || upper.includes('HẾT HÀNG')) {
    return { bg: 'bg-muted/90 border-border', text: 'text-muted-foreground' };
  }
  if (upper.includes('NỔI BẬT') || upper.includes('HOT') || upper.includes('BÁN CHẠY')) {
    return { bg: 'bg-accent/15 border-accent/30', text: 'text-accent' };
  }
  if (upper.includes('GIẢM') || upper.includes('SALE')) {
    return { bg: 'bg-primary/15 border-primary/30', text: 'text-primary' };
  }
  return { bg: 'bg-secondary/15 border-secondary/30', text: 'text-secondary' };
}
