import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductDetailContainer } from '@/components/product-detail/ProductDetailContainer';
import { getProduct } from '@/libs/api/products';
import type { Product } from '@/types/api';

type ProductDetailPageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata(props: ProductDetailPageProps): Promise<Metadata> {
  const { id, locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  try {
    const product = await getProduct(id);
    if (product?.name) {
      return {
        title: `${product.name} — Hải Sản Phan Thiết Tươi Sống`,
        description: product.description ?? t('meta_description'),
      };
    }
  } catch {
    // fallback
  }

  return {
    title: 'Chi Tiết Sản Phẩm — Hải Sản Phan Thiết',
    description: t('meta_description'),
  };
}

export default async function ProductDetailPage(props: ProductDetailPageProps) {
  const { id, locale } = await props.params;
  setRequestLocale(locale);

  let initialProduct: Product | undefined;
  try {
    initialProduct = await getProduct(id);
  } catch (error) {
    console.error(`Failed to fetch product ${id} on server:`, error);
  }

  return <ProductDetailContainer productId={id} initialProduct={initialProduct} />;
}
