'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon';

type OtpVerificationModalProps = {
  isOpen: boolean;
  targetEmailOrPhone: string;
  onClose: () => void;
  onVerifySuccess: (otp: string) => void;
};

export function OtpVerificationModal({
  isOpen,
  targetEmailOrPhone,
  onClose,
  onVerifySuccess,
}: OtpVerificationModalProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend code
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isOpen) {
      setResendTimer(60);
      setErrorMsg(null);
      setOtp(['', '', '', '', '', '']);

      timer = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/u.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMsg(null);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/u.test(pastedData)) {
      setErrorMsg('Mã OTP phải gồm 6 chữ số');
      return;
    }

    // eslint-disable-next-line unicorn/prefer-spread
    const digits = pastedData.split('');
    setOtp(digits);
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setErrorMsg('Vui lòng nhập đầy đủ 6 chữ số OTP');
      return;
    }

    onVerifySuccess(fullOtp);
  };

  const handleResend = () => {
    setResendTimer(60);
    setOtp(['', '', '', '', '', '']);
    setErrorMsg(null);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng popup OTP"
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

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A]">
            <Icon name="shield-check" size="lg" />
          </div>

          <h2 className="mt-4 text-2xl font-extrabold text-[#0F172A]">Xác Thực Mã OTP</h2>
          <p className="mt-2 text-xs text-text-secondary">
            Mã xác thực 6 chữ số đã được gửi tới{' '}
            <span className="font-bold text-[#1E3A8A]">
              {targetEmailOrPhone || 'email/số điện thoại'}
            </span>
          </p>
        </div>

        {errorMsg && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-center text-xs font-bold text-red-700">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  handleChange(index, e.target.value);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(index, e);
                }}
                onPaste={handlePaste}
                aria-label={`Chữ số OTP thứ ${index + 1}`}
                className="h-12 w-11 rounded-2xl border-2 border-[#E2E8F0] bg-[#F8FAFC] text-center text-lg font-black text-[#0F172A] transition-all focus:border-[#1E3A8A] focus:bg-white focus:outline-none sm:h-14 sm:w-12"
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1E3A8A] py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#172554]"
            >
              <span>Xác Nhận OTP</span>
              <Icon name="check" size="sm" />
            </button>

            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-xs text-text-secondary">
                  Gửi lại mã sau <span className="font-bold text-[#F97316]">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-xs font-bold text-[#F97316] hover:underline"
                >
                  Gửi lại mã OTP mới
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
