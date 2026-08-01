'use client';

import { useState } from 'react';
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

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Lớp phông làm mờ Backdrop */}
      <button
        type="button"
        aria-label="Đóng popup đăng nhập"
        className="fixed inset-0 border-none bg-black/50 backdrop-blur-sm transition-opacity outline-none"
        onClick={onClose}
      />

      {/* Khung Popup Content */}
      <div className="relative w-full max-w-md animate-in rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-2xl transition-all zoom-in-95 fade-in sm:p-8">
        {/* Nút đóng ✕ */}
        <button
          type="button"
          aria-label="Đóng popup đăng nhập"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F1E8] text-xs font-bold text-[#5B6B63] transition-colors hover:bg-[#E4EEEA] hover:text-[#26312D]"
        >
          <Icon name="x" size="sm" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EEEA] text-[#0E3D34]">
            <Icon name="lock" size="lg" />
          </div>

          <h2 className="mt-4 text-2xl font-extrabold text-[#26312D]">
            {activeTab === 'login' ? 'Đăng Nhập Thành Viên' : 'Đăng Ký Tài Khoản'}
          </h2>
          <p className="mt-1.5 text-xs text-[#5B6B63]">
            Đăng nhập hoặc tạo tài khoản nhanh để lưu thông tin giao hàng &amp; tích lũy điểm
            thưởng.
          </p>
        </div>

        {/* Tab Switcher Segmented Control */}
        <div className="mt-6 flex rounded-full border border-[#E4E0D8] bg-[#F5F1E8] p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
            }}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all ${
              activeTab === 'login'
                ? 'bg-white text-[#0E3D34] shadow-sm'
                : 'text-[#5B6B63] hover:text-[#26312D]'
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
                ? 'bg-white text-[#0E3D34] shadow-sm'
                : 'text-[#5B6B63] hover:text-[#26312D]'
            }`}
          >
            <Icon name="user" size="xs" />
            <span>Đăng Ký Mới</span>
          </button>
        </div>

        {/* Form Đăng Nhập / Đăng Ký */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Số điện thoại hoặc Email */}
          <div>
            <label htmlFor="auth-account-input" className="block text-xs font-bold text-[#26312D]">
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
                className="w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] py-3 pr-4 pl-10 text-xs font-bold text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
              />
              <Icon name="phone" size="sm" className="absolute top-3.5 left-3.5 text-[#5B6B63]" />
            </div>
          </div>

          {/* Mật khẩu */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="auth-password-input"
                className="block text-xs font-bold text-[#26312D]"
              >
                Mật khẩu
              </label>
              {activeTab === 'login' && (
                <button
                  type="button"
                  onClick={() => {
                    console.log('Quên mật khẩu');
                  }}
                  className="text-xs font-bold text-[#C4922F] hover:underline"
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
                className="w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] py-3 pr-10 pl-10 text-xs font-bold text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
              />
              <Icon name="lock" size="sm" className="absolute top-3.5 left-3.5 text-[#5B6B63]" />
              <button
                type="button"
                aria-label="Ẩn hiện mật khẩu"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute top-3.5 right-3.5 text-xs text-[#5B6B63] hover:text-[#26312D]"
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size="sm" />
              </button>
            </div>
          </div>

          {/* Submit CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0E3D34] py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#0B2F28]"
            >
              <span>{activeTab === 'login' ? 'Đăng Nhập Ngay' : 'Tạo Tài Khoản Mới'}</span>
              <Icon name="arrow-right" size="sm" />
            </button>
          </div>
        </form>

        {/* Phần Tiếp Tục Nhanh */}
        <div className="mt-6 text-center">
          <div className="relative flex items-center justify-center border-t border-[#E4E0D8] pt-4">
            <span className="bg-white px-3 text-[10px] font-bold tracking-wider text-[#5B6B63] uppercase">
              HOẶC TIẾP TỤC NHANH
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onLoginSuccess();
              onClose();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#E4E0D8] bg-white py-3 text-xs font-bold text-[#26312D] shadow-sm transition-all hover:bg-[#F5F1E8]"
          >
            <span>👤 Mua hàng không cần tài khoản</span>
          </button>

          <p className="mt-4 text-xs text-[#5B6B63]">
            Bạn là khách hàng mới?{' '}
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
              }}
              className="font-bold text-[#C4922F] hover:underline"
            >
              Tạo tài khoản nhanh chỉ 5 giây
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
