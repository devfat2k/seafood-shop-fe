'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type ProductHeaderBannerProps = {
  totalProducts?: number;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
};

export function ProductHeaderBanner(props: ProductHeaderBannerProps) {
  const { totalProducts = 0, searchQuery = '', onSearchChange } = props;

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-foreground via-[#0F5A6E] to-secondary px-4 py-8 text-white sm:px-6 sm:py-12">
      {/* Decorative ocean light effects */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70">
          <Link href="/" className="transition-colors hover:text-white">
            Trang chủ
          </Link>
          <Icon name="chevron-right" size="xs" />
          <span className="font-semibold text-white">Tất cả hải sản tươi sống</span>
        </nav>

        {/* Title & Tagline */}
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
              <span>Cập cảng rạng sáng nay • Giao lạnh 2H tại TP.HCM</span>
            </div>
            <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Hải Sản Tươi Sống Phan Thiết
            </h1>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/80 sm:text-sm">
              Tuyển chọn hải sản đánh bắt tự nhiên từ bến cảng Phan Thiết, Bình Thuận. Hiện đang có{' '}
              <strong className="text-accent">{totalProducts} sản phẩm</strong> đạt chuẩn tươi sống
              bơi bể.
            </p>
          </div>

          {/* Quick Search Input inside Banner */}
          {onSearchChange && (
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                }}
                placeholder="Tìm tôm hùm, cua, cá, mực..."
                aria-label="Tìm kiếm hải sản"
                className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pr-4 pl-10 text-xs text-white placeholder-white/60 backdrop-blur-md transition-all focus:border-white focus:bg-white/20 focus:outline-none sm:text-sm"
              />
              <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-white/70">
                <Icon name="search" size="xs" />
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                  }}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <Icon name="x" size="xs" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
