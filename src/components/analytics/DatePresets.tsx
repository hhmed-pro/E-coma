"use client";

import { Button } from "@/components/core/ui/button";
import { cn } from "@/lib/utils";

interface DatePresetsProps {
    activePreset: string;
    onPresetChange: (preset: string) => void;
}

const PRESETS = [
    { label: "Aujourd'hui", value: "today" },
    { label: "Hier", value: "yesterday" },
    { label: "7 Jours", value: "7days" },
    { label: "30 Jours", value: "30days" },
    { label: "Tout Le Temps", value: "all" },
];

export function DatePresets({ activePreset, onPresetChange }: DatePresetsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
                <Button
                    key={preset.value}
                    variant={activePreset === preset.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPresetChange(preset.value)}
                    className={cn(
                        "transition-all duration-200",
                        activePreset === preset.value
                            ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                    )}
                >
                    {preset.label}
                </Button>
            ))}
        </div>
    );
}
