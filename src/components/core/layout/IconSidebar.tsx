"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
    LayoutDashboard, Settings, ShoppingBag, Users, BarChart, Search, Zap, Share2,
    MessageSquare, Palette, Bot, Star, Package, Calendar,
    HelpCircle, FlaskConical, Sparkles, Lightbulb,
    TrendingUp, Target, FileText, Send, Plus, DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface NavItem { name: string; href: string; icon: React.ElementType; badge?: number; }
interface NavGroup { title: string; icon: React.ElementType; items: NavItem[]; }
interface ContextSuggestion { name: string; icon: React.ElementType; href: string; type: "action" | "page"; }

const BADGES: Record<string, number> = { "/sales-dashboard": 24, "/social/inbox": 5, "/admin/general": 3 };

const getContextSuggestions = (pathname: string): ContextSuggestion[] => {
    if (pathname.includes("/ecommerce") || pathname.includes("/sales-dashboard") || pathname.includes("/stock")) return [
        { name: "Send Recovery Messages", icon: Send, href: "/sales-dashboard?action=recovery", type: "action" },
        { name: "Export to Excel", icon: FileText, href: "/sales-dashboard?action=export", type: "action" },
    ];
    if (pathname.includes("/marketing")) return [
        { name: "Create New Ad", icon: Plus, href: "/marketing/ad-accounts?action=new", type: "action" },
        { name: "Check ROAS", icon: Target, href: "/marketing/ads-manager", type: "page" },
    ];
    if (pathname.includes("/social")) return [
        { name: "Schedule Post", icon: Calendar, href: "/social/posts-studio?tab=schedule", type: "action" },
        { name: "Generate Ideas", icon: Lightbulb, href: "/marketing/tools?tab=ideas", type: "page" },
    ];
    if (pathname.includes("/analytics")) return [
        { name: "Business Analytics", icon: TrendingUp, href: "/analytics", type: "page" },
        { name: "Export Report", icon: FileText, href: "/analytics?action=export", type: "action" },
    ];
    return [];
};

