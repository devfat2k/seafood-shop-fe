'use client';

import { useState } from 'react';

export function AccountSecurityTab() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMsg('Vui lòng nhập đầy đủ các trường mật khẩu.');
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
    <div className="rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-[#E4E0D8] pb-4">
        <h1 className="text-2xl font-extrabold text-[#26312D]">Đổi Mật Khẩu</h1>
        <p className="mt-1 text-xs text-[#5B6B63]">
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
        <div>
          <label htmlFor="current-pass-input" className="block text-xs font-bold text-[#26312D]">
            Mật khẩu hiện tại
          </label>
          <input
            id="current-pass-input"
            type="password"
            aria-label="Mật khẩu hiện tại"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            className="mt-2 w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] px-4 py-3 text-xs text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="new-pass-input" className="block text-xs font-bold text-[#26312D]">
            Mật khẩu mới
          </label>
          <input
            id="new-pass-input"
            type="password"
            aria-label="Mật khẩu mới"
            placeholder="Mật khẩu ít nhất 8 ký tự"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            className="mt-2 w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] px-4 py-3 text-xs text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="confirm-pass-input" className="block text-xs font-bold text-[#26312D]">
            Xác nhận mật khẩu mới
          </label>
          <input
            id="confirm-pass-input"
            type="password"
            aria-label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="mt-2 w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] px-4 py-3 text-xs text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="rounded-full bg-[#0E3D34] px-8 py-3.5 text-xs font-bold text-white shadow transition-transform hover:scale-105 hover:bg-[#0B2F28]"
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}
