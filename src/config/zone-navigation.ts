/**
 * Zone-Based Navigation Configuration
 * Anti-Gravity Restructured Navigation for Algerian COD E-commerce
 * 
 * 3 Zones:
 * - Operations (Zone 1): Confirmation, Logistics, Recovery
 * - Growth (Zone 2): Ads Manager, Creative Studio
 * - Command (Zone 3): Finance, Sourcing
 */

import {
    Phone, Truck, RotateCcw, Package,        // Operations
    Target, Palette, Users, Archive,          // Growth
    Banknote, Search, Crown, TrendingUp,      // Command
    Settings, HelpCircle, ToggleRight,        // Global
    type LucideIcon
} from "lucide-react";

// Types
export interface ZoneTab {
    id: string;
    label: string;
    labelAr: string;
    priority?: "HIGH" | "NORMAL";
}

export interface ZonePage {
    id: string;
    label: string;
    labelAr: string;
    icon: LucideIcon;
    route: string;
    isDefault?: boolean;
    isOwnerDefault?: boolean;
    badge?: { type: "alert" | "count"; source?: string };
    tabs?: ZoneTab[];
}

export interface Zone {
    id: string;
    label: string;
    labelAr: string;
    icon: LucideIcon;
    color: string;
    colorClass: string;
    pages: ZonePage[];
}

export interface GlobalSetting {
    id: string;
    label: string;
    labelAr: string;
    icon: LucideIcon;
    location: "header" | "footer";
    tooltip?: string;
}

export interface ZoneNavigation {
    zones: Zone[];
    globalSettings: GlobalSetting[];
}

// Zone Colors
export const ZONE_COLORS = {
    operations: {
        primary: "#EF4444",
        bg: "bg-red-500/10",
        text: "text-red-500",
        border: "border-red-200 dark:border-red-800",
        gradient: "from-red-500/20 to-orange-500/10"
    },
    growth: {
        primary: "#22C55E",
        bg: "bg-green-500/10",
        text: "text-green-500",
        border: "border-green-200 dark:border-green-800",
        gradient: "from-green-500/20 to-emerald-500/10"
    },
    command: {
        primary: "#8B5CF6",
        bg: "bg-purple-500/10",
        text: "text-purple-500",
        border: "border-purple-200 dark:border-purple-800",
        gradient: "from-purple-500/20 to-indigo-500/10"
    }
} as const;

// The Main Navigation Configuration (from implementation plan JSON)
export const ZONE_NAVIGATION: ZoneNavigation = {
    zones: [
        {
            id: "operations",
            label: "Operations",
            labelAr: "العمليات",
            icon: Phone,
            color: ZONE_COLORS.operations.primary,
            colorClass: ZONE_COLORS.operations.text,
            pages: [
                {
                    id: "confirmation-command",
                    label: "Confirmation Center",
                    labelAr: "مركز التأكيد",
                    icon: Phone,
                    route: "/operations/confirmation",
                    isDefault: true,
                    tabs: [
                        { id: "filtering", label: "Filtering & Calling", labelAr: "التصفية والاتصال" },
                        { id: "automation", label: "Automation", labelAr: "الأتمتة" }
                    ]
                },
                {
                    id: "logistics-recovery",
                    label: "Logistics & Recovery",
                    labelAr: "اللوجيستيك والروتور",
                    icon: Truck,
                    route: "/operations/logistics",
                    badge: { type: "alert", source: "returnsCount" },
                    tabs: [
                        { id: "shipping", label: "Shipping", labelAr: "الشحن" },
                        { id: "returns", label: "Rotour", labelAr: "الروتور", priority: "HIGH" },
                        { id: "inventory", label: "Stock", labelAr: "المخزون" }
                    ]
                }
            ]
        },
        {
            id: "growth",
            label: "Growth",
            labelAr: "النمو",
            icon: TrendingUp,
            color: ZONE_COLORS.growth.primary,
            colorClass: ZONE_COLORS.growth.text,
            pages: [
                {
                    id: "ads-manager",
                    label: "Ads Manager",
                    labelAr: "مدير الإعلانات",
                    icon: Target,
                    route: "/growth/ads",
                    tabs: [
                        { id: "campaigns", label: "Campaigns", labelAr: "الحملات" },
                        { id: "analytics", label: "Analytics", labelAr: "التحليلات" }
                    ]
                },
                {
                    id: "creative-studio",
                    label: "Creative Studio",
                    labelAr: "ستوديو الإبداع",
                    icon: Palette,
                    route: "/growth/creatives",
                    tabs: [
                        { id: "production", label: "Production", labelAr: "الإنتاج" },
                        { id: "influencers", label: "Influencers", labelAr: "المؤثرين" },
                        { id: "legacy", label: "Legacy Tools", labelAr: "أدوات قديمة" }
                    ]
                }
            ]
        },
        {
            id: "command",
            label: "Command",
            labelAr: "القيادة",
            icon: Crown,
            color: ZONE_COLORS.command.primary,
            colorClass: ZONE_COLORS.command.text,
            pages: [
                {
                    id: "finance",
                    label: "Finance & Insights",
                    labelAr: "المالية",
                    icon: Banknote,
                    route: "/command/finance",
                    isOwnerDefault: true,
                    tabs: [
                        { id: "cashflow", label: "Cash Flow", labelAr: "السيولة" },
                        { id: "profitability", label: "Profitability", labelAr: "الربحية" },
                        { id: "utilities", label: "Utilities", labelAr: "أدوات" }
                    ]
                },
                {
                    id: "sourcing",
                    label: "Sourcing",
                    labelAr: "المصادر",
                    icon: Package,
                    route: "/command/sourcing",
                    tabs: [
                        { id: "research", label: "Research", labelAr: "البحث" },
                        { id: "suppliers", label: "Suppliers", labelAr: "الموردين" }
                    ]
                }
            ]
        }
    ],
    globalSettings: [
        {
            id: "data-mode-toggle",
            label: "Data Mode (Square Rate)",
            labelAr: "نمط البيانات",
            icon: ToggleRight,
            location: "header",
            tooltip: "Toggle between official rate and Square rate (سعر السكوار)"
        },
        {
            id: "settings",
            label: "Settings",
            labelAr: "الإعدادات",
            icon: Settings,
            location: "footer"
        },
        {
            id: "help",
            label: "Help",
            labelAr: "المساعدة",
            icon: HelpCircle,
            location: "footer"
        }
    ]
};

// Badge counts (mock - would come from API)
export const ZONE_BADGES: Record<string, number> = {
    "operations.logistics-recovery.returns": 12,
    "operations.confirmation-command": 24,
};

// Helper to get zone by ID
export const getZoneById = (zoneId: string): Zone | undefined => {
    return ZONE_NAVIGATION.zones.find(z => z.id === zoneId);
};

// Helper to get page by route
export const getPageByRoute = (route: string): { zone: Zone; page: ZonePage } | undefined => {
    for (const zone of ZONE_NAVIGATION.zones) {
        const page = zone.pages.find(p => route.startsWith(p.route));
        if (page) return { zone, page };
    }
    return undefined;
};

// Algerian Market Label Overrides
export const ALGERIAN_LABELS: Record<string, string> = {
    "Cart": "Couffa",
    "Basket": "Couffa",
    "Revenue": "Cash Collection",
    "Sales": "Pending COD",
    "Returns": "Rotour",
    "Checkout": "Confirm Order",
    "Order": "Couffa"
};
