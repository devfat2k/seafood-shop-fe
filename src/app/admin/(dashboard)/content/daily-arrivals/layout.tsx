import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Quản Lý Hải Sản Mới Về',
};

export default function AdminDailyArrivalsLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <>{children}</>;
}
