# 💎 TaleemOne ERP — Frontend Architecture, UI & Design Constitution

- **Project Name:** TaleemOne ERP (Web Application)
- **Engineering Authority:** Powered by Barkat Tech
- **Standard:** FAANG-Grade Enterprise Architecture (10/10 Senior Architect & Security Audit Standard)
- **Target Users:** Strictly 3 Internal Institutional Roles (`SUPER_ADMIN`, `ADMIN`, `STAFF`)

---

## 🎯 1. Constitution & Universal Branding

### 1.1 Single-Institute Dedicated VPS & Zero Hardcoded Names
- **Dedicated Standalone Instance:** Frontend web application strictly single-institute deployment ke liye design ki gayi hai (Zero Multi-Tenant overhead).
- **Dynamic Identity via Backend API (Zero UI Input Needed):**
  - Institute ka naam, logo, Urdu/Arabic calligraphy, address, aur academic year settings backend API (`/api/v1/institute/settings`) se dynamically load hoti hain.
  - **No Onboarding UI Mandate:** Institute identity aur details bharne ke liye frontend me koi registration/onboarding UI nahi banegi — yeh data strictly backend VPS deployment (`.env` / database seed) se populate hoga. Frontend ka kaam sirf ise read karke dynamic display karna hai.
  - Kisi bhi component, page title ya header me kisi school, madarsa ya university ka naam hardcode karna **STRICTLY BANNED** hai.
- **Universal Platform Attribution:**
  - System base identity **TaleemOne ERP** rahegi.
  - Login page, dashboard sidebar ke bottom, aur official printouts par **"Powered by Barkat Tech"** ka verified badge aur link permanent dikhega.

---

## 🏛️ 2. Architecture: True Feature-Sliced Design (FSD) & Anti-Monolith

Frontend codebase strictly standard **Feature-Sliced Design (FSD)** hierarchy follow karega:

```
frontend/src/
├── app/                  # Route Entry Points, Layouts, Global Providers (Thin Wrappers Only)
├── widgets/              # Large composite UI blocks (Header, Sidebar, DashboardShell)
├── features/             # Business features sliced by domain (e.g., student-admission, fee-collect)
│   └── [feature-name]/
│       ├── api/          # React Query hooks & API mutations for this feature
│       ├── model/        # Types, Zod schemas, and local feature state
│       └── ui/           # Feature UI components (< 150-200 lines each)
├── entities/             # Core reusable business entities (StudentCard, StaffAvatar, FeeBadge)
└── shared/               # Reusable headless utilities, API client, Shadcn base UI, stores
    ├── api/              # Axios client, interceptors, queryClient setup
    ├── ui/               # Base Shadcn/Radix master components (Button, Dialog, Input, etc.)
    ├── lib/              # Formatters, date helpers, validation utils
    └── stores/           # Global client stores via Zustand (Auth, Theme, Sidebar)
```

### 📐 Non-Negotiable Architecture Rules:
1. **Max 150-200 Lines Component Law:** Kisi bhi single component file ki length **150 se 200 lines** se zyada nahi ho sakti. Badi files ko sub-components ya custom hooks me split karna compulsory hai.
2. **Pages are Thin Wrappers Only:** Next.js `page.tsx` files ke andar **0 business logic, 0 direct API calls, aur 0 form state** hogi. Wo sirf relevant Feature ya Widget component ko render karega.
3. **Downward Imports Only:** Slices sirf apne se neeche wale layers ko import kar sakti hain:  
   `app` ➔ `widgets` ➔ `features` ➔ `entities` ➔ `shared`.
