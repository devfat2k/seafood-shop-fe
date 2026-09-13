import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Quản Lý Đơn Hàng',
};

export default function AdminOrdersLayout({ children }: { children: ReactNode }): ReactElement {
  return <>{children}</>;
}
