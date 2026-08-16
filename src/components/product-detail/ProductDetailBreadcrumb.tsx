import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type ProductDetailBreadcrumbProps = {
  categoryName: string;
  categorySlug: string;
  productName: string;
};

export function ProductDetailBreadcrumb(props: ProductDetailBreadcrumbProps) {
  const { categoryName, categorySlug, productName } = props;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm"
    >
      <Link href="/" className="transition-colors hover:text-primary">
        Trang chủ
      </Link>
      <Icon name="chevron-right" size="xs" />
      <Link href="/products" className="transition-colors hover:text-primary">
        Sản phẩm
      </Link>
      <Icon name="chevron-right" size="xs" />
      <Link
        href={`/products?category=${categorySlug}`}
        className="transition-colors hover:text-primary"
      >
        {categoryName}
      </Link>
      <Icon name="chevron-right" size="xs" />
      <span className="font-semibold text-foreground">{productName}</span>
    </nav>
  );
}
