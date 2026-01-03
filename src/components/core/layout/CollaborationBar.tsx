"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/core/ui/avatar";
import { Badge } from "@/components/core/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/core/ui/tooltip";
import { Users, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Collaborator {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
    status: "viewing" | "editing" | "idle";
    lastActive?: Date;
    currentTool?: string;
}

// Mock collaborator data
const MOCK_COLLABORATORS: Collaborator[] = [
    { id: "1", name: "You", initials: "YO", status: "editing", currentTool: "Hook Generator" },
    { id: "2", name: "Ahmed K.", avatar: "/avatars/ahmed.jpg", initials: "AK", status: "viewing" },
    { id: "3", name: "Sarah M.", avatar: "/avatars/sarah.jpg", initials: "SM", status: "idle", lastActive: new Date(Date.now() - 5 * 60000) },
];

interface CollaborationBarProps {
    contentId?: string;
    className?: string;
    compact?: boolean; // NEW: For compact mode when scrolled
}

/**
 * CollaborationBar - Shows active collaborators with presence indicators
 * This is a global component used across all pages.
 * Supports compact mode for scrolled/space-constrained states.
 */
export function CollaborationBar({ contentId, className, compact = false }: CollaborationBarProps) {
    const [collaborators] = useState<Collaborator[]>(MOCK_COLLABORATORS);

    const activeCount = collaborators.filter(c => c.status !== "idle").length;
    const editingUsers = collaborators.filter(c => c.status === "editing");

    const getStatusColor = (status: Collaborator["status"]) => {
        switch (status) {
            case "editing": return "bg-green-500";
            case "viewing": return "bg-blue-500";
            case "idle": return "bg-gray-400";
        }
    };

    const getStatusLabel = (collab: Collaborator) => {
        switch (collab.status) {
            case "editing": return `Editing ${collab.currentTool || "content"}`;
            case "viewing": return "Viewing";
            case "idle": return "Away";
        }
    };

    // Compact mode: Only avatar stack with tooltip showing full info
    if (compact) {
        return (
            <TooltipProvider delayDuration={200}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={cn("flex -space-x-1.5 cursor-pointer", className)}>
                            {collaborators.slice(0, 3).map((collab) => (
                                <Avatar key={collab.id} className={cn(
                                    "h-6 w-6 border-2 border-background transition-transform hover:scale-110",
                                    collab.status === "editing" && "ring-1 ring-green-500"
                                )}>
                                    <AvatarImage src={collab.avatar} alt={collab.name} />
                                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                        {collab.initials}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                            {collaborators.length > 3 && (
                                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-[10px] font-medium border-2 border-background">
                                    +{collaborators.length - 3}
                                </span>
                            )}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                        <div className="font-medium">{activeCount} active collaborators</div>
                        {editingUsers.length > 0 && (
                            <div className="text-muted-foreground flex items-center gap-1">
                                <Edit3 className="h-3 w-3" />
                                {editingUsers.length} editing
                            </div>
                        )}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    // Full mode: Complete display with labels
    return (
        <TooltipProvider delayDuration={300}>
            <div className={cn("flex items-center gap-3", className)}>
                {/* Active users indicator */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{activeCount} active</span>
                </div>

                {/* Avatar stack */}
                <div className="flex -space-x-2">
                    {collaborators.map((collab, index) => (
                        <Tooltip key={collab.id}>
                            <TooltipTrigger asChild>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <Avatar className={cn(
                                        "h-8 w-8 border-2 border-background cursor-pointer transition-transform hover:scale-110 hover:z-10",
                                        collab.status === "editing" && "ring-2 ring-green-500 ring-offset-1 ring-offset-background"
                                    )}>
                                        <AvatarImage src={collab.avatar} alt={collab.name} />
                                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                            {collab.initials}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Status indicator */}
                                    <span
                                        className={cn(
                                            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
                                            getStatusColor(collab.status),
                                            collab.status === "editing" && "animate-pulse"
                                        )}
                                    />
                                </motion.div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs">
                                <div className="font-medium">{collab.name}</div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    {collab.status === "editing" && <Edit3 className="h-3 w-3" />}
                                    {getStatusLabel(collab)}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>

                {/* Currently editing indicator */}
                {editingUsers.length > 0 && (
                    <Badge variant="secondary" className="text-[10px] gap-1 animate-pulse">
                        <Edit3 className="h-3 w-3" />
                        {editingUsers.length === 1
                            ? `${editingUsers[0].name} is editing`
                            : `${editingUsers.length} people editing`
                        }
                    </Badge>
                )}
            </div>
        </TooltipProvider>
    );
}
