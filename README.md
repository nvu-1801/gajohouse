# 📖 GAJO'S HOUSE - Boutique Homestay Catalogue

Bộ tài liệu catalogue và bài trình chiếu giới thiệu **GAJO's HOUSE** tại Hoài Nhơn, Bình Định.

---

## 🌟 1. Bản Sách Lật 3D Realistic (3D Flipbook Catalogue)
- **File chính:** [`flipbook.html`](./flipbook.html)
- **Tính năng nổi bật:**
  - 📖 **Vật lý lật trang 3D chân thực:** Sử dụng engine `StPageFlip` với hiệu ứng uốn cong trang giấy, đổ bóng 3D, bìa cứng (hardcover) bọc da sang trọng mạ vàng.
  - 🔊 **Âm thanh sột soạt lật giấy sống động:** Tích hợp bộ xử lý âm thanh Web Audio API tự nhiên khi lật từng trang (có nút bật/tắt tiện lợi).
  - 🖱️ **Kéo thả / Vuốt chạm cảm ứng mượt mà:** Tự động tối ưu 2 trang (2-page spread) trên máy tính/tablet và 1 trang (single-page) trên điện thoại di động.
  - 🗂️ **Thanh Thumbnail xem trước:** Xem toàn bộ 12 trang thu nhỏ để chuyển nhanh đến trang bất kỳ.
  - 🖥️ **Toàn màn hình & Phím tắt:** Điều hướng bằng phím mũi tên `←` / `→`, phím `Space`, `PageUp` / `PageDown`.

---

## ⚛️ 2. Bản Tích Hợp Next.js / React Component
- **File:** [`FlipBookCatalogue.jsx`](./FlipBookCatalogue.jsx)
- Có thể import trực tiếp vào các dự án Next.js (App Router `app/page.jsx` hoặc Pages Router `pages/index.jsx`).
- Cài đặt thư viện: `npm install page-flip`

---

## 💻 3. Các Bản Trình Chiếu Khác
- [`gajohouse.html`](./gajohouse.html): Bản Catalogue Slide tương tác đa nền tảng.
- [`gajo_catalogue.html`](./gajo_catalogue.html): Bản Slide ngang chuẩn 16:9 Kinfolk.
- [`assets/`](./assets/): Thư mục chứa toàn bộ hình ảnh thực tế phòng nghỉ, nội thất và 8 địa điểm du lịch Hoài Nhơn.
