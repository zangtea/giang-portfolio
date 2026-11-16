# Portfolio — Lê Thị Trà Giang

Website portfolio cá nhân của Full-stack Developer, xây dựng bằng Next.js 16, TypeScript, Tailwind CSS v4 và Supabase.

## Tính năng

- **Đa ngôn ngữ** — Tiếng Việt và English, chuyển đổi không reload trang
- **Light / Dark Mode** — Theo system preference, lưu vào localStorage, không flash
- **Responsive** — Mobile (320px) đến màn hình lớn
- **Hiệu ứng 3D** — WebGL tương tác trong Hero section, có fallback
- **SEO** — Metadata, Open Graph, sitemap, robots.txt
- **Form liên hệ** — Validate client + server, honeypot chống spam, rate limiting, lưu vào Supabase
- **Accessibility** — Keyboard navigation, skip link, focus visible, ARIA labels
- **Performance** — Static generation, lazy loading, Partial Prerendering

## Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Framework | Next.js 16.4.5 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (contact form) |
| 3D | Three.js (lazy loaded) |
| Icons | Lucide React, React Icons |
| Hosting | Vercel |
| CI/CD | GitHub → Vercel |

## Yêu cầu môi trường

- **Node.js** ≥ 20 (khuyên dùng v20 LTS hoặc v22)
- **npm** ≥ 10

## Cấu trúc thư mục

```
src/
├── app/
│   ├── [lang]/               # Routes theo locale (vi, en)
│   │   ├── layout.tsx        # Layout với Header + Footer
│   │   ├── page.tsx          # Trang chủ
│   │   ├── projects/[slug]/  # Trang chi tiết dự án
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   ├── api/contact/          # API endpoint form liên hệ
│   ├── layout.tsx            # Root layout (theme script)
│   ├── page.tsx              # Redirect → /vi
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/               # Header, Footer
│   ├── navigation/           # NavLink, MobileNav
│   ├── projects/             # ProjectDetail
│   ├── sections/             # Hero, About, Skills, Projects, Experience, Contact
│   └── ui/                   # ThemeToggle, LanguageSwitcher, Badge, SectionWrapper, SectionHeader
├── config/
│   ├── site.ts               # ⭐ Cấu hình trung tâm — điền thông tin cá nhân tại đây
│   └── navigation.ts
├── content/
│   ├── dictionaries/
│   │   ├── vi.json           # Bản dịch tiếng Việt
│   │   └── en.json           # Bản dịch tiếng Anh
│   ├── projects/projects.ts  # Dữ liệu 4 dự án
│   ├── skills.ts             # Danh sách kỹ năng
│   └── experience.ts         # Học vấn và kinh nghiệm
├── lib/
│   ├── dictionaries.ts       # getDictionary() helper
│   └── utils.ts              # cn() utility
├── proxy.ts                  # i18n routing (Next.js 16 Middleware)
└── supabase/migrations/      # SQL schema cho contact_messages
```

## Cài đặt và chạy local (Windows / PowerShell)

```powershell
# 1. Clone hoặc mở thư mục project
cd E:\folio\giang-portfolio

# 2. Cài dependencies (nếu chưa có node_modules)
npm install

# 3. Tạo file môi trường
Copy-Item .env.example .env.local

# 4. Mở .env.local và điền NEXT_PUBLIC_SITE_URL nếu cần

# 5. Chạy development server
npm run dev

# Mở trình duyệt: http://localhost:3000
# Sẽ được redirect tự động đến http://localhost:3000/vi
```

## Cập nhật thông tin cá nhân

Mở file `src/config/site.ts` và cập nhật các trường:

```typescript
export const siteConfig = {
  name: "Lê Thị Trà Giang",           // Họ tên đầy đủ
  displayName: "LE THI TRA GIANG",     // Tên hiển thị (header, hero)
  title: "Full-stack Developer",
  location: "Đà Nẵng, Việt Nam",
  email: "tragiang080404@gmail.com",   // Email liên hệ
  github: "https://github.com/zangtea",
  linkedin: "https://www.linkedin.com/in/...",
  avatarUrl: ...,   // Đặt avatar.jpg vào /public/avatar.jpg
  cvUrl: ...,       // Đặt cv.pdf vào /public/cv.pdf
  bio: {
    vi: "...",      // Bio tiếng Việt
    en: "...",      // Bio tiếng Anh
  },
};
```

## Thêm ảnh đại diện và CV

```powershell
# Đặt ảnh đại diện (JPG/PNG, 400×400px trở lên)
Copy-Item "C:\path\to\your-photo.jpg" "E:\folio\giang-portfolio\public\avatar.jpg"

# Đặt CV (PDF)
Copy-Item "C:\path\to\your-cv.pdf" "E:\folio\giang-portfolio\public\cv.pdf"
```

## Thêm hoặc sửa dự án

Mở `src/content/projects/projects.ts`. Mỗi dự án có cấu trúc:

