"use client";

import { Button } from "@/components/core/ui/button";
import { Calendar, Plus, X } from "lucide-react";

export function FilterControls() {
    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-2 border-dashed">
                <Calendar className="h-3.5 w-3.5" />
                <span>Nov 21, 2025 - Dec 04, 2025</span>
            </Button>

            <Button variant="outline" size="sm" className="h-8 gap-2 border-dashed">
                <Plus className="h-3.5 w-3.5" />
                Add filter
            </Button>

            <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
                Clear all
            </Button>
        </div>
    );
}
