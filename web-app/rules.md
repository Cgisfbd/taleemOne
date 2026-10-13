# taleemOne ERP
# Master Security, Backend Authority & Frontend Engineering Constitution

**Engineering Authority:** Powered by Barkat Tech  
**Standard:** Enterprise / Zero-Trust / Backend-Authoritative  
**Version:** 1.0
**Layer:** Frontend Engineering & Security Boundary
**Backend Authority:** The Backend Constitution v1.1 is authoritative for all server-side security, authentication, authorization, business rules and data integrity.  
**Status:** **MANDATORY — SECURITY / PR / CI / RELEASE GATE**


> **v1.1 Upgrade Note:** v1.1 preserves the existing frontend security architecture and clarifies refresh replay rules so client recovery cannot accidentally replay unsafe mutations.

> **SUPREME LAW:** Client may request. Client may display. Client may never decide.

---

# 0. Purpose & Scope

This document is the **Master Engineering Security Constitution** for TaleemOne ERP.

It governs:

- authentication;
- session security;
- authorization and RBAC;
- direct URL/API access protection;
- browser tampering resistance;
- token protection;
- backend authority;
- API architecture;
- validation;
- financial integrity;
- date/timezone/currency authority;
- media handling;
- official documents;
- Feature-Sliced Architecture;
- database transactions;
- concurrency;
- testing;
- production security;
- release acceptance.

## Explicitly Out of Scope

UI/UX visual design is controlled by a **separate UI/UX Constitution**.

This document intentionally does **not** define:

- colors;
- typography;
- fonts;
- glassmorphism;
- shadows;
- gradients;
- visual spacing;
- visual component styling;
- animations;
- visual brand tokens.

The separate UI/UX Constitution governs those areas.

**Security, authorization, backend authority, data integrity and business correctness always take precedence over UI behavior.**

---

# 1. Supreme Security Principle

## 1.1 Frontend Is Untrusted

The browser must always be treated as an **untrusted environment**.

A user is allowed to:

- open DevTools;
- inspect HTML;
- inspect JavaScript;
- modify DOM;
- modify client state;
- change URL parameters;
- paste protected URLs directly;
- call APIs manually;
- replay requests;
- modify request bodies;
- modify request headers;
- disable JavaScript;
- use another browser;
- use another device;
- open multiple tabs;
- attempt to reuse old credentials.

None of these actions may grant unauthorized access.

## 1.2 Backend Is the Security Boundary

The backend must independently verify every sensitive request.

The frontend must never be the final authority for:

- authentication;
- authorization;
- permissions;
- ownership;
- financial calculations;
- business rules;
- database writes;
- transaction validity;
- official record generation.

---

# 2. Direct URL / Deep-Link / Browser Bypass Protection

## 2.1 Direct URL Access Is Never Trusted

A user must **never** gain protected access merely by pasting a protected URL into the browser.

Examples:

```text
/dashboard
/admin/students
/admin/fees
/admin/settings
/students/123
/fees/receipt/123
/reports/private
```

If the user is not genuinely authenticated and authorized for that resource, the backend must deny the protected operation.

## 2.2 Route Guard Is Not Security

Next.js middleware, route guards, `<Protect>`, hidden buttons, disabled controls and frontend permission checks are **UX/navigation protections only**.

They are not the security boundary.

The API must independently enforce authorization.

## 2.3 No Protected Data Before Verification

Before authentication and authorization are successfully established:

- protected API data must not be returned;
- protected server data must not be embedded into HTML;
- protected server data must not be embedded into public page props;
- protected sensitive data must not be prefetched into an unauthorized browser;
- protected records must not be placed into client cache;
- protected business operations must not execute.

## 2.4 Unauthorized Direct Navigation

If an unauthenticated or unauthorized user directly navigates to a protected route, the application must not rely on the browser to “hide” the content after downloading it.

The server/API must prevent protected data from being delivered in the first place.

The safe flow is:

```text
Direct URL
   ↓
Authentication Verification
   ↓
Authorization Verification
   ↓
Allowed?
 ┌───────┴────────┐
 YES              NO
 ↓                 ↓
Protected Data     No Protected Data
 ↓                 ↓
Render             Reject / Redirect
```

