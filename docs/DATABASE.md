# Database Documentation

Complete guide to the E-coma database schema and Supabase configuration.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Table Relationships](#table-relationships)
- [Row Level Security](#row-level-security)
- [Migrations](#migrations)
- [Queries](#queries)

---

## Overview

E-coma uses **PostgreSQL** via **Supabase** with the following features:

- Row-Level Security (RLS) for data isolation
- Real-time subscriptions
- Full-text search
- Geospatial data (Algerian wilayas)
- Automatic timestamps
- Foreign key constraints

### Database Statistics

- **14 Core Tables**
- **58 Wilayas** (Algerian provinces)
- **1,541 Communes** (municipalities)
- **RLS Policies** on all user-facing tables

---

## Database Schema

### merchants (Users)

Main user/merchant accounts table.

```sql
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  business_name VARCHAR(255),
  
  -- Subscription
  subscription_tier VARCHAR(50) DEFAULT 'free',
    -- Values: 'free', 'tajer', 'imbrator'
  subscription_status VARCHAR(50) DEFAULT 'active',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Legal
  legal_status VARCHAR(50),
    -- Values: 'individual', 'auto_entrepreneur', 'sarl', 'eurl'
  tax_id VARCHAR(50),
  nif VARCHAR(50),
  
  -- Location
  wilaya_code INTEGER REFERENCES wilayas(code),
  commune_code INTEGER,
  address TEXT,
  
  -- Preferences
  language VARCHAR(10) DEFAULT 'fr',
    -- Values: 'ar', 'fr', 'en'
  timezone VARCHAR(50) DEFAULT 'Africa/Algiers',
  
  -- Credits
  ai_credits_balance INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
    -- Values: 'active', 'suspended', 'deleted'
  email_verified BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

**Indexes:**

```sql
CREATE INDEX idx_merchants_email ON merchants(email);
CREATE INDEX idx_merchants_subscription_tier ON merchants(subscription_tier);
CREATE INDEX idx_merchants_wilaya ON merchants(wilaya_code);
```

---

### products

Product catalog.

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100),
  barcode VARCHAR(100),
  
  -- Pricing
  cost_price DECIMAL(10, 2),
  selling_price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  
  -- Inventory
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 10,
  track_inventory BOOLEAN DEFAULT true,
  
  -- Categories
  category VARCHAR(100),
  tags TEXT[],
  
  -- Media
  images TEXT[],
  video_url TEXT,
  
  -- SEO
  seo_title VARCHAR(255),
  seo_description TEXT,
  slug VARCHAR(255),
  
  -- AI Context
  ai_product_description TEXT,
  ai_target_audience TEXT,
  winning_product_score DECIMAL(3, 1),
    -- 0-10 AI score
  
  -- Dimensions
  weight_grams INTEGER,
  dimensions JSONB,
    -- {length, width, height}
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft',
    -- Values: 'draft', 'active', 'archived'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

**Indexes:**

```sql
CREATE INDEX idx_products_merchant ON products(merchant_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_sku ON products(sku);
```

---

### orders

Customer orders.

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Customer Info
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  
  -- Delivery
  wilaya_code INTEGER REFERENCES wilayas(code),
  commune_code INTEGER,
  address TEXT NOT NULL,
  delivery_notes TEXT,
  
  -- Products
  items JSONB NOT NULL,
    -- [{product_id, name, quantity, price}]
  
  -- Pricing
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  
  -- Payment
  payment_method VARCHAR(50) DEFAULT 'cod',
    -- Values: 'cod', 'baridimob', 'cib', 'bank_transfer'
  payment_status VARCHAR(50) DEFAULT 'pending',
    -- Values: 'pending', 'paid', 'refunded'
  
  -- Fulfillment
  status VARCHAR(50) DEFAULT 'pending',
    -- Values: 'pending', 'confirmed', 'ready_to_ship', 
    -- 'shipped', 'in_transit', 'delivered', 'returned', 'cancelled'
  confirmation_status VARCHAR(50) DEFAULT 'pending',
    -- Values: 'pending', 'sms_sent', 'call_center', 'confirmed', 'cancelled'
  
  -- Delivery Provider
  delivery_provider VARCHAR(50),
    -- Values: 'yalidine', 'maystro', 'nordest'
  tracking_number VARCHAR(100),
  
  -- Risk Analysis
  return_risk_score DECIMAL(3, 1),
    -- 0-10 AI prediction
  blacklisted BOOLEAN DEFAULT false,
  
  -- Timestamps
  confirmed_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

**Indexes:**

```sql
CREATE INDEX idx_orders_merchant ON orders(merchant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_confirmation_status ON orders(confirmation_status);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

---

### order_events

Order activity timeline.

```sql
CREATE TABLE order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES merchants(id),
  
  -- Event Details
  event_type VARCHAR(50) NOT NULL,
    -- Values: 'created', 'confirmed', 'sms_sent', 'called', 
    -- 'gps_collected', 'shipped', 'delivered', 'returned', 'cancelled'
  event_data JSONB,
    -- Additional event metadata
  
  -- User Action
  performed_by UUID REFERENCES merchants(id),
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

### wilayas

Algerian provinces (58 total).

```sql
CREATE TABLE wilayas (
  code INTEGER PRIMARY KEY,
  name_ar VARCHAR(100) NOT NULL,
  name_fr VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  
  -- Geographic Data
  region VARCHAR(50),
    -- Values: 'center', 'east', 'west', 'south'
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Delivery
  delivery_zone INTEGER,
    -- Zone for pricing (1-4)
  base_delivery_fee DECIMAL(10, 2),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

**Sample Data:**

```sql
INSERT INTO wilayas (code, name_ar, name_fr, name_en, region) VALUES
  (16, 'الجزائر', 'Alger', 'Algiers', 'center'),
  (31, 'وهران', 'Oran', 'Oran', 'west'),
  (25, 'قسنطينة', 'Constantine', 'Constantine', 'east'),
  (1, 'أدرار', 'Adrar', 'Adrar', 'south');
```

---

### communes

Algerian municipalities (1,541 total).

```sql
CREATE TABLE communes (
  code INTEGER PRIMARY KEY,
  wilaya_code INTEGER REFERENCES wilayas(code),
  name_ar VARCHAR(100) NOT NULL,
  name_fr VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  
  postal_code VARCHAR(10),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

### delivery_providers

Delivery company integrations.

```sql
CREATE TABLE delivery_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Provider Info
  name VARCHAR(100) NOT NULL,
    -- 'yalidine', 'maystro', 'nordest'
  display_name VARCHAR(100),
  logo_url TEXT,
  
  -- API Configuration
  api_endpoint TEXT,
  api_key_encrypted TEXT,
  webhook_url TEXT,
  
  -- Pricing
  pricing_tiers JSONB,
    -- [{zone, price, weight_limit}]
  
  -- Features
  features JSONB,
    -- {tracking, cod_collection, returns, insurance}
  
  -- Coverage
  supported_wilayas INTEGER[],
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

### wallets

AI credits and transactions.

```sql
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE UNIQUE,
  
  balance INTEGER DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'credits',
  
  -- Monthly Allowance
  monthly_allowance INTEGER DEFAULT 0,
  allowance_used_this_month INTEGER DEFAULT 0,
  allowance_reset_date DATE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

### wallet_transactions

Credit usage history.

```sql
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES merchants(id),
  
  -- Transaction Details
  type VARCHAR(50) NOT NULL,
    -- Values: 'usage', 'purchase', 'refund', 'bonus', 'allowance'
  amount INTEGER NOT NULL,
    -- Negative for usage, positive for additions
  
  -- Context
  description TEXT,
  feature_id VARCHAR(100),
    -- Which feature consumed credits
  resource_id UUID,
    -- Related resource (e.g., generated content ID)
  
  -- Balance
  balance_before INTEGER,
  balance_after INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

### agency_ad_accounts

Ad account management for agencies.

```sql
CREATE TABLE agency_ad_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  
  -- Account Info
  platform VARCHAR(50) NOT NULL,
    -- Values: 'meta', 'tiktok', 'snapchat', 'google'
  account_id VARCHAR(255) NOT NULL,
  account_name VARCHAR(255),
  
  -- Access
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Business
  business_id VARCHAR(255),
  business_name VARCHAR(255),
  
  -- Limits
  daily_budget_limit DECIMAL(10, 2),
  monthly_spend_limit DECIMAL(10, 2),
  current_month_spend DECIMAL(10, 2) DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
    -- Values: 'active', 'suspended', 'expired'
  health_status VARCHAR(50) DEFAULT 'healthy',
    -- Values: 'healthy', 'warning', 'critical'
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

### generated_content

AI-generated content storage.

```sql
CREATE TABLE generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  
  -- Content Details
  content_type VARCHAR(50) NOT NULL,
    -- Values: 'ad_copy', 'caption', 'hook', 'article', 'description'
  content TEXT NOT NULL,
  
  -- Context
  prompt TEXT,
  context_data JSONB,
  
  -- Quality Metrics
  quality_score DECIMAL(3, 1),
  engagement_prediction DECIMAL(3, 1),
  
  -- AI Model
  model_used VARCHAR(50) DEFAULT 'gemini-1.5-flash',
  tokens_used INTEGER,
  credits_consumed INTEGER,
  
  -- Usage
  used_in_campaign BOOLEAN DEFAULT false,
  performance_data JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

## Table Relationships

```
merchants (1) ──────< (many) products
merchants (1) ──────< (many) orders
merchants (1) ───── (1) wallets
merchants (1) ──────< (many) agency_ad_accounts
merchants (1) ──────< (many) generated_content

orders (1) ──────< (many) order_events
orders (many) >───── (1) wilayas
wilayas (1) ──────< (many) communes

wallets (1) ──────< (many) wallet_transactions
```

**Entity Relationship Diagram:**

```
┌──────────────┐
│   merchants  │
└───────┬──────┘
        │
        ├─────< products
        ├─────< orders ────< order_events
        ├─────< agency_ad_accounts
        ├─────< generated_content
        └───── wallets ────< wallet_transactions
        
orders >───── wilayas ────< communes
```

---

## Row Level Security

### Enable RLS

```sql
-- Enable RLS on all user tables
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
-- ... etc
```

### Policies

#### merchants

```sql
-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON merchants FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile"
  ON merchants FOR UPDATE
  USING (auth.uid() = id);
```

#### products

```sql
-- Users can manage their own products
CREATE POLICY "Users can manage own products"
  ON products FOR ALL
  USING (merchant_id = auth.uid());
```

#### orders

```sql
-- Users can manage their own orders
CREATE POLICY "Users can manage own orders"
  ON orders FOR ALL
  USING (merchant_id = auth.uid());
```

---

## Migrations

### Migration Files

Located in `supabase/migrations/`

**001_initial_schema.sql** - Initial database setup

- Create all tables
- Add indexes
- Set up RLS policies
- Insert wilaya/commune data

### Running Migrations

**Local Development:**

```bash
npx supabase db push
```

**Production:**

```bash
# Via Supabase Dashboard
# SQL Editor → Paste migration → Run

# Or via CLI
npx supabase db push --project-ref your-project-ref
```

### Creating New Migrations

```bash
# Create new migration file
npx supabase migration new add_feature_x

# Edit: supabase/migrations/TIMESTAMP_add_feature_x.sql
# Then push
npx supabase db push
```

---

## Queries

### Common Query Patterns

#### Get Merchant with Credits

```sql
SELECT 
  m.*,
  w.balance as credit_balance,
  w.monthly_allowance,
  w.allowance_used_this_month
FROM merchants m
LEFT JOIN wallets w ON w.merchant_id = m.id
WHERE m.id = $1;
```

#### Get Orders with Products

```sql
SELECT 
  o.*,
  w.name_fr as wilaya_name,
  jsonb_array_length(o.items) as item_count
FROM orders o
LEFT JOIN wilayas w ON w.code = o.wilaya_code
WHERE o.merchant_id = $1
  AND o.status = 'confirmed'
ORDER BY o.created_at DESC
LIMIT 50;
```

#### Revenue Analytics

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as order_count,
  SUM(total_amount) as revenue,
  AVG(total_amount) as avg_order_value
FROM orders
WHERE merchant_id = $1
  AND status = 'delivered'
  AND created_at >= $2
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

#### Top Products

```sql
SELECT 
  p.id,
  p.name,
  COUNT(o.id) as order_count,
  SUM((item->>'quantity')::INTEGER) as units_sold,
  SUM((item->>'price')::DECIMAL * (item->>'quantity')::INTEGER) as revenue
FROM products p
JOIN orders o ON o.merchant_id = p.merchant_id
CROSS JOIN LATERAL jsonb_array_elements(o.items) as item
WHERE p.merchant_id = $1
  AND item->>'product_id' = p.id::TEXT
  AND o.status = 'delivered'
GROUP BY p.id, p.name
ORDER BY revenue DESC
LIMIT 10;
```

#### Wilaya Performance

```sql
SELECT 
  w.code,
  w.name_fr as wilaya,
  COUNT(o.id) as order_count,
  SUM(o.total_amount) as revenue,
  AVG(o.return_risk_score) as avg_risk
FROM wilayas w
LEFT JOIN orders o ON o.wilaya_code = w.code
  AND o.merchant_id = $1
  AND o.created_at >= $2
GROUP BY w.code, w.name_fr
ORDER BY revenue DESC;
```

---

## Database Optimization

### Indexes

All critical columns are indexed:

- Foreign keys
- Status fields
- Date fields for sorting
- Search fields

### Query Performance

```sql
-- Analyze query performance
EXPLAIN ANALYZE
SELECT * FROM orders WHERE merchant_id = $1;

-- Check table sizes
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

For Supabase setup, see [Setup Guide](SETUP.md).
