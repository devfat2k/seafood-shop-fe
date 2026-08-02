import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFEDD5] bg-[#FFEDD5]/80 px-4 py-1.5 text-xs font-bold text-[#EA580C]">
              <Icon name="sparkles" size="xs" />
              <span>SET TIỆC BBQ CUỐI TUẦN BÁN CHẠY NHẤT</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl/tight">
              Cảng cá Phan Thiết
              <br />
              <span className="text-[#F97316]">Gõ cửa nhà bạn</span>
              <br />
              <span className="text-[#1E3A8A]">trong 2 giờ!</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Hải sản tươi rói đánh bắt trong đêm, đóng thùng giữ lạnh chuẩn xuất khẩu và giao thẳng
              tới bàn tiệc của bạn. Cam kết 1 đổi 1 nếu không tươi sống.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products?category=set-combo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A8A] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#172554] hover:shadow-xl"
              >
                <span>Đặt Combo BBQ Ngay</span>
                <Icon name="arrow-right" size="sm" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-6 py-3.5 text-sm font-bold text-[#0F172A] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1E3A8A] hover:bg-[#EDF2F7]"
              >
                <span>Xem Thực Đơn</span>
                <Icon name="fish" size="sm" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#E2E8F0] pt-6">
              <div>
                <p className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">100%</p>
                <p className="mt-1 text-xs font-semibold text-text-secondary">Tươi Sống Tại Bể</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#1E3A8A] sm:text-3xl">&lt; 2 Giờ</p>
                <p className="mt-1 text-xs font-semibold text-text-secondary">Giao Nhanh Tốc Độ</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#F97316] sm:text-3xl">4.9 ★</p>
                <p className="mt-1 text-xs font-semibold text-text-secondary">10.000+ Khách Hàng</p>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#EDF2F7] p-3 shadow-xl transition-all hover:shadow-2xl">
              <div className="relative overflow-hidden rounded-2xl bg-[#1E3A8A]">
                <img
                  src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1000&q=80"
                  alt="Set Hải Sản BBQ Phan Thiết"
                  className="h-100 w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-xl backdrop-blur-md transition-all group-hover:bg-white/95">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#1E3A8A] px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase">
                      COMBO TIẾT KIỆM
                    </span>
                    <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-extrabold text-red-600">
                      -15% GIẢM SỐC
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="mr-2 text-xs text-text-secondary line-through">
                      1.150.000đ
                    </span>
                    <span className="text-lg font-extrabold text-text-primary">980.000đ</span>
                  </div>
                </div>
                <h3 className="mt-2 text-base font-bold text-text-primary">
                  Set Hải Sản BBQ &quot;Đại Dương Xanh&quot;
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
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
