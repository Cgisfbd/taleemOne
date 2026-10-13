# 🛡️ TaleemOne ERP — Backend Architecture, Protocol & Security Constitution

- **Project Name:** TaleemOne ERP (Backend Core API)
- **Engineering Authority:** Powered by Barkat Tech
- **Target Standard:** FAANG+ Enterprise-Grade Architecture & High-Scale SLA (100,000+ Students / 10,000+ Staff)
- **Domain Flexibility:** Natively adaptable for **Madarsa, School & University** with 100% dynamic nomenclature.

---

## 🎯 1. Core Architecture & Dedicated VPS Model

### 1.1 Single-Institute Dedicated VPS Architecture & White-Labeling
- **Dedicated Single-Tenant Instance:** Har client (University / School / Madarsa) ko apna alag standalone dedicated VPS aur isolated PostgreSQL database milta hai. Database tables mein koi `tenant_id` column ka overhead ya data leak risk nahi hoga.
- **Zero-Code Touch Client Onboarding via `.env`:** Client ki identity (`INSTITUTE_NAME`, `INSTITUTE_TAGLINE`, logo URL, contact details) backend code me kahin hardcode nahi hogi — simply VPS deployment ke waqt `.env` se load hogi.
- **Prominent Company Branding (Barkat Tech):**
  - **Mobile Apps:** App launch hone par splash screen par **Barkat Tech** ka official brand intro/logo aayega.
  - **Web Portal:** Login screen aur dashboard sidebar/footer par **"Powered by Barkat Tech"** ka verified badge aur link rahega.
  - **Official Printouts & PDFs:** Marksheets, ID cards aur fee receipts ke footer par technology partner attribution lazmi aayega.

### 1.2 Connected Ecosystem (4 Primary Clients)
Centralized backend in 4 clients ko power karta hai:
1. **Main ERP Web Application:**
   - Unified web portal for strictly 3 institutional roles: `SUPER_ADMIN`, `ADMIN`, aur `STAFF`.
   - Har backend action aur endpoint par role aur granular JSONB permissions verify hona lazmi hai taaki zero unauthorized access ho.
2. **Staff Mobile App (Flutter):**
   - Staff/Teachers ke liye native mobile client — isme wahi saare features accessible honge jo Web Portal me hain, unke assigned role permissions ke mutabiq.
3. **Student Mobile App (Flutter):**
   - Students aur parents ke liye limited read-only access (attendance record, marksheet, fee ledger, notification updates). Zero administrative access.
4. **Public Website:**
   - Public-facing portal jisme admissions inquiry/form, notices, entrance exam results, class-wise syllabus, aur **Student Result Portal** shamil hoga (result dekhne ke liye Roll No + DOB verification mandatory hai).

### 1.3 Deployment Infrastructure (Docker)
- **Containerized Delivery:** Application ko strictly **Docker** container mein pack kiya jayega taaki VPS (Server) par deployment asaan, predictable aur environment-independent ho.

---

## 🏛️ 2. Domain-Driven Design (DDD) & Clean Architecture (Microservice-Ready Slicing)

Backend kisi bhi haal mein tangled monolithic ya mixed nahi hoga. Poora system **Modular Clean Architecture & Microservice-Ready Vertical Slicing** follow karega:
- Har domain module ek independent microservice ki tarah self-contained hoga (apna Controller, Service, Repository, DTOs, aur DB Schemas khud manage karega).

```
backend/src/
├── config/               # Validated ConfigService, environment schemas
├── database/             # Drizzle ORM provider, database connections, PgBouncer pool
├── common/               # Global guards, filters, interceptors, pipes, decorators
└── modules/              # 100% Self-Contained Domain Modules
    └── [domain-name]/    # e.g., student, staff, fee, attendance, exam
        ├── controllers/  # HTTP routing, Swagger docs, DTO passing (Zero business logic)
        ├── services/     # Pure business logic (Zero Drizzle DB queries, calls repository)
        ├── repositories/ # 100% Drizzle ORM queries, DB transactions
        ├── dtos/         # Request & Response DTOs with Zod / class-validator
        └── schemas/      # Drizzle database tables & relation definitions
```