---

# 3. “1 Pixel of Protected Data” Security Rule

The security requirement is:

> **Unauthorized users must receive zero protected business data.**

This means the system must not intentionally send protected content to the browser and then depend on CSS, React conditions or JavaScript to hide it.

Therefore:

- `display: none` is not security;
- opacity `0` is not security;
- transparent text is not security;
- off-screen rendering is not security;
- hidden DOM is not security;
- disabled buttons are not security;
- client-side conditional rendering is not security.

If a user is unauthorized, the protected data must **not be delivered as protected data**.

A loading shell, public shell, login screen or generic unauthorized response may exist. What must never cross the security boundary is the protected resource itself.

---

# 4. F12 / DevTools / DOM Tampering Protection

## 4.1 DevTools Is Allowed

The application must assume that DevTools is available.

Do **not** treat:

- disabling right-click;
- blocking F12;
- keyboard shortcuts;
- detecting DevTools;
- anti-inspect scripts;

as real security.

Those techniques are bypassable and are not security controls.

## 4.2 Actual Security Requirement

A user may inspect and modify the frontend.

Even after modification:

- unauthorized API calls must return `401` or `403`;
- unauthorized records must not be returned;
- unauthorized mutations must not execute;
- hidden routes must not become authorized;
- modified role state must not elevate privileges;
- modified permission state must not elevate privileges;
- modified DOM must not expose backend data that was never delivered.

---

# 5. API Direct-Access Protection

A protected endpoint must remain protected even when called directly outside the application UI.

Example:

```text
Browser UI
    ↓
Frontend
    ↓
Protected API
```

must provide the same security as:

```text
Attacker / DevTools / curl / Postman / custom script
    ↓
Protected API
```

The backend must not assume that requests originate from TaleemOne's UI.

## 5.1 Mandatory Backend Checks

Every sensitive endpoint must independently verify:

1. authentication;
2. session validity;
3. authorization;
4. role;
5. permission;
6. resource ownership/scope where applicable;
7. business rules;
8. request validation;
9. transaction integrity where applicable.

---

# 6. Token Theft & Credential Protection

## 6.1 JavaScript-Readable Token Storage Is Banned

Authentication credentials must never be stored in:

- `localStorage`;
- `sessionStorage`;
- IndexedDB;
- Redux;
- Zustand;
- React state;
- URL parameters;
- query strings;
- JavaScript-readable persistent storage.

## 6.2 Authentication Cookie Requirements

Authentication cookies must use:

- `HttpOnly`;
- `Secure`;
- an appropriate `SameSite` policy;
- secure production transport.

Where deployment compatibility allows, `SameSite=Strict` is preferred.

## 6.3 Token Is Not Authorization

Even if an attacker obtains a credential, the backend must still independently verify:

- session validity;
- role;
- permission;
- resource access;
- account state;
- business authorization.

The frontend must never decode a token and treat its claims as the final authorization decision.

## 6.4 No Sensitive Token in URL

Access or refresh credentials must never be placed in:

```text
?token=
?access_token=
?refresh_token=
```

or similar URLs.

Tokens in URLs can leak through browser history, referrers, logs and copied links.

---

# 7. Session Security & Refresh Mutex

The centralized HTTP client shall use:

```text
withCredentials: true
```

## 7.1 401 Handling

When an access session expires:

1. One refresh operation may start.
2. Parallel failed requests must wait in a controlled queue.
3. Successful refresh may replay eligible requests.
4. Failed refresh must terminate the session safely.
5. Infinite refresh loops are prohibited.
6. Requests that are unsafe to replay must not be blindly replayed.
7. Safe reads may be replayed after refresh. Mutations may be replayed only when the backend contract makes them idempotent and the original idempotency key is preserved.
8. Refresh recovery must never transform a failed mutation into a client-reported success without an authoritative backend response.

## 7.2 Session Termination

After failed authentication refresh:

- clear application authentication state;
- discard protected cached data;
- navigate to the appropriate login/authentication boundary;
- do not continue rendering protected records.

