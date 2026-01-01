"use client";

import Link from "next/link";
import { Button } from "@/components/core/ui/button";
import { cn } from "@/lib/utils";
import {
    Activity,
    GitBranch,
    Phone,
    MessageSquare,
    MessageCircle,
    Clock,
    CheckCircle,
    Mail,
    Users,
    UserCheck,
    UserPlus,
    Trophy,
    User,
    Radio,
    LucideIcon,
} from "lucide-react";

interface ReportSection {
    id: string;
    label: string;
    labelFr: string;
    icon: LucideIcon;
}

const REPORT_SECTIONS: ReportSection[] = [
    { id: 'lifecycle', label: 'Lifecycle', labelFr: 'Lifecycle', icon: GitBranch },
    { id: 'calls', label: 'Calls', labelFr: 'Appels', icon: Phone },
    { id: 'conversations', label: 'Conversations', labelFr: 'Conversations', icon: MessageSquare },
    { id: 'responses', label: 'Responses', labelFr: 'Réponses', icon: Clock },
    { id: 'resolutions', label: 'Resolutions', labelFr: 'Résolutions', icon: CheckCircle },
    { id: 'messages', label: 'Messages', labelFr: 'Messages', icon: Mail },
    { id: 'contacts', label: 'Contacts', labelFr: 'Contacts', icon: Users },
    { id: 'assignments', label: 'Assignments', labelFr: 'Assignments', icon: UserPlus },
    { id: 'leaderboard', label: 'Leaderboard', labelFr: 'Leaderboard', icon: Trophy },
    { id: 'users', label: 'Users', labelFr: 'Utilisateurs', icon: User },
    { id: 'broadcasts', label: 'Broadcasts', labelFr: 'Broadcasts', icon: Radio },
];

export interface ReportSidebarProps {
    /** Active section/category */
    activeSection: string;
    /** Section change handler */
    onSectionChange?: (section: string) => void;
    /** Locale for labels */
    locale?: 'en' | 'fr';
    /** Visual variant */
    variant?: 'button' | 'link';
    /** Show learn more link */
    showLearnMore?: boolean;
    /** Additional className */
    className?: string;
}

const STRINGS = {
    en: {
        title: 'Reports',
        learnMore: 'Learn more about reports'
    },
    fr: {
        title: 'Rapports',
        learnMore: 'En savoir plus sur les rapports'
    }
};

/**
 * ReportSidebar Component
 * 
 * Consolidated from:
 * - components/analytics/ReportSidebar.tsx (French, Button-based)
 * - components/reports/ReportSidebar.tsx (English, div-based)
 */
export function ReportSidebar({
    activeSection,
    onSectionChange,
    locale = 'en',
    variant = 'link',
    showLearnMore = true,
    className
}: ReportSidebarProps) {
    const t = STRINGS[locale];

    return (
        <div className={cn(
            "w-56 border-r bg-muted/20 dark:bg-slate-800/50 min-h-full flex flex-col",
            variant === 'button' ? "p-4" : "p-2",
            className
        )}>
            {variant === 'button' && (
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    {t.title}
                </h3>
            )}

            <nav className="space-y-1 flex-1">
                {REPORT_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    const label = locale === 'fr' ? section.labelFr : section.label;

                    if (variant === 'button') {
                        return (
                            <Button
                                key={section.id}
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-3 font-medium transition-all",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700"
                                )}
                                onClick={() => onSectionChange?.(section.id)}
                            >
                                <Icon
                                    className={cn(
                                        "h-4 w-4",
                                        isActive ? "text-indigo-600 dark:text-indigo-400" : ""
                                    )}
                                />
                                {label}
                            </Button>
                        );
                    }

                    return (
                        <div
                            key={section.id}
                            onClick={() => onSectionChange?.(section.id)}
                            className={cn(
                                "group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-all relative",
                                isActive
                                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Icon
                                    className={cn(
                                        "h-4 w-4",
                                        isActive
                                            ? "text-indigo-600 dark:text-indigo-400"
                                            : "text-slate-400 group-hover:text-slate-600"
                                    )}
                                />
                                {label}
                            </div>
                        </div>
                    );
                })}
            </nav>

            {showLearnMore && (
                <div className="mt-auto pt-4 border-t px-3">
                    <Link
                        href="#"
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2"
                    >
                        {t.learnMore}
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ReportSidebar;
