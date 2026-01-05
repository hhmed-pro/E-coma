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
        description: "Real-time COD Reports, Insights & Wilaya Metrics",
        icon: PieChart,
        color: "from-blue-500/20 to-blue-600/10",
        glowColor: "rgba(59, 130, 246, 0.4)",
        textColor: "text-blue-400",
        pages: [
            {
                name: "Centre de Confirmation",
                href: "/sales-dashboard",
                description: "Gestion des Commandes & Clients",
                image: "/assets/features/sales_wide.svg",
                problemSolution: {
                    problem: "40% return rate in COD e-commerce destroys profit margins",
                    solution: "AI risk scoring per Wilaya + Blacklist + Confirmation workflow"
                },
                subTabs: [
                    { name: "Traitement Commandes", description: "Validation, Appels & Suivi", features: ["Orders Kanban", "Call Scripts", "GPS Collection", "Shipment Tracker"] },
                    { name: "Risque & Clients", description: "Scoring, Blacklist & Historique", features: ["Risk Calculator", "Customer Blacklist", "High-Risk Alerts", "Wilaya Risk Map"] },
                    { name: "Performance Sources", description: "Canaux, ROAS & Conversions", features: ["Orders Volume", "Return Rates", "Traffic Sources", "Conversion Funnel"] },
                    { name: "Comms & Automatisations", description: "SMS, WhatsApp & Bots", features: ["Confirmation Bot", "GPS Bot", "SMS Templates", "Communication Log"] }
                ],
                features: ["Orders Kanban", "Risk Calculator", "Customer Blacklist", "Confirmation Bot", "GPS Collection", "Offline Conversion Sync"]
            },
            {
                name: "Tableau de Bord",
                href: "/analytics",
                description: "Centre de Performance & Statistiques",
                image: "/assets/features/analytics_wide.svg",
                problemSolution: {
                    problem: "COD cash frozen at Yalidine/ProColis, tax compliance chaos",
                    solution: "Cash collector tracks remittances + IFU calculator ensures legal compliance"
                },
                subTabs: [
                    { name: "Vue d'Ensemble", description: "Performance Globale & KPIs", features: ["Revenue Dashboard", "Orders Chart", "Payment Method Analytics", "Creator Earnings"] },
                    { name: "Livraison & Wilayas", description: "Transporteurs & Cartographie", features: ["Carrier Comparison", "Wilaya Heatmap", "Regional Revenue", "Delivery Performance"] },
                    { name: "Finance & Rentabilité", description: "Profits, Coûts & IFU", features: ["Profit Calculator", "IFU Calculator", "Cash Collector", "ROAS Analyzer"] },
                    { name: "Rapports & Outils", description: "Exports & Intégrations", features: ["Report Builder", "Data Integrations", "Scheduled Reports", "Platform Guides"] }
                ],
                features: ["Revenue Dashboard", "Wilaya Heatmap", "Carrier Comparison", "IFU Calculator", "Cash Collector", "Payment Analytics", "Report Builder"]
            },
        ]
    },
    {
        id: "ecommerce",
        title: "E-Commerce",
        description: "Stock, El Hamiz Sourcing & Research Intelligence",
        icon: ShoppingCart,
        color: "from-green-500/20 to-green-600/10",
        glowColor: "rgba(34, 197, 94, 0.4)",
        textColor: "text-green-400",
        pages: [
            {
                name: "Entrepôt",
                href: "/stock",
                description: "Gestion des Stocks, Fournisseurs & Import",
                image: "/assets/features/stock_wide.svg",
                problemSolution: {
                    problem: "Manual stock sync with carriers + Douane compliance risks",
                    solution: "Carrier API sync (Yalidine/ProColis) + Import budget tracker"
                },
                subTabs: [
                    { name: "État du Stock", description: "Inventaire & Vue Globale", features: ["AI Inventory Score", "Product Operations", "Stock Value"] },
                    { name: "Alertes & Mouvements", description: "Réapprovisionnement & Historique", features: ["Low Stock Alerts", "Stock Movements", "AI Reorder Suggestions"] },
                    { name: "Sites & Retours", description: "Emplacements & Suivi Retours", features: ["Stock Locations", "Carrier Sync", "Returns Tracking"] },
                    { name: "Fournisseurs & Import", description: "Sourcing & Douane", features: ["Supplier Database", "China Import", "Import Budget Tracker"] }
                ],
                features: ["AI Inventory Score", "Low Stock Alerts", "Carrier Stock Sync", "Import Budget Tracker", "Supplier Database"]
            },
            {
                name: "Découverte Produits",
                href: "/product-research",
                description: "Recherche Produits Gagnants avec Analyse IA",
                image: "/assets/features/product-research_wide.svg",
                problemSolution: {
                    problem: "Finding local suppliers (El Hamiz/El Eulma) is hard",
                    solution: "Curated Algerian supplier database + competitor ad & price tracker"
                },
                subTabs: [
                    { name: "Recherche & Tendances", description: "Découverte & Tracking", features: ["Product Search", "AI Score", "Tracker Dashboard"] },
                    { name: "Marché Algérien", description: "Tendances Locales", features: ["Algeria Trends", "Trending Ads", "Niche Topics"] },
                    { name: "Fournisseurs & Coûts", description: "Sourcing & Landed Cost", features: ["Supplier Database", "Cost Calculator"] },
                    { name: "Social & Validation", description: "Concurrents & Signaux", features: ["Competitor Tracker", "Social Signals"] }
                ],
                features: ["Product Search", "AI Score", "Algeria Trends", "Supplier Database", "Competitor Tracker"]
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
                name: "Studio Créatif",
                href: "/creatives",
                description: "Création de Contenu IA & Publishing",
                image: "/assets/features/creatives_wide.svg",
                problemSolution: {
                    problem: "Standard French content doesn't convert in DZ market",
                    solution: "Darja optimizer + format presets + AI photo/video editor"
                },
                subTabs: [
                    { name: "Création & IA", description: "AI Copywriter & Hooks", features: ["AI Copywriter", "Hook Generator", "Darja Optimizer"] },
                    { name: "Modèles & Flux", description: "Templates & Pipeline", features: ["Template Library", "Content Kanban", "Scheduler"] },
                    { name: "Marque & Conformité", description: "Brand Voice & Safety", features: ["Brand Voice", "Content Safety", "Format Presets"] },
                    { name: "Outils & TikTok", description: "Monétisation & Qualité", features: ["TikTok Monetization", "Quality Optimizer", "UGC Service"] }
                ],
                features: ["AI Copywriter", "Hook Generator", "Darja Optimizer", "Template Library", "Brand Voice", "TikTok Monetization"]
            }
        ]
    },
    {
        id: "marketing",
        title: "Marketing & ADs",
        description: "Multi-Platform Advertising & AI Copilot Agents",
        icon: Megaphone,
        color: "from-pink-500/20 to-pink-600/10",
        glowColor: "rgba(236, 72, 153, 0.4)",
        textColor: "text-pink-400",
        pages: [
            {
                name: "Gestionnaire Pubs",
                href: "/ads",
                description: "Campagnes, ROAS & Performance Multi-Plateformes",
                image: "/assets/features/ads_wide.svg",
                problemSolution: {
                    problem: "Account bans & hidden forex costs (Squar/Paysera/Wise)",
                    solution: "Account health monitor + currency expense tracker for real costs"
                },
                subTabs: [
                    { name: "Campagnes & ROAS", description: "Gestion & Performance", features: ["Campaign List", "ROAS Tracking", "Delivery Rate"] },
                    { name: "Budget & Règles", description: "Stop-Loss & Devises", features: ["Budget Planner", "Stop-Loss Rules", "Currency Tracker"] },
                    { name: "Trafic & Tunnel", description: "Analytics & Conversions", features: ["Traffic Analytics", "Conversion Funnel", "Landing Pages"] },
                    { name: "Compte & Rapports", description: "Santé & Exports", features: ["Account Health", "Agency Manager", "Reports"] }
                ],
                features: ["Campaign Management", "ROAS Tracking", "Stop-Loss Rules", "Currency Tracker", "Account Health", "Traffic Analytics"]
            },
            {
                name: "Partenariats & Croissance",
                href: "/marketing",
                description: "Influenceurs, Affiliés & Automatisation Marketing",
                image: "/assets/features/marketing_wide.svg",
                problemSolution: {
                    problem: "Finding verified DZ influencers is hard, manual confirmations don't scale",
                    solution: "Influencer marketplace + AI Confirmation Bots"
                },
                subTabs: [
                    { name: "Influenceurs & UGC", description: "Marketplace & Tarifs", features: ["Influencer Discovery", "UGC Creators", "Campaign Briefs", "Performance Tracking"] },
                    { name: "Affiliation", description: "Affiliés & Commissions", features: ["Pay-To-Sell", "Commission Links", "Affiliate Dashboard", "Payout Management"] },
                    { name: "Plateformes & Social", description: "Engagement & Bots", features: ["DM Sales Agent", "DM Support Agent", "Comment Response Agent", "Social Listening"] },
                    { name: "Analyses & Config", description: "KPIs & Paramètres", features: ["Campaign Analytics", "ROI Tracking", "Settings", "Integrations"] }
                ],
                features: ["Influencer Marketplace", "UGC Creators", "Affiliate System", "DM Sales Agent", "DM Support Agent", "Comment Response Agent"]
            },
        ]
    },
    {
        id: "admin",
        title: "Admin",
        description: "Settings, Teams & CCP Billing",
        icon: UserCog,
        color: "from-slate-500/20 to-slate-600/10",
        glowColor: "rgba(100, 116, 139, 0.4)",
        textColor: "text-slate-400",
        pages: [
            {
                name: "General Settings",
                href: "/admin/general",
                description: "Platform configuration & preferences",
                subTabs: [
                    { name: "Profile", description: "Account info", features: ["Company Profile", "Preferences"] }
                ],
                features: ["Company Profile", "Preferences"]
            },
            {
                name: "Team Management",
                href: "/admin/team",
                description: "Manage your team members and permissions",
                subTabs: [
                    { name: "Members", description: "Team accounts", features: ["Add Member", "Roles & Permissions"] }
                ],
                features: ["Teams Dashboard", "Add Member", "Roles & Permissions"]
            },
            {
                name: "Billing & Credits",
                href: "/admin/billing",
                description: "Manage subscription and credits balance",
                subTabs: [
                    { name: "Billing", description: "Invoices & Plans", features: ["Subscription Plan", "Payment Methods"] },
                    { name: "Credits", description: "Usage & Top-up", features: ["Credit Balance", "Top-up Credits"] }
                ],
                features: ["Subscription Plan", "Payment Methods", "Credit Balance", "Top-up Credits"]
            },
            {
                name: "Security & Help",
                href: "/admin/help",
                description: "Security settings and support",
                subTabs: [
                    { name: "Help Center", description: "Guides & Support", features: ["FAQ", "Guides", "Support"] }
                ],
                features: ["FAQ", "Guides", "Support"]
            },
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
