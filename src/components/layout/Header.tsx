'use client';

import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { Logo } from '@/components/Logo';
import { Link } from '@/libs/I18nNavigation';

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E4E0D8] bg-[#FBF8F3]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 sm:px-6">
          {/* TRÁI: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* GIỮA: Navigation links */}
          <nav className="hidden items-center gap-1 text-sm font-semibold md:flex">
            <Link
              href="/"
              className="rounded-full bg-[#0E3D34] px-4 py-2 text-white transition-colors hover:bg-[#0B2F28]"
            >
              Trang chủ
            </Link>
            <Link
              href="/products"
              className="rounded-full px-4 py-2 text-[#26312D] transition-colors hover:bg-[#E4EEEA] hover:text-[#0E3D34]"
            >
              Sản phẩm
            </Link>
            <Link
              href="/products?category=set-combo"
              className="rounded-full px-4 py-2 text-[#26312D] transition-colors hover:bg-[#E4EEEA] hover:text-[#0E3D34]"
            >
              Set Tiệc BBQ
            </Link>
            <Link
              href="/promotions"
              className="rounded-full px-4 py-2 text-[#26312D] transition-colors hover:bg-[#E4EEEA] hover:text-[#0E3D34]"
            >
              Khuyến mãi
            </Link>
            <Link
              href="/about"
              className="rounded-full px-4 py-2 text-[#26312D] transition-colors hover:bg-[#E4EEEA] hover:text-[#0E3D34]"
            >
              Về chúng tôi
            </Link>
          </nav>

          {/* PHẢI: Search + Cart + Account User Pill / Login Button */}
          <div className="flex items-center gap-3">
            {/* ô tìm kiếm */}
            <div className="relative hidden lg:block">
              <input
                type="text"
                aria-label="Tìm kiếm hải sản"
                placeholder="Tìm hải sản tươi sống..."
                className="w-56 rounded-full border border-[#E4E0D8] bg-[#F5F1E8] py-2 pr-4 pl-9 text-xs text-[#26312D] placeholder-[#5B6B63] transition-all focus:w-64 focus:border-[#0E3D34] focus:outline-none"
              />
              <svg
                className="absolute top-2.5 left-3 h-4 w-4 text-[#5B6B63]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Cart Icon + Badge (3) */}
            <Link
              href="/cart"
              aria-label="Giỏ hàng"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#E4EEEA] text-[#0E3D34] transition-transform hover:scale-105"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D9A441] text-[10px] font-bold text-white">
                3
              </span>
            </Link>

            {/* User Login Button OR User Profile Pill */}
            {isLoggedIn ? (
              <Link
                href="/account"
                aria-label="Tài khoản Nguyễn Văn A"
                className="flex items-center gap-2.5 rounded-full border border-[#0E3D34]/30 bg-white py-1 pr-4 pl-1.5 shadow-sm transition-all hover:border-[#0E3D34] hover:shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Nguyễn Văn A"
                  className="h-8 w-8 rounded-full border border-[#0E3D34] object-cover"
                />
                <span className="text-xs font-extrabold text-[#26312D]">Nguyễn Văn A</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-full border border-[#E4E0D8] bg-white px-4 py-2 text-xs font-bold text-[#26312D] transition-colors hover:border-[#0E3D34] hover:text-[#0E3D34]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal Popup Overlay */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
        }}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
        }}
      />
    </>
  );
}