4. **No Cross-Feature Imports (Strict DRY via Shared/Entities):** Ek feature doosre feature ko directly import nahi kar sakta. Agar do features ko same UI, model ya helper chahiye (DRY - Don't Repeat Yourself principle), toh use copy-paste karne ke bajaye hamesha global `@/entities` ya `@/shared` layer mein extract karein taaki dono features wahan se cleanly reuse kar sakein.
5. **Component-Level RBAC Protection:** Har sensitive action button ya section strict permission component se wrap hoga:
   ```tsx
   <Protect module="students" level="edit">
     <Button onClick={handleEdit}>Edit Student</Button>
   </Protect>
   ```

---

## 🎨 3. Mandatory Liquid Crystal Glassmorphism (Zero Solid Cards Mandate)

> [!CAUTION]
> **❌ STRICTLY BANNED — OPAQUE SOLID COLOR CARDS**  
> Pure frontend web interface mein kisi bhi container, card, sidebar, modal, ya widget par flat opaque solid color (`bg-white`, solid dark `bg-[#121c16]`, flat grey boxes) lagana **ABSOLUTELY BANNED** hai.

### Universal Glassmorphism Specifications:
1. **Translucent Glass Fills:**
   - Light Mode: `bg-white/20` to `bg-white/40`
   - Dark Mode: `bg-black/20` to `bg-black/40`
2. **Backdrop Blur:** `backdrop-blur-2xl` or `backdrop-blur-xl` mandatory on all cards, sidebars, tables, and dialogs.
3. **Frosted Borders:** Luminous subtle borders (`border border-white/40` to `border-white/80`, `shadow-xl`).
4. **Dynamic Under-Layer Mesh Gradient:** Multi-color subtle dynamic mesh/aurora gradient har view ke peeche smoothly float aur glow karega taaki luxury depth maintain rahe.

---

## 🔌 4. Backend Connection, State & Data Contracts

### 4.1 Centralized Axios Client (`@/shared/api/httpClient.ts`)
1. **Single Unified Client:** Direct `fetch` ya multiple axios instances poore codebase mein **BANNED** hain.
2. **Automatic Token Injection:** Request interceptor automatically `Authorization: Bearer <token>` inject karega.
3. **Normalized Error Pipeline:**
   - **401 Unauthorized:** Session safely purge karke bina memory leak ke `/login` par redirect karega.
   - **403 Forbidden:** Automatic permission-denied feedback (Sonner toast) trigger karega.
   - **422 / 400 Validation Errors:** Form fields ke saath integrate karne ke liye structured error map return karega.
   - **500 Server Errors:** Clean fallback message dikhayega (raw stack trace client ko kabhi nahi dikhega).

### 4.2 Server-State Management via TanStack Query v5
1. **No `useEffect` Fetching:** Data fetching ke liye `useEffect` use karna **STRICTLY BANNED** hai. Sirf TanStack Query hooks use honge.
2. **Query Key Factory Pattern:** Koi bhi query key hardcoded string array nahi hogi:
   ```typescript
   export const studentKeys = {
     all: ['students'] as const,
     lists: () => [...studentKeys.all, 'list'] as const,
     list: (filters: StudentFilterDTO) => [...studentKeys.lists(), filters] as const,
     details: () => [...studentKeys.all, 'detail'] as const,
     detail: (id: string) => [...studentKeys.details(), id] as const,
   };
   ```
3. **Surgical Cache Invalidation:** Mutation success hone par poora cache wipe out nahi hoga; sirf relevant specific query key invalidate hogi (`queryClient.invalidateQueries`).
4. **Optimistic Updates (Instant Zero-Lag UI):** High-frequency actions (Attendance marking, status toggles) par UI ko 0-millisecond me turant update karein without waiting for server response. Agar mutation fail ho, toh rollback context ke zariye purani state restore karein aur error toast dikhayein.
5. **Smart Stale-Time Policy (`staleTime: 60s`):** Frequently navigated lists par default 60-second stale time enforce karein taaki 1 minute ke andar page switch karne par baar-baar bekaar loading spinners na ghoomein aur direct memory se instant data serve ho.
6. **AbortController Race-Condition Armor:** Har TanStack Query hook mein `signal` parameter pass karna compulsory hai taaki rapid navigation par in-flight requests cancel hon aur stale responses UI ko corrupt na karein:
   ```typescript
   queryFn: ({ signal }) => httpClient.get('/api/v1/students', { signal }),
   ```
7. **Bundle Size Vigilance:** Next.js build output mein kisi bhi single route chunk ka size **200 KB (gzipped)** se zyada nahi hona chahiye (`next/dynamic` for heavy components).

---

## 🎨 5. UI/UX, Design System & Master Component Directory (`@/shared/ui/*`)

> [!CAUTION]
> **🏛️ THE UNIVERSAL UI BLANKET LAW (ZERO-FRAGMENTATION MANDATE)**  
> Poori application ke andar kisi bhi page par UI elements ka alag-alag dikhna **STRICTLY BANNED** hai. Har visual primitive ka **sirf aur sirf EK master component** `@/shared/ui/` ke andar bana hoga. Inline HTML tags ya random copy-paste widgets allowed nahi hain.

### 5.1 The 6-Tier Master Component Directory
| Tier | Category | Standard Components (`@/shared/ui/*`) | Strict Rules & Uniform Behavior |
| :--- | :--- | :--- | :--- |
| **1** | **Form & Data Entry Controls** | `input.tsx`, `textarea.tsx`, `select.tsx`, `date-picker.tsx`, `time-picker.tsx`, `currency-input.tsx`, `phone-input.tsx`, `otp-pin-input.tsx`, `search-combobox.tsx`, `file-uploader.tsx`, `checkbox.tsx`, `switch.tsx` | - **Radius:** Har input ka corner radius strictly **`--radius: 0.625rem` (10px)** lock rahega.<br>- **Currency Input:** Backend `.env` dynamic currency prefix (₹, $, AED), Indian/locale comma formatting (`1,50,000`), aur auto-clean number output.<br>- **File Uploader:** Drag-and-drop zone, size badge, preview thumbnail.<br>- **Search Combobox:** 300ms debounce, loading spinner.<br>- **Native HTML Tags Banned:** Raw `<input>`, `<select>`, `<textarea>` likhna STRICTLY FORBIDDEN hai. |
| **2** | **Action Elements** | `button.tsx`, `dropdown-menu.tsx`, `action-toolbar.tsx`, `export-button.tsx` | - **Buttons:** 5 standard variants: `default`, `secondary`, `outline`, `ghost`, `destructive`.<br>- **Loading State:** Form submit par button auto-disable + internal spinning loader.<br>- **Icon Spacing:** Icon aur text ke beech strictly standard gap (`gap-2`). |
| **3** | **Overlays & Drawers** | `dialog.tsx` (modals), `sheet.tsx` (slide-overs), `alert-dialog.tsx` (delete confirmations), `popover.tsx`, `tooltip.tsx` | - Backdrop blur (`backdrop-blur-md`), scale-up animation 100% identical.<br>- Delete confirmation ke liye standard `AlertDialog` with Destructive red button.<br>- Standard sheet widths (`sm`, `md`, `lg`, `xl`). |
| **4** | **Data Presentation** | `data-table.tsx`, `badge.tsx`, `kpi-card.tsx`, `avatar.tsx`, `accordion.tsx` | - **Tables:** Sticky header, subtle row hover, pagination bar, standard padding.<br>- **KPI Stat Cards:** Padding `p-6`, glassmorphic border `border-white/70`, trend percentage badge.<br>- **Badges (Status Chips):** 🟢 **Green** (Paid/Active/Present), 🟡 **Amber** (Pending/Late), 🔴 **Red** (Defaulter/Absent), 🔵 **Blue** (Draft/Info). |
| **5** | **Navigation & Wayfinding** | `tabs.tsx`, `breadcrumbs.tsx`, `pagination.tsx`, `stepper-wizard.tsx` | - Breadcrumbs top par standard chevron separator ke saath.<br>- Admission/Onboarding me standard multi-step wizard. |
| **6** | **Feedback & States** | `sonner.tsx` (toasts), `skeleton.tsx`, `empty-state.tsx`, `alert-banner.tsx` | - **Interactive Toasts:** Rich colors via `Sonner` (Top-right position, auto-dismiss).<br>- **Shimmer Skeletons:** Exact replica shimmer (Zero Layout Shift - CLS = 0).<br>- **Empty States:** SVG illustration, informative title, aur CTA button. |

### 5.2 The 4 Golden Visual Invariants (Cannot Change Across Pages)
1. **Unified Corner Radius:** Poore system mein buttons, cards, dialogs, inputs sab par strictly **`0.625rem` (10px)** radius hi lagega.
2. **Standard Color Tokens (OKLCH):** Saare background, border aur accent colors Tailwind OKLCH variables se aayenge. Hardcoded inline HEX (`#123456`) codes banned hain.
3. **Typography Standard:** Body aur headings ke liye `Geist Sans`, aur numeric tables, roll numbers, amounts ke liye `Geist Mono`.
4. **Allowed Icon Libraries:** Strictly **`lucide-react`** aur **`remix-icon`**.

---

## ⏱️ 6. Temporal & Currency Formatting Standards

1. **Clean Date Rendering (`DD MMM YYYY`):**
   - User-facing screen par date strictly **`DD MMM YYYY`** (jaise: **`09 Sep 2026`**) format me render hogi.
   - Jahan time zaroori ho: **`DD MMM YYYY, hh:mm A`** (e.g. `09 Sep 2026, 09:15 AM`).
   - Centralized helper `@/shared/lib/dateUtils.ts` se hi formatting hogi (manual dayjs format strings in components banned hain).
2. **100% Dynamic Currency:**
   - Currency symbol (₹, $, AED) code me hardcode nahi hoga — backend `/api/v1/institute/settings` se dynamically render hoga.
   - Financial amounts Indian/locale grouping format me render honge (`1,50,000.00`).

---

## 🖨️ 7. Enterprise Resilience & High-Level Production Standards

1. **A4 Sheet Print Isolation (`@media print`):**
   - Marksheets, fee receipts, aur ID cards strictly standard **A4 Sheet (`210mm x 297mm`)** par pixel-perfect print honge.
   - Print ke waqt sidebar, header aur buttons automatically hide honge (`display: none !important`), aur background colors preserve rahenge (`print-color-adjust: exact;`).
2. **Financial Idempotency & Double-Click Armor (`X-Idempotency-Key`):**
   - Fee submit action par unique UUIDv4 generate hoga aur header `X-Idempotency-Key` ke saath jayega. Accidental double-click par kabhi duplicate fee nahi kategi.
3. **Urdu/Arabic Real-Time Phonetic Transliteration:**
   - English keyboard se type karne par student names aur books real-time Urdu/Arabic me convert honge (300ms debounce + `AbortController`). RTL safe layout with `dir="auto"`.
4. **Client-Side Image Compression (< 150 KB WebP):**
   - Student photos upload hone se pehle browser ke andar hi losslessly compress hoke **< 150 KB WebP** banengi, taaki server RAM aur bandwidth 100% secure rahe.
5. **URL Query Params Deep-Linking:**
   - Table filters (Class, Section, Status), search keyword aur pagination hamesha URL search params (`useSearchParams`) se synced rahenge.

---

## 🚫 8. The Frontend Blacklist (Instant PR Rejection)

| # | Banned Anti-Pattern | Mandatory Solution |
|---|---|---|
| 1 | **`any`, `as any`, `@ts-ignore`, `!`** | Strict TypeScript interfaces & Type Guards. |
| 2 | **Opaque Solid Color Cards (`bg-white`, solid boxes)** | Universal Liquid Crystal Glassmorphism (`backdrop-blur-2xl`, translucent fills). |
| 3 | **Component File > 150-200 Lines** | Split into sub-components & custom hooks. |
| 4 | **Raw `useState` for Form Input Handling** | `react-hook-form` + `Zod` validation schemas. |
| 5 | **Direct `fetch` / Raw Axios in components** | Centralized `@/shared/api/httpClient.ts` + TanStack Query. |
| 6 | **`useEffect` for Data Fetching** | TanStack Query (`useQuery`, `useMutation`). |
| 7 | **Hardcoded Institute Names / Branding** | Dynamic fetch from backend `/api/v1/institute/settings`. |
| 8 | **Hardcoded Currency Symbols (`₹`, `$`)** | Dynamic currency from institute settings API. |
| 9 | **Raw Unformatted Dates (`2026-09-10T...`)** | Formatted via `@/shared/lib/dateUtils.ts` strictly as `DD MMM YYYY`. |
| 10 | **Missing Skeletons / Broken Hydration** | Shimmer replica skeletons with exact layout dimensions (CLS = 0). |
| 11 | **`window.location.reload()`** | React Query invalidation + Next.js router. |
| 12 | **Student/Parent Login Routes on Web** | Strictly 3 internal institutional roles (`SUPER_ADMIN`, `ADMIN`, `STAFF`). |
| 13 | **Raw HTML Inputs (`<input>`, `<select>`)** | Master primitives from `@/shared/ui/*`. |
| 14 | **DOM Event Casting (`as HTMLInputElement`)** | Runtime Type Narrowing via `instanceof HTMLInputElement`. |
| 15 | **Ad-Hoc Custom Radius / Random Icon Packs** | Standard `0.625rem` (10px) radius & `lucide-react` / `remix-icon` only. |

---

## 🛡️ 9. UI-to-Backend Connection Armor & Leak/Security Defense

Frontend aur Backend ka connection 100% bug-free, leak-free aur security-hardened hona chahiye:

### 9.1 Zero Token Leak & XSS Immunity (HttpOnly Cookie Standard)
1. **No `localStorage` / `sessionStorage` for Tokens:** Access Token aur Refresh Token ko browser ke `localStorage` ya `sessionStorage` mein rakhna **STRICTLY BANNED** hai (XSS attack mein token chori ho sakta hai).
2. **HttpOnly & SameSite=Strict:** Authentication strictly browser-managed `HttpOnly`, `SameSite=Strict`, `Secure` cookies se chalegi. Frontend JavaScript token ko kabhi direct touch nahi karega.
3. **Automatic Credentials Handling:** Central Axios client hamesha `withCredentials: true` configure karega taaki cookies har API call ke sath automatically transmit hon.

### 9.2 Silent Token Refresh Mutex (Race-Condition & Loop Armor)
1. **Zero-Loop Mutex Queue:** Agar Access Token expire ho jaye (401 Unauthorized), toh Axios interceptor ek FIFO queue maintain karega. Pehla request refresh token API (`/api/v1/auth/refresh`) ko call karega, tab tak parallel requests pause rahengi.
2. **Request Replay:** Naya token set hone par saari paused requests smoothly replay hongi. Agar refresh token bhi invalid ho, tabhi session wipe karke `/login` redirect karega. Zero flicker, zero infinite loop.

### 9.3 Memory Leak & Connection Shield (Auto-Abort on Unmount)
1. **Signal Propagation:** Har TanStack Query hook aur Axios request mein `AbortController.signal` bind hona compulsory hai.
2. **Unmount Cleanup:** User agar page switch ya component close kare, toh saari in-flight HTTP requests turant terminate ho jayengi. Isse unmounted component state update warnings aur client-side memory leaks 100% khatam honge.

### 9.4 Request Sanitization & Production Data Defense
1. **Zod Payload Stripping:** Form submit hone se pehle frontend Zod schema ke zariye sirf validated aur whitelisted fields ko payload banayega; koi bhi extra UI temporary state backend ko leak nahi hogi.
2. **Production Console Shield:** Production build mein Next.js compiler config (`removeConsole: { exclude: ['error'] }`) active rahega taaki client console mein sensitive institutional data, student PII, ya API details print na hon.

---

## 🧪 10. Mandatory Verification & 5-Tier Frontend & Integrated Testing Pyramid

Koi bhi frontend page ya feature tab tak "Production-Ready" nahi mana jayega jab tak wo in testing aur verification gates ko pass na kare:

### 10.1 Code-Level Pre-Release Gates (Automated Checks)
1. **Compilation Check:** `npx tsc --noEmit` ➔ **0 Errors, 0 Warnings.**
2. **Linter Verification:** `npm run lint` ➔ **0 Lint Errors.**
3. **Production Build Test:** `npm run build` ➔ Next.js production build passes with chunks < 200 KB.
4. **Runtime Console Audit:** Browser console mein **0 red errors**, 0 hydration errors, 0 missing key warnings.
5. **Network & DTO Verification:** APIs return expected HTTP statuses, and payloads strictly match defined TypeScript DTOs.

### 10.2 The 5-Tier Frontend & Integrated Testing Pyramid
| Tier | Test Category | Target Scope & Mandate | Tooling |
|---|---|---|---|
| **Tier 1** | **Unit & Domain Utility Tests** | Zod form validation schemas, custom hooks (`useDebounce`, `useTransliteration`), date formatting (`dateUtils.ts`), aur dynamic currency calculation helpers. | Vitest / Jest |
| **Tier 2** | **Component & Visual State Tests** | Har UI component ke 5 mandatory states test honge: *Initial State*, *Loading Skeleton State* (Zero Layout Shift - CLS = 0), *Error Banner State*, *Empty State*, aur *Data Rendered State*. Form inputs par validation error highlight aur disable behavior verify hoga. | Vitest + React Testing Library |
| **Tier 3** | **Mocked API Integration Tests** | Network layer mock karke TanStack Query hooks test honge: 200 OK success flow, 401 Unauthorized silent refresh/redirect, 422 Validation errors mapping to form inputs, aur 500 server crash par Sonner toast fallback. | Mock Service Worker (MSW) |
| **Tier 4** | **Full-Stack Integrated E2E Tests (Live UI ➔ Backend ➔ DB)** | Real browser par poora integration loop test hoga: User Login ➔ HttpOnly Cookie verify ➔ Dashboard Glassmorphism load ➔ Form submit (e.g. Admission/Fee Counter) ➔ Double-click test (`X-Idempotency-Key`) ➔ Backend API process in transaction ➔ PostgreSQL DB write verify ➔ Sonner Success Toast appear ➔ 0ms UI Table update ➔ Page refresh state persistence. | **Playwright** / Cypress |
| **Tier 5** | **Cross-Device, Accessibility & Print Audit** | Responsive screen test: Mobile (375px), Tablet (768px), Desktop (1440px). Standard A4 Sheet print preview check (`@media print` removes sidebar/headers). Lighthouse CI Score: Performance > 90, Accessibility > 95, Best Practices = 100, SEO > 90. | Playwright + Lighthouse CI |

### 10.3 Continuous Integration & End-to-End Health Checks
- **Form-Submit-to-DB Verification:** Har form submission ka data live PostgreSQL DB me save hona aur table me render hona test script se verify hoga.
- **Role Permission Integrity:** Staff user agar unauthorized admin route access karne ki koshish kare, toh frontend gracefully 403 Forbidden intercept karke access block karega.
- **Zero-Hydration Regression:** Next.js SSR aur Client-side rendering mein mismatch (hydration error) aane par build pipeline fail hogi.
