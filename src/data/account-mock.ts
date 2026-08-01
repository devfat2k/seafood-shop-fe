export type UserProfile = {
  name: string;
  avatar: string;
  rank: string;
  rewardPoints: number;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'Nam' | 'Nữ' | 'Khác';
};

export type OrderItem = {
  id: string;
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  price: number;
  image: string;
};

export type DeliveryStep = {
  title: string;
  time: string;
  completed: boolean;
  current?: boolean;
};

export type Order = {
  id: string;
  code: string;
  orderDate: string;
  status: 'DELIVERING' | 'COMPLETED' | 'PENDING' | 'CANCELLED';
  statusText: string;
  statusBadgeColor: string;
  totalPrice: number;
  items: OrderItem[];
  deliveryTimeline?: DeliveryStep[];
  shipperPhone?: string;
};

export type UserAddress = {
  id: string;
  name: string;
  phone: string;
  addressDetail: string;
  isDefault: boolean;
  tag?: string;
};

export const MOCK_USER_PROFILE: UserProfile = {
  name: 'Nguyễn Văn A',
  avatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  rank: 'Thành viên Bạc',
  rewardPoints: 120,
  email: 'nguyenvana@gmail.com',
  phone: '0912 345 678',
  birthDate: '15/08/1995',
  gender: 'Nam',
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1',
    code: '#PT-89421',
    orderDate: '08:30 sáng - Hôm nay (25/05/2026)',
    status: 'DELIVERING',
    statusText: 'ĐANG GIAO HÀNG',
    statusBadgeColor: 'bg-amber-100 text-amber-700',
    totalPrice: 1_540_000,
    shipperPhone: '0988 777 666',
    items: [
      {
        id: 'item-1',
        name: 'Tôm Hùm Bông Phan Thiết Tươi Sống',
        spec: 'Số lượng: 1 con • ~1kg',
        quantity: 1,
        unit: 'Kg',
        price: 890_000,
        image:
          'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'item-2',
        name: 'Set Nhậu Hải Sản "Cuối Tuần Vui Vẻ"',
        spec: 'Số lượng: 1 set • Kèm nước chấm',
        quantity: 1,
        unit: 'Set',
        price: 650_000,
        image:
          'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=200&q=80',
      },
    ],
    deliveryTimeline: [
      { title: 'Đã Đặt Đơn', time: '08:30 - Hôm nay', completed: true },
      { title: 'Đã Xác Nhận', time: '08:45 - Hôm nay', completed: true },
      { title: 'Đang Giao Hàng', time: '09:15 - Hôm nay', completed: true, current: true },
      { title: 'Đã Hoàn Tất', time: 'Dự kiến 10:15', completed: false },
    ],
  },
  {
    id: 'ord-2',
    code: '#PT-87115',
    orderDate: 'Ngày đặt: 15/05/2026',
    status: 'COMPLETED',
    statusText: 'ĐÃ HOÀN THÀNH',
    statusBadgeColor: 'bg-emerald-100 text-emerald-700',
    totalPrice: 480_000,
    items: [
      {
        id: 'item-3',
        name: 'Mực Lá Phan Thiết Lớn (Size 2-3 con)',
        spec: 'Số lượng: 1 kg • Đóng khay hút chân không',
        quantity: 1,
        unit: 'Kg',
        price: 380_000,
        image:
          'https://images.unsplash.com/photo-1545696968-1a5245650b36?auto=format&fit=crop&w=200&q=80',
      },
    ],
  },
];

export const MOCK_ADDRESSES: UserAddress[] = [
  {
    id: 'addr-1',
    name: 'Nguyễn Văn A',
    phone: '0912 345 678',
    addressDetail: '123 Nguyễn Đình Chiểu, Phường Hàm Tiến, TP. Phan Thiết, Bình Thuận',
    isDefault: true,
    tag: 'Nhà riêng',
  },
  {
    id: 'addr-2',
    name: 'Nguyễn Văn A',
    phone: '0912 345 678',
    addressDetail: '456 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh',
    isDefault: false,
    tag: 'Văn phòng',
  },
];
