import type { ProductCardItem } from '@/components/products/productCardTypes';
import type { QuickViewProduct } from '@/components/products/QuickViewModal';
import type { Category, Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';
import { normalizeImageUrl } from '@/utils/image';

export const isProductInStock = (p: Product): boolean => {
  if (p.active !== undefined && p.active !== null && !p.active) {
    return false;
  }
  if (p.isActive !== undefined && p.isActive !== null && !p.isActive) {
    return false;
  }
  if (p.inStock !== undefined && p.inStock !== null && !p.inStock) {
    return false;
  }
  if (typeof p.stock === 'number' && p.stock <= 0) {
    return false;
  }
  return true;
};

export const getProductBadges = (p: Product): string[] => {
  const badges: string[] = [];
  if (!isProductInStock(p)) {
    badges.push('TẠM HẾT');
    return badges;
  }
  if (p.featured || p.isFeatured) {
    badges.push('NỔI BẬT');
  }
  if (p.tags && p.tags.length > 0) {
    for (const tag of p.tags) {
      if (tag && tag !== 'TẠM HẾT' && !badges.includes(tag)) {
        badges.push(tag);
      }
    }
  }
  return badges;
};

export const getCategoryInfo = (p: Product): { name: string; slug: string } => {
  const name = p.category?.categoryName ?? p.category?.name ?? p.categoryName ?? '';
  const slug = p.category?.slug ?? p.categorySlug ?? '';
  return { name, slug };
};

const getProductRating = (p: Product): number | undefined => {
  if (p.rating && p.rating > 0) {
    return p.rating;
  }
  if (p.averageRating && p.averageRating > 0) {
    return p.averageRating;
  }
  return undefined;
};

export const mapProductToCardItem = (p: Product): ProductCardItem => {
  const cat = getCategoryInfo(p);
  const price = p.price ?? 0;
  const originalPrice = p.originalPrice && p.originalPrice > price ? p.originalPrice : undefined;
  const image = normalizeImageUrl(p.imageUrl ?? p.images?.[0] ?? '');
  const rating = getProductRating(p);
  const salesCount = p.reviewCount && p.reviewCount > 0 ? p.reviewCount : undefined;

  return {
    id: p.id,
    name: p.name,
    category: cat.name,
    categorySlug: cat.slug,
    badges: getProductBadges(p),
    spec: p.spec ?? undefined,
    price,
    originalPrice,
    unit: p.unit ?? undefined,
    origin: p.origin ?? undefined,
    rating,
    salesCount,
    inStock: isProductInStock(p),
    image,
  };
};

export const resolveCategoryIds = (
  categoryKeys: string[],
  categories: Category[],
): number[] | undefined => {
  if (categoryKeys.length === 0) {
    return undefined;
  }
  const ids: number[] = [];
  for (const key of categoryKeys) {
    const parsed = Number(key);
    if (!Number.isNaN(parsed) && parsed > 0) {
      ids.push(parsed);
    } else {
      const found = categories.find((c) => c.slug === key);
      if (found) {
        ids.push(found.id);
      }
    }
  }
  return ids.length > 0 ? ids : undefined;
};

export const mapToQuickView = (p: ProductCardItem): QuickViewProduct => ({
  id: String(p.id),
  name: p.name,
  badge: p.badges?.[0],
  price: formatCurrency(p.price),
  originalPrice: p.originalPrice ? formatCurrency(p.originalPrice) : undefined,
  rating: p.rating,
  reviewsCount: p.salesCount,
  origin: p.origin,
  description: p.spec,
  image: p.image ?? '',
  weights: p.unit ? [`1 ${p.unit}`, `2 ${p.unit}`] : undefined,
});
