import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

export default function LocaleNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/10 text-secondary shadow-xs">
          <Icon name="fish" size="xl" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-sm font-bold text-secondary">LỖI 404</span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Trang Không Tồn Tại
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Sản phẩm hoặc trang bạn tìm kiếm không còn khả dụng trên hệ thống.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-primary/90"
          >
            <Icon name="home" size="xs" />
            <span>Về Trang Chủ</span>
          </Link>
          <Link
            href="/products"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-2xs transition-colors hover:bg-muted"
          >
            <Icon name="grid" size="xs" />
            <span>Xem Hải Sản</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
