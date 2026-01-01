"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp, ChevronDown, Settings, Clock, Star, Rocket, CheckCircle2, Circle, ArrowRight, X, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRightPanel } from "@/components/core/layout/RightPanelContext";
import { CommandPalette } from "@/components/core/ui/command-palette";
import { NAV_GROUPS, CATEGORY_COLORS, NavItem } from "@/config/navigation";
import {
    ECOSYSTEM_MODULES,
    STATUS_COLORS,
    STATUS_LABELS,
    getModuleStatus,
    ModuleStatusInfo
} from "@/config/ecosystem-config";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/core/ui/tooltip";
import { useWindowLayout } from "@/components/core/layout/WindowLayoutContext";
import { useScroll } from "@/components/core/layout/ScrollContext";

interface EcosystemBarProps {
    onModuleClick?: (moduleId: string) => void;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

export function EcosystemBar({ onModuleClick, isExpanded = false, onToggleExpand }: EcosystemBarProps) {
    const { isTopNavCollapsed } = useWindowLayout();
    const { isScrolled } = useScroll();
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [recentPages, setRecentPages] = useState<{ name: string; href: string }[]>([]);
    const [showRecent, setShowRecent] = useState(false);
    const [showFavoritesOpen, setShowFavoritesOpen] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [onboardingProgress, setOnboardingProgress] = useState(0);
    const [moduleStatuses, setModuleStatuses] = useState<Record<string, ModuleStatusInfo>>({});
    const [newFavoritesCount, setNewFavoritesCount] = useState(0);
    const [onboardingOpen, setOnboardingOpen] = useState(false);
    const [onboardingSteps, setOnboardingSteps] = useState([
        { id: "profile", title: "Complete your profile", description: "Add your business information and logo", href: "/admin/general", completed: false },
        { id: "product", title: "Add your first product", description: "Create a product to start selling", href: "/ecommerce/inventory", completed: false },
        { id: "delivery", title: "Set up delivery zones", description: "Configure shipping areas and prices", href: "/ecommerce/orders?tab=wilaya", completed: false },
        { id: "payment", title: "Configure payment methods", description: "Set up COD and other payment options", href: "/admin/billing", completed: false },
        { id: "campaign", title: "Launch your first campaign", description: "Create your first marketing campaign", href: "/marketing/ads-manager", completed: false },
    ]);
    const { config, isOpen } = useRightPanel();
    const pathname = usePathname();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prevFavoritesLength = useRef(0);

    // Close onboarding popup on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && onboardingOpen) {
                setOnboardingOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onboardingOpen]);

    // Load initial states from localStorage
    useEffect(() => {
        try {
            const savedRecent = localStorage.getItem("sidebar-recent");
            const savedFavorites = localStorage.getItem("sidebar-favorites");
            if (savedRecent) setRecentPages(JSON.parse(savedRecent));
            if (savedFavorites) {
                const parsed = JSON.parse(savedFavorites);
                setFavorites(parsed);
                prevFavoritesLength.current = parsed.length;
            }

            // Load module statuses
            const statuses: Record<string, ModuleStatusInfo> = {};
            ECOSYSTEM_MODULES.forEach(m => {
                statuses[m.id] = getModuleStatus(m.id);
            });
            setModuleStatuses(statuses);
        } catch (e) {
            console.error("Failed to parse navigation data", e);
        }
    }, []);

    // Load onboarding progress and sync steps
    useEffect(() => {
        const loadProgress = () => {
            try {
                const saved = localStorage.getItem("riglify-onboarding");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    const completedIds = parsed.completedIds || [];
                    const completedCount = completedIds.length;
                    const totalSteps = 5;
                    setOnboardingProgress((completedCount / totalSteps) * 100);
                    // Sync steps with completed state
                    setOnboardingSteps(prev => prev.map(step => ({
                        ...step,
                        completed: completedIds.includes(step.id)
                    })));
                }
            } catch (e) {
                console.error("Failed to parse onboarding progress", e);
            }
        };
        loadProgress();
        window.addEventListener('storage', loadProgress);
        return () => window.removeEventListener('storage', loadProgress);
    }, []);

    // Track new favorites for animation
    useEffect(() => {
        if (favorites.length > prevFavoritesLength.current) {
            setNewFavoritesCount(favorites.length - prevFavoritesLength.current);
            // Clear animation after 3 seconds
            const timer = setTimeout(() => setNewFavoritesCount(0), 3000);
            return () => clearTimeout(timer);
        }
        prevFavoritesLength.current = favorites.length;
    }, [favorites]);

    const handleModuleClick = useCallback((moduleId: string) => {
        setActiveModule(prev => prev === moduleId ? null : moduleId);
        onModuleClick?.(moduleId);
    }, [onModuleClick]);

    const toggleFavorite = useCallback(() => {
        setFavorites(prev => {
            const updated = prev.includes(pathname)
                ? prev.filter(f => f !== pathname)
                : [...prev, pathname];
            localStorage.setItem("sidebar-favorites", JSON.stringify(updated));
            return updated;
        });
    }, [pathname]);

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

    const onboardingCompletedCount = onboardingSteps.filter(s => s.completed).length;
    const onboardingTotalCount = onboardingSteps.length;
    const isOnboardingComplete = onboardingCompletedCount === onboardingTotalCount;

    const getStatusColor = (status: ModuleStatusInfo) => STATUS_COLORS[status.status] || STATUS_COLORS.disconnected;

    // Get all modules (previously split into left/right)
    const allModules = ECOSYSTEM_MODULES;

    const renderModuleButton = (module: typeof ECOSYSTEM_MODULES[0]) => {
        const status = moduleStatuses[module.id] || { status: 'disconnected' };
        const colors = getStatusColor(status);
        const isActive = activeModule === module.id;

        return (
            <Tooltip key={module.id}>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => handleModuleClick(module.id)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative click-feedback shrink-0",
                            isActive
                                ? "bg-primary/15 text-primary module-active-indicator"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                    >
                        <module.icon className="h-4 w-4" />
                        <span className="hidden lg:inline">{module.shortName}</span>

                        {/* Status dot */}
                        <span
                            className={cn(
                                "absolute top-1 right-1 h-2 w-2 rounded-full ring-2",
                                colors.bg,
                                colors.ring,
                                status.status === 'attention' && "status-dot-attention"
                            )}
                        />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px] p-3">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <span className="font-semibold">{module.name}</span>
                            {module.shortcut && (
                                <kbd className="tooltip-shortcut">{module.shortcut}</kbd>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">{module.description}</p>
                        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                            <span className={cn("h-2 w-2 rounded-full", colors.bg)} />
                            <span className="text-xs">{STATUS_LABELS[status.status]}</span>
                            {status.progress && (
                                <span className="text-xs text-primary ml-auto">
                                    {status.progress.current}/{status.progress.total}
                                </span>
                            )}
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        );
    };

    // Full bar view
    return (
        <TooltipProvider delayDuration={200}>
            <div className={cn(
                "hidden md:block fixed z-[60] transition-all duration-300 left-0 right-0",
                // Collapsed State (Hidden)
                isTopNavCollapsed
                    ? "translate-y-[120%] opacity-0 pointer-events-none"
                    : "translate-y-0 opacity-100",
                // Always attached at bottom with consistent styling
                "bottom-0 border-t border-border/40 bg-card/85 backdrop-blur-md shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.5)]"
            )}>
                <div className="h-12 w-full flex items-center justify-between px-4 relative gap-8">

                    {/* LEFT SECTION: Modules + Expand Toggle */}
                    <div className="flex items-center gap-2 shrink-0 ml-0 md:ml-4">
                        {allModules.map(renderModuleButton)}

                        {/* Expand Toggle */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onToggleExpand}
                                    className={cn(
                                        "flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors click-feedback",
                                        isExpanded && "bg-muted text-foreground"
                                    )}
                                >
                                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                                {isExpanded ? "Collapse panel" : "Expand panel"}
                            </TooltipContent>
                        </Tooltip>

                        {/* Divider */}
                        <div className="h-6 w-px bg-border/50 ml-2" />
                    </div>

                    {/* CENTER-RIGHT SECTION: Onboarding + Search */}
                    <div className="flex items-center gap-4 ml-auto mr-6">
                        {/* Onboarding Button + Popup - styled like search */}
                        <>
                            <button
                                onClick={() => setOnboardingOpen(true)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground",
                                    "bg-muted/50 border border-border rounded-lg",
                                    "hover:bg-muted hover:text-foreground transition-colors",
                                    onboardingOpen && "bg-primary/15 text-primary border-primary/30"
                                )}
                            >
                                {isOnboardingComplete ? (
                                    <PartyPopper className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Rocket className="h-4 w-4" />
                                )}
                                <span className="text-left">{isOnboardingComplete ? "Complete!" : "Onboarding"}</span>
                                <span className="hidden md:inline-flex ml-auto px-1.5 py-0.5 text-[10px] font-medium bg-background border border-border rounded">
                                    {onboardingCompletedCount}/{onboardingTotalCount}
                                </span>
                            </button>

                            {/* Onboarding Popup Modal */}
                            {onboardingOpen && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                                        onClick={() => setOnboardingOpen(false)}
                                    />

                                    {/* Dialog */}
                                    <div className="fixed left-1/2 bottom-20 -translate-x-1/2 w-full max-w-md z-[70]">
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
                                            <div className="max-h-80 overflow-y-auto p-2">
                                                {onboardingSteps.map((step) => (
                                                    <div
                                                        key={step.id}
                                                        className={cn(
                                                            "flex items-start gap-3 px-3 py-3 rounded-lg transition-colors",
                                                            step.completed ? "opacity-60" : "hover:bg-muted"
                                                        )}
                                                    >
                                                        {/* Checkbox */}
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

                                                        {/* Content */}
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

                                                        {/* Action */}
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

                                            {/* Tips Footer */}
                                            <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground">
                                                <span>Click a step to mark complete</span>
                                                <span className="flex items-center gap-1">
                                                    <kbd className="px-1.5 py-0.5 bg-muted rounded">esc</kbd> to close
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center">
                            <CommandPalette />
                        </div>

                        {/* Divider */}
                        <div className="h-6 w-px bg-border/50 mx-2" />
                    </div>

                    {/* RIGHT SECTION: Utilities */}
                    <div className="flex items-center gap-1 shrink-0">
                        {/* Recent Pages */}
                        {recentPages.length > 0 && (
                            <div
                                className="relative"
                                onMouseEnter={() => {
                                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                    setShowRecent(true);
                                    setShowFavoritesOpen(false);
                                }}
                                onMouseLeave={() => {
                                    timeoutRef.current = setTimeout(() => {
                                        setShowRecent(false);
                                        setShowFavoritesOpen(false);
                                    }, 150);
                                }}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => {
                                                setShowRecent(!showRecent);
                                                if (!showRecent) setShowFavoritesOpen(false);
                                            }}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all click-feedback",
                                                showRecent
                                                    ? "bg-muted text-foreground"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            )}
                                        >
                                            <Clock className="h-4 w-4" />
                                            <span className="hidden lg:inline">Recent</span>
                                        </button>
                                    </TooltipTrigger>
                                    {!showRecent && (
                                        <TooltipContent side="top" className="text-xs">
                                            Recently visited pages
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                {showRecent && (
                                    <div
                                        className="absolute bottom-full right-0 mb-2 min-w-[200px] bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl py-2 z-50 animate-in fade-in-0 zoom-in-95"
                                        onMouseEnter={() => {
                                            if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                        }}
                                        onMouseLeave={() => {
                                            timeoutRef.current = setTimeout(() => {
                                                setShowRecent(false);
                                                setShowFavoritesOpen(false);
                                            }, 150);
                                        }}
                                    >
                                        <div className="px-3 py-2 border-b border-white/5 mb-1">
                                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent</h3>
                                        </div>
                                        {recentPages.slice(0, 5).map(page => (
                                            <Link
                                                key={page.href}
                                                href={page.href}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                                onClick={() => setShowRecent(false)}
                                            >
                                                <Clock className="h-3.5 w-3.5 opacity-50" />
                                                <span>{page.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Favorites */}
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                setShowFavoritesOpen(true);
                                setShowRecent(false);
                            }}
                            onMouseLeave={() => {
                                timeoutRef.current = setTimeout(() => {
                                    setShowFavoritesOpen(false);
                                    setShowRecent(false);
                                }, 150);
                            }}
                        >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={toggleFavorite}
                                        className={cn(
                                            "p-2 rounded-lg transition-all relative click-feedback",
                                            favorites.includes(pathname)
                                                ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/10"
                                                : showFavoritesOpen
                                                    ? "text-yellow-500 bg-muted"
                                                    : "text-muted-foreground hover:text-yellow-500 hover:bg-muted"
                                        )}
                                    >
                                        <Star className={cn("h-4 w-4", favorites.includes(pathname) && "fill-yellow-500")} />

                                        {/* Badge - only animate when NEW favorites added */}
                                        {favorites.length > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                                                {newFavoritesCount > 0 && (
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                                                )}
                                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-yellow-500 text-[9px] font-bold text-black items-center justify-center">
                                                    {favorites.length}
                                                </span>
                                            </span>
                                        )}
                                    </button>
                                </TooltipTrigger>
                                {!showFavoritesOpen && (
                                    <TooltipContent side="top" className="text-xs">
                                        {favorites.includes(pathname) ? "Remove from favorites" : "Add to favorites"}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                            {/* Favorites Dropdown logic... (Simplified for brevity in diff, but assuming it renders same as before) */}
                            {favorites.length > 0 && showFavoritesOpen && (
                                <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 min-w-[260px] bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl py-2 z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2"
                                    onMouseEnter={() => {
                                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                    }}
                                    onMouseLeave={() => {
                                        timeoutRef.current = setTimeout(() => {
                                            setShowFavoritesOpen(false);
                                            setShowRecent(false);
                                        }, 150);
                                    }}
                                >
                                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Favorites</h3>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                        {favorites.map(favPath => {
                                            let details: NavItem & { category: string; categoryColor: string } | undefined;
                                            for (const group of NAV_GROUPS) {
                                                const item = group.items.find(i => i.href === favPath);
                                                if (item) {
                                                    details = {
                                                        ...item,
                                                        category: group.title,
                                                        categoryColor: CATEGORY_COLORS[group.title] || "text-muted-foreground"
                                                    };
                                                    break;
                                                }
                                            }
                                            if (!details) return null;
                                            return (
                                                <Link
                                                    key={favPath}
                                                    href={favPath}
                                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors group/item"
                                                >
                                                    <details.icon className={cn("h-4 w-4 shrink-0", details.categoryColor)} />
                                                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                                        <span className={cn(
                                                            "text-[10px] uppercase tracking-wide font-semibold",
                                                            details.categoryColor
                                                        )}>
                                                            {details.category}
                                                        </span>
                                                        <span className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors truncate">
                                                            {details.name}
                                                        </span>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Settings */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/admin/general"
                                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all click-feedback"
                                >
                                    <Settings className="h-4 w-4" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                                Settings
                                <kbd className="tooltip-shortcut ml-2">Alt+,</kbd>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