### The 3-Layer Law:
1. **Controller Layer:** Sirf incoming HTTP request receive karega, DTO validate karega, aur response map karega. **Zero business logic, zero DB queries.**
2. **Service Layer:** Business rules, atomic transactions (`db.transaction(async (tx) => { ... })`), aur orchestration execute karega. **Zero raw SQL queries.**
3. **Repository Layer:** Database (Drizzle ORM) se saari baat sirf Repository karegi. Repositories transaction-aware rahengi (`repo.withTx(tx)`).
4. **No Global Schema Dumping:** Saare database schemas apne respective domain folders (`modules/<domain>/schemas/`) ke andar rahenge.
5. **Cross-Module Drizzle Relations (Zero Circular Imports):** Schemas alag-alag domain folders (`modules/<domain>/schemas/`) me rahenge. Circular dependencies se bachne ke liye cross-module relations ko strictly Drizzle ki `relations()` API ke lazy callbacks ke zariye structure karna mandatory hai.

### 2.1 API Versioning Strategy (`/api/v1`)
- **URI Path Versioning:** Saare API endpoints strictly URI versioning follow karenge (e.g., `/api/v1/students`).
- **Zero Breaking Changes for Mobile:** Agar koi breaking change aati hai, toh purana `v1` endpoint zinda rahega aur naya feature `v2` par launch hoga. Purana `v1` `Deprecation: true` aur `Sunset: <Date>` headers ke saath tab tak chalega jab tak Play Store/App Store par Flutter apps update na ho jayein.

