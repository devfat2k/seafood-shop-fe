'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from '@/libs/I18nNavigation';
import { useCurrentUserQuery } from '@/libs/queries/auth';
import { useCreateOrderMutation } from '@/libs/queries/orders';
import { useCreatePaymentUrlMutation } from '@/libs/queries/payments';
import { useAddressesQuery } from '@/libs/queries/users';
import { useCartStore } from '@/libs/stores/cart';
import type { PaymentMethod } from '@/types/payment';
import type { UserAddress } from '@/types/user';

export const useCheckoutFlow = () => {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [note, setNote] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('VNPAY');
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [waitingPayment, setWaitingPayment] = useState<{
    orderId: number | string;
    method: PaymentMethod;
  } | null>(null);

  const { data: userProfile, isLoading: isUserLoading } = useCurrentUserQuery();
  const { data: addresses = [], isLoading: isAddressesLoading } = useAddressesQuery();
  const createOrderMutation = useCreateOrderMutation();
  const createPaymentUrlMutation = useCreatePaymentUrlMutation();

  const isSubmitting = createOrderMutation.isPending || createPaymentUrlMutation.isPending;

  const activeAddress =
    selectedAddress ?? addresses.find((a: UserAddress) => a.defaultAddress) ?? addresses[0] ?? null;

  const handlePlaceOrder = async () => {
    if (!userProfile) {
      setIsAuthModalOpen(true);
      toast.error('Vui lòng đăng nhập để tiến hành đặt hàng');
      return;
    }

    if (items.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }

    if (!activeAddress) {
      toast.error('Vui lòng thêm địa chỉ nhận hàng trước khi thanh toán');
      return;
    }

    try {
      const orderItems = items.map((item) => {
        const rawId = item.productId ?? Number(String(item.id).split('-')[0]);
        const cleanId = typeof rawId === 'number' && !Number.isNaN(rawId) ? rawId : 1;
        return {
          productId: cleanId,
          quantity: item.quantity,
        };
      });

      const orderRes = await createOrderMutation.mutateAsync({
        paymentMethod: selectedMethod,
        note: note.trim() || undefined,
        items: orderItems,
      });

      const orderData = orderRes.data;
      if (!orderData?.id) {
        throw new Error('Không nhận được mã đơn hàng từ hệ thống');
      }

      if (selectedMethod === 'VNPAY') {
        const paymentRes = await createPaymentUrlMutation.mutateAsync({
          orderId: orderData.id,
        });

        if (paymentRes.data?.paymentUrl) {
          clearCart();
          const newTab = window.open(paymentRes.data.paymentUrl, '_blank');
          if (newTab) {
            toast.success('Cổng thanh toán VNPAY đã mở ở tab mới!');
            setWaitingPayment({ orderId: orderData.id, method: selectedMethod });
          } else {
            toast.info('Trình duyệt đã chặn tab mới. Đang chuyển hướng...');
            window.location.href = paymentRes.data.paymentUrl;
          }
          return;
        }
      }

      clearCart();
      toast.success('Đặt hàng thành công!');
      router.push(
        `/payment-result?orderId=${orderData.id}&status=success&paymentMethod=${selectedMethod}`,
      );
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : 'Đặt hàng không thành công, vui lòng thử lại sau';
      toast.error(msg);
    }
  };

  const handlePaymentConfirmed = (status: 'success' | 'failed') => {
    if (!waitingPayment) {
      return;
    }
    const { orderId, method } = waitingPayment;
    setWaitingPayment(null);
    router.push(`/payment-result?orderId=${orderId}&status=${status}&paymentMethod=${method}`);
  };

  return {
    items,
    subtotal,
    note,
    setNote,
    selectedMethod,
    setSelectedMethod,
    selectedAddress: activeAddress,
    setSelectedAddress,
    userProfile,
    isUserLoading,
    isAddressesLoading,
    isSubmitting,
    isAuthModalOpen,
    setIsAuthModalOpen,
    waitingPayment,
    handlePlaceOrder,
    handlePaymentConfirmed,
  };
};
