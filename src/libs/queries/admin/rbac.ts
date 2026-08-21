'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/libs/AdminApiClient';
import type { CreateRoleRequest, Permission, Role } from '@/types/admin';
import type { ApiResponse } from '@/types/api';

export const adminRbacKeys = {
  all: ['admin-rbac'] as const,
  roles: () => ['admin-rbac', 'roles'] as const,
  permissions: () => ['admin-rbac', 'permissions'] as const,
};

export function useRolesQuery() {
  return useQuery<Role[]>({
    queryKey: adminRbacKeys.roles(),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<Role[]>>('/admin/rbac/roles');
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return [];
    },
    staleTime: 60 * 1000,
  });
}

export function useCreateRoleMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Role>, Error, CreateRoleRequest>({
    mutationFn: async (data) => {
      const res = await adminApi.post<ApiResponse<Role>>('/admin/rbac/roles', data);
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Tạo Role thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminRbacKeys.roles() });
    },
  });
}

export function usePermissionsQuery() {
  return useQuery<Permission[]>({
    queryKey: adminRbacKeys.permissions(),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<Permission[]>>('/admin/rbac/permissions');
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return [];
    },
    staleTime: 60 * 1000,
  });
}

export function useUpdateRolePermissionsMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, { roleId: number; permissionIds: number[] }>({
    mutationFn: async ({ roleId, permissionIds }) => {
      await adminApi.patch(`/admin/rbac/roles/${roleId}/permissions`, { permissionIds });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminRbacKeys.roles() });
    },
  });
}

export function useAssignUserRolesMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, { userId: number; roleIds: number[] }>({
    mutationFn: async ({ userId, roleIds }) => {
      await adminApi.patch(`/admin/rbac/users/${userId}/roles`, { roleIds });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminRbacKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
