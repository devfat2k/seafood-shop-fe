'use client';

import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { useAdminCurrentUserQuery, useAdminLogoutMutation } from '@/libs/queries/admin/auth';
import { useEvictCacheMutation } from '@/libs/queries/admin/dashboard';

const PATH_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Tổng Quan Kinh Doanh',
  '/admin/products': 'Quản Lý Sản Phẩm',
  '/admin/categories': 'Quản Lý Danh Mục',
  '/admin/orders': 'Quản Lý Đơn Hàng',
  '/admin/users': 'Quản Lý Người Dùng',
  '/admin/content/banners': 'Nội Dung Hero Banners',
  '/admin/content/daily-arrivals': 'Hải Sản Cập Bến Hôm Nay',
  '/admin/rbac': 'Phân Quyền & Vai Trò (RBAC)',
};

type AdminTopBarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function AdminTopBar({ isCollapsed, onToggleCollapse }: AdminTopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useAdminCurrentUserQuery();
  const logoutMutation = useAdminLogoutMutation();
  const evictCacheMutation = useEvictCacheMutation();

  const title = PATH_TITLES[pathname] ?? 'Khu Vực Quản Trị';

  const handleEvictCache = async () => {
    try {
      await evictCacheMutation.mutateAsync();
      toast.success('Đã xóa sạch Redis Cache trang chủ thành công!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa cache');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success('Đã đăng xuất phiên quản trị');
      router.replace('/admin/login');
    } catch {
      router.replace('/admin/login');
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-md sm:px-6">
      {/* Left: Collapse toggle button & Page Title */}
      <div className="flex items-center gap-3">
        {isCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Mở rộng sidebar"
          >
            <Icon name="chevron-right" size="xs" />
          </button>
        )}
        <div className="flex flex-col">
          <h1 className="font-heading text-base font-bold text-foreground sm:text-lg">{title}</h1>
          <span className="hidden text-[11px] text-muted-foreground sm:inline-block">
            Bảng điều khiển & quản trị hệ thống
          </span>
        </div>
      </div>

      {/* Right: Quick actions, admin user badge, and logout */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => {
            void handleEvictCache();
          }}
          disabled={evictCacheMutation.isPending}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
          title="Xóa cache Redis trang chủ để cập nhật dữ liệu mới nhất"
        >
          <Icon
            name="sparkles"
            size="xs"
            className={evictCacheMutation.isPending ? 'animate-spin' : 'text-primary'}
          />
          <span className="hidden md:inline">Xóa Cache Home</span>
        </button>

        {/* User profile & Logout */}
        <div className="flex items-center gap-2 border-l border-border pl-2 sm:pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {user?.fullName?.slice(0, 1) ?? 'A'}
          </div>
          <div className="hidden flex-col text-left lg:flex">
            <span className="max-w-[120px] truncate text-xs font-semibold text-foreground">
              {user?.fullName ?? 'Quản trị viên'}
            </span>
            <span className="text-[10px] font-bold text-primary">ROLE_ADMIN</span>
          </div>

          <button
            type="button"
            onClick={() => {
              void handleLogout();
            }}
            disabled={logoutMutation.isPending}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            title="Đăng xuất quản trị"
            aria-label="Đăng xuất"
          >
            <Icon name="log-out" size="xs" />
          </button>
        </div>
      </div>
    </header>
  );
}
