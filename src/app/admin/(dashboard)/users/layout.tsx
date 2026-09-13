import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Quản Lý Khách Hàng',
};

export default function AdminUsersLayout({ children }: { children: ReactNode }): ReactNode {
  return children;
}
