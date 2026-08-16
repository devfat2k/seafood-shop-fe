'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import type { CartItem } from '@/components/cart/CartDrawer';
import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { Link, usePathname, useRouter } from '@/libs/I18nNavigation';

const navLinks = [
  { id: 1, href: '/', label: 'Trang chủ' },
  { id: 2, href: '/products', label: 'Sản phẩm' },
  { id: 3, href: '/about', label: 'Liên hệ' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoggedIn] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'default-1',
      name: 'Tôm hùm bông Phan Thiết sống',
      price: 1_250_000,
      quantity: 1,
      image:
        'https://uxmagic.blob.core.windows.net/public/agent-images/seafood_lobster-1786786452432-vby77wgs26i.png',
      weight: '1 con (0.8 - 1kg)',
    },
  ]);

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (searchQuery.trim()) {
      setIsSearchOverlayOpen(false);
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 shadow-xs backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
          {/* Mobile Left: Hamburger menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(true);
              }}
              className="rounded-full p-2 text-foreground hover:bg-muted focus:outline-none"
              aria-label="Mở menu"
            >
              <Icon name="menu" size="md" />
            </button>
          </div>

          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 font-medium lg:flex">
            {navLinks.map((link) => {
              const isCurrent =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={cn(
                    'text-sm font-semibold transition-colors hover:text-primary',
                    isCurrent ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden w-72 items-center md:flex lg:w-80"
          >
            <input
              type="text"
              aria-label="Tìm kiếm sản phẩm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Tìm cua, tôm, mực, cá..."
              className="w-full rounded-full border border-border bg-background py-2 pr-4 pl-10 text-xs text-foreground transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute left-3 text-muted-foreground hover:text-foreground"
              aria-label="Tìm kiếm"
            >
              <Icon name="search" size="xs" />
            </button>
          </form>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => {
                setIsSearchOverlayOpen(true);
              }}
              className="rounded-full p-2 text-foreground hover:bg-muted md:hidden"
              aria-label="Mở tìm kiếm"
            >
              <Icon name="search" size="md" />
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(true);
              }}
              aria-label="Giỏ hàng"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-muted sm:h-10 sm:w-10"
            >
              <Icon name="shopping-cart" size="md" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-xs sm:h-5 sm:w-5">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Login / Profile Button */}
            {isLoggedIn ? (
              <Link
                href="/account"
                aria-label="Tài khoản cá nhân"
                className="flex items-center gap-2 rounded-full border border-secondary/30 bg-card py-1 pr-3 pl-1 shadow-xs transition-all hover:border-secondary hover:shadow-sm"
              >
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Khách hàng"
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
                <span className="hidden text-xs font-bold text-foreground sm:inline">
                  Tài khoản
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(true);
                }}
                className="rounded-lg border border-secondary bg-transparent px-3 py-1.5 text-xs font-bold text-secondary transition-all hover:bg-secondary/10 sm:px-4 sm:py-2 sm:text-sm"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. MOBILE HAMBURGER MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
            className="fixed inset-0 h-full w-full bg-black/60 backdrop-blur-xs transition-opacity"
            aria-label="Đóng menu"
          />

          <div className="fixed inset-y-0 left-0 flex w-4/5 max-w-xs flex-col bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-background p-4">
              <span className="font-heading text-sm font-bold text-foreground">Danh Mục Menu</span>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted"
                aria-label="Đóng menu"
              >
                <Icon name="x" size="sm" />
              </button>
            </div>

            <div className="flex items-center gap-3 border-b border-border bg-muted/40 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Icon name="user" size="md" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Xin chào quý khách!</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="text-left text-xs font-bold text-secondary hover:underline"
                >
                  Đăng nhập / Đăng ký
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const isCurrent =
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                        isCurrent
                          ? 'border-l-4 border-secondary bg-secondary/10 font-bold text-secondary'
                          : 'text-foreground hover:bg-muted',
                      )}
                    >
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* 4. MOBILE FULL-WIDTH SEARCH OVERLAY */}
      {isSearchOverlayOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-card lg:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-3 border-b border-border bg-background p-3"
          >
            <button
              type="button"
              onClick={() => {
                setIsSearchOverlayOpen(false);
              }}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted"
              aria-label="Đóng tìm kiếm"
            >
              <Icon name="arrow-left" size="md" />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                aria-label="Tìm kiếm sản phẩm trên mobile"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Tìm cua, tôm, mực, cá..."
                className="w-full rounded-full border border-border bg-card py-2 pr-4 pl-9 text-xs text-foreground focus:ring-2 focus:ring-secondary/20 focus:outline-none"
              />
              <Icon
                name="search"
                size="xs"
                className="absolute top-2.5 left-3 text-muted-foreground"
              />
            </div>
            <button type="submit" className="text-xs font-bold text-secondary">
              Tìm
            </button>
          </form>

          <div className="p-4">
            <p className="text-xs font-bold text-muted-foreground">Gợi ý tìm kiếm phổ biến:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Tôm hùm bông', 'Cua huỳnh đế', 'Mực lá mi nơ', 'Cá bớp cắt lát', 'Ốc hương'].map(
                (tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setIsSearchOverlayOpen(false);
                      router.push(`/products?q=${encodeURIComponent(tag)}`);
                    }}
                    className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground hover:border-secondary"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. CART DRAWER OVERLAY */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}
        initialItems={cartItems}
        onUpdateItems={(newItems) => {
          setCartItems(newItems);
        }}
      />

      {/* 6. AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
        }}
        onLoginSuccess={() => {
          setIsAuthModalOpen(false);
        }}
      />
    </>
  );
}
