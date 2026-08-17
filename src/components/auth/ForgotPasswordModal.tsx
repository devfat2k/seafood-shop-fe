'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ForgotPasswordEmailStep } from '@/components/auth/ForgotPasswordEmailStep';
import { ForgotPasswordNewPasswordStep } from '@/components/auth/ForgotPasswordNewPasswordStep';
import { ForgotPasswordOtpStep } from '@/components/auth/ForgotPasswordOtpStep';
import { ForgotPasswordSuccessStep } from '@/components/auth/ForgotPasswordSuccessStep';
import { Icon } from '@/components/common/Icon';
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from '@/libs/queries/auth';
import type { ForgotPasswordRequest, ResetPasswordFormValues } from '@/types/auth';

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessReturnLogin: () => void;
};

type WizardStep = 'EMAIL' | 'OTP' | 'NEW_PASSWORD' | 'SUCCESS';

export function ForgotPasswordModal({
  isOpen,
  onClose,
  onSuccessReturnLogin,
}: ForgotPasswordModalProps) {
  const [step, setStep] = useState<WizardStep>('EMAIL');
  const [targetEmail, setTargetEmail] = useState('');
  const [actionToken, setActionToken] = useState('');

  const forgotPasswordMutation = useForgotPasswordMutation();
  const verifyOtpMutation = useVerifyOtpMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  if (!isOpen) {
    return null;
  }

  const handleStep1Submit = async (data: ForgotPasswordRequest) => {
    try {
      const res = await forgotPasswordMutation.mutateAsync(data);
      toast.success(res.message || 'Mã OTP khôi phục đã được gửi tới email của bạn!');
      setTargetEmail(data.email);
      setStep('OTP');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Gửi mã OTP thất bại';
      toast.error(msg);
    }
  };

  const handleStep2Verify = async (code: string) => {
    try {
      const res = await verifyOtpMutation.mutateAsync({
        email: targetEmail,
        otpCode: code,
        purpose: 'RESET_PASSWORD',
      });
      toast.success('Xác thực OTP thành công!');
      if (res.data?.actionToken) {
        setActionToken(res.data.actionToken);
      }
      setStep('NEW_PASSWORD');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Xác thực OTP thất bại';
      toast.error(msg);
    }
  };

  const handleStep2Resend = async () => {
    try {
      await forgotPasswordMutation.mutateAsync({ email: targetEmail });
      toast.success('Đã gửi lại mã OTP khôi phục!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Gửi lại OTP thất bại';
      toast.error(msg);
    }
  };

  const handleStep3Reset = async (data: ResetPasswordFormValues) => {
    try {
      const res = await resetPasswordMutation.mutateAsync({
        newPassword: data.newPassword,
        actionToken,
      });
      toast.success(res.message || 'Đổi mật khẩu thành công!');
      setStep('SUCCESS');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Đổi mật khẩu thất bại';
      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="fixed inset-0 animate-in cursor-default bg-black/60 backdrop-blur-xs transition-opacity fade-in"
        onClick={onClose}
        aria-label="Đóng modal"
      />

      <div className="relative w-full max-w-md animate-in rounded-2xl border border-border bg-card p-6 shadow-2xl zoom-in-95 sm:p-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-heading text-lg font-bold text-foreground">
            {step === 'EMAIL' && 'Quên Mật Khẩu'}
            {step === 'OTP' && 'Xác Thực OTP'}
            {step === 'NEW_PASSWORD' && 'Đặt Lại Mật Khẩu'}
            {step === 'SUCCESS' && 'Thành Công'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Đóng modal"
          >
            <Icon name="x" size="sm" />
          </button>
        </div>

        <div className="mt-6">
          {step === 'EMAIL' && (
            <ForgotPasswordEmailStep
              onSubmit={handleStep1Submit}
              isPending={forgotPasswordMutation.isPending}
              onReturnLogin={onSuccessReturnLogin}
            />
          )}

          {step === 'OTP' && (
            <ForgotPasswordOtpStep
              targetEmail={targetEmail}
              onVerify={handleStep2Verify}
              onResend={handleStep2Resend}
              isVerifying={verifyOtpMutation.isPending}
              isResending={forgotPasswordMutation.isPending}
              onBack={() => {
                setStep('EMAIL');
              }}
            />
          )}

          {step === 'NEW_PASSWORD' && (
            <ForgotPasswordNewPasswordStep
              onSubmit={handleStep3Reset}
              isPending={resetPasswordMutation.isPending}
            />
          )}

          {step === 'SUCCESS' && <ForgotPasswordSuccessStep onReturnLogin={onSuccessReturnLogin} />}
        </div>
      </div>
    </div>
  );
}
