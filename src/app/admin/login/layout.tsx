import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Đăng Nhập Quản Trị Viên',
};

export default function AdminLoginLayout({ children }: { children: ReactNode }): ReactElement {
  return <>{children}</>;
}
