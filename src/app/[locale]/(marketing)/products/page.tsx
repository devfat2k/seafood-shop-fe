import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { ProductCatalogContainer } from '@/components/products/ProductCatalogContainer';
import { getCategories } from '@/libs/api/categories';
import { getProducts } from '@/libs/api/products';

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    category?: string;
    search?: string;
    q?: string;
    page?: string;
  }>;
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
  const searchParamsObj = await props.searchParams;
  setRequestLocale(locale);

  const query = searchParamsObj?.q ?? searchParamsObj?.search;
  if (query) {
    redirect(`/${locale}/search?q=${encodeURIComponent(query)}`);
  }

  let initialProducts = null;
  let initialCategories = null;

  try {
    const [productsRes, categoriesRes] = await Promise.allSettled([
      getProducts({ page: 0, size: 9, sort: 'createdAt,desc' }),
      getCategories(),
    ]);

    if (productsRes.status === 'fulfilled') {
      initialProducts = productsRes.value;
    }
    if (categoriesRes.status === 'fulfilled') {
      initialCategories = categoriesRes.value;
    }
  } catch (error) {
    console.error('Failed to load initial products/categories on server:', error);
  }

  return (
    <ProductCatalogContainer
      initialPageData={initialProducts ?? undefined}
      initialCategories={initialCategories ?? undefined}
    />
  );
}
