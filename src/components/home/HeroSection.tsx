import { Link } from '@/libs/I18nNavigation';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FBF8F3] py-12 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* CỘT TRÁI: Content & CTAs */}
          <div className="lg:col-span-7">
            {/* Tag nhỏ trên cùng */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F6E8CC] bg-[#F6E8CC]/60 px-4 py-1.5 text-xs font-bold text-[#C4922F]">
              <span>🔥 SET TIỆC BBQ CUỐI TUẦN BÁN CHẠY NHẤT</span>
            </div>

            {/* Headline chính */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#26312D] sm:text-5xl lg:text-6xl/tight">
              Cảng cá Phan Thiết
              <br />
              <span className="text-[#D9A441]">Gõ cửa nhà bạn</span>
              <br />
              trong 2 giờ!
            </h1>

            {/* Sub-description */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5B6B63] sm:text-lg">
              Hải sản tươi rói đánh bắt trong đêm, đóng thùng giữ lạnh chuẩn xuất khẩu và giao thẳng
              tới bàn tiệc của bạn. Cam kết 1 đổi 1 nếu không tươi sống.
            </p>

            {/* Nhóm nút CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products?category=set-combo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0E3D34] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#0B2F28] hover:shadow-xl"
              >
                <span>Đặt Sốt BBQ Ngay</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E4E0D8] bg-white px-6 py-3.5 text-sm font-bold text-[#26312D] shadow-sm transition-all hover:border-[#0E3D34] hover:bg-[#F5F1E8]"
              >
                <span>📋 Xem Thực Đơn</span>
              </Link>
            </div>

            {/* Social Proof / Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#E4E0D8] pt-8">
              <div>
                <p className="text-2xl font-extrabold text-[#26312D] sm:text-3xl">100%</p>
                <p className="mt-1 text-xs text-[#5B6B63]">Tươi Sống Tại Nước</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#26312D] sm:text-3xl">Giao &lt;2h</p>
                <p className="mt-1 text-xs text-[#5B6B63]">Nội Thành Tốc Độ</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#26312D] sm:text-3xl">4.9★</p>
                <p className="mt-1 text-xs text-[#5B6B63]">Từ 10.000+ Khách Hàng</p>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Graphic Card & Floating Promo Box */}
          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#F5F1E8] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1000&q=80"
                alt="Set Hải Sản BBQ Phan Thiết"
                className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Card Nổi Floating Promo Box */}
              <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#0E3D34] px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                    COMBO TIẾT KIỆM
                  </span>
                  <div className="text-right">
                    <span className="mr-2 text-xs text-[#5B6B63] line-through">1.150.000đ</span>
                    <span className="text-lg font-extrabold text-[#D9A441]">980.000đ</span>
                  </div>
                </div>
                <h3 className="mt-2 text-base font-bold text-[#26312D]">
                  Set Hải Sản BBQ &quot;Đại Dương Xanh&quot;
                </h3>
                <p className="mt-1 text-xs text-[#5B6B63]">
                  Tôm hùm, Mực lá, Sò điệp, Rau củ nướng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
