"use client";

import { useRightPanel } from "./RightPanelContext";
import { useScroll } from "./ScrollContext";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, ChevronDown, Settings, Plus } from "lucide-react";
import { getFooterConfig } from "@/config/rightPanelFooterConfig";
import { WindowLayoutProvider, useWindowLayout } from "./WindowLayoutContext";

export function HeaderTabs() {
    const { config, activeTab, setActiveTab, isOpen, setIsOpen } = useRightPanel();
    const { isScrolled } = useScroll();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);

    const tabs = useMemo(() => config?.tabs || [], [config?.tabs]);
    const enabled = config?.enabled && tabs.length > 0;

    // Get current tab config for detail panel
    const activeTabConfig = useMemo(() => {
        const tab = tabs.find(t => t.id === activeTab);
        const footerInfo = getFooterConfig(activeTab);
        return {
            ...tab,
            ...footerInfo
        };
    }, [tabs, activeTab]);

    useEffect(() => {
        if (!enabled) return;

        // Check overflow and update fade indicators
        const checkOverflow = () => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                setShowLeftFade(scrollLeft > 0);
                setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
            }
        };

        checkOverflow();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkOverflow);
            window.addEventListener('resize', checkOverflow);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkOverflow);
            }
            window.removeEventListener('resize', checkOverflow);
        };
    }, [tabs, enabled]);

    if (!enabled) return null;

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="flex items-center h-full w-full px-2 relative">
            {/* Tabs Section - Scrollable Center */}
            <div className="flex-1 min-w-0 flex items-center relative group/tabs">
                {/* Left Fade Gradient */}
                {showLeftFade && (
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10" />
                )}

                {/* Left Scroll Button */}
                <button
                    onClick={() => scroll("left")}
                    className={cn(
                        "hidden md:flex absolute left-0 z-20 p-1 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white transition-all",
                        showLeftFade ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-none px-4 h-8 w-full"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border border-transparent click-feedback",
                                activeTab === tab.id
                                    ? "bg-green-500 text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/5 hover:shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                            )}
                        >
                            {tab.icon && (
                                <span className={cn("h-3.5 w-3.5", activeTab === tab.id ? "text-black" : "text-current")}>
                                    {tab.icon}
                                </span>
                            )}
                            <span>{tab.label}</span>
                            {tab.badge !== undefined && (
                                <span className={cn(
                                    "ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full",
                                    activeTab === tab.id
                                        ? "bg-black/20 text-black"
                                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                                )}>
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Right Fade Gradient */}
                {showRightFade && (
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10" />
                )}

                {/* Right Scroll Button */}
                <button
                    onClick={() => scroll("right")}
                    className={cn(
                        "hidden md:flex absolute right-0 z-20 p-1 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white transition-all",
                        showRightFade ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>

            {/* Actions (if any) */}
            {config?.actions && !isScrolled && (
                <div className="flex items-center gap-2 ml-2 hidden md:flex">
                    {config.actions}
                </div>
            )}

            {/* Vertical Divider - Hidden when scrolled */}
            {
                !isScrolled && (
                    <div className="h-5 w-px bg-white/10 ml-3 hidden md:block" />
                )
            }

            {/* Detail Panel Toggle - Right Side (hidden when scrolled, moves to top bar) */}
            {
                !isScrolled && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "ml-2 p-1.5 rounded-lg transition-all duration-200",
                            "text-zinc-400 hover:text-white hover:bg-white/10",
                            isOpen && "bg-green-500/20 text-green-400"
                        )}
                        title={isOpen ? "Hide details" : "Show details"}
                    >
                        <ChevronDown className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isOpen && "rotate-180"
                        )} />
                    </button>
                )
            }
        </div >
    );
}

/**
 * Detail Panel Component - Shows below the header when expanded
 */
export function DetailPanel() {
    const { config, activeTab, isOpen } = useRightPanel();
    const { isScrolled } = useScroll();
    const { detailPanelStyle, setDetailPanelOpen } = useWindowLayout();

    // Sync visibility state with layout manager
    useEffect(() => {
        setDetailPanelOpen(isOpen);
    }, [isOpen, setDetailPanelOpen]);

    if (!config?.enabled || !isOpen) return null;

    const footerConfig = getFooterConfig(activeTab);
    const activeTabInfo = config?.tabs?.find(t => t.id === activeTab);

    return (

        <div
            className={cn(
                "fixed left-6 z-40 px-4 md:px-6 flex justify-start animate-in slide-in-from-top-2 fade-in-0 duration-200",
                isScrolled ? "top-[84px]" : "top-[140px]"
            )}
            style={detailPanelStyle}
        >
            <div className="w-full px-4 py-2 bg-card/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl">
                <div className="flex items-center justify-between gap-4">
                    {/* Left Side - Tab Info */}
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-white flex items-center gap-2 text-sm">
                            <span className="text-base">{footerConfig.icon}</span>
                            {footerConfig.title}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight truncate">
                            {footerConfig.description}
                        </p>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex items-center gap-1">
                    </div>
                </div>
            </div>
        </div>
    );
}
