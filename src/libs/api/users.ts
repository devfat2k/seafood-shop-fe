import { api } from '@/libs/ApiClient';
import type { ApiResponse } from '@/types/api';
import type {
  AddressRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  UserAddress,
  UserProfile,
} from '@/types/user';

export async function getUserProfile(): Promise<UserProfile | null> {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  try {
    const res = await api.get<ApiResponse<UserProfile>>('/users/me');
    if (res.data?.success && res.data.data) {
      const userData = res.data.data;
      const resolvedId = userData.id ?? userData.userId ?? 0;
      return {
        ...userData,
        id: resolvedId,
        userId: resolvedId,
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
}

export async function updateUserProfile(
  data: UpdateProfileRequest,
): Promise<ApiResponse<UserProfile>> {
  const res = await api.patch<ApiResponse<UserProfile>>('/users/update-profile', data);
  return res.data;
}

export async function uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post<ApiResponse<{ avatarUrl: string }>>('/users/upload-avatar', formData);
  return res.data;
}

export async function changePassword(data: ChangePasswordRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/users/change-password', data);
  return res.data;
}

export async function getUserAddresses(): Promise<UserAddress[]> {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
  if (!token) {
    return [];
  }
  try {
    const res = await api.get<ApiResponse<UserAddress[]>>('/addresses/me');
    return res.data?.data ?? [];
  } catch (error) {
    console.error('Failed to get user addresses:', error);
    return [];
  }
}

export async function createUserAddress(data: AddressRequest): Promise<ApiResponse<UserAddress>> {
  const res = await api.post<ApiResponse<UserAddress>>('/addresses', data);
  return res.data;
}

export async function updateUserAddress(
  id: number | string,
  data: AddressRequest,
): Promise<ApiResponse<UserAddress>> {
  const res = await api.patch<ApiResponse<UserAddress>>(`/addresses/${id}`, data);
  return res.data;
}

export async function deleteUserAddress(id: number | string): Promise<ApiResponse<null>> {
  const res = await api.delete<ApiResponse<null>>(`/addresses/delete/${id}`);
  return res.data;
}

export async function setDefaultAddress(id: number | string): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>(`/addresses/change-address-default/${id}`, {
    defaultAddress: true,
  });
  return res.data;
}
