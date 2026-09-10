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
