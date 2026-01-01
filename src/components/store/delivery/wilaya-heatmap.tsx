"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { wilayas, algeriaColors, type Wilaya } from "@/lib/chart-utils";
import { MapPin, TrendingUp, Package, Truck, Info, ArrowUpDown, ArrowUp, ArrowDown, ListFilter, Compass, Maximize2, X, Power, ShieldCheck, AlertCircle } from "lucide-react";
import { WilayaOrderData } from "@/utils/heatmapData";
import { Map as AlgeriaMap } from "algeria-map-ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/core/ui/dropdown-menu";
import { Button } from "@/components/core/ui/button";
import { Switch } from "@/components/core/ui/switch";
import { Input } from "@/components/core/ui/input";

// ============================================================================
// TYPES & METRICS
// ============================================================================

export type HeatmapMetric =
    | "orders"
    | "revenue"
    | "confirmation_rate"
    | "delivery_rate"
    | "return_rate"
    | "cancellation_rate"
    | "global_score"; // New Composite Metric

function getMetricValue(data: WilayaOrderData, metric: HeatmapMetric): number {
    switch (metric) {
        case "orders": return data.orders;
        case "revenue": return data.revenue;
        case "confirmation_rate": return data.confirmed / (data.orders || 1);
        case "delivery_rate": return data.delivered / (data.confirmed || 1);
        case "return_rate": return data.returned / (data.delivered || 1);
        case "cancellation_rate": return data.cancelled / (data.orders || 1);
        case "global_score":
            // Score = (Conf% * 0.3) + (Del% * 0.4) + (Rev_Norm * 0.2) - (Ret% * 0.1)
            // Simplifying Rev_Norm to Log scale to keep ranges sane (0-100ish)
            const conf = (data.confirmed / (data.orders || 1)) * 100;
            const del = (data.delivered / (data.confirmed || 1)) * 100;
            const ret = (data.returned / (data.delivered || 1)) * 100;
            // Revenue factor: Cap at 100 points for heavy hitters
            const revScore = Math.min((data.revenue / 5000000) * 100, 100);

            return (conf * 0.4) + (del * 0.4) + (revScore * 0.3) - (ret * 0.2);
        default: return 0;
    }
}

function getMetricLabel(metric: HeatmapMetric): string {
    switch (metric) {
        case "orders": return "Orders Volume";
        case "revenue": return "Total Revenue";
        case "confirmation_rate": return "Confirmation Rate";
        case "delivery_rate": return "Delivery Rate";
        case "return_rate": return "Return Rate";
        case "cancellation_rate": return "Cancellation Rate";
        case "global_score": return "Global Performance";
        default: return "";
    }
}

function formatMetricValue(value: number, metric: HeatmapMetric): string {
    if (metric === "revenue") return `${(value / 1000).toFixed(1)}K DZD`;
    if (metric === "orders") return value.toLocaleString();
    if (metric === "global_score") return value.toFixed(1);
    return `${(value * 100).toFixed(1)}%`;
}

function getHeatmapColor(value: number, min: number, max: number, metric: HeatmapMetric): string {
    const ratio = (value - min) / (max - min || 1);

    // UNIFIED TRAFFIC LIGHT SCALE (Red -> Yellow -> Green)
    // For positive metrics (High is Good): 0% = Red, 50% = Yellow, 100% = Green
    // For negative metrics (High is Bad): 0% = Green, 50% = Yellow, 100% = Red

    const isNegativeMetric = metric === "return_rate" || metric === "cancellation_rate";
    const normalizedRatio = isNegativeMetric ? 1 - ratio : ratio;

    if (normalizedRatio < 0.25) return "#ef4444"; // Red (Poor)
    if (normalizedRatio < 0.5) return "#f97316"; // Orange (Below Avg)
    if (normalizedRatio < 0.75) return "#eab308"; // Yellow (Average)
    if (normalizedRatio < 0.9) return "#84cc16"; // Lime (Good)
    return "#22c55e"; // Green (Excellent)
}

