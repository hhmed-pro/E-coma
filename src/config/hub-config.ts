import {
    LayoutDashboard, Package, ShoppingBag, Share2, Zap,
    ShoppingCart, Megaphone, PieChart, UserCog, BarChart, MapPin,
    Search, Calendar, Sparkles, Users, Eye, DollarSign, TrendingUp, Target, CreditCard
} from "lucide-react";

// ============================================================================
// HUB CATEGORY CONFIGURATION
// ============================================================================

// Popularity levels for features (shown as flame emojis)
export type PopularityLevel = 0 | 1 | 2 | 3; // 0=none, 1=🔥, 2=🔥🔥, 3=🔥🔥🔥

export interface FeatureInfo {
    name: string;
    featureId?: string; // Links to feature-favorites-config
    popularity?: PopularityLevel; // 1-3 flames for hot features
}

export interface SubTabInfo {
    name: string;
    description?: string;
    features?: (string | FeatureInfo)[]; // Can be string or FeatureInfo
}

export interface ProblemSolutionInfo {
    problem: string;   // Market pain point
    solution: string;  // How DG solves it
}

export interface PageInfo {
    name: string;
    href: string;
    description?: string; // Page description
    image?: string;       // Page cover image
    problemSolution?: ProblemSolutionInfo; // Market problem and solution
    subTabs?: SubTabInfo[]; // List of sub-tabs with descriptions
    features?: (string | FeatureInfo)[]; // Key features for single page views
}

export interface HubCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;        // Tailwind gradient class
    glowColor: string;    // Glow effect color
    textColor: string;    // Text color class
    pages: PageInfo[];
}

