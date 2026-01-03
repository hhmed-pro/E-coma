'use client';

import React, { useState } from 'react';
import { ReturnRiskCalculator } from '@/app/sales-dashboard/_components/ReturnRiskCalculator';
import { CustomerBlacklist } from '@/app/sales-dashboard/_components/CustomerBlacklist';
import { LocationCollector } from '@/app/sales-dashboard/_components/LocationCollector';
import { ConfirmationWorkflow } from '@/app/sales-dashboard/_components/ConfirmationWorkflow';
import { CallCenterScripts } from '@/app/sales-dashboard/_components/CallCenterScripts';
import { OfflineConversionSync } from '@/app/sales-dashboard/_components/OfflineConversionSync';
import PackerModePanel from '@/app/ecommerce/_components/delivery/PackerModePanel';
import ShipmentTracker from '@/app/ecommerce/_components/delivery/ShipmentTracker';
import { FeatureClusterGroup } from '@/components/core/ui/FeatureClusterGroup';
import { Sheet, SheetContent } from "@/components/core/ui/sheet";
import { useToast } from "@/components/core/ui/toast";
import { ConfirmationBot } from "@/app/marketing/_components/ConfirmationBot";
import {
    TrendingUp, PackageX, CheckCircle, AlertTriangle, Ban,
    Truck, ShieldAlert, Phone, Package, UploadCloud, BarChart, RotateCcw, PieChart, Settings, Shield, X, Check, Bot, Download, FileText, HeartPulse
} from 'lucide-react';
import { PageHeader } from "@/components/core/layout/PageHeader";
import { QuickActionsBar } from "@/components/core/layout/QuickActionsBar";
import { OrdersChart } from '@/app/analytics/_components/OrdersChart';
import { CashCollector } from '@/app/analytics/_components/CashCollector';
import { LifecycleFunnel } from '@/app/analytics/_components/charts/lifecycle-funnel';
import { Badge } from '@/components/core/ui/badge';
import { Button } from '@/components/core/ui/button';
import { Card, CardContent } from '@/components/core/ui/card';
import { DateRangePicker } from '@/components/core/ui/date-range-picker';
import { cn } from '@/lib/utils';
import { usePageActions } from "@/components/core/layout/PageActionsContext"; // Added import
import { useEffect } from "react";

