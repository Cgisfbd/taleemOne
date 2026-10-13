# Project Name: taleemOne ERP
- **Engineering Authority:** Powered by Barkat Tech
- **Standard:** FAANG-Grade Enterprise Architecture (Unified Cross-Platform Design System)
- **Document Scope:** Web Application UI, Tailwind CSS v4 Tokens & Liquid Crystal Glassmorphism

---

## 🔤 0. Authoritative Multilingual Google Fonts Suite (Zero Ad-Hoc Fonts)

TaleemOne ERP ke tamam clients par strictly **Google Fonts** use honge. Language aur hierarchy ke mutabiq fonts ka division strictly locked hai:

| Language | Role | Google Font Name | Variable / CSS Token | Usage Mandate |
|---|---|---|---|---|
| **English** | **Headings & Display** | **`Plus Jakarta Sans`** | `--font-jakarta` / `--font-display` | KPI numbers, major section titles, wordmark, banner headings (Modern luxury weight 700/800). |
| **English** | **Normal / Body** | **`Plus Jakarta Sans`** | `--font-sans` / `font-sans` | Dashboard tables, buttons, inputs, form labels, general UI text (Weights 400/500/600). |
| **Urdu** | **Headings** | **`Noto Nastaliq Urdu`** | `--font-nastaliq` / `font-nastaliq` | Institute dynamic name, madarsa certificates, official Urdu banners. |
| **Urdu** | **Normal / Body** | **`Alyamama`** | `--font-alyamama` / `font-alyamama` | Urdu data tables, form fields, clean readable body text & receipts. |
| **Hindi** | **Headings** | **`Rozha One`** | `--font-rozha` / `font-rozha` | Hindi section banners, prominent institutional titles (Ultra-luxury high-contrast serif). |
| **Hindi** | **Normal / Body** | **`Noto Sans Devanagari`** | `--font-devanagari` / `font-devanagari` | Hindi data tables, form labels, student profiles & reports. |

### 🛠️ Next.js 16 Implementation (`globals.css` via Official Google Fonts):
Tamam fonts centralized `globals.css` me directly CDN se load hote hain (Zero local font file bloat):

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Noto+Nastaliq+Urdu:wght@500;600;700&family=Rozha+One&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');

@theme inline {
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-jakarta: 'Plus Jakarta Sans', sans-serif;

  /* Multilingual Authority Fonts */
  --font-nastaliq: 'Noto Nastaliq Urdu', serif;
  --font-alyamama: 'Alyamama', sans-serif;
  --font-rozha: 'Rozha One', serif;
  --font-devanagari: 'Noto Sans Devanagari', sans-serif;
}
```




---

## 🎨 Universal Cross-Platform Design Philosophy (Optical Liquid Glassmorphism)

TaleemOne ERP ke teeno clients (**Web, Desktop, Mobile**) user ke provide kiye gaye reference image ke mutabiq **True Optical Liquid Glassmorphism (VisionOS / Hyper-Realistic Frosted Optical Glass)** follow karenge:
- **Optical Glass Refraction & Specular Rim:** Real kanch (lens) jaisi top light reflection (`inset 0 1.5px 2px rgba(255,255,255,0.65)`), inner depth, aur 24px backdrop blur.
- **Ambient Luminous Silk Canvas:** Deep Emerald/Teal silk flow aur Warm Amber neon flame ki luminous wave jo transparent glass ke peeche se behtareen refract ho kar dikhegi (Zero Blue!).
- **Capsule & Pill Glass Buttons:** "GET STARTED" aur "CLICK ME" style smooth glass capsule buttons (`rounded-full` or `rounded-[10px]`) with floating high-contrast white text.
- **Unified Master 10px Radius Law:** Har form card, input box, dialog aur container par strictly **`10px`** radius enforce hoga.
- **Strict Single Light Mode Mandate:** Web Application strictly **Single Light Mode Only** par chalegi (Dark mode toggle strictly prohibited hai). Daylight clean luminous silk canvas with optical frosted glass cards.
- **Strictly Zero Blue:** Blue color 100% prohibited hai. Brand primary warm amber gold (`#F59E0B` / `#D97706`) aur emerald jade (`#10B981`) se driven hai.

---

## 🌈 1. Master Cross-Platform Color Palette (Optical Glass Tokens)