// ============================================================================
// WILAYA HEATMAP COMPONENT
// ============================================================================

interface WilayaHeatmapProps {
    data: WilayaOrderData[];
    metric?: HeatmapMetric; // Optional initial metric
    onWilayaClick?: (wilaya: Wilaya) => void;
    selectedWilaya?: string;
    className?: string;
}

type SortOrder = "asc" | "desc";
type ViewMode = "full" | "zoom";

export function WilayaHeatmap({
    data,
    metric: initialMetric = "orders",
    onWilayaClick,
    selectedWilaya, // kept for prop compatibility, but local state takes precedence for popup
    className,
}: WilayaHeatmapProps) {
    // State
    const [heatmapData, setHeatmapData] = React.useState(data);

    // Sync local state if prop changes
    React.useEffect(() => {
        setHeatmapData(data);
    }, [data]);

    const [activeMetric, setActiveMetric] = React.useState<HeatmapMetric>(initialMetric);
    const [sortOrder, setSortOrder] = React.useState<SortOrder>("desc");

    // View & Zoom State
    const [zoomLevel, setZoomLevel] = React.useState(1);

    // Drag State
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const dragStart = React.useRef({ x: 0, y: 0 });
    const dragStartOffset = React.useRef({ x: 0, y: 0 });

    // Popup State
    const [popupWilaya, setPopupWilaya] = React.useState<{
        code: string;
        x: number;
        y: number;
        xPlacement: 'left' | 'right' | 'center';
        yPlacement: 'top' | 'bottom';
    } | null>(null);

    const values = heatmapData.map(d => getMetricValue(d, activeMetric));
    const max = Math.max(...values, 0);
    const min = Math.min(...values, 0);


    // 1. Prepare map visualization data - KEYS MUST BE WILAYA NAMES (nameFr) for algeria-map-ts
    const mapData = React.useMemo(() => {
        const mapping: Record<string, { value: string; color: string }> = {};

        heatmapData.forEach(d => {
            const w = wilayas.find(w => w.code === d.code);
            if (!w) return;

            // In zoom mode, still color all wilayas (no greying out)
            // Previously skipped south wilayas - now we show everything

            const val = getMetricValue(d, activeMetric);
            let color = getHeatmapColor(val, min, max, activeMetric);

            // Dim disabled wilayas
            if (d.status === 'disabled') {
                color = "#e2e8f0"; // slate-200
            }

            mapping[w.nameFr] = {
                value: w.nameFr,
                color
            };
        });
        return mapping;
    }, [heatmapData, activeMetric, min, max]);

    // 2. Sort Data for Table
    const sortedData = React.useMemo(() => {
        let filtered = [...heatmapData];
        // Show all wilayas in table regardless of view mode
        return filtered.sort((a, b) => {
            const valA = getMetricValue(a, activeMetric);
            const valB = getMetricValue(b, activeMetric);
            return sortOrder === "asc" ? valA - valB : valB - valA;
        });
    }, [heatmapData, activeMetric, sortOrder]);

    const toggleSort = () => setSortOrder(prev => prev === "asc" ? "desc" : "asc");

    // Toggle Wilaya Status Handler
    const toggleWilayaStatus = (code: string) => {
        setHeatmapData(prev => prev.map(item =>
            item.code === code
                ? { ...item, status: item.status === 'enabled' ? 'disabled' : 'enabled' }
                : item
        ));
    };

    // Track mouse coordinates efficiently without re-renders
    const mousePos = React.useRef({ x: 0, y: 0 });
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // We track relative to the container for rendering X/Y
        const rect = e.currentTarget.getBoundingClientRect();
        mousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    // Drag handlers
    const handleDragStart = (e: React.MouseEvent) => {
        if (zoomLevel <= 1) return; // Only drag when zoomed
        e.preventDefault();
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        dragStartOffset.current = { ...dragOffset };
    };

    const handleDragMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;

        // Dynamic limits based on zoom level
        const limitX = 300 * zoomLevel;
        const limitY = 200 * zoomLevel;

        const newX = Math.max(-limitX, Math.min(limitX, dragStartOffset.current.x + dx));
        const newY = Math.max(-limitY, Math.min(limitY, dragStartOffset.current.y + dy));

        setDragOffset({ x: newX, y: newY });
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // Zoom Helpers
    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.5, 4));
        setPopupWilaya(null);
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => {
            const next = Math.max(prev - 0.5, 1);
            if (next === 1) setDragOffset({ x: 0, y: 0 }); // Reset center
            return next;
        });
        setPopupWilaya(null);
    };

    const handleReset = () => {
        setZoomLevel(1);
        setDragOffset({ x: 0, y: 0 });
        setPopupWilaya(null);
    };

    return (
        <div className={cn("w-full space-y-6", className)}>
            <div className="flex flex-col gap-8">
                {/* 1. THE GIANT MAP & CONTROLS */}
                <div className="relative group" ref={containerRef}>
                    {/* View Controls - Outside of Overflow HIdden */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                        <div className="bg-background/90 backdrop-blur shadow-sm border rounded-lg flex flex-col p-1 gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100" onClick={handleZoomIn} disabled={zoomLevel >= 4}>
                                <div className="text-lg font-bold">+</div>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100" onClick={handleZoomOut} disabled={zoomLevel <= 1}>
                                <div className="text-lg font-bold">-</div>
                            </Button>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="shadow-sm text-xs h-8"
                            onClick={handleReset}
                            disabled={zoomLevel === 1 && dragOffset.x === 0 && dragOffset.y === 0}
                        >
                            Reset View
                        </Button>
                    </div>

                    {/* POPUP - Outside of Overflow Hidden to avoid clipping */}
                    {popupWilaya && (() => {
                        const w = wilayas.find(w => w.code === popupWilaya.code);
                        const d = heatmapData.find(d => d.code === popupWilaya.code);
                        if (!w || !d) return null;

                        // Calculate Transform based on Placement
                        let transform = "translate(-50%, -100%) translateY(-20px)"; // Default (Center Top)

                        if (popupWilaya.xPlacement === 'left') {
                            // Popup on LEFT of cursor
                            transform = popupWilaya.yPlacement === 'bottom'
                                ? "translate(-100%, 20px)"
                                : "translate(-100%, -100%) translateY(-20px)";
                        } else if (popupWilaya.xPlacement === 'right') {
                            // Popup on RIGHT of cursor
                            transform = popupWilaya.yPlacement === 'bottom'
                                ? "translate(0, 20px)"
                                : "translate(0, -100%) translateY(-20px)";
                        } else {
                            // CENTER
                            transform = popupWilaya.yPlacement === 'bottom'
                                ? "translate(-50%, 20px)"
                                : "translate(-50%, -100%) translateY(-20px)";
                        }

                        return (
                            <div
                                className="absolute z-50 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl border shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] p-0 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                style={{
                                    top: popupWilaya.y,
                                    left: popupWilaya.x,
                                    transform: transform
                                }}
                            >
                                {/* Header */}
                                <div className="p-4 border-b flex items-start justify-between bg-zinc-50/50 dark:bg-white/5">
                                    <div>
                                        <h4 className="font-bold text-lg flex items-center gap-2">
                                            {w.nameFr}
                                            <span className="text-xs font-mono bg-zinc-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-zinc-500">
                                                {w.code}
                                            </span>
                                        </h4>
                                        <p className="text-xs text-muted-foreground">{w.nameAr}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2" onClick={() => setPopupWilaya(null)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Metrics Grid */}
                                <div className="p-4 space-y-4">
                                    {/* Primary Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                <Package className="w-3.5 h-3.5" />
                                                <span className="text-[10px] uppercase tracking-wider font-bold">Orders</span>
                                            </div>
                                            <p className="font-bold text-xl text-slate-800 dark:text-slate-100">{d.orders.toLocaleString()}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/20">
                                            <div className="flex items-center gap-2 text-green-600/80 mb-1">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                <span className="text-[10px] uppercase tracking-wider font-bold">Revenue</span>
                                            </div>
                                            <p className="font-bold text-xl text-green-700 dark:text-green-400">{(d.revenue / 1000).toFixed(1)}K</p>
                                        </div>
                                    </div>

                                    {/* Detailed Delivery Stats */}
                                    <div className="space-y-3">
                                        {/* Confirmation & Delivery */}
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                                            <div>
                                                <span className="text-muted-foreground">Delivered</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="font-bold text-sm">{d.delivered}</span>
                                                    <span className="text-green-600 font-medium">({((d.delivered / d.confirmed) * 100).toFixed(0)}%)</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Returned</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="font-bold text-sm">{d.returned}</span>
                                                    <span className="text-red-500 font-medium">({((d.returned / d.delivered) * 100).toFixed(0)}%)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Logistics Info */}
                                        <div className="flex items-center gap-4 py-2 border-t border-b border-dashed">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Truck className="w-3.5 h-3.5 text-slate-400" />
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-muted-foreground font-medium">Avg Delivery</span>
                                                    <span className="text-xs font-bold">{d.avgDeliveryDays.toFixed(1)} Days</span>
                                                </div>
                                            </div>
                                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
                                            <div className="flex items-center gap-2 flex-1">
                                                <div className="text-slate-400 font-serif font-bold text-xs">DZD</div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-muted-foreground font-medium">Delivery Price</span>
                                                    <span className="text-xs font-bold">{Math.round(d.shippingCost)} DA</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Toggle */}
                                    <div className="pt-0">
                                        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                            <div className="flex items-center gap-2.5">
                                                <div className={cn("w-2 h-2 rounded-full", d.status === 'enabled' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-slate-300")} />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Active Coverage</span>
                                                    <span className="text-[10px] text-muted-foreground">Enable delivery to this wilaya</span>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={d.status === 'enabled'}
                                                onCheckedChange={() => toggleWilayaStatus(d.code)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* MAP WRAPPER (Overflow Hidden for Map Panning) */}
                    <div
                        className="bg-card rounded-xl border p-4 min-h-[500px] flex items-center justify-center relative shadow-sm overflow-hidden"
                        onMouseMove={handleMouseMove}
                        style={{ perspective: '1000px' }} // Enable 3D perspective
                    >
                        {/* Legend */}
                        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border shadow-sm text-xs space-y-2 z-10 select-none">
                            <p className="font-semibold">{getMetricLabel(activeMetric)}</p>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                                    <span>High / Good</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                                    <span>Medium</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                                    <span>Low / Poor</span>
                                </div>
                            </div>
                        </div>

                        {/* SVG Map Container & Transform Target */}
                        <div
                            className={cn(
                                "w-full h-full max-w-[600px] will-change-transform relative",
                                zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default",
                                !isDragging && "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" // Nice springy transition
                            )}
                            style={{
                                transform: `
                                    scale(${zoomLevel}) 
                                    translate(${dragOffset.x / zoomLevel}px, ${dragOffset.y / zoomLevel}px)
                                    rotateX(${zoomLevel === 1 ? '15deg' : '0deg'})
                                    translateY(${zoomLevel === 1 ? '-10px' : '0px'})
                                `,
                                filter: zoomLevel === 1 ? 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' : 'none' // Deep shadow in 3D mode
                            }}
                            onMouseDown={handleDragStart}
                            onMouseMove={(e) => {
                                handleMouseMove(e);
                                handleDragMove(e);
                            }}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                        >
                            <AlgeriaMap
                                data={mapData}
                                onWilayaClick={(wilayaName: string, _value: number | string) => {
                                    // 1. Get Mouse Position
                                    const { x, y } = mousePos.current;

                                    // 2. Get click absolute position for collision detection
                                    // We need to access the actual event, but algeria-map-ts doesn't pass it.
                                    // We rely on 'mousePos' which is relative to container, 
                                    // and we can get container's absolute position.
                                    if (!containerRef.current) return;
                                    const rect = containerRef.current.getBoundingClientRect();

                                    const absoluteX = rect.left + x;
                                    const absoluteY = rect.top + y;

                                    // 3. Collision Logic
                                    const POPUP_WIDTH = 320;
                                    const POPUP_HEIGHT = 450; // Approx max height
                                    const VIEWPORT_WIDTH = window.innerWidth;
                                    const VIEWPORT_HEIGHT = window.innerHeight;

                                    let xPlacement: 'center' | 'left' | 'right' = 'center';
                                    let yPlacement: 'top' | 'bottom' = 'top';

                                    // Check Right Edge
                                    if (absoluteX + (POPUP_WIDTH / 2) > VIEWPORT_WIDTH - 20) {
                                        xPlacement = 'left';
                                    }
                                    // Check Left Edge
                                    else if (absoluteX - (POPUP_WIDTH / 2) < 20) {
                                        xPlacement = 'right';
                                    }

                                    // BEST FIT Vertical Logic
                                    const spaceAbove = absoluteY - 100; // Account for header
                                    const spaceBelow = VIEWPORT_HEIGHT - absoluteY;

                                    if (spaceAbove < POPUP_HEIGHT && spaceBelow > POPUP_HEIGHT) {
                                        yPlacement = 'bottom'; // Not enough space above, go bottom
                                    } else if (spaceBelow < POPUP_HEIGHT && spaceAbove > POPUP_HEIGHT) {
                                        yPlacement = 'top'; // Not enough space below, go top
                                    } else {
                                        // If both fit (or neither), prefer the side with more space
                                        yPlacement = spaceAbove > spaceBelow ? 'top' : 'bottom';
                                    }

                                    const w = wilayas.find(w => w.nameFr === wilayaName);
                                    if (w) {
                                        setPopupWilaya({
                                            code: w.code,
                                            x,
                                            y,
                                            xPlacement,
                                            yPlacement
                                        });
                                        onWilayaClick?.(w);
                                    }
                                }}
                                HoverColor="#fbbf24"
                                stroke="#ffffff"
                                hoverContentStyle={{ display: 'none' }}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>{/* 2. THE TABLE (Top Wilayas) */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Top Wilayas
                        </h3>

                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-8 min-w-[140px] justify-between">
                                        <span className="flex items-center gap-2">
                                            <ListFilter className="w-3.5 h-3.5" />
                                            {getMetricLabel(activeMetric)}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Performance Metrics</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setActiveMetric("global_score")}>
                                        <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" />
                                        Global Performance
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setActiveMetric("orders")}>Orders Volume</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setActiveMetric("revenue")}>Revenue</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setActiveMetric("confirmation_rate")}>Confirmation %</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setActiveMetric("delivery_rate")}>Delivery %</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setActiveMetric("return_rate")}>Return %</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={toggleSort}
                            >
                                {sortOrder === "asc" ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm h-[500px] overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 sticky top-0 z-10 backdrop-blur-md">
                                <tr>
                                    <th className="py-3 px-4 text-left font-medium">Rank</th>
                                    <th className="py-3 px-4 text-left font-medium">Wilaya</th>
                                    <th className="py-3 px-4 text-right font-medium">
                                        {getMetricLabel(activeMetric)}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {sortedData.map((d, i) => {
                                    const w = wilayas.find(w => w.code === d.code);
                                    const primaryVal = getMetricValue(d, activeMetric);
                                    const isGlobal = activeMetric === "global_score";

                                    return (
                                        <tr
                                            key={d.code}
                                            className={cn(
                                                "hover:bg-muted/50 cursor-pointer transition-colors",
                                                popupWilaya?.code === d.code && "bg-primary/5 border-l-2 border-primary"
                                            )}
                                            onClick={(e) => {
                                                if (w) {
                                                    onWilayaClick?.(w);
                                                    // For table click, position popup in center of map? 
                                                    // Or just highlight row. 
                                                    // Let's scroll map into view if needed? No too jarring.
                                                    // Just set selection.
                                                }
                                            }}
                                        >
                                            <td className="py-3 px-4 text-muted-foreground">#{i + 1}</td>
                                            <td className="py-3 px-4 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] w-5 h-5 flex items-center justify-center rounded bg-slate-100 text-slate-500 font-mono">{d.code}</span>
                                                    {w?.nameFr || d.code}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-right font-bold">
                                                <span className={cn(
                                                    isGlobal && primaryVal >= 80 ? "text-green-600" :
                                                        isGlobal && primaryVal < 50 ? "text-red-500" : ""
                                                )}>
                                                    {formatMetricValue(primaryVal, activeMetric)}
                                                    {isGlobal && <span className="text-[10px] text-muted-foreground ml-1">pts</span>}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// WILAYA DETAIL PANEL
// ============================================================================

export interface WilayaDetailProps {
    wilaya: Wilaya;
    data?: WilayaOrderData;
    onClose?: () => void;
    className?: string;
}

export function WilayaDetailPanel({
    wilaya,
    data,
    onClose,
    className,
}: WilayaDetailProps) {
    if (!data) return null;

    const successRate = (data.delivered / (data.confirmed || 1)) * 100;
    const returnRate = (data.returned / (data.delivered || 1)) * 100;

    return (
        <div className={cn("p-4 rounded-xl border bg-card space-y-4 shadow-lg", className)}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-bold">{wilaya.nameFr}</h3>
                    <p className="text-muted-foreground text-sm">{wilaya.nameAr} • Code: {wilaya.code}</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="p-1 hover:bg-muted rounded text-slate-400 hover:text-slate-800 transition-colors">
                        ✕
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{data.orders.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">Revenue</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{(data.revenue / 1000).toFixed(1)}K</p>
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Confirmation Rate</span>
                        <span className="font-bold">{((data.confirmed / data.orders) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(data.confirmed / data.orders) * 100}%` }} />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Rate</span>
                        <span className="font-bold">{successRate.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${successRate}%` }} />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Return Rate</span>
                        <span className="font-bold text-red-600">{returnRate.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${returnRate}%` }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// DEMO DATA GENERATOR
// ============================================================================

export function generateWilayaOrderData(): WilayaOrderData[] {
    const topWilayas = ["16", "31", "25", "19", "09", "06", "15", "23", "05", "35", "30", "13", "14", "22", "28", "17"];

    return wilayas.map(wilaya => {
        const isTop = topWilayas.includes(wilaya.code);
        const baseOrders = isTop ? Math.floor(Math.random() * 400) + 200 : Math.floor(Math.random() * 100) + 20;
        const returned = Math.floor(baseOrders * (0.05 + Math.random() * 0.1));
        const delivered = baseOrders - returned - Math.floor(baseOrders * 0.1);

        const confirmed = baseOrders;
        const cancelled = Math.floor(baseOrders * 0.05);

        return {
            code: wilaya.code,
            orders: baseOrders,
            revenue: baseOrders * (3000 + Math.random() * 2000),
            delivered,
            returned,
            confirmed,
            cancelled,
            avgDeliveryDays: 1.5 + Math.random() * 3,
            shippingCost: baseOrders * (400 + Math.random() * 100), // Mock shipping cost
            status: Math.random() > 0.1 ? 'enabled' : 'disabled', // Added status for popup
        };
    });
}