// Integrated Action Panel Wrapper (Reused for consistency)
const ActionPanelWrapper = ({
    title,
    children,
    onSave,
    onCancel,
    saveLabel = "Save",
    cancelLabel = "Cancel"
}: {
    title: string,
    children: React.ReactNode,
    onSave: () => void,
    onCancel: () => void,
    saveLabel?: string,
    cancelLabel?: string
}) => (
    <div className="flex flex-col h-full">
        {/* Header Toolbar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border sticky top-0 bg-background z-10 pt-1">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                {title}
            </h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={onCancel}
                    className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title={cancelLabel}
                >
                    <X className="w-5 h-5" />
                </button>
                <button
                    onClick={onSave}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 text-sm font-medium transition-all shadow-sm active:scale-95"
                >
                    <Check className="w-4 h-4" />
                    <span>{saveLabel}</span>
                </button>
            </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {children}
        </div>
    </div>
);

// Mock data for Return Rate Analysis (moved from analytics)
const PRODUCT_RETURN_RATES = [
    { name: "Wireless Earbuds Pro", returnRate: 12.5, reason: "Defective", sold: 450, returned: 56 },
    { name: "Smart Watch Series 5", returnRate: 8.2, reason: "Wrong size", sold: 230, returned: 19 },
    { name: "USB-C Hub 7-in-1", returnRate: 5.1, reason: "Changed mind", sold: 120, returned: 6 },
    { name: "Laptop Stand Aluminum", returnRate: 3.2, reason: "Damaged", sold: 85, returned: 3 },
    { name: "Mechanical Keyboard", returnRate: 15.8, reason: "Not as described", sold: 65, returned: 10 },
];

// Mock data for Lifecycle Funnel (moved from analytics)
const ORDERS_SOURCE_DATA = [
    { name: "Facebook DM", value: 180, percentage: 40, fill: "#1877F2" },
    { name: "Instagram DM", value: 135, percentage: 30, fill: "#E4405F" },
    { name: "TikTok", value: 90, percentage: 20, fill: "#000000" },
    { name: "Other Sources", value: 45, percentage: 10, fill: "#64748b" },
];
const TRAFFIC_SOURCES_DATA = [
    { name: "Facebook Ads", visitors: 12500, orders: 520, revenue: 2600000, conversion: 4.2 },
    { name: "Instagram Organic", visitors: 8500, orders: 340, revenue: 1700000, conversion: 4.0 },
    { name: "TikTok Ads", visitors: 6200, orders: 248, revenue: 1240000, conversion: 4.0 },
    { name: "WhatsApp Referral", visitors: 3100, orders: 186, revenue: 930000, conversion: 6.0 },
    { name: "Direct Traffic", visitors: 4800, orders: 144, revenue: 720000, conversion: 3.0 },
];

// ✅ RESTRUCTURE: Moved from Tab 2 → Unified vertical layout
// ✅ BRAND: Anthropic colors applied - #141413, #faf9f5, #b0aea5, #e8e6dc, #d97757, #6a9bcc, #788c5d

export default function SalesDashboardPage() {
    const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');
    const { warning } = useToast();
    const { setSuggestions } = usePageActions();

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "trend", title: "High Return Rate", description: "Consider reviewing product quality for top 3 returned items" },
            { id: "2", type: "timing", title: "Peak Hours", description: "Most orders confirmed between 2-5 PM" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    // Replaced useRightPanel with local state
    const [activePanelPlugin, setActivePanelPlugin] = useState<{ component: React.ReactNode; title: string } | null>(null);


    const closePanel = () => {
        setActivePanelPlugin(null);
    };

    const openRiskPanel = () => {
        setActivePanelPlugin({
            title: "Return Risk Settings",
            component: <ReturnRiskCalculator />
        });
    };

    const openBlacklistPanel = () => {
        setActivePanelPlugin({
            title: "Blacklist Management",
            component: <CustomerBlacklist />
        });
    };

    const openBotPanel = (component: React.ReactNode, title: string) => {
        setActivePanelPlugin({ component, title });
    };

    return (
        <div className="space-y-6 p-4 md:p-6 rounded-xl">
            {/* Sheet for Dynamic Panels */}
            <Sheet open={!!activePanelPlugin} onOpenChange={(open) => !open && closePanel()}>
                <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-0">
                    {activePanelPlugin && (
                        <div className="h-full p-6">
                            <ActionPanelWrapper
                                title={activePanelPlugin.title}
                                onSave={closePanel}
                                onCancel={closePanel}
                                saveLabel="Save Changes"
                            >
                                {activePanelPlugin.component}
                            </ActionPanelWrapper>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* ═══════════════════════════════════════════════════════════════════
                    SECTION 1: HIGH-LEVEL OVERVIEW (P1 - Always Visible)
                    KPI Cards - Compact Density, 4-col grid
                ═══════════════════════════════════════════════════════════════════ */}
            <PageHeader
                title="Sales Dashboard"
                description="Boost sales & kill returns with AI-driven insights"
                icon={<BarChart className="h-6 w-6 text-[#788c5d]" />}
                className="mb-4"
                actions={
                    <QuickActionsBar
                        variant="inline"
                        primaryAction={{
                            label: "New Order",
                            icon: Package,
                            onClick: () => { }
                        }}
                        actions={[
                            { id: "risk", label: "Risk Settings", icon: Shield, onClick: openRiskPanel },
                            { id: "blacklist", label: "Blacklist", icon: Ban, onClick: openBlacklistPanel },
                            { id: "bot", label: "AI Bot", icon: Bot, onClick: () => openBotPanel(<ConfirmationBot />, "AI Order Confirmation Bot") },
                            { id: "health", label: "Order Health", icon: HeartPulse, onClick: () => console.log("Order health") },
                        ]}
                        moreActions={[
                            {
                                id: "export",
                                label: "Export Data",
                                icon: Download,
                                onClick: () => console.log("Export data"),
                                iconColor: "text-green-500"
                            },
                            {
                                id: "report",
                                label: "Generate Report",
                                icon: FileText,
                                onClick: () => console.log("Generate report"),
                                iconColor: "text-blue-500"
                            }
                        ]}
                    />
                }
            />

            <section className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-primary" />
                        Overview
                    </h2>
                    <div className="flex items-center gap-2">
                        <DateRangePicker />
                        <Button variant="outline" size="sm" className="gap-2"><BarChart className="h-4 w-4" /> Report</Button>
                        <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* KPI 1: Return Rate */}
                    <div className="bg-card p-4 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-muted-foreground font-[Poppins,Arial,sans-serif]">Return Rate</h4>
                            <PackageX className="w-4 h-4 text-[hsl(var(--accent-orange))]" />
                        </div>
                        <div className="text-2xl font-bold text-foreground font-[Lora,Georgia,serif]">12.5%</div>
                        <div className="text-xs text-[hsl(var(--accent-green))] flex items-center mt-1 font-[Lora,Georgia,serif]">
                            <TrendingUp className="w-3 h-3 mr-1" /> -2.1% this week
                        </div>
                    </div>

                    {/* KPI 2: Confirmed Orders */}
                    <div className="bg-card p-4 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-muted-foreground font-[Poppins,Arial,sans-serif]">Confirmed Orders</h4>
                            <CheckCircle className="w-4 h-4 text-[hsl(var(--accent-green))]" />
                        </div>
                        <div className="text-2xl font-bold text-foreground font-[Lora,Georgia,serif]">142</div>
                        <div className="text-xs text-[hsl(var(--accent-green))] flex items-center mt-1 font-[Lora,Georgia,serif]">
                            <TrendingUp className="w-3 h-3 mr-1" /> +15% vs last week
                        </div>
                    </div>

                    {/* KPI 3: Risk Alerts */}
                    <div className="bg-card p-4 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-muted-foreground font-[Poppins,Arial,sans-serif]">Risk Alerts</h4>
                            <AlertTriangle className="w-4 h-4 text-[hsl(var(--accent-orange))]" />
                        </div>
                        <div className="text-2xl font-bold text-foreground font-[Lora,Georgia,serif]">8</div>
                        <div className="text-xs text-[hsl(var(--accent-orange))] mt-1 font-[Lora,Georgia,serif]">
                            Requires attention
                        </div>
                    </div>

                    {/* KPI 4: Shielded */}
                    <div className="bg-card p-4 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-muted-foreground font-[Poppins,Arial,sans-serif]">Shielded</h4>
                            <div className="w-4 h-4 rounded-full bg-[hsl(var(--accent-green))]/20 flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-green))]"></span>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-foreground font-[Lora,Georgia,serif]">24</div>
                        <div className="text-xs text-muted-foreground mt-1 font-[Lora,Georgia,serif]">
                            Orders auto-blocked
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Flagged Activity - Always Visible (Split View) */}
            <div className="bg-background rounded-lg border border-border overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-muted border-b border-border">
                    <h3 className="text-sm font-semibold text-foreground font-[Poppins,Arial,sans-serif] flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-[hsl(var(--accent-orange))]" />
                        Recent Flagged Activity
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={openRiskPanel}
                            className="text-xs flex items-center gap-1 bg-background border border-border px-2 py-1 rounded hover:bg-accent transition text-foreground"
                        >
                            <Shield className="w-3 h-3" /> Risk Settings
                        </button>
                        <button
                            onClick={openBlacklistPanel}
                            className="text-xs flex items-center gap-1 bg-background border border-border px-2 py-1 rounded hover:bg-accent transition text-foreground"
                        >
                            <Ban className="w-3 h-3" /> Blacklist
                        </button>
                    </div>
                </div>
                <table className="w-full text-left font-[Lora,Georgia,serif]">
                    <thead className="bg-muted text-muted-foreground text-sm">
                        <tr>
                            <th className="p-4 font-medium font-[Poppins,Arial,sans-serif]">Order ID</th>
                            <th className="p-4 font-medium font-[Poppins,Arial,sans-serif]">Customer</th>
                            <th className="p-4 font-medium font-[Poppins,Arial,sans-serif]">Status</th>
                            <th className="p-4 font-medium font-[Poppins,Arial,sans-serif]">Alert</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                        <tr className="hover:bg-[hsl(var(--accent-orange))]/5">
                            <td className="p-4 font-mono text-sm text-foreground">#ORD-9921</td>
                            <td className="p-4 text-foreground">Amine K.</td>
                            <td className="p-4"><span className="px-2 py-1 bg-[hsl(var(--accent-orange))]/10 text-[hsl(var(--accent-orange))] rounded-full text-xs">Pending</span></td>
                            <td className="p-4">
                                <div className="flex items-center gap-2 text-[hsl(var(--accent-orange))] bg-[hsl(var(--accent-orange))]/10 px-3 py-1 rounded-full w-fit">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span className="text-xs font-semibold">High Risk</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-4 font-mono text-sm text-foreground">#ORD-9920</td>
                            <td className="p-4 text-foreground">Sarah B.</td>
                            <td className="p-4"><span className="px-2 py-1 bg-[hsl(var(--accent-green))]/10 text-[hsl(var(--accent-green))] rounded-full text-xs">Confirmed</span></td>
                            <td className="p-4"><span className="text-muted-foreground text-xs">-</span></td>
                        </tr>
                        <tr className="bg-background">
                            <td className="p-4 font-mono text-sm text-foreground">#ORD-9919</td>
                            <td className="p-4 text-foreground">0555123456</td>
                            <td className="p-4"><span className="px-2 py-1 bg-[hsl(var(--accent-orange))]/10 text-[hsl(var(--accent-orange))] rounded-full text-xs">Blocked</span></td>
                            <td className="p-4">
                                <div className="flex items-center gap-2 text-foreground bg-muted px-3 py-1 rounded-full w-fit">
                                    <Ban className="w-4 h-4" />
                                    <span className="text-xs font-semibold">Blacklisted</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Order Confirmation - Always Visible (Split View) */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-[#6a9bcc]" />
                        <h2 className="text-lg font-semibold">Order Confirmation</h2>
                    </div>
                    <button
                        onClick={() => openBotPanel(<ConfirmationBot />, "AI Order Confirmation Bot")}
                        className="text-xs flex items-center gap-1 bg-white dark:bg-black/20 border border-border px-3 py-1.5 rounded-full hover:bg-accent transition text-foreground font-medium"
                    >
                        <Bot className="w-3.5 h-3.5" /> Configure Bot
                    </button>
                </div>
                {/* Full Width: Confirmation Workflow Kanban */}
                <ConfirmationWorkflow />
                {/* Shipment Tracking - Moved here */}
                <div>
                    <h3 className="text-base font-semibold mb-4 text-foreground flex items-center gap-2">
                        <Truck className="w-5 h-5 text-[hsl(var(--accent-blue))]" />
                        Shipment Tracking
                    </h3>
                    <ShipmentTracker />
                </div>
                {/* Split View: Scripts + Location - INTEGRATED INTO WORKFLOW NOW */}
            </div>

            {/* Fulfillment - Packers - INTEGRATED INTO WORKFLOW */}

            {/* RISK & PROTECTION - INTEGRATED INTO RECENT ACTIVITY HEADER */}

            {/* Lead Lifecycle & Conversion Path - Always Visible (Split View) */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
                    <h2 className="text-lg font-semibold">Lead Lifecycle & Conversion Path</h2>
                </div>
                <LifecycleFunnel
                    ordersSourceData={ORDERS_SOURCE_DATA}
                    trafficSourcesData={TRAFFIC_SOURCES_DATA}
                    confirmationRate={78}
                    deliverySuccess={92}
                    returnRate={8}
                    hideTrafficSection={true}
                />
            </div>

        </div>
    );
}
