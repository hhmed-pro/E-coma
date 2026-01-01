"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { X, PanelRightOpen, GripVertical, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWindowLayout } from "./WindowLayoutContext";
import { useRightPanel } from "./RightPanelContext";
import { motion, useDragControls } from "framer-motion";

interface SplitLayoutProps {
    children: ReactNode;
    rightContent?: ReactNode;
    isFocusMode?: boolean;
    onExitFocusMode?: () => void;
}

export function SplitLayout({ children, rightContent, isFocusMode = false, onExitFocusMode }: SplitLayoutProps) {
    const { isRightPanelOpen, toggleRightPanel, rightPanelStyle } = useWindowLayout();
    const { isOpen: isContextOpen, setIsOpen: setContextOpen, config } = useRightPanel();
    const [isAnimating, setIsAnimating] = useState(false);
    const dragControls = useDragControls();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const constraintsRef = useRef(null);

    // Persistence Logic
    useEffect(() => {
        const savedPos = localStorage.getItem("right-panel-position");
        if (savedPos) {
            try {
                setPosition(JSON.parse(savedPos));
            } catch (e) {
                console.error("Failed to parse panel position", e);
            }
        }
    }, []);

    const handleDragEnd = (_: any, info: any) => {
        const newPos = { x: info.offset.x + position.x, y: info.offset.y + position.y };
        setPosition(newPos); // Update internal state if needed, mostly handled by motion, but for reset we need state
        // Actually framer motion 'drag' with 'layout' might be tricky with persistence if we don't use x/y props directly.
        // Better: Just use point tracking.
        const currentPoint = info.point; // Absolute
        // Simple simplified persistence: Just save the distinct drag offset if we use dragConstraints?
        // Let's rely on standard offset.
        // info.offset is the drag distance.
        // We'll just save the final transform style if we can, or easier:
        // Use the `x` and `y` props of motion.div.
        // On DragEnd, we update the `x` and `y` state.

        const nextX = position.x + info.offset.x;
        const nextY = position.y + info.offset.y;
        setPosition({ x: nextX, y: nextY }); // Keep tracking cumulative
        localStorage.setItem("right-panel-position", JSON.stringify({ x: nextX, y: nextY }));
    };

    const resetPosition = () => {
        setPosition({ x: 0, y: 0 });
        localStorage.setItem("right-panel-position", JSON.stringify({ x: 0, y: 0 }));
    };

    // Save preference to localStorage
    const toggleVisibility = () => {
        setIsAnimating(true);
        // Toggle both contexts to keep them in sync or just the relevant one
        if (isRightPanelOpen || isContextOpen) {
            if (isRightPanelOpen) toggleRightPanel();
            if (isContextOpen) setContextOpen(false);
        } else {
            toggleRightPanel();
            // If we have config, maybe open context too? But mainly we rely on trigger to open context.
        }
        setTimeout(() => setIsAnimating(false), 300);
    };

    // Handle pop-button click - Always toggle panel now
    const handlePopButtonClick = () => {
        toggleVisibility();
    };

    // Determine if panel content should be shown
    // We allow panel in focus mode if user explicitly opens it (isRightPanelOpen is true)
    // Now also checks RightPanelContext (isContextOpen)
    const shouldShowPanel = isRightPanelOpen || (isContextOpen && !!config?.enabled);

    // Determine content: Prop takes precedence, then context config
    // Actually, context config is usually "more specific/dynamic", so maybe checks config first?
    // Let's fallback to config if rightContent prop is missing OR always render config if context is open?
    // If context is open, we probably want to show THAT content.
    const contentToRender = (isContextOpen && config?.content) ? config.content : rightContent;

    const panelContent = shouldShowPanel && contentToRender && (
        <motion.div
            layout // Handle size changes smoothly
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0} // Hard stops at edges
            dragConstraints={constraintsRef} // Constrain to viewport ref
            dragListener={false} // Only drag via handle
            animate={{ x: position.x, y: position.y }}
            onDragEnd={handleDragEnd}
            className={cn(
                "fixed z-[999]",
                // Dynamic Centering:
                "inset-x-0 top-[10%] mx-auto", // Horizontally center, fixed top offset
                "w-fit h-fit", // Shrink wrap content
                "min-w-[450px] max-w-[95vw]", // Safe standard bounds
                "max-h-[85vh] flex flex-col",
                "shadow-2xl rounded-2xl",
            )}
            // Use style ONLY for motion x/y. 
            // Base positioning is handled by CSS classes above.
            style={{
                x: position.x,
                y: position.y
            }}
        >
            <div className="h-full bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header / Drag Handle */}
                <div
                    className="flex items-center justify-between p-3 border-b border-border bg-muted/30 cursor-grab active:cursor-grabbing"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <GripVertical className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Panel</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={resetPosition}
                            className="p-1.5 rounded-lg hover:bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors"
                            title="Reset position"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 relative">
                    {contentToRender}
                </div>
            </div>
        </motion.div>
    );

    // Create a local constraints div if we are not portaling, 
    // BUT since we are portaling, the constraints should be relative to VIEWPORT.
    // Framer motion dragConstraints with ref needs the ref to be mounted.
    // So we render the ref div INSIDE the portal too? Or relies on fixed positioning?
    // Actually, if we portal, we are at body level. Constraints ref must be in the same tree or use a rect.
    // Easiest is to render constraints ref inside the portal as a sibling.

    return (
        <div className="flex-1 flex flex-col md:flex-row gap-4 relative">

            {/* Left Side - Main Content (Always full width now) */}
            <div
                className={cn(
                    "flex-1 min-w-0 transition-all duration-300 ease-in-out",
                    "w-full" // Always full width, panel is now overlay
                )}
            >
                {children}
            </div>

            {/* Right Side - Panel (Floating) VIA PORTAL */}
            {shouldShowPanel && contentToRender && createPortal(
                <>
                    {/* Viewport Constraints Reference Sibling in Portal */}
                    <div ref={constraintsRef} className="fixed left-2 right-2 top-2 -bottom-[800px] pointer-events-none z-[998]" />
                    {panelContent}
                </>,
                document.body
            )}
        </div>
    );
}

