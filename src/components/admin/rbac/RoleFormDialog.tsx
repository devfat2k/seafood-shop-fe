'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateRoleMutation } from '@/libs/queries/admin/rbac';
import type { AdminRoleFormValues } from '@/validations/admin';
import { adminRoleSchema } from '@/validations/admin';

type RoleFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RoleFormDialog({ open, onOpenChange }: RoleFormDialogProps) {
  const createMutation = useCreateRoleMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminRoleFormValues>({
    resolver: zodResolver(adminRoleSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values: AdminRoleFormValues) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success(`Tạo vai trò "${values.name}" thành công`);
      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Tạo vai trò thất bại');
    }
  };

  const isPending = isSubmitting || createMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo vai trò mới (Role)</DialogTitle>
          <DialogDescription>
            Định nghĩa vai trò người dùng trong hệ thống (VD: ROLE_MODERATOR, ROLE_EDITOR)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="role-name-input" className="text-xs font-semibold text-foreground">
              Tên vai trò *
            </label>
            <Input
              id="role-name-input"
              placeholder="VD: ROLE_MODERATOR"
              className="mt-1 text-xs uppercase"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-[11px] text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role-desc-input" className="text-xs font-semibold text-foreground">
              Mô tả vai trò
            </label>
            <textarea
              id="role-desc-input"
              rows={3}
              placeholder="Kiểm duyệt viên nội dung, sản phẩm..."
              className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              {...register('description')}
            />
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Hủy
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? 'Đang tạo...' : 'Tạo vai trò'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
