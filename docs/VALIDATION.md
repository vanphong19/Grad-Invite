# Báo cáo triển khai và kiểm tra

## Điều chỉnh cuối: bỏ chữ ký

Đã bỏ tên Văn Phong dưới lời cảm ơn và CSS của chữ ký theo yêu cầu. Phần kết chỉ còn tiêu đề và lời cảm ơn. Các kết quả kiểm tra chữ ký bên dưới thuộc phiên bản trước điều chỉnh này.

## Hiện tại: thứ tự đọc và ý nghĩa lời mời

Bìa đi theo thứ tự: logo/chủ đề → tên Văn Phong → lời mời ngắn → ngày làm lễ và trường. Gom banner và tên thành một nhóm thị giác, dành chân bìa riêng cho ngày/địa điểm. Không ghi 15:30 trên bìa để tránh nhầm thành giờ bắt đầu lễ.

Trang trong dùng heading “Thân mời bạn” thay cho tên Văn Phong dưới dòng kính mời, xác định đúng người gửi và người nhận. Thứ tự: lời mời → ngày làm lễ 25/11/2026 và nhãn Chụp hình 15:30 → trường + bản đồ liền kề → liên hệ Văn Phong → cảm ơn và chữ ký Văn Phong. Ngày lễ có trọng lượng lớn hơn giờ chụp hình; nhãn giờ có icon máy ảnh. Bố cục vẫn có hai trang trong khung dọc 400×650 px, giữ nguyên cơ chế mở thiệp.

- Lint, typecheck, production build: PASS.
- 20/20 trường hợp responsive (bìa/nội dung × 10 viewport) PASS: trong viewport, không tràn ngang, không chồng các khối theo thứ tự đọc, link có vùng chạm ≥44 px.
- 8/8 kiểm tra nội dung và thao tác PASS: tên người gửi, ngày bìa, lời mời đúng người nhận, nhãn chụp hình/ISO time, map cạnh địa điểm, liên hệ riêng, chữ ký có thể đọc ở 320×568 và kéo mở thiệp.
- Không runtime error, console error hay warning trong context production cuối. Ảnh nhỏ trang trong dùng lazy loading để tránh preload ảnh phụ khi bìa còn đóng.
- 375×667 và các viewport portrait lớn hơn đã kiểm tra đọc trọn nội dung không cần cuộn; 320×568, 360×640 và landscape có cuộn. Chưa đo FPS hay kiểm tra trên thiết bị iOS/Android thật.
- Bằng chứng: `artifacts/hierarchy-final-qa.json`, `hierarchy-cover.png`, `hierarchy-inside.png`, `hierarchy-mobile-cover.png`, `hierarchy-mobile-inside.png`.

Các phần sau là lịch sử những phiên bản trước.

## Phiên bản trước: thiệp dọc gọn trong một khung

Theo hướng bố cục của link tham chiếu do chủ thiệp cung cấp, cả bìa và nội dung dùng chung khung dọc tối đa 400×650 px, luôn nằm giữa nền navy trống. Giữ navy/ivory/vàng đồng và hình ảnh của dự án. Bỏ spread desktop 900 px, dịch chuyển căn giữa, mặt sau chứa nội dung trùng. Bìa vẫn lật đủ 180° trong khung cố định; góc giấy giữ thao tác chạm, kéo và bàn phím, không có chữ hướng dẫn.

Trang thông tin gom tên và ảnh 3:4 vào cùng header, ngày lễ và giờ chụp hình chung hàng, bản đồ và số điện thoại chung hàng, lời cảm ơn ở cuối. Chỉ render một ảnh chân dung và một phần cảm ơn. Màn hình nhỏ cho phép cuộn, không ẩn nội dung. Giữ nguyên ngày làm lễ 25/11/2026, chụp hình 15:30, trường, map và số điện thoại.

