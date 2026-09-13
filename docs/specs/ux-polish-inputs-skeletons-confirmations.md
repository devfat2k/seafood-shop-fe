# Spec: Tối Ưu TextInput, Skeleton Loading Toàn Hệ Thống và Confirmation Popups

## 1. Mục tiêu

Nâng cấp trải nghiệm người dùng (UX/UI) toàn diện trên Seafood Shop Web thông qua 3 cải tiến chính:
1. **Chuẩn hoá TextInput & Placeholder**: Điều chỉnh màu sắc placeholder mờ hơn rõ rệt so với văn bản do người dùng nhập (`text-foreground`), khắc phục tình trạng nhìn nhầm placeholder thành dữ liệu đã nhập. Rút gọn các chuỗi placeholder dài dòng ("VD: ...", các ví dụ giả lập chi tiết) thành các gợi ý định hướng ngắn gọn, tự nhiên.
2. **Hoàn thiện Skeleton Loading toàn dự án**: Bổ sung `loading.tsx` cho tất cả các route trong Next.js App Router (Storefront và Admin Dashboard) và thay thế các spinner xoay tròn chung chung bằng Skeleton chuyên biệt theo đúng khung nội dung thực tế (tuân thủ GEMINI.md Mục 5).
3. **Bổ sung Confirmation Popups cho các thao tác CRUD & hành động nhạy cảm**: Tích hợp `ConfirmDialog` cho các hành vi có tác động lớn (xóa địa chỉ, đăng xuất khỏi tài khoản, đăng xuất quản trị, thay đổi trạng thái đơn hàng quan trọng, xóa cache toàn hệ thống) để phòng tránh click nhầm và đảm bảo an toàn dữ liệu.

## 2. User flow

### Flow 1: Nhập liệu biểu mẫu (Form Inputs)
- Người dùng xem biểu mẫu (đăng nhập, đăng ký, thông tin tài khoản, sổ địa chỉ, tìm kiếm, form tạo/sửa admin).
- Placeholder hiển thị với độ mờ dịu mắt (`placeholder:text-muted-foreground/45`), phân biệt rõ ràng với văn bản gõ thật (`text-foreground`).
- Nội dung gợi ý ngắn gọn, súc tích (ví dụ: "Tìm kiếm hải sản...", "Họ và tên", "Số điện thoại", "Ghi chú đơn hàng (tuỳ chọn)...").
- Khi người dùng gõ phím, văn bản người dùng hiển thị đậm nét, dễ đọc.

### Flow 2: Điều hướng trang & tải dữ liệu (Route & Data Loading)
- Người dùng nhấp vào danh mục, chi tiết sản phẩm, giỏ hàng, thanh toán hoặc chuyển tab quản trị Admin.
- Khi mạng chậm hoặc đang fetch dữ liệu, màn hình lập tức hiển thị Skeleton layout tương ứng với đúng kích thước và bố cục của trang đích (thay vì trang đơ hoặc chỉ có spinner xoay tròn).
- Khi gõ từ khoá tìm kiếm trên Header (`HeaderSearch`), dropdown lập tức hiển thị Skeleton items (thumbnail + tiêu đề + giá) trước khi kết quả trả về.
- Sau khi tải xong, nội dung thực tế xuất hiện mượt mà.

### Flow 3: Thao tác CRUD & Hành động nhạy cảm (Confirmations)
- **Xóa địa chỉ**: Người dùng bấm icon thùng rác tại Sổ địa chỉ -> Popup xác nhận mở ra -> Bấm "Xác nhận" mới thực hiện gọi API xóa -> Thông báo toast thành công.
- **Đăng xuất tài khoản**: Người dùng bấm "Đăng xuất" (tại Header dropdown, Account Sidebar hoặc Admin Topbar) -> Popup xác nhận mở ra ("Bạn có chắc chắn muốn đăng xuất?") -> Bấm "Đăng xuất" mới xóa session và chuyển hướng.
- **Thay đổi trạng thái đơn hàng**: Quản trị viên thay đổi trạng thái đơn sang ĐÃ HỦY (`CANCELLED`) hoặc HOÀN TẤT (`DONE`) -> Popup xác nhận hiển thị cảnh báo -> Bấm "Xác nhận" mới lưu thay đổi.
- **Đồng bộ hệ thống (Clear Cache Toàn Diện)**: Quản trị viên bấm nút "Đồng bộ lên cửa hàng ngay" -> Popup xác nhận mở ra -> Xác nhận mới kích hoạt clear cache.