---


# 7A. Frontend ↔ Backend Security Contract

This section is mandatory whenever the frontend communicates with the TaleemOne Backend Constitution v1.1.

## 7A.1 Authentication State

The frontend must treat authentication as a backend-issued state, never as a client-calculated state.

```text
CREDENTIALS_SUBMITTED
        ↓
Backend verifies credentials
        ↓
2FA_REQUIRED?
   ┌────┴────┐
   NO        YES
   ↓          ↓
AUTHENTICATED 2FA_CHALLENGE
                 ↓
             OTP VERIFIED
                 ↓
             AUTHENTICATED
```

The frontend must not create an authenticated state after password verification when the backend requires 2FA.

## 7A.2 2FA Challenge Token

A 2FA challenge token is temporary and purpose-bound.

The frontend MUST:

- use it only for the backend 2FA completion operation;
- never treat it as an access token;
- never use it for `/me`, ERP APIs, financial APIs or privileged APIs;
- never store it in `localStorage`, `sessionStorage`, IndexedDB, Redux, Zustand, React state or URLs;
- discard it after successful completion, expiration or failure.

The backend is authoritative for challenge validity, one-time consumption and account-state re-checking.

## 7A.3 Authenticated Session

After successful authentication, the browser uses the backend-issued secure session/authentication cookies.

The frontend HTTP boundary must use:

```text
withCredentials: true
```

The frontend must not read authentication secrets from cookies or attempt to reconstruct authorization from token claims.

## 7A.4 Refresh Contract

When a protected request receives `401` because the session requires refresh:

1. only one refresh operation may run at a time;
2. concurrent eligible requests wait for that refresh;
3. successful refresh may replay eligible requests;
4. unsafe mutations must not be blindly replayed;
5. failed refresh terminates the frontend authentication state safely;
6. the frontend must not retry indefinitely.

The backend remains authoritative for refresh-token rotation, reuse detection, revocation and session validity.

## 7A.5 Standard Security Error Contract

