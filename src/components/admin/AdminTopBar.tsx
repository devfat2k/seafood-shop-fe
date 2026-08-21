'use client';

import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAdminCurrentUserQuery, useAdminLogoutMutation } from '@/libs/queries/admin/auth';
import { useEvictCacheMutation } from '@/libs/queries/admin/dashboard';

const PATH_BREADCRUMBS: Record<string, { parent: string; title: string }> = {
  '/admin/dashboard': { parent: 'Hệ Thống', title: 'Tổng Quan Kinh Doanh' },
  '/admin/products': { parent: 'Kinh Doanh', title: 'Quản Lý Sản Phẩm' },
  '/admin/categories': { parent: 'Kinh Doanh', title: 'Quản Lý Danh Mục' },
  '/admin/orders': { parent: 'Kinh Doanh', title: 'Quản Lý Đơn Hàng' },
  '/admin/users': { parent: 'Hệ Thống', title: 'Quản Lý Người Dùng' },
  '/admin/content/banners': { parent: 'Nội Dung', title: 'Hero Banners' },
  '/admin/content/daily-arrivals': { parent: 'Nội Dung', title: 'Hải Sản Cập Bến Hôm Nay' },
  '/admin/rbac': { parent: 'Hệ Thống', title: 'Phân Quyền & Vai Trò (RBAC)' },
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

  const breadcrumb = PATH_BREADCRUMBS[pathname] ?? {
    parent: 'Khu Vực Quản Trị',
    title: 'Bảng Điều Khiển',
  };

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
      <div className="flex items-center gap-3">
        {isCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Mở rộng sidebar"
          >
            <Icon name="chevron-right" size="xs" />
          </button>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{breadcrumb.parent}</span>
            <Icon name="chevron-right" size="xs" className="text-muted-foreground/50" />
            <span className="font-semibold text-foreground">{breadcrumb.title}</span>
          </div>
          <h1 className="font-heading text-lg font-bold text-foreground sm:text-xl">
            {breadcrumb.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            void handleEvictCache();
          }}
          disabled={evictCacheMutation.isPending}
          className="h-9 gap-1.5 rounded-xl border-border bg-background px-3 text-xs font-semibold text-foreground shadow-xs hover:bg-muted"
          title="Xóa cache Redis trang chủ để cập nhật dữ liệu mới nhất"
        >
          <Icon
            name="sparkles"
            size="xs"
            className={evictCacheMutation.isPending ? 'animate-spin' : 'text-primary'}
          />
          <span className="hidden md:inline">Xóa Cache Redis</span>
        </Button>

        <div className="border-l border-border pl-2 sm:pl-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl border border-transparent p-1.5 text-left transition-colors hover:border-border hover:bg-muted/50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {user?.fullName?.slice(0, 1) ?? 'A'}
              </div>
              <div className="hidden flex-col lg:flex">
                <span className="max-w-[130px] truncate text-xs font-semibold text-foreground">
                  {user?.fullName ?? 'Quản trị viên'}
                </span>
                <span className="text-[10px] font-bold text-primary">ROLE_ADMIN</span>
              </div>
              <Icon
                name="chevron-down"
                size="xs"
                className="hidden text-muted-foreground sm:block"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold">{user?.fullName ?? 'Admin'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email ?? ''}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  window.open('/', '_blank');
                }}
                className="cursor-pointer gap-2 text-xs"
              >
                <Icon name="shopping-cart" size="xs" />
                <span>Xem Cửa Hàng</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  void handleLogout();
                }}
                disabled={logoutMutation.isPending}
                className="cursor-pointer gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <Icon name="log-out" size="xs" />
                <span>Đăng Xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
