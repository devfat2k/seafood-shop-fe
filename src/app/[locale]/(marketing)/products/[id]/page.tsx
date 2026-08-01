import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductDetailContainer } from '@/components/product-detail/ProductDetailContainer';
import { PRODUCT_DETAIL_DATA } from '@/data/product-detail-mock';

type ProductDetailPageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata(props: ProductDetailPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: `${PRODUCT_DETAIL_DATA.name} — Hải Sản Phan Thiết`,
    description: t('meta_description'),
  };
}

export default async function ProductDetailPage(props: ProductDetailPageProps) {
  const { id, locale } = await props.params;
  setRequestLocale(locale);

  return <ProductDetailContainer productId={id} />;
}