The frontend must normalize, without exposing secrets:

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Invalid authentication credentials",
  "traceId": "..."
}
```

The frontend must correctly distinguish at minimum:

```text
400 → validation / bad request
401 → unauthenticated
403 → authenticated but forbidden
404 → not found
409 → conflict / concurrency / duplicate where applicable
429 → rate limited
5xx → server failure
```

The frontend must never convert a backend denial into a misleading successful UI state.

## 7A.6 Authorization Contract

Frontend permission checks are UX-only.

The frontend may hide navigation or actions to improve usability, but:

```text
Frontend permission state ≠ Authorization
```

The backend decides:

- role;
- permission;
- ownership/scope;
- account state;
- business authorization;
- network/device policy where applicable.

The frontend must render the authoritative backend result.

## 7A.7 Financial Contract

The frontend may collect and display financial values, but must never become financial authority.

The backend determines:

- totals;
- balances;
- discounts;
- payments;
- refunds;
- adjustments;
- final financial status.

Frontend calculations are display/UX helpers only and must not be submitted as authoritative financial truth.

## 7A.8 Calendar / Timezone Contract

The frontend must preserve backend-defined calendar semantics.

Pure calendar dates remain:

```text
YYYY-MM-DD
```

The frontend must not silently convert DOB, admission date or academic-session dates through browser timezone logic.

Backend timestamps must be rendered using the institute timezone supplied by the backend.

## 7A.9 Official Document Contract

Official documents are backend-generated.

The frontend may:

- request;
- download;
- preview;
- display

the authenticated binary response.

The frontend must not replace the backend document with a client-generated authoritative PDF.

## 7A.10 Release Contract

A frontend release is not security-compliant if it assumes any of the following are authoritative:

- client role;
- client permission;
- client ownership;
- decoded token claims;
- hidden routes;
- hidden DOM;
- CSS visibility;
- client financial totals;
- client-generated official documents.


# 8. Backend Authority — Single Source of Truth

The backend owns:

- authentication;
- authorization;
- institute identity;
- institute settings;
- business rules;
- permissions;
- financial calculations;
- database writes;
- transaction integrity;
- idempotency;
- official documents;
- audit events.

The frontend is responsible only for:

- collecting user interaction;
- performing UX validation;
- safely transporting requests;
- presenting authoritative backend responses.

---

# 9. Hardcoding Law

Frontend configuration may contain only the minimum connection configuration required to communicate with the backend, such as:

```text
API_BASE_URL
```

The following are prohibited as institution-specific frontend constants:

- institute name;
- logo;
- currency;
- timezone;
- date format;
- fee rules;
- classes;
- sections;
- permissions;
- business settings;
- institutional workflows.

Static product attribution is allowed:

```text
taleemOne ERP
Powered by Barkat Tech
```

---

# 10. Institute Identity Contract

## Public

```http
GET /api/v1/institute-profile/public
```

## Authenticated

```http
GET /api/v1/institute-profile
```

Rules:

- institute identity comes from backend;
- English surfaces use the authoritative English name field;
- logo paths are resolved against the backend base URL;
- no manual institute name duplication;
- no institute-specific configuration file in the frontend;
- profile/configuration is managed by deployment/database authority.

---

# 11. Backend-First Authorization

Institutional roles:

```text
SUPER_ADMIN
ADMIN
STAFF
```

The exact effective permissions remain backend-defined.

Possible permission levels:

```text
none
view
edit
```

Frontend `<Protect>` or equivalent guards may improve UX.

They never replace backend authorization.

## Mandatory Test

For every sensitive operation:

```text
Normal UI request       → allowed if authorized
Modified UI request     → backend still checks
Direct API request      → backend still checks
DevTools request        → backend still checks
Manual request          → backend still checks
Wrong role              → 403
Wrong ownership/scope   → denied
```

---

# 12. Centralized API Architecture

Direct `fetch()` from feature/component code is banned.

Multiple random Axios instances are banned.

All application HTTP traffic must pass through:

```text
shared/api/httpClient.ts
```

Required capabilities:

- credentials;
- timeout;
- normalized errors;
- refresh mutex;
- idempotency;
- request cancellation;
- safe binary handling;
- consistent headers.

Default request timeout:

```text
10 seconds
```

---

# 13. Server State — TanStack Query v5

TanStack Query v5 is mandatory for server state.

`useEffect()` must not be used as the application's server-data fetching mechanism.

Query keys must use a factory pattern.

Example:

```ts
export const studentKeys = {
  all: ['students'] as const,
  lists: () => [...studentKeys.all, 'list'] as const,
  list: (filters: StudentFilterDTO) =>
    [...studentKeys.lists(), filters] as const,
  details: () => [...studentKeys.all, 'detail'] as const,
  detail: (id: string) =>
    [...studentKeys.details(), id] as const,
};
```

Mutations must use targeted invalidation/reconciliation.

Global cache wiping is prohibited unless explicitly justified.

---

# 14. Request Integrity & Idempotency

Critical state-changing operations must use idempotency.

Header:

```http
X-Idempotency-Key: <UUIDv4>
```

Minimum protected operations:

- fees;
- payments;
- refunds;
- admission;
- critical record creation;
- financial adjustments;
- other transaction-like mutations.

Frontend may generate the key.

Backend must enforce duplicate protection.

Frontend double-click protection is UX only.

---

# 15. Validation & Payload Security

Forms:

```text
React Hook Form
+
Zod
```

Frontend validation is for UX.

Backend validation is mandatory.

Rules:

- unknown/sensitive fields must not be trusted;
- UI-only fields must not leak into domain payloads;
- DTOs must be explicit;
- server must validate ownership and authorization;
- server must validate ranges, enums, types and business rules.

Validation errors should map to form fields where the API contract permits.

---

# 16. Financial Security Constitution

The backend alone determines:

- totals;
- balances;
- discounts;
- payments;
- refunds;
- adjustments;
- final financial status.

Hardcoded currency symbols are prohibited as business configuration.

Financial amounts must preserve exact decimal semantics.

Example:

```text
"1500.00"
```

Frontend floating-point arithmetic must never be financial authority.

Financial mutations must be:

- authorized;
- validated;
- transaction-protected;
- idempotent;
- concurrency-safe.

---

# 17. Date, Timezone & Calendar Integrity

Backend owns:

- date format;
- timezone.

Centralized date utility is mandatory:

```text
shared/lib/dateUtils.ts
```

Pure calendar dates such as:

- DOB;
- admission date;
- academic session date;

must remain:

```text
YYYY-MM-DD
```

and must not be accidentally converted through browser timezone logic.

Backend timestamps must render using the configured institute timezone.

---

# 18. Media Security

Media uploads use a dedicated endpoint.

Pattern:

```text
Upload Media
     ↓
