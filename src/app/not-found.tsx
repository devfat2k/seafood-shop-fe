import Link from 'next/link';
import { Icon } from '@/components/common/Icon';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-xs">
          <Icon name="compass" size="xl" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-sm font-bold text-primary">LỖI 404</span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Không Tìm Thấy Trang Yêu Cầu
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Đường dẫn bạn đang truy cập không tồn tại, đã bị xóa hoặc phiên làm việc đã kết thúc.
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
            href="/admin/login"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-2xs transition-colors hover:bg-muted"
          >
            <Icon name="shield" size="xs" />
            <span>Đăng Nhập Quản Trị</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
