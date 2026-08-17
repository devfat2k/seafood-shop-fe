import { Icon } from '@/components/common/Icon';

export function ProfileGuaranteesCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-heading text-xs font-bold tracking-wider text-secondary uppercase">
        Cam Kết Chất Lượng Hải Sản Phan Thiết
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-background p-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon name="truck" size="sm" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">Giao Nhanh Chuỗi Lạnh 2H</h4>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Giao hàng hoả tốc giữ trọn độ tươi sống từ cảng biển.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-background p-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
            <Icon name="fish" size="sm" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">Đóng Thùng Oxy Tươi Sống</h4>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Đóng thùng xốp nén oxy tiêu chuẩn xuất khẩu.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-background p-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tertiary/10 text-tertiary">
            <Icon name="shield-check" size="sm" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">Cam Kết 1 Đổi 1</h4>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Đổi mới miễn phí nếu hải sản không đạt chuẩn tươi ngon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
