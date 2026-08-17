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
  try {
    const res = await api.get<ApiResponse<UserProfile>>('/users/me');
    return res.data?.data ?? null;
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
  const res = await api.post<ApiResponse<{ avatarUrl: string }>>('/users/upload-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function changePassword(data: ChangePasswordRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/users/change-password', data);
  return res.data;
}

export async function getUserAddresses(): Promise<UserAddress[]> {
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
