/**
 * Right Panel Footer Configurations
 * Extracted from RightTabsPanel.tsx to reduce code bloat
 * Each tab ID maps to its icon, title, and description
 */

export interface FooterConfig {
    icon: string;
    title: string;
    description: string;
}

export const FOOTER_CONFIGS: Record<string, FooterConfig> = {
    // Dashboard tabs
    "dash-overview": {
        icon: "📊",
        title: "Revenue Overview",
        description: "Track sales, revenue trends, and financial performance."
    },
    "dash-confirmations": {
        icon: "✅",
        title: "Confirmations",
        description: "Monitor order confirmation rates and pending actions."
    },
    "dash-delivery": {
        icon: "🚚",
        title: "Delivery Stats",
        description: "Track delivery times, success rates, and courier performance."
    },
    "dash-products": {
        icon: "📦",
        title: "Products",
        description: "View best sellers, stock levels, and product analytics."
    },
    "dash-stores": {
        icon: "🏪",
        title: "Stores",
        description: "Compare store performance and regional sales data."
    },

    // Orders page tabs
    "orders": {
        icon: "📋",
        title: "Orders List",
        description: "View and manage all orders with status filters."
    },
    "validation": {
        icon: "✓",
        title: "Validation",
        description: "Validate pending orders and verify customer info."
    },
    "callcenter": {
        icon: "📞",
        title: "Call Center",
        description: "View call history and recordings."
    },
    "inbox": {
        icon: "💬",
        title: "Inbox",
        description: "Customer conversations and messages."
    },
    "companies": {
        icon: "🏢",
        title: "Companies",
        description: "Manage delivery partners and couriers."
    },
    "prices": {
        icon: "💰",
        title: "Prices",
        description: "Configure delivery pricing by wilaya."
    },
    "analytics": {
        icon: "📈",
        title: "Analytics",
        description: "Order statistics and performance charts."
    },
    "geographic": {
        icon: "🗺️",
        title: "Map",
        description: "Geographic distribution of orders."
    },

    // Analytics page tabs
    "profit": {
        icon: "💰",
        title: "Profit Dashboard",
        description: "Track net profit margins and costs."
    },
    "traffic": {
        icon: "🌐",
        title: "Traffic Dashboard",
        description: "Analyze visitor sources and behavior."
    },
    "revenue": {
        icon: "💵",
        title: "Revenue Traffic",
        description: "Revenue attribution by traffic source."
    },

    // Inventory page tabs
    "products": {
        icon: "📦",
        title: "Products",
        description: "Manage your product catalog and variants."
    },
    "offers": {
        icon: "🏷️",
        title: "Offers",
        description: "Create and manage special offers and bundles."
    },
    "stock-in": {
        icon: "📥",
        title: "Stock In",
        description: "Record stock arrivals and supplier purchases."
    },
    "stock-out": {
        icon: "📤",
        title: "Stock Out",
        description: "Track sales, damages, and other stock reductions."
    },

    // Marketing page tabs
    "marketing-overview": {
        icon: "⚡",
        title: "Marketing Overview",
        description: "Access all your marketing tools and performance stats."
    },

    // Settings page tabs
    "general": {
        icon: "⚙️",
        title: "General",
        description: "Manage workspace details and preferences."
    },
    "branding": {
        icon: "🎨",
        title: "Branding",
        description: "Customize logos, colors, and brand voice."
    },
    "team": {
        icon: "👥",
        title: "Team",
        description: "Manage team members and roles."
    },
    "billing": {
        icon: "💳",
        title: "Billing",
        description: "Manage subscription, payment methods, and invoices."
    },
    "notifications": {
        icon: "🔔",
        title: "Notifications",
        description: "Configure alerts and communication preferences."
    },
    "security": {
        icon: "🔒",
        title: "Security",
        description: "Manage password, 2FA, and sessions."
    },

    // Social page tabs
    "manage": {
        icon: "💬",
        title: "Social Content",
        description: "Create and manage your social media posts."
    },
    "create": {
        icon: "💬",
        title: "Social Content",
        description: "Create and manage your social media posts."
    },
    "scheduler": {
        icon: "📅",
        title: "Scheduler",
        description: "Plan and schedule upcoming posts."
    },
    "reviews": {
        icon: "⭐",
        title: "Reviews",
        description: "Monitor and respond to customer reviews."
    },

    // Operations page tabs
    "operations-overview": {
        icon: "🏭",
        title: "Operations",
        description: "Overview of daily operations and logistics."
    },
    "ai-sales-agent": {
        icon: "🤖",
        title: "Sales Agent",
        description: "Configure automated sales interactions."
    },

    // Help Center tabs
    "faq": {
        icon: "❓",
        title: "Help Center",
        description: "Guides, FAQs, and support resources."
    },
    "guides": {
        icon: "❓",
        title: "Help Center",
        description: "Guides, FAQs, and support resources."
    },
    "support": {
        icon: "❓",
        title: "Help Center",
        description: "Guides, FAQs, and support resources."
    },

    // Reports tabs
    "reports-overview": {
        icon: "📑",
        title: "Reports",
        description: "Generate and export business reports."
    },
    "export": {
        icon: "📤",
        title: "Export",
        description: "Export data and reports in various formats."
    },

    // Lab tabs
    "experiments": {
        icon: "🧪",
        title: "Riglify Lab",
        description: "Experimental features and beta testing."
    },

    // Beta Tools tabs
    "brand-kit": {
        icon: "🎨",
        title: "Brand Kit",
        description: "Manage brand assets and consistent identity."
    },
    "funnels": {
        icon: "🌪️",
        title: "Funnels",
        description: "Build and optimize sales funnels."
    },
    "whatsapp": {
        icon: "💬",
        title: "WhatsApp",
        description: "Beta integration for WhatsApp marketing."
    },

    // Product Research tabs
    "research": {
        icon: "🔎",
        title: "Product Research",
        description: "Discover winning products and market trends."
    },
    "trends": {
        icon: "🔎",
        title: "Product Research",
        description: "Discover winning products and market trends."
    },
    "saved-products": {
        icon: "🔎",
        title: "Product Research",
        description: "Discover winning products and market trends."
    },

    // Marketing tabs
    "campaigns": {
        icon: "📣",
        title: "Advertising",
        description: "Manage your ad campaigns and accounts."
    },
    "ads-accounts": {
        icon: "📣",
        title: "Advertising",
        description: "Manage your ad campaigns and accounts."
    },
    "content": {
        icon: "🎨",
        title: "Creative Studio",
        description: "Create and manage content for your brand."
    },
    "social-studio": {
        icon: "🎨",
        title: "Creative Studio",
        description: "Create and manage content for your brand."
    },

    // E-commerce details
    "product-details": {
        icon: "📦",
        title: "Product Details",
        description: "Manage product specifics and view performance."
    },
    "product-analytics": {
        icon: "📦",
        title: "Product Details",
        description: "Manage product specifics and view performance."
    },

    // Social - Listening & Workflows
    "listening": {
        icon: "👂",
        title: "Social Listening",
        description: "Monitor brand mentions and industry trends."
    },
    "workflows": {
        icon: "⚙️",
        title: "Workflows",
        description: "Automate social media tasks and processes."
    },

    // Settings - Extended
    "languages": {
        icon: "🌐",
        title: "Languages",
        description: "Configure supported languages for your store."
    },
    "roles": {
        icon: "🛡️",
        title: "Roles & Permissions",
        description: "Define team roles and access levels."
    },
    "keyword-rules": {
        icon: "⚡",
        title: "Keyword Rules",
        description: "Automate responses based on keywords."
    },
    "response-ai": {
        icon: "🤖",
        title: "Response AI",
        description: "Configure AI-powered customer responses."
    },
    "ai-agents": {
        icon: "🤖",
        title: "AI Agents",
        description: "Manage AI agents for automated tasks."
    },
    "subscription": {
        icon: "✨",
        title: "Subscription",
        description: "View your plan details and usage limits."
    },
    "credits": {
        icon: "💎",
        title: "Credits",
        description: "Track and purchase AI credits."
    },
    "logs": {
        icon: "📋",
        title: "Activity Logs",
        description: "Review system and user activity history."
    },
    "lifecycle": {
        icon: "🔄",
        title: "Lifecycle Stages",
        description: "Configure customer lifecycle stages."
    },

    // Analytics overview
    "overview": {
        icon: "📊",
        title: "Analytics Overview",
        description: "High-level view of your store analytics."
    },

    // Marketing Automation
    "automation": {
        icon: "⚙️",
        title: "Automation",
        description: "Configure marketing automation rules."
    },

    // Reports - Lifecycle & Leaderboard
    "leaderboard": {
        icon: "🏆",
        title: "Leaderboard",
        description: "View top performing products and teams."
    },
};

/**
 * Get footer config for a tab, with fallback
 */
export function getFooterConfig(tabId: string): FooterConfig {
    return FOOTER_CONFIGS[tabId] || {
        icon: "📄",
        title: "Page Info",
        description: "View and manage this section."
    };
}
