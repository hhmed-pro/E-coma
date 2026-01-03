"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/core/ui/button";
import {
    MoreHorizontal,
    Bot,
    Clock,
    TrendingUp,
    Lightbulb,
    Sparkles,
    ChevronRight,
    ThumbsUp,
    ThumbsDown,
    LucideIcon
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/core/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/core/ui/popover";
import { Badge } from "@/components/core/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
export interface QuickAction {
    id: string;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
    hoverColor?: string;
    hidden?: boolean;
}

export interface MoreAction {
    id: string;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    iconColor?: string;
    separator?: boolean;
}

export interface AISuggestion {
    id: string;
    type: "timing" | "content" | "trend" | "improvement";
    title: string;
    description: string;
    action?: string;
    priority?: "high" | "medium" | "low";
}

export interface QuickActionsBarProps {
    primaryAction?: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
    };
    actions?: QuickAction[];
    moreActions?: MoreAction[];
    showAITips?: boolean;
    suggestions?: AISuggestion[];
    onDismissSuggestion?: (id: string) => void;
    className?: string;
    children?: ReactNode;
}

/**
 * QuickActionsBar - Reusable horizontal bar with configurable quick-access buttons
 * Each page can configure its own primary action, quick actions, and AI tips
 */
export function QuickActionsBar({
    primaryAction,
    actions = [],
    moreActions = [],
    showAITips = false,
    suggestions = [],
    onDismissSuggestion,
    className,
    children,
}: QuickActionsBarProps) {
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [localSuggestions, setLocalSuggestions] = useState<AISuggestion[]>(suggestions);

    const dismissSuggestion = (id: string) => {
        setLocalSuggestions(prev => prev.filter(s => s.id !== id));
        onDismissSuggestion?.(id);
    };

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

    const visibleActions = actions.filter(a => !a.hidden);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "flex items-center gap-2 p-3 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl border border-primary/20 shadow-sm",
                className
            )}
        >
            {/* Primary CTA */}
            {primaryAction && (
                <>
                    <Button
                        onClick={primaryAction.onClick}
                        className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md"
                    >
                        <primaryAction.icon className="h-4 w-4" />
                        {primaryAction.label}
                    </Button>
                    <div className="h-6 w-px bg-border mx-1" />
                </>
            )}

            {/* Quick Tool Shortcuts */}
            {visibleActions.map(action => (
                <Button
                    key={action.id}
                    variant={action.variant || "outline"}
                    size="sm"
                    className={cn("gap-2", action.hoverColor)}
                    onClick={action.onClick}
                >
                    <action.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{action.label}</span>
                </Button>
            ))}

            {/* AI Tips Popover */}
            {showAITips && (
                <Popover open={isAIOpen} onOpenChange={setIsAIOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "gap-2 relative",
                                isAIOpen && "bg-primary/10 border-primary"
                            )}
                        >
                            <Bot className="h-4 w-4 text-primary" />
                            <span className="hidden sm:inline">AI Tips</span>
                            {localSuggestions.length > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
                                >
                                    {localSuggestions.length}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                        <div className="p-3 border-b bg-muted/30">
                            <div className="flex items-center gap-2">
                                <Bot className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-sm">AI Suggestions</span>
                                <Badge variant="secondary" className="text-[10px] ml-auto">
                                    {localSuggestions.length} tips
                                </Badge>
                            </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto p-2 space-y-2">
                            {localSuggestions.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No suggestions right now. Keep creating! ✨
                                </p>
                            ) : (
                                localSuggestions.map((suggestion) => {
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
            )}

            {/* More Tools Dropdown */}
            {moreActions.length > 0 && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="hidden sm:inline">More</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {moreActions.map((action, idx) => (
                            <div key={action.id}>
                                {action.separator && idx > 0 && <DropdownMenuSeparator />}
                                <DropdownMenuItem onClick={action.onClick} className="gap-2">
                                    <action.icon className={cn("h-4 w-4", action.iconColor)} />
                                    {action.label}
                                </DropdownMenuItem>
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {/* Additional children */}
            {children}
        </motion.div>
    );
}
