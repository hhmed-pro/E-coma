# Architecture Documentation

This document explains the system architecture, design patterns, and technical decisions in E-coma.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture Patterns](#architecture-patterns)
- [Application Structure](#application-structure)
- [Layout System](#layout-system)
- [State Management](#state-management)
- [Routing & Navigation](#routing--navigation)
- [Data Flow](#data-flow)
- [Design Patterns](#design-patterns)
- [Performance Optimizations](#performance-optimizations)

---

## Overview

E-coma follows a **modular, feature-based architecture** built on Next.js 15 App Router with TypeScript. The system is designed for scalability, maintainability, and developer experience.

### Key Architectural Principles

1. **Feature-Based Organization** - Code organized by business feature, not technical layer
2. **Separation of Concerns** - Clear boundaries between UI, logic, and data
3. **Context-Driven UI** - Dynamic interfaces that adapt to user context
4. **Progressive Enhancement** - Core functionality works, enhanced features gracefully degrade
5. **Type Safety** - Comprehensive TypeScript typing throughout

---

## Architecture Patterns

### 1. Next.js App Router (File-Based Routing)

```
src/app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Home/Hub page
├── hub/                    # Main dashboard hub
├── analytics/
│   ├── layout.tsx         # Analytics layout
│   └── page.tsx           # Analytics page
├── marketing/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ads-manager/
│       ├── page.tsx       # /marketing/ads-manager
│       └── _components/   # Private components (not routes)
└── api/
    └── marketing/
        └── generate/
            └── route.ts   # API endpoint
```

**Benefits:**

- Automatic code splitting per route
- Nested layouts with shared UI
- Parallel and intercepting routes support
- Server and client components co-located

---

## Application Structure

### Layer Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Pages, Layouts, UI Components)        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│  (Hooks, Contexts, State Management)    │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Data Access Layer               │
│  (API Routes, Supabase Clients)         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         External Services               │
│  (Supabase, Google AI, Delivery APIs)   │
└─────────────────────────────────────────┘
```

### Component Hierarchy

```
RootLayout (Providers)
├── LayoutWrapper (Context Providers)
│   ├── WindowLayoutContext
│   ├── ModeContext (Admin/Team switching)
│   ├── ScrollContext
│   ├── HelpContext
│   └── PageActionsContext
│       │
│       ├── ZoneSidebar / IconSidebar (Left Navigation)
│       ├── TopNavigation (Collapsible Header)
│       ├── PageHeader (Title, Actions Slot)
│       ├── Page Content (Dynamic)
│       ├── Dialogs/Sheets (Unified Modal System)
│       └── EcosystemBar (Bottom Status Bar)
```

### Layout Component Inventory

The layout system comprises **27 components** in `src/components/core/layout/`:

| Component | Purpose |
|-----------|--------- |
| `LayoutWrapper.tsx` | Root layout with all context providers |
| `IconSidebar.tsx` | Traditional icon-based navigation |
| `ZoneSidebar.tsx` | Zone-based navigation sidebar |
| `ZoneLayoutWrapper.tsx` | Zone layout container |
| `UltimateSidebar.tsx` | Enhanced sidebar with all features |
| `TopNavigation.tsx` | Collapsible header navigation |
| `EcosystemBar.tsx` | Bottom status bar with AI agents |
| `ProfileMenu.tsx` | User profile and settings menu |
| `SessionControlPanel.tsx` | Session and team management |
| `PageTabsNavigation.tsx` | Tab-based page navigation |
| `ModeContext.tsx` | Admin/Team mode switching |
| `WindowLayoutContext.tsx` | Window state management |

---

## Layout System

### Multi-Context Provider Architecture

The layout system uses **6 nested React contexts** for sophisticated state management:

#### 1. WindowLayoutContext

```typescript
interface WindowLayoutState {
  isFullscreen: boolean;
  sidebarCollapsed: boolean;
  rightPanelOpen: boolean;
  bottomBarVisible: boolean;
}
```

**Purpose:** Global window state management

#### 2. ModeContext

```typescript
interface ModeState {
  mode: 'admin' | 'team';
  activeTeam: Team | null;
  sessionActive: boolean;
}
```

**Purpose:** Admin/Team mode switching and session management

#### 3. ScrollContext

```typescript
interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down';
  isAtTop: boolean;
  isAtBottom: boolean;
}
```

**Purpose:** Scroll-aware UI adaptations

#### 4. HelpContext

```typescript
interface HelpState {
  isOpen: boolean;
  currentPage: string;
  searchQuery: string;
}
```

**Purpose:** Contextual help system

#### 5. PageActionsContext

```typescript
interface PageActionsState {
  actions: Action[];
  primaryAction: Action | null;
}
```

**Purpose:** Page-specific action buttons

#### 6. ThemeProvider

```typescript
type Theme = 'light' | 'dark' | 'system';
```

**Purpose:** Dark/light mode management

### Layout Components

#### IconSidebar

- Fixed left sidebar with icon navigation
- Expandable popup menus on hover
- Category-based organization
- Active state tracking

#### TopNavigation

- Collapsible header with breadcrumbs
- Auto-hides on scroll down
- Profile menu and quick actions
- Search command palette trigger

#### Unified Modal System (Dialog/Sheet)

- Dialogs for focused, critical tasks
- Sheets for side panels and filters
- Command Palette for navigation

#### ProfileMenu

- Context-aware sidebar
- AI agents panel
- Quick actions
- Category-specific tools

#### EcosystemBar

- Bottom status bar
- Module health indicators
- Quick access to AI agents
- Connection status

#### PageHeader Action Toolbars

- Action toolbars (QuickActionsBar) are moved into the `actions` prop of `PageHeader`.
- Uses `variant="inline"` for seamless integration.
- Provides consistent placement of page-level primary and secondary actions.

---

## State Management

### State Management Strategy

```
┌──────────────────────────────────────────┐
│     Server State (Supabase)              │
│  - User data, orders, products           │
│  - Managed by Supabase client            │
└──────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────┐
│     Global State (Zustand)               │
│  - Favorites, recent pages               │
│  - User preferences                      │
└──────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────┐
│     Layout State (Context API)           │
│  - UI state (panels, scroll, theme)      │
│  - 6 nested contexts                     │
└──────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────┐
│     Local State (useState)               │
│  - Component-specific state              │
│  - Form inputs, modals, filters          │
└──────────────────────────────────────────┘
```

### When to Use Each

**Supabase (Server State):**

- User authentication
- Database records
- File storage
- Real-time subscriptions

**Zustand (Global Client State):**

- Cross-component data
- User preferences
- App-wide settings
- Non-persistent UI state

**Context API (Layout State):**

- Layout configuration
- Theme settings
- UI panel states
- Scroll behavior

**useState (Local State):**

- Form inputs
- Component visibility
- Temporary selections
- Loading states

---

## Routing & Navigation

### Zone-Based Navigation (Anti-Gravity Architecture)

E-coma uses a **3-zone navigation system** optimized for Algerian COD e-commerce workflows:

```
┌─────────────────────────────────────────────────────────────┐
│                      ZONE NAVIGATION                        │
├─────────────────────────────────────────────────────────────┤
│  🔴 OPERATIONS        │  🟢 GROWTH          │  🟣 COMMAND    │
│  (Daily Tasks)        │  (Scale Business)   │  (Strategy)    │
├───────────────────────┼─────────────────────┼────────────────┤
│  • Confirmation       │  • Ads Manager      │  • Finance     │
│  • Logistics          │  • Creative Studio  │  • Sourcing    │
│  • Recovery (Rotour)  │  • Influencers      │  • Insights    │
└───────────────────────┴─────────────────────┴────────────────┘
```

Configuration in `src/config/zone-navigation.ts`:

```typescript
export const ZONE_NAVIGATION: ZoneNavigation = {
  zones: [
    {
      id: "operations",
      label: "Operations",
      labelAr: "العمليات",
      color: "#EF4444", // Red
      pages: [
        { id: "confirmation-command", route: "/operations/confirmation" },
        { id: "logistics-recovery", route: "/operations/logistics" }
      ]
    },
    {
      id: "growth",
      label: "Growth",
      labelAr: "النمو",
      color: "#22C55E", // Green
      pages: [
        { id: "ads-manager", route: "/growth/ads" },
        { id: "creative-studio", route: "/growth/creatives" }
      ]
    },
    {
      id: "command",
      label: "Command",
      labelAr: "القيادة",
      color: "#8B5CF6", // Purple
      pages: [
        { id: "finance", route: "/command/finance" },
        { id: "sourcing", route: "/command/sourcing" }
      ]
    }
  ]
};
```

### Legacy Route Structure

Traditional routes still supported for backward compatibility:

```typescript
// Main navigation categories
const categories = [
  'admin',            // Settings & administration
  'ads',              // Ad management  
  'analytics',        // Business intelligence
  'creatives',        // Content creation
  'ecommerce',        // E-commerce operations
  'help',             // Help center
  'hub',              // Main dashboard
  'marketing',        // Marketing tools
  'product-research', // Market research
  'sales-dashboard',  // Orders & delivery
  'stock'             // Inventory management
];
```

### 3.1 Views Architecture (`src/views/`)

The application uses a **Zone-Based Architecture** organizing the 7 functional modules into 3 strategic zones. This structure aligns the codebase with the business logic.

#### Zones & Modules Map

| **Zone** | **Focus** | **Primary Modules (Routes)** | **Legacy Module ID** |
| :--- | :--- | :--- | :--- |
| **🔴 OPERATIONS** | *Run the Business* | **Confirmation** (`/operations/confirmation`)<br>**Logistics** (`/operations/logistics`) | 01 (Centre de Confirmation)<br>03 (Entrepôt) |
| **🟢 GROWTH** | *Grow the Business* | **Ads Manager** (`/growth/ads-manager`)<br>**Creative Studio** (`/growth/creative-studio`)<br>**Marketing** (`/growth`)* | 06 (Gestionnaire Pubs)<br>05 (Studio Créatif)<br>07 (Marketing & Growth) |
| **🟣 COMMAND** | *Strategize* | **Finance** (`/command/finance`)<br>**Sourcing** (`/command/sourcing`) | 02 (Tableau de Bord)<br>04 (Découverte Produits) |

> *\*Note: Module 07 (Marketing) features are currently being integrated into the Growth zone.*

### 3.2 Navigation Levels

The application implements a 3-tier navigation system:

1. **Zone Navigation (Sidebar)**: High-level switching between Operations, Growth, and Command.
    - *Config:* `src/config/zone-navigation.ts`
2. **Module Navigation (Sidebar/Grid)**: Access to specific functional modules (the 7 Pages).
    - *Legacy Config:* `src/config/navigation.tsx`
3. **Feature Navigation (Tabs)**: Deep navigation within a module (e.g., "Filtering", "Automation" tabs).
    - *Implementation:* Local `Tabs` components in `src/views/`.

### 3.3 Component Hierarchy

Reusable view components in `src/views/` organized by zone:

```
src/views/
├── Command/
│   ├── Finance/          # Cash flow, profitability, utilities
│   └── Sourcing/         # Product research, suppliers
├── Growth/
│   ├── AdsManager/       # Campaign management
│   └── CreativeStudio/   # Content production, influencers
└── Operations/
    ├── ConfirmationCommand/  # Filtering, calling, automation
    └── LogisticsRecovery/    # Shipping, returns, inventory
```

### Dynamic Navigation Configuration

Navigation is centralized in `src/config/navigation.tsx`:

```typescript
export const navigationConfig = {
  categories: [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      href: '/analytics',
      subItems: [
        { label: 'Dashboard', href: '/analytics' },
        { label: 'Reports', href: '/analytics/reports' }
      ]
    }
  ]
};
```

### Breadcrumb Generation

Automatic breadcrumbs from URL:

```
/marketing/ads-manager → Marketing > Ads Manager
/operations/logistics → Operations > Logistics & Recovery
```

---

## Data Flow

### Client → Server Flow

```
User Action
    ↓
React Component
    ↓
Event Handler
    ↓
API Route (Next.js)
    ↓
Business Logic
    ↓
Supabase Client
    ↓
PostgreSQL Database
```

### Server → Client Flow

```
Database Change
    ↓
Supabase Realtime
    ↓
Client Subscription
    ↓
State Update
    ↓
Component Re-render
    ↓
UI Update
```

### AI Generation Flow

```
User Input
    ↓
API Route (/api/marketing/generate)
    ↓
Credit Check (/api/credits/balance)
    ↓
Google Gemini API
    ↓
Response Processing
    ↓
Credit Deduction (/api/credits/use)
    ↓
Return to Client
```

---

## Design Patterns

### 1. Compound Components Pattern

Used for complex UI components:

```typescript
// FeatureCluster with nested components
<FeatureCluster>
  <FeatureCluster.Header>
    <FeatureCluster.Title />
    <FeatureCluster.Actions />
  </FeatureCluster.Header>
  <FeatureCluster.Content>
    {/* Content */}
  </FeatureCluster.Content>
</FeatureCluster>

### 2. Unified Modal System (Dialog, Sheet, Command Palette)

E-coma standardizes all overlay interfaces into three semantic patterns:
- **Dialogs** for focused, critical tasks.
- **Sheets** for context-aware side panels.
- **Command Palette** for global navigation and search.
```

### 2. Render Props Pattern

For flexible composition:

```typescript
<DataTable
  data={orders}
  renderRow={(order) => <OrderRow order={order} />}
  renderEmpty={() => <EmptyState />}
/>
```

### 3. Higher-Order Components (HOC)

For cross-cutting concerns:

```typescript
export const withAuth = (Component) => {
  return (props) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return <Component {...props} user={user} />;
  };
};
```

### 4. Custom Hooks Pattern

Reusable logic extraction:

```typescript
// useSubTab - Manage sub-navigation state
export function useSubTab(defaultTab: string) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  // Logic here
  return { activeTab, setActiveTab };
}
```

### 5. Provider Pattern

For context distribution:

```typescript
export function LayoutWrapper({ children }) {
  return (
    <WindowLayoutProvider>
      <RightPanelProvider>
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </RightPanelProvider>
    </WindowLayoutProvider>
  );
}
```

---

## Performance Optimizations

### Code Splitting

1. **Route-based splitting** - Automatic via Next.js App Router
2. **Component-level splitting** - Dynamic imports for heavy components
3. **Third-party splitting** - Separate chunks for large libraries

```typescript
// Dynamic import for heavy component
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

### Rendering Optimizations

1. **React Server Components** - Default in App Router
2. **Memoization** - Strategic use of useMemo/useCallback
3. **Virtual scrolling** - For large lists
4. **Intersection Observer** - Lazy load images and components

```typescript
// Memoized component
const MemoizedChart = memo(Chart, (prev, next) => {
  return prev.data === next.data;
});
```

### Data Fetching

1. **Server-side rendering** - Initial data in RSC
2. **Parallel requests** - Multiple API calls simultaneously
3. **Request deduplication** - Cache identical requests
4. **Optimistic updates** - Immediate UI feedback

### Asset Optimization

1. **Next.js Image** - Automatic optimization
2. **SVG sprites** - Icon system
3. **Font optimization** - next/font with font display swap
4. **CSS optimization** - Tailwind CSS purging

---

## Security Architecture

### Authentication Flow

```
1. User submits credentials
2. Supabase Auth validates
3. JWT token generated
4. Cookie set (httpOnly, secure)
5. Middleware validates on each request
6. Row-Level Security enforced in DB
```

### Middleware Protection

```typescript
// src/middleware.ts
export async function middleware(request: NextRequest) {
  const supabase = createServerClient(/* ... */);
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user && !isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return response;
}
```

### Data Security

1. **Row-Level Security** - PostgreSQL RLS policies
2. **Input Validation** - Zod schemas
3. **SQL Injection Prevention** - Parameterized queries
4. **XSS Protection** - React auto-escaping
5. **CSRF Protection** - SameSite cookies

---

## Scalability Considerations

### Horizontal Scaling

- **Stateless API routes** - No server-side sessions
- **CDN caching** - Static assets and pages
- **Database connection pooling** - Supabase built-in
- **Edge functions** - Deploy close to users

### Vertical Scaling

- **Efficient queries** - Indexed database columns
- **Lazy loading** - Load data on demand
- **Pagination** - Limit data transfers
- **Caching strategies** - Redis for hot data

### Future Architecture

```
Current: Monolith (Next.js)
    ↓
Phase 2: API Gateway + Microservices
    ↓
Phase 3: Event-Driven Architecture
    ↓
Phase 4: Multi-Region Deployment
```

---

## Development Workflow

### Local Development

```bash
1. npm run dev          # Start dev server
2. Make changes         # Hot reload enabled
3. npm run lint         # Check code quality
4. git commit           # Commit changes
5. Push to branch       # CI/CD triggers
```

### Testing Strategy (Future)

```
Unit Tests (Jest)
    ↓
Integration Tests (Testing Library)
    ↓
E2E Tests (Playwright)
    ↓
Visual Regression (Chromatic)
```

---

## Technology Decisions

### Why Next.js 15?

- Server components for better performance
- Built-in API routes
- Excellent TypeScript support
- Vercel deployment optimization

### Why Supabase?

- PostgreSQL with real-time capabilities
- Built-in authentication
- Row-level security
- Generous free tier

### Why Tailwind CSS?

- Utility-first approach
- Excellent performance
- Design system consistency
- Developer experience

### Why Google Gemini?

- Cost-effective AI ($0.075/1M tokens)
- Fast response times
- Multilingual support
- Context window: 1M tokens

---

## Monitoring & Observability

### Planned Implementation

1. **Error Tracking** - Sentry integration
2. **Performance Monitoring** - Web Vitals tracking
3. **User Analytics** - Posthog/Mixpanel
4. **API Monitoring** - Response times, error rates
5. **Database Monitoring** - Query performance, connection pool

---

## Conclusion

The E-coma architecture is designed for:

- **Rapid development** - Feature-based organization
- **Maintainability** - Clear separation of concerns
- **Scalability** - Modular design and stateless services
- **Developer experience** - Type safety and tooling
- **User experience** - Performance and responsiveness

For questions or clarifications, see [Contributing Guide](CONTRIBUTING.md).
