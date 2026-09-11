import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

export function CheckoutEmptyCart() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/15 text-secondary">
        <Icon name="shopping-cart" size="xl" />
      </div>
      <h1 className="mt-6 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        Giỏ Hàng Đang Trống
      </h1>
      <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
        Chưa có hải sản nào trong giỏ hàng. Hãy chọn các loại tôm, cua, cá tươi ngon vừa cập bến hôm
        nay!
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:opacity-90"
      >
        <Icon name="fish" size="sm" />
        <span>Khám Phá Hải Sản Tươi Sống</span>
      </Link>
    </div>
  );
}
