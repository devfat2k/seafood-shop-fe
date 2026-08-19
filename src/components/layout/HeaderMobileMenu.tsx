'use client';

import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/common/Logo';
import { navLinks } from '@/components/layout/HeaderNav';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { useCurrentUserQuery } from '@/libs/queries/auth';
import { hasAdminRole } from '@/utils/role';

type HeaderMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal: () => void;
};

export function HeaderMobileMenu({ isOpen, onClose, onOpenAuthModal }: HeaderMobileMenuProps) {
  const pathname = usePathname();
  const { data: currentUser } = useCurrentUserQuery();
  const isLoggedIn = Boolean(currentUser);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 animate-in cursor-default bg-black/60 backdrop-blur-xs transition-opacity fade-in"
        onClick={onClose}
        aria-label="Đóng menu"
      />

      {/* Menu Drawer */}
      <div className="fixed inset-y-0 right-0 flex w-full max-w-xs animate-in flex-col bg-card shadow-2xl duration-300 slide-in-from-right">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Đóng menu"
          >
            <Icon name="x" size="sm" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isCurrent =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                    isCurrent ? 'bg-secondary/15 text-secondary' : 'text-foreground hover:bg-muted',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="mt-6 border-t border-border pt-6">
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  href="/account"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                >
                  <Icon name="user" size="sm" className="text-secondary" />
                  Tài khoản của tôi
                </Link>
                <Link
                  href="/orders"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                >
                  <Icon name="truck" size="sm" className="text-tertiary" />
                  Đơn hàng của tôi
                </Link>
                {hasAdminRole(currentUser?.roles) && (
                  <a
                    href="/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/10"
                  >
                    <Icon name="settings" size="sm" className="text-primary" />
                    Quản trị (Admin)
                  </a>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuthModal();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                <Icon name="user" size="sm" />
                Đăng nhập / Đăng ký
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
