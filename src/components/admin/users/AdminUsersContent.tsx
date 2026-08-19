'use client';

import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { AdminUserItem } from '@/types/admin';
import type { PageResponse } from '@/types/api';
import { AdminUsersTable } from './AdminUsersTable';

type AdminUsersContentProps = {
  isLoading: boolean;
  isError: boolean;
  data?: PageResponse<AdminUserItem>;
  page: number;
  onPageChange: (page: number) => void;
  onRefetch: () => void;
  onAssignRole: (user: AdminUserItem) => void;
  onToggleStatus: (user: AdminUserItem) => void;
};

export const AdminUsersContent = ({
  isLoading,
  isError,
  data,
  page,
  onPageChange,
  onRefetch,
  onAssignRole,
  onToggleStatus,
}: AdminUsersContentProps) => {
  if (isLoading) {
    return (
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
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <Icon name="x" size="sm" />
        </div>
        <p className="text-xs font-semibold text-foreground">Không thể tải danh sách người dùng</p>
        <p className="mt-1 mb-3 text-xs text-muted-foreground">
          Vui lòng kiểm tra kết nối và thử lại
        </p>
        <Button size="sm" variant="outline" onClick={onRefetch}>
          Thử lại
        </Button>
      </div>
    );
  }

  if (!data?.content || data.content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Icon name="users" size="md" />
        </div>
        <p className="text-xs font-semibold text-foreground">Chưa có người dùng nào</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Người dùng đăng ký tài khoản sẽ xuất hiện ở đây
        </p>
      </div>
    );
  }

  return (
    <AdminUsersTable
      users={data.content}
      page={page}
      totalPages={data.totalPages}
      totalElements={data.totalElements}
      isLastPage={data.last}
      onPageChange={onPageChange}
      onAssignRole={onAssignRole}
      onToggleStatus={onToggleStatus}
    />
  );
};
