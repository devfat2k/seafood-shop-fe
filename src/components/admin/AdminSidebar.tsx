'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href: string;
  iconName: string;
  badge?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Tổng quan', href: '/admin/dashboard', iconName: 'grid' },
  { label: 'Sản phẩm', href: '/admin/products', iconName: 'fish' },
  { label: 'Danh mục', href: '/admin/categories', iconName: 'list' },
  { label: 'Đơn hàng', href: '/admin/orders', iconName: 'shopping-bag' },
  { label: 'Người dùng', href: '/admin/users', iconName: 'user' },
  { label: 'Hero Banners', href: '/admin/content/banners', iconName: 'camera' },
  { label: 'Cập bến ngày', href: '/admin/content/daily-arrivals', iconName: 'clock' },
  { label: 'Phân quyền RBAC', href: '/admin/rbac', iconName: 'shield-check' },
];

type AdminSidebarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function AdminSidebar({ isCollapsed, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen flex-col border-r border-border bg-card transition-all duration-300 z-30',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Header / Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <Icon name="fish" size="sm" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm leading-tight font-bold text-foreground">
                Seafood Shop
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                Admin Panel
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
            <Icon name="fish" size="sm" />
          </div>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
            isCollapsed && 'hidden',
          )}
          aria-label={isCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          <Icon name="chevron-left" size="xs" />
        </button>
      </div>

      {/* Nav list */}
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all',
                isActive
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                isCollapsed && 'justify-center px-2',
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <div
                className={cn(
                  'flex items-center justify-center transition-transform group-hover:scale-110',
                  isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground',
                )}
              >
                <Icon name={item.iconName} size="sm" />
              </div>

              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Footer / Storefront link */}
      <div className="border-t border-border p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-3 rounded-xl border border-border/80 bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
            isCollapsed && 'justify-center px-2',
          )}
          title={isCollapsed ? 'Mở Storefront' : undefined}
        >
          <Icon name="shopping-cart" size="xs" />
          {!isCollapsed && <span className="truncate">Xem Cửa Hàng</span>}
        </a>
      </div>
    </aside>
  );
}