### 2.2 Standard Response & Error Contracts (Global Envelopes)
- **Standard Success Envelope:**
  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Operation completed successfully",
    "data": { ... },
    "meta": { "timestamp": "2026-09-10T00:15:00.000Z", "traceId": "..." }
  }
  ```
- **Standard Error Envelope (`GlobalExceptionFilter`):**
  ```json
  {
    "statusCode": 404,
    "error": "Not Found",
    "message": "Student record not found",
    "timestamp": "2026-09-10T00:15:00.000Z",
    "path": "/api/v1/students/uuid"
  }
  ```


---

## 🛡️ 3. 9-Layer Military-Grade Security Architecture

Educational ERP mein high-privacy student PII (Aadhaar, Photos, Addresses, Family Income) aur financial data hota hai. Isliye 9 security layers strictly active rahengi:

### Layer 1: In-Transit Hardening & Network Shield
- **Helmet.js Security Headers:** Strict CSP, HSTS (`max-age=31536000; includeSubDomains`), aur `X-Content-Type-Options: nosniff`.
- **CORS Whitelist Lock:** Sirf whitelisted frontend web domain aur mobile origins allow honge.
- **Trust Proxy Configuration:** Nginx/Cloudflare ke piche se actual client IP extract karne ke liye `app.set('trust proxy', 1)` mandatory hai.

### Layer 2: Tiered Rate Limiting & Anti-Brute Force (`@nestjs/throttler`)
- **Campus Wi-Fi NAT IP Resilience:** Plain `req.ip` throttling campus public IP ko block na kare, isliye composite key tracking chalegi:
  - *Authenticated Routes:* `usr_${req.user.id}`
  - *Pre-Auth / Login / OTP Routes:* `ip_${req.ip}_${req.body?.phone || req.body?.username || 'anon'}`
- **Auth / Login / OTP Routes:** Strictly **5 requests / minute**. 5 consecutive failures par 15 minutes auto-blacklist.
- **Financial / Mutating Routes:** Max **30 requests / minute**.
- **General Read APIs:** Max **100 requests / minute**.
- **Payload Size Guards:** Global body parser strictly max 10MB limit par lock rahega (Buffer Overflow / DoS defense).

### Layer 3: Identity, Token Rotation & Zero-Trust Auth
- **Dual-Token System:** Short-lived Access Token (15 minutes) + Refresh Token Rotation (RTR). Purana token dobara aane par user ke saare active sessions revoke honge.
- **Web Admin Delivery:** Refresh token strictly **`HttpOnly, Secure, SameSite=Strict`** cookie ke zariye deliver hoga.
- **Mobile Native Delivery:** Flutter app ke hardware secure enclave (`flutter_secure_storage` - Android Keystore / iOS Keychain) mein AES-256 encrypted persist hoga.
- **Token Storage:** Database mein sirf **SHA-256 hash** persist hoga.

### Layer 4: Strict RBAC & Zero Open Endpoints
- **Default-Deny Rule:** Global `APP_GUARD` ke zariye har endpoint protected rahega. Sirf explicitly `@Public()` decorated routes hi open rahenge.
- **3 Internal Roles Only:**
  1. `SUPER_ADMIN`: Supreme authority, institute profile & settings management, SMS/Payment gateway configuration. Pure database mein strictly **1 Super Admin** account rahega (partial unique index `WHERE role = 'SUPER_ADMIN'`).
  2. `ADMIN`: Academic operations, student admissions, fee counters, and staff supervision.
  3. `STAFF`: Teachers, Clerks, Accountants — Operations strictly governed by granular JSONB module permissions (`{ "Students": "edit", "Attendance": "view", ... }`).
- **Zero Student / Parent Logins:** Students aur parents ka system mein koi login account nahi hota.
- **Zero IDOR:** `userId` / `staffId` hamesha server-side JWT claims se extract hoga — request body ya URL parameter se trust nahi hoga.
- **Campus Network Geofence (Wi-Fi Binding Policy):**
  - **Verification Mechanism:**
    - *Web Clients (Browsers):* Request ki real public IP ko `campus_networks` database table mein stored static IP whitelist se match kiya jayega (`trust proxy` header verified).
    - *Mobile Clients (Flutter App):* Connected Wi-Fi router ka hardware **BSSID (MAC Address)** aur Public IP dono ko match kiya jayega taaki GPS spoofing ka 0% chance rahe.
  - `SUPER_ADMIN`: **Full Freedom** — duniya ke kisi bhi network, mobile data ya IP se 100% unrestricted operations ki complete chhoot hai.
  - `ADMIN` & `STAFF`: **Dual-Tier Network Rule:**
    - *Any-Network Tasks (Ghar/Personal Internet se allowed):* 
      - Exam questions / Question paper upload (Teachers ghar baithe paper set kar sakein).
      - Exam marks & grades upload (Teachers ghar se copies check karke marks daal sakein).
      - General views: Notices, syllabus, aur read-only reports dekhna.
      - *(Aage chal kar jo aur kaam decide honge wo yahan add hote rahenge)*.
    - *Strict Official Campus Wi-Fi Only Tasks (Baaki saare kaam):*
      - Baaki sabhi operational aur sensitive kaam (jaise Live Student/Staff Attendance lagana, Fee counter cash collection, etc.) strictly **Official Campus Wi-Fi** par hi ho sakenge.


### Layer 5: Data Integrity & SQL Injection Defense
- **Zero Raw SQL in Application Logic:** Controllers, Services aur Repositories ke andar runtime raw SQL strings ya string interpolation **STRICTLY BANNED** hai (sirf Drizzle ORM type-safe parameterized query builder chalega).
  - *Exception:* Initial database setup migrations (`migrations/*.sql`) aur automated monthly partition maintenance scripts.
- **Strict UUID Validation:** Saare URL ID parameters par `ParseUUIDPipe` lagega.
- **Anti-Overposting:** ValidationPipe par strictly `whitelist: true` aur `forbidNonWhitelisted: true` enforce rahega.
- **ACID Transactions:** Multi-table inserts/updates strictly `db.transaction` mein execute honge.

### Layer 6: Data Leakage Prevention & Serialization
- Response objects ko `ClassSerializerInterceptor` aur `@Exclude()` se pass karna compulsory hai taaki password hashes, salt, aur refresh token hashes client ko leak na hon.

### Layer 7: Immutable Audit Trail & Telemetry
- Har critical action (Delete Student, Modify Fee, Grade Edit, Role Change) audit table mein permanently log hoga: Actor ID, Role, UTC Timestamp, Client IP, Target Entity ID, aur Old vs New JSON diff.

### Layer 8: Mobile API Shield & Anti-Tampering Protocol
- **SSL Certificate Pinning:** Flutter mobile app (`Dio` client) backend server ka SSL Public Key Fingerprint pin karegi (MITM / Burp Suite defense).
- **Pre-Auth Attestation Shield:** Login/OTP endpoints par device authenticity Google Play Integrity / Apple DeviceCheck token se verify hogi.
- **Post-Auth HMAC Request Signature (`X-App-Signature`):** Dynamic session key se har mobile mutation request par `HMAC-SHA256(timestamp + nonce + payload + sessionKey)` generate hoga.
- **Replay Attack Defense:** UTC millisecond timestamp + Redis Nonce deduplication (5-minute window):
  ```typescript
  const isUnique = await redis.set(`nonce:${nonce}`, '1', 'EX', 300, 'NX');
  if (!isUnique) {
    throw new UnauthorizedException('Replay attack detected: Nonce already consumed');
  }
  ```
- **Binary Obfuscation:** Mobile builds hamesha `--obfuscate --split-debug-info` ke saath compile honge.

### Layer 9: Public Edge & CDN Defense Protocol
- **Isolated Public Namespace (`/api/v1/public/*`):** Public website endpoints sensitive student/staff PII ko touch nahi karenge.
- **Aggressive Cloudflare Edge Caching:** Public endpoints (notices, school profile, circulars) Cloudflare Edge par 5 minutes cache honge (99% requests CDN se serve hongi, DB load 0%).
- **Bot Defense:** Public admission forms par Cloudflare Turnstile / reCAPTCHA silent verification mandatory hoga.

---

## 🚀 4. High-Scale SLA Protocol (100,000+ Students & 10,000+ Staff)

### 4.1 Database Table Partitioning (Monthly Range Partitions)
- **Attendance Partitioning:** `attendance` table ko PostgreSQL **Monthly Range Partitions** (`attendance_2026_09`, `attendance_2026_10`) mein divide kiya jayega.
- **Partition Key Primary Key Mandate:** Partitioned table par kisi bhi Primary Key ya Unique Index mein `date` column ka hona mandatory hai: Composite PK `PRIMARY KEY (id, date)` aur unique composite index `(student_id, date)`.
- **Composite Indexing:** High-traffic queries par composite B-Tree indexes compulsory hain: `(class_id, date)`, `(student_id, academic_year)`.
- **Attendance Partitioning DDL (Safe Migration Sequencing):** Drizzle-kit PostgreSQL monthly range partitions ko auto-generate nahi karta, isliye custom raw SQL partition DDL scripts (`CREATE TABLE ... PARTITION OF`) ko migrations sequence mein safe tarike se execute karna hoga taaki foreign keys aur tables sahi order mein create hon.
- **Query Explain SLA:** Kisi bhi single query ka execution time **50ms** se zyada nahi hona chahiye. Full table scans strictly prohibited hain.

### 4.2 Bulk Batch Operations (Morning Peak Concurrency)
- 10,000 teachers jab attendance submit karein, single batch payload accept hoga aur repository single `INSERT INTO attendance VALUES (...)` batch execute karegi (connection load 98% kam).

### 4.3 Connection Pooling & PgBouncer Multiplexing
- **PgBouncer Mode:** Strictly `pool_mode = transaction`. Client connections 10,000+ support honge, server DB connections **50 se 100** par cap rahenge.
- **Drizzle Compatibility:** Drizzle database instance hamesha `prepare: false` ke saath initialize hoga:
  ```typescript
  export const db = drizzle(pool, { schema, prepare: false });
  ```
- **Unbound Query Ban:** All list endpoints must enforce pagination (`default: 20`, `max: 100`).

### 4.4 In-Memory Caching (Redis / CacheManager)
- Read-heavy data (Classes, Subjects, Settings) cached rahega.
- **TTL Policy:** Hot Config: 10 min | Transliteration: 30 days | Sessions: 15 min.
- **Cache Stampede Defense (Singleflight / Distributed Mutex with Retry & Fallback):**
  ```typescript
  const lockKey = `lock:${cacheKey}`;
  let attempts = 0;
  
  // Max 3 retries (50ms interval) to allow primary worker to populate cache
  while (attempts < 3) {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const acquired = await redis.set(lockKey, '1', 'EX', 10, 'NX');
    if (acquired) {
      try {
        const data = await repository.findAll();
        await redis.setex(cacheKey, TTL, JSON.stringify(data));
        return data;
      } finally {
        await redis.del(lockKey);
      }
    }
    attempts++;
    await sleep(50);
  }
  
  // Ultimate Fallback: Direct DB read so client never receives null/empty data
  return await repository.findAll();
  ```

### 4.5 Asynchronous Worker Queues (BullMQ)
Heavy operations HTTP request loop se bahar rahengi:
- Monthly Fee Invoices generation
- Bulk Push Notifications (FCM)
- Marksheets PDF generation (Puppeteer-Core)

### 4.6 Health Checks, Graceful Shutdown & Zero-Downtime Migrations
- **Health Probes:** Liveness (`/api/v1/health/live`) aur Readiness (`/api/v1/health/ready`).
- **Graceful Shutdown:** `SIGTERM` handler active requests aur BullMQ jobs ko 30-second grace period dekar drain karega (`app.enableShutdownHooks()`).
- **Distributed Request Tracing:** Har request par `X-Request-ID` correlation header log lines aur DB queries mein inject hoga.
- **Additive-Only Migrations:** 3-step pattern: *Expand* (add nullable column) ➔ *Migrate* (background data copy) ➔ *Contract* (drop old column in next release).

### 4.7 Enterprise Object Storage (S3-Compatible)
- **Secure File Hosting:** Images, videos, aur PDFs (jaise student profile photos, assignments, ID cards) directly database ya local server par store nahi honge. Hamesha **S3-compatible encrypted cloud storage** (jaise AWS S3, MinIO) use hoga taaki server storage full na ho aur CDN delivery fast ho.

---

## ⏱️ 5. Temporal & Date/Time Architecture (100% `.env` Driven)

1. **Zero Hardcoded Timezone (100% `.env` Driven):**
   - Code ke andar kisi bhi fixed timezone (jaise `Asia/Kolkata` ya `UTC`) ko hardcode karna **STRICTLY BANNED** hai.
   - Backend ke saare date aur time calculations strictly `.env` variable (e.g. `APP_TIMEZONE`) se load honge — chahe `.env` me UTC ho, IST (`Asia/Kolkata`) ho, ya koi aur international timezone ho.
2. **Calendar Dates (DOB, Attendance):** Database mein strictly SQL `DATE` (`YYYY-MM-DD`).
3. **Event Timestamps:** Database mein strictly SQL `TIMESTAMPTZ` (UTC ISO 8601 string) mein save hoga aur display/calculation ke waqt `.env` ke `APP_TIMEZONE` se evaluate hoga.
4. **Display Standard:** User-facing screens aur printouts par dates hamesha **`DD MMM YYYY`** format me render hongi.

### 5.1 Financial Integrity & Dynamic Currency (100% `.env` Driven)
- **Zero Floating-Point Calculations:** JavaScript `Number` (binary float) se paison ka hisaab karna **STRICTLY BANNED** hai. Database mein strictly `numeric(12, 2)` ya integer paise/cents use honge taaki 1 paise ka bhi rounding error na aaye.
- **100% Dynamic Currency via `.env`:** Currency symbol (jaise `₹`, `$`, `AED`, `SAR`) aur currency code (`INR`, `USD`) code me kahin bhi hardcode nahi hogi — strictly `.env` variable (`CURRENCY_CODE`, `CURRENCY_SYMBOL`) se load hogi.

---

## 🚫 6. The Backend Blacklist (Instant PR Rejection)

| # | Banned Anti-Pattern | Mandatory Solution |
|---|---|---|
| 1 | **`any`, `@ts-ignore`, `as any`** | Strict DTO types aur Type Guards use karein. |
| 2 | **Raw SQL in App Logic / Repositories** | Drizzle ORM parameterized calls (Raw SQL strictly allowed only in Migration DDL & Partition maintenance). |
| 3 | **Controllers/Services mein direct DB Query** | Saari database queries strictly Repositories ke andar rahengi. |
| 4 | **Direct `process.env` in Logic** | NestJS `ConfigService` with strict runtime validation. |
| 5 | **Silent 500s (Empty Catch Blocks)** | GlobalExceptionFilter aur structured error response. |
| 6 | **Unbound List Queries (No Pagination)** | Enforce `limit` (max 100) and `page` parameters on all listings. |
| 7 | **Multi-table mutation without Transaction** | Always wrap in `db.transaction`. |
| 8 | **Returning Raw DB Models** | Transform through response DTOs and `ClassSerializerInterceptor`. |
| 9 | **Hardcoded Institute / Client Names** | Strictly load dynamically via `.env` and `institute_settings`. |
| 10 | **JS Float Arithmetic for Money (`Number`)** | Strict `numeric(12, 2)` in DB / integer cents (0.1 + 0.2 bug defense). |
| 11 | **Hardcoded Currency Symbol / Code** | Strictly load dynamically via `.env` (`CURRENCY_SYMBOL`, `CURRENCY_CODE`). |
| 12 | **N+1 Database Queries in Loops (`forEach`)** | Batch joins with `inArray()` ya Drizzle relational queries. |
| 13 | **Blocking Main Thread (Sync CPU tasks)** | Heavy operations (PDF generation, bulk jobs) BullMQ queues me execute karein. |
| 14 | **Deleting Student Records / Reusing Roll Numbers** | **Student Record Immutability & Dropout Re-Admission Law:** Student ek baar add ho gaya toh permanent add ho gaya (0% delete). Lifecycle status (`ACTIVE`, `ALUMNI`, `TRANSFERRED`, `DROPOUT`) se govern hoga. Admission No / Roll No lifetime unique rahega. Agar koi student `DROPOUT` hai, toh uski same details ke saath NAYA admission allow hoga via conditional index (`CREATE UNIQUE INDEX ... WHERE status = 'ACTIVE'`). (Baki non-student records me soft-deletes use honge). |
| 15 | **Hardcoded API Keys / Secrets in Code** | Strictly `.env` aur validated `ConfigService` use karein. |
| 16 | **Foreign Keys bina Database Index ke** | Har FK aur frequent search column par explicit B-Tree index lagayein (No Full Table Scans). |
| 17 | **Hanging External Requests / No Timeout** | External APIs (SMS/Payment) aur DB queries par strict timeout (10-15s) lagayein. |
Complexity vs. Current Stage: Ye rules final vision ke liye perfect hain, lekin agar abhi backend early stage mein hai toh sab ek saath implement karna overwhelming ho sakta hai. Refactoring phased approach mein karni chahiye (e.g., pehle 3-Layer DDD fix karo, phir security layers add karo, phir performance optimizations).

Layer 8 (Mobile HMAC + Attestation): Ye sab implement karna time-consuming hai. HMAC signature + Play Integrity — ye Phase 2-3 mein aaye toh bhi chalega. Pehle core auth (JWT + RBAC) solid karo.

5-Tier Testing Pyramid: Ideal hai lekin Tier 4 (k6 load testing) aur Tier 5 (OWASP ZAP penetration) ko production release ke time implement karna practical rahega. Unit + API contract tests se start karo.

Cache Stampede Code: Singleflight pattern code sample accha hai, lekin ye ek reusable utility/decorator banna chahiye, har jagah copy-paste nahi.
---

## 🧪 7. Mandatory Verification & 5-Tier Testing Protocol

Koi bhi backend module ya endpoint tab tak production-ready nahi mana jayega jab tak wo in testing aur verification gates ko pass na kare:

### 7.1 Code-Level Pre-Release Gates (Automated Checks)
1. **Compilation Check:** `npx tsc --noEmit` ➔ **0 Errors, 0 Warnings.**
2. **Linter & Security Check:** `npm run lint` ➔ **0 Lint errors.**
3. **Environment Boot Guard:** `.env` validation schema invalid ya missing secrets hone par app start hone se pehle gracefully report dekar stop hogi (insecure server chalna strictly banned).
4. **SAST & Dependency Scanning (Vulnerability Audit Gate):** Code likhte waqt static analysis (SAST via Linter/AI) mandatory hai. Dependencies (`npm audit` / Snyk) mein **0 High / 0 Critical CVE Security Vulnerabilities** honi chahiye taaki third-party code se virus na aaye.

### 7.2 The 5-Tier Enterprise Testing Pyramid
| Tier | Test Category | Target Scope & Mandate | Tooling |
|---|---|---|---|
| **Tier 1** | **Unit & Domain Tests** | Fee discount formulas, attendance calculation, marksheet GPA/percentages, and date utility boundaries (Mocked DB, runs in seconds). | Jest / Vitest |
| **Tier 2** | **Database & Migration Tests** | Drizzle ORM queries, ACID multi-table rollback on failure, additive migrations check, and monthly partition creation verification. | PostgreSQL / Testcontainers |
| **Tier 3** | **API & Contract Tests** | Request/Response DTO validation with Zod, Swagger OpenAPI contract sync, and ensuring Web/Mobile endpoints receive exact expected shapes. | Supertest / Pact |
| **Tier 4** | **Load, Stress & Performance Tests** | Simulate subah 9 baje ka peak: **10,000 concurrent teachers** submitting attendance. Response time SLA strictly **< 50ms**, zero memory leaks. | **k6** / Artillery |
| **Tier 5** | **Security (DAST) & Penetration Tests** | DAST (Dynamic Application Security Testing) for checking live attacks on the running app. Automated checks for IDOR, Replay attacks (Redis nonce), brute-force lockout, and SQLi. Ethical hackers (Pen Testing) prior to final release. | OWASP ZAP / Custom Security Suites |

### 7.3 Continuous Deployment & Resilience Checks
- **Regression Testing:** Purane core modules (Auth, Fees, Attendance) naye code commits se kabhi break nahi hone chahiye.
- **Smoke & Sanity Testing:** Production deploy hote hi 30 seconds ke andar automated smoke script `/health`, Database pool, aur Redis connectivity verify karegi.
- **Resilience & Fault-Tolerance Testing (Chaos Check):** Agar Redis cache temporarily down ho jaye, toh backend crash nahi hoga — graceful degradation ke saath direct database se basic operations serve karega.
