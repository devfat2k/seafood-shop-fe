'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { Link } from '@/libs/I18nNavigation';

const navLinks = [
  { id: 1, href: '/', label: 'Trang Chủ' },
  { id: 2, href: '/products', label: 'Sản phẩm' },
  { id: 3, href: '/promotions', label: 'Khuyến mãi' },
  { id: 4, href: '/about', label: 'Liên hệ' },
];

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>(1);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-[#F8FAFC]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-semibold md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setIsActive(link.id);
                }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-[#0F172A] transition-colors hover:bg-brand-900 hover:text-white',
                    isActive === link.id ? 'bg-brand-900 text-white' : '',
                  )}
                >
                  {link.label}
                </Link>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <input
                type="text"
                aria-label="Tìm kiếm hải sản"
                placeholder="Tìm hải sản tươi sống..."
                className="w-56 rounded-full border border-[#E2E8F0] bg-[#EDF2F7] py-2 pr-4 pl-9 text-xs text-[#0F172A] placeholder-text-secondary transition-all focus:w-64 focus:border-[#1E3A8A] focus:outline-none"
              />
              <Icon
                name="search"
                size="sm"
                className="absolute top-2.5 left-3 text-text-secondary"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setIsCartOpen(true);
              }}
              aria-label="Giỏ hàng"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A] transition-transform hover:scale-105"
            >
              <Icon name="shopping-bag" size="md" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-bold text-white">
                2
              </span>
            </button>

            {isLoggedIn ? (
              <Link
                href="/account"
                aria-label="Tài khoản Nguyễn Văn A"
                className="flex items-center gap-2.5 rounded-full border border-[#1E3A8A]/30 bg-white py-1 pr-4 pl-1.5 shadow-xs transition-all hover:border-[#1E3A8A] hover:shadow-md"
              >
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Nguyễn Văn A"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="text-xs font-extrabold text-[#0F172A]">Nguyễn Văn A</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-bold text-[#0F172A] transition-colors hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
              >
                <Icon name="user" size="sm" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
        }}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}
      />
    </>
  );
}
