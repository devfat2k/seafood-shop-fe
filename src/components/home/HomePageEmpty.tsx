'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type HomePageEmptyProps = {
  onRefresh: () => void;
};

export function HomePageEmpty({ onRefresh }: HomePageEmptyProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary/10 text-secondary shadow-xs">
        <Icon name="fish" size="lg" />
      </div>

      <h2 className="mt-5 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        Hải sản tươi sống đang cập bến
      </h2>

      <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Hệ thống đang chuẩn bị các mẻ cá tôm mới nhất từ tàu biển Phan Thiết. Vui lòng bấm làm mới
        hoặc khám phá danh mục sản phẩm sẵn có.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-xs font-bold text-secondary-foreground shadow-md transition-all hover:bg-secondary/90 active:scale-95 sm:text-sm"
        >
          <Icon name="refresh-cw" size="xs" />
          <span>Làm mới dữ liệu</span>
        </button>

        <Link
          href="/products"
          className="rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold text-foreground transition-all hover:bg-muted sm:text-sm"
        >
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  );
}