- `npm run lint`, `npm run typecheck`, `npm run build`: PASS.
- Responsive: 20/20 trường hợp (10 viewport × bìa/nội dung) PASS tại 320×568, 360×640, 375×667, 390×844, 430×932, 640×800, 641×800, 768×1024, 1440×900, 667×375. Khung luôn trong viewport, không tràn ngang, hit area góc giấy ≥44 px. Nội dung không cần cuộn từ 360×640 trong các viewport portrait đã kiểm tra; 320×568 và landscape có cuộn.
- Chuột, bàn phím và nội dung: 11/11 PASS, gồm khung không đổi kích thước khi mở, full half-turn, kéo mở/gấp, kéo ngắn, Escape hủy, focus, chống lật liên tiếp, dữ liệu sự kiện và không text điều hướng. Reduced motion được dùng trong ma trận responsive.
- Cảm ứng native mô phỏng qua Chromium CDP tại 320×568: 8/8 PASS, gồm mở/gấp, kéo ngắn, hủy, tap sau hủy, cuộn dọc và đọc đủ lời cảm ơn.
- Không có runtime error, console error hay warning trong context production kiểm tra.
- Bằng chứng: `artifacts/compact-final-qa.json`, `compact-touch-qa.json`, `compact-cover.png`, `compact-inside.png`, `compact-mobile-inside.png`.

Chưa đo FPS hay kiểm tra thiết bị iOS/Android thật. Các phần bên dưới ghi lại các bản trước, không phải bố cục hiện tại.

## Phiên bản trước: mở thiệp gấp đủ 180° và thêm lời cảm ơn

Thay kiểu bìa xoay 90° rồi biến mất bằng một tờ bìa có hai mặt, lật quanh gáy trái từ 0 đến −180°. Không fade bìa trong quá trình mở. Desktop khép rộng tối đa 450 px ở giữa nền; mở thành spread tối đa 900 px: mặt trong bìa có ảnh 3:4 và lời cảm ơn, trang phải giữ thông tin buổi lễ. Khi bắt đầu kéo, giữ vị trí gáy rồi mới căn giữa spread theo đường smoothstep. MotionValue điều khiển góc quay, bóng gáy và vị trí; spring giảm chấn tiếp nhận vận tốc lúc thả tay. Giữ khóa chuyển động, pointer capture, xử lý hủy kéo, focus bàn phím và reduced motion.

Mobile giữ nội dung trong một trang vừa viewport: ảnh ở đầu, thông tin và lời cảm ơn phía dưới, cuộn được khi thiếu chiều cao. Mặt trong bìa ra ngoài viewport được ẩn nội dung khỏi accessibility tree bằng visibility:hidden; nền giấy vẫn hiện trong lúc lật. Không thêm chữ hướng dẫn vào góc giấy. Cảm ơn luôn có thể đọc được ở màn hình ngắn, thay vì bị display:none như trước. Đã gỡ ảnh phụ ẩn ở bìa cũ để tránh tải/preload ảnh không dùng.

- `npm run lint`, `npm run typecheck`, `npm run build`: PASS trên source cuối.
- Chuột/bàn phím/reduced motion/nội dung: 14/14 PASS trong Chromium production. Bao gồm góc kết thúc 180°, mặt sau còn hiện sau khi vượt 90°, mở/gấp bằng kéo và click, kéo ngắn trả lại, Escape hủy, focus, phone/map và góc không có chữ.
- Cảm ứng mô phỏng native qua Chromium CDP: 9/9 PASS. Bao gồm mở/gấp, kéo ngắn, touchcancel, tap, cuộn dọc, đọc trọn lời cảm ơn, ẩn phần offscreen và không lỗi runtime/console.
- Kiểm tra bố cục tại 320×568, 375×667, 390×844, 640×800, 641×800, 768×1024, 1024×768, 1440×900 và 667×375: 18/18 trường hợp (bìa/nội dung) PASS; không tràn ngang, nội dung ngày/giờ không overflow, lời cảm ơn không bị ẩn. Màn hình thấp cho phép cuộn. Bản production cuối không có runtime error hay console warning; khóa lật liên tiếp PASS. Kết quả lưu tại `artifacts/book-final-qa.json`.
- Ảnh kiểm tra: `artifacts/book-cover.png`, `book-open.png`, `book-mid-turn.png`, `book-mobile-inside.png`.

Chưa đo FPS và chưa kiểm tra trên thiết bị iOS Safari/Android Chrome thật. Các mục bên dưới là lịch sử kiểm tra những phiên bản trước, không mô tả hiệu ứng hiện tại.

## Bỏ chữ góc giấy và làm mượt chuyển động