export const HUB_CATEGORIES: HubCategory[] = [
    // Analytics
    {
        id: "analytics",
        title: "Analytics",
        description: "Real-time Reports, Insights & Performance Metrics",
        icon: PieChart,
        color: "from-blue-500/20 to-blue-600/10",
        glowColor: "rgba(59, 130, 246, 0.4)",
        textColor: "text-blue-400",
        pages: [
            {
                name: "Sales Dashboard",
                href: "/sales-dashboard",
                description: "Boost sales & kill returns with AI-driven insights",
                image: "/assets/features/sales_wide.svg",
                problemSolution: {
                    problem: "40% return rate in COD e-commerce destroys profit margins",
                    solution: "AI risk scoring per order + customer blacklist + confirmation workflow"
                },
                subTabs: [
                    { name: "Order Control", description: "Validation & Processing", features: ["Confirmed Orders", "Confirmation Workflow", "Order Packing Mode"] },
                    { name: "Risk Management", description: "Reduce returns & risks", features: ["Return Rate Algo", "Risk Alerts"] },
                    { name: "Logistics", description: "Delivery tracking", features: ["Shipment Tracking"] }
                ],
                features: ["Return Rate Algo", "Risk Alerts", "Confirmed Orders", "Confirmation Workflow", "Order Packing Mode", "Shipment Tracking"]
            },
            {
                name: "Business Analytics",
                href: "/analytics",
                description: "Complete business performance overview",
                image: "/assets/features/analytics_wide.svg",
                problemSolution: {
                    problem: "COD cash frozen at carriers for days, tax compliance chaos",
                    solution: "Cash collector tracks remittances + IFU calculator ensures legal compliance"
                },
                subTabs: [
                    { name: "Performance Overview", description: "Key business metrics", features: ["Business Performance", "Social Performance"] },
                    { name: "Lifecycle Analysis", description: "Customer & Traffic journey", features: ["Clients Life Cycle", "Traffic Life Cycle"] },
                    { name: "Financials", description: "Revenue & Costs", features: ["Revenue Chart", "Cost & Ad Spend Charts"] }
                ],
                features: ["Business Performance", "Social Performance", "Clients Life Cycle", "Traffic Life Cycle", "Revenue Chart", "Cost & Ad Spend Charts"]
            },
        ]
    },
    {
        id: "ecommerce",
        title: "E-Commerce",
        description: "Stock, Products & Research Intelligence",
        icon: ShoppingCart,
        color: "from-green-500/20 to-green-600/10",
        glowColor: "rgba(34, 197, 94, 0.4)",
        textColor: "text-green-400",
        pages: [
            {
                name: "Stock Management",
                href: "/stock",
                description: "Inventory, carriers, sourcing & tools",
                image: "/assets/features/stock_wide.svg",
                problemSolution: {
                    problem: "Manual stock sync with carriers + import law compliance risks",
                    solution: "Carrier API sync for unified inventory + import budget tracker for legal limits"
                },
                subTabs: [
                    { name: "Inventory", description: "Stock levels & Overview", features: ["Inventory Overview", "Product Operations"] },
                    { name: "Sourcing & Logistics", description: "Suppliers & Carriers", features: ["Carrier Stock Sync", "Carrier Comparison", "Supplier Database", "Import Budget"] }
                ],
                features: ["Inventory Overview", "Product Operations", "Carrier Stock Sync", "Carrier Comparison", "Supplier Database", "Import Budget"]
            },
            {
                name: "Product Research",
                href: "/product-research",
                description: "Find winning products and track competitors",
                image: "/assets/features/product-research_wide.svg",
                problemSolution: {
                    problem: "Finding local suppliers is hard, competitor moves go unnoticed",
                    solution: "Curated Algerian supplier database + competitor ad & price tracker"
                },
                subTabs: [
                    { name: "Discovery", description: "Find new products", features: ["Discovery Engine", "Bestseller Trends", "Market Intelligence"] },
                    { name: "Competitor Analysis", description: "Track competition", features: ["Competitor Tracker", "Niche Topics"] }
                ],
                features: ["Discovery Engine", "Bestseller Trends", "Market Intelligence", "Competitor Tracker", "Niche Topics"]
            },
        ]
    },
    {
        id: "social",
        title: "Social Media Content",
        description: "Content Creation, Scheduling & Engagement across All Platforms",
        icon: Share2,
        color: "from-purple-500/20 to-purple-600/10",
        glowColor: "rgba(168, 85, 247, 0.4)",
        textColor: "text-purple-400",
        pages: [
            {
                name: "Creatives & Content",
                href: "/creatives",
                description: "From idea to posting — Create, design, and publish across all platforms",
                image: "/assets/features/creatives_wide.svg",
                problemSolution: {
                    problem: "French content doesn't convert, platform specs differ, editing is expensive",
                    solution: "Darja optimizer + format presets + AI photo/video editor"
                },
                subTabs: [
                    { name: "Create Content", description: "Multi-platform generator", features: ["Content Ideas", "MultiContent Generator"] },
                    { name: "Creative Tools", description: "Optimization tools", features: ["Idea Generation", "Content Creation", "Optimization & Safety"] },
                    { name: "Queue & Scheduler", description: "Publishing management", features: ["Intelligent Queue", "Calendar View"] }
                ]
            }
        ]
    },
    {
        id: "marketing",
        title: "Marketing & ADs",
        description: "Multi-Platform Advertising - Instagram, Facebook & TikTok",
        icon: Megaphone,
        color: "from-pink-500/20 to-pink-600/10",
        glowColor: "rgba(236, 72, 153, 0.4)",
        textColor: "text-pink-400",
        pages: [
            {
                name: "Ads Center",
                href: "/ads",
                description: "Manage campaigns, accounts, and track performance",
                image: "/assets/features/ads_wide.svg",
                problemSolution: {
                    problem: "Frequent account bans, hidden forex costs distort true ROI",
                    solution: "Account health monitor with warnings + currency expense tracker for real costs"
                },
                subTabs: [
                    { name: "Campaign Management", description: "Control your ads", features: ["Campaign Manager", "Account Health", "Budget AI Tips"] },
                    { name: "Safety & Rules", description: "Protection mechanisms", features: ["Stop-Loss Rules", "Currency Tracker"] },
                    { name: "Tools & Analytics", description: "Optimization tools", features: ["Creative Tools", "Traffic Analytics"] }
                ],
                features: ["Campaign Manager", "Account Health", "Budget AI Tips", "Stop-Loss Rules", "Currency Tracker", "Creative Tools", "Traffic Analytics"]
            },
            {
                name: "Marketing & Growth",
                href: "/marketing",
                description: "Scale your business with affiliates, influencers, and automation",
                image: "/assets/features/marketing_wide.svg",
                problemSolution: {
                    problem: "Finding verified influencers is hard, manual confirmations don't scale",
                    solution: "Influencer marketplace with hidden identity + automated confirmation bots"
                },
                subTabs: [
                    { name: "Affiliate Marketing", description: "Partner programs", features: ["Affiliate Hub", "Commission Links"] },
                    { name: "Influencers", description: "Influencer management", features: ["Influencer Hub", "UGC Services"] },
                    { name: "Automation", description: "Marketing bots", features: ["Automation Bots"] }
                ],
                features: ["Affiliate Hub", "Influencer Hub", "Automation Bots", "Commission Links", "UGC Services"]
            },
        ]
    },
    // Admin category excluded from Hub view as requested, but kept in config if needed elsewhere
    {
        id: "admin",
        title: "Admin",
        description: "Settings & Team",
        icon: UserCog,
        color: "from-slate-500/20 to-slate-600/10",
        glowColor: "rgba(100, 116, 139, 0.4)",
        textColor: "text-slate-400",
        pages: [
            { name: "General", href: "/admin/general" },
            { name: "Team", href: "/admin/team" },
            { name: "Billing", href: "/admin/billing" },
            { name: "Credits", href: "/admin/credits" },
            { name: "Security", href: "/admin/security" },
            { name: "Help", href: "/admin/help" },
        ]
    },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a random page from a category
 */
export function getRandomPage(category: HubCategory): { name: string; href: string } {
    const randomIndex = Math.floor(Math.random() * category.pages.length);
    return category.pages[randomIndex];
}

/**
 * Get random pages for all categories (used on hub page load)
 */
export function getRandomPagesForAllCategories(): Map<string, { name: string; href: string }> {
    const result = new Map<string, { name: string; href: string }>();
    HUB_CATEGORIES.forEach(category => {
        result.set(category.id, getRandomPage(category));
    });
    return result;
}
