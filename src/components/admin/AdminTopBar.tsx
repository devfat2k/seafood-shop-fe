'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
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
  '/admin/dashboard': { parent: 'Hệ Thống', title: 'Bảng Điều Khiển' },
  '/admin/products': { parent: 'Kinh Doanh', title: 'Quản Lý Sản Phẩm' },
  '/admin/categories': { parent: 'Kinh Doanh', title: 'Quản Lý Danh Mục' },
  '/admin/orders': { parent: 'Kinh Doanh', title: 'Quản Lý Đơn Hàng' },
  '/admin/users': { parent: 'Hệ Thống', title: 'Quản Lý Người Dùng' },
  '/admin/content/banners': { parent: 'Nội Dung', title: 'Banner Quảng Cáo' },
  '/admin/content/daily-arrivals': { parent: 'Nội Dung', title: 'Hải Sản Mới Về Hôm Nay' },
  '/admin/rbac': { parent: 'Hệ Thống', title: 'Phân Quyền Người Dùng' },
  '/admin/system': { parent: 'Hệ Thống', title: 'Đồng Bộ & Trạng Thái Hệ Thống' },
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

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [evictConfirmOpen, setEvictConfirmOpen] = useState(false);

  const breadcrumb = PATH_BREADCRUMBS[pathname] ?? {
    parent: 'Khu Vực Quản Trị',
    title: 'Bảng Điều Khiển',
  };

  const handleEvictCache = async () => {
    try {
      await evictCacheMutation.mutateAsync();
      setEvictConfirmOpen(false);
      toast.success('Đã đồng bộ hiển thị lên trang chủ thành công!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể đồng bộ dữ liệu');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setLogoutConfirmOpen(false);
      toast.success('Đã đăng xuất phiên quản trị');
      router.replace('/admin/login');
    } catch {
      setLogoutConfirmOpen(false);
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
            setEvictConfirmOpen(true);
          }}
          disabled={evictCacheMutation.isPending}
          className="h-9 gap-1.5 rounded-xl border-border bg-background px-3 text-xs font-semibold text-foreground shadow-xs hover:bg-muted"
          title="Đồng bộ lại dữ liệu hiển thị mới nhất lên trang chủ cửa hàng"
        >
          <Icon
            name="sparkles"
            size="xs"
            className={evictCacheMutation.isPending ? 'animate-spin' : 'text-primary'}
          />
          <span className="hidden md:inline">Đồng bộ trang chủ</span>
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
                <span className="text-[10px] font-bold text-primary">Quản trị viên</span>
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
                  setLogoutConfirmOpen(true);
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

      <ConfirmDialog
        open={logoutConfirmOpen}
        onOpenChange={setLogoutConfirmOpen}
        title="Xác nhận đăng xuất quản trị"
        description="Bạn có chắc chắn muốn đăng xuất khỏi phiên làm việc quản trị này không?"
        confirmText="Đăng xuất"
        isLoading={logoutMutation.isPending}
        onConfirm={handleLogout}
      />

      <ConfirmDialog
        open={evictConfirmOpen}
        onOpenChange={setEvictConfirmOpen}
        title="Xác nhận đồng bộ hệ thống"
        description="Thao tác này sẽ làm mới cache toàn bộ danh mục, sản phẩm và trang chủ trên toàn hệ thống để khách hàng thấy ngay thay đổi. Bạn có muốn tiếp tục?"
        confirmText="Đồng bộ ngay"
        variant="default"
        isLoading={evictCacheMutation.isPending}
        onConfirm={handleEvictCache}
      />
    </header>
  );
}
