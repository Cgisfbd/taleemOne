# 📜 Master Product Requirement Document (PRD) — Jamia Barkat-e-Haram Portal

**Project Name:** Jamia Barkat-e-Haram Public Web Portal & Student Portal  
**Target Organization:** Jamia Barkat-e-Haram (Girls' Islamic Studies Centre)  
**Architecture Standard:** FAANG-Level Vertical Slice Domain Architecture (DDD-Inspired)  
**Security Level:** Enterprise Grade (7-Layer Web Cyber Defense)  
**Design Standard:** Ultra-Premium Glassmorphism + Mobile-First + Dual Theme (Dark/Light) + i18n Logical RTL (`start`/`end`)

---

## 🏛️ Official Institutional Branding Matrix (4 Languages)

| Language | Official Name | Official Tagline |
| :--- | :--- | :--- |
| 🇬🇧 **English (`en`)** | **Jamia Barkat-e-Haram** | **Girls' Islamic Studies Centre** |
| 🇮🇳 **Hindi (`hi`)** | **जामिया बरकात-ए-हरम** | **मरकज़ुद दिरासातिल इस्लामिया लिल-बनात** |
| 🇵🇰 / 🇮🇳 **Urdu (`ur`)** | **جامعہ برکاتِ حرم** | **مرکز الدراسات الاسلامیۃ للبنات** |
| 🇸🇦 **Arabic (`ar`)** | **جامعة بركات الحرم** | **مركز الدراسات الإسلامية للبنات** |

---

## 📄 1. Executive Summary & Objective

**Jamia Barkat-e-Haram** (Girls' Islamic Studies Centre / جامعہ برکاتِ حرم / مرکز الدراسات الاسلامیۃ للبنات / जामिया बरकात-ए-हरम / मरकज़ुद दिरासातिल इस्लामिया लिल-बनात) ki official public web portal aur student lifecycle ERP system ko enterprise standard modern Next.js 15 & React 19 architecture par develop kiya gaya hai. Iska primary objective traditional authentic Islamic scholarship aur cutting-edge digital pedagogy ko seamlessly integrate karna hai.

---

### 🎓 1.1 Academic Programs & Hybrid Taleem (तालीमी प्रोग्राम्स व असनाद)

1. **तख़स्सुस फ़िल-इफ़्ता / Takhassus Fil Ifta (Muftiya Course / تخصّص فی الافتاء):**
   - **Specialization:** Islamic Jurisprudence (Fiqh), Research Methodology, and Fatwa Studies for female scholars.
   - **Delivery Mode:** Global Hybrid Format — *Online Live Interactive Classes* (worldwide accessibility) aur *On-Campus Offline Immersion*.

2. **Dars-e-Nizami Hybrid Track (आलिमा व फ़ाज़िला निसाब):**
   - **Full-Time Live Digital Broadcast:** Offline campus schedule ka real-time two-way interactive digital live stream.
   - **Fast-Track Modular Batch:** Masroof khawateen (working women / homemakers) ke liye daily 1, 2 ya 3 ghante ka flexible evening/morning track.

3. **Hifz-o-Tajweed & Qira'at (حفظ القرآن والتجويد):**
   - Expert female scholars ke under makharij o tajweed ke sath mukammal Hifz-e-Quran aur husn-e-qira'at.

4. **100% Jamia Scholarship Program:**
   - Jamia Barkat-e-Haram ki janib se deserving aur merit talibat ko 100% free education, boarding aur khana.

5. **Integrated Deeni & Asri Taleem (दीनी व अस्री तालीम کا سنگم):**
   - Traditional Islamic Sciences (Quran, Hadith, Fiqh, Usul) ke sath modern digital smart panels aur moral tarbiyah.

---

### 🌟 1.2 Key Institutional Features & Infrastructure (अहम इदारे की खुसूसियात व सहूलियात)

1. 💻 **Digital Smart Classes & High-Tech Labs:**
   - Interactive Digital Smart Panels, High-definition Projector classrooms, centralized audio-visual lecture capture, aur state-of-the-art computer labs.

2. 🏆 **100% Merit & Need-Based Scholarship:**
   - Jamia Internal Scholarship Entrance Test qualify karne par meritorious aur deserving talibat ko **Mujaddid Alf Sani Trust ki taraf se 100% Free Education & Hostel Sponsorship**.

3. 📱 **Dedicated Student Mobile App (Android APK & iOS):**
   - Live interactive classes, recorded lecture archives, digital admit cards, instant marksheets, aur real-time notifications.

4. ⚡ **Centralized Enterprise ERP Integration:**
   - Direct REST API client ke zariye real-time student services: Online Entrance Registration, Instant Hall Tickets, Results & Gradecards, aur QR-verified Sanad Verification.

5. 🤝 **Free Community Teacher Placement Cell (مفت معلمہ تقرری سیل):**
   - Farigh muallimaat aur Islamic institutions ke darmiyan 100% free teacher matching, profile verification aur placement service.

6. 🛡️ **7-Layer Enterprise Cyber Defense:**
   - Next.js Edge Rate Limiting, DDoS shielding, XSS/SQL Injection immunity, aur strict Content Security Policy (CSP).

---

## 🛠️ 2. Finalized Tech Stack & Technical Specifications

| Layer | Technology Chosen | Purpose & Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 14/15 (React App Router) | SSG/SSR hybrid rendering, App-like mobile navigation, Top-tier SEO. |
| **Styling** | Vanilla CSS / Tailwind CSS + Mesh Gradient Tokens | 5-point radial mesh gradients, Glassmorphism layers, soft borders. |
| **Animations** | Framer Motion | 60fps spring physics micro-interactions & page transitions. |
| **Icons & Fonts** | Lucide React + FontAwesome + Local Fonts + Google Fonts | *Cinzel*, *Playfair Display*, *Inter*, Local *Jameel Noori* (Urdu), Local *Alyamama* (Arabic), Local *Mukta* (Hindi). |
| **ERP API Client** | Native Fetch + Custom Typed Client (`erp-client.ts`) | Centralized API client reading from `.env.local`. |
| **PDF Export** | `@react-pdf/renderer` / `html2pdf.js` | 1-Click Admit Card & Verification Certificate export. |

---

## 🔑 3. Environment & Configuration (.env.local)

ERP API base address ko centralized `.env.local` file me configure kiya jayega:

```env
# ERP API Base Address Configuration
NEXT_PUBLIC_ERP_API_URL=http://localhost:3001
```

- **Rule:** Kisi bhi page ya component me API URL hardcode karna strictly prohibited hai. Centralized `erp-client.ts` `.env.local` se URL lega.

---

## 🎨 4. Theme Architecture — "Light Pastel Mesh Gradient Design System" (Light & Dark Mode)

Website me **Ultra-Premium Light Pastel Mesh Gradient Design System** aur **Dark Mode** support implement hoga:

### 🌈 4.1 Background Mesh Gradient Details (5-Point Radial Coordinates)

- **Base Background Color:** `#F6F1F5` (Soft Light Pastel Base)
- **5-Point Radial Mesh Gradient (Corners & Center):**
  - 📍 **Top-Left (ऊपर बाएँ):** Lavender — `#B18CE5`
  - 📍 **Top-Right (ऊपर दाएँ):** Champagne / Gold — `#F4BE77`
  - 📍 **Bottom-Left (नीचे बाएँ):** Rose / Pink — `#F68EA2`
  - 📍 **Bottom-Right (नीचे दाएँ):** Aqua / Teal — `#75CFCB`
  - 📍 **Center Glow (बीच में):** Ivory Warm White — `#FFFFFCF8` / `#FFFFFC`

### 🔮 4.2 Visual Layer Effects (Glassmorphism & Lighting)

1. **Light Bloom:** Center me soft white glowing circle radial light bloom.
2. **Glass Orbs:** Soft blur waale floating gradient circles (Lavender Orb & Aqua Orb).
3. **Glass Veil:** Frosted glass overlay (Linear Gradient / backdrop-blur).
4. **Vignette Layer:** Edges par subtle dark shadow (`rgba(76, 45, 67, 0.035)`).

### 🎨 4.3 Color Palette (रंग प्रणाली)

| Element | Color Name | Hex Code / Appearance | Used For |
| :--- | :--- | :--- | :--- |
| **Primary Action** | Lavender | `#B18CE5` | Primary Buttons, Active Tabs, Main Highlights, Focus Rings |
| **Secondary Accent** | Rose / Pink | `#F68EA2` | Secondary Accents, Special Badges, Sale/Offer Highlights |
| **Tertiary Accent** | Aqua / Teal | `#75CFCB` | Indicators, Success States, Light Badges, Tech Icons |
| **Warm Accent** | Champagne / Gold | `#F4BE77` | Highlights, Notices, Warnings, Stars/Awards |
| **Background Base** | Light Soft Base | `#F6F1F5` | Base background under mesh gradient |
| **Surface / Cards** | Clean White | `#FFFFFF` | Cards, Dialogs, Sheets (Border: `#EDE6EC`, 0 Elevation) |
| **Primary Text** | Deep Plum Black | `#2D1F33` | Headings & Main Content Text |
| **Secondary Text** | Muted Purple Gray | `#6B5A73` | Subtitles, Body Copy & Descriptions |
| **Muted Text** | Light Lavender Gray | `#A394AB` | Placeholders, Captions, Timestamps, Footers |

### 🧩 4.4 Component Themes (AppTheme Specifications)

- **AppBar / Navigation Bar:** Completely transparent background, elevation 0, *Playfair Display* title font, sleek floating glass layout.
- **Buttons:** Lavender background (`#B18CE5`), white text (`#FFFFFF`), rounded corners (`rounded-xl` / `rounded-full`), smooth spring scale hover effect.
- **Cards:** Clean White surface background (`#FFFFFF`) with soft subtle border (`#EDE6EC`), zero shadow elevation, and backdrop blur.
- **Input Fields:** Light background (`#FCFAFC`) with soft lavender border on focus (`#B18CE5`), clean placeholder text (`#A394AB`).

### 🌙 4.5 Dark Mode Architecture (Deep Obsidian Mesh)

- **Dark Base Canvas:** Deep Plum Obsidian (`#18101E` / `#120A17`).
- **Dark Mesh Gradient:** Top-Left (`#4A2B68`), Top-Right (`#5A3F1F`), Bottom-Left (`#542032`), Bottom-Right (`#1C4749`), Center (`#22162B`).
- **Dark Surface / Glass Cards:** `rgba(34, 22, 43, 0.75)` with glowing lavender border `rgba(177, 140, 229, 0.15)`.
- **Dark Text Palette:** Primary `#FAF6FC`, Secondary `#C8BDCF`, Muted `#8E7E96`.
- **Theme Switcher:** Header toggle button (Sun/Moon icon) synced with `localStorage` (`bah_theme`) aur system `prefers-color-scheme`.

---

## 🌐 5. Typography Hierarchy & Multi-Language (i18n) Architecture

### ✍️ 5.1 3-Core Global Typography Fonts

App me 3 distinct Google fonts ka mix use kiya gaya hai:

1. **Cinzel (Google Font):**
   - **Use:** Royal & Premium Big Display Headings.
   - **Feel:** Royal / Heritage feel.
2. **Playfair Display (Google Font):**
   - **Use:** Section Headers, AppBar Titles, Modal Headings.
   - **Feel:** Elegant Serif look.
3. **Inter (Google Font):**
   - **Use:** Main Body Text, Buttons, Input Fields, Badges, Labels.
   - **Feel:** Clean, modern, highly readable sans-serif.

### 📜 5.2 Multi-Language Adapters & Local TrueType Fonts (`public/fonts/`)

Website me **4-Language Support (English, Urdu, Arabic, Hindi)** aur **W3C Logical Properties Standard (`start` / `end`)** follow hota hai:

1. **Urdu (`ur` - RTL):**
   - **Titles / Big Display Headings:** Local font [`public/fonts/urdu/jameel-noori-kasheeda.ttf`](../public/fonts/urdu/jameel-noori-kasheeda.ttf) (`font-family: 'Jameel Noori Kasheeda'`).
   - **Normal Body Text / Descriptions:** Local font [`public/fonts/urdu/jameel-noori-nastaleeq.ttf`](../public/fonts/urdu/jameel-noori-nastaleeq.ttf) (`font-family: 'Jameel Noori Nastaleeq'`).
   - **Fallback:** *Noto Nastaliq Urdu* (Google Font).
2. **Arabic (`ar` - RTL):**
   - **Local Font:** [`public/fonts/arabic/`](../public/fonts/arabic/) (`font-family: 'Alyamama'`)
   - **Fallback:** *Noto Sans Arabic* / *Amiri* (`font-family: 'Noto Sans Arabic', 'Amiri', serif`).
3. **Hindi (`hi` - LTR):**
   - **Local Font:** [`public/fonts/hindi/`](../public/fonts/hindi/) (`font-family: 'Mukta'`)
   - **Fallback:** *Noto Sans Devanagari* (`font-family: 'Noto Sans Devanagari', sans-serif`).
4. **English (`en` - LTR):**
   - *Cinzel* (Display) + *Playfair Display* (Serif Headers) + *Inter* (Sans-serif Body).

5. **📁 Translation Dictionaries (`src/shared/i18n/`):**
   - `en.json` — English (LTR)
   - `ur.json` — اردو Urdu (RTL)
   - `ar.json` — العربية Arabic (RTL)
   - `hi.json` — हिन्दी Hindi (LTR)

6. **↔️ Logical `start` / `end` Properties (Zero Layout Breaking):**
   - `left`/`right` hardcoding strictly prohibited!
   - Strictly `start` aur `end` logical classes use honge (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`).
   - LTR (English & Hindi) me `start` = Left, RTL (Urdu & Arabic) me `start` = Right. Automatic dynamic mirror layout!

---

## 🛡️ 6. Web Security & Attack Protection Guardrails (Cyber Security)

Website par kisi bhi kism ka cyber attack (Hacking, DDoS, Bot Spam) na ho sake, iske liye ye **7-Layer Enterprise Security Rules** follow honge:

1. 🛡️ **Anti-DDoS & API Rate Limiting:** Next.js Middleware se rate limiting (Max 100 req/min per IP) lagayi jayegi.
2. 🛡️ **XSS (Cross-Site Scripting) Shield:** Sabhi user inputs (search, registration forms) ko sanitize aur HTML escape kiya jayega.
3. 🛡️ **SQL / API Injection Shield:** Parameterized queries aur TypeScript strict typing se SQL/NoSQL Injection completely block rahega.
4. 🛡️ **Clickjacking & CSRF Protection:** Strict `X-Frame-Options: DENY`, `SameSite` cookies, aur Same-Origin policies enforced rahengi.
5. 🛡️ **HTTP Security Headers & CSP:** Content Security Policy (CSP), HSTS, aur `X-Content-Type-Options: nosniff` headers.
6. 🛡️ **CORS Protection:** API calls ko strictly authorized domain origins tak restrict rakha jayega.
7. 🛡️ **Secret Leak Prevention:** Sensitive keys aur tokens sirf server-side rahenge (`.env.local`), client side par leak nahi honge.

---

## 🔁 7. DRY (Don't Repeat Yourself) Principles & Coding Rules

Codebase me zero duplicate code aur high maintainability ke liye **DRY Method** strictly follow hoga:

1. **Shared Layout Primitives (`src/shared/layout/`):** Header, Navbar, Footer, Mobile Drawer, Theme/Lang Toggles ko sirf **EK BAAR** likha jayega.
2. **Atomic UI Kit (`src/shared/components/ui/`):** Buttons, Glass Cards, Modals, Inputs, Badges, Search Bars ek baar create karke globally import honge.
3. **Centralized ERP API Client (`src/shared/erp-api/`):** ERP API requests aur error handling ke liye ek single client (`erp-client.ts`) rahega.
4. **Centralized i18n Context (`src/shared/i18n/`):** Translation provider & custom `useLanguage()` hook.
5. **Custom React Hooks (`src/shared/hooks/`):** Form validation, state persistence, aur ERP fetching logic custom hooks me encapsulate hoga.

---

## 📊 8. Web Analytics & Non-Blocking Bottom Cookie Banner Architecture

Website visitors track karne aur compliance ke liye:

1. **📈 Analytics Tracking (Google Analytics / Cloudflare Analytics / ERP Direct Counter):**
   - Total daily/monthly visitors count.
   - Real-time live active users.
   - Top pages visited & device breakdown (Mobile vs Desktop).
2. **🍪 Non-Blocking Bottom Cookie Banner (`src/shared/layout/CookieBanner.tsx`):**
   - Bottom floating glassmorphism strip: *"We use privacy-friendly essential cookies to save your language preference & analyze site traffic."*
   - **Zero Website Interference:** Visitor bina kisi rukawat ke poori website scroll, read, aur use kar sakta hai. Banner screen blocking nahi karega.
   - **Single Action Button:** Sirf **"Accept"** button. Jab tak user Accept nahi daba deta, banner bottom par aaram se rahega. Click karte hi `localStorage` me save ho kar permanent disappear ho jayega.

---

## 🏆 9. Vertical Slice / Modular Domain Architecture

Codebase ko **Real-World Business Domains** ke hissab se self-contained modules me divide kiya gaya hai:

```text
barkat-e-haram-web/
├── .env.local                    # ERP API URL Configuration File
├── docs/                         # PRD, Specifications & Architecture Docs
│   ├── README.md                 # 📜 Master PRD (Central Architecture)
│   ├── DESIGN_SYSTEM.md          # 🎨 Complete Light Pastel Mesh Design System
│   ├── HOME_PAGE.md              # 🏠 Home Page Specs (Hero slider, notices, etc.)
│   └── ...                       # Individual Page PRDs
│
├── public/                       # High-res Images, Banners, Local Fonts
│   ├── fonts/                    # 🔤 Local TrueType Fonts Subdirectories
│   │   ├── urdu/                 # 🇵🇰 Urdu Fonts (Jameel Noori)
│   │   │   ├── jameel-noori-kasheeda.ttf  # Urdu Display Titles & Headings
│   │   │   └── jameel-noori-nastaleeq.ttf # Urdu Body Text & Paragraphs
│   │   ├── arabic/               # 🇸🇦 Arabic Fonts (Alyamama Family)
│   │   │   ├── Alyamama-Regular.ttf
│   │   │   ├── Alyamama-Medium.ttf
│   │   │   ├── Alyamama-SemiBold.ttf
│   │   │   ├── Alyamama-Bold.ttf
│   │   │   └── Alyamama-VariableFont_wght.ttf
│   │   └── hindi/                # 🇮🇳 Hindi Fonts (Mukta Family)
│   │       ├── Mukta-Regular.ttf
│   │       ├── Mukta-Medium.ttf
│   │       ├── Mukta-SemiBold.ttf
│   │       └── Mukta-Bold.ttf
│   ├── images/                   # Visual Assets
│   │   ├── logo.png              # Official Logo
│   │   └── slides/               # 5 Campus Real Slide Images
│   │       ├── slide1.jpg
│   │       ├── slide2.jpg
│   │       ├── slide3.jpg
│   │       ├── slide4.jpg
│   │       └── slide5.jpg
│   └── logo.png
│
├── src/                          # Main Application Source Code
│   ├── app/                      # Next.js App Router (Routes point cleanly to modules)
│   │   ├── layout.tsx            # Global Root Layout (Theme, Fonts, i18n, Header, Footer, CookieBanner)
│   │   ├── page.tsx              # 🏠 Home Page
│   │   ├── gallery/page.tsx      # 🖼️ Gallery Page
│   │   ├── courses/page.tsx      # 📚 Courses Page
│   │   ├── about/page.tsx        # ℹ️ About Us Page
│   │   ├── contact/page.tsx      # 📞 Contact Us Page
│   │   ├── teacher-register/page.tsx # 👨‍🏫 Teacher Registration Page
│   │   ├── madarsa-request/page.tsx   # 🕌 Madarsa Requirement Page
│   │   └── students/             # 🎓 Student Portal Routes
│   │       ├── page.tsx          # Dashboard (/students)
│   │       ├── admit/page.tsx    # 📄 Admit Card Generator
│   │       ├── result/page.tsx   # 📊 Academic Exam Result
│   │       ├── apply/page.tsx    # ✍️ Entrance Registration
│   │       ├── entrance-result/page.tsx # 🏆 Entrance Result
│   │       └── verify/page.tsx   # 🔍 Documents Verification
│   │
│   ├── modules/                  # 👑 DOMAIN MODULES (ZERO CONFUSION)
│   │   ├── home/                 # Home HeroSlider, MissionCarousel, NoticeBoard, PlacementBanner
│   │   ├── courses/              # Course Catalog, Live Search, Filter Chips
│   │   ├── gallery/              # Photo Grid, Lightbox Viewer
│   │   ├── about/                # Vision, History, Founder Message
│   │   ├── contact/              # Contact Form, Map Location
│   │   ├── placement/            # 🤝 Teacher Placement Module (Forms & Stat Cards)
│   │   └── portal/               # Student Services Modules
│   │       ├── admit-card/       # Admit Card Form, PDF Renderer
│   │       ├── exam-result/      # Results Search
│   │       ├── entrance-apply/   # Registration Form
│   │       ├── entrance-result/  # Result Status
│   │       └── document-verify/  # Verification System
│   │
│   └── shared/                   # Shared Reusable Elements
│       ├── components/ui/        # GlassCard, Button, Modal, Badge, Input
│       ├── layout/               # Header, Navbar, Footer, MobileDrawer, CookieBanner
│       ├── erp-api/              # ERP API Endpoints & Fetch Client (.env.local connected)
│       └── i18n/                 # English / Urdu / Arabic / Hindi Translations (Logical RTL/LTR)
│
├── tailwind.config.ts            # Mesh Gradient & Glassmorphism Tokens
└── package.json
```

---

## 📑 10. Individual Page & System PRD Directory Index

Har individual page aur system ke complete component breakdown aur features uski specific Markdown file me documented hain:

| Document / Page Name | Route Path / File | PRD Markdown File |
| :--- | :--- | :--- |
| 🎨 **Design System & Mesh Theme** | Global Tokens | [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) |
| 🏠 **Home Page** | `/` | [`HOME_PAGE.md`](./HOME_PAGE.md) |
| 🖼️ **Gallery Page** | `/gallery` | [`GALLERY_PAGE.md`](./GALLERY_PAGE.md) |
| 📚 **Courses Page** | `/courses` | [`COURSES_PAGE.md`](./COURSES_PAGE.md) |
| 🎓 **Student Portal Dashboard** | `/students` | [`STUDENT_PORTAL.md`](./STUDENT_PORTAL.md) |
| ℹ️ **About Us Page** | `/about` | [`ABOUT_PAGE.md`](./ABOUT_PAGE.md) |
| 📞 **Contact Us Page** | `/contact` | [`CONTACT_PAGE.md`](./CONTACT_PAGE.md) |
| 👨‍🏫 **Teacher Registration** | `/teacher-register` | [`TEACHER_REGISTER.md`](./TEACHER_REGISTER.md) |
| 🕌 **Madarsa Requirement** | `/madarsa-request` | [`MADARSA_REQUEST.md`](./MADARSA_REQUEST.md) |
| 📄 **Admit Card Generator** | `/students/admit` | [`ADMIT_CARD.md`](./ADMIT_CARD.md) |
| 📊 **Academic Exam Result** | `/students/result` | [`EXAM_RESULT.md`](./EXAM_RESULT.md) |
| ✍️ **Entrance Registration** | `/students/apply` | [`ENTRANCE_APPLY.md`](./ENTRANCE_APPLY.md) |
| 🏆 **Entrance Result** | `/students/entrance-result` | [`ENTRANCE_RESULT.md`](./ENTRANCE_RESULT.md) |
| 🔍 **Documents Verification** | `/students/verify` | [`DOCUMENT_VERIFY.md`](./DOCUMENT_VERIFY.md) |

---

## ⚡ 11. Performance & SEO Service Level Agreements (SLA)

- **Lighthouse Performance Score:** 95+ (Mobile & Desktop).
- **Core Web Vitals:** LCP < 1.2s, FID < 100ms, CLS = 0.
- **SEO Standards:**
  - Semantic HTML5 tags (`<main>`, `<article>`, `<section>`, `<h1>`-`<h6>`).
  - Dynamic OpenGraph tags, Canonical URLs, and Twitter Cards for social sharing.
  - Educational Institution JSON-LD Schema (`schema.org/EducationalOrganization`).
