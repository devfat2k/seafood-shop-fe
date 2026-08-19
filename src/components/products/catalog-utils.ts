import type { ProductCardItem } from '@/components/products/productCardTypes';
import type { QuickViewProduct } from '@/components/products/QuickViewModal';
import type { Category, Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

export const getProductBadges = (p: Product): string[] => {
  if (p.featured) {
    return ['NỔI BẬT'];
  }
  if ((p.stock ?? 0) > 0) {
    return ['TƯƠI SỐNG'];
  }
  return ['TẠM HẾT'];
};

export const getCategoryInfo = (p: Product): { name: string; slug: string } => {
  const name = p.category?.categoryName ?? p.category?.name ?? p.categoryName ?? 'Hải Sản';
  const slug = p.category?.slug ?? p.categorySlug ?? '';
  return { name, slug };
};

export const mapProductToCardItem = (p: Product): ProductCardItem => {
  const cat = getCategoryInfo(p);
  const price = p.price ?? 0;
  const originalPrice = p.originalPrice ?? Math.round(price * 1.15);
  const image = p.imageUrl ?? p.images?.[0] ?? '';

  return {
    id: p.id,
    name: p.name,
    category: cat.name,
    categorySlug: cat.slug,
    badges: getProductBadges(p),
    spec: p.spec ?? p.description ?? '',
    price,
    originalPrice,
    unit: p.unit ?? 'kg',
    origin: p.origin ?? 'Cảng cá Phan Thiết',
    rating: p.rating ?? 4.9,
    salesCount: p.reviewCount ?? 120,
    inStock: (p.active ?? true) && (p.stock ?? 0) > 0,
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
  badge: p.badges?.[0] ?? 'CẢNG PHAN THIẾT',
  price: formatCurrency(p.price),
  originalPrice: p.originalPrice ? formatCurrency(p.originalPrice) : undefined,
  rating: p.rating ?? 4.9,
  reviewsCount: p.salesCount ?? 120,
  origin: p.origin ?? 'Cảng cá Phan Thiết',
  description: p.spec ?? 'Hải sản tươi sống loại 1 cập bến mỗi sáng.',
  image: p.image ?? '',
  weights: p.unit ? [`1 ${p.unit}`, `2 ${p.unit}`] : ['500g', '1kg'],
});
