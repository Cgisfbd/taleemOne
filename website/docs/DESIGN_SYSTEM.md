# 🎨 Design System: Light Pastel Mesh Gradient & Glassmorphism

**Standard Name:** Light Pastel Mesh Gradient Design System  
**Organization:** Jamia Barkat-e-Haram Girls Islamic Education Center  
**Design Level:** FAANG / Ultra-Premium Modern Glassmorphism  
**Themes:** Dual Mode (Light Pastel Mesh & Deep Obsidian Mesh)  

---

## 🌟 1. Design Philosophy & Vision

Is portal ka design system **"Light Pastel Mesh Gradient"** philosophy par based hai. Ye design soft, elegant aur visually pleasing vibes provide karta hai, jo ek deeni aur modern smart education center ke liye calm, respectful aur high-tech look create karta hai.

---

## 🌈 2. 5-Point Radial Mesh Gradient (Background Canvas)

Website ka primary visual signature ek **5-Point Radial Mesh Gradient** hai jo background canvas par render hota hai:

### 📍 2.1 Mesh Gradient Coordinates & Colors

```css
/* Base Canvas Color */
--bg-base: #F6F1F5; /* Soft Light Pastel Base */

/* 5 Radial Mesh Gradient Points */
--mesh-top-left:     #B18CE5; /* 💜 Lavender (ऊपर बाएँ) */
--mesh-top-right:    #F4BE77; /* 💛 Champagne / Gold (ऊपर दाएँ) */
--mesh-bottom-left:  #F68EA2; /* 💖 Rose / Pink (नीचे बाएँ) */
--mesh-bottom-right: #75CFCB; /* 🩵 Aqua / Teal (नीचे दाएँ) */
--mesh-center:       #FFFFFCF8; /* 🤍 Ivory Warm White (बीच में) */
```

### 🖼️ 2.2 Complete CSS Background Recipe

```css
.bg-pastel-mesh {
  background-color: #F6F1F5;
  background-image: 
    radial-gradient(at 0% 0%, #B18CE5 0px, transparent 50%),      /* Top-Left: Lavender */
    radial-gradient(at 100% 0%, #F4BE77 0px, transparent 50%),    /* Top-Right: Champagne */
    radial-gradient(at 0% 100%, #F68EA2 0px, transparent 50%),    /* Bottom-Left: Rose */
    radial-gradient(at 100% 100%, #75CFCB 0px, transparent 50%),  /* Bottom-Right: Aqua */
    radial-gradient(at 50% 50%, #FFFFFCF8 0px, transparent 65%);  /* Center: Ivory Warm White */
  background-attachment: fixed;
  background-size: cover;
}
```

---

## 🔮 3. Visual Layer Effects (Glassmorphism & Lighting Stack)

Background ke upar 4 distinct visual effect layers kaam karti hain:

1. 🌟 **Light Bloom (Center Glowing Light):**
   - Center me ek soft white glowing radial circle jo depth create karta hai:
   - `radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)`
2. 🫧 **Glass Orbs (Floating Ambient Orbs):**
   - Soft-blur waale floating gradient circles (Lavender Orb & Aqua Orb) jo dynamic life dete hain.
   - `filter: blur(80px); opacity: 0.45;`
3. 🪟 **Glass Veil (Frosted Glass Overlay):**
   - Linear translucent gradient overlay with `backdrop-filter: blur(16px)`.
   - `background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 100%);`
4. 🎞️ **Vignette Layer (Edge Shadow):**
   - Screen edges par subtle deep shadow for focus:
   - `box-shadow: inset 0 0 120px rgba(76, 45, 67, 0.035);`

---

## 🎨 4. Complete Color Palette (रंग प्रणाली)

### ☀️ 4.1 Light Mode Color Tokens

| Token Variable | Color Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `--color-primary` | **Lavender** | `#B18CE5` | Primary Buttons, Active Tabs, Main Highlights, Focus Rings |
| `--color-secondary` | **Rose / Pink** | `#F68EA2` | Secondary Accents, Special Badges, Sale/Offer Badges |
| `--color-tertiary` | **Aqua / Teal** | `#75CFCB` | Indicators, Success States, Verified Badges, Tech Icons |
| `--color-warm` | **Champagne / Gold** | `#F4BE77` | Highlights, Notices, Warnings, Stars/Awards |
| `--color-bg-base` | **Light Soft Base** | `#F6F1F5` | Base background canvas under mesh |
| `--color-surface` | **Clean White** | `#FFFFFF` | Cards, Dialogs, Sheets, Popovers |
| `--color-border-card` | **Soft Card Border** | `#EDE6EC` | Subtle card borders (Zero harsh lines) |
| `--color-input-bg` | **Soft Input Field** | `#FCFAFC` | Form input fields, textareas |
| `--color-text-primary` | **Deep Plum Black** | `#2D1F33` | Headings (H1-H6) & Main Content Text |
| `--color-text-secondary` | **Muted Purple Gray** | `#6B5A73` | Subtitles, Body Paragraphs, Captions |
| `--color-text-muted` | **Light Lavender Gray** | `#A394AB` | Placeholders, Timestamps, Muted Footer Text |