Backend validates file
     ↓
Media ID / URL returned
     ↓
Main domain form sends JSON reference
```

Backend must validate:

- authentication;
- authorization;
- file type;
- size;
- content where necessary;
- ownership;
- storage path safety.

Client compression is optional optimization only.

It is never security.

---

# 19. Official Document Authority

Official:

- receipts;
- vouchers;
- marksheets;
- certificates;
- reports;
- institutional records;

must be generated by the backend.

Client-side PDF engines such as:

```text
jspdf
pdfmake
react-pdf
```

must not become the authority for official documents.

Frontend only:

- requests;
- downloads;
- previews;
- displays the authenticated binary response.

---

# 20. Feature-Sliced Architecture

Mandatory dependency direction:

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

Pages must remain thin composition wrappers.

Pages must not own:

- business logic;
- direct API calls;
- complex form state;
- domain validation;
- transaction logic.

Cross-feature imports are prohibited.

Shared must not depend on business/domain layers.

Public slice APIs should use `index.ts` boundaries.

---

# 21. TypeScript Security & Correctness

Production code must use strict TypeScript.

Banned without documented architectural exception:

```text
any
as any
@ts-ignore
unnecessary non-null !
```

Preferred:

- explicit DTOs;
- interfaces;
- discriminated unions;
- type guards;
- runtime schema validation;
- safe narrowing.

---

# 22. Frontend Blacklist

The following are PR rejection conditions:

| Banned | Mandatory Direction |
|---|---|
| Token in local/session storage | HttpOnly secure cookie |
| Direct fetch | Central HTTP client |
| Random Axios instances | One HTTP boundary |
| useEffect server fetching | TanStack Query |
| Hardcoded institute settings | Backend configuration |
| Hardcoded currency | Backend configuration |
| Hardcoded timezone | Backend configuration |
| Client-authoritative financial math | Backend decimal calculation |
| Client-only authorization | Backend authorization |
| Client PDF authority | Backend PDF |
| Raw complex form state | React Hook Form + Zod |
| `window.location.reload()` for sync | Router + targeted cache invalidation |
| Business logic in pages | Feature/domain layer |
| Cross-feature imports | Public slice API |

---

# 23. Database Integrity

Critical business invariants must be protected by the backend and, where appropriate, database constraints.

Mandatory considerations:

- transactions;
- unique constraints;
- foreign keys;
- concurrency;
- race conditions;
- duplicate prevention;
- atomic multi-record operations.

Application checks alone must not be the only protection for critical integrity rules.

---

# 24. Concurrency & Replay Protection

Critical operations must remain safe under:

- double-click;
- network retry;
- browser retry;
- parallel tabs;
- repeated API requests;
- multiple administrators;
- request replay.

Use the appropriate combination of:

- idempotency;
- database transactions;
- unique constraints;
- locking;
- version/concurrency checks.

---

# 25. CSRF & CORS

Cookie-authenticated state-changing requests require an explicit CSRF defense strategy.

Where applicable:

- trusted `Origin`/`Referer` validation;
- CSRF token strategy;
- strict allowed origins.

CORS must use an explicit allowlist.

Wildcard origin with credentials is prohibited.

---

# 26. Input, Output & PII Security

All external input is untrusted.

Validate:

- type;
- shape;
- size;
- range;
- enum;
- ownership;
- authorization;
- business constraints.

Do not return unnecessary PII.

Do not log:

- passwords;
- authentication secrets;
- tokens;
- unnecessary personal data;
- sensitive financial payloads.

Raw HTML rendering requires explicit security review.

---

# 27. Error Handling

Errors must be:

- structured;
- safe;
- actionable;
- traceable;
- free of secrets.

Minimum API categories:

```text
400  Validation / bad request
401  Unauthenticated
403  Forbidden
404  Not found
409  Conflict
429  Rate limited
5xx  Server failure
```

Raw stack traces, SQL errors and internal paths must never be exposed to users.

---

# 28. Security Headers & Production Controls

Production must use appropriate:

- HTTPS;
- Secure cookies;
- HttpOnly cookies;
- CSRF defense;
- strict CORS;
- Content Security Policy;
- rate limiting;
- brute-force protection;
- security headers;
- audit logging;
- secret management;
- database least privilege;
- protected backups.

---

# 29. Observability

Production observability should support:

- correlation/request IDs;
- authentication events;
- authorization failures;
- critical mutation events;
- audit events;
- server failures;
- performance diagnostics.

Observability must never become a source of credential or PII leakage.

---

# 30. Performance Rules

Correctness and security always take priority over speed.

Required principles:

- cancel stale requests;
- avoid duplicate calls;
- paginate large data;
- server-side filter/search where appropriate;
- minimize unnecessary payload fields;
- use appropriate cache behavior;
- lazy-load non-critical code where useful.

Performance claims must be measured.

---

# 31. Testing Constitution

Testing is a mandatory release gate.

## Static

Required:

```text
TypeScript = 0 errors
Lint = 0 errors
Production build = PASS
Hydration/runtime startup = PASS
```

## Unit

Cover:

- schemas;
- date utilities;
- timezone behavior;
- currency/decimal utilities;
- pure helpers;
- API error normalization.

## Integration

Cover:

- 200 success;
- 401;
- refresh mutex;
- 403;
- 400 validation;
- 409 conflict;
- 429;
- 5xx;
- idempotency.

## E2E

Critical flow:

```text
Login
 ↓
