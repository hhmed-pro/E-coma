"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useWindowLayout } from "@/components/core/layout/WindowLayoutContext";
import { useScroll } from "@/components/core/layout/ScrollContext";
import { NotificationCenter } from "@/components/core/ui/notification-center";
import { FullscreenToggle } from "@/components/core/ui/fullscreen-toggle";

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    actions?: ReactNode;
    className?: string;
}

export function PageHeader({ title, description, icon, actions, className }: PageHeaderProps) {
    const { isTopNavCollapsed, toggleTopNav } = useWindowLayout();
    const { isScrolled } = useScroll();

    return (
        <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", className)}>
            <div className="flex items-center gap-4 overflow-hidden">
                {/* Sidebar Toggle - Conditional */}
                {isTopNavCollapsed && !isScrolled && (
                    <button
                        onClick={toggleTopNav}
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-lg shrink-0"
                        title="Expand Navigation"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}

                <div className="flex flex-col justify-center min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        {icon && <span className="text-muted-foreground">{icon}</span>}
                        {title}
                    </h1>
                    {description && (
                        <p className="text-muted-foreground text-sm truncate max-w-[600px]">{description}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                {actions}

                {/* Notification & Fullscreen - Show when collapsed and not scrolled */}
                {isTopNavCollapsed && !isScrolled && (
                    <div className="flex items-center gap-1 pl-2 ml-2 border-l border-white/10">
                        <NotificationCenter />
                        <FullscreenToggle className="hidden md:flex" />
                    </div>
                )}
            </div>
        </div>
    );
}
