import type { ApiResponse } from '@/types/api';
import type {
  AddressRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  UserAddress,
  UserProfile,
} from '@/types/user';
import { api } from '../ApiClient';

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const res = await api.get<ApiResponse<UserProfile>>('/users/me');
    return res.data.data;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
}

export async function updateUserProfile(
  data: UpdateProfileRequest,
): Promise<ApiResponse<UserProfile>> {
  const res = await api.put<ApiResponse<UserProfile>>('/users/me', data);
  return res.data;
}

export async function uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post<ApiResponse<{ avatarUrl: string }>>('/users/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function changePassword(data: ChangePasswordRequest): Promise<ApiResponse<null>> {
  const res = await api.put<ApiResponse<null>>('/users/change-password', data);
  return res.data;
}

export async function getUserAddresses(): Promise<UserAddress[]> {
  try {
    const res = await api.get<ApiResponse<UserAddress[]>>('/users/addresses');
    return res.data.data ?? [];
  } catch (error) {
    console.error('Failed to get user addresses:', error);
    return [];
  }
}

export async function createUserAddress(data: AddressRequest): Promise<ApiResponse<UserAddress>> {
  const res = await api.post<ApiResponse<UserAddress>>('/users/addresses', data);
  return res.data;
}

export async function updateUserAddress(
  id: number,
  data: AddressRequest,
): Promise<ApiResponse<UserAddress>> {
  const res = await api.put<ApiResponse<UserAddress>>(`/users/addresses/${id}`, data);
  return res.data;
}

export async function deleteUserAddress(id: number): Promise<ApiResponse<null>> {
  const res = await api.delete<ApiResponse<null>>(`/users/addresses/${id}`);
  return res.data;
}

export async function setDefaultAddress(id: number): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>(`/users/addresses/${id}/default`);
  return res.data;
}
