'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { getAdminAccessToken } from '@/libs/AdminApiClient';
import { useAdminCurrentUserQuery } from '@/libs/queries/admin/auth';
import { hasAdminRole } from '@/utils/role';

type AdminAuthGuardProps = {
  children: ReactNode;
};

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { data: adminUser, isLoading, isError } = useAdminCurrentUserQuery();

  useEffect(() => {
    setIsClient(true);
    const token = getAdminAccessToken();
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    if (isClient && !isLoading && (isError || !adminUser || !hasAdminRole(adminUser.roles))) {
      router.replace('/admin/login');
    }
  }, [isClient, isLoading, isError, adminUser, router]);

  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon name="fish" size="lg" />
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm font-semibold text-foreground">Đang xác thực quản trị viên...</p>
            <p className="text-xs text-muted-foreground">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  if (!adminUser || !hasAdminRole(adminUser.roles)) {
    return null;
  }

  return <>{children}</>;
}