Authenticated request
 ↓
Authorization
 ↓
Mutation
 ↓
Database verification
 ↓
Authoritative response
 ↓
Targeted UI reconciliation
```

---

# 32. Mandatory Security E2E — Direct URL Attack

Every protected module must include tests such as:

### Case A — No session

```text
Paste protected URL
        ↓
No valid session
        ↓
Protected data = NOT returned
        ↓
Protected action = NOT executable
```

### Case B — Wrong role

```text
Valid session
+
Insufficient permission
        ↓
Direct protected URL/API
        ↓
403 / appropriate denial
        ↓
No protected resource data
```

### Case C — Modified frontend

```text
User changes React state
User changes DOM
User modifies permission variable
        ↓
Direct API call
        ↓
Backend re-checks authorization
        ↓
403 / denial
```

### Case D — Direct API

```text
DevTools / curl / Postman
        ↓
Protected endpoint
        ↓
Backend authentication + authorization
        ↓
Unauthorized = rejected
```

---

# 33. Mandatory Security E2E — Token Abuse

Test that:

- tokens are not present in localStorage;
- tokens are not present in sessionStorage;
- tokens are not placed in URLs;
- authentication cookies are not JavaScript-readable;
- expired sessions cannot access protected data;
- invalid sessions cannot access protected data;
- insufficient permissions cannot access protected data;
- session termination invalidates access as designed;
- stolen/invalid/expired credentials cannot bypass backend authorization.

**Important:** No architecture can guarantee that a valid credential stolen from a legitimate session is magically unusable. The correct defense is secure credential storage, short/controlled session lifetime where appropriate, server-side session validation, revocation, rotation and authorization checks.

---

# 34. Mandatory Security E2E — “1 Pixel” Rule

The test objective is not literally to prevent the browser from drawing a generic login/loading shell.

The actual mandatory security objective is stronger and measurable:

> **No unauthorized protected business data may be delivered to the client.**

Therefore an unauthorized user must not receive:

- student records;
- fee records;
- private reports;
- private settings;
- permission data beyond what is necessary;
- private API responses;
- hidden financial information;
- protected document contents.

CSS hiding does not count.

React conditional rendering does not count.

Route hiding does not count.

The protected resource must be denied at the server/API boundary.

---

# 35. Canonical Request Flow

```text
User Action / Direct URL / Direct API Request
                    ↓
          Authentication Check
                    ↓
           Session Verification
                    ↓
          Backend Authorization
                    ↓
          Resource Ownership Check
                    ↓
             Input Validation
                    ↓
             Business Rules
                    ↓
       Transaction / Idempotency
                    ↓
             Database Authority
                    ↓
        Authoritative API Response
                    ↓
      Targeted Cache Reconciliation
                    ↓
                    UI
