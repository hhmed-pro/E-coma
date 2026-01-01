"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
    LayoutDashboard, Settings, ShoppingBag, Users, BarChart, Search, Zap, Share2,
    MessageSquare, Palette, Bot, ChevronLeft, ChevronRight, Star, Clock,
    ChevronDown, ChevronUp, Package, Calendar,
    HelpCircle, FlaskConical, List, Sparkles, ToggleLeft, ToggleRight, Lightbulb,
    TrendingUp, Target, FileText, Send, Plus, AlertTriangle, DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface NavItem { name: string; href: string; icon: React.ElementType; badge?: number; }
interface NavGroup { title: string; icon: React.ElementType; items: NavItem[]; }
interface ContextSuggestion { name: string; icon: React.ElementType; href: string; type: "action" | "page"; }
type SidebarMode = "hierarchical" | "contextual";

const BADGES: Record<string, number> = { "/sales-dashboard": 24, "/social/inbox": 5, "/admin/general": 3 };

const getContextSuggestions = (pathname: string): ContextSuggestion[] => {
    if (pathname.includes("/ecommerce") || pathname.includes("/sales-dashboard") || pathname.includes("/stock")) return [
        { name: "Send Recovery Messages", icon: Send, href: "/sales-dashboard?action=recovery", type: "action" },
        { name: "Export to Excel", icon: FileText, href: "/sales-dashboard?action=export", type: "action" },
        { name: "View Shipments", icon: MessageSquare, href: "/stock?tab=tracking", type: "page" },
    ];
    if (pathname.includes("/marketing")) return [
        { name: "Create New Ad", icon: Plus, href: "/marketing/ads-manager?action=new", type: "action" },
        { name: "Check ROAS", icon: Target, href: "/marketing/budget-manager", type: "page" },
    ];
    if (pathname.includes("/social")) return [
        { name: "Schedule New Post", icon: Calendar, href: "/social/posts-studio?tab=schedule", type: "action" },
        { name: "Reply to DMs", icon: MessageSquare, href: "/social/inbox?tab=engage", type: "page" },
        { name: "Generate Ideas", icon: Lightbulb, href: "/marketing/tools?tab=ideas", type: "page" },
    ];
    if (pathname.includes("/analytics")) return [
        { name: "Business Analytics", icon: TrendingUp, href: "/analytics", type: "page" },
        { name: "Traffic Sources", icon: BarChart, href: "/marketing/traffic", type: "page" },
        { name: "Export Report", icon: FileText, href: "/analytics?action=export", type: "action" },
    ];
    return [
        { name: "Sales Center", icon: BarChart, href: "/sales-dashboard", type: "page" },
        { name: "Check Analytics", icon: BarChart, href: "/analytics", type: "page" },
        { name: "Create Content", icon: Palette, href: "/marketing/tools", type: "page" },
    ];
};

