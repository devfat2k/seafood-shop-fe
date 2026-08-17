'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  changePassword,
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  setDefaultAddress,
  updateUserAddress,
  updateUserProfile,
  uploadAvatar,
} from '@/lib/api/users';
import { authQueryKeys } from '@/libs/queries/auth';
import type { ApiResponse } from '@/types/api';
import type {
  AddressRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  UserAddress,
  UserProfile,
} from '@/types/user';

export const userQueryKeys = {
  all: ['users'] as const,
  addresses: () => ['users', 'addresses'] as const,
};

export function useAddressesQuery(initialData?: UserAddress[]) {
  const hasToken = typeof window !== 'undefined' && Boolean(localStorage.getItem('accessToken'));

  return useQuery<UserAddress[]>({
    queryKey: userQueryKeys.addresses(),
    queryFn: getUserAddresses,
    enabled: hasToken,
    initialData,
    staleTime: 60 * 1000,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<UserProfile>, Error, UpdateProfileRequest>({
    mutationFn: async (data: UpdateProfileRequest) => {
      const res = await updateUserProfile(data);
      if (!res.success) {
        throw new Error(res.message || 'Cập nhật thông tin thất bại');
      }
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
}

export function useUploadAvatarMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<{ avatarUrl: string }>, Error, File>({
    mutationFn: async (file: File) => {
      const res = await uploadAvatar(file);
      if (!res.success) {
        throw new Error(res.message || 'Tải ảnh đại diện thất bại');
      }
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation<ApiResponse<null>, Error, ChangePasswordRequest>({
    mutationFn: async (data: ChangePasswordRequest) => {
      const res = await changePassword(data);
      if (!res.success) {
        throw new Error(res.message || 'Đổi mật khẩu thất bại');
      }
      return res;
    },
  });
}

export function useCreateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<UserAddress>, Error, AddressRequest>({
    mutationFn: async (data: AddressRequest) => {
      const res = await createUserAddress(data);
      if (!res.success) {
        throw new Error(res.message || 'Thêm địa chỉ thất bại');
      }
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.addresses() });
    },
  });
}

export function useUpdateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<UserAddress>,
    Error,
    { id: number | string; data: AddressRequest }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await updateUserAddress(id, data);
      if (!res.success) {
        throw new Error(res.message || 'Cập nhật địa chỉ thất bại');
      }
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.addresses() });
    },
  });
}

export function useDeleteAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, number | string>({
    mutationFn: async (id: number | string) => {
      const res = await deleteUserAddress(id);
      if (!res.success) {
        throw new Error(res.message || 'Xóa địa chỉ thất bại');
      }
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.addresses() });
    },
  });
}

export function useSetDefaultAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, number | string>({
    mutationFn: async (id: number | string) => {
      const res = await setDefaultAddress(id);
      if (!res.success) {
        throw new Error(res.message || 'Đặt địa chỉ mặc định thất bại');
      }
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.addresses() });
    },
  });
}