Đã bỏ toàn bộ chữ hướng dẫn ở hai góc giấy; giữ biểu tượng bàn tay và nhãn aria-label. Thu gọn vùng góc còn 82×82 px trên desktop và 76×76 px trên mobile, vẫn lớn hơn 44×44 px. Xóa lớp mặt sau không còn dùng và hiệu ứng dịch chuyển góc khi hover.

Đổi tiến độ từ góc quay tuyến tính sang vị trí mép giấy được chiếu qua phối cảnh. ResizeObserver cung cấp kích thước thiệp, công thức quay được tính từ tiến độ và khoảng phối cảnh 4500 px để mép tự do bám con trỏ. Bìa xoay ra xa đến 90 độ, không còn nhịp nâng y hay độ phóng lớn giữa chừng. Khi thả, spring có giảm chấn nhận vận tốc kéo đã lọc/giới hạn; opacity chỉ ẩn phần mép rất nhỏ ở cuối. Giữ GPU layer cho transform/opacity. Focus frame chỉ xuất hiện với điều hướng bàn phím.

- Lint, typecheck, production build: PASS.
- Chuột/keyboard/reduced motion/nội dung: 16/16 PASS. Sáu điểm kéo 5, 15, 40, 90, 180 và 270 px trong Chromium production có sai số vị trí mép giấy 0 px ở các mẫu đo.
- Cảm ứng native qua CDP: 7/7 PASS, gồm mở/khép, trả lại khi kéo ngắn, touchcancel, tap và cuộn dọc.
- Responsive: 14/14 PASS trên hai trang × 7 viewport; không tràn ngang/cắt chữ, không có text trong góc giấy, góc nằm trong khung và đủ kích thước chạm.
- Không có console/runtime errors trong các context production kiểm tra. Bàn phím vẫn có focus indication, thao tác kéo không làm lóe khung focus sau khi thả.

Bằng chứng: `artifacts/smooth-mouse-qa.json`, `artifacts/smooth-touch-layout-qa.json`, `artifacts/smooth-corner-cover.png`, `artifacts/smooth-corner-inside.png`. Các ảnh `hand-opening-*` thuộc bản trước khi bỏ chữ. Chưa đo FPS và chưa kiểm tra trên iOS Safari/Android Chrome thật; các kiểm tra liên tục mép giấy là kiểm tra vị trí, không phải benchmark FPS. Dev server của chủ thiệp vẫn được giữ nguyên.

## Mở và gấp thiệp bằng thao tác cầm giấy

Thay nút mở và Về bìa bằng hai góc giấy tương tác có dấu bàn tay nhỏ. Kéo góc phải của bìa sang trái để mở, kéo mép trái bên trong sang phải để khép. Bìa theo ngón tay/con trỏ trước khi thả. Kéo đủ xa hoặc vuốt dứt khoát thì hoàn tất; kéo ngắn thì trở về trạng thái cũ. Hỗ trợ chạm, bàn phím và reduced motion; giữ hai trang, không tạo điều hướng ngoài thiệp.

Triển khai bằng Pointer Events, pointer capture và một MotionValue tiến độ. Transform, độ nâng và opacity lấy từ tiến độ; không cập nhật React state theo từng lần dịch chuyển con trỏ. Có xử lý kéo sai hướng, touchcancel, mất pointer capture, Escape và blur; chặn click phát sinh sau khi kéo/hủy. Cuộn dọc không gấp thiệp, hủy kéo khép giữ vị trí đang đọc. Ảnh không bị kéo theo cơ chế drag ảnh của trình duyệt.

File thay đổi: `components/invitation/invitation-experience.tsx`, `components/sections/cover.tsx`, `components/sections/invitation.tsx`, `components/ui/card-image.tsx`, `app/globals.css`, `README.md`.

| Kiểm tra bản cầm giấy | Kết quả |
| --- | --- |
| Lint / typecheck / production build | PASS |
| Chuột, click, bàn phím, hủy và reduced motion | 23/23 PASS |
| Cảm ứng native qua CDP trong Chromium mobile context | 11/11 PASS |
| Responsive hai trang × 7 viewport | 14/14 PASS |
| Console/runtime trong các context kiểm tra production | 0 errors, 0 warnings |

