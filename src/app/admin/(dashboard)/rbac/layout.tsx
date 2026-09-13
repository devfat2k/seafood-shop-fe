import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Phân Quyền Hệ Thống',
};

export default function AdminRbacLayout({ children }: { children: ReactNode }): ReactElement {
  return <>{children}</>;
}
