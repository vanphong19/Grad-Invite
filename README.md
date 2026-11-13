# Graduation Invitation

Thiệp mời tốt nghiệp của Văn Phong, gồm đúng hai trang: bìa và nội dung buổi lễ. Thiệp dùng navy, giấy ivory và điểm vàng đồng, với Lora cho tên/ngày giờ và Geist cho nội dung. Trang thông tin có ô ảnh chân dung dọc 3:4, ảnh tạm là mũ và sách tốt nghiệp. Toàn bộ nút và nội dung nằm trong thiệp; nền bên ngoài để trống. Bìa mở theo nếp gấp bên trái. Dự án sử dụng Next.js App Router, TypeScript, Tailwind CSS và Motion for React; không cần backend, tài khoản hay database.

## Chạy tại máy

Yêu cầu Node.js 20.19 trở lên và npm (bao gồm yêu cầu runtime của ESLint). Trong thư mục dự án:

```bash
npm install
npm run dev
```

Mở địa chỉ được hiển thị trong terminal, mặc định là http://localhost:3000.

Kiểm tra và chạy bản production:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`next/font` tải font trong lần build đầu tiên, vì vậy môi trường build cần truy cập Google Fonts. Ảnh phục vụ từ `public/images` qua `next/image`, không phụ thuộc dịch vụ ảnh bên ngoài.

## Thay nội dung thiệp

Chỉnh một file duy nhất: `config/invitation.ts`. Tên Văn Phong, ngày làm lễ 25/11/2026, giờ chụp hình 15:30, số liên hệ 0984993503, Trường Đại học Công nghệ Thông tin và liên kết Google Maps là thông tin do chủ thiệp cung cấp. Chưa có giờ bắt đầu buổi lễ; không dùng giờ chụp hình để suy ra giờ làm lễ. Hội trường và địa chỉ chi tiết để trống vì chưa được cung cấp.

| Thuộc tính | Nội dung |
| --- | --- |
| `fullName` | Họ và tên người tốt nghiệp |
| `graduationYear` | Năm tốt nghiệp |
| `university` | Tên trường |
| `date` | Ngày theo định dạng `YYYY-MM-DD` |
| `time` | Giờ chụp hình địa phương theo định dạng `HH:mm` |
| `timeLabel` | Nhãn ý nghĩa của mốc giờ, hiện là Chụp hình |
| `contactPhone` | Số liên hệ; hiển thị thành liên kết gọi điện `tel:` |
| `location` | Tên hội trường hoặc địa điểm |
| `address` | Địa chỉ đầy đủ |
| `googleMapsUrl` | Liên kết Google Maps của địa điểm |
| `invitationMessage` | Lời mời |
| `thankYouMessage` | Lời cảm ơn |
| `bannerImagePath` | Banner Graduation từ `assets/graduation.png` |
| `stillLifeImagePath` | Ảnh mũ và sách từ `assets/Focus Learn Grow Graduation Still Life.png` |
| `universityLogoPath` | Logo UIT từ `assets/uit_logo.png` |
| `portraitImagePath` | Ảnh trong ô chân dung 3:4 của trang thông tin |
| `portraitImageAlt` | Mô tả ảnh cho người dùng trình đọc màn hình |

Ba file gốc trên được sao chép nguyên vẹn sang `public/images/graduation-banner.png`, `graduation-still-life.png` và `uit-logo.png`. `assets/uit.jpg` không được dùng trong thiệp. Có fallback nếu ảnh không tải được. Ngày được xử lý xác định để tránh chênh lệch do múi giờ máy chủ.

Để thay ảnh chân dung, lưu ảnh thật tại `public/images/van-phong.jpg`, rồi đổi hai giá trị trong `config/invitation.ts`:

```ts
portraitImagePath: "/images/van-phong.jpg",
portraitImageAlt: "Chân dung Văn Phong trong ngày tốt nghiệp",
```

Nên chọn ảnh dọc 3:4, khoảng 900×1200 px hoặc lớn hơn, chủ thể nằm gần giữa ảnh. Hiện dùng lại ảnh mũ và sách làm minh họa. Khi ảnh thiếu hoặc lỗi tải, ô ảnh hiển thị initials VP.

Tên, năm và lời mời cũng được dùng cho metadata và ảnh Open Graph. Có thể bổ sung hội trường và địa chỉ chi tiết nếu cần trước khi chia sẻ thiệp.

## Điều hướng và khả năng truy cập

- Mở bìa bằng nút mở thiệp, vuốt trái hoặc phím mũi tên phải.
- Không dùng dấu X; nút chữ **Về bìa thiệp** nằm cuối trang nội dung, cạnh liên kết bản đồ. Không có thanh điều hướng bên ngoài.
- Vuốt phải hoặc dùng phím mũi tên trái/Escape để đóng thiệp.
- Chỉ có hai trạng thái, có khóa thao tác trong thời gian mở/đóng.
- Focus chuyển sang trang nội dung khi mở và trở lại nút mở khi đóng bằng bàn phím.
- Hoạt ảnh sử dụng transform/opacity và tôn trọng `prefers-reduced-motion`.
- Layout hỗ trợ safe area và màn hình nhỏ từ 320 px.

## Cấu trúc

```text
app/                       Trang chính, font, metadata, Open Graph và CSS
components/invitation/     Điều hướng và khung thiệp
components/sections/       CoverSection và InvitationSection đang được sử dụng
components/ui/             Thành phần giao diện dùng chung
config/invitation.ts       Cấu hình nội dung
lib/animations.ts          Cấu hình hoạt ảnh
public/images/             Ảnh cục bộ
```

## Hydration và tiện ích trình duyệt

Nếu dev overlay báo chênh lệch `className="mdl-js"` trên `<html>`, class này không do ứng dụng tạo ra. Script hoặc tiện ích trình duyệt có thể thêm thuộc tính vào DOM trước hydration. Root layout dùng `suppressHydrationWarning` chỉ trên `<html>` để chấp nhận thay đổi thuộc tính bên ngoài ở cấp gốc; cảnh báo cho các phần tử con vẫn hoạt động. Cách này xử lý cảnh báo, không gỡ script/tiện ích đã chèn class.

Có thể dùng cửa sổ ẩn danh hoặc tắt tiện ích gây thay đổi trang để xác định nguồn chèn thực tế. Chi tiết kiểm tra trước/sau nằm trong `docs/VALIDATION.md`.

## Deploy lên Vercel

1. Đưa mã nguồn vào repository Git của bạn.
2. Trên Vercel, chọn **Add New → Project** và import repository.
3. Giữ framework **Next.js**, install command `npm install` và build command `npm run build`.
4. Nếu dùng domain riêng, đặt biến môi trường `NEXT_PUBLIC_SITE_URL` thành URL HTTPS đầy đủ, ví dụ `https://your-domain.com`. Khi không đặt, dự án dùng `VERCEL_PROJECT_PRODUCTION_URL` do Vercel cung cấp.
5. Deploy. Sau đó mở URL production và kiểm tra ảnh, ngày giờ, liên kết bản đồ và thông tin khi chia sẻ.

Không cần biến bí mật hoặc dịch vụ ngoài. Browser automation trên desktop có thể kiểm tra responsive, bàn phím và thao tác cảm ứng mô phỏng; kiểm tra trên thiết bị iOS Safari/Android Chrome thật vẫn nên thực hiện trước khi gửi thiệp chính thức.