```typescript
{
  slug: "ten-du-an",          // URL-friendly ID
  title: "Tên Dự Án",
  category: "web-app",        // "web-app" | "tool" | "e-commerce" | "ai-ml"
  shortDesc: { vi: "...", en: "..." },
  overview:  { vi: "...", en: "..." },
  problem:   { vi: "...", en: "..." },
  solution:  { vi: "...", en: "..." },
  architecture: { vi: "...", en: "..." },
  features:  { vi: ["..."], en: ["..."] },
  role:      { vi: "...", en: "..." },
  techStack: ["Next.js", "TypeScript", ...],
  githubUrl: "https://github.com/..." | null,
  demoUrl:   "https://example.com" | null,
}
```

## Thêm kinh nghiệm / học vấn

Mở `src/content/experience.ts`, thêm item và đặt `visible: true`:

```typescript
{
  id: "edu-dnu",
  type: "education",
  title: { vi: "Kỹ sư Công nghệ Thông tin", en: "B.Eng. Information Technology" },
  organization: { vi: "Đại học Đà Nẵng", en: "University of Da Nang" },
  period: "2022 – 2026",
  description: { vi: "...", en: "..." },
  visible: true,  // ← bật lên để hiển thị
}
```

## Cấu hình environment variables

Tạo `.env.local` từ `.env.example`:

```env
# URL chính thức của website (điền sau khi deploy)
NEXT_PUBLIC_SITE_URL=https://your-name.vercel.app

# Supabase (cần thiết để form liên hệ hoạt động)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Lưu ý:** Không commit file `.env.local`. File này đã được thêm vào `.gitignore`.

## Kiểm thử

```powershell
# Lint
npm run lint

# Build (kiểm tra TypeScript + compile)
npm run build

# Dev server
npm run dev
```

## Deploy lên Vercel

### Bước 1: Push lên GitHub

```powershell
cd E:\folio\giang-portfolio
git add .
git commit -m "feat: initial portfolio setup"
git push origin main
```

### Bước 2: Import vào Vercel

1. Truy cập [vercel.com](https://vercel.com) → **Add New Project**
2. Chọn GitHub repository `giang-portfolio`
3. Framework Preset: **Next.js** (tự động detect)
4. **Environment Variables** — Thêm các biến sau:
   - `NEXT_PUBLIC_SITE_URL` = URL được Vercel cấp (điền sau lần deploy đầu)
   - `NEXT_PUBLIC_SUPABASE_URL` (nếu dùng form liên hệ)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (nếu dùng form liên hệ)
5. Click **Deploy**

### Bước 3: Cập nhật NEXT_PUBLIC_SITE_URL

Sau khi deploy lần đầu, Vercel sẽ cấp domain dạng `your-project.vercel.app`. Cập nhật biến môi trường này trong dashboard Vercel → Project → Settings → Environment Variables.

## Cấu hình Supabase (cho form liên hệ)

### 1. Tạo project Supabase

1. Truy cập [app.supabase.com](https://app.supabase.com) → New Project
2. Chọn region gần Việt Nam (Singapore)

### 2. Áp dụng migration

Mở **SQL Editor** trong Supabase Dashboard và chạy:

```sql
-- Nội dung từ: src/supabase/migrations/001_create_contact_messages.sql
```

Hoặc copy nội dung file SQL và paste vào SQL Editor.

### 3. Lấy credentials

- Project → Settings → API
- Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Thêm vào Vercel

Dashboard Vercel → Project → Settings → Environment Variables → thêm 2 biến trên.

## Kết nối domain riêng

Sau khi có domain (ví dụ từ Namecheap, GoDaddy):

1. Vercel → Project → Settings → Domains → Add Domain
2. Làm theo hướng dẫn thêm DNS records
3. Vercel tự cấp SSL/HTTPS miễn phí

## Uptime và monitoring

Website được host trên Vercel CDN — không cần bật laptop. Miễn phí bao gồm:
- Unlimited bandwidth cho static assets
- 100GB bandwidth/tháng cho serverless functions
- SSL tự động

Nếu muốn theo dõi uptime, có thể dùng [UptimeRobot](https://uptimerobot.com) (free tier: 50 monitors, check mỗi 5 phút).

## Chi phí ước tính (Free Tier)

| Dịch vụ | Giới hạn Free | Ghi chú |
|---------|--------------|---------|
| Vercel | 100GB bandwidth, 100h build/tháng | Đủ cho portfolio cá nhân |
| Supabase | 500MB database, 5GB storage | Đủ cho contact form |
| GitHub | Unlimited public repos | — |

## Các bước trước khi công khai

Xem file [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md).

## Lỗi thường gặp

### `NEXT_PUBLIC_SITE_URL is not set`
→ Tạo `.env.local` và điền `NEXT_PUBLIC_SITE_URL`. Không ảnh hưởng đến chức năng, chỉ ảnh hưởng SEO canonical URLs.

### Form liên hệ trả về 503
→ Chưa cấu hình Supabase. Thêm `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` vào environment variables.

### Build fail: `Access is denied`
→ Chạy terminal với quyền Administrator hoặc kiểm tra quyền thư mục.

### Ảnh avatar không hiển thị
→ Đặt file `avatar.jpg` vào thư mục `public/`. File phải tên đúng là `avatar.jpg`.
