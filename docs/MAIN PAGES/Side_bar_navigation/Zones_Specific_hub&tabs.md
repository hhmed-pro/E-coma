# Zone-Specific Hub & Tabs Logic

This document details the navigation logic specific to the **Zone Navigation System** (Side Bar).

## Zone Hub Structure

Each "Page" in the Zone Navigation acts as a Hub that aggregates related features into Tabs. This differs from the traditional "Top Bar" view where pages might be standalone or grouped differently.

### Logic & Configuration

The structure is defined in `src/config/zone-navigation.ts`.

**Hierarchy:**

1. **Zone** (e.g., Operations)
    2.  **Page** (e.g., Confirmation Center)
        3.  **Tab** (e.g., Filtering, Automation)

### Zone-Specific Behaviors

* **Badges**: Some pages (like Logistics) display live alert badges (e.g., Returns Count) directly in the sidebar.
* **Default Tabs**: Each page has a default active tab, but deep linking is supported via the `?tab=` query parameter.
* **Role-Based Access**: The "Command" zone is typically restricted or optimized for Business Owners (e.g., default landing on Finance).

## Reference Table

| Zone | Page ID | Tab ID | Linked Feature |
| :--- | :--- | :--- | :--- |
| **Operations** | `confirmation-command` | `filtering` | Order Filtering / Verification |
| | | `automation` | WhatsApp/SMS Automation |
| **Operations** | `logistics-recovery` | `shipping` | Shipping Label Generation |
| | | `returns` | Rotour Management (High Priority) |
| | | `inventory` | Stock Alerts |
| **Growth** | `ads-manager` | `campaigns` | Ad Campaign Table |
| | | `analytics` | ROAS Dashboard |
| **Growth** | `creative-studio` | `production` | AI Content Generators |
| | | `influencers` | Influencer CRM |
| | | `legacy` | Old Tools & TikTok |
| **Command** | `finance` | `cashflow` | Cash Collection View |
| | | `profitability` | Net Profit Calc |
| **Command** | `sourcing` | `research` | Product Spy Tools |
| | | `suppliers` | Supplier Database |
