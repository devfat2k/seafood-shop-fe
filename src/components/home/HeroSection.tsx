import { Icon } from "@/components/common/Icon";
import { Link } from "@/libs/I18nNavigation";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FBF8F3] lg:py-10 rounded-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full  bg-[#F6E8CC]/60 px-4 py-1.5 text-xs font-bold text-[#C4922F]">
              <span>SET TIỆC BBQ CUỐI TUẦN BÁN CHẠY NHẤT</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#26312D] sm:text-5xl lg:text-6xl/tight">
              Cảng cá Phan Thiết
              <br />
              <span className="text-[#D9A441]">Gõ cửa nhà bạn</span>
              <br />
              trong 2 giờ!
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5B6B63] sm:text-lg">
              Hải sản tươi rói đánh bắt trong đêm, đóng thùng giữ lạnh chuẩn
              xuất khẩu và giao thẳng tới bàn tiệc của bạn. Cam kết 1 đổi 1 nếu
              không tươi sống.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products?category=set-combo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0E3D34] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#0B2F28] hover:shadow-xl"
              >
                <span>Đặt Sốt BBQ Ngay</span>
                <Icon name="arrow-right" size="sm" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#26312D] shadow-sm transition-all hover:border-[#0E3D34] hover:bg-[#F5F1E8]"
              >
                <span>Xem Thực Đơn</span>
                <Icon name="fish" size="sm" />
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl bg-[#F5F1E8] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1000&q=80"
                alt="Set Hải Sản BBQ Phan Thiết"
                className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute right-4 bottom-4 left-4 rounded-2xl  bg-white/90 p-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#0E3D34] px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                    COMBO TIẾT KIỆM
                  </span>
                  <div className="text-right">
                    <span className="mr-2 text-xs text-[#5B6B63] line-through">
                      1.150.000đ
                    </span>
                    <span className="text-lg font-extrabold text-[#D9A441]">
                      980.000đ
                    </span>
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