---

### 🌙 4.2 Dark Mode Counterpart (Deep Celestial Midnight Luxe)

Dark mode me mesh gradient aur surfaces ko deep midnight slate & obsidian tones me adapt kiya gaya hai:

| Token Variable | Dark Color Name | Hex / RGBA Code | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `--dark-bg-base` | **Deep Celestial Midnight** | `#080C14` | Dark Base Canvas |
| `--dark-mesh-tl` | **Deep Royal Indigo** | `#1E1B4B` | Top-Left Radial Mesh |
| `--dark-mesh-tr` | **Subtle Warm Amber** | `#261B11` | Top-Right Radial Mesh |
| `--dark-mesh-bl` | **Velvet Rose Deep** | `#2A0F24` | Bottom-Left Radial Mesh |
| `--dark-mesh-br` | **Deep Teal Obsidian** | `#042429` | Bottom-Right Radial Mesh |
| `--dark-mesh-center` | **Dark Midnight Slate** | `#0D121F` | Center Mesh Glow |
| `--dark-surface` | **Crisp Smoky Glass** | `rgba(15, 23, 42, 0.75)` | Cards, Dialogs & Navbars |
| `--dark-border` | **Subtle Specular Border** | `rgba(255, 255, 255, 0.08)` | Zero-harsh crisp borders |
| `--dark-text-primary` | **Pure Cloud White** | `#F8FAFC` | Main Content Headings |
| `--dark-text-secondary` | **Slate Blue Gray** | `#94A3B8` | Body Copy & Subtitles |
| `--dark-text-muted` | **Muted Slate** | `#64748B` | Captions & Footers |
| `--dark-mesh-br` | **Dark Deep Teal** | `#1C4749` | Bottom-Right Radial Mesh |
| `--dark-mesh-center` | **Deep Amethyst Core** | `#22162B` | Center Radial Glow |
| `--dark-surface` | **Dark Glass Card** | `rgba(34, 22, 43, 0.75)` | Dark Cards with `backdrop-blur(16px)` |
| `--dark-border-card` | **Glowing Border** | `rgba(177, 140, 229, 0.15)` | Subtle glowing lavender border |
| `--dark-text-primary` | **Soft Pearl White** | `#FAF6FC` | Headings & High Contrast Text |
| `--dark-text-secondary`| **Soft Lavender Gray** | `#C8BDCF` | Subtitles & Readable Paragraphs |
| `--dark-text-muted` | **Ash Lavender** | `#8E7E96` | Placeholders, Footers |

---

## ✍️ 5. Typography Hierarchy & Font Matrix (Local & Google Fonts)

Portal me **Local TrueType Fonts (`public/fonts/`)** aur **Google Fonts** ka ek hybrid typography architecture use kiya gaya hai:

### 📊 5.1 Complete Typography Matrix

