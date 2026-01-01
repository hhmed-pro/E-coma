# Environment Variables Documentation

Complete reference for all environment variables used in E-coma.

## 📋 Table of Contents

- [Overview](#overview)
- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Environment-Specific](#environment-specific)
- [Security Best Practices](#security-best-practices)

---

## Overview

E-coma uses environment variables for configuration. Variables are loaded from `.env.local` (development) or set in deployment platform (production).

### File Priority

Next.js loads environment variables in this order (highest priority first):

1. `.env.local` - Local overrides (gitignored)
2. `.env.development` - Development defaults
3. `.env.production` - Production defaults
4. `.env` - Global defaults

---

## Required Variables

### Supabase Configuration

#### `NEXT_PUBLIC_SUPABASE_URL`
- **Type:** String (URL)
- **Required:** Yes
- **Exposed to Browser:** Yes (`NEXT_PUBLIC_` prefix)
- **Description:** Your Supabase project URL
- **Example:** `https://xxxxx.supabase.co`
- **How to Get:**
  1. Go to [Supabase Dashboard](https://app.supabase.com/)
  2. Select your project
  3. Settings → API → Project URL

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
```

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Type:** String (JWT)
- **Required:** Yes
- **Exposed to Browser:** Yes
- **Description:** Supabase anonymous/public API key
- **Example:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **How to Get:**
  1. Supabase Dashboard → Settings → API
  2. Copy "anon/public" key
- **Security Note:** This key is safe to expose; RLS policies protect data

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXJwcm9qZWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NjYwMDAsImV4cCI6MjAwNDEyNjAwMH0.signature
```

---

### Google AI Configuration

#### `GEMINI_API_KEY`
- **Type:** String
- **Required:** Yes
- **Exposed to Browser:** No (server-side only)
- **Description:** Google AI Studio API key for Gemini
- **Example:** `AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **How to Get:**
  1. Go to [Google AI Studio](https://ai.google.dev/)
  2. Click "Get API Key"
  3. Create or select a project
  4. Copy the generated key
- **Cost:** Free tier: 60 requests/minute, paid: $0.075/1M tokens

```env
GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Optional Variables

### Application Configuration

#### `NEXT_PUBLIC_APP_URL`
- **Type:** String (URL)
- **Required:** No
- **Default:** `http://localhost:3000` (dev), deployment URL (prod)
- **Exposed to Browser:** Yes
- **Description:** Base URL of your application
- **Used For:** 
  - OAuth redirects
  - Email links
  - Sitemap generation
  - Social sharing

```env
NEXT_PUBLIC_APP_URL=https://digital-g.com
```

#### `NODE_ENV`
- **Type:** String
- **Required:** No (automatically set by Next.js)
- **Values:** `development` | `production` | `test`
- **Description:** Current environment
- **Note:** Don't set manually; Next.js handles this

```env
NODE_ENV=production
```

---

### Feature Flags

#### `NEXT_PUBLIC_ENABLE_ANALYTICS`
- **Type:** Boolean
- **Default:** `true`
- **Description:** Enable/disable analytics tracking
- **Used For:** Privacy compliance, testing

```env
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

#### `NEXT_PUBLIC_ENABLE_AI_FEATURES`
- **Type:** Boolean
- **Default:** `true`
- **Description:** Enable/disable AI-powered features
- **Used For:** Cost control, testing without AI

```env
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
```

---

### API Configuration

#### `RATE_LIMIT_WINDOW`
- **Type:** Number (milliseconds)
- **Default:** `60000` (1 minute)
- **Description:** Time window for rate limiting
- **Used For:** Preventing API abuse

```env
RATE_LIMIT_WINDOW=60000
```

#### `RATE_LIMIT_MAX_REQUESTS`
- **Type:** Number
- **Default:** `100`
- **Description:** Maximum requests per window
- **Recommendation:** 
  - Development: 1000
  - Production: 100-500

```env
RATE_LIMIT_MAX_REQUESTS=100
```

#### `API_TIMEOUT`
- **Type:** Number (milliseconds)
- **Default:** `30000` (30 seconds)
- **Description:** API request timeout

```env
API_TIMEOUT=30000
```

---

### Analytics & Monitoring

#### `NEXT_PUBLIC_ANALYTICS_ID`
- **Type:** String
- **Required:** No
- **Description:** Google Analytics measurement ID
- **Format:** `G-XXXXXXXXXX`

```env
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

#### `SENTRY_DSN`
- **Type:** String (URL)
- **Required:** No
- **Description:** Sentry error tracking DSN
- **How to Get:**
  1. Create project at [sentry.io](https://sentry.io/)
  2. Copy DSN from project settings

```env
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

#### `SENTRY_AUTH_TOKEN`
- **Type:** String
- **Required:** No (only for source maps)
- **Description:** Sentry authentication token for uploads

```env
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### Email Configuration (Future)

#### `SMTP_HOST`
- **Type:** String
- **Description:** SMTP server hostname
- **Example:** `smtp.gmail.com`

```env
SMTP_HOST=smtp.gmail.com
```

#### `SMTP_PORT`
- **Type:** Number
- **Common Values:** `587` (TLS), `465` (SSL)

```env
SMTP_PORT=587
```

#### `SMTP_USER`
- **Type:** String
- **Description:** SMTP username/email

```env
SMTP_USER=noreply@e-coma.com
```

#### `SMTP_PASSWORD`
- **Type:** String
- **Description:** SMTP password/app password
- **Security:** Use app-specific password, not main password

```env
SMTP_PASSWORD=your_app_password
```

---

### Payment Integration (Future)

#### `STRIPE_PUBLISHABLE_KEY`
- **Type:** String
- **Exposed to Browser:** Yes
- **Description:** Stripe public API key

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

#### `STRIPE_SECRET_KEY`
- **Type:** String
- **Exposed to Browser:** No
- **Description:** Stripe secret API key

```env
STRIPE_SECRET_KEY=sk_live_xxxxx
```

#### `STRIPE_WEBHOOK_SECRET`
- **Type:** String
- **Description:** Stripe webhook endpoint secret

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

### Third-Party APIs (Future)

#### `YALIDINE_API_KEY`
- **Type:** String
- **Description:** Yalidine delivery API key

```env
YALIDINE_API_KEY=your_api_key
```

#### `MAYSTRO_API_KEY`
- **Type:** String
- **Description:** Maystro delivery API key

```env
MAYSTRO_API_KEY=your_api_key
```

#### `META_ACCESS_TOKEN`
- **Type:** String
- **Description:** Meta (Facebook) Graph API access token
- **Scopes:** `ads_management`, `pages_manage_posts`

```env
META_ACCESS_TOKEN=your_long_lived_token
```

#### `TIKTOK_ACCESS_TOKEN`
- **Type:** String
- **Description:** TikTok Business API access token

```env
TIKTOK_ACCESS_TOKEN=your_access_token
```

---

## Environment-Specific

### Development (.env.local)

```env
# ===========================================
# DEVELOPMENT ENVIRONMENT
# ===========================================

# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (Development)
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...dev-key

# Google AI (Development)
GEMINI_API_KEY=AIzaSy...dev-key

# Features (Relaxed for testing)
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=1000
API_TIMEOUT=60000

# Analytics (Disabled in dev)
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Debugging
NEXT_PUBLIC_DEBUG_MODE=true
```

### Staging (.env.staging)

```env
# ===========================================
# STAGING ENVIRONMENT
# ===========================================

NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.e-coma.com

# Supabase (Staging)
NEXT_PUBLIC_SUPABASE_URL=https://staging-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...staging-key

# Google AI (Staging - use dev key)
GEMINI_API_KEY=AIzaSy...dev-key

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=500

# Analytics (Enabled)
NEXT_PUBLIC_ANALYTICS_ID=G-STAGING123
SENTRY_DSN=https://staging-sentry-dsn
```

### Production (.env.production)

```env
# ===========================================
# PRODUCTION ENVIRONMENT
# ===========================================

NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://digital-g.com

# Supabase (Production)
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...prod-key

# Google AI (Production)
GEMINI_API_KEY=AIzaSy...prod-key

# Rate Limiting (Stricter)
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100

# Analytics (Enabled)
NEXT_PUBLIC_ANALYTICS_ID=G-PROD123
SENTRY_DSN=https://prod-sentry-dsn

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
```

---

## Security Best Practices

### 1. Never Commit Secrets

```bash
# .gitignore should include:
.env.local
.env*.local
.env.production
```

### 2. Use Environment-Specific Keys

- **Development:** Use development/test keys
- **Staging:** Separate staging keys
- **Production:** Unique production keys

### 3. Rotate Keys Regularly

```bash
# Quarterly rotation schedule:
# - Supabase service role keys
# - API keys for external services
# - Database passwords
```

### 4. Principle of Least Privilege

- Only expose variables that need browser access
- Use server-side API routes for sensitive operations
- Restrict Supabase RLS policies

### 5. Secret Management

**Vercel:**
```bash
# Add secrets via CLI
vercel env add GEMINI_API_KEY production

# Or via dashboard: Settings → Environment Variables
```

**Docker:**
```bash
# Use Docker secrets
docker secret create gemini_key ./gemini_key.txt

# Mount in compose
secrets:
  - gemini_key
```

**Kubernetes:**
```yaml
# Create secret
kubectl create secret generic api-keys \
  --from-literal=gemini-api-key=xxx

# Use in deployment
env:
- name: GEMINI_API_KEY
  valueFrom:
    secretKeyRef:
      name: api-keys
      key: gemini-api-key
```

---

## Validation

### Runtime Validation

Create `src/lib/env.ts`:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
```

Use in application:
```typescript
import { env } from '@/lib/env';

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

---

## Testing Environment Variables

### Check Variables

```bash
# List all environment variables
node -e "console.log(process.env)" | grep NEXT_PUBLIC

# Verify specific variable
echo $NEXT_PUBLIC_SUPABASE_URL

# Test in Next.js
npm run dev
# Check browser console: process.env
```

### Test Script

Create `scripts/test-env.js`:

```javascript
require('dotenv').config({ path: '.env.local' });

const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'GEMINI_API_KEY',
];

let missing = [];

required.forEach(key => {
  if (!process.env[key]) {
    missing.push(key);
    console.error(`❌ Missing: ${key}`);
  } else {
    console.log(`✓ Found: ${key}`);
  }
});

if (missing.length > 0) {
  console.error(`\n${missing.length} required variable(s) missing!`);
  process.exit(1);
} else {
  console.log('\n✓ All required variables present!');
}
```

Run:
```bash
node scripts/test-env.js
```

---

## Troubleshooting

### Issue: Variables Not Loading

```bash
# Restart dev server
# Next.js doesn't hot-reload env changes

# Check file name
ls -la | grep .env

# Verify file contents
cat .env.local
```

### Issue: NEXT_PUBLIC_ Variables Undefined in Browser

```typescript
// Wrong: Won't work in browser
const url = process.env.SUPABASE_URL;

// Correct: Use NEXT_PUBLIC_ prefix
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
```

### Issue: Variables Working in Dev, Not in Production

```bash
# Ensure variables set in deployment platform
vercel env ls

# Re-deploy after adding variables
vercel --prod
```

---

## Reference: Complete .env.example

```env
# ===========================================
# E-coma Environment Configuration
# ===========================================

# ------------------------------------------
# Required Variables
# ------------------------------------------

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google AI
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ------------------------------------------
# Application
# ------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ------------------------------------------
# API Configuration
# ------------------------------------------
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100
API_TIMEOUT=30000

# ------------------------------------------
# Features
# ------------------------------------------
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_AI_FEATURES=true

# ------------------------------------------
# Analytics (Optional)
# ------------------------------------------
NEXT_PUBLIC_ANALYTICS_ID=
SENTRY_DSN=

# ------------------------------------------
# Email (Future)
# ------------------------------------------
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# ------------------------------------------
# Payment (Future)
# ------------------------------------------
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# ------------------------------------------
# Third-Party APIs (Future)
# ------------------------------------------
YALIDINE_API_KEY=
MAYSTRO_API_KEY=
META_ACCESS_TOKEN=
TIKTOK_ACCESS_TOKEN=
```

---

For questions about environment configuration, see [Setup Guide](SETUP.md) or contact support.