Viewport: 320×568, 375×667, 390×844, 768×1024, 1366×768, 1440×900 và 667×375. Góc giấy nằm trong khung, vùng chạm ít nhất 44×44; không tràn ngang, không cắt chữ ngang và không che các liên kết đang nhìn thấy. Đã xác minh giữ và kéo trước khi thả, mở/khép bằng native touch, short-pull, kéo ngược, hủy cảm ứng, Escape/blur khi đang kéo, tap/click, Enter, phím trái/phải, giảm chuyển động và giữ/reset scroll đúng lúc. Ngày làm lễ, giờ chụp hình, số điện thoại và Maps được giữ nguyên.

Bằng chứng: `artifacts/hand-mouse-qa.json`, `artifacts/hand-touch-qa.json`, `artifacts/hand-responsive-qa.json`. Có năm screenshot mới cho riêng tương tác này trong `artifacts/hand-opening-*.png`, khác với bộ screenshot cũ đã dọn. Production test dùng cổng 3017 riêng; dev server có sẵn ở cổng 3000 được giữ nguyên. Chưa kiểm tra thiết bị iOS Safari/Android Chrome thật và chưa đo FPS.

## Dọn ảnh theo yêu cầu

Đã xóa `public/images/graduation-editorial.png`, `public/images/portrait-placeholder.svg` và 66 ảnh chụp kiểm tra trong `artifacts/`, giải phóng khoảng 7,76 MiB. Đã bỏ trường cấu hình `artworkImagePath` không còn được dùng. Ba ảnh đang phục vụ website và các file trong `assets/` được giữ nguyên; báo cáo JSON kiểm tra vẫn được giữ. Các đường dẫn screenshot trong phần lịch sử phía dưới không còn tồn tại sau lần dọn này.

## Xử lý cảnh báo root hydration mdl-js

- Audit 14 file nguồn và package/package-lock trước sửa: không có MDL, thao tác thêm `mdl-js` hay dependency Material Design Lite. HTML server trả về `<html lang="vi">`.
- Đã tái hiện chính xác diff `- className="mdl-js"` bằng init script/MutationObserver thêm class trước hydration trong browser context riêng. Không sửa server response hoặc cấu hình tiện ích trình duyệt thật để thực hiện kiểm tra này.
- `app/layout.tsx` thêm `suppressHydrationWarning` chỉ trên `<html>`, có comment giải thích phạm vi. Đây là xử lý cảnh báo cho thuộc tính gốc bị chèn bên ngoài, không phải loại bỏ class hay xác định tiện ích cụ thể.
- Đối chứng sau sửa: tải sạch và chèn class root đều không có hydration warning/console error; mở/đóng thiệp PASS. Cố ý thêm `data-hydration-probe` vào `<body>` vẫn phát cảnh báo, xác nhận phần tử con không bị che lỗi.
- Sửa cảnh báo LCP được quan sát khi debug: ảnh chân dung nằm trong vùng nhìn thấy đầu tiên dùng tải eager. Sau sửa, hai trường hợp tải sạch/root injection không có cảnh báo LCP.
- Lint, typecheck và production build: PASS. Kiểm tra hydration chạy trên dev server có sẵn ở cổng 3001; server có sẵn không bị dừng. Chưa xác minh extension nào trên trình duyệt của chủ thiệp đã chèn class.
- Bằng chứng: `artifacts/hydration-baseline-qa.json` (reproduced=true), `artifacts/hydration-fix-qa.json` (passed=true). Cảnh báo của body probe trong file kết quả là kết quả đối chứng có chủ đích.

## Cập nhật thông tin sự kiện

- Ngày làm lễ: **25/11/2026**.
- **15:30 là giờ chụp hình**, không phải giờ bắt đầu buổi lễ. Bìa, trang thông tin và Open Graph đều dùng nhãn Chụp hình; giờ bắt đầu lễ chưa được cung cấp.
- Liên hệ: **0984993503**, liên kết `tel:0984993503` với vùng chạm cao 44 px. Chỉ kiểm tra href; không thực hiện cuộc gọi.
- Lint, typecheck và production build PASS. Chromium production ở 320×568, 390×844, 768×1024 và 1440×900 PASS: đúng ngày/nhãn giờ/số điện thoại, không tràn ngang, số liên hệ hiển thị trong khung, không có console/runtime errors. Open Graph trả HTTP 200.
- Bằng chứng: `artifacts/ceremony-update-qa.json`, `artifacts/ceremony-update-390.png`, `artifacts/ceremony-update-1440.png`.

