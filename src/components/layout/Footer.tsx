'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

export function Footer() {
  return (
    <footer className="border-t border-[#0B2F28] bg-[#0E3D34] pt-16 pb-8 text-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Cột 1: Thương hiệu */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0E3D34]">
                <Icon name="fish" size="sm" />
              </div>
              <span className="text-lg font-extrabold tracking-wide uppercase">
                HẢI SẢN PHAN THIẾT
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/80">
              Thương hiệu cung cấp hải sản tươi sống đánh bắt tự nhiên từ vùng biển Phan Thiết, giao
              tận nhà trong 2h, đóng thùng giữ lạnh chuẩn xuất khẩu.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/"
                aria-label="Website"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#D9A441] hover:text-[#26312D]"
              >
                <Icon name="sparkles" size="sm" />
              </Link>
              <Link
                href="/contact"
                aria-label="Hotline"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#D9A441] hover:text-[#26312D]"
              >
                <Icon name="phone" size="sm" />
              </Link>
              <Link
                href="/contact"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#D9A441] hover:text-[#26312D]"
              >
                <Icon name="mail" size="sm" />
              </Link>
            </div>
          </div>

          {/* Cột 2: Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-[#D9A441] uppercase">
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/80">
              <li>
                <Link href="/policy/shipping" className="transition-colors hover:text-white">
                  Chính sách giao hàng 2h
                </Link>
              </li>
              <li>
                <Link href="/policy/refund" className="transition-colors hover:text-white">
                  Cam kết 1 đổi 1 nếu lỗi
                </Link>
              </li>
              <li>
                <Link href="/guide" className="transition-colors hover:text-white">
                  Hướng dẫn mua hàng online
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="transition-colors hover:text-white">
                  Kiểm tra đơn hàng của bạn
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Liên hệ &amp; Góp ý
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Danh mục bán chạy */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-[#D9A441] uppercase">
              DANH MỤC BÁN CHẠY
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/80">
              <li>
                <Link
                  href="/products?category=set-combo"
                  className="transition-colors hover:text-white"
                >
                  Set Combo BBQ Cuối Tuần
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=tom-cua"
                  className="transition-colors hover:text-white"
                >
                  Tôm Hùm Sống Cực Rẻ
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=muc-bach-tuoc"
                  className="transition-colors hover:text-white"
                >
                  Mực Lá Nướng Phan Thiết
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=so-oc"
                  className="transition-colors hover:text-white"
                >
                  Hàu Sữa &amp; Ốc Hương
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=dac-san-kho"
                  className="transition-colors hover:text-white"
                >
                  Đặc Sản Khô &amp; Gia Vị
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký nhận tin */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-[#D9A441] uppercase">
              ĐĂNG KÝ NHẬN TIN
            </h4>
            <p className="mt-4 text-xs leading-relaxed text-white/80">
              Đăng ký nhận tin để không bỏ lỡ voucher và ưu đãi mua hải sản tươi ngon giá tốt nhất
            </p>
            <form
              className="mt-4 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                aria-label="Email nhận thông báo ưu đãi"
                placeholder="Nhập email của bạn..."
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/50 focus:border-[#D9A441] focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[#D9A441] px-4 py-2.5 text-xs font-bold text-[#26312D] transition-transform hover:scale-105"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© 2026 Hải Sản Ecommerce Hải Sản Phan Thiết. Bản quyền thuộc về Cảng cá Phan Thiết.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white">
              Điều khoản sử dụng
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Chính sách bảo mật
            </Link>
            <Link href="/map" className="hover:text-white">
              Bản đồ cảng cá
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