export function UltimateSidebar() {
    const pathname = usePathname();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sidebarMode, setSidebarMode] = useState<SidebarMode>("hierarchical");
    const [expandedGroups, setExpandedGroups] = useState<string[]>(["Overview", "Operations"]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [recentPages, setRecentPages] = useState<{ name: string; href: string }[]>([]);

    const navGroups: NavGroup[] = useMemo(() => [
        {
            title: "Analytics", icon: LayoutDashboard, items: [
                { name: "Overview", href: "/analytics", icon: LayoutDashboard },
                { name: "Reports", href: "/analytics/reports", icon: Zap },
                { name: "Traffic", href: "/marketing/traffic", icon: Settings },
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
                { name: "Overview", href: "/beta", icon: FlaskConical },
                { name: "Feature Stack", href: "/features-demo", icon: Star },
            ]
        },
        {
            title: "Admin", icon: Settings, items: [
                { name: "General", href: "/admin/general", icon: Settings },
                { name: "Team", href: "/admin/team", icon: Users },
                { name: "Billing", href: "/admin/billing", icon: MessageSquare, badge: BADGES["/admin/general"] },
                { name: "Credits", href: "/admin/credits", icon: AlertTriangle },
            ]
        },
        { title: "Support", icon: HelpCircle, items: [{ name: "Help Center", href: "/admin/help", icon: HelpCircle }] },
    ], []);

    const contextSuggestions = useMemo(() => getContextSuggestions(pathname), [pathname]);

    const currentSectionName = useMemo(() => {
        for (const group of navGroups) {
            for (const item of group.items) {
                if (pathname.startsWith(item.href) || (item.href === "/" && pathname === "/")) return group.title;
            }
        }
        return "Dashboard";
    }, [pathname, navGroups]);

    const currentSectionItems = useMemo(() => {
        for (const group of navGroups) {
            for (const item of group.items) {
                if (pathname.startsWith(item.href) || (item.href === "/" && pathname === "/")) return group.items;
            }
        }
        return navGroups[0]?.items || [];
    }, [pathname, navGroups]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem("sidebar-favorites");
        const savedRecent = localStorage.getItem("sidebar-recent");
        const savedMode = localStorage.getItem("sidebar-mode") as SidebarMode;
        const savedCollapsed = localStorage.getItem("sidebar-collapsed");
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedRecent) setRecentPages(JSON.parse(savedRecent));
        if (savedMode) setSidebarMode(savedMode);
        if (savedCollapsed) setIsCollapsed(savedCollapsed === "true");
    }, []);

    useEffect(() => { localStorage.setItem("sidebar-mode", sidebarMode); }, [sidebarMode]);
    useEffect(() => { localStorage.setItem("sidebar-collapsed", String(isCollapsed)); }, [isCollapsed]);

    useEffect(() => {
        const allItems = navGroups.flatMap(g => g.items);
        const currentItem = allItems.find(item => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));
        if (currentItem) {
            setRecentPages(prev => {
                const filtered = prev.filter(p => p.href !== currentItem.href);
                const updated = [{ name: currentItem.name, href: currentItem.href }, ...filtered].slice(0, 5);
                localStorage.setItem("sidebar-recent", JSON.stringify(updated));
                return updated;
            });
        }
    }, [pathname, navGroups]);

    const toggleFavorite = useCallback((href: string) => {
        setFavorites(prev => {
            const updated = prev.includes(href) ? prev.filter(f => f !== href) : [...prev, href];
            localStorage.setItem("sidebar-favorites", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const toggleGroup = useCallback((title: string) => {
        setExpandedGroups(prev => prev.includes(title) ? prev.filter(g => g !== title) : [...prev, title]);
    }, []);

    const isActive = useCallback((href: string) => {
        return href === "/" ? pathname === "/" : pathname.startsWith(href.split('/').slice(0, 3).join('/'));
    }, [pathname]);

    const favoriteItems = useMemo(() => {
        return navGroups.flatMap(g => g.items).filter(item => favorites.includes(item.href));
    }, [favorites, navGroups]);

    return (
        <aside className={cn(
            "hidden md:flex flex-col sticky top-0 h-screen transition-all duration-300",
            "border-r border-border/50 backdrop-blur-xl",
            "bg-gradient-to-b from-background/95 via-background/90 to-background/85",
            "dark:from-[hsl(60_4%_10%/0.98)] dark:via-[hsl(60_4%_9%/0.95)] dark:to-[hsl(60_4%_8%/0.92)]",
            "dark:border-[hsl(var(--accent-orange)/0.1)]",
            isCollapsed ? "w-[68px]" : "w-[280px]"
        )}>
            {/* Header with Mode Toggle and Collapse Toggle */}
            <div className="flex items-center justify-end p-4 border-b border-border shrink-0">
                <div className={cn("flex items-center gap-1", isCollapsed && "mx-auto flex-col gap-2")}>
                    {/* Mode Toggle */}
                    <button
                        onClick={() => setSidebarMode(prev => prev === "hierarchical" ? "contextual" : "hierarchical")}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        title={sidebarMode === "hierarchical" ? "Switch to Smart View" : "Switch to Standard View"}
                    >
                        {sidebarMode === "hierarchical" ? (
                            <List className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Sparkles className="h-4 w-4 text-primary" />
                        )}
                    </button>
                    {/* Collapse Toggle */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            {/* Mode Indicator (Expanded Only) */}
            {!isCollapsed && (
                <div className="px-4 py-2 border-b border-border shrink-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {sidebarMode === "hierarchical" ? (
                            <><ToggleLeft className="h-3.5 w-3.5" /><span>Standard View</span></>
                        ) : (
                            <><ToggleRight className="h-3.5 w-3.5 text-primary" /><span className="text-primary">Smart View</span></>
                        )}
                    </div>
                </div>
            )}

            {/* COLLAPSED: Command Palette First - Top level icons only */}
            {isCollapsed && (
                <nav className="flex-1 overflow-y-auto py-2 px-2">
                    {navGroups.map((group) => (
                        <div key={group.title} className="mb-1 group relative">
                            <Link href={group.items[0]?.href || "/"} className={cn("flex items-center justify-center p-2 rounded-lg transition-all", group.items.some(item => isActive(item.href)) ? "bg-gradient-to-r from-primary/20 to-purple-500/10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                                <group.icon className="h-5 w-5" />
                            </Link>
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 whitespace-nowrap z-50">{group.title}</div>
                        </div>
                    ))}
                </nav>
            )}

            {/* EXPANDED: Hierarchical Mode */}
            {!isCollapsed && sidebarMode === "hierarchical" && (
                <>
                    {favoriteItems.length > 0 && (
                        <div className="px-3 py-2 border-b border-border shrink-0">
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2"><Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />Favorites</div>
                            <div className="space-y-0.5 mt-1">
                                {favoriteItems.map(item => (
                                    <Link key={item.href} href={item.href} className={cn("flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-all", isActive(item.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><item.icon className="h-4 w-4" /><span className="truncate">{item.name}</span></Link>
                                ))}
                            </div>
                        </div>
                    )}
                    <nav className="flex-1 overflow-y-auto py-2 px-2">
                        {navGroups.map((group) => (
                            <div key={group.title} className="mb-1">
                                <button onClick={() => toggleGroup(group.title)} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                                    <group.icon className="h-4 w-4 shrink-0" />
                                    <span className="flex-1 text-left text-xs font-semibold uppercase tracking-wider">{group.title}</span>
                                    {expandedGroups.includes(group.title) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                </button>
                                {expandedGroups.includes(group.title) && (
                                    <div className="space-y-0.5 ml-2 mt-1">
                                        {group.items.map((item) => (
                                            <div key={item.href} className="group relative">
                                                <Link href={item.href} className={cn("flex items-center gap-2 px-2 py-2 rounded-lg transition-all", isActive(item.href) ? "bg-gradient-to-r from-primary/20 to-purple-500/10 text-primary border-l-2 border-primary shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                                                    <item.icon className="h-4 w-4 shrink-0" />
                                                    <span className="flex-1 text-sm truncate">{item.name}</span>
                                                    {item.badge && <span className="px-1.5 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">{item.badge}</span>}
                                                </Link>
                                                <button onClick={(e) => { e.preventDefault(); toggleFavorite(item.href); }} className={cn("absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity", favorites.includes(item.href) ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500")}>
                                                    <Star className={cn("h-3 w-3", favorites.includes(item.href) && "fill-yellow-500")} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    {recentPages.length > 0 && (
                        <div className="px-3 py-2 border-t border-border shrink-0">
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2"><Clock className="h-3 w-3" />Recent</div>
                            <div className="space-y-0.5 mt-1">{recentPages.slice(0, 3).map(page => <Link key={page.href} href={page.href} className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"><span className="truncate">{page.name}</span></Link>)}</div>
                        </div>
                    )}
                </>
            )}

            {/* EXPANDED: Context-Aware Mode */}
            {!isCollapsed && sidebarMode === "contextual" && (
                <>
                    <div className="px-3 py-3 border-b border-border bg-muted/30 shrink-0">
                        <div className="flex items-center gap-2 px-2"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current: {currentSectionName}</span></div>
                    </div>
                    <div className="px-3 py-2 border-b border-border shrink-0">
                        <div className="space-y-0.5">
                            {currentSectionItems.map((item) => (
                                <Link key={item.href} href={item.href} className={cn("flex items-center gap-2 px-2 py-2 rounded-lg transition-all", isActive(item.href) ? "bg-gradient-to-r from-primary/20 to-purple-500/10 text-primary border-l-2 border-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                                    <item.icon className="h-4 w-4" /><span className="flex-1 text-sm truncate">{item.name}</span>{item.badge && <span className="px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded-full">{item.badge}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="px-3 py-2 border-b border-border shrink-0">
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2"><Sparkles className="h-3 w-3 text-primary" />Suggested</div>
                        <div className="space-y-0.5 mt-1">
                            {contextSuggestions.map((s, i) => (
                                <Link key={i} href={s.href} className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
                                    <s.icon className={cn("h-4 w-4", s.type === "action" ? "text-primary" : "")} /><span className="truncate">{s.name}</span>
                                    {s.type === "action" && <span className="ml-auto text-[10px] uppercase text-primary bg-primary/10 px-1.5 py-0.5 rounded">Action</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {favoriteItems.length > 0 && (
                        <div className="px-3 py-2 border-b border-border shrink-0">
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2"><Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />Favorites</div>
                            <div className="space-y-0.5 mt-1">{favoriteItems.slice(0, 3).map(item => <Link key={item.href} href={item.href} className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"><item.icon className="h-4 w-4" /><span className="truncate">{item.name}</span></Link>)}</div>
                        </div>
                    )}
                    <nav className="flex-1 overflow-y-auto py-2 px-2">
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">All Sections</div>
                        {navGroups.map((group) => (
                            <Link key={group.title} href={group.items[0]?.href || "/"} className={cn("flex items-center gap-2 px-2 py-2 rounded-lg transition-colors", group.items.some(item => isActive(item.href)) ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><group.icon className="h-4 w-4" /><span className="text-sm">{group.title}</span></Link>
                        ))}
                    </nav>
                </>
            )}

            {/* Footer - Settings Link Only */}
            <div className={cn("p-3 border-t border-border shrink-0", isCollapsed && "flex flex-col items-center")}>
                <Link href="/admin/general" className={cn("flex items-center gap-2 px-2 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground", isCollapsed && "justify-center")}><Settings className="h-4 w-4" />{!isCollapsed && <span className="text-sm">Settings</span>}</Link>
            </div>
        </aside>
    );
}
