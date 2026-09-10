'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { formatCurrency } from '@/utils/Helpers';

type CheckoutQrBankStepProps = {
  orderId: number | string;
  totalAmount: number;
  onPaymentConfirmed: () => void;
};

const BANK_INFO = {
  bankName: 'MB Bank (Ngân Hàng Quân Đội)',
  accountNo: '0345678901',
  accountName: 'HAI SAN PHAN THIET',
};

const handleCopy = (text: string, label: string) => {
  void navigator.clipboard.writeText(text);
  toast.success(`Đã sao chép ${label}!`);
};

export const CheckoutQrBankStep = ({
  orderId,
  totalAmount,
  onPaymentConfirmed,
}: CheckoutQrBankStepProps) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60);
  const transferMemo = `HSPT ${orderId}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const qrUrl = `https://img.vietqr.io/image/MB-0345678901-compact2.png?amount=${totalAmount}&addInfo=${encodeURIComponent(transferMemo)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
          <Icon name="sparkles" size="xs" />
          <span>Thanh Toán Chuyển Khoản 24/7</span>
        </span>
        <h2 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">
          Quét Mã QR Hoặc Chuyển Khoản Ngân Hàng
        </h2>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Mở ứng dụng ngân hàng bất kỳ để quét mã VietQR bên dưới
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
        <div className="flex flex-col items-center rounded-2xl border border-secondary/20 bg-background p-4 shadow-sm">
          <div className="relative h-56 w-56 overflow-hidden rounded-xl bg-white p-2">
            <Image
              src={qrUrl}
              alt="Mã QR Chuyển Khoản"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-secondary">
            <Icon name="clock" size="xs" />
            <span>Mã QR hết hạn sau: </span>
            <span className="font-mono font-bold text-primary">{formattedTime}</span>
          </div>
        </div>

        <div className="w-full max-w-md space-y-3">
          <div className="space-y-2.5 rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Ngân hàng:</span>
              <span className="font-bold text-foreground">{BANK_INFO.bankName}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Số tài khoản:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-secondary">
                  {BANK_INFO.accountNo}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleCopy(BANK_INFO.accountNo, 'Số tài khoản');
                  }}
                  className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-foreground hover:bg-secondary/20"
                >
                  Sao chép
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Chủ tài khoản:</span>
              <span className="font-bold text-foreground">{BANK_INFO.accountName}</span>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-2 text-xs">
              <span className="text-muted-foreground">Số tiền:</span>
              <div className="flex items-center gap-2">
                <span className="font-heading text-base font-bold text-primary">
                  {formatCurrency(totalAmount)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleCopy(String(totalAmount), 'Số tiền');
                  }}
                  className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-foreground hover:bg-secondary/20"
                >
                  Sao chép
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Nội dung CK:</span>
              <div className="flex items-center gap-2">
                <span className="rounded bg-accent/15 px-2 py-0.5 font-mono font-bold text-foreground">
                  {transferMemo}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleCopy(transferMemo, 'Nội dung chuyển khoản');
                  }}
                  className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-foreground hover:bg-secondary/20"
                >
                  Sao chép
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-tertiary/20 bg-tertiary/5 p-3 text-xs text-tertiary">
            <p className="flex items-center gap-1 font-bold">
              <Icon name="shield-check" size="xs" />
              <span>Xác nhận tức thì qua hệ thống tự động</span>
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Sau khi chuyển khoản, bấm nút bên dưới để hoàn tất xác nhận đơn hàng.
            </p>
          </div>

          <button
            type="button"
            onClick={onPaymentConfirmed}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:scale-95 sm:text-sm"
          >
            <Icon name="check-circle" size="sm" />
            <span>Tôi Đã Chuyển Khoản Xong</span>
          </button>
        </div>
      </div>
    </div>
  );
};