## 3. API liên quan

Tất cả các endpoint API đã có sẵn trong hệ thống qua TanStack Query hooks, không cần thêm endpoint mới:
- `useDeleteAddressMutation()`: Xóa địa chỉ (`/api/v1/addresses/{id}`)
- `useLogoutMutation()`: Đăng xuất người dùng (`/api/v1/auth/logout`)
- `useAdminLogoutMutation()`: Đăng xuất quản trị (`/api/v1/admin/auth/logout`)
- `useUpdateOrderStatusMutation()`: Cập nhật trạng thái đơn hàng (`/api/v1/admin/orders/{id}/status`)
- `useEvictCacheMutation()`: Đồng bộ cache hệ thống (`/api/v1/admin/dashboard/evict-cache`)

## 4. UI states

| Thành phần / Màn hình | Loading | Empty | Error | Confirm State |
|---|---|---|---|---|
| Header Instant Search | Skeleton 3 items (ảnh + title + price) | Gợi ý từ khoá hot | Không áp dụng (fallback rỗng) | Không |
| Route chuyển trang (Home, Catalog, Detail, Checkout, Account, Admin) | `loading.tsx` với Skeleton đúng khung hình chuẩn | Trang 404 / Empty state tương ứng | `error.tsx` / Banner báo lỗi | Không |
| Sổ địa chỉ (Account Addresses) | `AddressesSkeleton` | Empty banner + nút thêm địa chỉ | Banner lỗi + nút thử lại | `ConfirmDialog` xác nhận xóa |
| Đăng xuất (Storefront & Admin) | Nút loading spinner trong modal | Không áp dụng | Toast lỗi | `ConfirmDialog` xác nhận đăng xuất |
| Trạng thái đơn hàng (Admin Orders) | Skeleton hàng bảng | Bảng rỗng + icon | Banner lỗi + nút thử lại | `ConfirmDialog` khi đổi sang trạng thái hủy/hoàn tất |
| Đồng bộ hệ thống (Admin System) | Nút spin "Đang đồng bộ..." | Không áp dụng | Toast lỗi | `ConfirmDialog` xác nhận đồng bộ toàn diện |

## 5. Edge cases

1. **Người dùng huỷ thao tác (Cancel popup)**: Đóng modal, trạng thái form hoặc bảng giữ nguyên không biến đổi.
2. **Mạng rớt khi đang confirm action**: Nút trong `ConfirmDialog` hiển thị loading state, bắt exception qua try/catch và hiển thị `toast.error(message)`, không đóng dialog nếu thất bại để người dùng có thể thử lại hoặc huỷ.
3. **Nhập liệu dài hoặc có ký tự đặc biệt**: Placeholder biến mất tự nhiên khi có ký tự đầu tiên, màu text user input tuân thủ token `text-foreground` với độ tương phản WCAG AA.
4. **Chuyển trang liên tục khi mạng chậm**: Next.js App Router quản lý stream qua `loading.tsx`, không gây lỗi memory leak hay chồng lấn giao diện.

## 6. Ngoài phạm vi (Out of scope)

- Không thay đổi schema validation hoặc API backend contracts.
- Không thay đổi business flow của quy trình thanh toán VNPay/COD.
- Giữ nguyên toàn bộ logic cart store và state management hiện tại.
