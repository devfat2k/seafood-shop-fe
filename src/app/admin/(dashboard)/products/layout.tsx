import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Quản Lý Sản Phẩm',
};

export default function AdminProductsLayout({ children }: { children: ReactNode }): ReactElement {
  return <>{children}</>;
}
