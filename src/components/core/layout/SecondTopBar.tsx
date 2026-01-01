"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BarChart3, BarChart, MapPin, Settings, Users, CreditCard, Sparkles, Palette, AlertTriangle, HelpCircle, Flame, Package, Truck, Zap, DollarSign, TrendingUp, Target, Share2, Search, Megaphone } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Page info configuration for pages without sub-tabs
// These pages will show their title/description in the second top-bar middle section
export const PAGE_INFO_CONFIG: Record<string, {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
}> = {

    // Admin pages

    "/admin/team": {
        title: "Team & Security",
        description: "Manage team members, permissions, and account security",
        icon: Users,
        iconColor: "text-slate-400",
    },
    "/admin/billing": {
        title: "Credits & Billing",
        description: "Manage subscription, payments, and AI credits",
        icon: CreditCard,
        iconColor: "text-slate-400",
    },


    // E-Commerce
    "/ecommerce/research": {
        title: "Research Studio - Trending Winners",
        description: "Complete product research hub with trending ads, social topics, search, reports, and tracking",
        icon: Flame,
        iconColor: "text-orange-500",
    },
    "/ecommerce/inventory": {
        title: "Inventory & Store",
        description: "Product catalog and store management",
        icon: Package,
        iconColor: "text-green-500",
    },
    "/ecommerce/orders": {
        title: "Orders & Delivery",
        description: "Manage and track all your orders, delivery performance, and conversion metrics",
        icon: Truck,
        iconColor: "text-blue-500",
    },
    // Social
    "/social/posts-studio": {
        title: "Posts Studio",
        description: "Manage your content, schedule posts, and track engagement",
        icon: BarChart3,
        iconColor: "text-blue-500",
    },
    "/social/creation-studio": {
        title: "Creation Studio",
        description: "Create, design, and publish social media content",
        icon: Sparkles,
        iconColor: "text-purple-500",
    },

    // Marketing Pages (Consolidated)
    "/marketing/ad-accounts": {
        title: "AD Accounts",
        description: "Manage ad accounts and access the anti-ban marketplace",
        icon: Users,
        iconColor: "text-pink-500",
    },
    "/marketing/ads-manager": {
        title: "ADs Manager",
        description: "Create and manage ad campaigns with AI",
        icon: Zap,
        iconColor: "text-pink-500",
    },
    "/marketing/ads-studio": {
        title: "ADs Studio",
        description: "All-in-one analytics and engagement hub",
        icon: TrendingUp,
        iconColor: "text-pink-500",
    },
    "/marketing/commission": {
        title: "Commission Marketing",
        description: "Affiliate marketing and influencer collaborations",
        icon: Share2,
        iconColor: "text-pink-500",
    },

    // New Navigation Pages
    "/sales-dashboard": {
        title: "Sales Center Dashboard",
        description: "Sales performance tracking and overview",
        icon: BarChart,
        iconColor: "text-blue-500",
    },
    "/stock": {
        title: "Embalage & Gestion de stock",
        description: "Packaging and stock management",
        icon: Package,
        iconColor: "text-blue-500",
    },
    "/creatives": {
        title: "Creatives & Centent",
        description: "Manage creative assets and content",
        icon: Palette,
        iconColor: "text-blue-500",
    },
    "/ads": {
        title: "Meta/Tiktok ADS",
        description: "Meta and TikTok ads management",
        icon: Megaphone,
        iconColor: "text-blue-500",
    },
    "/marketing": {
        title: "Marketing",
        description: "Marketing strategy and campaigns",
        icon: TrendingUp,
        iconColor: "text-blue-500",
    },
    "/product-research": {
        title: "Product Reasearch",
        description: "Research and product analysis",
        icon: Search,
        iconColor: "text-blue-500",
    },
};

// Sub-tabs configuration per route
export const SUBTABS_CONFIG: Record<string, { label: string; href: string; param: string }[]> = {
    // E-commerce
    // Orders removed - consolidated page
    // Inventory removed - consolidated page
    // Social - removed creation-studio tabs
    // Marketing - All pages consolidated, sub-tabs removed
};

// Helper to get default tab for a route
export function getDefaultTab(pathname: string): string | null {
    const tabs = SUBTABS_CONFIG[pathname];
    return tabs?.[0]?.param || null;
}
