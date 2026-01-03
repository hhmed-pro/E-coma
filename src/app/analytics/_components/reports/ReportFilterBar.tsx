"use client";

import { useState } from "react";
import { Button } from "@/components/core/ui/button";
import { Badge } from "@/components/core/ui/badge";
import { Plus, X } from "lucide-react";
import { DateRangeFilter } from "@/components/core/ui/date-range-filter";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/core/ui/dropdown-menu";

interface Filter {
    id: string;
    label: string;
    value: string;
}

export function ReportFilterBar() {
    const [filters, setFilters] = useState<Filter[]>([]);

    const addFilter = (label: string, value: string) => {
        const newFilter = { id: Math.random().toString(36).substr(2, 9), label, value };
        setFilters([...filters, newFilter]);
    };

    const removeFilter = (id: string) => {
        setFilters(filters.filter(f => f.id !== id));
    };

    return (
        <div className="flex items-center gap-2 p-4 border-b bg-white">
            {/* Date Range */}
            <DateRangeFilter className="mr-2" />

            {/* Custom Filters */}
            {filters.map(filter => (
                <Badge key={filter.id} variant="secondary" className="gap-1 h-8 px-3">
                    {filter.label}: {filter.value}
                    <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeFilter(filter.id)}
                    />
                </Badge>
            ))}

            {/* Add Filter */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 border-dashed border">
                        <Plus className="h-3.5 w-3.5" />
                        Add filter
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => addFilter("Channel", "WhatsApp")}>By Channel</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addFilter("Team", "Support")}>By Team</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addFilter("Agent", "Amine")}>By Agent</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addFilter("Status", "Resolved")}>By Status</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear All */}
            {filters.length > 0 && (
                <Button variant="ghost" size="sm" className="h-8 text-muted-foreground" onClick={() => setFilters([])}>
                    Clear all
                </Button>
            )}
        </div>
    );
}