Các ngày 15/11/2026 được nhắc trong các báo cáo lịch sử phía dưới thuộc những phiên bản trước, đã được thay trong cấu hình hiện tại.

## Bản hiện tại: bố cục ảnh chân dung và typography thiệp in

Cập nhật ngày 14/11/2026. Giữ hai trang và nền ngoài trống. Bỏ dấu X; thay bằng nút chữ **Về bìa thiệp** trong vùng thao tác cuối trang. Tên và ngày giờ dùng Lora hỗ trợ tiếng Việt, nội dung dùng Geist; không tải font Manrope không còn sử dụng.

Trang thông tin chia hai cột trên desktop: ảnh dọc 3:4 bên trái, thông tin bên phải. Mobile đặt ảnh cạnh tên, phần ngày giờ/địa điểm và bản đồ trải toàn chiều ngang. Ảnh hiện tại là minh họa mũ tốt nghiệp từ thư mục assets, không phải ảnh chân dung thật. Có thể thay tại `portraitImagePath` và `portraitImageAlt` trong `config/invitation.ts`; lỗi ảnh có fallback VP.

File thay đổi: `app/layout.tsx`, `app/globals.css`, `components/sections/invitation.tsx`, `components/ui/card-image.tsx`, `components/invitation/invitation-experience.tsx`, `config/invitation.ts`, `README.md`. Thêm reset cuộn về đầu khi mở lại thiệp.

- Lint, typecheck, production build: PASS.
- Chromium production: 14/14 trường hợp (hai trang trên 7 viewport), không tràn ngang, không cắt chữ ngang, ô ảnh giữ đúng tỉ lệ 3:4 và không có dấu X.
- Tương tác/nội dung: 19/19 PASS, gồm nút chữ trở về bìa, focus, bàn phím, reduced motion, reset cuộn, ngày giờ/trường/Maps, Lora và fallback ảnh VP.
- Context production mới: 0 console errors/warnings, 0 runtime/hydration exceptions.

Viewport: 320×568, 375×667, 390×844, 768×1024, 1366×768, 1440×900 và 667×375. Chỉ viewport ngang thấp cần cuộn nội dung. Trên mobile rất thấp, ẩn phần lời dẫn/lời cảm ơn phụ để ưu tiên ảnh, tên, ngày giờ và địa điểm.

Bằng chứng: `artifacts/portrait-responsive-qa.json`, `artifacts/portrait-interaction-qa.json`; ảnh `artifacts/portrait-final-1440-inside.png`, `portrait-final-390-inside.png`, `portrait-final-320-inside.png`. Chưa kiểm tra thiết bị Safari/Chrome thật, chưa đo FPS và chưa deploy.

## Lịch sử: hai trang, ảnh từ assets

Thiệp gồm bìa và một trang nội dung, dùng navy/ivory/vàng đồng. Không có header, footer, khẩu hiệu, số trang hoặc điều hướng ngoài thiệp. Cả hai nút mở/đóng đều nằm trong thiệp. Phần tên, lời mời, ngày 15/11/2026 lúc 15:30, trường, Maps và lời cảm ơn được gộp trong trang thứ hai.

Ảnh gốc: `assets/graduation.png`, `assets/Focus Learn Grow Graduation Still Life.png`, `assets/uit_logo.png`. Đã sao chép nguyên vẹn vào `public/images`; hash SHA-256 của từng cặp nguồn/bản sao trùng nhau. Không sử dụng `assets/uit.jpg`, ảnh chân dung placeholder hoặc ảnh graduation-editorial trước đây.

File thay đổi: `components/invitation/invitation-experience.tsx`, `components/sections/cover.tsx`, `components/sections/invitation.tsx`, `components/ui/card-image.tsx`, `app/globals.css`, `config/invitation.ts`, `app/layout.tsx`, `app/opengraph-image.tsx`, `README.md`, ba file ảnh trong `public/images`.

