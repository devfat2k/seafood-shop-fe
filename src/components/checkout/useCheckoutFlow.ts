'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from '@/libs/I18nNavigation';
import { useCurrentUserQuery } from '@/libs/queries/auth';
import { useCreateOrderMutation } from '@/libs/queries/orders';
import { useCreatePaymentUrlMutation } from '@/libs/queries/payments';
import { useAddressesQuery, useSetDefaultAddressMutation } from '@/libs/queries/users';
import { useCartStore } from '@/libs/stores/cart';
import type { PaymentMethod } from '@/types/payment';
import type { UserAddress } from '@/types/user';

export const useCheckoutFlow = () => {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [note, setNote] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('VNPAY');
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<{ id: number; totalAmount: number } | null>(
    null,
  );

  const { data: userProfile, isLoading: isUserLoading } = useCurrentUserQuery();
  const { data: addresses = [], isLoading: isAddressesLoading } = useAddressesQuery();
  const createOrderMutation = useCreateOrderMutation();
  const createPaymentUrlMutation = useCreatePaymentUrlMutation();
  const setDefaultAddressMutation = useSetDefaultAddressMutation();

  const isSubmitting =
    createOrderMutation.isPending ||
    createPaymentUrlMutation.isPending ||
    setDefaultAddressMutation.isPending;

  const activeAddress =
    selectedAddress ?? addresses.find((a: UserAddress) => a.defaultAddress) ?? addresses[0] ?? null;

  const handleNextToPayment = () => {
    if (!userProfile) {
      toast.info('Vui lòng đăng nhập để tiếp tục thanh toán');
      setIsAuthModalOpen(true);
      return;
    }
    if (!activeAddress) {
      toast.error('Vui lòng chọn hoặc thêm địa chỉ nhận hàng');
      return;
    }
    setCurrentStep(2);
  };

  const handleNextToConfirm = () => {
    if (!userProfile) {
      toast.info('Vui lòng đăng nhập để tiếp tục');
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    if (!userProfile) {
      setIsAuthModalOpen(true);
      toast.info('Vui lòng đăng nhập để tiến hành đặt hàng');
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
      if (!activeAddress.defaultAddress) {
        await setDefaultAddressMutation.mutateAsync(activeAddress.id);
      }

      const orderItems = items.map((item) => {
        const idFallback = typeof item.id === 'number' ? item.id : Number(item.id.split('-')[0]);
        const cleanId = item.productId ?? (idFallback || 1);
        return {
          productId: cleanId,
          quantity: item.quantity,
        };
      });

      const backendPaymentMethod = selectedMethod === 'QR_BANK' ? 'COD' : selectedMethod;
      const orderNote =
        selectedMethod === 'QR_BANK'
          ? `[Chuyển khoản VietQR] ${note.trim()}`.trim()
          : note.trim() || undefined;

      const orderRes = await createOrderMutation.mutateAsync({
        paymentMethod: backendPaymentMethod,
        note: orderNote,
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
          window.location.href = paymentRes.data.paymentUrl;
          return;
        }
      }

      if (selectedMethod === 'QR_BANK') {
        clearCart();
        setCreatedOrder({
          id: orderData.id,
          totalAmount: orderData.totalAmount ?? subtotal,
        });
        toast.success('Đơn hàng đã được tạo thành công! Vui lòng quét mã QR để thanh toán.');
        return;
      }

      clearCart();
      toast.success('Đặt hàng thành công! Email xác nhận đã được gửi đến hộp thư của bạn.');
      router.push(
        `/payment-result?orderId=${orderData.id}&status=success&paymentMethod=${selectedMethod}`,
      );
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : 'Đặt hàng không thành công, vui lòng thử lại sau';
      toast.error(msg);
    }
  };

  const handleQrConfirmed = () => {
    if (!createdOrder) {
      return;
    }
    router.push(
      `/payment-result?orderId=${createdOrder.id}&status=pending_qr&paymentMethod=QR_BANK`,
    );
  };

  return {
    items,
    subtotal,
    currentStep,
    setCurrentStep,
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
    createdOrder,
    handleNextToPayment,
    handleNextToConfirm,
    handlePlaceOrder,
    handleQrConfirmed,
  };
};
