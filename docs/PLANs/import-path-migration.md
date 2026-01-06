# Anti-Gravity Import Path Migration Guide

## Quick Reference: Path Mappings

Use VS Code's **Find and Replace** (Ctrl+Shift+H) with **Regex enabled** for these patterns:

---

## Zone 1: Operations

### FilteringCalling (Orders & Confirmation)

```
FIND:    @/app/(ecommerce|sales-dashboard)/_components/(orders)/
REPLACE: @/views/Operations/ConfirmationCommand/FilteringCalling/
```

| Old Path | New Path |
|----------|----------|
| `@/app/ecommerce/_components/orders/ReturnRiskCalculator` | `@/views/Operations/ConfirmationCommand/FilteringCalling/ReturnRiskCalculator` |
| `@/app/sales-dashboard/_components/CallCenterScripts` | `@/views/Operations/ConfirmationCommand/FilteringCalling/CallCenterScripts` |
| `@/app/ecommerce/_components/orders/OrdersAiScores` | `@/views/Operations/ConfirmationCommand/FilteringCalling/OrdersAiScores` |

### Shipping

```
FIND:    @/app/ecommerce/_components/delivery/
REPLACE: @/views/Operations/LogisticsRecovery/Shipping/
```

### Inventory

```
FIND:    @/app/ecommerce/_components/inventory/(Stock|Carrier|LowStock|Delivery)
REPLACE: @/views/Operations/LogisticsRecovery/Inventory/$1
```

---

## Zone 2: Growth

### AdsManager/Campaigns

```
FIND:    @/app/marketing/_components/campaigns/
REPLACE: @/views/Growth/AdsManager/Campaigns/
```

```
FIND:    @/app/ads/_components/DeliveryRateKPI
REPLACE: @/views/Growth/AdsManager/Campaigns/DeliveryRateKPI
```

### CreativeStudio/Production

```
FIND:    @/app/creatives/_components/(DarjaOptimizer|kanban/)
REPLACE: @/views/Growth/CreativeStudio/Production/$1
```

### CreativeStudio/Influencers

```
FIND:    @/app/marketing/_components/(RequestUGC|UGCService|tabs/Influenceurs)
REPLACE: @/views/Growth/CreativeStudio/Influencers/$1
```

---

## Zone 3: Command

### Finance/CashFlow

```
FIND:    @/app/analytics/_components/CashCollector
REPLACE: @/views/Command/Finance/CashFlow/CashCollector
```

```
FIND:    @/app/ecommerce/_components/orders/CodCashTracker
REPLACE: @/views/Command/Finance/CashFlow/CodCashTracker
```

### Finance/Profitability

```
FIND:    @/app/analytics/_components/(Profit|NetProfit|RevenueProfit)
REPLACE: @/views/Command/Finance/Profitability/$1
```

### Finance/Utilities

```
FIND:    @/app/analytics/_components/IFUCalculator
REPLACE: @/views/Command/Finance/Utilities/IFUCalculator
```

### Sourcing/Suppliers

```
FIND:    @/app/product-research/_components/SupplierDatabase
REPLACE: @/views/Command/Sourcing/Suppliers/SupplierDatabase
```

---

## UI Label Replacements (Algerian Market)

Use VS Code Find & Replace (case-insensitive):

| Find | Replace |
|------|---------|
| `"Cart"` | `"Couffa"` |
| `"Basket"` | `"Couffa"` |
| `"Revenue"` | `"Cash Collection"` |
| `"Sales"` | `"Pending COD"` |
| `"Returns"` | `"Rotour"` |
| `"Checkout"` | `"Confirm Order"` |

---

## tsconfig.json Path Alias (Optional)

Add to `compilerOptions.paths` for cleaner imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/views/*": ["./src/views/*"],
      "@/ops/*": ["./src/views/Operations/*"],
      "@/growth/*": ["./src/views/Growth/*"],
      "@/command/*": ["./src/views/Command/*"],
      "@/legacy/*": ["./src/legacy/*"]
    }
  }
}
```
