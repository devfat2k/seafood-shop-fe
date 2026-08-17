'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams?.get('status') === 'failed' ? 'failed' : 'success';

  const [status, setStatus] = useState<'success' | 'failed'>(initialStatus);

  return (
    <div className="min-h-[80vh] bg-[#F8FAFC] py-12 lg:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Demo Toggle Switcher */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="text-text-secondary text-xs font-bold">Chế độ Demo UI:</span>
          <div className="flex rounded-full border border-[#E2E8F0] bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setStatus('success');
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                status === 'success'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-text-secondary hover:text-[#0F172A]'
              }`}
            >
              Thành Công
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus('failed');
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                status === 'failed'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-text-secondary hover:text-[#0F172A]'
              }`}
            >
              Thất Bại
            </button>
          </div>
        </div>

        {/* Main Result Card */}
        <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-xl sm:p-10">
          {status === 'success' ? (
            /* SUCCESS STATE */
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Icon name="check" size="xl" />
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-extrabold text-emerald-700">
                <Icon name="sparkles" size="xs" />
                <span>THANH TOÁN THÀNH CÔNG</span>
              </div>

              <h1 className="mt-4 text-3xl font-black text-[#0F172A] sm:text-4xl">
                Cảm Ơn Bạn Đã Đặt Hàng!
              </h1>
              <p className="text-text-secondary mt-2 text-xs sm:text-base">
                Đơn hàng hải sản tươi sống của bạn đã được tiếp nhận &amp; đang đóng thùng oxy giao
                tốc độ.
              </p>

              {/* Order Details Box */}
              <div className="mt-8 space-y-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-left">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-xs font-bold text-[#0F172A]">
                  <span>Mã đơn hàng:</span>
                  <span className="font-mono text-sm text-[#1E3A8A]">#SF-89241</span>
                </div>

                <div className="text-text-secondary flex items-center justify-between text-xs">
                  <span>Tổng tiền đã thanh toán:</span>
                  <span className="text-base font-extrabold text-[#F97316]">1.600.000₫</span>
                </div>

                <div className="text-text-secondary flex items-center justify-between text-xs">
                  <span>Phương thức thanh toán:</span>
                  <span className="font-semibold text-[#0F172A]">Cổng VNPAY (Thẻ / QR)</span>
                </div>

                <div className="text-text-secondary flex items-center justify-between text-xs">
                  <span>Thời gian giao hàng dự kiến:</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600">
                    <Icon name="clock" size="xs" />
                    Trong 2 giờ (Tận bàn tiệc)
                  </span>
                </div>

                <div className="text-text-secondary border-t border-[#E2E8F0] pt-3 text-xs">
                  <span className="font-bold text-[#0F172A]">Địa chỉ nhận hàng:</span>
                  <p className="text-text-secondary mt-1 font-medium">
                    123 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/account"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A8A] px-8 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#172554]"
                >
                  <span>Xem Chi Tiết Đơn Hàng</span>
                  <Icon name="arrow-right" size="sm" />
                </Link>

                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-8 py-3.5 text-xs font-bold text-[#0F172A] shadow-xs transition-transform hover:scale-[1.02] hover:bg-[#F1F5F9]"
                >
                  <span>Tiếp Tục Mua Sắm</span>
                  <Icon name="fish" size="sm" />
                </Link>
              </div>
            </div>
          ) : (
            /* FAILED STATE */
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Icon name="x" size="xl" />
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-extrabold text-red-700">
                <Icon name="shield-check" size="xs" />
                <span>THANH TOÁN KHÔNG THÀNH CÔNG</span>
              </div>

              <h1 className="mt-4 text-3xl font-black text-[#0F172A] sm:text-4xl">
                Giao Dịch Bị Gián Đoạn
              </h1>
              <p className="text-text-secondary mt-2 text-xs sm:text-base">
                Rất tiếc, đơn hàng của bạn chưa được thanh toán thành công.
              </p>

              {/* Error Details Box */}
              <div className="mt-8 space-y-3 rounded-2xl border border-red-200 bg-red-50/50 p-6 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-red-900">
                  <span>Mã lỗi giao dịch:</span>
                  <span className="font-mono text-sm">#ERR-99 (VNPAY Timeout)</span>
                </div>

                <div className="text-xs leading-relaxed text-red-800">
                  <span className="font-bold">Nguyên nhân có thể:</span>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4">
                    <li>Thao tác thanh toán vượt quá thời gian cho phép (Timeout).</li>
                    <li>Tài khoản ngân hàng hoặc thẻ không đủ số dư.</li>
                    <li>Bạn đã huỷ giao dịch trên ứng dụng Ngân hàng / VNPAY.</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F97316] px-8 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#EA580C]"
                >
                  <span>Thử Thanh Toán Lại</span>
                  <Icon name="arrow-right" size="sm" />
                </Link>

                <a
                  href="tel:19008888"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-8 py-3.5 text-xs font-bold text-[#0F172A] shadow-xs transition-transform hover:scale-[1.02] hover:bg-[#F1F5F9]"
                >
                  <Icon name="phone" size="sm" className="text-[#1E3A8A]" />
                  <span>Hotline Hỗ Trợ (1900 8888)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={<div className="min-h-[80vh] bg-[#F8FAFC] py-12 text-center">Loading...</div>}
    >
      <PaymentResultContent />
    </Suspense>
  );
}
