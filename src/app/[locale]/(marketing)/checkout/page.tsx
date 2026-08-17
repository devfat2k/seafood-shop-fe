import type { Metadata } from 'next';
import { CheckoutContainer } from '@/components/checkout/CheckoutContainer';

export const metadata: Metadata = {
  title: 'Thanh Toán Đơn Hàng — Hải Sản Tươi Sống Phan Thiết',
  description: 'Xác nhận đơn hàng và thanh toán nhanh chóng, an toàn qua VNPay hoặc COD',
};

export default function CheckoutPage() {
  return <CheckoutContainer />;
}
