# Deployment Guide

Complete guide to deploying E-coma to production.

## 📋 Table of Contents

- [Overview](#overview)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Setup](#environment-setup)
- [Deployment Options](#deployment-options)
- [Post-Deployment](#post-deployment)
- [Monitoring](#monitoring)

---

## Overview

E-coma can be deployed to various platforms. This guide covers the most common options.

### Recommended Stack

- **Hosting:** Vercel (optimized for Next.js)
- **Database:** Supabase Cloud
- **CDN:** Vercel Edge Network
- **Monitoring:** Vercel Analytics + Sentry

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Build completes successfully (`npm run build`)
- [ ] No console.log statements in production code
- [ ] All TODOs resolved or documented

### Security

- [ ] Environment variables secured
- [ ] Supabase RLS policies enabled
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] No hardcoded secrets
- [ ] Dependencies audited (`npm audit`)

### Performance

- [ ] Images optimized
- [ ] Unused dependencies removed
- [ ] Code splitting implemented
- [ ] Lazy loading for heavy components
- [ ] Lighthouse score > 90

### Database

- [ ] Migrations applied
- [ ] Indexes created for frequently queried columns
- [ ] Backup strategy implemented
- [ ] RLS policies tested

---

## Environment Setup

### Production Environment Variables

Create `.env.production`:

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Supabase (Production)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key

# Google AI
GEMINI_API_KEY=your_production_key

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: Error Tracking
SENTRY_DSN=your_sentry_dsn
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

#### Why Vercel?
- Zero-config deployment for Next.js
- Automatic HTTPS
- Edge network CDN
- Preview deployments for PRs
- Built-in analytics

#### Steps

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
# First deployment (follow prompts)
vercel

# Production deployment
vercel --prod
```

4. **Configure Environment Variables**
   - Go to Vercel dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables from `.env.production`

5. **Configure Domain**
   - Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

### Option 2: Docker + Cloud Platform

#### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Update next.config.ts

```typescript
const nextConfig: NextConfig = {
  output: 'standalone', // For Docker
  // ... rest of config
};
```

#### Build and Run

```bash
# Build Docker image
docker build -t e-coma .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_KEY \
  -e GEMINI_API_KEY=$GEMINI_KEY \
  e-coma
```

#### Deploy to Cloud

**AWS ECS:**
```bash
# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin
docker tag e-coma:latest $ECR_URL/e-coma:latest
docker push $ECR_URL/e-coma:latest

# Deploy to ECS
aws ecs update-service --cluster e-coma --service web --force-new-deployment
```

**Google Cloud Run:**
```bash
# Push to GCR
gcloud builds submit --tag gcr.io/$PROJECT_ID/e-coma

# Deploy
gcloud run deploy e-coma \
  --image gcr.io/$PROJECT_ID/e-coma \
  --platform managed \
  --region us-central1
```

---

### Option 3: Self-Hosted (VPS)

#### Requirements
- Ubuntu 22.04 LTS
- 2GB RAM minimum
- Node.js 18+
- Nginx
- PM2

#### Setup Steps

1. **Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

2. **Deploy Application**
```bash
# Clone repository
git clone https://github.com/yourusername/e-coma.git
cd e-coma

# Install dependencies
npm ci --production

# Build
npm run build

# Start with PM2
pm2 start npm --name "e-coma" -- start
pm2 save
pm2 startup
```

3. **Configure Nginx**

Create `/etc/nginx/sites-available/e-coma`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/e-coma /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Post-Deployment

### 1. Verify Deployment

```bash
# Check if site is live
curl https://yourdomain.com

# Check API endpoints
curl https://yourdomain.com/api/credits/balance

# Run Lighthouse audit
npx lighthouse https://yourdomain.com --view
```

### 2. Configure DNS

Update your domain DNS records:

```
Type    Name    Value                   TTL
A       @       your.server.ip.address  3600
CNAME   www     yourdomain.com          3600
```

### 3. Set Up Monitoring

#### Vercel Analytics (if using Vercel)
Automatically enabled, view in dashboard.

#### Uptime Monitoring
Use services like:
- UptimeRobot
- Pingdom
- StatusCake

#### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

Update `sentry.client.config.ts`:
```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

---

## Monitoring

### Key Metrics to Track

1. **Performance**
   - Page load time
   - Time to First Byte (TTFB)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)

2. **Availability**
   - Uptime percentage
   - Error rate
   - API response times

3. **Usage**
   - Active users
   - Page views
   - Feature usage
   - AI credit consumption

4. **Database**
   - Query performance
   - Connection pool usage
   - Storage size

### Monitoring Tools

```bash
# Vercel Analytics
# Built-in, no setup required

# Custom Analytics
npm install @vercel/analytics
```

Add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## Rollback Strategy

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Docker
```bash
# Keep previous image
docker tag e-coma:latest e-coma:previous

# Rollback
docker stop e-coma-container
docker run -d --name e-coma-container e-coma:previous
```

### Self-Hosted
```bash
# Using PM2
pm2 stop e-coma
git reset --hard HEAD~1
npm run build
pm2 restart e-coma
```

---

## Scaling

### Horizontal Scaling

**Vercel:** Automatic scaling based on traffic

**Docker/K8s:**
```yaml
# kubernetes-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: e-coma
spec:
  replicas: 3
  selector:
    matchLabels:
      app: e-coma
  template:
    metadata:
      labels:
        app: e-coma
    spec:
      containers:
      - name: e-coma
        image: e-coma:latest
        ports:
        - containerPort: 3000
```

### Database Scaling

**Supabase:** Upgrade to Pro plan for:
- More concurrent connections
- Automatic backups
- Point-in-time recovery
- Dedicated resources

---

## Backup & Recovery

### Database Backups

```bash
# Automated daily backups (Supabase Pro)
# Or manual backup:
npx supabase db dump -f backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### Application State

```bash
# Backup environment variables
vercel env pull .env.production

# Backup configuration
git tag v1.0.0
git push origin v1.0.0
```

---

## Security Hardening

### 1. Environment Variables
- Never commit secrets
- Use secret management (Vercel Secrets, AWS Secrets Manager)
- Rotate keys regularly

### 2. Headers
Already configured in `next.config.ts`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### 3. Rate Limiting
Implement in API routes:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
```

### 4. HTTPS
- Always use HTTPS in production
- Enable HSTS
- Use strong SSL certificates

---

## Cost Optimization

### Vercel
- Free tier: 100GB bandwidth/month
- Pro: $20/month per member
- Enterprise: Custom pricing

### Supabase
- Free tier: 500MB database, 1GB storage
- Pro: $25/month
- Scale as needed

### Google AI
- Gemini 1.5 Flash: $0.075/1M input tokens
- Monitor usage to control costs

---

## Support & Maintenance

### Regular Tasks
- [ ] Weekly: Review error logs
- [ ] Weekly: Check performance metrics
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review API usage
- [ ] Quarterly: Security audit
- [ ] Quarterly: Database optimization

---

For questions, contact: devops@e-coma.com
