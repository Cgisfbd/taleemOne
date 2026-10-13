# 📚 Courses & Syllabus Page Requirements & Component Layout

**Page Route:** `/courses` (`CoursesPage`)  
**Domain Module:** `src/modules/courses/`  
**Standard:** FAANG-Level Light Pastel Mesh Gradient & Dark Obsidian Glassmorphism  
**i18n Languages:** English (`en`), اردو (`ur`), العربية (`ar`), हिन्दी (`hi`) with logical RTL/LTR properties.

---

## 🏛️ 1. Executive Overview

Courses Page (`/courses`) Jamia Barkat-e-Haram ka official academic curriculum portal hai jahan talibat aur guardians sanad programs (Takhassus Fil Ifta, Dars-e-Nizami Alimah & Fazilah, Hifz-o-Tajweed) aur modern modular tracks ke bare me complete details, eligibility, duration, class modes (Live Online & On-Campus), aur semester-wise syllabus dekh sakte hain.

---

## 🎨 2. Design System & Aesthetics

- **Background Canvas:** 5-Point Radial Pastel Mesh Gradient (`#F6F1F5` base with Lavender `#B18CE5`, Champagne Gold `#F4BE77`, Rose `#F68EA2`, Teal `#75CFCB`, Center Glow `#FFFFFCF8`) in Light Mode, and Deep Celestial Obsidian Mesh in Dark Mode.
- **Visual Layers:** Light bloom center, soft ambient floating glowing orbs, frosted glass veil (`backdrop-blur-md`), and vignette edge shadow.
- **Card Aesthetics:** Translucent clean white surfaces with `#EDE6EC` subtle borders, glowing accent borders on hover, zero-elevation flat design with micro-interactions.
- **Typography:**
  - Display Titles: *Cinzel* / *Playfair Display*
  - Urdu Headings: *Jameel Noori Kasheeda*
  - Arabic Headings: *Alyamama*
  - Hindi Headings: *Mukta*
  - Body Text: *Inter*, *Jameel Noori Nastaleeq*, *Noto Sans Arabic*, *Noto Sans Devanagari*

---

## 🧩 3. Key Components & Sections Layout

### 3.1 🌟 Hero Showcase & Academic Overview
- Floating badge: *"✨ Authentic Islamic Scholarship & Digital Smart Classrooms"*.
- Hero title with gradient text accents and inspiring academic subtitle.
- Quick Stats Strip:
  - 🎓 **6+ Accredited Programs** (Sanad & Certificate Tracks)
  - 💻 **100% Smart Classrooms** (Interactive Boards & AV Labs)
  - 🌐 **Global Hybrid Access** (Live Stream & App Archives)
  - 🏆 **100% Scholarship** (Mujaddid Alf Sani Trust)

### 3.2 🔍 Interactive Course Search & Category Filters
- **Live Search Bar:** Real-time search across course names, descriptions, tags, and syllabus subjects with clear input button.
- **Category Filter Chips:**
  - 🔘 *All Programs* (`all`)
  - 🔘 *Takhassus Fil Ifta / Muftiya* (`ifta`)
  - 🔘 *Dars-e-Nizami / Alimah Track* (`alimah`)
  - 🔘 *Hifz & Tajweed-ul-Quran* (`hifz`)
  - 🔘 *Modular & Short Courses* (`short`)
  - 🔘 *100% Scholarship Programs* (`scholarship`)
- **Delivery Mode Selector:** All Modes, Global Online Live, Offline Campus, Flexible Modular.

### 3.3 🎓 Course Cards Grid & Detailed Features
Interactive glassmorphic cards displaying:
- Level badge (Post-Graduate, Graduate, Foundational, Certificate).
- Mode tag with glowing live indicator (Online + Offline, Full-Time, Modular).
- Duration & Credit details.
- 100% Scholarship eligibility badge.
- Course overview & key subject chips.
- Action buttons:
  - 📖 **"View Syllabus & Books"** → Opens comprehensive `CourseDetailModal`.
  - ✍️ **"Apply Online"** → Direct link to `/students/apply?course={id}`.
  - 📥 **"Download Brochure / Syllabus"** → 1-click printable PDF summary generator.

### 3.4 📖 Comprehensive Syllabus Inspector Modal (`CourseDetailModal`)
Full-screen frosted glass modal featuring:
- Detailed course prerequisites & eligibility.
- Semester / Year tabs with complete book list (e.g. *Bukhari Sharif*, *Hidayah*, *Fatawa Razawiyyah*, *Rasm al-Mufti*, *Al-Ashbah wan-Nazair*, *Tafsir Jalalayn*, *Quduri*, *Nur al-Idah*, *Nahw-e-Meer*, etc.).
- Practical training & research dissertation requirements.
- Career & scholarly outcomes (Muftiya, Islamic Researcher, Muallima, Qariah, Khateebah).
- 1-Click direct enrollment button.

### 3.5 📊 Curriculum & Features Comparison Table (`CurriculumComparison`)
Comparative side-by-side matrix comparing:
- Program Duration
- Eligibility & Prerequisites
- Delivery Modes (Live Stream / Campus)
- Interactive Smart Panel Integration
- 100% Scholarship Availability
- Awarded Sanad / Certificate & QR Verification

### 3.6 🏆 100% Scholarship Banner (`ScholarshipBanner`)
- Dedicated banner highlighting **Mujaddid Alf Sani Education & Welfare Trust 100% Free Sponsorship** for tuition, hostel, and food.
- Direct CTA to Entrance Test Registration (`/students/apply`) and Entrance Result (`/students/entrance-result`).

### 3.7 🗺️ 4-Step Seamless Admission Roadmap (`AdmissionRoadmap`)
1. **Online Entrance Registration:** Fill simple form on portal or mobile app.
2. **Download Admit Card:** Instant hall ticket generated with QR code.
3. **Scholarship Entrance Test:** Online / On-Campus assessment.
4. **Merit Confirmation & Onboarding:** Document verification and class allotment.

### 3.8 ❓ Interactive FAQ Accordion (`CourseFaqSection`)
Answering common guardian & student queries about hybrid class timings, purdah protocols, hostel safety, examination schedules, and international student admissions.

---

## 📱 4. Mobile Responsiveness & Accessibility

- Optimized for all screen sizes (320px to 4K displays).
- Touch-friendly filter pill scrolling.
- Modal supports `Escape` key close and background backdrop click.
- Full logical RTL support for Urdu and Arabic with zero CSS property collisions.
