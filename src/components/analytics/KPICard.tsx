"use client";

import { Card, CardContent } from "@/components/core/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KPICardProps {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
    icon?: LucideIcon;
    iconColor?: string;
    iconBg?: string;
    highlight?: boolean;
    delay?: number;
}

export function KPICard({
    title,
    value,
    change,
    trend,
    icon: Icon,
    iconColor = "text-indigo-600",
    iconBg = "bg-indigo-100",
    highlight = false,
    delay = 0,
}: KPICardProps) {
    const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
    const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-slate-500";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
        >
            <Card
                className={cn(
                    "transition-all duration-300 hover:shadow-lg",
                    highlight
                        ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-none shadow-lg dark:from-indigo-500 dark:to-indigo-600"
                        : "bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
                )}
            >
                <CardContent className="p-6 flex items-center gap-4">
                    {Icon && (
                        <div
                            className={cn(
                                "p-3 rounded-xl",
                                highlight ? "bg-white/20" : `${iconBg} dark:bg-opacity-20`
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-6 h-6",
                                    highlight ? "text-white" : iconColor
                                )}
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <p
                            className={cn(
                                "text-sm font-medium",
                                highlight ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"
                            )}
                        >
                            {title}
                        </p>
                        <h3
                            className={cn(
                                "text-2xl font-bold mt-1",
                                highlight ? "text-white" : "text-slate-900 dark:text-white"
                            )}
                        >
                            {value}
                        </h3>
                        <div
                            className={cn(
                                "flex items-center gap-1 mt-1 text-xs",
                                highlight ? "text-indigo-200" : trendColor
                            )}
                        >
                            <TrendIcon className="w-3 h-3" />
                            <span>{change}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
