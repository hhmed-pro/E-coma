# Setup Guide

Complete guide to setting up E-coma for local development.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 18.x or higher | JavaScript runtime |
| **npm** | 9.x or higher | Package manager |
| **Git** | 2.x or higher | Version control |

### Recommended Tools

- **VS Code** - Code editor with TypeScript support
- **VS Code Extensions:**
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Accounts Required

1. **Supabase** - [Create free account](https://supabase.com/)
2. **Google AI Studio** - [Get API key](https://ai.google.dev/)

---

## Installation

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/e-coma.git

# Navigate to project directory
cd e-coma
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# This will install:
# - Next.js 15.0
# - React 18.3
# - TypeScript 5
# - Tailwind CSS 3.4
# - Supabase client
# - And 40+ other packages
```

**Expected install time:** 2-5 minutes (depending on internet speed)

### Step 3: Verify Installation

```bash
# Check Node.js version
node --version  # Should be v18.x or higher

# Check npm version
npm --version   # Should be 9.x or higher

# List installed packages
npm list --depth=0
```

---

## Database Setup

### Option 1: Supabase Cloud (Recommended)

#### 1.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click **"New project"**
3. Fill in details:
   - **Name:** e-coma-dev
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to you
4. Wait for project creation (~2 minutes)

#### 1.2 Get Connection Details

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

#### 1.3 Run Database Migrations

**Option A: Using Supabase Dashboard (Easiest)**

1. Go to **SQL Editor** in Supabase dashboard
2. Open the file `supabase/migrations/001_initial_schema.sql` from your project
3. Copy and paste the SQL code
4. Click **"Run"**

**Option B: Using Supabase CLI**

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

#### 1.4 Verify Database Setup

Run this SQL query in Supabase SQL Editor:

```sql
-- Check if tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should see: merchants, products, orders, wilayas, etc.
```

### Option 2: Local Supabase (Advanced)

```bash
# Start local Supabase
npx supabase start

# This will:
# - Download Docker images
# - Start PostgreSQL, PostgREST, GoTrue, etc.
# - Output local URLs and keys

# Apply migrations
npx supabase db push

# Stop when done
npx supabase stop
```

---

## Environment Configuration

### Step 1: Create Environment File

```bash
# Copy example file
cp .env.example .env.local
```

### Step 2: Configure Variables

Edit `.env.local` with your values:

```env
# ===========================================
# Supabase Configuration
# ===========================================
# Get from: Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===========================================
# Google AI Configuration
# ===========================================
# Get from: https://ai.google.dev/
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ===========================================
# Optional Configuration
# ===========================================
# Next.js
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Rate Limiting (optional)
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 3: Verify Environment

Create a test file `tmp_rovodev_test_env.js`:

```javascript
require('dotenv').config({ path: '.env.local' });

console.log('Environment Check:');
console.log('✓ Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : '❌ Missing');
console.log('✓ Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : '❌ Missing');
console.log('✓ Gemini Key:', process.env.GEMINI_API_KEY ? 'Set' : '❌ Missing');
```

Run test:

```bash
node tmp_rovodev_test_env.js
# Clean up
rm tmp_rovodev_test_env.js
```

---

## Development Workflow

### Start Development Server

```bash
# Start Next.js development server
npm run dev

# Output:
# ▲ Next.js 15.0.0
# - Local:   http://localhost:3000
# - Network: http://192.168.1.x:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npx tsc --noEmit     # TypeScript type checking

# Database
npx supabase db push       # Apply migrations
npx supabase db reset      # Reset database
npx supabase db dump       # Backup database
```

### Development Checklist

After starting the dev server, verify:

- [ ] Server running at <http://localhost:3000>
- [ ] No console errors in browser
- [ ] Can navigate to different pages
- [ ] Dark/light theme toggle works
- [ ] No TypeScript errors (check terminal)

---

## First-Time Setup Steps

### 1. Create Admin User

Since authentication is in progress, you'll need to manually create a user:

```sql
-- In Supabase SQL Editor
INSERT INTO merchants (id, email, full_name, subscription_tier, status)
VALUES (
  gen_random_uuid(),
  'admin@example.com',
  'Admin User',
  'imbrator',
  'active'
);
```

### 2. Seed Sample Data (Optional)

```sql
-- Add wilayas (Algerian provinces)
-- Already included in migration

-- Add sample products
INSERT INTO products (merchant_id, name, price, stock_quantity, status)
VALUES
  ((SELECT id FROM merchants LIMIT 1), 'Sample Product 1', 2500, 100, 'active'),
  ((SELECT id FROM merchants LIMIT 1), 'Sample Product 2', 3500, 50, 'active');

-- Add sample orders
INSERT INTO orders (merchant_id, customer_name, customer_phone, total_amount, status)
VALUES
  ((SELECT id FROM merchants LIMIT 1), 'Ahmed Benali', '0551234567', 2500, 'pending'),
  ((SELECT id FROM merchants LIMIT 1), 'Fatima Zehra', '0661234567', 3500, 'confirmed');
```

### 3. Configure Features

Edit `src/config/feature-favorites-config.ts` to customize available features for your environment.

---

## Project Structure Verification

After setup, your project should look like:

```
e-coma/
├── .env.local                  ✓ Created, contains secrets
├── .next/                      ✓ Generated on first run
├── node_modules/               ✓ Installed dependencies
├── public/                     ✓ Static assets
├── src/                        ✓ Source code
│   ├── app/                   ✓ Next.js App Router pages
│   ├── components/            ✓ Core UI components (93 UI, 27 layout)
│   ├── config/                ✓ Configuration files (9 files)
│   ├── views/                 ✓ Zone-based view components (43 files)
│   └── lib/                   ✓ Utilities and integrations
├── supabase/                   ✓ Database migrations
├── docs/                       ✓ Documentation
├── package.json                ✓ Dependencies list
└── next.config.ts              ✓ Next.js config
```

---

## Troubleshooting

### Common Issues

#### Issue 1: Port 3000 Already in Use

```bash
# Find process using port 3000
# On Linux/Mac:
lsof -i :3000

# On Windows:
netstat -ano | findstr :3000

# Kill the process or use different port
PORT=3001 npm run dev
```

#### Issue 2: Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

#### Issue 3: Supabase Connection Error

```bash
# Verify environment variables
cat .env.local | grep SUPABASE

# Test connection
node -e "
const { createClient } = require('@supabase/supabase-js');
const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
client.from('merchants').select('count').then(console.log);
"
```

#### Issue 4: TypeScript Errors

```bash
# Regenerate TypeScript types
rm -rf .next
npm run dev

# Check tsconfig.json is correct
npx tsc --showConfig
```

#### Issue 5: Tailwind CSS Not Working

```bash
# Verify Tailwind config
npx tailwindcss --help

# Rebuild
rm -rf .next
npm run dev
```

#### Issue 6: Google AI API Error

```bash
# Test API key
curl https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### Getting Help

If issues persist:

1. Check [GitHub Issues](https://github.com/yourusername/e-coma/issues)
2. Review [Documentation](../README.md)
3. Contact support: <dev@e-coma.com>

---

## Next Steps

After successful setup:

1. **Explore the UI** - Navigate through all modules
2. **Read Documentation** - Familiarize yourself with architecture
3. **Try API Endpoints** - Test AI generation features
4. **Customize** - Modify configs to match your needs
5. **Deploy** - Follow [Deployment Guide](DEPLOYMENT.md) when ready

---

## Development Tips

### Hot Reload

Next.js automatically reloads when you save files:

- **Components (.tsx)** - Hot reload
- **Styles (.css)** - Hot reload
- **Config files** - Requires restart
- **Environment variables** - Requires restart

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Browser Extensions

Recommended Chrome/Edge extensions:

- React Developer Tools
- Redux DevTools (for Zustand)
- TailwindCSS Debug Screens

---

## Performance Tips

### Development Mode

```bash
# Standard dev mode
npm run dev

# With turbopack (faster)
npm run dev --turbo

# Production build test
npm run build && npm start
```

### Memory Issues

If you encounter memory issues:

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

---

## Security Checklist

Before deploying:

- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets committed to git
- [ ] Supabase RLS policies enabled
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] Dependencies updated (`npm audit`)

---

For production deployment, see [Deployment Guide](DEPLOYMENT.md).