| Kiểm tra bản hai trang | Kết quả |
| --- | --- |
| `npm run lint` | PASS, không lỗi/cảnh báo |
| `npm run typecheck` | PASS |
| `npm run build` | PASS, trang và Open Graph prerender thành công |
| Chromium production: 2 trang × 7 viewport | PASS, 14/14 trường hợp |
| Tương tác và nội dung | PASS, 21/21 kiểm tra |
| Ảnh đang hiển thị ở cả hai trang | PASS, decode thành công |
| Fallback khi ảnh lỗi | PASS |
| Console production trong context mới | 0 errors, 0 warnings |

Viewport: 320×568, 375×667, 390×844, 768×1024, 1366×768, 1440×900 và 667×375. Không có horizontal overflow hoặc text bị cắt ngang; khung thiệp nằm trong viewport. Nút mở hiển thị trọn vẹn trong tất cả các viewport. Màn hình ngang thấp có thể cuộn trang nội dung; đã xác minh nút Maps vẫn tiếp cận được sau khi cuộn.

Đã kiểm tra bìa có chuyển động bản lề, khóa thao tác trong lúc mở, focus sau mở/đóng, nút đóng nằm sau bìa khi chưa mở, phím mũi tên/Escape, reduced motion trực tiếp, vuốt trái/phải mô phỏng và bỏ qua vuốt dọc. Nội dung tên/ngày/giờ/trường và href Maps đều đúng. Không có header/footer/nav hoặc dòng chữ ngoài thiệp. Ba ảnh gốc được tải; `uit.jpg`, ảnh khuôn viên đã loại, portrait placeholder và artwork cũ không được tải.

Bằng chứng: `artifacts/two-page-responsive-qa.json`, `artifacts/two-page-interaction-qa.json`, `artifacts/two-page-image-qa.json`. Ảnh chụp: `artifacts/two-page-final-390-cover.png`, `two-page-final-390-inside.png`, `two-page-final-1440-cover.png`, `two-page-final-1440-inside.png`.

Giới hạn: Chromium với viewport và touch mô phỏng; chưa kiểm tra trên iOS Safari/Android Chrome thật, chưa đo FPS và chưa deploy. Các số liệu từ những phiên bản dưới đây chỉ là lịch sử.

## Lịch sử: bản thiệp gấp bốn trạng thái

## Bản thiệp gấp Văn Phong

Ngày cập nhật: 13/11/2026. Đây là bản thiết kế trước khi rút gọn còn hai trang.

### Thông tin thiệp

- Tên: Văn Phong.
- Ngày tốt nghiệp: 15/11/2026, lúc 15:30.
- Địa điểm: Trường Đại học Công nghệ Thông tin.
- Google Maps: `https://maps.app.goo.gl/1yrgixfnLPWQzASEA`.
- Hội trường và địa chỉ chi tiết để trống vì chưa được cung cấp; ảnh chân dung vẫn là placeholder.

### Phần triển khai hiện tại

Thiệp có bìa xanh rừng đặt trên nền ivory, với hai mặt bìa dùng `preserve-3d` và mở quanh nếp gấp bên trái bằng `rotateY(-180deg)`. Desktop hiển thị hai mặt thiệp; trên mobile, mặt sau bìa fade đi để giữ vùng nội dung dễ đọc. Chế độ giảm chuyển động bỏ hiệu ứng gấp.

Các vùng bìa hoặc nội dung chưa hiển thị được đặt `inert` và `aria-hidden`. Khi đóng thiệp, focus trở về nút mở; xử lý này bao gồm cả thao tác từ nút đóng nằm ngoài nội dung thiệp.

| File đã thay đổi | Nội dung |
| --- | --- |
| `config/invitation.ts` | Thông tin thật do chủ thiệp cung cấp, giữ nguyên URL Maps |
| `components/invitation/invitation-experience.tsx` | Khung thiệp gấp, trạng thái mở/đóng, điều hướng, focus và reduced motion |
| `app/globals.css` | Hình dáng thiệp, nếp gấp 3D và bố cục desktop/mobile |
| `components/sections/cover.tsx` | Bìa thiệp và thao tác mở |
| `components/sections/invitation.tsx` | Lời mời bên trong thiệp |
| `components/sections/ceremony.tsx` | Ngày giờ, địa điểm, Maps; không hiển thị hội trường/địa chỉ trống |
| `components/sections/thank-you.tsx` | Lời kết và thao tác đọc lại/đóng thiệp |
| `README.md` | Hướng dẫn cho giao diện thiệp gấp và thông tin đã cá nhân hóa |