export function IconSidebar() {
    const pathname = usePathname();
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const popupRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [popupTop, setPopupTop] = useState<number>(0);
    const [showTooltips, setShowTooltips] = useState(false);

    const navGroups = useMemo<NavGroup[]>(() => [
        {
            title: "Analytics", icon: LayoutDashboard, items: [
                { name: "Overview", href: "/analytics", icon: LayoutDashboard },

                { name: "Traffic", href: "/marketing/traffic", icon: Settings },
                { name: "Heatmap", href: "/analytics/heatmap", icon: Target },
            ]
        },
        {
            title: "Orders & Inventory", icon: Package, items: [
                { name: "Sales Center", href: "/sales-dashboard", icon: BarChart, badge: BADGES["/sales-dashboard"] },
                { name: "Gestion de Stock", href: "/stock", icon: Package },
                { name: "Inventory", href: "/ecommerce/inventory", icon: Package },
            ]
        },
        {
            title: "E-com Tools", icon: ShoppingBag, items: [
                { name: "Research", href: "/product-research", icon: Search },
                { name: "Inventory", href: "/ecommerce/inventory", icon: Package },
                { name: "Sales Center", href: "/sales-dashboard", icon: BarChart },
            ]
        },
        {
            title: "Social Content", icon: Share2, items: [
                { name: "Inbox", href: "/social/inbox", icon: Share2, badge: BADGES["/social/inbox"] },
                { name: "Scheduler", href: "/social/posts-studio", icon: Palette },
                { name: "Analytics", href: "/social/analytics", icon: BarChart },
                { name: "Tools", href: "/social/tools", icon: MessageSquare },
                { name: "Settings", href: "/admin/general", icon: Settings },
            ]
        },
        {
            title: "Marketing & ADS", icon: Zap, items: [
                { name: "AD Accounts", href: "/marketing/ad-accounts", icon: Users },
                { name: "ADs Manager", href: "/marketing/ads-manager", icon: Zap },
                { name: "Budget Manager", href: "/marketing/budget-manager", icon: DollarSign },
                { name: "Traffic", href: "/marketing/traffic", icon: TrendingUp },
                { name: "Engagement", href: "/marketing", icon: Target },
                { name: "Commission", href: "/marketing/commission", icon: Share2 },
            ]
        },
        {
            title: "Beta", icon: FlaskConical, items: [
                { name: "Operations", href: "/beta/operations", icon: Bot },
                { name: "Management", href: "/beta/management", icon: Palette },
                { name: "Analytics", href: "/beta/analytics", icon: BarChart },
                { name: "Tools", href: "/beta/tools", icon: Target },
                { name: "Settings", href: "/beta/settings", icon: Settings },
            ]
        },
        {
            title: "Admin", icon: Settings, items: [
                { name: "General", href: "/admin/general", icon: Settings },
                { name: "Team", href: "/admin/team", icon: Users },
                { name: "Billing", href: "/admin/billing", icon: MessageSquare, badge: BADGES["/admin/general"] },
            ]
        },
        // { title: "Support", icon: HelpCircle, items: [{ name: "Help Center", href: "/help", icon: HelpCircle }] },
    ], []);

    // Load favorites from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("sidebar-favorites");
            if (saved) setFavorites(JSON.parse(saved));
        } catch (e) {
            console.error("Failed to parse sidebar favorites", e);
            // Optionally clear corrupted data
            localStorage.removeItem("sidebar-favorites");
        }
    }, []);

    // Close popup on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Don't close if clicking on sidebar buttons
            if (target.closest('aside')) return;
            if (popupRef.current && !popupRef.current.contains(target)) {
                setActivePopup(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleFavorite = useCallback((href: string) => {
        setFavorites(prev => {
            const updated = prev.includes(href) ? prev.filter(f => f !== href) : [...prev, href];
            localStorage.setItem("sidebar-favorites", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const isActive = useCallback((href: string) => {
        return href === "/" ? pathname === "/" : pathname.startsWith(href.split('/').slice(0, 3).join('/'));
    }, [pathname]);

    const isSectionActive = useCallback((group: NavGroup) => {
        return group.items.some(item => isActive(item.href));
    }, [isActive]);

    const activeGroup = useMemo(() => {
        return navGroups.find(g => activePopup === g.title) || null;
    }, [activePopup, navGroups]);

    const suggestions = useMemo(() => {
        if (!activeGroup) return [];
        const firstHref = activeGroup.items[0]?.href || "";
        return getContextSuggestions(firstHref);
    }, [activeGroup]);

    const handleMouseEnter = (groupTitle: string, e: React.MouseEvent<HTMLButtonElement>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        // Calculate position based on the button rect
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        // Use rect.top for alignment, but ensure it doesn't go off-screen at the bottom
        // We'll constrain it later if needed, but for now simple top alignment matches request
        setPopupTop(rect.top);

        setActivePopup(groupTitle);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setActivePopup(null);
        }, 300); // 300ms delay to allow moving to popup
    };

    const handlePopupMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    return (

        <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-14 border-r border-border bg-background/90 backdrop-blur-xl z-[80]">
            {/* Logo */}
            <div className="flex items-center justify-center h-14 border-b border-border relative z-50">
                <div className="font-bold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    R
                </div>
            </div>

            {/* Section Icons */}
            <nav className="flex-1 flex flex-col items-center py-2 gap-1 overflow-y-auto relative z-50">
                {navGroups.map((group) => (
                    <div key={group.title} className="relative">
                        <button
                            onClick={(e) => {
                                const button = e.currentTarget;
                                const rect = button.getBoundingClientRect();
                                setPopupTop(rect.top);
                                setActivePopup(activePopup === group.title ? null : group.title);
                            }}
                            onMouseEnter={(e) => handleMouseEnter(group.title, e)}
                            onMouseLeave={handleMouseLeave}
                            className={cn(
                                "relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200",
                                isSectionActive(group)
                                    ? "bg-primary/20 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                activePopup === group.title && "bg-muted text-foreground ring-2 ring-primary/50"
                            )}
                            title={group.title}
                        >
                            <group.icon className="h-5 w-5" />
                            {group.items.some(i => i.badge) && (
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
                            )}
                        </button>
                    </div>
                ))}
            </nav>

            {/* Floating Pages Popup */}
            {
                activeGroup && (
                    <div
                        ref={popupRef}
                        className="fixed left-16 w-72 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-40 overflow-hidden animate-in slide-in-from-left-2 duration-200"
                        style={{ top: `${popupTop}px` }}
                        onMouseEnter={handlePopupMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Popup Header */}
                        <div className="px-4 py-3 border-b border-border bg-muted/30">
                            <div className="flex items-center gap-2">
                                <activeGroup.icon className="h-5 w-5 text-primary" />
                                <span className="font-semibold text-foreground">{activeGroup.title}</span>
                            </div>
                        </div>

                        {/* Pages List */}
                        <div className="p-2">
                            {activeGroup.items.map((item) => (
                                <div key={item.href} className="group relative">
                                    <Link
                                        href={item.href}
                                        onClick={() => setActivePopup(null)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                            isActive(item.href)
                                                ? "bg-primary/15 text-primary border-l-3 border-primary"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4 shrink-0" />
                                        <span className="flex-1 text-sm font-medium">{item.name}</span>
                                        {item.badge && (
                                            <span className="px-2 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                    <button
                                        onClick={(e) => { e.preventDefault(); toggleFavorite(item.href); }}
                                        className={cn(
                                            "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all",
                                            favorites.includes(item.href) ? "text-yellow-500 opacity-100" : "text-muted-foreground hover:text-yellow-500"
                                        )}
                                    >
                                        <Star className={cn("h-3.5 w-3.5", favorites.includes(item.href) && "fill-yellow-500")} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="p-2 border-t border-border">
                                <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                                    <Sparkles className="h-3 w-3 text-primary" />
                                    Suggested
                                </div>
                                {suggestions.map((s, i) => (
                                    <Link
                                        key={i}
                                        href={s.href}
                                        onClick={() => setActivePopup(null)}
                                        className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
                                    >
                                        <s.icon className={cn("h-4 w-4", s.type === "action" && "text-primary")} />
                                        <span>{s.name}</span>
                                        {s.type === "action" && (
                                            <span className="ml-auto text-[10px] uppercase text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                                Action
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Settings Toggle */}
                        <div className="p-3 border-t border-border bg-muted/20">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-foreground">Contextual Help</span>
                                    <span className="text-[10px] text-muted-foreground">Show explanations on hover</span>
                                </div>
                                <button
                                    className={cn(
                                        "w-9 h-5 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shrink-0",
                                        showTooltips ? "bg-primary" : "bg-muted-foreground/30"
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowTooltips(!showTooltips);
                                    }}
                                >
                                    <div className={cn(
                                        "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
                                        showTooltips ? "left-[18px]" : "left-0.5"
                                    )} />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </aside>
    );
}

