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
import { CollaborationBar } from "./CollaborationBar";
import { NAV_GROUPS, NAV_PAGES, CATEGORY_COLORS, CATEGORY_GLOW_COLORS, BADGE_URGENCY_THRESHOLD, NavGroup, NavItem } from "@/config/navigation";
import { useWindowLayout } from "./WindowLayoutContext";
import { useScroll } from "./ScrollContext";

interface TopNavigationProps {
}

export function TopNavigation({ }: TopNavigationProps) {
    const pathname = usePathname();
    const { isTopNavCollapsed, toggleTopNav, toggleEcosystemBar, stickyActions } = useWindowLayout();
    const { isScrolled: _isScrolled } = useScroll();
    const isScrolled = true; // Always use compact "scrolled" style

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

    const showButton = true; // Always show toggle button for nav collapse/expand

    return (
        <div className={containerClasses}>
            {/* Sticky Actions - Shown when scrolled (page-specific actions) */}
            {isScrolled && stickyActions && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                    {stickyActions}
                </div>
            )}

            <div className={cn("flex items-center gap-3 transition-all duration-300", isTopNavCollapsed ? "ml-0" : "")}>
                {/* Toggle Button - Outside Pill */}
                {showButton && (
                    <button
                        onClick={() => { toggleTopNav(); toggleEcosystemBar(); }}
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
                        "border border-border/40 bg-card/85 backdrop-blur-md rounded-full shadow-lg flex items-center gap-1 overflow-visible relative transition-all duration-300 origin-left",
                        isTopNavCollapsed
                            ? "w-0 h-14 opacity-0 overflow-hidden px-0 border-0 scale-95 pointer-events-none"
                            : cn(
                                "opacity-100 scale-100",
                                isScrolled ? "w-fit" : "w-full max-w-7xl"
                            ),
                        !isTopNavCollapsed && isScrolled ? "h-9 px-3" : "h-14 px-6"
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
                    <div className={cn(
                        "flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar mask-linear-fade transition-all duration-300",
                        isScrolled ? "pr-[180px]" : "" // Add safe padding for sticky actions
                    )}>
                        {navPages.map((page) => (
                            <Link
                                key={page.href}
                                href={page.href}
                                className={cn(
                                    "flex items-center rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap relative group click-feedback shrink-0 font-[Poppins,Arial,sans-serif]",
                                    isScrolled ? "px-1.5 py-1 gap-1" : "px-3 py-2 gap-2", // Ultra-compact on scroll
                                    isActive(page.href)
                                        ? "bg-[hsl(var(--accent-orange))]/15 text-[hsl(var(--accent-orange))] shadow-[0_0_15px_hsl(var(--accent-orange)/0.25)] nav-active-underline"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                )}
                            >
                                <page.icon className={cn(
                                    "transition-colors",
                                    isScrolled ? "h-3.5 w-3.5" : "h-3.5 w-3.5",
                                    isActive(page.href) ? "text-[hsl(var(--accent-orange))]" : "text-muted-foreground/70 group-hover:text-foreground/80"
                                )} />
                                <span className={cn(
                                    "transition-all duration-300 overflow-hidden whitespace-nowrap",
                                    isScrolled
                                        ? isActive(page.href)
                                            ? "max-w-[200px] opacity-100 text-[10px]" // Active: Always visible but compact
                                            : "max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 text-[10px]" // Inactive: Hidden -> Show on Hover (Dynamic)
                                        : "max-w-[200px] opacity-100" // Not Scrolled: Always visible
                                )}>
                                    {page.name}
                                </span>

                                {/* Badge */}
                                {page.badge && (
                                    <span className={cn(
                                        "ml-1 px-1.5 py-0.5 font-bold rounded-full border",
                                        isScrolled ? "text-[8px]" : "text-[9px]", // Smaller badge
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

                    {/* Right Side Actions - Collaboration + Utilities + Profile */}
                    <div className="flex items-center gap-2 ml-auto pl-2 border-l border-border/20">
                        <CollaborationBar compact={isScrolled} className={isScrolled ? "hidden lg:flex" : "hidden sm:flex"} />
                        {/* Utilities - Always visible */}
                        <div className={cn("flex items-center gap-1", isScrolled ? "" : "pl-2 ml-1 border-l border-border/20")}>
                            <NotificationCenter />
                            <FullscreenToggle className="hidden md:flex" />
                        </div>
                        {/* Profile Menu - Popup opens left */}
                        <ProfileMenu
                            variant="header"
                            user={{
                                name: "User",
                                email: "user@riglify.com",
                                plan: "Free"
                            }}
                            align="end"
                            triggerClassName={isScrolled ? "w-7 h-7 text-xs" : undefined}
                        />
                    </div>
                </nav>
            </div>
        </div>
    );
}

