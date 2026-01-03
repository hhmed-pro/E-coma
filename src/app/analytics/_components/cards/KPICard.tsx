"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/core/ui/card";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface KPICardProps {
    /** Title of the KPI */
    title: string;
    /** Value to display */
    value: string | number;
    /** Trend - can be a number (percentage) or string direction */
    trend?: number | 'up' | 'down' | 'neutral';
    /** Label shown next to trend (e.g., "vs last period") */
    trendLabel?: string;
    /** Change text (legacy, use trend instead) */
    change?: string;
    /** Icon - can be ReactNode or LucideIcon */
    icon?: React.ReactNode | LucideIcon;
    /** Icon color class (for LucideIcon) */
    iconColor?: string;
    /** Icon background class (for LucideIcon) */
    iconBg?: string;
    /** Highlight style (gradient background) */
    highlight?: boolean;
    /** Enable Framer Motion animation */
    animated?: boolean;
    /** Animation delay (seconds) */
    delay?: number;
    /** Value prefix (e.g., "$") */
    valuePrefix?: string;
    /** Value suffix (e.g., "%") */
    valueSuffix?: string;
    /** Additional className */
    className?: string;
}

/**
 * KPICard Component
 * 
 * Consolidated from:
 * - components/analytics/KPICard.tsx (Framer Motion, LucideIcon, highlight)
 * - components/ui/kpi-card.tsx (prefix/suffix, ReactNode icon, KPIGrid)
 */
export function KPICard({
    title,
    value,
    trend,
    trendLabel = "vs last period",
    change,
    icon,
    iconColor = "text-indigo-600",
    iconBg = "bg-indigo-100",
    highlight = false,
    animated = false,
    delay = 0,
    valuePrefix,
    valueSuffix,
    className,
}: KPICardProps) {
    // Determine trend direction
    const getTrendDirection = (): 'up' | 'down' | 'neutral' => {
        if (trend === 'up' || trend === 'down' || trend === 'neutral') {
            return trend;
        }
        if (typeof trend === 'number') {
            if (trend > 0) return 'up';
            if (trend < 0) return 'down';
            return 'neutral';
        }
        // If using legacy 'change' prop, try to determine from the text
        if (change) {
            if (change.includes('+') || change.includes('↑')) return 'up';
            if (change.includes('-') || change.includes('↓')) return 'down';
        }
        return 'neutral';
    };

    const trendDirection = getTrendDirection();
    const TrendIcon = trendDirection === 'up' ? TrendingUp : trendDirection === 'down' ? TrendingDown : Minus;

    const getTrendColor = () => {
        if (highlight) return 'text-indigo-200';
        if (trendDirection === 'up') return 'text-green-600';
        if (trendDirection === 'down') return 'text-red-600';
        return 'text-muted-foreground';
    };

    const formatTrend = () => {
        if (change) return change;
        if (typeof trend === 'number') {
            const sign = trend > 0 ? '+' : '';
            return `${sign}${trend.toFixed(1)}%`;
        }
        return null;
    };

    // Check if icon is a LucideIcon (function) or ReactNode
    const isLucideIcon = typeof icon === 'function';
    const IconComponent = isLucideIcon ? (icon as LucideIcon) : null;

    const cardContent = (
        <Card
            className={cn(
                "transition-all duration-300 hover:shadow-lg",
                highlight
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-none shadow-lg dark:from-indigo-500 dark:to-indigo-600"
                    : "bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700",
                !animated && className
            )}
        >
            <CardContent className="p-6">
                {/* Background gradient overlay for non-highlight */}
                {!highlight && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none rounded-xl" />
                )}

                <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    {icon && (
                        <div
                            className={cn(
                                "p-3 rounded-xl flex items-center justify-center",
                                highlight ? "bg-white/20" : `${iconBg} dark:bg-opacity-20`
                            )}
                        >
                            {IconComponent ? (
                                <IconComponent
                                    className={cn(
                                        "w-6 h-6",
                                        highlight ? "text-white" : iconColor
                                    )}
                                />
                            ) : (
                                <div className={cn(highlight ? "text-white" : "text-primary")}>
                                    {icon as React.ReactNode}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                        <p
                            className={cn(
                                "text-sm font-medium",
                                highlight ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"
                            )}
                        >
                            {title}
                        </p>

                        <div className="flex items-baseline gap-1 mt-1">
                            {valuePrefix && (
                                <span className={cn(
                                    "text-lg font-medium",
                                    highlight ? "text-indigo-200" : "text-muted-foreground"
                                )}>
                                    {valuePrefix}
                                </span>
                            )}
                            <span
                                className={cn(
                                    "text-2xl font-bold tracking-tight",
                                    highlight ? "text-white" : "text-slate-900 dark:text-white"
                                )}
                            >
                                {value}
                            </span>
                            {valueSuffix && (
                                <span className={cn(
                                    "text-lg font-medium",
                                    highlight ? "text-indigo-200" : "text-muted-foreground"
                                )}>
                                    {valueSuffix}
                                </span>
                            )}
                        </div>

                        {/* Trend */}
                        {(trend !== undefined || change) && (
                            <div className={cn(
                                "flex items-center gap-1.5 mt-2 text-xs",
                                getTrendColor()
                            )}>
                                <TrendIcon className="w-3 h-3" />
                                <span>{formatTrend()}</span>
                                {trendLabel && typeof trend === 'number' && (
                                    <span className={cn(
                                        "text-xs",
                                        highlight ? "text-indigo-200" : "text-muted-foreground"
                                    )}>
                                        {trendLabel}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    if (animated) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.3 }}
                className={className}
            >
                {cardContent}
            </motion.div>
        );
    }

    return cardContent;
}

// Grid wrapper for KPI cards
interface KPIGridProps {
    children: React.ReactNode;
    className?: string;
    columns?: 2 | 3 | 4 | 5;
}

export function KPIGrid({ children, className, columns = 4 }: KPIGridProps) {
    const gridCols = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    };

    return (
        <div className={cn("grid gap-4", gridCols[columns], className)}>
            {children}
        </div>
    );
}

export default KPICard;
