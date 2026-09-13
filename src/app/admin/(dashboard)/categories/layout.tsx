import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Quản Lý Danh Mục',
};

export default function AdminCategoriesLayout({ children }: { children: ReactNode }): ReactElement {
  return <>{children}</>;
}
