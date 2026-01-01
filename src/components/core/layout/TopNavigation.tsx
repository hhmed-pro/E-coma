"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import {
    LayoutDashboard, Settings, ShoppingBag, Users, BarChart, Search, Zap, Share2,
    MessageSquare, Palette, Bot, Star, Package, Calendar,
    HelpCircle, FlaskConical, Sparkles, Lightbulb,
    TrendingUp, Target, FileText, Send, Plus, ChevronDown, Clock, AlertTriangle, ChevronRight, ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationCenter } from "@/components/core/ui/notification-center";
import { FullscreenToggle } from "@/components/core/ui/fullscreen-toggle";
import { OnboardingChecklist } from "@/components/core/ui/onboarding-checklist";
import { ProfileMenu } from "./ProfileMenu";
import { NAV_GROUPS, NAV_PAGES, CATEGORY_COLORS, CATEGORY_GLOW_COLORS, BADGE_URGENCY_THRESHOLD, NavGroup, NavItem } from "@/config/navigation";
import { useWindowLayout } from "./WindowLayoutContext";
import { useScroll } from "./ScrollContext";

interface TopNavigationProps {
}

export function TopNavigation({ }: TopNavigationProps) {
    const pathname = usePathname();
    const { isTopNavCollapsed, toggleTopNav } = useWindowLayout();
    const { isScrolled } = useScroll();

    // Use shared config
    const navPages = NAV_PAGES;

    const isActive = useCallback((href: string) => {
        return href === "/" ? pathname === "/" : pathname.startsWith(href);
    }, [pathname]);

    // Handle scroll styles
    const containerClasses = cn(
        "relative z-[70] flex justify-start px-4 transition-all duration-300",
        isScrolled && !isTopNavCollapsed ? "fixed top-0 inset-x-0 pt-2 pb-2 bg-background/80 backdrop-blur-sm" : "",
        isScrolled && isTopNavCollapsed ? "fixed top-0 inset-x-0 pt-2 pb-2" : "",
        !isScrolled ? "pt-4" : "",
        isTopNavCollapsed && !isScrolled ? "h-0 p-0 overflow-hidden opacity-0 pointer-events-none" : "", // Collapse fully when min+top
        'opacity-100'
    );

    const showButton = !isTopNavCollapsed || isScrolled;

    return (
        <div className={containerClasses}>
            {/* Notification & Fullscreen - Fixed to Right Side (hide when collapsed and not scrolled - shown in PageHeader instead) */}
            {(!isTopNavCollapsed || isScrolled) && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                    <NotificationCenter />
                    <FullscreenToggle className="hidden md:flex" />
                </div>
            )}

            <div className={cn("flex items-center gap-3 transition-all duration-300", isTopNavCollapsed ? "ml-0" : "")}>
                {/* Toggle Button - Outside Pill */}
                {showButton && (
                    <button
                        onClick={toggleTopNav}
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border/80 transition-all duration-200 shadow-lg",
                            isTopNavCollapsed && isScrolled ? "translate-x-2" : ""
                        )}
                        title={isTopNavCollapsed ? "Expand Navigation" : "Collapse Navigation"}
                    >
                        {isTopNavCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                )}

                {/* Main Nav Pill - Hidden when collapsed */}
                <nav
                    className={cn(
                        "h-14 border border-border/40 bg-card/85 backdrop-blur-md rounded-full shadow-lg flex items-center px-6 gap-1 overflow-visible relative transition-all duration-300 origin-left",
                        isTopNavCollapsed
                            ? "w-0 opacity-0 overflow-hidden px-0 border-0 scale-95 pointer-events-none"
                            : "w-full max-w-7xl opacity-100 scale-100"
                    )}
                >
                    {/* Subtle Glow Border Effect - Anthropic Orange accent */}
                    {!isTopNavCollapsed && (
                        <>
                            <div className="absolute inset-0 rounded-full ring-1 ring-border/5 pointer-events-none" />
                            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_hsl(var(--accent-orange)/0.05)] pointer-events-none opacity-50 dark:opacity-100" />
                        </>
                    )}

                    {/* Nav Pages - Horizontal Scrollable on smaller screens */}
                    <div className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar mask-linear-fade">
                        {navPages.map((page) => (
                            <Link
                                key={page.href}
                                href={page.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap relative group click-feedback shrink-0 font-[Poppins,Arial,sans-serif]",
                                    isActive(page.href)
                                        ? "bg-[hsl(var(--accent-orange))]/15 text-[hsl(var(--accent-orange))] shadow-[0_0_15px_hsl(var(--accent-orange)/0.25)] nav-active-underline"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                )}
                            >
                                <page.icon className={cn(
                                    "h-3.5 w-3.5 transition-colors",
                                    isActive(page.href) ? "text-[hsl(var(--accent-orange))]" : "text-muted-foreground/70 group-hover:text-foreground/80"
                                )} />
                                <span>{page.name}</span>

                                {/* Badge */}
                                {page.badge && (
                                    <span className={cn(
                                        "ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded-full border",
                                        isActive(page.href)
                                            ? "bg-[hsl(var(--accent-orange))] text-background border-[hsl(var(--accent-orange))]"
                                            : "bg-destructive/20 text-destructive border-destructive/50"
                                    )}>
                                        {page.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions - Profile Only */}
                    <div className="flex items-center gap-2 ml-auto pl-2 border-l border-border/20">
                        {/* Profile Menu - Popup opens left */}
                        <ProfileMenu
                            variant="header"
                            user={{
                                name: "User",
                                email: "user@riglify.com",
                                plan: "Free"
                            }}
                            align="end"
                        />
                    </div>
                </nav>
            </div>
        </div>
    );
}

