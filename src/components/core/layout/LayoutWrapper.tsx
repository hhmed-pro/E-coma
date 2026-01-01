"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { IconSidebar } from "./IconSidebar";
import { CategoryRightPanel } from "./CategoryRightPanel";
import { TopNavigation } from "./TopNavigation";
import { EcosystemBar } from "./EcosystemBar";
import { BottomPanel } from "./BottomPanel";
import { HeaderTabs } from "./HeaderTabs";
import { SplitLayout } from "./SplitLayout";
import { PAGE_INFO_CONFIG, SUBTABS_CONFIG } from "./SecondTopBar";
import { RightPanelProvider, useRightPanel } from "./RightPanelContext";
import { WindowLayoutProvider, useWindowLayout } from "./WindowLayoutContext";
import { ScrollProvider, useScroll } from "./ScrollContext";
import { HelpProvider } from "./HelpContext";
import { PageActionsProvider, usePageActions } from "./PageActionsContext";
import { CommandPalette } from "@/components/core/ui/command-palette";
import { NotificationCenter } from "@/components/core/ui/notification-center";

import { FloatingHelpWidget } from "@/components/help/FloatingHelpWidget";

import { MobileSidebar, BottomTabBar } from "@/components/core/ui/mobile-sidebar";
import { PeriodSelector } from "@/components/core/ui/period-selector";
import { ViewModeToggle } from "@/components/core/ui/view-mode-toggle";
import { Breadcrumb, BreadcrumbItem } from "@/components/core/ui/breadcrumb";
import { Settings, Maximize2, Minimize2, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Period } from "@/components/core/ui/period-selector";
import { ProfileMenu } from "./ProfileMenu";
import { saveLastVisitedPage } from "@/lib/last-visited";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

// Inner component that uses the context
function LayoutContent({ children }: LayoutWrapperProps) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<Period>("today");
    const [viewMode, setViewMode] = useState<"count" | "rate">("count");
    const { config, isOpen, togglePanel } = useRightPanel();
    const { isTopNavCollapsed, toggleTopNav, setRightPanelOpen } = useWindowLayout();
    const { isScrolled } = useScroll();
    const { actions: pageActions } = usePageActions();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab");
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Generate breadcrumbs based on current path and config
    // Must be before any early returns to satisfy React hooks rules
    const breadcrumbs = useMemo(() => {
        const items: BreadcrumbItem[] = [];
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 0) return items;

        const routeMap: Record<string, { label: string; href: string }> = {
            'ecommerce': { label: 'E-Commerce', href: '/ecommerce/orders' },
            'social': { label: 'Social Content', href: '/social/inbox' },
            'marketing': { label: 'Marketing & ADS', href: '/marketing/ads-manager' },
            'beta': { label: 'Beta', href: '/beta' },
            'admin': { label: 'Admin', href: '/admin/general' },
        };

        if (segments.length >= 1 && routeMap[segments[0]]) {
            items.push({
                label: routeMap[segments[0]].label,
                href: routeMap[segments[0]].href
            });
        }
        return items;
    }, [pathname]);

    // Track last visited page for redirect on next visit
    useEffect(() => {
        saveLastVisitedPage(pathname);
    }, [pathname]);

    // Sync focus mode with fullscreen changes (e.g. Esc key)
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFocusMode(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Skip full layout for hub page (fullscreen mode)
    if (pathname === '/hub') {
        return <>{children}</>;
    }

    const handleProfileMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsProfileMenuOpen(true);
    };

    const handleProfileMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsProfileMenuOpen(false);
        }, 300);
    };
    const handleModuleClick = (moduleId: string) => {
        if (activeModule === moduleId && isPanelOpen) {
            setIsPanelOpen(false);
            setActiveModule(null);
        } else {
            setActiveModule(moduleId);
            setIsPanelOpen(true);
        }
    };


    const handleToggleExpand = () => {
        // Toggle panel expansion logic only
        if (isPanelOpen) {
            setIsPanelOpen(false);
            setActiveModule(null);
        }
    };



    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setActiveModule(null);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground relative selection:bg-primary/30">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            {/* Top Navigation - Floating Capsule */}
            <TopNavigation />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-300 ${isFocusMode ? 'pt-4' : 'pt-2'}`}>


                {/* Content Row with Split Layout */}
                <div className="flex-1 flex relative px-4 md:px-6">
                    <SplitLayout
                        rightContent={config?.content || <CategoryRightPanel />}
                        isFocusMode={isFocusMode}
                        onExitFocusMode={() => {
                            setIsFocusMode(false);
                            if (document.fullscreenElement) {
                                document.exitFullscreen().catch(() => { });
                            }
                        }}
                    >
                        <main className={`p-4 md:p-6 pb-20 md:pb-16 ${isPanelOpen ? "mb-80" : ""}`}>
                            {/* Main Content Toolbar has been removed to use in-page headers */}
                            {/* Subtabs Only Area (Page Info Moved Up) */}
                            <div>
                                {(() => {
                                    // Check if current route has sub-tabs
                                    const subtabs = SUBTABS_CONFIG[pathname];
                                    const hasSubtabs = subtabs && subtabs.length > 0;
                                    const pageInfo = PAGE_INFO_CONFIG[pathname]; // Keep reference for HeaderTabs fallback if needed

                                    // If route has sub-tabs, render them inline
                                    if (hasSubtabs) {
                                        const activeTab = currentTab || subtabs[0].param;
                                        return (
                                            <div className="flex items-center gap-1 border-b border-white/5 pb-1">
                                                {subtabs.map((tab) => {
                                                    const isActive = tab.param === activeTab;
                                                    const href = `${tab.href}?tab=${tab.param}`;
                                                    return (
                                                        <Link
                                                            key={tab.param}
                                                            href={href}
                                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${isActive
                                                                ? "bg-white/10 text-white shadow-sm"
                                                                : "text-white/60 hover:text-white hover:bg-white/5"
                                                                }`}
                                                        >
                                                            {tab.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        );
                                    }

                                    // If pageInfo was handled above, we don't need to render it here again.
                                    // But if it's the specific case that fell through to HeaderTabs (e.g. Home page might not have pageInfo configured?), we check here.

                                    if (!pageInfo && !hasSubtabs) {
                                        return <HeaderTabs />;
                                    }

                                    return null;
                                })()}
                            </div>
                            {children}
                        </main>
                    </SplitLayout>
                </div>
            </div>

            {/* Ecosystem Bar - Bottom */}
            <EcosystemBar
                onModuleClick={handleModuleClick}
                isExpanded={isPanelOpen}
                onToggleExpand={handleToggleExpand}
            />

            {/* Bottom Panel - Expandable */}
            <BottomPanel
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
                activeModule={activeModule}
            />

            {/* Mobile Bottom Tab Bar */}
            <div className="md:hidden">
                <BottomTabBar />
            </div>

            {/* Floating Widgets */}
            <FloatingHelpWidget />

            {/* Floating Exit Focus Mode Button - Removed */}
        </div>
    );
}

// Wrap with provider
export function LayoutWrapper({ children }: LayoutWrapperProps) {
    return (
        <HelpProvider>
            <ScrollProvider threshold={100}>
                <WindowLayoutProvider>
                    <RightPanelProvider>
                        <PageActionsProvider>
                            <LayoutContent>{children}</LayoutContent>
                        </PageActionsProvider>
                    </RightPanelProvider>
                </WindowLayoutProvider>
            </ScrollProvider>
        </HelpProvider>
    );
}
