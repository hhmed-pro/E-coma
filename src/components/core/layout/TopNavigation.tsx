"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import {
    LayoutDashboard, Settings, ShoppingBag, Users, BarChart, Search, Zap, Share2,
    MessageSquare, Palette, Bot, Star, Package, Calendar,
    HelpCircle, FlaskConical, Sparkles, Lightbulb,
    TrendingUp, Target, FileText, Send, Plus, ChevronDown, Clock, AlertTriangle, ChevronRight, ChevronLeft,
    Rocket, PartyPopper, CheckCircle2, Circle, ArrowRight, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationCenter } from "@/components/core/ui/notification-center";
import { FullscreenToggle } from "@/components/core/ui/fullscreen-toggle";
import { CommandPalette } from "@/components/core/ui/command-palette";
import { OnboardingChecklist } from "@/components/core/ui/onboarding-checklist";
import { ProfileMenu } from "./ProfileMenu";

import { NAV_GROUPS, NAV_PAGES, CATEGORY_COLORS, CATEGORY_GLOW_COLORS, BADGE_URGENCY_THRESHOLD, NavGroup, NavItem } from "@/config/navigation";
import { useWindowLayout } from "./WindowLayoutContext";
import { useScroll } from "./ScrollContext";
import { useMode } from "./ModeContext";
import { Lock, ShieldCheck, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/core/ui/tooltip";

interface TopNavigationProps {
}

export function TopNavigation({ }: TopNavigationProps) {
    const pathname = usePathname();
    const { isTopNavCollapsed, toggleTopNav, toggleEcosystemBar, stickyActions } = useWindowLayout();
    const { isScrolled: _isScrolled } = useScroll();
    const isScrolled = true; // Always use compact "scrolled" style

    // Onboarding State
    const [onboardingProgress, setOnboardingProgress] = useState(0);
    const [onboardingOpen, setOnboardingOpen] = useState(false);
    const [onboardingSteps, setOnboardingSteps] = useState([
        { id: "profile", title: "Complete your profile", description: "Add your business information and logo", href: "/admin/general", completed: false },
        { id: "product", title: "Add your first product", description: "Create a product to start selling", href: "/ecommerce/inventory", completed: false },
        { id: "delivery", title: "Set up delivery zones", description: "Configure shipping areas and prices", href: "/ecommerce/orders?tab=wilaya", completed: false },
        { id: "payment", title: "Configure payment methods", description: "Set up COD and other payment options", href: "/admin/billing", completed: false },
        { id: "campaign", title: "Launch your first campaign", description: "Create your first marketing campaign", href: "/marketing/ads-manager", completed: false },
    ]);

    // Favorites State
    const [favorites, setFavorites] = useState<string[]>([]);

    // Mode Context
    const { mode, activeTeam, sessionObjective, switchToAdminMode, switchToTeamMode, getTeamFromPath, canAccessPage } = useMode();
    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState(false);

    const handlePassToAdmin = () => {
        if (switchToAdminMode(pin)) {
            setPin("");
            setPinError(false);
        } else {
            setPinError(true);
            setTimeout(() => setPinError(false), 2000);
        }
    };

    // Load states
    useEffect(() => {
        // Load favorites
        const savedFavorites = localStorage.getItem("sidebar-favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }

        // Load onboarding
        const savedOnboarding = localStorage.getItem("riglify-onboarding");
        if (savedOnboarding) {
            const parsed = JSON.parse(savedOnboarding);
            const completedIds = parsed.completedIds || [];
            setOnboardingProgress((completedIds.length / 5) * 100);
            setOnboardingSteps(prev => prev.map(step => ({
                ...step,
                completed: completedIds.includes(step.id)
            })));
        }
    }, []);

    // Handle onboarding step completion
    const handleOnboardingStepComplete = useCallback((stepId: string) => {
        setOnboardingSteps(prev => {
            const updated = prev.map(step =>
                step.id === stepId ? { ...step, completed: true } : step
            );
            const completedIds = updated.filter(s => s.completed).map(s => s.id);
            localStorage.setItem("riglify-onboarding", JSON.stringify({ completedIds }));
            setOnboardingProgress((completedIds.length / updated.length) * 100);
            return updated;
        });
    }, []);

    const toggleFavorite = useCallback((href: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites(prev => {
            const updated = prev.includes(href)
                ? prev.filter(f => f !== href)
                : [...prev, href];
            localStorage.setItem("sidebar-favorites", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const onboardingCompletedCount = onboardingSteps.filter(s => s.completed).length;
    const onboardingTotalCount = onboardingSteps.length;
    const isOnboardingComplete = onboardingCompletedCount === onboardingTotalCount;

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

    // TEAM MODE NAVIGATION
    if (mode === "TEAM" && activeTeam) {
        return (
            <div className={containerClasses}>
                {/* 1. Toggle Button - Same as Admin Mode */}
                {showButton && (
                    <button
                        onClick={() => { toggleTopNav(); toggleEcosystemBar(); }}
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border/80 transition-all duration-200 shadow-lg shrink-0 z-50",
                            isTopNavCollapsed ? "translate-x-0" : "mr-2"
                        )}
                        title={isTopNavCollapsed ? "Expand Navigation" : "Collapse Navigation"}
                    >
                        {isTopNavCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                )}

                {/* 2. Team Content - Collapsible Pill Container */}
                <div
                    className={cn(
                        "flex items-center gap-4 border border-border/40 bg-card/85 backdrop-blur-md rounded-full shadow-lg overflow-hidden transition-all duration-300 origin-left",
                        isTopNavCollapsed
                            ? "w-0 opacity-0 px-0 border-0 scale-95 pointer-events-none"
                            : "w-full max-w-4xl opacity-100 scale-100 px-4",
                        !isTopNavCollapsed && "h-14" // Maintain height when expanded
                    )}
                >
                    {/* Team Icon & Info */}
                    <div className="flex items-center gap-4 shrink-0 whitespace-nowrap">
                        <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-xl shadow-lg shrink-0",
                            "bg-gradient-to-br from-background to-muted border border-border"
                        )}>
                            <activeTeam.icon className={cn("w-6 h-6", activeTeam.color)} />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold flex items-center gap-2">
                                {activeTeam.name}
                                <span className="px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] border border-green-500/20">Active Session</span>
                            </h2>
                            <p className="text-xs text-muted-foreground max-w-[300px] truncate">
                                {sessionObjective}
                            </p>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Right: Pass to Admin */}
                    <div className="flex items-center gap-3 bg-muted/30 p-1.5 rounded-xl border border-border/50 shrink-0">
                        <div className="flex items-center gap-1.5 px-2">
                            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Admin Access</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 4) setPin(e.target.value);
                                        setPinError(false);
                                    }}
                                    placeholder="PIN"
                                    className={cn(
                                        "w-16 h-8 text-center text-sm font-mono tracking-widest bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all",
                                        pinError ? "border-destructive ring-destructive/50 text-destructive" : "border-border"
                                    )}
                                    maxLength={4}
                                />
                            </div>
                            <button
                                onClick={handlePassToAdmin}
                                disabled={pin.length !== 4}
                                className={cn(
                                    "h-8 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm",
                                    pin.length === 4
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-muted text-muted-foreground cursor-not-allowed"
                                )}
                            >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Pass to Admin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={containerClasses}>
            {/* Sticky Actions - Shown when scrolled (page-specific actions) */}
            {isScrolled && stickyActions && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                    {stickyActions}
                </div>
            )}

            {/* Main Nav Pill - Left/Center */}
            <div className="flex items-center gap-2">
                {/* Toggle Button */}
                {showButton && (
                    <button
                        onClick={() => { toggleTopNav(); toggleEcosystemBar(); }}
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border/80 transition-all duration-200 shadow-lg",
                            isTopNavCollapsed && isScrolled ? "translate-x-0" : ""
                        )}
                        title={isTopNavCollapsed ? "Expand Navigation" : "Collapse Navigation"}
                    >
                        {isTopNavCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                )}

                {/* Nav Pills - Hidden when collapsed */}
                <nav
                    className={cn(
                        "border border-border/40 bg-card/85 backdrop-blur-md rounded-full shadow-lg flex items-center gap-1 overflow-visible relative transition-all duration-300 origin-left",
                        isTopNavCollapsed
                            ? "w-0 h-14 opacity-0 overflow-hidden px-0 border-0 scale-95 pointer-events-none"
                            : cn(
                                "opacity-100 scale-100",
                                "w-fit max-w-full"
                            ),
                        !isTopNavCollapsed && isScrolled ? "h-9 px-3" : "h-14 px-6"
                    )}
                >
                    {/* Subtle Glow Border Effect */}
                    {!isTopNavCollapsed && (
                        <>
                            <div className="absolute inset-0 rounded-full ring-1 ring-border/5 pointer-events-none" />
                            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_hsl(var(--accent-orange)/0.05)] pointer-events-none opacity-50 dark:opacity-100" />
                        </>
                    )}

                    {/* Nav Pages */}
                    <div className={cn(
                        "flex items-center gap-1 overflow-x-auto no-scrollbar mask-linear-fade transition-all duration-300",
                        isScrolled ? "pr-0" : ""
                    )}>
                        {navPages.map((page) => {
                            const isPageAccessible = canAccessPage(page.href);
                            return (
                                <div key={page.href} className="flex items-center gap-1">
                                    <Link
                                        href={isPageAccessible ? page.href : "#"}
                                        onClick={(e) => !isPageAccessible && e.preventDefault()}
                                        className={cn(
                                            "flex items-center rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap relative group click-feedback shrink-0 font-[Poppins,Arial,sans-serif]",
                                            isScrolled ? "px-1.5 py-1 gap-1" : "px-3 py-2 gap-2",
                                            !isPageAccessible && "opacity-40 cursor-not-allowed",
                                            isActive(page.href)
                                                ? "bg-[hsl(var(--accent-orange))]/15 text-[hsl(var(--accent-orange))] shadow-[0_0_15px_hsl(var(--accent-orange)/0.25)] nav-active-underline"
                                                : isPageAccessible
                                                    ? "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                    : "text-muted-foreground"
                                        )}>
                                        <page.icon className={cn(
                                            "transition-colors",
                                            isScrolled ? "h-3.5 w-3.5" : "h-3.5 w-3.5",
                                            isActive(page.href) ? "text-[hsl(var(--accent-orange))]" : "text-muted-foreground/70 group-hover:text-foreground/80"
                                        )} />
                                        <span className={cn(
                                            "transition-all duration-300 overflow-hidden whitespace-nowrap",
                                            isScrolled
                                                ? "max-w-[200px] opacity-100 text-[10px]"
                                                : "max-w-[200px] opacity-100"
                                        )}>
                                            {page.name}
                                        </span>

                                        {/* Badge */}
                                        {page.badge && (
                                            <span className={cn(
                                                "ml-1 px-1.5 py-0.5 font-bold rounded-full border",
                                                isScrolled ? "text-[8px]" : "text-[9px]",
                                                isActive(page.href)
                                                    ? "bg-[hsl(var(--accent-orange))] text-background border-[hsl(var(--accent-orange))]"
                                                    : "bg-destructive/20 text-destructive border-destructive/50"
                                            )}>
                                                {page.badge}
                                            </span>
                                        )}

                                        {/* Favorite Star */}
                                        <button
                                            onClick={(e) => toggleFavorite(page.href, e)}
                                            className={cn(
                                                "ml-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100",
                                                favorites.includes(page.href) && "opacity-100"
                                            )}
                                        >
                                            <Star className={cn(
                                                "w-3 h-3 transition-colors",
                                                favorites.includes(page.href)
                                                    ? "fill-yellow-500 text-yellow-500"
                                                    : "text-muted-foreground hover:text-yellow-500"
                                            )} />
                                        </button>
                                    </Link>

                                    {/* GLOBAL SWITCH TO TEAM MODE BUTTON - ONLY IN ADMIN MODE AND NEAR ACTIVE PAGE */}
                                    {isActive(page.href) && mode === "ADMIN" && (
                                        <div className="flex items-center">
                                            <div className="w-px h-3 bg-border/50 mx-0.5" />
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => {
                                                            const detectedTeam = getTeamFromPath && getTeamFromPath(pathname);
                                                            if (detectedTeam) {
                                                                switchToTeamMode(detectedTeam.id);
                                                            } else {
                                                                alert("No specific team context found for this page. Please navigate to a team page (e.g. Sales, Marketing) to switch.");
                                                            }
                                                        }}
                                                        className={cn(
                                                            "relative px-1.5 py-0.5 rounded-full text-[8px] font-bold overflow-hidden group transition-all duration-300 shrink-0",
                                                            "bg-gradient-to-r from-primary/10 to-blue-500/10",
                                                            "border border-primary/20 hover:border-primary/50",
                                                            "hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
                                                            "text-primary flex items-center gap-0.5"
                                                        )}
                                                    >
                                                        <Lock className="w-2 h-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                                                        <span className="relative z-10 font-bold tracking-wide">TEAM</span>
                                                        {/* Background shine effect */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" className="text-xs">
                                                    Switch the current page to Focused Team Mode
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </nav>
            </div >



            {/* Right Side Actions - Separate Persistent Container */}
            <div className={cn(
                "flex items-center gap-1.5 ml-2 border border-border/40 bg-card/85 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 origin-right",
                isTopNavCollapsed
                    ? "w-0 opacity-0 overflow-hidden px-0 border-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100",
                !isTopNavCollapsed && isScrolled ? "h-9 px-2" : "h-14 px-4 gap-2"
            )}>
                {/* Onboarding Button */}
                <div className="relative">
                    <button
                        onClick={() => setOnboardingOpen(true)}
                        className={cn(
                            "relative flex items-center justify-center w-8 h-8 rounded-full border border-border bg-card/50 hover:bg-muted transition-all duration-200",
                            isOnboardingComplete && "border-green-500/30 bg-green-500/10 text-green-500"
                        )}
                        title="Onboarding Progress"
                    >
                        {isOnboardingComplete ? (
                            <PartyPopper className="w-4 h-4" />
                        ) : (
                            <Rocket className="w-4 h-4 text-primary" />
                        )}
                        {/* Progress Ring/Dot */}
                        {!isOnboardingComplete && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                            </span>
                        )}
                    </button>

                    {/* Onboarding Popup Modal - Same as before */}
                    {onboardingOpen && (
                        <>
                            <div
                                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[80]"
                                onClick={() => setOnboardingOpen(false)}
                            />
                            <div className="fixed right-4 top-20 w-[400px] z-[90] animate-in slide-in-from-right-10 fade-in-0">
                                <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                                    {/* Header */}
                                    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-muted/30">
                                        <div className="flex items-center gap-2">
                                            <Rocket className="h-5 w-5 text-primary" />
                                            <h3 className="font-semibold">Getting Started</h3>
                                        </div>
                                        <button
                                            onClick={() => setOnboardingOpen(false)}
                                            className="p-1 hover:bg-muted rounded"
                                        >
                                            <X className="h-4 w-4 text-muted-foreground" />
                                        </button>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="px-4 py-3 border-b border-border">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                            <span>{onboardingCompletedCount} of {onboardingTotalCount} completed</span>
                                            <span>{Math.round(onboardingProgress)}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-500"
                                                style={{ width: `${onboardingProgress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Steps List */}
                                    <div className="max-h-[60vh] overflow-y-auto p-2">
                                        {onboardingSteps.map((step) => (
                                            <div
                                                key={step.id}
                                                className={cn(
                                                    "flex items-start gap-3 px-3 py-3 rounded-lg transition-colors",
                                                    step.completed ? "opacity-60" : "hover:bg-muted"
                                                )}
                                            >
                                                <button
                                                    onClick={() => !step.completed && handleOnboardingStepComplete(step.id)}
                                                    className={cn(
                                                        "shrink-0 mt-0.5 transition-colors",
                                                        step.completed
                                                            ? "text-green-500"
                                                            : "text-muted-foreground hover:text-primary"
                                                    )}
                                                    disabled={step.completed}
                                                >
                                                    {step.completed ? (
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    ) : (
                                                        <Circle className="h-5 w-5" />
                                                    )}
                                                </button>
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn(
                                                        "text-sm font-medium",
                                                        step.completed && "line-through"
                                                    )}>
                                                        {step.title}
                                                    </p>
                                                    {step.description && !step.completed && (
                                                        <p className="text-xs text-muted-foreground mt-0.5">
                                                            {step.description}
                                                        </p>
                                                    )}
                                                </div>
                                                {!step.completed && step.href && (
                                                    <Link
                                                        href={step.href}
                                                        className="shrink-0 text-primary hover:underline text-sm flex items-center gap-1"
                                                        onClick={() => setOnboardingOpen(false)}
                                                    >
                                                        Start
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    {isOnboardingComplete && (
                                        <div className="px-4 py-3 border-t bg-green-50 dark:bg-green-950/30">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                    <PartyPopper className="h-5 w-5" />
                                                    <span className="text-sm font-medium">All done! Great job!</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Utilities - Always visible & Persistent */}
                <div className={cn("flex items-center gap-1", isScrolled ? "" : "pl-2 ml-1 border-l border-border/20")}>
                    <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
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
        </div>
    );
}

