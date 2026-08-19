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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">#</TableHead>
          <TableHead>Họ Tên / Email</TableHead>
          <TableHead>Số Điện Thoại</TableHead>
          <TableHead>Vai Trò</TableHead>
          <TableHead className="text-center">Trạng Thái</TableHead>
          <TableHead>Ngày Đăng Ký</TableHead>
          <TableHead className="text-right">Thao Tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => {
          const roles = user.roles ?? [];
          return (
            <TableRow key={user.id}>
              <TableCell className="text-center text-xs font-bold text-muted-foreground">
                {page * 10 + index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {user.fullName?.charAt(0)?.toUpperCase() ?? 'U'}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{user.fullName ?? '—'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {user.phoneNumber ?? '—'}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {roles.length > 0 ? (
                    roles.map((r, rIdx) => (
                      <Badge
                        key={rIdx}
                        variant="outline"
                        className="px-1.5 py-0 text-xs font-semibold"
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
                <Badge variant={user.isActive ? 'default' : 'destructive'} className="text-xs">
                  {user.isActive ? 'Hoạt động' : 'Bị khóa'}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '—'}
              </TableCell>
              <TableCell className="text-right">
                <div className="inline-flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      onAssignRole(user);
                    }}
                    className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title="Phân quyền vai trò"
                  >
                    <Icon name="shield" size="xs" />
                    <span>Quyền</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onToggleStatus(user);
                    }}
                    className={`inline-flex h-7 items-center gap-1 rounded-lg px-2 text-xs font-semibold transition-colors ${
                      user.isActive
                        ? 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                        : 'text-emerald-600 hover:bg-emerald-50'
                    }`}
                    title={user.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                  >
                    <Icon name={user.isActive ? 'lock' : 'unlock'} size="xs" />
                    <span>{user.isActive ? 'Khóa' : 'Kích hoạt'}</span>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>

    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
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
  </>
);
