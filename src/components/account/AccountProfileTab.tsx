'use client';

import { useState } from 'react';
import type { UserProfile } from '@/types/user';

type AccountProfileTabProps = {
  profile?: UserProfile | null;
  onSaveProfile?: (updated: Partial<UserProfile>) => void;
};

export function AccountProfileTab(props: AccountProfileTabProps) {
  const { profile: initialProfile, onSaveProfile } = props;

  const [profile, setProfile] = useState<Partial<UserProfile>>({
    fullName: initialProfile?.fullName ?? '',
    phone: initialProfile?.phoneNumber ?? '',
    email: initialProfile?.email ?? '',
    birthDate: initialProfile?.birthDate ?? '',
    gender: initialProfile?.gender ?? 'Nam',
    avatarUrl: initialProfile?.avatarUrl ?? '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (onSaveProfile) {
      onSaveProfile(profile);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-[#E2E8F0] pb-4">
        <h1 className="text-2xl font-extrabold text-[#0F172A]">Thông Tin Cá Nhân</h1>
        <p className="mt-1 text-xs text-text-secondary">
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
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName ?? ''}
              className="h-20 w-20 rounded-full border-2 border-[#1E3A8A] object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E3A8A] text-2xl font-extrabold text-white">
              {(profile.fullName ?? 'U').slice(0, 1)}
            </div>
          )}
          <div>
            <button
              type="button"
              onClick={() => {
                console.log('Tải ảnh đại diện mới');
              }}
              className="rounded-full border border-[#E2E8F0] bg-[#EDF2F7] px-4 py-2 text-xs font-bold text-[#0F172A] transition-colors hover:bg-[#DBEAFE]"
            >
              📷 Tải ảnh mới
            </button>
            <p className="mt-1 text-[11px] text-text-secondary">Dung lượng tối đa 2MB (JPG, PNG)</p>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Họ và tên */}
          <div>
            <label htmlFor="user-name-input" className="block text-xs font-bold text-[#0F172A]">
              Họ và tên
            </label>
            <input
              id="user-name-input"
              type="text"
              aria-label="Họ và tên"
              value={profile.fullName ?? ''}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label htmlFor="user-phone-input" className="block text-xs font-bold text-[#0F172A]">
              Số điện thoại
            </label>
            <input
              id="user-phone-input"
              type="text"
              aria-label="Số điện thoại"
              value={profile.phoneNumber ?? profile.phone ?? ''}
              onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="user-email-input" className="block text-xs font-bold text-[#0F172A]">
              Email
            </label>
            <input
              id="user-email-input"
              type="email"
              aria-label="Địa chỉ email"
              value={profile.email ?? ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          {/* Ngày sinh */}
          <div>
            <label
              htmlFor="user-birthdate-input"
              className="block text-xs font-bold text-[#0F172A]"
            >
              Ngày sinh
            </label>
            <input
              id="user-birthdate-input"
              type="text"
              aria-label="Ngày sinh"
              value={profile.birthDate ?? ''}
              onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>
        </div>

        {/* Giới tính */}
        <div>
          <span className="block text-xs font-bold text-[#0F172A]">Giới tính</span>
          <div className="mt-2 flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs text-[#0F172A]">
              <input
                type="radio"
                name="gender"
                aria-label="Giới tính Nam"
                checked={profile.gender === 'Nam'}
                onChange={() => setProfile({ ...profile, gender: 'Nam' })}
                className="text-[#1E3A8A] focus:ring-[#1E3A8A]"
              />
              <span>Nam</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#0F172A]">
              <input
                type="radio"
                name="gender"
                aria-label="Giới tính Nữ"
                checked={profile.gender === 'Nữ'}
                onChange={() => setProfile({ ...profile, gender: 'Nữ' })}
                className="text-[#1E3A8A] focus:ring-[#1E3A8A]"
              />
              <span>Nữ</span>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="rounded-full bg-[#1E3A8A] px-8 py-3.5 text-xs font-bold text-white shadow transition-transform hover:scale-105 hover:bg-[#172554]"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
