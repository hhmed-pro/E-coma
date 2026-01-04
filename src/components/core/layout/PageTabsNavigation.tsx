import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Truck,
    Calculator,
    FileText,
    ShoppingCart,
    Shield,
    BarChart3,
    MessageSquare,
    Package,
    AlertTriangle,
    MapPin,
    Users,
    Palette,
    Video,
    FolderOpen,
    Sparkles,
    Megaphone,
    DollarSign,
    Target,
    TrendingUp,
    UserPlus,
    Share2,
    Globe,
    Search,
    Zap,
    Building,
    type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/core/ui/tooltip";

// Tab configuration interface
interface TabConfig {
    id: string;
    name: string;
    shortName: string;
    icon: LucideIcon;
}

// Tabs configuration per page
const PAGE_TABS: Record<string, TabConfig[]> = {
    "/analytics": [
        { id: "overview", name: "Business Overview", shortName: "Overview", icon: LayoutDashboard },
        { id: "delivery", name: "Delivery & Geographic", shortName: "Delivery", icon: Truck },
        { id: "financial", name: "Financial Analysis", shortName: "Financial", icon: Calculator },
        { id: "reports", name: "Reports & Actions", shortName: "Reports", icon: FileText },
    ],
    "/sales-dashboard": [
        { id: "orders", name: "Orders & Confirmation", shortName: "Orders", icon: ShoppingCart },
        { id: "risk", name: "Risk & Customers", shortName: "Risk", icon: Shield },
        { id: "analytics", name: "Analytics & Sources", shortName: "Analytics", icon: BarChart3 },
        { id: "communication", name: "Communication & Automation", shortName: "Comms", icon: MessageSquare },
    ],
    "/stock": [
        { id: "inventory", name: "Inventory Overview", shortName: "Inventory", icon: Package },
        { id: "alerts", name: "Alerts & Movements", shortName: "Alerts", icon: AlertTriangle },
        { id: "locations", name: "Locations & Returns", shortName: "Locations", icon: MapPin },
        { id: "suppliers", name: "Suppliers & Imports", shortName: "Suppliers", icon: Users },
    ],
    "/creatives": [
        { id: "content", name: "Content Creation", shortName: "Content", icon: Palette },
        { id: "media", name: "Media Studio", shortName: "Media", icon: Video },
        { id: "templates", name: "Templates & Pipeline", shortName: "Templates", icon: FolderOpen },
        { id: "brand", name: "Brand & Safety", shortName: "Brand", icon: Sparkles },
    ],
    "/ads": [
        { id: "campaigns", name: "Campaign Overview", shortName: "Campaigns", icon: Megaphone },
        { id: "roas", name: "ROAS & Budget", shortName: "ROAS", icon: DollarSign },
        { id: "traffic", name: "Traffic & Funnel", shortName: "Traffic", icon: Target },
        { id: "reports", name: "Reports & Account", shortName: "Reports", icon: FileText },
    ],
    "/marketing": [
        { id: "influencers", name: "Influencer Marketplace", shortName: "Influencers", icon: UserPlus },
        { id: "ugc", name: "UGC & Affiliate", shortName: "UGC", icon: Share2 },
        { id: "platform", name: "Platform & Engagement", shortName: "Platform", icon: Globe },
        { id: "settings", name: "Analytics & Settings", shortName: "Settings", icon: BarChart3 },
    ],
    "/product-research": [
        { id: "trending", name: "Trending Products", shortName: "Trending", icon: TrendingUp },
        { id: "search", name: "Search & AI Score", shortName: "Search", icon: Search },
        { id: "competitors", name: "Competitors & Suppliers", shortName: "Competitors", icon: Zap },
        { id: "sourcing", name: "Sourcing & Costs", shortName: "Sourcing", icon: Building },
    ],
};

interface PageTabsNavigationProps {
    onTabChange?: (tabId: string) => void;
    className?: string;
}

export function PageTabsNavigation({ onTabChange, className }: PageTabsNavigationProps) {
    const pathname = usePathname();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Get tabs for current page
    const currentTabs = PAGE_TABS[pathname] || [];

    // Get/set active tab from localStorage
    const storageKey = `page-tabs-${pathname}`;
    const [activeTab, setActiveTab] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(storageKey) || currentTabs[0]?.id || "";
        }
        return currentTabs[0]?.id || "";
    });

    // Update active tab when page changes
    useEffect(() => {
        const stored = localStorage.getItem(storageKey);
        setActiveTab(stored || currentTabs[0]?.id || "");
    }, [pathname, currentTabs, storageKey]);

    // Check scroll state
    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [currentTabs]);

    const scrollTabs = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 150;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
            setTimeout(checkScroll, 300);
        }
    };

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        localStorage.setItem(storageKey, tabId);
        onTabChange?.(tabId);

        // Dispatch custom event for page components to listen to
        const event = new CustomEvent('page-tab-change', { detail: { tabId, pathname } });
        window.dispatchEvent(event);
    };

    // Don't render if no tabs for current page
    if (currentTabs.length === 0) {
        return null;
    }

    return (
        <TooltipProvider delayDuration={300}>
            <div className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-xl",
                "border border-border/50 bg-muted/30",
                "shadow-[0_0_0_1px_rgba(var(--primary-rgb),0.1)]",
                className
            )}>
                {/* Scroll Left */}
                {canScrollLeft && (
                    <button
                        onClick={() => scrollTabs('left')}
                        className="shrink-0 p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                )}

                {/* Tabs Container */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex items-center gap-1 overflow-x-auto scrollbar-hide"
                >
                    {currentTabs.map((tab, index) => (
                        <Tooltip key={tab.id}>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => handleTabClick(tab.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all",
                                        activeTab === tab.id
                                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                                    )}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    <span className="hidden lg:inline">{tab.shortName}</span>
                                    <span className="lg:hidden">{tab.shortName.slice(0, 3)}</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                                <div className="font-medium">{tab.name}</div>
                                <div className="text-muted-foreground">⌘{index + 1}</div>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>

                {/* Scroll Right */}
                {canScrollRight && (
                    <button
                        onClick={() => scrollTabs('right')}
                        className="shrink-0 p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                )}
            </div>
        </TooltipProvider>
    );
}

// Export tabs config for use by pages
export { PAGE_TABS };
export type { TabConfig };
