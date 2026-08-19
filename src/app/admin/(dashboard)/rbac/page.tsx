'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { RoleFormDialog } from '@/components/admin/rbac/RoleFormDialog';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
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
          {/* Loading */}
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

          {/* Error */}
          {rolesError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Không thể tải danh sách vai trò
              </p>
              <p className="mt-1 mb-3 text-[11px] text-muted-foreground">
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

          {/* Empty */}
          {!isLoading && !rolesError && (!roles || roles.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="shield-check" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Chưa có vai trò nào</p>
              <p className="mt-1 mb-3 text-[11px] text-muted-foreground">
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

          {/* Data — Role Cards with expandable permissions */}
          {!isLoading && !rolesError && roles && roles.length > 0 && (
            <div className="space-y-3">
              {roles.map((role) => {
                const isExpanded = expandedRole === role.id;
                const rolePermIds = role.permissions?.map((p) => p.id) ?? [];
                return (
                  <div key={role.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-foreground">{role.name}</h3>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {role.description ?? 'Không có mô tả'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">
                          {rolePermIds.length} quyền
                        </Badge>
                        <button
                          type="button"
                          onClick={() => {
                            setExpandedRole(isExpanded ? null : role.id);
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                          title={isExpanded ? 'Thu gọn' : 'Xem chi tiết quyền'}
                        >
                          <Icon
                            name={isExpanded ? 'chevron-up' : 'chevron-down'}
                            size="xs"
                            className="text-muted-foreground"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Permission chips */}
                    {isExpanded && permissions && (
                      <div className="mt-4 border-t border-border pt-3">
                        <p className="mb-2 text-[11px] font-semibold text-muted-foreground">
                          Quyền hạn (bấm để bật/tắt):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {permissions.map((perm) => {
                            const isActive = rolePermIds.includes(perm.id);
                            return (
                              <button
                                key={perm.id}
                                type="button"
                                onClick={() => {
                                  void handleTogglePermission(role.id, rolePermIds, perm.id);
                                }}
                                disabled={updatePermsMutation.isPending}
                                className="disabled:opacity-50"
                              >
                                <Badge
                                  variant={isActive ? 'default' : 'outline'}
                                  className="cursor-pointer text-[10px] transition-colors"
                                >
                                  {perm.code}
                                </Badge>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Inline current permissions */}
                    {!isExpanded && role.permissions && role.permissions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {role.permissions.map((p) => (
                          <Badge key={p.id} variant="secondary" className="text-[9px]">
                            {p.code}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All System Permissions Reference */}
      {!isLoading && permissions && permissions.length > 0 && (
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Toàn bộ Permissions hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">ID</TableHead>
                  <TableHead>Mã Quyền</TableHead>
                  <TableHead>Mô Tả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((perm) => (
                  <TableRow key={perm.id}>
                    <TableCell className="text-center text-xs font-bold text-muted-foreground">
                      {perm.id}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-primary">
                      {perm.code}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {perm.description ?? '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Role Creation Dialog */}
      <RoleFormDialog open={roleFormOpen} onOpenChange={setRoleFormOpen} />
    </div>
  );
}
