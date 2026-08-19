import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductCatalogContainer } from '@/components/products/ProductCatalogContainer';
import { getCategories } from '@/libs/api/categories';
import type { ProductListParams } from '@/libs/api/products';
import { getProducts } from '@/libs/api/products';

type SearchParamsInput = {
  category?: string;
  categoryId?: string;
  search?: string;
  q?: string;
  page?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
};

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<SearchParamsInput>;
};

function parseProductParams(raw?: SearchParamsInput): {
  apiParams: ProductListParams;
  initialCategory?: string;
  initialSearch?: string;
  initialPage: number;
  initialSort: string;
} {
  const search = raw?.search ?? raw?.q;
  const category = raw?.category ?? raw?.categoryId;
  const pageNumber = raw?.page ? Math.max(0, Number(raw.page) - 1) : 0;
  const sort = raw?.sort ?? 'createdAt,desc';
  const minPrice = raw?.minPrice ? Number(raw.minPrice) : undefined;
  const maxPrice = raw?.maxPrice ? Number(raw.maxPrice) : undefined;
  const inStock = raw?.inStock === 'true' ? true : undefined;

  const parsedCatId = category ? Number(category) : undefined;
  const categoryId = !Number.isNaN(parsedCatId) && parsedCatId ? parsedCatId : undefined;

  return {
    apiParams: {
      page: pageNumber,
      size: 9,
      sort,
      search,
      categoryId,
      minPrice,
      maxPrice,
      inStock,
    },
    initialCategory: category,
    initialSearch: search,
    initialPage: pageNumber + 1,
    initialSort: sort,
  };
}

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

  const parsed = parseProductParams(searchParamsObj);

  let initialProducts = null;
  let initialCategories = null;

  try {
    const [productsRes, categoriesRes] = await Promise.allSettled([
      getProducts(parsed.apiParams),
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
      initialCategory={parsed.initialCategory}
      initialSearch={parsed.initialSearch}
      initialPage={parsed.initialPage}
      initialSort={parsed.initialSort}
    />
  );
}
