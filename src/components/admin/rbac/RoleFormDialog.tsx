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
import { Textarea } from '@/components/ui/textarea';
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
      toast.success('Đã thêm vai trò mới thành công');
      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Thêm vai trò thất bại');
    }
  };

  const isPending = isSubmitting || createMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">Thêm vai trò nhân viên</DialogTitle>
          <DialogDescription className="text-xs">
            Tạo vai trò mới để phân quyền chức năng trong hệ thống quản trị
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="role-name-input" className="text-xs font-semibold text-foreground">
              Mã vai trò *
            </label>
            <Input
              id="role-name-input"
              placeholder="Tên mã vai trò"
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
            <Textarea
              id="role-desc-input"
              rows={3}
              placeholder="Mô tả vai trò..."
              className="mt-1 text-xs"
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
