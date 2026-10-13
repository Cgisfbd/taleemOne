# TaleemOne ERP (Backend Core API)
# Master Backend Engineering & Architecture Constitution

- **Project Name:** TaleemOne ERP (Backend Core API)
- **Engineering Authority:** Powered by Barkat Tech
- **Target Standard:** Enterprise-Grade Architecture & High-Scale SLA (100,000+ Students / 10,000+ Staff)
- **Status:** **MANDATORY — ENGINEERING & RELEASE CONSTITUTION**

---

## 1. Core Tech Stack & Infrastructure

Backend ko high-scale, zero-leakage, aur high-performance banane ke liye stack strictly locked hai:

| Layer | Technology | Role |
|---|---|---|
| **Runtime & Language** | **Java 21 LTS** | Virtual Threads (`spring.threads.virtual.enabled=true`), modern pattern matching, high memory efficiency. |
| **Framework** | **Spring Boot 3.3+** | Enterprise dependency injection, auto-configuration, production observability. |
| **Database** | **PostgreSQL 16+** | Native JSONB with GIN indexing, partial unique indexes, table partitioning, strict ACID. |
| **Persistence & ORM** | **Spring Data JPA + Hibernate 6.x** | Transaction management (`@Transactional`), dirty checking, HikariCP connection pooling. |
| **Query Engine** | **QueryDSL 5.x** | 100% type-safe compile-time queries. Zero raw SQL strings or string interpolation. |
| **Database Migrations** | **Flyway** | Versioned SQL scripts (`V1__...sql`). Safe, auditable, repeatable schema evolution. |
| **Cache & Sessions** | **Redis** | Distributed rate-limiting, session revocation, token blacklists, high-speed lookup cache. |

---

## 2. Modular Architecture (Clean Vertical Slices / DDD)

Backend kisi bhi haal mein tangled monolithic spaghetti nahi hoga. Poora system **Modular Clean Architecture & Vertical Slices** follow karega:

### 🧩 2.1 Package & Module Standard:
Har business domain ek self-contained module hoga jisme apna layer separation hoga:
```text
com.taleemone.backend
├── common /                     # Global shared infrastructure
│   ├── config/                  # Security, JPA, OpenAPI, CORS configuration
│   ├── security/                # JWT filters, UserPrincipal, auth handlers
│   ├── response/                # ApiResponseEnvelope<T>, GlobalExceptionHandler
│   └── audit/                   # BaseAuditableEntity (created_at, updated_at)
│
└── modules /                    # Independent Domain Modules
    ├── auth/                    # Login, Refresh Tokens, Password Hashing
    ├── institute/               # Institute Profile, Multilingual Identity, Settings
    ├── academic/                # Academic Sessions, Terms, Semesters
    ├── course_class/            # Courses, Classes, Sections, Subjects
    ├── student/                 # Student Admissions, Profiles, Documents
    ├── staff/                   # Staff Onboarding, Roles, Designations
    ├── attendance/              # High-volume Attendance Logs & Aggregations
    └── finance/                 # Fee Structures, Invoices, Vouchers, Transactions
```

### 🔒 2.2 Decoupling Laws:
1. **Zero Cross-Module Direct JPA Entity References:** Ek module doosre module ki JPA entity ko `@ManyToOne` ya `@JoinTable` se directly reference nahi karega. Relationships hamesha IDs (UUID) ke zariye honge.
2. **Contract-Driven Communication:** Modules aapas mein Service Interfaces ya Spring Events ke zariye communicate karenge.

---

## 3. Security, Authentication & Role Isolation

### 🔑 3.1 Dual-Token Authentication:
- **Short-Lived Access Token:** 15 minutes validity (stateless JWT).
- **Refresh Token:** HttpOnly, Secure, SameSite=Strict cookie ke zariye deliver hoga. Database mein sirf **SHA-256 hash** store hoga.
- **Refresh Token Rotation (RTR):** Har refresh par naya token issue hoga; used token dobara aane par session revoke hoga.
- **Password Hashing:** Passwords strictly **Argon2id** ya **BCrypt (cost 12)** se hash honge.

### 👥 3.2 Internal Roles & Permissions:
- **`SUPER_ADMIN`:** Pure system mein strictly **1 Super Admin** account rahega (PostgreSQL partial unique index: `CREATE UNIQUE INDEX uq_super_admin ON users(role) WHERE role = 'SUPER_ADMIN'`). Super Admin Admin aur Staff ke accounts banata hai aur JSONB permissions (`{"Students": "edit", "Attendance": "view"}`) assign karta hai.
- **`ADMIN`:** Operational / Academic managers. Record `staff` table mein banega, login `users` table mein link hoga.
- **`STAFF`:** Teachers, Clerks, Accountants. Operational data `staff` table mein, login `users` table mein, permissions JSONB ke zariye govern hongi.

### 🎓 3.3 Dedicated Student & Parent Authentication (`student_auth` Table):
- **Zero Student in `users` Table:** Students aur parents ka data administrative `users` table mein **hargiz store nahi hoga**.
- **`student_auth` Table:** Student portal / mobile access ke liye login credentials dedicated `student_auth` table mein manage honge (Enrollment No + Hash).
- **Zero IDOR:** `userId` / `studentId` hamesha server-side JWT claims se extract hoga—request body ya URL parameter se kabhi trust nahi hoga.

---

## 4. Zero-Bug Data Integrity & Runtime Guardrails

Backend mein runtime bugs aur security leaks rokne ke liye yeh strict code rules hain:

