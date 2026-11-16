# Checklist trước khi công khai Portfolio

## Thông tin cá nhân (`src/config/site.ts`)

- [ ] `name` — Họ tên đầy đủ đã chính xác
- [ ] `displayName` — Tên hiển thị (header, hero) đã chính xác
- [ ] `email` — Email liên hệ đã chính xác và hoạt động
- [ ] `github` — URL GitHub profile đã kiểm tra
- [ ] `linkedin` — URL LinkedIn profile đã kiểm tra
- [ ] `location` — Địa điểm đã cập nhật

## Tài sản tĩnh (`public/`)

- [ ] `public/avatar.jpg` — Ảnh đại diện (JPG/PNG, ≥400×400px, dung lượng < 500KB)
- [ ] `public/cv.pdf` — CV mới nhất (PDF, dung lượng < 2MB)

## Nội dung

- [ ] Bio (`siteConfig.bio`) — Đã xem lại cả tiếng Việt và tiếng Anh
- [ ] Dự án (`src/content/projects/projects.ts`) — GitHub URLs đã xác nhận là public
- [ ] Dự án — Demo URLs đã kiểm tra còn hoạt động
- [ ] Kinh nghiệm (`src/content/experience.ts`) — Đã thêm thông tin thực, `visible: true`
- [ ] Dịch thuật — Xem lại `vi.json` và `en.json` không còn nội dung placeholder

## Environment Variables (Vercel Dashboard)

- [ ] `NEXT_PUBLIC_SITE_URL` — URL Vercel production (ví dụ: `https://giang-portfolio.vercel.app`)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` — Nếu dùng form liên hệ
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Nếu dùng form liên hệ

## Supabase (nếu dùng form liên hệ)

- [ ] Project Supabase đã được tạo (chọn region Singapore)
- [ ] SQL migration `src/supabase/migrations/001_create_contact_messages.sql` đã được chạy
- [ ] Row Level Security đã được bật cho bảng `contact_messages`
- [ ] Kiểm tra form gửi thực tế — dữ liệu xuất hiện trong Supabase Table Editor

## Deploy

- [ ] Code đã được push lên GitHub (`git push origin main`)
- [ ] Project đã được import vào Vercel
- [ ] Deploy production thành công
- [ ] Truy cập URL production — trang chủ redirect đúng đến `/vi`
- [ ] Chuyển đổi ngôn ngữ `/vi` ↔ `/en` hoạt động
- [ ] Light/Dark mode không bị flash khi load
- [ ] Mobile navigation mở/đóng bình thường

## SEO

- [ ] Cập nhật `robots` trong `app/layout.tsx`: đổi `index: false` → `index: true`
- [ ] Kiểm tra `https://your-domain.vercel.app/sitemap.xml`
- [ ] Kiểm tra `https://your-domain.vercel.app/robots.txt`

## Bảo mật

- [ ] File `.env.local` không được commit (`git status` không thấy file này)
- [ ] Không có API key hoặc secret trong source code
