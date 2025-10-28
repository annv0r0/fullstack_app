# 🧾 Changelog — TOR (Full-stack Training App)

All notable changes to this project will be documented here.  
This project follows [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH).

---

## [v0.2.0] — 2025-10-21

### Authentication updates (Cognito + NextAuth.js)

- Migrated from the custom auth system to **NextAuth.js v4**
- Added **multi-provider authentication**:
  - **Email/password** via AWS Cognito User Pool
  - Google, Facebook, Yandex OAuth
- Improved protected route handling and redirect logic
- Improved CSV parsing and normalization

---

## [v0.1.0] — 2025-10-15

### Initial MVP

- Custom **email/password** authentication (secure hashing + session cookies)
- Server-only session validation (HMAC-based `session_id` + DB lookup)
- File upload pipeline:
  - CSV → AWS S3 → server parsing → MongoDB insert
- Dashboard + item list/detail views
- Base Next.js 15 setup and environment config

---

## [v0.3.0] — planned

### Database migration

- Migrate to a relational database (SQLite, PostgreSQL)
- Normalize schema (Users, Items, Uploads, Sessions)

---

## [v0.4.0] — planned

### S3 storage and media

- Image upload + metadata linking
- CSV storage optimization and processing improvements

---

## [v0.5.0] — planned

### Parsing and data pipelines

- Stream large CSVs directly to parser
- Retry/error tracking for file ingestion

---

## [v1.0.0] — planned

### Stable Release

- Feature complete: Auth + DB + Storage
- CI/CD ready (GitHub Actions / Vercel)
- Official **v1.0.0** release

---
