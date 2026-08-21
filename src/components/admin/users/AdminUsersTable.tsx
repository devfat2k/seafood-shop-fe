'use client';

import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AdminUserItem } from '@/types/admin';

type AdminUsersTableProps = {
  users: AdminUserItem[];
  page: number;
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
  onAssignRole: (user: AdminUserItem) => void;
  onToggleStatus: (user: AdminUserItem) => void;
};

export const AdminUsersTable = ({
  users,
  page,
  totalPages,
  totalElements,
  isLastPage,
  onPageChange,
  onAssignRole,
  onToggleStatus,
}: AdminUsersTableProps) => (
  <>
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-12 text-center text-xs font-bold uppercase">#</TableHead>
            <TableHead className="min-w-[200px] text-xs font-bold uppercase">
              Người Dùng / Email
            </TableHead>
            <TableHead className="min-w-[120px] text-xs font-bold uppercase">
              Số Điện Thoại
            </TableHead>
            <TableHead className="min-w-[140px] text-xs font-bold uppercase">Vai Trò</TableHead>
            <TableHead className="text-center text-xs font-bold uppercase">Trạng Thái</TableHead>
            <TableHead className="min-w-[120px] text-xs font-bold uppercase">Ngày Tạo</TableHead>
            <TableHead className="text-right text-xs font-bold uppercase">Thao Tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => {
            const roles = user.roles ?? [];
            const userKey = user.id ? `user-${user.id}` : `user-${user.email}-${index}`;
            return (
              <TableRow key={userKey} className="transition-colors hover:bg-muted/40">
                <TableCell className="text-center font-mono text-xs font-bold text-muted-foreground">
                  {page * 10 + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {user.fullName?.charAt(0)?.toUpperCase() ?? 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {user.fullName ?? '—'}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {user.phoneNumber ?? '—'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {roles.length > 0 ? (
                      roles.map((r, rIdx) => (
                        <Badge
                          key={`${userKey}-role-${r}-${rIdx}`}
                          variant="outline"
                          className="px-2 py-0.5 text-xs font-semibold"
                        >
                          {r.replace('ROLE_', '')}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">USER</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={user.isActive ? 'default' : 'destructive'}
                    className="px-2.5 py-0.5 text-xs"
                  >
                    {user.isActive ? 'Hoạt động' : 'Bị khóa'}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '—'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        onAssignRole(user);
                      }}
                      className="h-8 px-2.5 text-xs font-semibold"
                      title="Phân quyền vai trò"
                    >
                      <Icon name="shield" size="xs" className="mr-1" />
                      <span>Quyền</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        onToggleStatus(user);
                      }}
                      className={`h-8 px-2.5 text-xs font-semibold ${
                        user.isActive
                          ? 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                          : 'text-emerald-600 hover:bg-emerald-50'
                      }`}
                      title={user.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                    >
                      <Icon name={user.isActive ? 'lock' : 'unlock'} size="xs" className="mr-1" />
                      <span>{user.isActive ? 'Khóa' : 'Kích hoạt'}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

    {totalPages > 1 && (
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">
          Trang {page + 1} / {totalPages} · Tổng {totalElements} người dùng
        </span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 0}
            onClick={() => {
              onPageChange(Math.max(0, page - 1));
            }}
          >
            Trước
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={isLastPage}
            onClick={() => {
              onPageChange(page + 1);
            }}
          >
            Sau
          </Button>
        </div>
      </div>
    )}
  </>
);
