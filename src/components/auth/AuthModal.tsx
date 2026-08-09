'use client';

import { useState } from 'react';
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal';
import { Icon } from '@/components/common/Icon';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
};

export function AuthModal(props: AuthModalProps) {
  const { isOpen, onClose, onLoginSuccess } = props;
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [accountInput, setAccountInput] = useState('0987654321');
  const [passwordInput, setPasswordInput] = useState('123456789');
  const [showPassword, setShowPassword] = useState(false);

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <button
          type="button"
          aria-label="Đóng popup đăng nhập"
          className="fixed inset-0 border-none bg-black/50 backdrop-blur-xs transition-opacity outline-none"
          onClick={onClose}
        />

        <div className="relative w-full max-w-md animate-in rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-2xl transition-all zoom-in-95 fade-in sm:p-8">
          <button
            type="button"
            aria-label="Đóng popup đăng nhập"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#EDF2F7] text-xs font-bold text-text-secondary transition-colors hover:bg-[#DBEAFE] hover:text-[#0F172A]"
          >
            <Icon name="x" size="sm" />
          </button>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A]">
              <Icon name="lock" size="lg" />
            </div>

            <h2 className="mt-4 text-2xl font-extrabold text-[#0F172A]">
              {activeTab === 'login' ? 'Đăng Nhập Thành Viên' : 'Đăng Ký Tài Khoản'}
            </h2>
            <p className="mt-1.5 text-xs text-text-secondary">
              Đăng nhập hoặc tạo tài khoản nhanh để lưu thông tin giao hàng &amp; tích lũy điểm
              thưởng.
            </p>
          </div>

          <div className="mt-6 flex rounded-full border border-[#E2E8F0] bg-[#EDF2F7] p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-[#1E3A8A] shadow-xs'
                  : 'text-text-secondary hover:text-[#0F172A]'
              }`}
            >
              <Icon name="lock" size="xs" />
              <span>Đăng Nhập</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-[#1E3A8A] shadow-xs'
                  : 'text-text-secondary hover:text-[#0F172A]'
              }`}
            >
              <Icon name="user" size="xs" />
              <span>Đăng Ký Mới</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="auth-account-input"
                className="block text-xs font-bold text-[#0F172A]"
              >
                Số điện thoại hoặc Email
              </label>
              <div className="relative mt-1.5">
                <input
                  id="auth-account-input"
                  type="text"
                  aria-label="Số điện thoại hoặc Email"
                  placeholder="Nhập số điện thoại hoặc email"
                  value={accountInput}
                  onChange={(e) => {
                    setAccountInput(e.target.value);
                  }}
                  className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-4 pl-10 text-xs font-bold text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
                />
                <Icon
                  name="phone"
                  size="sm"
                  className="absolute top-3.5 left-3.5 text-text-secondary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="auth-password-input"
                  className="block text-xs font-bold text-[#0F172A]"
                >
                  Mật khẩu
                </label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPasswordOpen(true);
                    }}
                    className="text-xs font-bold text-[#F97316] hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative mt-1.5">
                <input
                  id="auth-password-input"
                  type={showPassword ? 'text' : 'password'}
                  aria-label="Mật khẩu"
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                  }}
                  className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-10 pl-10 text-xs font-bold text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
                />
                <Icon
                  name="lock"
                  size="sm"
                  className="absolute top-3.5 left-3.5 text-text-secondary"
                />
                <button
                  type="button"
                  aria-label="Ẩn hiện mật khẩu"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute top-3.5 right-3.5 text-xs text-text-secondary hover:text-[#0F172A]"
                >
                  <Icon name={showPassword ? 'eye-off' : 'eye'} size="sm" />
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1E3A8A] py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#172554]"
              >
                <span>{activeTab === 'login' ? 'Đăng Nhập Ngay' : 'Tạo Tài Khoản Mới'}</span>
                <Icon name="arrow-right" size="sm" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="mt-4 text-xs text-text-secondary">
              Bạn là khách hàng mới?{' '}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                }}
                className="font-bold text-[#F97316] hover:underline"
              >
                Tạo tài khoản nhanh chỉ 5 giây
              </button>
            </p>
          </div>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => {
          setIsForgotPasswordOpen(false);
        }}
        onSuccessReturnLogin={() => {
          setActiveTab('login');
        }}
      />
    </>
  );
}
