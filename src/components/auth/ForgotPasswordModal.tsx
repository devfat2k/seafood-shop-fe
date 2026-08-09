'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessReturnLogin: () => void;
};

type WizardStep = 'EMAIL' | 'OTP' | 'NEW_PASSWORD' | 'SUCCESS';

function getStepBadgeText(step: WizardStep): string {
  if (step === 'EMAIL') {
    return 'Bước 1/3';
  }
  if (step === 'OTP') {
    return 'Bước 2/3';
  }
  if (step === 'NEW_PASSWORD') {
    return 'Bước 3/3';
  }
  return 'Hoàn tất';
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
  onSuccessReturnLogin,
}: ForgotPasswordModalProps) {
  const [step, setStep] = useState<WizardStep>('EMAIL');
  const [emailOrPhone, setEmailOrPhone] = useState('khachhang@gmail.com');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleStep1Submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setErrorMsg('Vui lòng nhập Email hoặc Số điện thoại');
      return;
    }
    setErrorMsg(null);
    setStep('OTP');
  };

  const handleStep2OtpSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const fullOtp = otpCode.join('');
    if (fullOtp.length < 6) {
      setErrorMsg('Vui lòng nhập đủ 6 chữ số mã OTP');
      return;
    }
    setErrorMsg(null);
    setStep('NEW_PASSWORD');
  };

  const handleStep3PasswordSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setErrorMsg('Vui lòng nhập đầy đủ hai trường mật khẩu');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Mật khẩu mới và xác nhận mật khẩu không trùng khớp');
      return;
    }

    setErrorMsg(null);
    setStep('SUCCESS');
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (!/^\d*$/u.test(val)) {
      return;
    }
    const newOtp = [...otpCode];
    newOtp[index] = val.slice(-1);
    setOtpCode(newOtp);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng popup quên mật khẩu"
        className="fixed inset-0 h-full w-full bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#EDF2F7] text-text-secondary hover:bg-[#DBEAFE] hover:text-[#0F172A]"
          aria-label="Đóng"
        >
          <Icon name="x" size="sm" />
        </button>

        {/* Wizard Steps Progress Indicator */}
        <div className="mb-6 flex items-center justify-between border-b border-[#F1F5F9] pb-4">
          <span className="text-xs font-extrabold text-[#1E3A8A]">Quên Mật Khẩu</span>
          <span className="rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[10px] font-bold text-[#1E3A8A]">
            {getStepBadgeText(step)}
          </span>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-center text-xs font-bold text-red-700">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* STEP 1: INPUT EMAIL / PHONE */}
        {step === 'EMAIL' && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A]">
                <Icon name="mail" size="md" />
              </div>
              <h3 className="mt-3 text-xl font-extrabold text-[#0F172A]">Khôi Phục Mật Khẩu</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Nhập email hoặc số điện thoại đăng ký tài khoản của bạn để nhận mã xác thực OTP
              </p>
            </div>

            <div>
              <label
                htmlFor="forgot-email-input"
                className="block text-xs font-bold text-[#0F172A]"
              >
                Email hoặc Số điện thoại
              </label>
              <div className="relative mt-1.5">
                <input
                  id="forgot-email-input"
                  type="text"
                  aria-label="Email hoặc Số điện thoại"
                  placeholder="khachhang@gmail.com"
                  value={emailOrPhone}
                  onChange={(e) => {
                    setEmailOrPhone(e.target.value);
                  }}
                  className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-4 pl-10 text-xs font-bold text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
                />
                <Icon
                  name="mail"
                  size="sm"
                  className="absolute top-3.5 left-3.5 text-text-secondary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1E3A8A] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#172554]"
            >
              <span>Gửi Mã Xác Thực OTP</span>
              <Icon name="arrow-right" size="sm" />
            </button>
          </form>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 'OTP' && (
          <form onSubmit={handleStep2OtpSubmit} className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A]">
                <Icon name="shield-check" size="md" />
              </div>
              <h3 className="mt-3 text-xl font-extrabold text-[#0F172A]">Nhập Mã OTP</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Mã xác nhận 6 số đã được gửi tới{' '}
                <span className="font-bold text-[#1E3A8A]">{emailOrPhone}</span>
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    handleOtpDigitChange(idx, e.target.value);
                  }}
                  aria-label={`Chữ số ${idx + 1}`}
                  className="h-11 w-10 rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] text-center text-lg font-black text-[#0F172A] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1E3A8A] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#172554]"
            >
              <span>Xác Thực OTP &amp; Tiếp Tục</span>
              <Icon name="arrow-right" size="sm" />
            </button>
          </form>
        )}

        {/* STEP 3: SET NEW PASSWORD */}
        {step === 'NEW_PASSWORD' && (
          <form onSubmit={handleStep3PasswordSubmit} className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFEDD5] text-[#EA580C]">
                <Icon name="lock" size="md" />
              </div>
              <h3 className="mt-3 text-xl font-extrabold text-[#0F172A]">Tạo Mật Khẩu Mới</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Vui lòng nhập mật khẩu mới cho tài khoản của bạn
              </p>
            </div>

            <div>
              <label htmlFor="new-pass-field" className="block text-xs font-bold text-[#0F172A]">
                Mật khẩu mới
              </label>
              <div className="relative mt-1.5">
                <input
                  id="new-pass-field"
                  type={showNewPass ? 'text' : 'password'}
                  aria-label="Mật khẩu mới"
                  placeholder="••••••••••••"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
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
                    setShowNewPass(!showNewPass);
                  }}
                  className="absolute top-3.5 right-3.5 text-text-secondary hover:text-[#0F172A]"
                >
                  <Icon name={showNewPass ? 'eye-off' : 'eye'} size="sm" />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-pass-field"
                className="block text-xs font-bold text-[#0F172A]"
              >
                Xác nhận mật khẩu mới
              </label>
              <div className="relative mt-1.5">
                <input
                  id="confirm-pass-field"
                  type={showConfirmPass ? 'text' : 'password'}
                  aria-label="Xác nhận mật khẩu mới"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
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
                    setShowConfirmPass(!showConfirmPass);
                  }}
                  className="absolute top-3.5 right-3.5 text-text-secondary hover:text-[#0F172A]"
                >
                  <Icon name={showConfirmPass ? 'eye-off' : 'eye'} size="sm" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1E3A8A] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#172554]"
            >
              <span>Cập Nhật Mật Khẩu</span>
              <Icon name="check" size="sm" />
            </button>
          </form>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'SUCCESS' && (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Icon name="check" size="xl" />
            </div>

            <h3 className="mt-4 text-2xl font-black text-[#0F172A]">Đổi Mật Khẩu Thành Công!</h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              Mật khẩu mới của bạn đã được cập nhật. Bạn có thể sử dụng mật khẩu mới để đăng nhập
              ngay bây giờ.
            </p>

            <button
              type="button"
              onClick={() => {
                onSuccessReturnLogin();
                onClose();
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1E3A8A] py-3.5 text-xs font-bold text-white shadow-lg hover:bg-[#172554]"
            >
              <span>Quay Lại Đăng Nhập</span>
              <Icon name="arrow-right" size="sm" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
