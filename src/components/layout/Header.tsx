"use client";

import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Icon } from "@/components/common/Icon";
import { Logo } from "@/components/Logo";
import { Link } from "@/libs/I18nNavigation";

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-[#F8FAFC]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-semibold md:flex">
            <Link
              href="/"
              className="rounded-full bg-[#1E3A8A] px-4 py-2 text-white transition-colors hover:bg-[#172554]"
            >
              Trang Chủ
            </Link>
            <Link
              href="/products"
              className="rounded-full px-4 py-2 text-[#0F172A] transition-colors hover:bg-[#DBEAFE] hover:text-[#1E3A8A]"
            >
              Sản phẩm
            </Link>

            <Link
              href="/promotions"
              className="rounded-full px-4 py-2 text-[#0F172A] transition-colors hover:bg-[#DBEAFE] hover:text-[#1E3A8A]"
            >
              Khuyến mãi
            </Link>
            <Link
              href="/about"
              className="rounded-full px-4 py-2 text-[#0F172A] transition-colors hover:bg-[#DBEAFE] hover:text-[#1E3A8A]"
            >
              Liên hệ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <input
                type="text"
                aria-label="Tìm kiếm hải sản"
                placeholder="Tìm hải sản tươi sống..."
                className="w-56 rounded-full border border-[#E2E8F0] bg-[#EDF2F7] py-2 pr-4 pl-9 text-xs text-[#0F172A] placeholder-[#475569] transition-all focus:w-64 focus:border-[#1E3A8A] focus:outline-none"
              />
              <Icon
                name="search"
                size="sm"
                className="absolute top-2.5 left-3 text-text-secondary"
              />
            </div>

            <Link
              href="/cart"
              aria-label="Giỏ hàng"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A] transition-transform hover:scale-105"
            >
              <Icon name="shopping-bag" size="md" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-bold text-white">
                3
              </span>
            </Link>

            {isLoggedIn ? (
              <Link
                href="/account"
                aria-label="Tài khoản Nguyễn Văn A"
                className="flex items-center gap-2.5 rounded-full border border-[#1E3A8A]/30 bg-white py-1 pr-4 pl-1.5 shadow-sm transition-all hover:border-[#1E3A8A] hover:shadow-md"
              >
                {/* biome-ignore lint/performance/noImgElement: mock user avatar */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Nguyễn Văn A"
                  className="h-8 w-8 rounded-full border border-[#1E3A8A] object-cover"
                />
                <span className="text-xs font-extrabold text-[#0F172A]">
                  Nguyễn Văn A
                </span>
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
