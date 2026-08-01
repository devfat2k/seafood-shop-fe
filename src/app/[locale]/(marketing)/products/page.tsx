import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductCatalogContainer } from '@/components/products/ProductCatalogContainer';

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ProductsPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: 'Danh Sách Hải Sản Tươi Ngon — Hải Sản Phan Thiết',
    description: t('meta_description'),
  };
}

export default async function ProductsPage(props: ProductsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <ProductCatalogContainer />;
}
