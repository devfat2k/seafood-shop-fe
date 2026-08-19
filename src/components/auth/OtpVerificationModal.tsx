'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/libs/queries/auth';
import type { OtpPurpose, VerifyOtpResponse } from '@/types/auth';

type OtpVerificationModalProps = {
  isOpen: boolean;
  targetEmail: string;
  purpose: OtpPurpose;
  onClose: () => void;
  onSuccess: (data: VerifyOtpResponse) => void;
};

export function OtpVerificationModal({
  isOpen,
  targetEmail,
  purpose,
  onClose,
  onSuccess,
}: OtpVerificationModalProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const verifyOtpMutation = useVerifyOtpMutation();
  const resendOtpMutation = useResendOtpMutation();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isOpen) {
      setResendTimer(60);
      setOtp(['', '', '', '', '', '']);

      // Focus first input on modal open
      const focusTimeout = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);

      timer = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearTimeout(focusTimeout);
        if (timer) {
          clearInterval(timer);
        }
      };
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

  const triggerVerification = async (code: string) => {
    try {
      const res = await verifyOtpMutation.mutateAsync({
        email: targetEmail,
        otpCode: code,
        purpose,
      });

      toast.success(res.message || 'Xác thực OTP thành công!');
      onSuccess(res.data ?? {});
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Xác thực OTP thất bại';
      toast.error(msg);
    }
  };

  const handleChange = (index: number, value: string) => {
    const numericChar = value.replaceAll(/\D/gu, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = numericChar;
    setOtp(newOtp);

    if (numericChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify if last digit is typed and all 6 are filled
    const fullCode = newOtp.join('');
    if (fullCode.length === 6 && !newOtp.includes('')) {
      void triggerVerification(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().replaceAll(/\D/gu, '');
    if (pastedData.length === 0) {
      return;
    }

    const digits: string[] = [];
    for (let i = 0; i < Math.min(pastedData.length, 6); i += 1) {
      digits.push(pastedData.charAt(i));
    }
    const newOtp = [...otp];
    for (const [idx, digit] of digits.entries()) {
      if (idx < 6) {
        newOtp[idx] = digit;
      }
    }
    setOtp(newOtp);

    const focusIdx = Math.min(digits.length, 5);
    inputRefs.current[focusIdx]?.focus();

    if (digits.length === 6) {
      void triggerVerification(digits.join(''));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      toast.error('Vui lòng nhập đầy đủ 6 chữ số mã OTP');
      return;
    }
    await triggerVerification(fullOtp);
  };

  const handleResend = async () => {
    try {
      const res = await resendOtpMutation.mutateAsync({
        email: targetEmail,
        purpose,
      });
      toast.success(res.message || 'Mã OTP mới đã được gửi tới email của bạn!');
      setResendTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Không thể gửi lại mã OTP';
      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng popup OTP"
        className="fixed inset-0 h-full w-full border-none bg-black/60 backdrop-blur-xs transition-opacity outline-none"
      />

      <div className="relative z-10 w-full max-w-md animate-in overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl transition-all zoom-in-95 fade-in sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
          aria-label="Đóng"
        >
          <Icon name="x" size="sm" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary shadow-xs">
            <Icon name="shield-check" size="lg" />
          </div>

          <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Xác Thực Mã OTP</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Mã 6 chữ số đã được gửi tới{' '}
            <span className="font-semibold text-primary">{targetEmail}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => {
              const isFilled = Boolean(digit);
              return (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
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
                  className={`h-12 w-11 rounded-xl border-2 text-center font-heading text-lg font-bold transition-all focus:border-primary focus:bg-primary/5 focus:ring-4 focus:ring-primary/15 focus:outline-none sm:h-14 sm:w-12 ${
                    isFilled
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background text-foreground'
                  }`}
                />
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              disabled={verifyOtpMutation.isPending || otp.join('').length < 6}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
            >
              {verifyOtpMutation.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  <span>Đang xác thực...</span>
                </span>
              ) : (
                <>
                  <span>Xác Nhận OTP</span>
                  <Icon name="check" size="sm" />
                </>
              )}
            </button>

            <div className="pt-1 text-center">
              {resendTimer > 0 ? (
                <p className="text-xs text-muted-foreground">
                  Gửi lại mã sau{' '}
                  <span className="font-semibold text-secondary">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendOtpMutation.isPending}
                  className="text-xs font-semibold text-secondary transition-colors hover:underline disabled:opacity-50"
                >
                  {resendOtpMutation.isPending ? 'Đang gửi lại mã...' : 'Gửi lại mã OTP mới'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
