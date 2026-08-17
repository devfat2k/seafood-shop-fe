'use client';

import { useState } from 'react';
import { AuthLoginForm } from '@/components/auth/AuthLoginForm';
import { AuthRegisterForm } from '@/components/auth/AuthRegisterForm';
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal';
import { OtpVerificationModal } from '@/components/auth/OtpVerificationModal';
import { Icon } from '@/components/common/Icon';
import type { VerifyOtpResponse } from '@/types/auth';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

export function AuthModal(props: AuthModalProps) {
  const { isOpen, onClose, onLoginSuccess } = props;
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [otpModalState, setOtpModalState] = useState<{
    isOpen: boolean;
    email: string;
  }>({
    isOpen: false,
    email: '',
  });

  if (!isOpen) {
    return null;
  }

  const handleLoginSuccess = () => {
    onLoginSuccess?.();
    onClose();
  };

  const handleRegisterSuccess = (email: string) => {
    setOtpModalState({ isOpen: true, email });
  };

  const handleRequireVerification = (email: string) => {
    setOtpModalState({ isOpen: true, email });
  };

  const handleOtpVerifySuccess = (_data: VerifyOtpResponse) => {
    setOtpModalState({ isOpen: false, email: '' });
    onLoginSuccess?.();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <button
          type="button"
          aria-label="Đóng popup đăng nhập"
          className="fixed inset-0 border-none bg-black/60 backdrop-blur-xs transition-opacity outline-none"
          onClick={onClose}
        />

        <div className="relative w-full max-w-md animate-in rounded-3xl border border-border bg-card p-6 shadow-2xl transition-all zoom-in-95 fade-in sm:p-8">
          <button
            type="button"
            aria-label="Đóng popup đăng nhập"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
          >
            <Icon name="x" size="sm" />
          </button>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon name="lock" size="lg" />
            </div>

            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">
              {activeTab === 'login' ? 'Đăng Nhập Thành Viên' : 'Đăng Ký Tài Khoản'}
            </h2>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Đăng nhập để theo dõi đơn hàng, lưu sổ địa chỉ &amp; nhận ưu đãi thành viên.
            </p>
          </div>

          <div className="mt-6 flex rounded-full border border-border bg-muted/50 p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all ${
                activeTab === 'login'
                  ? 'bg-background text-primary shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
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
                  ? 'bg-background text-primary shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="user" size="xs" />
              <span>Đăng Ký Mới</span>
            </button>
          </div>

          <div className="mt-6">
            {activeTab === 'login' ? (
              <AuthLoginForm
                onSuccess={handleLoginSuccess}
                onRequireVerification={handleRequireVerification}
                onOpenForgotPassword={() => {
                  setIsForgotPasswordOpen(true);
                }}
              />
            ) : (
              <AuthRegisterForm onRegisterSuccess={handleRegisterSuccess} />
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              {activeTab === 'login' ? 'Bạn là khách hàng mới? ' : 'Đã có tài khoản? '}
              <button
                type="button"
                onClick={() => {
                  setActiveTab(activeTab === 'login' ? 'register' : 'login');
                }}
                className="font-bold text-secondary hover:underline"
              >
                {activeTab === 'login' ? 'Tạo tài khoản nhanh' : 'Đăng nhập ngay'}
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

      <OtpVerificationModal
        isOpen={otpModalState.isOpen}
        targetEmail={otpModalState.email}
        purpose="REGISTER_VERIFICATION"
        onClose={() => {
          setOtpModalState({ isOpen: false, email: '' });
        }}
        onSuccess={handleOtpVerifySuccess}
      />
    </>
  );
}
