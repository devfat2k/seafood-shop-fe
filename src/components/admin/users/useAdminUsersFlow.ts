'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useAdminUsersQuery, useToggleUserStatusMutation } from '@/libs/queries/admin/users';
import type { AdminUserItem } from '@/types/admin';

export const useAdminUsersFlow = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, refetch } = useAdminUsersQuery({
    page,
    size: 10,
    sort: 'createdAt,desc',
  });

  const toggleStatusMutation = useToggleUserStatusMutation();

  const [roleAssignOpen, setRoleAssignOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);
  const [toggleTarget, setToggleTarget] = useState<AdminUserItem | null>(null);

  const handleConfirmToggleStatus = async () => {
    if (!toggleTarget) {
      return;
    }
    const action = toggleTarget.isActive ? 'khóa' : 'kích hoạt';
    try {
      await toggleStatusMutation.mutateAsync({
        id: toggleTarget.id,
        isActive: !toggleTarget.isActive,
      });
      toast.success(`Đã ${action} tài khoản thành công`);
      setToggleTarget(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${action} tài khoản thất bại`);
    }
  };

  return {
    page,
    setPage,
    data,
    isLoading,
    isError,
    refetch,
    roleAssignOpen,
    setRoleAssignOpen,
    selectedUser,
    setSelectedUser,
    toggleTarget,
    setToggleTarget,
    isToggling: toggleStatusMutation.isPending,
    handleConfirmToggleStatus,
  };
};
