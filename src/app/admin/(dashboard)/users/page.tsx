'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { UserRoleAssignDialog } from '@/components/admin/users/UserRoleAssignDialog';
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
import { useAdminUsersQuery, useToggleUserStatusMutation } from '@/libs/queries/admin/users';
import type { AdminUserItem } from '@/types/admin';

export default function AdminUsersPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, refetch } = useAdminUsersQuery({
    page,
    size: 10,
    sort: 'createdAt,desc',
  });

  const toggleStatusMutation = useToggleUserStatusMutation();

  // Role Assign Dialog state
  const [roleAssignOpen, setRoleAssignOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);

  const handleToggleStatus = async (id: number, currentActive: boolean, name: string) => {
    const action = currentActive ? 'khóa' : 'kích hoạt';
    // eslint-disable-next-line no-alert -- simple admin confirmation dialog
    if (!window.confirm(`Bạn có chắc muốn ${action} tài khoản "${name}"?`)) {
      return;
    }
    try {
      await toggleStatusMutation.mutateAsync({ id, isActive: !currentActive });
      toast.success(`Đã ${action} tài khoản thành công`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${action} tài khoản thất bại`);
    }
  };

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
          {/* Loading */}
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border/50 py-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Không thể tải danh sách người dùng
              </p>
              <p className="mt-1 mb-3 text-[11px] text-muted-foreground">
                Vui lòng kiểm tra kết nối và thử lại
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  void refetch();
                }}
              >
                Thử lại
              </Button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && (!data?.content || data.content.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="user" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Không có người dùng nào</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Người dùng sẽ xuất hiện khi có khách đăng ký
              </p>
            </div>
          )}

          {/* Data Table */}
          {!isLoading && !isError && data?.content && data.content.length > 0 && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead>Họ Tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>SĐT</TableHead>
                    <TableHead className="text-center">Vai Trò</TableHead>
                    <TableHead className="text-center">Trạng Thái</TableHead>
                    <TableHead className="text-right">Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.content.map((user, index) => (
                    <TableRow key={`user-${user.id}-${index}`}>
                      <TableCell className="text-center text-xs font-bold text-muted-foreground">
                        {page * 10 + index + 1}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-foreground">
                        {user.fullName}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {user.phoneNumber ?? '—'}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {user.roles.map((role) => (
                            <Badge
                              key={role}
                              variant={role.includes('ADMIN') ? 'default' : 'secondary'}
                              className="text-[10px]"
                            >
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={user.isActive ? 'default' : 'destructive'}
                          className="text-[10px]"
                        >
                          {user.isActive ? 'Hoạt động' : 'Bị khóa'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1">
                          {/* Assign Roles Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(user);
                              setRoleAssignOpen(true);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold text-primary transition-colors hover:bg-primary/10"
                            title="Gán vai trò / Phân quyền"
                          >
                            <Icon name="shield-check" size="xs" />
                            <span>Gán vai trò</span>
                          </button>

                          {/* Lock / Unlock Toggle Button */}
                          <button
                            type="button"
                            onClick={() => {
                              void handleToggleStatus(user.id, user.isActive, user.fullName);
                            }}
                            disabled={toggleStatusMutation.isPending}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition-colors hover:bg-muted disabled:opacity-50"
                            title={user.isActive ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                          >
                            <Icon
                              name={user.isActive ? 'lock' : 'unlock'}
                              size="xs"
                              className={user.isActive ? 'text-destructive' : 'text-emerald-600'}
                            />
                            <span
                              className={user.isActive ? 'text-destructive' : 'text-emerald-600'}
                            >
                              {user.isActive ? 'Khóa' : 'Mở'}
                            </span>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">
                  Trang {page + 1} / {data.totalPages} · Tổng {data.totalElements} người dùng
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => {
                      setPage((p) => Math.max(0, p - 1));
                    }}
                  >
                    Trước
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={data.last}
                    onClick={() => {
                      setPage((p) => p + 1);
                    }}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Role Assign Dialog */}
      <UserRoleAssignDialog
        open={roleAssignOpen}
        onOpenChange={setRoleAssignOpen}
        user={selectedUser}
      />
    </div>
  );
}
