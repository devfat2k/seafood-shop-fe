'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type HomePageErrorProps = {
  message?: string;
  onRetry: () => void;
};

export function HomePageError({ message, onRetry }: HomePageErrorProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 text-destructive shadow-xs">
        <Icon name="alert-triangle" size="lg" />
      </div>

      <h2 className="mt-5 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        Không thể kết nối đến máy chủ
      </h2>

      <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {message ??
          'Hệ thống đang gặp sự cố khi kết nối dữ liệu từ bến cảng Phan Thiết. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.'}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95 sm:text-sm"
        >
          <Icon name="refresh-cw" size="xs" />
          <span>Thử kết nối lại</span>
        </button>

        <Link
          href="/"
          className="rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold text-foreground transition-all hover:bg-muted sm:text-sm"
        >
          Tải lại trang
        </Link>
      </div>
    </div>
  );
}
