'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from '@/libs/queries/auth';
import type { ForgotPasswordRequest, ResetPasswordFormValues } from '@/types/auth';
import { forgotPasswordRequestSchema, resetPasswordFormSchema } from '@/validations/auth';

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
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [actionToken, setActionToken] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const forgotPasswordMutation = useForgotPasswordMutation();
  const verifyOtpMutation = useVerifyOtpMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  const emailForm = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordRequestSchema),
    defaultValues: { email: '' },
  });

  const passwordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

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
      const msg = error instanceof Error ? error.message : 'Không thể gửi mã khôi phục';
      toast.error(msg);
    }
  };

  const handleStep2OtpSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const fullOtp = otpCode.join('');
    if (fullOtp.length < 6) {
      toast.error('Vui lòng nhập đầy đủ 6 chữ số mã OTP');
      return;
    }

    try {
      const res = await verifyOtpMutation.mutateAsync({
        email: targetEmail,
        otpCode: fullOtp,
        purpose: 'RESET_PASSWORD',
      });

      if (!res.data?.actionToken) {
        toast.error('Mã xác thực không hợp lệ, vui lòng thử lại');
        return;
      }

      setActionToken(res.data.actionToken);
      toast.success('Xác thực OTP thành công! Vui lòng đặt mật khẩu mới.');
      setStep('NEW_PASSWORD');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Xác thực OTP thất bại';
      toast.error(msg);
    }
  };

  const handleStep3PasswordSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const res = await resetPasswordMutation.mutateAsync({
        actionToken,
        newPassword: data.newPassword,
      });
      toast.success(res.message || 'Đặt lại mật khẩu thành công!');
      setStep('SUCCESS');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Đặt lại mật khẩu thất bại';
      toast.error(msg);
    }
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (!/^\d*$/u.test(val)) {
      return;
    }
    const newOtp = [...otpCode];
    newOtp[index] = val.slice(-1);
    setOtpCode(newOtp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng popup quên mật khẩu"
        className="fixed inset-0 h-full w-full border-none bg-black/60 backdrop-blur-xs transition-opacity outline-none"
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl transition-all sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          aria-label="Đóng"
        >
          <Icon name="x" size="sm" />
        </button>

        <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
          <span className="font-heading text-xs font-bold text-foreground">Quên Mật Khẩu</span>
          <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[10px] font-bold text-secondary">
            {step === 'EMAIL' && 'Bước 1/3'}
            {step === 'OTP' && 'Bước 2/3'}
            {step === 'NEW_PASSWORD' && 'Bước 3/3'}
            {step === 'SUCCESS' && 'Hoàn tất'}
          </span>
        </div>

        {/* STEP 1: INPUT EMAIL */}
        {step === 'EMAIL' && (
          <form onSubmit={emailForm.handleSubmit(handleStep1Submit)} className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name="mail" size="md" />
              </div>
              <h3 className="mt-3 font-heading text-xl font-bold text-foreground">
                Khôi Phục Mật Khẩu
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Nhập email đăng ký tài khoản của bạn để nhận mã xác thực OTP.
              </p>
            </div>

            <div>
              <label htmlFor="forgot-email" className="block text-xs font-bold text-foreground">
                Địa chỉ Email
              </label>
              <div className="relative mt-1.5">
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="name@example.com"
                  {...emailForm.register('email')}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <Icon
                  name="mail"
                  size="sm"
                  className="absolute top-3 left-3 text-muted-foreground"
                />
              </div>
              {emailForm.formState.errors.email && (
                <p className="mt-1 text-[11px] font-medium text-destructive">
                  {emailForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {forgotPasswordMutation.isPending ? (
                <span>Đang gửi mã...</span>
              ) : (
                <>
                  <span>Gửi Mã Xác Thực OTP</span>
                  <Icon name="arrow-right" size="sm" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 'OTP' && (
          <form onSubmit={handleStep2OtpSubmit} className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Icon name="shield-check" size="md" />
              </div>
              <h3 className="mt-3 font-heading text-xl font-bold text-foreground">Nhập Mã OTP</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Mã xác nhận 6 số đã được gửi tới{' '}
                <span className="font-bold text-primary">{targetEmail}</span>
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
                  className="h-11 w-10 rounded-xl border-2 border-border bg-background text-center text-lg font-black text-foreground focus:border-primary focus:outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={verifyOtpMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-50"
            >
              {verifyOtpMutation.isPending ? (
                <span>Đang kiểm tra...</span>
              ) : (
                <>
                  <span>Xác Thực OTP &amp; Tiếp Tục</span>
                  <Icon name="arrow-right" size="sm" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 3: SET NEW PASSWORD */}
        {step === 'NEW_PASSWORD' && (
          <form
            onSubmit={passwordForm.handleSubmit(handleStep3PasswordSubmit)}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Icon name="lock" size="md" />
              </div>
              <h3 className="mt-3 font-heading text-xl font-bold text-foreground">
                Tạo Mật Khẩu Mới
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Vui lòng nhập mật khẩu mới tối thiểu 8 ký tự cho tài khoản của bạn.
              </p>
            </div>

            <div>
              <label htmlFor="new-pass" className="block text-xs font-bold text-foreground">
                Mật khẩu mới
              </label>
              <div className="relative mt-1.5">
                <input
                  id="new-pass"
                  type={showNewPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...passwordForm.register('newPassword')}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <Icon
                  name="lock"
                  size="sm"
                  className="absolute top-3 left-3 text-muted-foreground"
                />
                <button
                  type="button"
                  aria-label="Ẩn hiện mật khẩu mới"
                  onClick={() => {
                    setShowNewPass(!showNewPass);
                  }}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                >
                  <Icon name={showNewPass ? 'eye-off' : 'eye'} size="sm" />
                </button>
              </div>
              {passwordForm.formState.errors.newPassword && (
                <p className="mt-1 text-[11px] font-medium text-destructive">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirm-pass" className="block text-xs font-bold text-foreground">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative mt-1.5">
                <input
                  id="confirm-pass"
                  type={showConfirmPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...passwordForm.register('confirmPassword')}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <Icon
                  name="lock"
                  size="sm"
                  className="absolute top-3 left-3 text-muted-foreground"
                />
                <button
                  type="button"
                  aria-label="Ẩn hiện xác nhận mật khẩu"
                  onClick={() => {
                    setShowConfirmPass(!showConfirmPass);
                  }}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                >
                  <Icon name={showConfirmPass ? 'eye-off' : 'eye'} size="sm" />
                </button>
              </div>
              {passwordForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-[11px] font-medium text-destructive">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-50"
            >
              {resetPasswordMutation.isPending ? (
                <span>Đang lưu mật khẩu...</span>
              ) : (
                <>
                  <span>Cập Nhật Mật Khẩu</span>
                  <Icon name="check" size="sm" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'SUCCESS' && (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Icon name="check" size="xl" />
            </div>

            <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">
              Đổi Mật Khẩu Thành Công!
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Mật khẩu mới của bạn đã được cập nhật. Bạn có thể đăng nhập ngay bây giờ.
            </p>

            <button
              type="button"
              onClick={() => {
                onSuccessReturnLogin();
                onClose();
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-lg hover:bg-primary/90"
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