1. **Anti-Overposting (Java 21 Records):**
   - Controllers mein database entities directly accept karna ya return karna **STRICTLY BANNED** hai.
   - Har endpoint par immutable Java 21 `record` DTOs use honge with Jakarta Validation (`@Valid`, `@NotBlank`, `@Size`, `@Email`).
2. **Zero Credential Leaks:**
   - Password hashes, salt, aur refresh token hashes API response mein kabhi nahi jayenge (DTO separation + `@JsonIgnore` on entities).
3. **Zero Raw SQL Strings:**
   - Queries strictly Spring Data JPA ya QueryDSL parameterized builder se chalengi (SQL injection 100% eliminated).
4. **ACID Transactions:**
   - Multi-table database operations strictly `@Transactional(rollbackFor = Exception.class)` ke under execute honge.
5. **Optimistic Locking (Finance & Seats):**
   - Student fee balance, payment processing, aur class seat allocation tables par `@Version private Long version;` mandatory hai taaki concurrent requests duplicate payments ya double allocations na karein.

---

## 5. Timezone, Date Format & Currency Bootstrapping Constitution

Timezone, Date Format, aur Currency ke liye single source of truth aur serving law:

### 🔄 5.1 Bootstrapping Flow:
1. **Initial `.env` Seed:**
   - Backend ke `.env` file mein system standards define honge:
     ```env
     APP_TIMEZONE=Asia/Kolkata
     APP_DATE_FORMAT=DD/MM/YYYY
     APP_CURRENCY_CODE=INR
     APP_CURRENCY_SYMBOL=₹
     ```
2. **Startup Idempotent Hydration:**
   - Spring Boot startup par (`ApplicationRunner`):
     - **If table is EMPTY:** `.env` ki values ko database table (`system_standards` / `institute_profile`) mein **INSERT** karega.
     - **If table HAS DATA:** Database ko `.env` se overwrite **NAHI KAREGA** (Admin dwara dashboard par kiye gaye changes restart par protect rahenge).
3. **Runtime Serving via SQL Table:**
   - Aage ka saara kaam (API date formatting, timezone conversions, fee vouchers, currency symbols, aur frontend delivery) **isi SQL table se query aur serve hoga** (L1 Cached in memory).

### 📅 5.2 Zero Date-Shift Law:
- **Calendar Dates (`LocalDate` / Postgres `DATE`):** Student DOB, Daily Attendance Date, Fee Due Date, Academic Session Dates bina timezone ke strictly pure date store honge (`YYYY-MM-DD`). Isse midnight par date 1 din aage/peeche flip hone ka bug 100% khatam ho jata hai.
- **Audit Timestamps (`Instant` / Postgres `TIMESTAMPTZ`):** Exact transactions, biometric punches, aur audit logs standard UTC mein persist honge aur target timezone mein convert hokar display honge.

---

## 6. High-Scale SLA Protocol (100,000+ Students)

### 📈 6.1 Attendance Table Partitioning:
- **Monthly Range Partitions:** `attendance` table ko PostgreSQL monthly range partitions (`attendance_2026_09`, `attendance_2026_10`) mein divide kiya jayega.
- **Composite Primary Key:** `PRIMARY KEY (id, date)` aur unique constraint `UNIQUE (student_id, date)` mandatory hai (JPA `@IdClass(AttendanceId.class)`).
- **The Partition Pruning Law:**
  - Har attendance query ke `WHERE` clause mein `date` ya date range (`BETWEEN`) ka hona **strictly mandatory** hai.
  - Bina date filter ke unbounded queries (`SELECT * FROM attendance WHERE student_id = ?`) code-level par **STRICTLY PROHIBITED** hain (taaki Postgres saare 50+ partitions scan na kare).

### ⚡ 6.2 Performance SLAs:
- **Query Execution:** Single transactional query execution time **< 50ms** (`EXPLAIN ANALYZE` verified). Full table scans unindexed tables par banned hain.
- **Statement Timeout:** Database max statement timeout **5,000ms (5 seconds)**.
- **Connection Pool:** HikariCP with connection leak threshold **2,000ms**.

---

## 7. Unified API Response Envelope & Error Architecture

Frontend web aur mobile clients ke saath seamless integration ke liye har API response ek standard envelope follow karega:

### 📦 7.1 Success Response Envelope:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "meta": {
    "timestamp": "2026-10-10T00:30:00Z",
    "timezone": "Asia/Kolkata"
  }
}
```

### 🚨 7.2 Standard Error Response Envelope:
Global Exception Handler (`@RestControllerAdvice`) har error ko normalize karega:
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation failed: Phone number is invalid",
  "errors": [
    { "field": "phone", "message": "Phone number must be 10 digits" }
  ],
  "meta": {
    "timestamp": "2026-10-10T00:30:00Z"
  }
}
```

---

## 8. Automated Data Backup & Disaster Recovery (DR)

1. **Daily Encrypted Backups:** Har 24 ghante mein UTC midnight par automated `pg_dump` snapshot + AES-256 pre-transmission encryption.
2. **Offsite WORM Object Storage:** Encrypted backups dedicated offsite storage (S3 / R2) par push honge with Object-Lock (anti-ransomware). Zero VPS-only storage.
3. **DR SLAs:** **RPO < 15 minutes**, **RTO < 30 minutes**.
4. **Tested Restore Drill:** Weekly automated restore test on a scratch database to verify table counts, rows, and foreign keys.
