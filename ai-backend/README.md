# 🧠 TaleemOne ERP — Dedicated AI Backend Microservice
> **Powered by Barkat Tech**

Isolated, high-performance, and secure AI Cognitive Engine for TaleemOne ERP.
Completely decoupled from the primary PostgreSQL business database and core NestJS backend.

---

## 🎯 Architecture & Purpose
1. **Port:** 5001 (Dedicated AI Microservice Port)
2. **Current Capabilities:**
   - High-Speed Urdu Transliteration & Script Conversion (`/api/ai/fix-urdu`)
   - Automated Academic Name & Text Formatting
3. **Future Capabilities:**
   - Autonomous ERP AI Agent & Copilot (Natural Language Chatbox)
   - Function & Tool Calling against TaleemOne REST APIs (Fee collection, Attendance reports, Dropout management, etc.)

---

## 🛡️ Security Layers
- **Port Isolation:** Binds strictly to `127.0.0.1:5001` (Internal VPC / localhost).
- **Service Handshake Armor:** Requires `X-AI-Secret-Key` header matching `.env`.
- **CORS Protection:** Strictly whitelist TaleemOne Frontend origins.
- **Throttling & Rate-Limiting:** Anti-abuse, DDoS, and prompt injection protection.