| Language / Role | Font Family | Source / Asset Path | Target Usage | Aesthetic Feel |
| :--- | :--- | :--- | :--- | :--- |
| **Urdu Titles / Headings** | **Jameel Noori Kasheeda** | 📁 Local: [`public/fonts/urdu/jameel-noori-kasheeda.ttf`](../public/fonts/urdu/jameel-noori-kasheeda.ttf) | Urdu Big Display Titles, Banners, Hero Headlines | Royal, Stretched Elegant Kasheeda Calligraphy |
| **Urdu Body / Normal** | **Jameel Noori Nastaleeq** | 📁 Local: [`public/fonts/urdu/jameel-noori-nastaleeq.ttf`](../public/fonts/urdu/jameel-noori-nastaleeq.ttf) | Urdu Paragraphs, Descriptions, Notices, Body Copy | Classic, Highly Legible Traditional Nastaleeq |
| **Arabic (`ar`)** | **Alyamama** | 📁 Local: [`public/fonts/arabic/`](../public/fonts/arabic/) (`Alyamama-*.ttf`) | Arabic Content, Ayat, Hadith, Duas, Titles & UI | Modern Elegant Naskh Arabic Typography |
| **Hindi (`hi`)** | **Mukta** | 📁 Local: [`public/fonts/hindi/`](../public/fonts/hindi/) (`Mukta-*.ttf`) | Hindi Headings, Paragraphs, Forms, Buttons | Clean, Contemporary, Standard Devanagari |
| **English Display Headings** | **Cinzel** | 🌐 Google Font (`Cinzel:wght@700;800`) | Big Royal Display Headings, Main Hero Titles | Royal, Prestigious, Imperial Heritage |
| **English Section Headers** | **Playfair Display** | 🌐 Google Font (`Playfair+Display:ital,wght@0,600;0,700;1,400`) | Section Headers, AppBar Titles, Modal Titles | Sophisticated, Editorial High-Class Serif |
| **Body & UI Elements** | **Inter** | 🌐 Google Font (`Inter:wght@400;500;600;700`) | Body Text, Buttons, Form Inputs, Badges, Labels | Clean, Crisp, Ultra-Readable Sans-serif |

---

### 🔤 5.2 Local Fonts CSS `@font-face` Definitions

```css
/* ==========================================
   1. URDU LOCAL FONTS
   ========================================== */
@font-face {
  font-family: 'Jameel Noori Kasheeda';
  src: url('/fonts/urdu/jameel-noori-kasheeda.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Jameel Noori Nastaleeq';
  src: url('/fonts/urdu/jameel-noori-nastaleeq.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* ==========================================
   2. ARABIC LOCAL FONTS (Alyamama Family)
   ========================================== */
@font-face {
  font-family: 'Alyamama';
  src: url('/fonts/arabic/Alyamama-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Alyamama';
  src: url('/fonts/arabic/Alyamama-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Alyamama';
  src: url('/fonts/arabic/Alyamama-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Alyamama';
  src: url('/fonts/arabic/Alyamama-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* ==========================================
   3. HINDI LOCAL FONTS (Mukta Family)
   ========================================== */
@font-face {
  font-family: 'Mukta';
  src: url('/fonts/hindi/Mukta-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Mukta';
  src: url('/fonts/hindi/Mukta-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Mukta';
  src: url('/fonts/hindi/Mukta-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Mukta';
  src: url('/fonts/hindi/Mukta-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

---

### 🌐 5.3 Next.js App Router Integration Example (`src/app/layout.tsx`)

```typescript
import localFont from 'next/font/local';
import { Cinzel, Playfair_Display, Inter } from 'next/font/google';

// Urdu Local Fonts
export const jameelKasheeda = localFont({
  src: '../../public/fonts/urdu/jameel-noori-kasheeda.ttf',
  variable: '--font-urdu-title',
  display: 'swap',
});

export const jameelNastaleeq = localFont({
  src: '../../public/fonts/urdu/jameel-noori-nastaleeq.ttf',
  variable: '--font-urdu-body',
  display: 'swap',
});

