'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href: string;
  iconName: string;
};

type NavGroup = {
  groupTitle: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    groupTitle: 'Tổng Quan',
    items: [{ label: 'Dashboard', href: '/admin/dashboard', iconName: 'grid' }],
  },
  {
    groupTitle: 'Kinh Doanh',
    items: [
      { label: 'Sản phẩm', href: '/admin/products', iconName: 'fish' },
      { label: 'Danh mục', href: '/admin/categories', iconName: 'list' },
      { label: 'Đơn hàng', href: '/admin/orders', iconName: 'shopping-bag' },
    ],
  },
  {
    groupTitle: 'Nội Dung & Tiếp Thị',
    items: [
      { label: 'Hero Banners', href: '/admin/content/banners', iconName: 'camera' },
      { label: 'Cập bến ngày', href: '/admin/content/daily-arrivals', iconName: 'clock' },
    ],
  },
  {
    groupTitle: 'Hệ Thống',
    items: [
      { label: 'Người dùng', href: '/admin/users', iconName: 'user' },
      { label: 'Phân quyền RBAC', href: '/admin/rbac', iconName: 'shield-check' },
    ],
  },
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
        'sticky top-0 z-30 flex h-screen flex-col border-r border-border bg-card shadow-xs transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {isCollapsed ? (
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Icon name="fish" size="sm" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Icon name="fish" size="sm" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold text-foreground">Seafood Shop</span>
              <span className="text-[11px] font-bold tracking-wider text-primary uppercase">
                Admin Portal
              </span>
            </div>
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

      <div className="flex-1 space-y-6 overflow-y-auto p-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.groupTitle} className="space-y-1.5">
            {!isCollapsed && (
              <p className="px-3 text-[11px] font-bold tracking-wider text-muted-foreground/70 uppercase">
                {group.groupTitle}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all',
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
                        isActive
                          ? 'text-white'
                          : 'text-muted-foreground group-hover:text-foreground',
                      )}
                    >
                      <Icon name={item.iconName} size="sm" />
                    </div>

                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
            isCollapsed && 'justify-center px-2',
          )}
          title={isCollapsed ? 'Mở Storefront' : undefined}
        >
          <Icon name="shopping-cart" size="sm" />
          {!isCollapsed && <span className="truncate">Xem Cửa Hàng</span>}
        </a>
      </div>
    </aside>
  );
}
