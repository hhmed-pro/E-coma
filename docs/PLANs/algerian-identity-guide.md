# Algerian Identity Protocol - UI Localization Guide

## Task 1: Terminology Overrides (Search & Replace)

### VS Code Find & Replace Patterns (Ctrl+Shift+H, Regex enabled)

```regex
# 1. "Checkout" → "Confirm Order"
FIND:    >Checkout<
REPLACE: >Confirm Order<

FIND:    "Checkout"
REPLACE: "Confirm Order"

FIND:    Checkout:
REPLACE: Confirmation:

# 2. "Revenue" → "Pending Collection" (in UI labels only)
FIND:    >Total Revenue<
REPLACE: >Total Pending Collection<

FIND:    "Total Revenue"
REPLACE: "Total Pending Collection"

FIND:    >Revenue Overview<
REPLACE: >Collection Overview<

# 3. "Submit" → "Confirmer (DZD)" (on action buttons)
FIND:    >Submit<
REPLACE: >Confirmer (DZD)<

FIND:    >Submit Request<
REPLACE: >Envoyer la Demande<

# 4. "Sales" → "Orders" (where it means transactions)
FIND:    >Sales Center<
REPLACE: >Orders Center<

FIND:    Total Sales
REPLACE: Total Orders

# 5. "Add to Cart" → "Add to Couffa" (if present)
FIND:    Add to Cart
REPLACE: Add to Couffa
```

### PowerShell Mass Replace Commands

```powershell
# WARNING: Review each change before applying

# Replace "Total Revenue" with "Total Pending Collection" in views
Get-ChildItem -Path "src\views" -Recurse -Filter "*.tsx" | 
  ForEach-Object { 
    (Get-Content $_.FullName) -replace 'Total Revenue', 'Total Pending Collection' | 
    Set-Content $_.FullName 
  }

# Replace "Checkout" with "Confirm Order"
Get-ChildItem -Path "src" -Recurse -Filter "*.tsx" | 
  ForEach-Object { 
    (Get-Content $_.FullName) -replace '>Checkout<', '>Confirm Order<' | 
    Set-Content $_.FullName 
  }
```

---

## Task 2: "Danger" Color Logic for Returns (Rotour)

### Red Alert Badge Styles

Already implemented in `/operations/logistics/page.tsx`. Here's the reusable pattern:

```tsx
// DANGER BADGE - For Failed Deliveries, Returns, Rotour
<Badge 
  variant="destructive" 
  className="bg-red-600 text-white animate-pulse"
>
  <AlertTriangle className="h-3 w-3 mr-1" />
  12 Rotour
</Badge>

// DANGER CARD - For Returns Dashboard
<Card className="border-2 border-red-500 bg-red-50/50 dark:bg-red-950/20 shadow-red-500/20 shadow-lg">
  <CardHeader className="bg-red-600 text-white rounded-t-lg">
    <CardTitle className="flex items-center gap-2">
      <AlertTriangle className="h-5 w-5" />
      ⚠️ ROTOUR ALERT - Action Required
    </CardTitle>
  </CardHeader>
</Card>

// DANGER STAT BOX
<div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl text-center border-2 border-red-300 dark:border-red-800">
  <p className="text-3xl font-bold text-red-700 dark:text-red-400">12</p>
  <p className="text-sm text-red-600 font-medium">Failed Deliveries</p>
</div>
```

### Status Color Mapping (Algerian COD Reality)

| Status | Color | Tailwind Class | Meaning |
|--------|-------|----------------|---------|
| Confirmed | Green | `bg-green-600` | Ready to ship |
| Delivered | Emerald | `bg-emerald-500` | Cash collected |
| Pending | Yellow | `bg-yellow-500` | Awaiting confirmation |
| **Failed** | **Red** | **`bg-red-600`** | **Lost money - Rotour** |
| **Returned** | **Red** | **`bg-red-600`** | **Product back in stock, money lost** |
| At Carrier | Blue | `bg-blue-500` | In transit |
| Postponed | Orange | `bg-orange-500` | Customer postponed |

---

## Task 3: Navigation Sidebar Icons (Updated)

The `zone-navigation.ts` already has proper icons. Here's the reference:

```typescript
// Zone 1: Operations
icon: Phone,              // Main zone icon (Call Center focus)
pages: [
  { icon: Phone },        // Confirmation Center
  { icon: Truck },        // Logistics & Recovery
]

// Zone 2: Growth  
icon: TrendingUp,         // Main zone icon (Growth metrics)
pages: [
  { icon: Target },       // Ads Manager
  { icon: Palette },      // Creative Studio
]

// Zone 3: Command
icon: Crown,              // Main zone icon (Owner's view)
pages: [
  { icon: Banknote },     // Finance & Insights (CASH, not graphs)
  { icon: Package },      // Sourcing
]
```

### Recommended Icon Overrides for Legacy Sidebar

If updating `config/navigation.tsx`:

```typescript
import { 
  Phone,        // Confirmation
  Truck,        // Logistics
  Banknote,     // Finance (NOT DollarSign - too American)
  TrendingUp,   // Growth
  Package,      // Inventory/Sourcing
  RotateCcw,    // Returns (Rotour)
  AlertTriangle // Danger/Alerts
} from "lucide-react";

// Updated NAV_GROUPS with Algerian labels
export const NAV_GROUPS: NavGroup[] = [
  {
    title: "العمليات (Operations)", 
    icon: Phone, 
    color: "red",
    items: [
      { name: "Confirmation Center", href: "/operations/confirmation", icon: Phone },
      { name: "Logistics & Rotour", href: "/operations/logistics", icon: Truck },
    ]
  },
  {
    title: "النمو (Growth)", 
    icon: TrendingUp, 
    color: "green",
    items: [
      { name: "Ads Manager", href: "/growth/ads", icon: Target },
      { name: "Creative Studio", href: "/growth/creatives", icon: Palette },
    ]
  },
  {
    title: "القيادة (Command)", 
    icon: Crown, 
    color: "purple",
    items: [
      { name: "Finance (Cash Flow)", href: "/command/finance", icon: Banknote },
      { name: "Sourcing", href: "/command/sourcing", icon: Package },
    ]
  },
];
```

---

## Quick Implementation Checklist

- [x] Finance page uses "Pending Collection" not "Revenue"
- [x] Returns/Rotour section has red danger styling
- [x] Navigation has proper zone icons
- [x] Zone layouts show bilingual labels (Arabic + English)
- [ ] Button text changed from "Submit" to "Confirmer (DZD)"
- [ ] "Checkout" replaced with "Confirm Order" globally
- [ ] Primary action buttons use `bg-green-600` for confirmations

---

## Algerian Business Glossary

| Silicon Valley English | Algerian Business English | Arabic |
|------------------------|---------------------------|--------|
| Cart | Couffa | القفة |
| Checkout | Confirm Order | تأكيد الطلب |
| Revenue | Pending Collection | التحصيل المعلق |
| Sales | Orders | الطلبات |
| Returns | Rotour | الروتور |
| Profit | Net Margin | الربح الصافي |
| Submit | Confirmer (DZD) | تأكيد |
| Delivered | Cash Collected | تم التحصيل |
