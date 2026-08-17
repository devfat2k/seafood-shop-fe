import { Icon } from '@/components/common/Icon';

export function ContactInfoCards() {
  return (
    <div className="space-y-6 lg:col-span-5">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <h3 className="font-heading text-sm font-bold tracking-wider text-foreground uppercase">
          Kết Nối Qua Mạng Xã Hội
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">
          Theo dõi các mẻ hải sản mới cập cảng mỗi sáng và cập nhật bảng giá ưu đãi hàng ngày.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-xs font-semibold text-foreground transition-colors hover:border-secondary hover:text-secondary"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Icon name="facebook" size="xs" />
            </div>
            <div>
              <span className="block font-bold">Facebook Fanpage</span>
              <span className="text-[11px] text-muted-foreground">
                Hải Sản Phan Thiết Tươi Sống
              </span>
            </div>
          </a>

          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-xs font-semibold text-foreground transition-colors hover:border-secondary hover:text-secondary"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Icon name="phone" size="xs" />
            </div>
            <div>
              <span className="block font-bold">Zalo Official Account</span>
              <span className="text-[11px] text-muted-foreground">0912 345 678 (Tư vấn 24/7)</span>
            </div>
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <h3 className="font-heading text-sm font-bold tracking-wider text-foreground uppercase">
          Thông Tin Liên Hệ & Vựa Cảng
        </h3>
        <div className="mt-4 space-y-3.5 text-xs text-muted-foreground">
          <div className="flex items-start gap-3">
            <Icon name="map-pin" size="sm" className="mt-0.5 shrink-0 text-secondary" />
            <div>
              <strong className="block text-foreground">Vựa hải sản trung tâm:</strong>
              <span>123 Đường Thủ Khoa Huân, Phường Phú Thủy, TP. Phan Thiết, Bình Thuận</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="truck" size="sm" className="mt-0.5 shrink-0 text-secondary" />
            <div>
              <strong className="block text-foreground">Tổng kho trung chuyển TP.HCM:</strong>
              <span>Số 45 Đường D2, P. Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="phone" size="sm" className="shrink-0 text-secondary" />
            <div>
              <strong className="text-foreground">Hotline đặt hàng hỏa tốc: </strong>
              <span className="font-bold text-primary">1900 6868 — 0912 345 678</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="mail" size="sm" className="shrink-0 text-secondary" />
            <div>
              <strong className="text-foreground">Email: </strong>
              <span>contact@haisanphanthiet.vn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
