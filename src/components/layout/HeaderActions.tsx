'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { useCurrentUserQuery, useLogoutMutation } from '@/libs/queries/auth';
import { useCartStore } from '@/libs/stores/cart';

type HeaderActionsProps = {
  isCatalogOrSearchPage: boolean;
  onOpenMobileSearch: () => void;
  onOpenAuthModal: () => void;
};

export function HeaderActions({
  isCatalogOrSearchPage,
  onOpenMobileSearch,
  onOpenAuthModal,
}: HeaderActionsProps) {
  const { data: currentUser } = useCurrentUserQuery();
  const logoutMutation = useLogoutMutation();
  const { totalCount, openCart } = useCartStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const user = currentUser;
  const isLoggedIn = Boolean(user);
  const isAdmin = user?.roles?.includes('ROLE_ADMIN');

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await logoutMutation.mutateAsync();
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Mobile Search Toggle */}
      {!isCatalogOrSearchPage && (
        <button
          type="button"
          onClick={onOpenMobileSearch}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Mở tìm kiếm"
        >
          <Icon name="search" size="sm" />
        </button>
      )}

      {/* Cart Button with badge */}
      <button
        type="button"
        onClick={openCart}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Giỏ hàng"
      >
        <Icon name="shopping-bag" size="sm" />
        {totalCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-xs">
            {totalCount > 99 ? '99+' : totalCount}
          </span>
        )}
      </button>

      {/* User Account / Auth Actions */}
      {isLoggedIn && user ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsUserMenuOpen((prev) => !prev);
            }}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/15 text-secondary">
              <Icon name="user" size="xs" />
            </div>
            <span className="max-w-[100px] truncate">{user.fullName || 'Tài khoản'}</span>
            <Icon name="chevron-down" size="xs" />
          </button>

          {isUserMenuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => {
                  setIsUserMenuOpen(false);
                }}
                aria-label="Đóng menu"
              />
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                <Link
                  href="/account"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <Icon name="user" size="xs" />
                  <span>Trang cá nhân</span>
                </Link>

                <Link
                  href="/account?tab=orders"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <Icon name="truck" size="xs" />
                  <span>Đơn mua của tôi</span>
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10"
                  >
                    <Icon name="settings" size="xs" />
                    <span>Quản trị (Admin)</span>
                  </Link>
                )}

                <div className="my-1 border-t border-border" />

                <button
                  type="button"
                  onClick={() => {
                    void handleLogout();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10"
                >
                  <Icon name="log-out" size="xs" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="rounded-xl border border-border px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-muted"
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="hidden rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-90 sm:block"
          >
            Đăng Ký
          </button>
        </div>
      )}
    </div>
  );
}
