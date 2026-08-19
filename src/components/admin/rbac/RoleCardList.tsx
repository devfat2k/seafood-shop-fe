'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import type { Permission, Role } from '@/types/admin';

type RoleCardListProps = {
  roles: Role[];
  permissions?: Permission[];
  isUpdating: boolean;
  onTogglePermission: (roleId: number, currentPermIds: number[], permId: number) => void;
};

export const RoleCardList = ({
  roles,
  permissions,
  isUpdating,
  onTogglePermission,
}: RoleCardListProps) => {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {roles.map((role) => {
        const isExpanded = expandedRole === role.id;
        const rolePermIds = role.permissions?.map((p: Permission) => p.id) ?? [];
        return (
          <div key={role.id} className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-foreground">{role.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {role.description ?? 'Không có mô tả'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {rolePermIds.length} quyền
                </Badge>
                <button
                  type="button"
                  onClick={() => {
                    setExpandedRole(isExpanded ? null : role.id);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                  title={isExpanded ? 'Thu gọn' : 'Xem chi tiết quyền'}
                >
                  <Icon
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size="xs"
                    className="text-muted-foreground"
                  />
                </button>
              </div>
            </div>

            {isExpanded && permissions && (
              <div className="mt-4 border-t border-border pt-3">
                <p className="mb-2 text-xs font-semibold text-muted-foreground">
                  Quyền hạn (bấm để bật/tắt):
                </p>
                <div className="flex flex-wrap gap-2">
                  {permissions.map((perm) => {
                    const isActive = rolePermIds.includes(perm.id);
                    return (
                      <button
                        key={perm.id}
                        type="button"
                        onClick={() => {
                          onTogglePermission(role.id, rolePermIds, perm.id);
                        }}
                        disabled={isUpdating}
                        className="disabled:opacity-50"
                      >
                        <Badge
                          variant={isActive ? 'default' : 'outline'}
                          className="cursor-pointer text-xs transition-colors"
                        >
                          {perm.code}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {!isExpanded && role.permissions && role.permissions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {role.permissions.map((p: Permission) => (
                  <Badge key={p.id} variant="secondary" className="text-xs">
                    {p.code}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