### Trạng thái kiểm tra bản thiệp gấp

| Kiểm tra bản cuối | Kết quả |
| --- | --- |
| `npm run lint` | PASS, không lỗi/cảnh báo |
| `npm run typecheck` | PASS |
| `npm run build` | PASS, production prerender và Open Graph thành công |
| Responsive trên Chromium production | PASS 24/24: 4 trạng thái × 6 viewport |
| Tương tác và nội dung trên Chromium production | PASS 24/24 |
| Console trong context production mới | 0 errors, 0 warnings |

Viewport: 320×568, 375×667, 390×844, 768×1024, 1366×768 và 1440×900. Không tràn ngang hoặc cắt chữ theo chiều ngang; footer luôn nằm trong viewport. Nút mở nằm trọn trên bìa ngay cả ở 320×568. Ở 320×568 và 375×667, trang trong có thể cuộn dọc; từ các viewport 390×844 trở lên trong đợt kiểm tra, toàn bộ nội dung vừa lòng thiệp. CSS container queries điều chỉnh trang giấy theo chiều rộng thực của thiệp.

Đã xác minh chuyển động thực ở giữa quá trình mở, hai mặt bìa ở trạng thái mở, khóa chuyển trang trong khi gấp, focus khi mở và đóng, giữ nguyên trang in khi đóng, điều hướng bằng phím mũi tên và Escape, reduced motion cập nhật trực tiếp, swipe cảm ứng mô phỏng để mở/chuyển/đóng, bỏ qua vuốt dọc và initials VP khi ảnh lỗi. Nội dung tên/ngày/giờ/trường và chính xác href Maps đều đã kiểm tra. Open Graph trả HTTP 200 với ảnh PNG và metadata dùng tên Văn Phong. Link Maps được kiểm tra URL và thuộc tính mở tab mới; không xác minh địa điểm đích của liên kết rút gọn.

Bằng chứng cục bộ: `artifacts/folded-browser-qa.json`, `artifacts/folded-interaction-qa.json`; ảnh `artifacts/folded-final-390-page-0.png` đến `page-3.png` và `artifacts/folded-final-1440-page-0.png` đến `page-3.png`.

Chưa kiểm tra trên thiết bị iOS Safari/Android Chrome thật, chưa đo FPS và chưa deploy. Các lỗi kết nối HMR trong log cũ phát sinh khi chủ động dừng dev server để chuyển sang production; context production mới được ghi nhận riêng, không có lỗi/cảnh báo.

## Lịch sử: bản editorial ban đầu

Phần từ đây trở xuống ghi lại lần triển khai đầu tiên ngày 13/11/2026, khi thiệp dùng tên mẫu Minh Anh và chưa có hiệu ứng thiệp gấp. Repository ban đầu trống; các file nguồn dưới đây được tạo mới ở thời điểm đó. Các kết quả và ảnh trong phần lịch sử chỉ chứng minh phiên bản cũ, không phải bằng chứng kiểm tra bản Văn Phong hiện tại.

### Các file triển khai ban đầu

| File | Vai trò |
| --- | --- |
| `app/page.tsx` | Entry point App Router |
| `app/layout.tsx` | Font Manrope/Geist, metadata, viewport và safe area |
| `app/globals.css` | Design tokens, editorial layouts, responsive và trạng thái tương tác |
| `app/icon.svg` | Favicon mũ tốt nghiệp |
| `app/opengraph-image.tsx` | Ảnh Open Graph được tạo từ cấu hình |
| `components/invitation/invitation-experience.tsx` | Quản lý bốn trang, transition, swipe, bàn phím, focus và reduced motion |
| `components/sections/cover.tsx` | Bìa xanh rừng với năm dạng outline |
| `components/sections/invitation.tsx` | Lời mời và bố cục ảnh bất đối xứng |
| `components/sections/portrait.tsx` | next/image và fallback initials |
| `components/sections/ceremony.tsx` | Ngày giờ, trường, địa chỉ và Google Maps |
| `components/sections/thank-you.tsx` | Lời kết và điều hướng đọc lại |
| `components/ui/monogram.tsx` | Monogram từ tên cấu hình |
| `config/invitation.ts` | Toàn bộ dữ liệu mẫu, initials và ngày UTC xác định |
| `lib/animations.ts` | Easing và staggered reveal |
| `public/images/portrait-placeholder.svg` | Placeholder ảnh có chủ đích |
| `package.json`, `package-lock.json` | Dependencies stable được khóa phiên bản |
| `next.config.ts`, `next-env.d.ts`, `tsconfig.json` | Cấu hình framework và TypeScript |
| `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore` | Tailwind, lint và loại trừ output |
| `README.md` | Chỉnh nội dung, chạy local và deploy Vercel |