```

There is no security step where frontend state becomes authoritative.

---

# 36. Release Security Checklist

A release is **NOT APPROVED** if an applicable item fails.

- [ ] Backend is the authority
- [ ] No institution-specific hardcoding
- [ ] No token in JS-readable storage
- [ ] No token in URL
- [ ] Secure authentication cookies
- [ ] Refresh mutex tested
- [ ] Session failure handled safely
- [ ] Backend RBAC tested
- [ ] Direct URL access tested
- [ ] Direct API access tested
- [ ] DevTools/tampered-client request tested
- [ ] Unauthorized data is not returned
- [ ] Wrong role receives denial
- [ ] Resource ownership is verified
- [ ] Critical mutations use idempotency
- [ ] Financial operations are transactional
- [ ] Financial calculations are backend-authoritative
- [ ] Date/timezone/currency are backend-driven
- [ ] Calendar dates protected from timezone drift
- [ ] Media endpoints secured
- [ ] Official documents backend-generated
- [ ] Central HTTP client enforced
- [ ] TanStack Query used for server state
- [ ] Query cancellation implemented where applicable
- [ ] FSD boundaries respected
- [ ] Strict TypeScript passes
- [ ] Lint passes
- [ ] Production build passes
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] RBAC E2E passes
- [ ] Direct-access E2E passes
- [ ] Token-security E2E passes
- [ ] Idempotency E2E passes
- [ ] CSRF/CORS verified
- [ ] Security headers verified
- [ ] No sensitive production logging
- [ ] Audit logging verified

---

# 37. Final 10/10 Acceptance Criteria

TaleemOne ERP is compliant only when:

1. **The backend makes every authoritative security decision.**
2. **Direct URL pasting cannot bypass authentication or authorization.**
3. **F12/DevTools cannot turn an unauthorized browser into an authorized client.**
4. **Modified DOM/client state cannot elevate privileges.**
5. **Direct API calls receive the same backend authorization as normal UI requests.**
6. **Unauthorized protected business data is never delivered to the client.**
7. **No client-side CSS/JS hiding is treated as security.**
8. **Authentication secrets are not stored in JavaScript-readable storage.**
9. **Tokens are never placed in URLs.**
10. **Session refresh is concurrency-safe.**
11. **Every sensitive endpoint independently verifies authorization.**
12. **Resource ownership/scope is independently verified.**
13. **Critical mutations are idempotent and transaction-protected.**
14. **Financial truth exists only on the backend/database authority path.**
15. **Dates, timezones and currencies are backend-driven.**
16. **Official documents are backend-generated.**
17. **Database integrity is protected against race conditions and duplicate effects.**
18. **The frontend follows strict typed modular architecture.**
19. **Security is verified with direct-access, tampering, RBAC and token-abuse E2E tests.**
20. **A failing mandatory security gate blocks release.**

---

# 38. Non-Negotiable Engineering Statement

> **The browser is untrusted.**
>
> **The URL is untrusted.**
>
> **The DOM is untrusted.**
>
> **Client state is untrusted.**
>
> **Request parameters are untrusted.**
>
> **Frontend permission checks are not security.**
>
> **The backend is the security boundary.**
>
> **The database is the persistence integrity boundary.**
>
> **The client may request and display.**
>
> **The client may never decide.**

---

# End of Master Constitution

**taleemOne ERP • Powered by Barkat Tech**
