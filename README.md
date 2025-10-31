# Full-stack Training App

> Version **v0.3.0** — October 30, 2025

**What’s new**

- Added image upload UI feature
- Images now stored in public bucket for use in UI cards
- CSV upload now requires image field with S3 URL reference

## Introduction

A compact **Next.js 15 full-stack app** for practicing real-world flows: authentication, file uploads to S3, CSV parsing, and PostgreSQL persistence.  
 You can sign in with **email (AWS Cognito under the hood), Google, Facebook, or Yandex** social providers, upload a CSV, parse it server-side, and explore the data in a dashboard.

## Quick start

```bash
npm i
npm run dev
```

### Supabase (PostgreSQL) + Prisma database setup

```bash
npx prisma migrate dev --name init_postgres
```

See URL format descriptoin in Supabase project [Connection tab](https://supabase.com/dashboard/project/<PROJECT_ID>?showConnect=true)

## Features

### Authentication — _NextAuth.js v4 + Cognito OIDC_

- Native email/password sign-in via AWS Cognito Hosted UI
- Multi-provider login (Google / Facebook / Yandex)
- Stateless **JWT sessions** stored in secure cookies
- Easy provider toggling via `auth.config.js`
- Middleware-based route protection

### CSV → S3 → PostgreSQL pipeline

- Client uploads CSV via **presigned URL**
- Server reads S3 stream → parses → normalizes → inserts into `Items` database
- Header validation + type casting (number, bool, string)

### UI / UX

- **Next.js App Router**
- Pages: public (`/`, `/auth`) and protected (`/dashboard`, `/upload`, `/items/[id]`)

## Tech Stack

Next.js 15 • NextAuth.js v4 • Cognito OIDC • AWS S3 • Supabase (PostgreSQL) • Prisma ORM • csv-parse • SCSS Modules

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

# PostgreSQL
DATABASE_URL="postgresql://<USER>.<PROJECT_ID>:<USER_PSWRD>@<REGION>.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.<PROJECT_ID>:<ADMIN_PSWRD>@<REGION>.pooler.supabase.com:5432/postgres"

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=your-bucket
NEXT_PUBLIC_S3_BUCKET="https://<YOUR_BUCKET_NAME>.s3.<REGION>.amazonaws.com/<image_name.png>"
```

## CSV expectations

Headers like: `title,description,weight,unit,price,availible,raiting,image`
