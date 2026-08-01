'use client';

import { useState } from 'react';
import { MOCK_USER_PROFILE } from '@/data/account-mock';
import type { UserProfile } from '@/data/account-mock';

export function AccountProfileTab() {
  const [profile, setProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-[#E4E0D8] pb-4">
        <h1 className="text-2xl font-extrabold text-[#26312D]">Thông Tin Cá Nhân</h1>
        <p className="mt-1 text-xs text-[#5B6B63]">
          Cập nhật thông tin tài khoản cá nhân để trải nghiệm dịch vụ mua sắm tốt nhất.
        </p>
      </div>

      {savedSuccess && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800">
          ✅ Đã lưu thay đổi thông tin tài khoản thành công!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-20 w-20 rounded-full border-2 border-[#0E3D34] object-cover"
          />
          <div>
            <button
              type="button"
              onClick={() => {
                console.log('Tải ảnh đại diện mới');
              }}
              className="rounded-full border border-[#E4E0D8] bg-[#F5F1E8] px-4 py-2 text-xs font-bold text-[#26312D] transition-colors hover:bg-[#E4EEEA]"
            >
              📷 Tải ảnh mới
            </button>
            <p className="mt-1 text-[11px] text-[#5B6B63]">Dung lượng tối đa 2MB (JPG, PNG)</p>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Họ và tên */}
          <div>
            <label htmlFor="user-name-input" className="block text-xs font-bold text-[#26312D]">
              Họ và tên
            </label>
            <input
              id="user-name-input"
              type="text"
              aria-label="Họ và tên"
              value={profile.name}
              onChange={(e) => {
                setProfile({ ...profile, name: e.target.value });
              }}
              className="mt-2 w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] px-4 py-3 text-xs text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label htmlFor="user-phone-input" className="block text-xs font-bold text-[#26312D]">
              Số điện thoại
            </label>
            <input
              id="user-phone-input"
              type="text"
              aria-label="Số điện thoại"
              value={profile.phone}
              onChange={(e) => {
                setProfile({ ...profile, phone: e.target.value });
              }}
              className="mt-2 w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] px-4 py-3 text-xs text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="user-email-input" className="block text-xs font-bold text-[#26312D]">
              Email
            </label>
            <input
              id="user-email-input"
              type="email"
              aria-label="Địa chỉ email"
              value={profile.email}
              onChange={(e) => {
                setProfile({ ...profile, email: e.target.value });
              }}
              className="mt-2 w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] px-4 py-3 text-xs text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
            />
          </div>

          {/* Ngày sinh */}
          <div>
            <label
              htmlFor="user-birthdate-input"
              className="block text-xs font-bold text-[#26312D]"
            >
              Ngày sinh
            </label>
            <input
              id="user-birthdate-input"
              type="text"
              aria-label="Ngày sinh"
              value={profile.birthDate}
              onChange={(e) => {
                setProfile({ ...profile, birthDate: e.target.value });
              }}
              className="mt-2 w-full rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] px-4 py-3 text-xs text-[#26312D] focus:border-[#0E3D34] focus:outline-none"
            />
          </div>
        </div>

        {/* Giới tính */}
        <div>
          <span className="block text-xs font-bold text-[#26312D]">Giới tính</span>
          <div className="mt-2 flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs text-[#26312D]">
              <input
                type="radio"
                name="gender"
                aria-label="Giới tính Nam"
                checked={profile.gender === 'Nam'}
                onChange={() => {
                  setProfile({ ...profile, gender: 'Nam' });
                }}
                className="text-[#0E3D34] focus:ring-[#0E3D34]"
              />
              <span>Nam</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#26312D]">
              <input
                type="radio"
                name="gender"
                aria-label="Giới tính Nữ"
                checked={profile.gender === 'Nữ'}
                onChange={() => {
                  setProfile({ ...profile, gender: 'Nữ' });
                }}
                className="text-[#0E3D34] focus:ring-[#0E3D34]"
              />
              <span>Nữ</span>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="rounded-full bg-[#0E3D34] px-8 py-3.5 text-xs font-bold text-white shadow transition-transform hover:scale-105 hover:bg-[#0B2F28]"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
