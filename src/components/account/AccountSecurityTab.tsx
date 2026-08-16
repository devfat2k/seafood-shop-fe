'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';

// Password strength calculation helper
function getPasswordStrength(pass: string) {
  if (!pass) {
    return { score: 0, label: '', color: 'bg-slate-200' };
  }
  let score = 0;
  if (pass.length >= 6) {
    score += 1;
  }
  if (pass.length >= 10) {
    score += 1;
  }
  if (/[A-Z]/u.test(pass)) {
    score += 1;
  }
  if (/[0-9]/u.test(pass)) {
    score += 1;
  }
  if (/[^A-Za-z0-9]/u.test(pass)) {
    score += 1;
  }

  if (score <= 2) {
    return { score: 33, label: 'Mật khẩu yếu', color: 'bg-red-500' };
  }
  if (score <= 4) {
    return { score: 66, label: 'Mật khẩu trung bình', color: 'bg-amber-500' };
  }
  return { score: 100, label: 'Mật khẩu mạnh', color: 'bg-emerald-500' };
}

export function AccountSecurityTab() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const strength = getPasswordStrength(newPassword);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMsg('Vui lòng nhập đầy đủ các trường mật khẩu.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Mật khẩu mới và xác nhận mật khẩu không trùng khớp.');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  return (
    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-xs sm:p-8">
      <div className="border-b border-[#E2E8F0] pb-4">
        <h1 className="text-2xl font-extrabold text-[#0F172A]">Đổi Mật Khẩu</h1>
        <p className="text-text-secondary mt-1 text-xs">
          Cập nhật mật khẩu để bảo vệ an toàn cho tài khoản cá nhân của bạn.
        </p>
      </div>

      {errorMsg && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-800">
          ⚠️ {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800">
          🔑 Đổi mật khẩu thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập sau.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-5">
        {/* Current Password */}
        <div>
          <label htmlFor="current-pass-input" className="block text-xs font-bold text-[#0F172A]">
            Mật khẩu hiện tại
          </label>
          <div className="relative mt-2">
            <input
              id="current-pass-input"
              type={showCurrentPass ? 'text' : 'password'}
              aria-label="Mật khẩu hiện tại"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-10 pl-4 text-xs font-bold text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setShowCurrentPass(!showCurrentPass);
              }}
              className="text-text-secondary absolute top-3.5 right-3.5 hover:text-[#0F172A]"
            >
              <Icon name={showCurrentPass ? 'eye-off' : 'eye'} size="sm" />
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="new-pass-input" className="block text-xs font-bold text-[#0F172A]">
            Mật khẩu mới
          </label>
          <div className="relative mt-2">
            <input
              id="new-pass-input"
              type={showNewPass ? 'text' : 'password'}
              aria-label="Mật khẩu mới"
              placeholder="Mật khẩu ít nhất 6 ký tự"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-10 pl-4 text-xs font-bold text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setShowNewPass(!showNewPass);
              }}
              className="text-text-secondary absolute top-3.5 right-3.5 hover:text-[#0F172A]"
            >
              <Icon name={showNewPass ? 'eye-off' : 'eye'} size="sm" />
            </button>
          </div>

          {/* Password Strength Meter */}
          {newPassword && (
            <div className="mt-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-secondary">Độ mạnh mật khẩu:</span>
                <span className="font-bold text-[#0F172A]">{strength.label}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label htmlFor="confirm-pass-input" className="block text-xs font-bold text-[#0F172A]">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative mt-2">
            <input
              id="confirm-pass-input"
              type={showConfirmPass ? 'text' : 'password'}
              aria-label="Xác nhận mật khẩu mới"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-10 pl-4 text-xs font-bold text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setShowConfirmPass(!showConfirmPass);
              }}
              className="text-text-secondary absolute top-3.5 right-3.5 hover:text-[#0F172A]"
            >
              <Icon name={showConfirmPass ? 'eye-off' : 'eye'} size="sm" />
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-full bg-[#1E3A8A] px-8 py-3.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-[#172554]"
          >
            <span>Cập Nhật Mật Khẩu</span>
            <Icon name="check" size="sm" />
          </button>
        </div>
      </form>
    </div>
  );
}
