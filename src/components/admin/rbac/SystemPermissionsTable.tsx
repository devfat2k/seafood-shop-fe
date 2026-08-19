import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Permission } from '@/types/admin';

type SystemPermissionsTableProps = {
  permissions: Permission[];
};

export const SystemPermissionsTable = ({ permissions }: SystemPermissionsTableProps) => (
  <Card className="border-border">
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-bold">Toàn bộ Permissions hệ thống</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">ID</TableHead>
            <TableHead>Mã Quyền</TableHead>
            <TableHead>Mô Tả</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((perm) => (
            <TableRow key={perm.id}>
              <TableCell className="text-center text-xs font-bold text-muted-foreground">
                {perm.id}
              </TableCell>
              <TableCell className="text-xs font-semibold text-primary">{perm.code}</TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {perm.description ?? '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
