'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import type { ContactFormValues } from '@/validations/contact';
import { contactFormSchema } from '@/validations/contact';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      subject: 'Tư vấn sản phẩm & Đặt hàng',
      message: '',
    },
  });

  const onSubmit = (_data: ContactFormValues) => {
    toast.success('Đã gửi tin nhắn liên hệ thành công!', {
      description: 'Đội ngũ Hải Sản Phan Thiết sẽ liên hệ lại với bạn trong vòng 15-30 phút.',
    });
    reset();
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8 lg:col-span-7">
      <div className="border-b border-border pb-4">
        <h3 className="font-heading text-lg font-bold text-foreground">
          Gửi Tin Nhắn Cho Chúng Tôi
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Điền thông tin bên dưới, chúng tôi sẽ liên hệ phản hồi bạn ngay lập tức.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-fullName" className="block text-xs font-bold text-foreground">
              Họ và tên <span className="text-destructive">*</span>
            </label>
            <input
              id="contact-fullName"
              type="text"
              {...register('fullName')}
              placeholder="Nguyễn Văn A"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
            />
            {errors.fullName && (
              <p className="mt-1 text-[11px] text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-xs font-bold text-foreground">
              Số điện thoại <span className="text-destructive">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              {...register('phone')}
              placeholder="0912345678"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
            />
            {errors.phone && (
              <p className="mt-1 text-[11px] text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold text-foreground">
              Địa chỉ Email
            </label>
            <input
              id="contact-email"
              type="email"
              {...register('email')}
              placeholder="email@example.com"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-xs font-bold text-foreground">
              Chủ đề cần hỗ trợ
            </label>
            <select
              id="contact-subject"
              {...register('subject')}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
            >
              <option value="Tư vấn sản phẩm & Đặt hàng">Tư vấn sản phẩm & Đặt hàng</option>
              <option value="Cung cấp hải sản sỉ cho nhà hàng">
                Cung cấp hải sản sỉ cho nhà hàng
              </option>
              <option value="Phản hồi chất lượng & Đổi trả">Phản hồi chất lượng & Đổi trả</option>
              <option value="Hợp tác kinh doanh & Khác">Hợp tác kinh doanh & Khác</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-bold text-foreground">
            Nội dung tin nhắn <span className="text-destructive">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            {...register('message')}
            placeholder="Nhập nội dung cần tư vấn, loại hải sản bạn quan tâm hoặc số lượng cần đặt..."
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
          />
          {errors.message && (
            <p className="mt-1 text-[11px] text-destructive">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-md transition-opacity hover:opacity-90 active:scale-98 disabled:opacity-50 sm:w-auto sm:px-8"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn Cho Chúng Tôi'}
          <Icon name="arrow-right" size="xs" />
        </button>
      </form>
    </div>
  );
}
