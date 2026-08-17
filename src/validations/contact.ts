import { z } from 'zod';

const phoneRegex = /^(0[35789])([0-9]{8})$/u;

export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự)'),
  phone: z.string().regex(phoneRegex, 'Số điện thoại không đúng định dạng'),
  email: z.email('Email không đúng định dạng').optional().or(z.literal('')),
  subject: z.string().min(2, 'Vui lòng chọn hoặc nhập chủ đề tư vấn'),
  message: z.string().min(5, 'Nội dung tin nhắn phải có ít nhất 5 ký tự'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
