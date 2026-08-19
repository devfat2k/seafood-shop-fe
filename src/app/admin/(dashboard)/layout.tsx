'use client';

import { useState } from 'react';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopBar } from '@/components/admin/AdminTopBar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-muted/20">
        {/* Collapsible Sidebar */}
        <AdminSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminTopBar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
