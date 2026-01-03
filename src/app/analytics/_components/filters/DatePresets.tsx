"use client";

import { Button } from "@/components/core/ui/button";
import { cn } from "@/lib/utils";

export interface DatePreset {
    id: string;
    label: string;
    labelFr: string;
    days: number;
}

const DATE_PRESETS: DatePreset[] = [
    { id: 'today', label: 'Today', labelFr: "Aujourd'hui", days: 0 },
    { id: 'yesterday', label: 'Yesterday', labelFr: 'Hier', days: 1 },
    { id: 'last7', label: 'Last 7 days', labelFr: '7 derniers jours', days: 7 },
    { id: 'last14', label: 'Last 14 days', labelFr: '14 derniers jours', days: 14 },
    { id: 'last30', label: 'Last 30 days', labelFr: '30 derniers jours', days: 30 },
    { id: 'last90', label: 'Last 90 days', labelFr: '90 derniers jours', days: 90 },
    { id: 'thisMonth', label: 'This month', labelFr: 'Ce mois-ci', days: -1 },
    { id: 'lastMonth', label: 'Last month', labelFr: 'Mois dernier', days: -2 },
    { id: 'custom', label: 'Custom', labelFr: 'Personnalisé', days: -3 },
];

export interface DatePresetsProps {
    /** Selected preset ID */
    selected?: string;
    /** Selection handler */
    onSelect: (preset: DatePreset) => void;
    /** Locale for labels */
    locale?: 'en' | 'fr';
    /** Presets to show (by ID), defaults to all */
    presets?: string[];
    /** Additional className */
    className?: string;
    /** Variant style */
    variant?: 'buttons' | 'pills';
}

/**
 * DatePresets Component
 * 
 * Consolidated from:
 * - components/analytics/DatePresets.tsx (English)
 * - components/analytics/DatePresetsFR.tsx (French)
 */
export function DatePresets({
    selected,
    onSelect,
    locale = 'en',
    presets,
    className,
    variant = 'buttons'
}: DatePresetsProps) {
    const visiblePresets = presets
        ? DATE_PRESETS.filter(p => presets.includes(p.id))
        : DATE_PRESETS;

    return (
        <div className={cn(
            "flex flex-wrap gap-2",
            variant === 'pills' && "gap-1",
            className
        )}>
            {visiblePresets.map((preset) => {
                const label = locale === 'fr' ? preset.labelFr : preset.label;
                const isSelected = selected === preset.id;

                return (
                    <Button
                        key={preset.id}
                        variant={isSelected ? "default" : "outline"}
                        size={variant === 'pills' ? "sm" : "default"}
                        className={cn(
                            variant === 'pills' && "rounded-full px-3 h-7 text-xs",
                            isSelected && variant === 'pills' && "bg-indigo-600 text-white"
                        )}
                        onClick={() => onSelect(preset)}
                    >
                        {label}
                    </Button>
                );
            })}
        </div>
    );
}

// Re-export the presets array for external use
export { DATE_PRESETS };

export default DatePresets;