| Token Name | Hex Code | Visual Material / Usage |
|---|:---:|---|
| **`brand-accent`** | `#D97706` | Warm Champagne Gold — luminous focus ring, dynamic madarsa title glow, VIP badges. |
| **`brand-amber`** | `#F59E0B` | Glowing Amber — primary action glow, interactive pill hover, active highlight. |
| **`status-success`** | `#10B981` | Emerald Green — Present status badge, fee paid in full stamp. |
| **`status-error`** | `#F43F5E` | Crimson Rose — Absent status, overdue fee balance, alert borders. |
| **`status-warning`** | `#F59E0B` | Warm Amber — Leave/Late status, partial balance, pending approval. |
| **`canvas-silk-teal`** | `#0D3B38` | Deep Emerald Silk — fluid backdrop left wave. |
| **`canvas-silk-dark`** | `#090D10` | Deep Midnight Silk Slate — fluid backdrop base. |
| **`canvas-amber-glow`** | `#78350F` | Warm Amber Ray — fluid backdrop right glow. |
| **`glass-fill`** | `rgba(255, 255, 255, 0.12)` | Translucent crystal glass fill (high clarity). |
| **`glass-border`** | `rgba(255, 255, 255, 0.35)` | Specular frosted glass rim border. |
| **`text-floating`** | `#FFFFFF` | Pure crisp floating white text with subtle shadow. |

---

## 💎 2. Web Tailwind CSS v4 & Optical Liquid Glass Tokens

Tailwind v4 ke `@theme` aur global utility layer mein ye tokens bind honge:

```css
@theme {
  --radius-master: 0.625rem; /* Strict 10px */
  --radius-pill: 9999px;     /* Capsule buttons */

  --color-brand-accent: #d97706;
  --color-brand-amber: #f59e0b;
  --color-status-success: #10b981;
  --color-status-error: #f43f5e;
  --color-status-warning: #f59e0b;

  /* Optical Liquid Glass Constants */
  --glass-lens-bg: rgba(255, 255, 255, 0.12);
  --glass-lens-bg-hover: rgba(255, 255, 255, 0.22);
  --glass-lens-border: rgba(255, 255, 255, 0.35);
  --glass-lens-border-hover: rgba(255, 255, 255, 0.60);
}
```

### 2.1 Reusable Liquid Glass Utility (`@/shared/ui/glass-card.tsx` / `glass-button.tsx`)
```tsx
// 1. Master Optical Liquid Glass Container (Cards & Modals)
<div className="
  rounded-[10px]
  bg-white/12
  backdrop-blur-2xl backdrop-saturate-180
  border border-white/35
  shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.65),inset_0_-1.5px_2px_0_rgba(0,0,0,0.25),0_12px_36px_0_rgba(0,0,0,0.35)]
  transition-all duration-200
  hover:bg-white/18 hover:border-white/50
">
  {children}
</div>

// 2. Optical Liquid Glass Capsule Button ("GET STARTED" / "CLICK ME" style)
<button className="
  h-12 px-8
  rounded-full
  bg-white/14 hover:bg-white/24 active:scale-[0.98]
  backdrop-blur-2xl backdrop-saturate-200
  border border-white/40 hover:border-white/70
  shadow-[inset_0_2px_3px_0_rgba(255,255,255,0.75),inset_0_-1.5px_2px_0_rgba(0,0,0,0.3),0_16px_40px_0_rgba(0,0,0,0.4)]
  text-white font-medium text-base tracking-wide
  text-shadow-[0_1px_3px_rgba(0,0,0,0.4)]
  transition-all duration-200
">
  {label}
</button>
```

### 2.2 Locked Authoritative Glass Card Standard (Universal Across All Future Screens)
**Status: FINALIZED & AUTHORITATIVE (User-Approved Master Template)**

TaleemOne ERP ke Login Screen par jo Split-Screen Liquid Frosted Glass Frame aur Optical Glass Card final hua hai, **wahi same Glass Card token architecture ERP ke tamaam aane wale screens, modal dialogs, dashboard widgets aur forms par universally use hoga**:

1. **Master Outer Split / Container Frame:**
   - **Border Radius:** Strict 10px (`--radius-master: 0.625rem`)
   - **Material:** `rgba(255, 255, 255, 0.18)` + `backdrop-filter: blur(32px) saturate(190%)`
   - **Border:** `1px solid rgba(255, 255, 255, 0.5)`
   - **Specular Rim Shadow:** `inset 0 1.5px 2px rgba(255, 255, 255, 0.8), inset 0 -1.5px 2px rgba(0, 0, 0, 0.05), 0 24px 64px rgba(18, 62, 53, 0.1)`

