/**
 * Danh sách tên quyền Quản trị viên (Admin) được hỗ trợ.
 */
const ADMIN_ROLES = new Set([
  'ROLE_ADMIN',
  'ADMIN',
  'ROLE_SUPER_ADMIN',
  'SUPER_ADMIN',
  'ROLE_ROOT',
  'ROOT',
  'ROLE_STAFF',
  'STAFF',
  'ROLE_MANAGER',
  'MANAGER',
]);

/**
 * Kiểm tra xem danh sách vai trò hoặc đối tượng người dùng có chứa quyền Quản trị viên (Admin) hay không.
 * Hỗ trợ linh hoạt:
 * - Mảng chuỗi: `['ROLE_ADMIN']`, `['ADMIN']`, `['admin']`
 * - Mảng đối tượng: `[{ name: 'ADMIN' }]`, `[{ roleName: 'ROLE_ADMIN' }]`, `[{ code: 'ADMIN' }]`
 * - Chuỗi đơn: `'ROLE_ADMIN'`, `'ADMIN'`
 *
 * @param roles Dữ liệu roles trả về từ Backend (có thể là undefined, null, string, mảng string hoặc mảng object)
 * @returns boolean `true` nếu có quyền Admin, ngược lại `false`
 */
export function hasAdminRole(roles?: unknown): boolean {
  if (!roles) {
    return false;
  }

  const checkSingleRole = (role: unknown): boolean => {
    if (typeof role === 'string') {
      const normalized = role.trim().toUpperCase();
      return ADMIN_ROLES.has(normalized);
    }
    if (typeof role === 'object' && role !== null) {
      const obj = role as { name?: unknown; roleName?: unknown; code?: unknown; role?: unknown };
      const name = obj.name ?? obj.roleName ?? obj.code ?? obj.role;
      if (typeof name === 'string') {
        const normalized = name.trim().toUpperCase();
        return ADMIN_ROLES.has(normalized);
      }
    }
    return false;
  };

  if (Array.isArray(roles)) {
    return roles.some(checkSingleRole);
  }

  return checkSingleRole(roles);
}
