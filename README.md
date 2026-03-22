# MMO Services Platform
Nền tảng e-commerce chuyên dụng để bán các dịch vụ số, tài khoản phần mềm MMO (ChatGPT, Netflix, YouTube Premium...). Hệ thống hỗ trợ tích hợp thanh toán mã QR tự động và đồng bộ quản lý doanh thu qua Google Sheets.

## Stack Công Nghệ
- **Frontend / Backend**: Next.js 14 (App Router)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS + Lucide Icons
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT (Custom)
- **Integrations**: VietQR API (QR Transfer), Google Apps Script Webhook (Google Sheets)

---

## 1. Yêu cầu môi trường (Prerequisites)
- [Node.js](https://nodejs.org/en/) v18.17.0 trở lên
- [npm](https://www.npmjs.com/) (thường cài sẵn cùng Node.js)
- [PostgreSQL](https://www.postgresql.org/) v13 trở lên đang chạy cục bộ hoặc trên cloud (Supabase, Neon, AWS RDS...).

---

## 2. Cài đặt chi tiết (Deployment Guide)

### Bước 1: Clone & Install Dependencies
```bash
# Clone source code hoặc giải nén thư mục mmo-services
cd mmo-services

# Cài đặt các gói npm
npm install
```

### Bước 2: Cấu hình biến môi trường (.env)
Copy file mẫu để tạo file `.env` thực sự:
```bash
cp .env.example .env
```
Mở file `.env` và điền/sửa các thông số:
- `DATABASE_URL`: Connection string đến máy chủ PostgreSQL của bạn.
- `JWT_SECRET`, `AUTH_SECRET`: Sửa thành chuỗi ngẫu nhiên, dài và phức tạp.
- Thông tin `BANK_*` sử dụng để hiển thị ngân hàng và sinh mã QR.

### Bước 3: Database & Prisma Setup
Sau khi cấu hình `DATABASE_URL` thành công, hãy tạo các bảng trong DB:
```bash
# Push schema lên database
npx prisma db push

# Hoặc dùng migrate nếu muốn quản lý lịch sử version Schema
# npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### Bước 4: Seed dữ liệu ban đầu
File seed sẽ tạo sẵn 1 Admin, các danh mục, và một loạt sản phẩm mẫu. Tài khoản mặc định lấy từ biến môi trường `ADMIN_SEED_EMAIL` và `ADMIN_SEED_PASSWORD`.
```bash
npx prisma db seed
```
*(Tài khoản admin mặc định: `admin@mmo.vn` / `admin123`)*

---

## 3. Chạy môi trường Local (Phát triển)

```bash
npm run dev
```
Truy cập:
- Frontend User: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3000/admin/login`

---

## 4. Triển khai Production (Antigravity / VPS / Node Hosting)

Thực hiện các lệnh sau trên Server/VPS của bạn.

### Build Application
Bắt buộc phải build mã nguồn Next.js trước khi chạy production.
```bash
npm run build
```

### Chạy bằng PM2 (Khuyến nghị trên VPS)
Để đảm bảo Node app tự động chạy lại nếu crash hoặc server reboot, nên dùng PM2:
```bash
# Cài đặt pm2 toàn cầu nếu chưa có
npm install -g pm2

# Khởi chạy Next.js app
pm2 start npm --name "mmo-services" -- start

# Lưu cấu hình PM2 để tự khởi động cùng OS
pm2 save
pm2 startup
```

### Cấu hình Reverse Proxy (Nginx)
Nếu bạn bind tên miền (VD: mmo.example.com) vào VPS, hãy cấu hình Nginx để forward request:

```nginx
server {
    listen 80;
    server_name mmo.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Sau đó sử dụng `certbot` để cài đặt SSL (HTTPS) miễn phí:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mmo.example.com
```

---

## 5. Cấu hình Google Sheets Webhook

Tính năng này giúp bạn đồng bộ toàn bộ đơn đặt hàng mới xuống 1 file Google Sheets ngay lập tức để tiện cho team theo dõi.

1. Truy cập [Google Sheets](https://docs.google.com/spreadsheets), tạo 1 Spreadsheet mới.
2. Trên thanh menu, chọn `Extensions` (Tiện ích mở rộng) -> `Apps Script`.
3. Mở mã nguồn trong file `scripts/google-apps-script.js` của project này, copy toàn bộ và dán vào cửa sổ Apps Script đè lên nội dung cũ.
4. Ở góc phải khung Apps Script, bấm `Deploy` -> `New deployment`.
5. Configuration phần loại (Type): Chọn `Web app`.
6. Thông số:
   - Execute as: **Me** (Email của bạn)
   - Who has access: **Anyone**
7. Bấm `Deploy`. (Sẽ có popup yêu cầu Authorize access, hãy cấp quyền).
8. Copy địa chỉ **Web app URL** được cấp.
9. Dán URL đó vào biến môi trường `GOOGLE_SHEET_WEBHOOK_URL` trong file `.env` của VPS/Môi trường chạy. Khởi động lại app (`pm2 restart mmo-services`).

Bây giờ, cứ có đơn mới hoặc thanh toán thành công, row mới sẽ tự động bắn vào Sheet `Orders`.

---

## 6. Cấu hình VietQR Chuyển Khoản
Mã QR chuyển khoản ở màn hình checkout được render trực tiếp thông qua hàm helper trong `src/lib/qr-helper.ts`. 

- Helper tận dụng chuẩn API cực nhanh của **vietqr.io**. Bạn không cần đăng ký tài khoản gì cả, chỉ cần truyền đúng `Ngân Hàng` + `Số Tài Khoản` + `Số Tiền`.
- Mã ngân hàng (`BANK_CODE`) trong file `.env` cần chính xác theo danh sách chuẩn BIN của NAPAS. Ví dụ: `MB`, `VCB`, `TCB`, `ACB`, `VPB`...
- Bất cứ khi nào cần đổi ngân hàng nhận tiền, bạn chỉ cần sửa `.env` (hoặc cấu hình trong Admin -> Settings).

---

## Troubleshooting (Gỡ rối)

1. **Lỗi không kết nối được PostgreSQL khi chạy `npm run dev` hoặc Prisma CLI**
   -> Đảm bảo DB đang chạy, kiểm tra lại connection string `DATABASE_URL` (có đúng port, user, pass không).
   
2. **Lỗi Webhook Google Sheets không hoạt động**
   -> Đảm bảo bạn đã Deploy App Script với chế độ (Who has access = Anyone). Đừng copy nhầm link editor script. URL chuẩn phải có dạng `/macros/s/..../exec`.

3. **Mã QR quét trên app ngân hàng báo "Mất kết nối / Không tồn tại STK"**
   -> Vui lòng kiểm tra lại `BANK_CODE` và `BANK_ACCOUNT_NUMBER` trong biến `.env`. Bắt buộc phải trùng đúng Tên viết tắt chuẩn Napas ngân hàng của bạn.

---
🚀 Developed for high-performance MMO operations by Antigravity Agent.
