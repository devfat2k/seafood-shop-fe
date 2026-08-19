'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon';

type ForgotPasswordOtpStepProps = {
  targetEmail: string;
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  isVerifying: boolean;
  isResending: boolean;
  onBack: () => void;
};

export function ForgotPasswordOtpStep({
  targetEmail,
  onVerify,
  onResend,
  isVerifying,
  isResending,
  onBack,
}: ForgotPasswordOtpStepProps) {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleOtpChange = (index: number, rawVal: string) => {
    const val = rawVal.replaceAll(/\D/gu, '').slice(-1);
    const next = [...otpCode];
    next[index] = val;
    setOtpCode(next);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = next.join('');
    if (fullCode.length === 6 && !next.includes('')) {
      void onVerify(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpCode[index] && index > 0) {
        const next = [...otpCode];
        next[index - 1] = '';
        setOtpCode(next);
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
    if (!pastedData) {
      return;
    }

    const digits: string[] = [];
    for (let i = 0; i < Math.min(pastedData.length, 6); i += 1) {
      digits.push(pastedData.charAt(i));
    }
    const next = [...otpCode];
    for (const [idx, digit] of digits.entries()) {
      if (idx < 6) {
        next[idx] = digit;
      }
    }
    setOtpCode(next);

    const focusIdx = Math.min(digits.length, 5);
    inputRefs.current[focusIdx]?.focus();

    if (digits.length === 6) {
      void onVerify(digits.join(''));
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const fullCode = otpCode.join('');
    if (fullCode.length === 6) {
      void onVerify(fullCode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-center text-xs text-muted-foreground">
        Mã OTP 6 số đã được gửi tới{' '}
        <span className="font-semibold text-primary">{targetEmail}</span>
      </p>

      <div className="flex justify-center gap-2 sm:gap-2.5">
        {otpCode.map((digit, idx) => {
          const isFilled = Boolean(digit);
          return (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              aria-label={`Ký tự OTP thứ ${idx + 1}`}
              onChange={(e) => {
                handleOtpChange(idx, e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(idx, e);
              }}
              onPaste={handlePaste}
              className={`h-12 w-10 rounded-xl border-2 text-center font-heading text-base font-bold transition-all focus:border-primary focus:bg-primary/5 focus:ring-4 focus:ring-primary/15 focus:outline-none sm:h-13 sm:w-11 ${
                isFilled
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-background text-foreground'
              }`}
            />
          );
        })}
      </div>

      <button
        type="submit"
        disabled={isVerifying || otpCode.join('').length < 6}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
      >
        {isVerifying ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            <span>Đang xác thực...</span>
          </span>
        ) : (
          <>
            <span>Xác Thực OTP</span>
            <Icon name="check" size="xs" />
          </>
        )}
      </button>

      <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={onBack}
          className="font-medium transition-colors hover:text-foreground"
        >
          Đổi email khác
        </button>
        <button
          type="button"
          onClick={() => {
            void onResend();
          }}
          disabled={isResending}
          className="font-semibold text-secondary transition-colors hover:underline disabled:opacity-50"
        >
          {isResending ? 'Đang gửi lại...' : 'Gửi lại mã'}
        </button>
      </div>
    </form>
  );
}
