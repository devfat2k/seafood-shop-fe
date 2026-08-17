'use client';

import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/common/Logo';
import { HeaderActions } from '@/components/layout/HeaderActions';
import { HeaderMobileMenu } from '@/components/layout/HeaderMobileMenu';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { HeaderSearch } from '@/components/layout/HeaderSearch';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { useCartStore } from '@/libs/stores/cart';

export function Header() {
  const pathname = usePathname();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const { isOpen: isCartOpen, closeCart } = useCartStore();
  const isCatalogOrSearchPage = pathname.endsWith('/products') || pathname.endsWith('/search');

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 shadow-xs backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
          {/* Left: Mobile Trigger + Logo + Desktop Nav */}
          <div className="flex items-center gap-3 sm:gap-8">
            <div className="flex items-center lg:hidden">
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

            <Link href="/">
              <Logo />
            </Link>

            <HeaderNav />
          </div>

          {/* Center / Search Bar for non-catalog pages */}
          {!isCatalogOrSearchPage && (
            <div className="hidden max-w-md flex-1 px-4 lg:block">
              <HeaderSearch
                isMobileOverlayOpen={isMobileSearchOpen}
                onCloseMobileOverlay={() => {
                  setIsMobileSearchOpen(false);
                }}
              />
            </div>
          )}

          {/* Header Right Actions */}
          <HeaderActions
            isCatalogOrSearchPage={isCatalogOrSearchPage}
            onOpenMobileSearch={() => {
              setIsMobileSearchOpen(true);
            }}
            onOpenAuthModal={() => {
              setIsAuthModalOpen(true);
            }}
          />
        </div>
      </header>

      {/* Global Slide-out Menus & Modals */}
      <HeaderMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => {
          setIsMobileMenuOpen(false);
        }}
        onOpenAuthModal={() => {
          setIsAuthModalOpen(true);
        }}
      />

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
        }}
      />
    </>
  );
}
