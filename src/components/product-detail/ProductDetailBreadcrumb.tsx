import { Link } from '@/libs/I18nNavigation';

type ProductDetailBreadcrumbProps = {
  categoryName: string;
  categorySlug: string;
  productName: string;
};

export function ProductDetailBreadcrumb(props: ProductDetailBreadcrumbProps) {
  const { categoryName, categorySlug, productName } = props;

  return (
    <nav aria-label="Breadcrumb" className="border-b border-[#E4E0D8] bg-[#FBF8F3] py-4">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2 px-4 text-xs text-[#5B6B63] sm:px-6">
        <Link href="/" className="transition-colors hover:text-[#0E3D34]">
          Trang chủ
        </Link>
        <span>→</span>
        <Link href="/products" className="transition-colors hover:text-[#0E3D34]">
          Sản phẩm
        </Link>
        <span>→</span>
        <Link
          href={`/products?category=${categorySlug}`}
          className="transition-colors hover:text-[#0E3D34]"
        >
          {categoryName}
        </Link>
        <span>→</span>
        <span className="font-semibold text-[#26312D]">{productName}</span>
      </div>
    </nav>
  );
}
