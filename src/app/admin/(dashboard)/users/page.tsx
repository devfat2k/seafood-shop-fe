'use client';

import { AdminUsersContent } from '@/components/admin/users/AdminUsersContent';
import { useAdminUsersFlow } from '@/components/admin/users/useAdminUsersFlow';
import { UserRoleAssignDialog } from '@/components/admin/users/UserRoleAssignDialog';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminUsersPage() {
  const {
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
    isToggling,
    handleConfirmToggleStatus,
  } = useAdminUsersFlow();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-lg font-bold text-foreground">Quản lý người dùng</h2>
        <p className="text-xs text-muted-foreground">
          Xem, khóa hoặc kích hoạt tài khoản, phân quyền vai trò người dùng
        </p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold">Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminUsersContent
            isLoading={isLoading}
            isError={isError}
            data={data}
            page={page}
            onPageChange={setPage}
            onRefetch={() => void refetch()}
            onAssignRole={(user) => {
              setSelectedUser(user);
              setRoleAssignOpen(true);
            }}
            onToggleStatus={(user) => {
              setToggleTarget(user);
            }}
          />
        </CardContent>
      </Card>

      <UserRoleAssignDialog
        open={roleAssignOpen}
        onOpenChange={setRoleAssignOpen}
        user={selectedUser}
      />

      <ConfirmDialog
        open={toggleTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setToggleTarget(null);
          }
        }}
        title={`${toggleTarget?.isActive ? 'Khóa' : 'Kích hoạt'} tài khoản`}
        description={`Bạn có chắc muốn ${toggleTarget?.isActive ? 'khóa' : 'kích hoạt'} tài khoản "${toggleTarget?.fullName ?? toggleTarget?.email ?? ''}"?`}
        confirmText={toggleTarget?.isActive ? 'Khóa tài khoản' : 'Kích hoạt'}
        variant={toggleTarget?.isActive ? 'destructive' : 'default'}
        isLoading={isToggling}
        onConfirm={handleConfirmToggleStatus}
      />
    </div>
  );
}