### Kết quả lịch sử

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run lint` | PASS, không lỗi/cảnh báo |
| `npm run typecheck` | PASS |
| `npm run build` | PASS, trang chính và Open Graph prerender thành công |
| `npm ci --dry-run --ignore-scripts --no-audit --no-fund` | PASS, lockfile hợp lệ; có cảnh báo peer dependency của công cụ lint |
| Chromium, 4 trang × 7 viewport | PASS, 28/28 trường hợp |
| Điều hướng, metadata, ảnh, accessibility cơ bản | PASS, 18/18 kiểm tra chức năng |
| Kiểm tra bổ sung sau sửa reduced motion | PASS, 6/6 |
| Console production trên phiên kiểm tra chính | 0 errors, 0 warnings |

Viewport: 320×568, 375×667, 390×844, 768×1024, 1366×768, 1440×900 và 667×375.

ESLint 10 chạy lint thành công. Một số plugin được `eslint-config-next` kéo theo vẫn khai báo peer range đến ESLint 9, nên npm in cảnh báo ERESOLVE khi cài đặt; lệnh kiểm tra cài sạch kết thúc với exit code 0. Cảnh báo này thuộc công cụ phát triển, không xuất hiện trong console website.

Không có horizontal overflow trong document hoặc vùng nội dung. Không có text overflow theo chiều ngang. Footer luôn trong viewport. Trên màn hình rất thấp hoặc 320×568, phần nội dung có thể cuộn dọc; navigation vẫn cố định trong khung thiệp.

Các chức năng đã xác minh: CTA mở/đọc lại, Previous/Next ở biên, phím mũi tên, page indicators, chống chuyển liên tục, focus sang nội dung mới khi CTA biến mất, vuốt trái/phải mô phỏng bằng TouchEvent trong context cảm ứng, bỏ qua vuốt dọc, initials khi ảnh lỗi, link Google Maps và thuộc tính tab mới an toàn. Đã kiểm tra HTTP 200 và content-type PNG của ảnh Open Graph.

Đã phát hiện và sửa việc duration không cập nhật khi người dùng thay đổi reduced motion trong lúc mở trang: shell dùng `useSyncExternalStore` để theo dõi media query trực tiếp, với server snapshot xác định. Sau sửa, thay đổi preference theo cả hai hướng, khóa điều hướng, focus và loại bỏ transform đều PASS.

### Bằng chứng cục bộ của bản cũ

- `artifacts/browser-qa.json`: kết quả 28 trường hợp responsive.
- `artifacts/interaction-qa.json`: kết quả 18 kiểm tra chức năng.
- `artifacts/reduced-motion-qa.json`: kiểm tra bản sửa preference trực tiếp.
- `artifacts/final-1440-screen-1.png` đến `final-1440-screen-4.png`: desktop.
- `artifacts/final-390-screen-1.png` đến `final-390-screen-4.png`: mobile.
- `artifacts/final-320-screen-1.png` đến `final-320-screen-4.png`: màn hình nhỏ.

`artifacts/` và `.playwright-mcp/` được gitignore để không đưa ảnh kiểm tra và log vào bản deploy.

### Giới hạn xác minh ở thời điểm bản cũ

Browser QA của bản cũ chạy trên Chromium với viewport và touch mô phỏng. Ở thời điểm đó chưa chạy trên iOS Safari/Android Chrome thiết bị thật, chưa đo FPS hoặc kiểm tra bằng trình đọc màn hình thực và chưa deploy lên Vercel. Tên, địa chỉ và Google Maps của bản editorial khi đó là placeholder; thông tin này đã được thay bằng dữ liệu chủ thiệp cung cấp trong bản Văn Phong nêu ở đầu báo cáo.
