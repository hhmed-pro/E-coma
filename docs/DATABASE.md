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

- **13 Core Tables**
- **58 Wilayas** (Algerian provinces)
- **1,541 Communes** (municipalities)
- **RLS Policies** on all user-facing tables

---

## Database Schema

### merchants (Users)

Main user/merchant accounts table.

```sql
CREATE TABLE merchants (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT UNIQUE NOT NULL,
    store_name TEXT,
    phone_number TEXT,
    subscription_tier subscription_tier DEFAULT 'free',
        -- Values: 'free', 'tajer', 'imbrator'
    legal_status legal_status DEFAULT 'individual',
        -- Values: 'individual', 'auto_entrepreneur', 'sarl'
    tax_id TEXT,
    
    -- RBAC Columns
    role user_role DEFAULT 'admin', -- 'admin', 'manager', 'agent', 'viewer'
    owner_id UUID REFERENCES merchants(id), -- If set, this user belongs to the referenced owner
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### products

Product catalog.

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES merchants(id),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER DEFAULT 0,
    image_url TEXT,
    
    -- Localized Logic
    wilaya_id INTEGER REFERENCES wilayas(id),
    commune_id INTEGER REFERENCES communes(id),
    
    -- AI & Pricing
    ai_context TEXT,
    smart_pricing_data JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### orders

Customer orders.

```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES merchants(id),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT,
    wilaya_id INTEGER REFERENCES wilayas(id),
    commune_id INTEGER REFERENCES communes(id),
    
    -- Statuses
    confirmation_status confirmation_status DEFAULT 'pending',
    delivery_status delivery_status DEFAULT 'ready_to_ship',
    order_confidence INTEGER DEFAULT 0, -- 0-10
    
    payment_method payment_method DEFAULT 'cod',
    tracking_number TEXT,
    items JSONB NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### order_events

Order activity timeline.

```sql
CREATE TABLE order_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    event_type event_type NOT NULL,
        -- Values: 'voice_call_attempt', 'whatsapp_gps_received', 'status_change'
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### wilayas

Algerian provinces.

```sql
CREATE TABLE wilayas (
    id INTEGER PRIMARY KEY, -- 1-58
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    name_en TEXT NOT NULL,
    zone_code TEXT,
    delivery_base_rate DECIMAL(10, 2) DEFAULT 0
);
```

### communes

Algerian municipalities.

```sql
CREATE TABLE communes (
    id SERIAL PRIMARY KEY,
    wilaya_id INTEGER REFERENCES wilayas(id),
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    is_stopdesk_available BOOLEAN DEFAULT FALSE
);
```

### delivery_providers

Delivery company integrations.

```sql
CREATE TABLE delivery_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL, -- 'Yalidine', 'Maystro', 'NordEst'
    api_config JSONB,
    is_active BOOLEAN DEFAULT TRUE
);
```

### wallets

AI credits and transactions.

```sql
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES merchants(id),
    balance DECIMAL(10, 2) DEFAULT 0,
    ad_spend_credits DECIMAL(10, 2) DEFAULT 0,
    settings_flags JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### credits_history

Credit usage history.

```sql
CREATE TABLE credits_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID REFERENCES wallets(id),
    amount DECIMAL(10, 2) NOT NULL,
    action_type credit_action_type NOT NULL,
        -- Values: 'generate_product', 'generate_ad', 'top_up', 'ad_spend'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### topup_requests

Wallet top-up requests.

```sql
CREATE TABLE topup_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES merchants(id),
    amount_dzd DECIMAL(10, 2) NOT NULL,
    proof_image_url TEXT,
    status topup_status DEFAULT 'pending_review',
        -- Values: 'pending_review', 'approved', 'rejected'
    admin_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### agency_ad_accounts

Ad account management for agencies.

```sql
CREATE TABLE agency_ad_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL, -- 'facebook', 'tiktok'
    account_id TEXT NOT NULL,
    assigned_merchant_id UUID REFERENCES merchants(id),
    service_fee_percentage DECIMAL(5, 2) DEFAULT 10.0,
    status TEXT DEFAULT 'active'
);
```

### generated_content

AI-generated content storage.

```sql
CREATE TABLE generated_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id),
    media_type TEXT, -- 'video', 'slideshow', 'image'
    dialect TEXT, -- 'darija_algiers', etc.
    sentiment_score DECIMAL(3, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Table Relationships

```
merchants (1) ──────< (many) products
merchants (1) ──────< (many) orders
merchants (1) ───── (1) wallets
merchants (1) ──────< (many) agency_ad_accounts

orders (1) ──────< (many) order_events
orders (many) >───── (1) wilayas
wilayas (1) ──────< (many) communes

wallets (1) ──────< (many) credits_history
```

---

## Row Level Security

RLS policies are configured to ensure data isolation.

### Enable RLS

```sql
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
-- ... (all tables enabled)
```

### Policies

#### Merchants (Role-Based Access)

```sql
-- Users can view own profile
CREATE POLICY "Users can view own profile"
  ON merchants FOR SELECT
  USING (auth.uid() = id);

-- Team Access:
-- Products, Orders, etc. are accessed via `get_my_merchant_id()` function 
-- which resolves to the Owner ID if the user is a team member.

CREATE POLICY "Team can view products"
  ON products FOR SELECT
  USING (merchant_id = get_my_merchant_id());
```

---

## Migrations

### Migration Files

Located in `supabase/migrations/`

- **001_initial_schema.sql** - Initial database setup (tables, types)
- **002_add_rbac_columns.sql** - Adds Role-Based Access Control (roles, owner_id)

### Running Migrations

```bash
npx supabase db push
```

---

## Queries

See `src/lib/supabase` for query implementation examples.
