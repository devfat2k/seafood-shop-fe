'use client';

import { useState } from 'react';
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

  const handleOtpChange = (index: number, rawVal: string) => {
    const val = rawVal.length > 1 ? rawVal.slice(-1) : rawVal;
    const next = [...otpCode];
    next[index] = val;
    setOtpCode(next);

    if (val && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(`#fp-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(`#fp-otp-${index - 1}`);
      prevInput?.focus();
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
        <span className="font-semibold text-foreground">{targetEmail}</span>
      </p>

      <div className="flex justify-center gap-2">
        {otpCode.map((digit, idx) => (
          <input
            key={idx}
            id={`fp-otp-${idx}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            aria-label={`Ký tự OTP thứ ${idx + 1}`}
            onChange={(e) => {
              handleOtpChange(idx, e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(idx, e);
            }}
            className="h-12 w-10 rounded-xl border border-border bg-background text-center font-mono text-base font-bold text-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isVerifying || otpCode.some((d) => !d)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isVerifying ? 'Đang xác thực...' : 'Xác thực OTP'}
        <Icon name="check" size="xs" />
      </button>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button type="button" onClick={onBack} className="font-medium hover:text-foreground">
          Đổi email khác
        </button>
        <button
          type="button"
          onClick={() => {
            void onResend();
          }}
          disabled={isResending}
          className="font-semibold text-secondary hover:underline disabled:opacity-50"
        >
          {isResending ? 'Đang gửi lại...' : 'Gửi lại mã'}
        </button>
      </div>
    </form>
  );
}
