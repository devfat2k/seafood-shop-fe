'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Icon } from '@/components/common/Icon';
import type { AddressFormValues } from '@/validations/user';
import { addressFormSchema } from '@/validations/user';

type AddressFormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddressFormValues) => Promise<void>;
  isPending: boolean;
};

export function AddressFormDialog({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: AddressFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      recipientName: '',
      phone: '',
      province: 'TP. Hồ Chí Minh',
      district: '',
      ward: '',
      addressDetail: '',
      tag: 'Nhà Riêng',
      defaultAddress: false,
    },
  });

  if (!isOpen) {
    return null;
  }

  const handleFormSubmit = async (values: AddressFormValues) => {
    await onSubmit(values);
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="fixed inset-0 animate-in cursor-default bg-black/60 backdrop-blur-xs transition-opacity fade-in"
        onClick={onClose}
        aria-label="Đóng dialog"
      />

      <div className="relative max-h-[90vh] w-full max-w-lg animate-in overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl zoom-in-95 sm:p-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Thêm Địa Chỉ Giao Hàng
            </h3>
            <p className="text-xs text-muted-foreground">
              Địa chỉ nhận hàng tươi sống được lưu bảo mật trong tài khoản
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Đóng dialog"
          >
            <Icon name="x" size="sm" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="addr-recipientName"
                className="block text-xs font-semibold text-foreground"
              >
                Họ và tên người nhận <span className="text-destructive">*</span>
              </label>
              <input
                id="addr-recipientName"
                type="text"
                {...register('recipientName')}
                placeholder="Nguyễn Văn A"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
              />
              {errors.recipientName && (
                <p className="mt-1 text-[11px] text-destructive">{errors.recipientName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="addr-phone" className="block text-xs font-semibold text-foreground">
                Số điện thoại <span className="text-destructive">*</span>
              </label>
              <input
                id="addr-phone"
                type="tel"
                {...register('phone')}
                placeholder="0912345678"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
              />
              {errors.phone && (
                <p className="mt-1 text-[11px] text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="addr-province"
                className="block text-xs font-semibold text-foreground"
              >
                Tỉnh / TP
              </label>
              <input
                id="addr-province"
                type="text"
                {...register('province')}
                placeholder="TP. Hồ Chí Minh"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none"
              />
              {errors.province && (
                <p className="mt-1 text-[11px] text-destructive">{errors.province.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="addr-district"
                className="block text-xs font-semibold text-foreground"
              >
                Quận / Huyện
              </label>
              <input
                id="addr-district"
                type="text"
                {...register('district')}
                placeholder="Quận 1"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none"
              />
              {errors.district && (
                <p className="mt-1 text-[11px] text-destructive">{errors.district.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="addr-ward" className="block text-xs font-semibold text-foreground">
                Phường / Xã
              </label>
              <input
                id="addr-ward"
                type="text"
                {...register('ward')}
                placeholder="P. Bến Nghé"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none"
              />
              {errors.ward && (
                <p className="mt-1 text-[11px] text-destructive">{errors.ward.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="addr-detail" className="block text-xs font-semibold text-foreground">
              Địa chỉ cụ thể (Số nhà, tên đường...) <span className="text-destructive">*</span>
            </label>
            <input
              id="addr-detail"
              type="text"
              {...register('addressDetail')}
              placeholder="123 Đường Lê Lợi"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
            />
            {errors.addressDetail && (
              <p className="mt-1 text-[11px] text-destructive">{errors.addressDetail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="addr-tag" className="block text-xs font-semibold text-foreground">
              Nhãn địa chỉ
            </label>
            <select
              id="addr-tag"
              {...register('tag')}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-secondary focus:outline-none"
            >
              <option value="Nhà Riêng">Nhà Riêng</option>
              <option value="Văn Phòng">Văn Phòng</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="defaultAddress"
              {...register('defaultAddress')}
              className="h-4 w-4 rounded border-border text-primary focus:ring-secondary"
            />
            <label htmlFor="defaultAddress" className="text-xs text-foreground">
              Đặt làm địa chỉ nhận hàng mặc định
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? 'Đang lưu...' : 'Lưu Địa Chỉ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
