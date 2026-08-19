'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { RoleCardList } from '@/components/admin/rbac/RoleCardList';
import { RoleFormDialog } from '@/components/admin/rbac/RoleFormDialog';
import { SystemPermissionsTable } from '@/components/admin/rbac/SystemPermissionsTable';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  usePermissionsQuery,
  useRolesQuery,
  useUpdateRolePermissionsMutation,
} from '@/libs/queries/admin/rbac';

export default function AdminRbacPage() {
  const {
    data: roles,
    isLoading: rolesLoading,
    isError: rolesError,
    refetch: refetchRoles,
  } = useRolesQuery();
  const { data: permissions, isLoading: permsLoading } = usePermissionsQuery();
  const updatePermsMutation = useUpdateRolePermissionsMutation();
  const [roleFormOpen, setRoleFormOpen] = useState(false);

  const isLoading = rolesLoading || permsLoading;

  const handleTogglePermission = async (
    roleId: number,
    currentPermIds: number[],
    permId: number,
  ) => {
    const hasIt = currentPermIds.includes(permId);
    const newPermIds = hasIt
      ? currentPermIds.filter((p) => p !== permId)
      : [...currentPermIds, permId];
    try {
      await updatePermsMutation.mutateAsync({ roleId, permissionIds: newPermIds });
      toast.success('Đã cập nhật quyền cho vai trò');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Cập nhật quyền thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Phân quyền & Vai trò (RBAC)
          </h2>
          <p className="text-xs text-muted-foreground">
            Quản lý vai trò hệ thống và phân quyền chi tiết cho từng vai trò
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setRoleFormOpen(true);
          }}
          className="text-xs font-semibold"
        >
          <Icon name="plus" size="xs" className="mr-1.5" />
          Thêm vai trò (Role)
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold">Danh sách Vai trò</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2 border-b border-border/50 py-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3 w-64" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {rolesError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Không thể tải danh sách vai trò
              </p>
              <p className="mt-1 mb-3 text-xs text-muted-foreground">
                Vui lòng kiểm tra kết nối và thử lại
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  void refetchRoles();
                }}
              >
                Thử lại
              </Button>
            </div>
          )}

          {!isLoading && !rolesError && (!roles || roles.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="shield-check" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Chưa có vai trò nào</p>
              <p className="mt-1 mb-3 text-xs text-muted-foreground">
                Tạo vai trò mới để phân quyền trong hệ thống
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setRoleFormOpen(true);
                }}
              >
                + Tạo vai trò đầu tiên
              </Button>
            </div>
          )}

          {!isLoading && !rolesError && roles && roles.length > 0 && (
            <RoleCardList
              roles={roles}
              permissions={permissions}
              isUpdating={updatePermsMutation.isPending}
              onTogglePermission={(roleId, currentPermIds, permId) => {
                void handleTogglePermission(roleId, currentPermIds, permId);
              }}
            />
          )}
        </CardContent>
      </Card>

      {!isLoading && permissions && permissions.length > 0 && (
        <SystemPermissionsTable permissions={permissions} />
      )}

      <RoleFormDialog open={roleFormOpen} onOpenChange={setRoleFormOpen} />
    </div>
  );
}
