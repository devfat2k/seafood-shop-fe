import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Quản Lý Banner Quảng Cáo',
};

export default function AdminBannersLayout({ children }: { children: ReactNode }): ReactElement {
  return <>{children}</>;
}