// Arabic Local Font
export const alyamama = localFont({
  src: [
    { path: '../../public/fonts/arabic/Alyamama-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/arabic/Alyamama-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/arabic/Alyamama-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/arabic/Alyamama-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-arabic',
  display: 'swap',
});

// Hindi Local Font
export const mukta = localFont({
  src: [
    { path: '../../public/fonts/hindi/Mukta-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/hindi/Mukta-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/hindi/Mukta-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/hindi/Mukta-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-hindi',
  display: 'swap',
});

// Google Fonts
export const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
```

---

## 🧩 6. Component Themes (AppTheme Specifications)

### 🧭 6.1 AppBar / Navigation Bar
- **Background:** Completely transparent (`bg-transparent`) or ultra-light glass backdrop on scroll (`rgba(255, 255, 255, 0.7)` with `backdrop-blur-md`).
- **Elevation:** 0 (Zero drop shadow).
- **Title Font:** *Playfair Display* (Serif).
- **Border:** Subtle border bottom `rgba(237, 230, 236, 0.6)`.

### 🔘 6.2 Buttons (Primary & Secondary)
- **Primary Button:**
  - Background: Lavender (`#B18CE5`)
  - Text Color: Clean White (`#FFFFFF`)
  - Border Radius: `rounded-xl` (12px) ya `rounded-full`
  - Hover: Micro scale `1.03` + Lavender glow `rgba(177, 140, 229, 0.4)`
  - Active: Scale `0.98`
- **Secondary Button:**
  - Background: Frosted White `rgba(255, 255, 255, 0.8)` / Glass
  - Border: 1px solid `#EDE6EC`
  - Text: Deep Plum Black (`#2D1F33`)
  - Hover: Lavender tint background (`rgba(177, 140, 229, 0.08)`)

### 🃏 6.3 Cards & Dialogs
- **Background:** Clean White (`#FFFFFF`) / Semi-translucent Glass (`rgba(255, 255, 255, 0.85)`).
- **Border:** `1px solid #EDE6EC` (Subtle soft border).
- **Elevation:** Zero hard drop shadow (`shadow-none` ya `shadow-sm` ultra-soft).
- **Border Radius:** `rounded-2xl` (16px) or `rounded-3xl` (24px).
- **Backdrop Blur:** `backdrop-blur-xl` (16px).

### 📝 6.4 Input Fields & Form Controls
- **Background:** Soft light background (`#FCFAFC`).
- **Border:** `1px solid #EDE6EC`.
- **Focus State:** Border transitions to Lavender (`#B18CE5`) with subtle ring `rgba(177, 140, 229, 0.2)`.
- **Placeholder:** Light Lavender Gray (`#A394AB`).
- **Text Color:** Deep Plum Black (`#2D1F33`).
- **Border Radius:** `rounded-xl` (12px).

---

## 🖼️ 7. Public Assets Directory Mapping

| Asset Type | File Path | Usage |
| :--- | :--- | :--- |
| **Logo** | [`public/images/logo.png`](../public/images/logo.png) | Header, Footer, Brand Watermark |
| **Slide 1** | [`public/images/slides/slide1.jpg`](../public/images/slides/slide1.jpg) | Hero Banner Slider (Smart Classrooms) |
| **Slide 2** | [`public/images/slides/slide2.jpg`](../public/images/slides/slide2.jpg) | Hero Banner Slider (Campus Infrastructure) |
| **Slide 3** | [`public/images/slides/slide3.jpg`](../public/images/slides/slide3.jpg) | Hero Banner Slider (Academic Assembly) |
| **Slide 4** | [`public/images/slides/slide4.jpg`](../public/images/slides/slide4.jpg) | Hero Banner Slider (Computer Lab & Taleem) |
| **Slide 5** | [`public/images/slides/slide5.jpg`](../public/images/slides/slide5.jpg) | Hero Banner Slider (Activities & Tarbiyah) |
| **Urdu Titles Font** | [`public/fonts/urdu/jameel-noori-kasheeda.ttf`](../public/fonts/urdu/jameel-noori-kasheeda.ttf) | Urdu Big Titles & Headlines |
| **Urdu Body Font** | [`public/fonts/urdu/jameel-noori-nastaleeq.ttf`](../public/fonts/urdu/jameel-noori-nastaleeq.ttf) | Urdu Body Text & Paragraphs |
| **Arabic Local Fonts** | [`public/fonts/arabic/`](../public/fonts/arabic/) (`Alyamama-*.ttf`) | Arabic Titles, Ayat, Duas & Body Text |
| **Hindi Local Fonts** | [`public/fonts/hindi/`](../public/fonts/hindi/) (`Mukta-*.ttf`) | Hindi Headings, Body Text & Forms |

---

## 💻 8. Tailwind CSS Config Snippet (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          base: "#F6F1F5",
          lavender: "#B18CE5",
          rose: "#F68EA2",
          aqua: "#75CFCB",
          gold: "#F4BE77",
          ivory: "#FFFFFCF8",
          card: "#FFFFFF",
          cardBorder: "#EDE6EC",
          inputBg: "#FCFAFC",
        },
        plum: {
          900: "#2D1F33", // Primary Text
          700: "#6B5A73", // Secondary Text
          400: "#A394AB", // Muted Text
        },
        obsidian: {
          900: "#18101E", // Dark Base
          800: "#22162B", // Dark Core
          700: "#342042", // Dark Card
        }
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        playfair: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        urduTitle: ["'Jameel Noori Kasheeda'", "'Noto Nastaliq Urdu'", "serif"],
        urduBody: ["'Jameel Noori Nastaleeq'", "'Noto Nastaliq Urdu'", "serif"],
        arabic: ["'Alyamama'", "'Noto Sans Arabic'", "'Amiri'", "serif"],
        hindi: ["'Mukta'", "'Noto Sans Devanagari'", "sans-serif"],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
```
