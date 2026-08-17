'use client';

import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/common/Logo';
import { Link } from '@/libs/I18nNavigation';

export function Footer() {
  return (
    <footer className="border-t border-secondary/20 bg-foreground pt-12 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="space-y-3">
            <Link href="/">
              <Logo textColor="text-white" showSubtext={false} />
            </Link>

            <p className="text-xs leading-relaxed text-white/80">
              Sàn thương mại điện tử hải sản tươi sống chất lượng cao, thu mua trực tiếp tại bến
              cảng Phan Thiết, Bình Thuận. Chuỗi lạnh khép kín giao nhanh 2h tại TP.HCM.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary">
                <Icon name="sparkles" size="xs" />
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary">
                <Icon name="phone" size="xs" />
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary">
                <Icon name="mail" size="xs" />
              </span>
            </div>
          </div>

          {/* Cột 2: Hỗ trợ khách hàng */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider text-accent uppercase">
              Hỗ trợ khách hàng
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-white/80">
              <li>
                <Link href="/policy/shipping" className="transition-colors hover:text-white">
                  Chính sách giao hàng 2h
                </Link>
              </li>
              <li>
                <Link href="/policy/refund" className="transition-colors hover:text-white">
                  Cam kết 1 đổi 1 nếu không tươi
                </Link>
              </li>
              <li>
                <Link href="/guide" className="transition-colors hover:text-white">
                  Hướng dẫn mua hàng online
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="transition-colors hover:text-white">
                  Kiểm tra đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Liên hệ &amp; Góp ý
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Danh mục nổi bật */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider text-accent uppercase">
              Danh mục nổi bật
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-white/80">
              <li>
                <Link
                  href="/products?category=tom-cua"
                  className="transition-colors hover:text-white"
                >
                  Tôm hùm &amp; Cua gạch Phan Thiết
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=muc-tuoi"
                  className="transition-colors hover:text-white"
                >
                  Mực nháy &amp; Bạch tuộc sống
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=ca-mot-nang"
                  className="transition-colors hover:text-white"
                >
                  Cá thu một nắng &amp; Cá bớp cắt lát
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=oc-so"
                  className="transition-colors hover:text-white"
                >
                  Ốc hương &amp; Cồi sò điệp đại
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=combo-tiec"
                  className="transition-colors hover:text-white"
                >
                  Combo đại tiệc hải sản cao cấp
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Cam kết chuỗi lạnh & Liên hệ */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider text-accent uppercase">
              Liên hệ trực tiếp
            </h4>
            <div className="mt-3 space-y-2 text-xs text-white/80">
              <p>📍 Cảng cá Phan Thiết, Phường Đức Thắng, TP. Phan Thiết, Bình Thuận</p>
              <p>🏢 Kho trung chuyển: 128 Nguyễn Hữu Cảnh, P.22, Q. Bình Thạnh, TP.HCM</p>
              <p className="font-bold text-white">📞 Hotline: 1900 6868 (07:00 - 21:00)</p>
              <p>✉️ Email: lienhe@haisanphanthiet.vn</p>
            </div>
          </div>
        </div>

        {/* Bottom bar & Payment badges */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© 2026 Hải Sản Phan Thiết Premium. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white/80">
            <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1">VNPAY</span>
            <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1">MOMO</span>
            <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1">ZALOPAY</span>
            <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