2. **Inner Content Card (`@/shared/ui/glass-card.tsx`):**
   - **Radius:** `rounded-[10px]`
   - **Fill:** `rgba(255, 255, 255, 0.18)`
   - **Blur:** `backdrop-filter: blur(28px) saturate(190%)`
   - **Border:** `1px solid rgba(255, 255, 255, 0.45)`
   - **Specular Highlight:** `inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.75)`
   - **Hover State:** `bg-white/24 border-white/65`

3. **Authoritative Header & Typography Pattern:**
   - **Card Title:** `h1` / `h2` in `Plus Jakarta Sans` (`font-jakarta` weight 800) in `#123e35`
   - **Status Badge:** Capsule pill (`rounded-full`) in Warm Amber or Emerald
   - **Subtitle:** Clean institutional copy in `Plus Jakarta Sans` (`font-sans` weight 400/500, muted ink)
   - **Zero Hardcoded Marketing:** Strictly functional, administrative copy only.

4. **Universal Future Re-use Mandate:**
   - Chahe Student Admission form ho, Fee collection modal ho, Ledger statement ho ya Settings view ho — container ke liye alag se koi naya ad-hoc CSS card nahi banega; strictly yahi Master Glass Card (`@/shared/ui/glass-card.tsx`) aur token hierarchy use hogi.

---

## 🔤 3. Typography & Language Mandate (Strictly English LTR UI Only)

Web application ki poori interface (Navigation, Sidebar, Buttons, Tables, Form Labels, Settings) strictly **English Language Only** aur **LTR (Left-to-Right)** me chalegi. Web me koi UI language switcher nahi hoga.

1. **Web UI Shell (Strictly English LTR):**
   * **Headings, Brand & KPI Stats:** Strictly `font-jakarta` (`Plus Jakarta Sans`) in crisp `#FFFFFF` / `#123E35`.
   * **Normal / Body Text:** Strictly `font-sans` (`Plus Jakarta Sans`) in pure white `#FFFFFF` / muted glass `#E2E8F0` / dark ink `#123E35`.
   * **Tabular Numbers Mandate:** Fee counters, payment vouchers, ledger amounts aur roll numbers par strictly `tabular-nums font-mono` use hoga taaki numbers upar-neeche perfectly straight align rahein aur page flicker na ho.
2. **Vernacular Data & Certificate Rendering:**
   * Dynamic Madarsa name / certificates: `font-nastaliq` (`Noto Nastaliq Urdu`).
   * Student Urdu name field / ledger: `font-alyamama` (`Alyamama` Naskh).
   * Student Hindi name field / certificates: `font-rozha` (`Rozha One`) / `font-devanagari` (`Noto Sans Devanagari`).

---

## 🔘 4. Master Interactive UI Kit Primitives

Har interactive component standard Master Kit se aayega (`@/shared/ui/*`):
- **Glass Buttons (`Button.tsx`):**
  - Height: `h-10` (40px) standard / `h-12` hero capsule
  - Radius: `rounded-[10px]` standard forms / `rounded-full` hero actions
  - Style: Liquid glass refraction rim with `inset 0 1.5px 2px rgba(255,255,255,0.75)`.
- **Inputs (`Input.tsx` / `CurrencyInput.tsx`):**
  - Height: `h-10`
  - Radius: `rounded-[10px]`
  - Fill: `bg-white/10 backdrop-blur-xl border border-white/25 text-white`
  - Focus Ring: `focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-[#F59E0B]` (Warm Champagne Gold glow, strictly ZERO browser blue outline).
- **Dialogs & Modals (`Dialog.tsx`):**
  - Radius: `rounded-[14px]` (dialog frame) aur internal forms `rounded-[10px]`.
  - Backdrop: `bg-black/60 backdrop-blur-xl`.
- **Badges & Status Chips (`Badge.tsx`):**
  - Radius: `rounded-full` (capsule pill).
  - Present: `bg-emerald-500/20 text-emerald-300 border border-emerald-400/40`
  - Absent: `bg-rose-500/20 text-rose-300 border border-rose-400/40`
  - Leave: `bg-amber-500/20 text-amber-300 border border-amber-400/40`

---

## 🎬 5. Smooth Micro-Interactions & 60fps Transitions
- **Zero Layout Shift (CLS = 0):** Data load hone tak skeleton loaders exact component size ke render honge.
- **Page & Modal Transitions:** Smooth 150ms ease-out opacity + slight translate transitions (`enter: duration-150 ease-out`).
- **Hover Micro-glow:** Buttons aur high-priority cards par soft luminous border reflection.
