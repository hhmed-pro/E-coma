import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "lucide-react"; // Wait, Link is from next/link usually. Oh, looking at previous file content, Link was next/link.
// Checking imports...
import { usePathname } from "next/navigation";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Clock, Target, Sparkles, X, ChevronUp as ChevronUpIcon, Bot, Lightbulb, TrendingUp, ThumbsUp, ThumbsDown } from "lucide-react";
import { CommandPalette } from "@/components/core/ui/command-palette";
import { cn } from "@/lib/utils";
import { useRightPanel } from "@/components/core/layout/RightPanelContext";
import { ActionToolbar } from "./ActionToolbar";
import { SessionModal } from "./SessionModal";
import { usePageActions } from "@/components/core/layout/PageActionsContext";
import { AISuggestion } from "@/types/ai-tips";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/core/ui/popover";
import { Button } from "@/components/core/ui/button";
import { Badge } from "@/components/core/ui/badge";
import { TEAMS } from "@/config/teams";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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
import { useMode } from "@/components/core/layout/ModeContext";
import { getFooterConfig } from "@/config/rightPanelFooterConfig";
import { ProductTour } from "@/components/core/layout/ProductTour";
import { TOUR_CONFIG } from "@/config/tour-config";
import { Flag } from "lucide-react";



interface EcosystemBarProps {
    onModuleClick?: (moduleId: string) => void;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

export function EcosystemBar({ onModuleClick, isExpanded = false, onToggleExpand }: EcosystemBarProps) {
    const { isTopNavCollapsed, isEcosystemBarCollapsed, toggleEcosystemBar } = useWindowLayout();
    const { isScrolled } = useScroll();
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [moduleStatuses, setModuleStatuses] = useState<Record<string, ModuleStatusInfo>>({});

    // Load module statuses
    useEffect(() => {
        const statuses: Record<string, ModuleStatusInfo> = {};
        ECOSYSTEM_MODULES.forEach(m => {
            statuses[m.id] = getModuleStatus(m.id);
        });
        setModuleStatuses(statuses);
    }, []);

    const getStatusColor = (status: ModuleStatusInfo) => STATUS_COLORS[status.status] || STATUS_COLORS.disconnected;

    const handleModuleClick = useCallback((moduleId: string) => {
        setActiveModule(prev => prev === moduleId ? null : moduleId);
        onModuleClick?.(moduleId);
    }, [onModuleClick]);



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



    // Session Info State relative to EcosystemBar
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [sessionStart] = useState<Date>(new Date()); // Mock session start
    const { isAdmin, mode } = useMode();
    const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const sessionDuration = Math.floor((currentTime.getTime() - sessionStart.getTime()) / 60000); // minutes

    const handleSessionClick = () => {
        if (!isAdmin) {
            setIsSessionModalOpen(true);
        } else {
            handleModuleClick('session');
        }
    };

    // Product Tour State
    const pathname = usePathname();
    const [isTourOpen, setIsTourOpen] = useState(false);
    const tourSteps = TOUR_CONFIG[pathname] || [];

    // AI Tips State
    const { suggestions, setSuggestions } = usePageActions();
    const [isAIOpen, setIsAIOpen] = useState(false);

    const getTypeIcon = (type: AISuggestion["type"]) => {
        switch (type) {
            case "timing": return Clock;
            case "trend": return TrendingUp;
            case "content": return Lightbulb;
            case "improvement": return Sparkles;
        }
    };

    const getTypeColor = (type: AISuggestion["type"]) => {
        switch (type) {
            case "timing": return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
            case "trend": return "text-green-500 bg-green-100 dark:bg-green-900/30";
            case "content": return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
            case "improvement": return "text-purple-500 bg-purple-100 dark:bg-purple-900/30";
        }
    };

    const dismissSuggestion = (id: string) => {
        setSuggestions(suggestions.filter(s => s.id !== id));
    };

    // Tabs Logic
    const { config, activeTab, setActiveTab, isOpen, setIsOpen } = useRightPanel();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const tabs = config?.tabs || [];
    const hasTabs = config?.enabled && tabs.length > 0;

    const scrollTabs = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    // Full bar view
    return (
        <TooltipProvider delayDuration={200}>
            {/* Product Tour Component */}
            {isTourOpen && (
                <ProductTour
                    steps={tourSteps}
                    autoStart={true}
                    onClose={() => setIsTourOpen(false)}
                />
            )}

            <div className={cn(
                "hidden md:block fixed z-[60] transition-all duration-300 left-0 right-0",
                // Collapse behavior - slide down when collapsed
                isEcosystemBarCollapsed
                    ? "translate-y-full opacity-0 pointer-events-none"
                    : "translate-y-0 opacity-100",
                // Always attached at bottom with consistent styling
                "bottom-0 border-t border-border/40 bg-card/85 backdrop-blur-md shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.5)]"
            )}>
                <div className="h-12 w-full flex items-center justify-between pl-4 pr-2 relative gap-4">

                    {/* LEFT SECTION: Session Info */}
                    <div className="flex items-center gap-4 shrink-0">
                        {/* Session Timer & User */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground border-r border-border/20 pr-4">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{sessionStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span className="text-muted-foreground/50">({sessionDuration}m)</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="font-medium text-foreground">User</span>
                        </div>

                        {/* Session Objectives Panel */}
                        <button
                            onClick={handleSessionClick}
                            className={cn(
                                "flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 group",
                                "bg-primary/10 text-primary border border-primary/20",
                                "hover:bg-primary/20 hover:border-primary/40 hover:shadow-[0_0_10px_hsl(var(--primary)/0.2)]",
                                activeModule === 'session' && "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                            )}
                        >
                            <Target className={cn(
                                "w-3.5 h-3.5 transition-transform duration-500",
                                activeModule === 'session' && "rotate-180 scale-110",
                                "group-hover:rotate-12"
                            )} />
                            <span>{mode === "ADMIN" ? "Admin Objectives" : "Session Objectives"}</span>
                        </button>
                    </div>

                    {/* CENTER SECTION: Modules OR Tabs */}
                    <div className="flex-1 flex items-center justify-center min-w-0 px-4">
                        {hasTabs ? (
                            /* TABS VIEW */
                            <div className="flex items-center gap-2 overflow-hidden w-full justify-center max-w-4xl relative group/tabs">
                                {/* Left Scroll Button */}
                                <button
                                    onClick={() => scrollTabs("left")}
                                    className="hidden md:flex absolute left-0 z-20 p-1 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white opacity-0 group-hover/tabs:opacity-100 transition-opacity"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                </button>

                                <div
                                    ref={scrollContainerRef}
                                    className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-none px-6 h-8 w-full"
                                >
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={cn(
                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border border-transparent click-feedback",
                                                activeTab === tab.id
                                                    ? "bg-green-500 text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
                                                        : "bg-muted text-muted-foreground border border-border"
                                                )}>
                                                    {tab.badge}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Right Scroll Button */}
                                <button
                                    onClick={() => scrollTabs("right")}
                                    className="hidden md:flex absolute right-0 z-20 p-1 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white opacity-0 group-hover/tabs:opacity-100 transition-opacity"
                                >
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ) : (
                            /* MODULES VIEW (Fallback if no tabs) */
                            <div className="flex items-center gap-2">
                                {allModules.map(renderModuleButton)}
                            </div>
                        )}
                    </div>

                    {/* RIGHT SECTION: Search & Tour & Detail Toggle */}
                    <div className="flex items-center gap-2 shrink-0">

                        {/* Collaboration UI (Moved from CollaborationBar) - ONLY IN ADMIN MODE */}
                        {mode === "ADMIN" && (
                            <div className="hidden lg:flex items-center gap-3 mr-2 pr-2 border-r border-border/20">
                                {/* Active Teams Count */}
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                                    <Users className="h-3.5 w-3.5" />
                                    <span>{TEAMS.length} Active Teams</span>
                                </div>

                                {/* Team Icons */}
                                <div className="flex -space-x-1.5">
                                    {TEAMS.map((team, index) => (
                                        <Tooltip key={team.id}>
                                            <TooltipTrigger asChild>
                                                <motion.button
                                                    whileHover={{ scale: 1.1, zIndex: 10 }}
                                                    className="relative group"
                                                    onClick={() => {
                                                        if (typeof window !== 'undefined') {
                                                            const event = new CustomEvent('open-module', { detail: 'session' });
                                                            window.dispatchEvent(event);
                                                        }
                                                    }}
                                                >
                                                    <div className={cn(
                                                        "flex items-center justify-center w-7 h-7 rounded-full border border-background cursor-pointer bg-card shadow-sm",
                                                        "hover:ring-2 hover:ring-primary ring-offset-1 ring-offset-background"
                                                    )}>
                                                        <team.icon className={cn("h-3.5 w-3.5", team.color)} />
                                                    </div>
                                                    {/* Active indicator */}
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-background rounded-full z-20" />
                                                </motion.button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs">
                                                <div className="font-medium">{team.name}</div>
                                                <div className="text-muted-foreground">Click to manage session</div>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* AI Tips Button (Left of Search) */}
                        <Popover open={isAIOpen} onOpenChange={setIsAIOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "h-9 w-9 p-0 rounded-full hover:bg-muted relative transition-colors",
                                        isAIOpen && "bg-primary/10 text-primary",
                                        suggestions.length > 0 && "text-primary"
                                    )}
                                >
                                    <Bot className="h-5 w-5" />
                                    {suggestions.length > 0 && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[9px] ring-2 ring-background"
                                        >
                                            {suggestions.length}
                                        </Badge>
                                    )}
                                    <span className="sr-only">AI Tips</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0" align="end" sideOffset={12}>
                                <div className="p-3 border-b bg-muted/30">
                                    <div className="flex items-center gap-2">
                                        <Bot className="h-4 w-4 text-primary" />
                                        <span className="font-semibold text-sm">AI Suggestions</span>
                                        <Badge variant="secondary" className="text-[10px] ml-auto">
                                            {suggestions.length} tips
                                        </Badge>
                                    </div>
                                </div>
                                <div className="max-h-64 overflow-y-auto p-2 space-y-2">
                                    {suggestions.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            No suggestions right now. Keep creating! ✨
                                        </p>
                                    ) : (
                                        suggestions.map((suggestion) => {
                                            const Icon = getTypeIcon(suggestion.type);
                                            return (
                                                <div
                                                    key={suggestion.id}
                                                    className="p-3 rounded-lg bg-muted/50 border hover:bg-muted/80 transition-colors"
                                                >
                                                    <div className="flex items-start gap-2">
                                                        <div className={cn("p-1.5 rounded-md", getTypeColor(suggestion.type))}>
                                                            <Icon className="h-3.5 w-3.5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-xs">{suggestion.title}</p>
                                                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                                                {suggestion.description}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                {suggestion.action && (
                                                                    <Button size="sm" variant="outline" className="h-6 text-[10px] gap-1">
                                                                        {suggestion.action}
                                                                        <ChevronRight className="h-3 w-3" />
                                                                    </Button>
                                                                )}
                                                                <div className="flex-1" />
                                                                <button
                                                                    onClick={() => dismissSuggestion(suggestion.id)}
                                                                    className="p-1 text-muted-foreground hover:text-green-500"
                                                                    aria-label="Helpful"
                                                                >
                                                                    <ThumbsUp className="h-3 w-3" />
                                                                </button>
                                                                <button
                                                                    onClick={() => dismissSuggestion(suggestion.id)}
                                                                    className="p-1 text-muted-foreground hover:text-red-500"
                                                                    aria-label="Not helpful"
                                                                >
                                                                    <ThumbsDown className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Search */}
                        <CommandPalette compact className="bg-transparent border-0 hover:bg-muted/50" />

                        {/* Detail Panel Toggle (from HeaderTabs) */}
                        {hasTabs && (
                            <>
                                <div className="h-4 w-px bg-border/50 mx-1" />
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className={cn(
                                        "p-1.5 rounded-lg transition-all duration-200",
                                        "text-zinc-400 hover:text-foreground hover:bg-muted",
                                        isOpen && "bg-green-500/20 text-green-500"
                                    )}
                                    title={isOpen ? "Hide details" : "Show details"}
                                >
                                    <ChevronUpIcon className={cn(
                                        "h-4 w-4 transition-transform duration-200",
                                        isOpen && "rotate-180"
                                    )} />
                                </button>
                            </>
                        )}

                        {/* Product Tour Trigger */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 w-9 p-0 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsTourOpen(true)}
                                >
                                    <Flag className="h-4 w-4" />
                                    <span className="sr-only">Start Product Tour</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Take a Tour</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                </div>
            </div>

            <SessionModal
                isOpen={isSessionModalOpen}
                onClose={() => setIsSessionModalOpen(false)}
            />
        </TooltipProvider>
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

    if (!footerConfig) return null;

    return (

        <div
            className={cn(
                "fixed z-40 px-4 md:px-6 flex justify-start animate-in slide-in-from-top-2 fade-in-0 duration-200",
                isScrolled ? "top-[84px]" : "top-[140px]"
            )}
            style={detailPanelStyle}
        >
            <div className="w-full px-4 py-2 bg-card/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl">
                <div className="flex items-center justify-between gap-4">
                    {/* Left Side - Tab Info */}
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground flex items-center gap-2 text-sm">
                            <span className="text-base">{footerConfig.icon}</span>
                            {footerConfig.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight truncate">
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
