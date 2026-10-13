# 🖼️ Gallery Page Requirements
# 🖼️ Gallery Page Requirements & Component Layout

Gallery Page (`/gallery` ya `gallery.html`) ka **Actual Core Content & Interactive Layout Breakdown**:

---

### 1. 🏷️ Gallery Title & Decorative Header
- **Main Heading:** **"Gallery"** (Urdu me **"گیلری"**).
- **Styling & Accents:**
  - Center aligned `Playfair Display` heading.
  - Decorative star symbols (`✦`) on both sides.
  - Bottom signature gradient accent line (`.section-title-line`).

---

### 2. 🎛️ Interactive Gallery Toolbar (`.gallery-toolbar`)
Toolbar grid container ke top par floating glassmorphism card me positioned hai:

- **A. Category Filter Chips (`.chip-row`):**
  - Interactive filter pills/buttons (*All*, *Campus*, *Events*, *Hostel*, *Classroom*, etc.).
  - Active chip par gradient background (`var(--gradient-primary)`) aur glow highlight hota hai.
  - Click karne par photo grid instant filter hoti hai.
- **B. Live Search Input Box (`.search-box`):**
  - Search icon (`fa-magnifying-glass`) ke saath rounded search bar.
  - Real-time live filtering text input (*"Search photos..."* / *"تصاویر تلاش کریں..."*).
  - Search input title, category type, ya year/date ke basis par instantly filter karti hai.

---

### 3. 🖼️ Responsive Photo Grid (`.gallery-grid`)
Photos ko display karne ke liye responsive dynamic grid:

- **Grid Responsive Columns:**
  - **Mobile (`<768px`):** 2 Columns layout.
  - **Tablet (`>=768px`):** 3 Columns layout.
  - **Desktop (`>=1100px`):** 4 Columns layout.
- **Photo Card Anatomy (`.g-card`):**
  - **Thumbnail Image (`.g-thumb`):** 4:3 aspect ratio photo with lazy loading.
  - **Hover & Focus Effects:** Card par hover ya keyboard focus karne par card upar shift hota hai (`translateY(-8px)`) with golden border glow.
  - **Metadata Container (`.g-meta`):**
    - **Photo Title (`.g-title`):** Photo ka name/caption (e.g. *"Campus View 1"*).
    - **Category Tag Badge (`.g-tag`):** Gold pill badge with category icon.
    - **Date Badge:** Calendar icon ke saath photo year/date (e.g. *"2025"*).
- **Empty State Notification:**
  - Agar search query ya category filter se koi match nahi milta, to center aligned notification glass card display hota hai (*"No photos found."* / *"کوئی تصویر نہیں ملی۔"*).

---

### 4. 🔎 Full-Screen Lightbox Viewer & Downloader Modal (`.lightbox`)
Card par click karne par active hone wala high-resolution popup:

- **Backdrop Overlay:** 95% dark opacity backdrop with strong blur effect (`backdrop-filter: blur(10px)`).
- **High-Res Photo Display (`.lightbox-content`):** Centered image preview with smooth shadow.
- **Top-Right Close Button (`.lightbox-close`):** Circular close (`×`) button with 90° rotation animation on hover and `Escape` key close support.
- **Bottom Download Button (`.download-btn`):**
  - Floating pill button with download icon.
  - Photo ko direct device me save karne ke liye direct `download` anchor link.
- **Keyboard Navigation & Accessibility:** `Tab` key focus trap (Close ↔ Download button) aur `Escape` key shortcut.
