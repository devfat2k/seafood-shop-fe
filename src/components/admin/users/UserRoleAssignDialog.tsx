'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAssignUserRolesMutation, useRolesQuery } from '@/libs/queries/admin/rbac';
import type { AdminUserItem } from '@/types/admin';

type UserRoleAssignDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AdminUserItem | null;
};

export function UserRoleAssignDialog({ open, onOpenChange, user }: UserRoleAssignDialogProps) {
  const { data: roles } = useRolesQuery();
  const assignMutation = useAssignUserRolesMutation();
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);

  useEffect(() => {
    if (user && roles) {
      // match user role names with role IDs
      const matchingIds = roles.filter((r) => user.roles.includes(r.name)).map((r) => r.id);
      setSelectedRoleIds(matchingIds);
    }
  }, [user, roles]);

  if (!user) {
    return null;
  }

  const handleToggleRole = (roleId: number) => {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId],
    );
  };

  const handleSave = async () => {
    if (selectedRoleIds.length === 0) {
      toast.error('Vui lòng chọn ít nhất một vai trò');
      return;
    }
    try {
      await assignMutation.mutateAsync({
        userId: user.id,
        roleIds: selectedRoleIds,
      });
      toast.success(`Đã cập nhật vai trò cho người dùng "${user.fullName}"`);
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gán vai trò thất bại');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Phân quyền & Gán Vai Trò</DialogTitle>
          <DialogDescription>
            Gán danh sách vai trò cho tài khoản{' '}
            <span className="font-semibold text-foreground">{user.fullName}</span> ({user.email})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <p className="text-xs font-semibold text-foreground">
            Chọn các vai trò áp dụng (bấm để chọn/bỏ chọn):
          </p>

          <div className="flex flex-col gap-2">
            {roles?.map((role) => {
              const isSelected = selectedRoleIds.includes(role.id);
              return (
                <button
                  key={role.id}
                  type="button"
                  aria-label={`Chọn vai trò ${role.name}`}
                  onClick={() => {
                    handleToggleRole(role.id);
                  }}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border bg-background hover:bg-muted/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{role.name}</span>
                      {isSelected && (
                        <Badge variant="default" className="text-[9px]">
                          Đã chọn
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {role.description ?? 'Không có mô tả'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    aria-label={`Checkbox vai trò ${role.name}`}
                    checked={isSelected}
                    readOnly
                    className="pointer-events-none h-4 w-4 rounded border-border text-primary"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={assignMutation.isPending}
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Hủy
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={assignMutation.isPending}
            onClick={() => {
              void handleSave();
            }}
          >
            {assignMutation.isPending ? 'Đang lưu...' : 'Lưu vai trò'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
