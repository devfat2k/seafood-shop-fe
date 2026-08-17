'use client';

import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/common/Logo';
import { navLinks } from '@/components/layout/HeaderNav';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { useCurrentUserQuery } from '@/libs/queries/auth';

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
        aria-label="Đóng menu di động"
      />

      {/* Slide-out Sheet */}
      <div className="fixed inset-y-0 left-0 flex max-w-full">
        <div className="relative w-screen max-w-xs animate-in bg-card p-6 shadow-2xl slide-in-from-left">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <Logo size="sm" />
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Đóng menu"
            >
              <Icon name="x" size="sm" />
            </button>
          </div>

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

          <div className="mt-8 border-t border-border pt-6">
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
