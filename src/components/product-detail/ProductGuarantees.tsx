import { Icon } from '@/components/common/Icon';

export function ProductGuarantees() {
  return (
    <div className="grid grid-cols-1 gap-2 rounded-xl border border-border bg-card p-3 sm:grid-cols-3">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <Icon name="truck" size="xs" className="shrink-0 text-secondary" />
        <span>Giao hỏa tốc 2H</span>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <Icon name="fish" size="xs" className="shrink-0 text-secondary" />
        <span>Tươi sống tại bến</span>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <Icon name="shield-check" size="xs" className="shrink-0 text-tertiary" />
        <span>1 đổi 1 tận nơi</span>
      </div>
    </div>
  );
}
