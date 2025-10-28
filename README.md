# Full-stack Training App

> Version **v0.2.0** — October 21 2025

**What’s new**

- Migrated from the custom auth system to **NextAuth.js v4**
- Added **multi-provider authentication**:
  - **Email/password** via AWS Cognito User Pool
  - Google, Facebook, Yandex OAuth
- Improved protected route handling and redirect logic
- Improved CSV parsing and normalization

**Introduction**
A compact **Next.js 15 full-stack app** for practicing real-world flows: authentication, file uploads to S3, CSV parsing, and MongoDB persistence.  
You can sign in with **email (AWS Cognito under the hood), Google, Facebook, or Yandex** social providers, upload a CSV, parse it server-side, and explore the data in a dashboard.

---

## Quick start

```bash
npm i
npm run dev
```

## Features

### Authentication — _NextAuth.js v4 + Cognito OIDC_

- Native email/password sign-in via AWS Cognito Hosted UI
- Multi-provider login (Google / Facebook / Yandex)
- Stateless **JWT sessions** stored in secure cookies
- Easy provider toggling via `auth.config.js`
- Middleware-based route protection

### CSV → S3 → MongoDB pipeline

- Client uploads CSV via **presigned URL**
- Server reads S3 stream → parses → normalizes → inserts into `Items` database
- Header validation + type casting (number, bool, date)

### UI / UX

- **Next.js App Router**
- Pages: public (`/`, `/auth`) and protected (`/dashboard`, `/upload`, `/items/[id]`)

---

## Tech Stack

Next.js 15 • NextAuth.js v4 • Cognito OIDC • AWS S3 • MongoDB Atlas • csv-parse • SCSS Modules

---

## Environment (.env)

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-bytes>

# Cognito
COGNITO_CLIENT_ID=...
COGNITO_CLIENT_SECRET=...
COGNITO_ISSUER=https://cognito-idp.<region>.amazonaws.com/<userPoolId>

# Optional providers
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...
YANDEX_CLIENT_ID=...
YANDEX_CLIENT_SECRET=...

# MongoDB
DB_URI=mongodb+srv://...
DB_NAME=fullstack_app

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=your-bucket
```

## CSV expectations

Headers like: `title,description,weight,unit,price,availible,raiting,image,date`
