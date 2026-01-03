"use client";

import { useState, useEffect } from "react";
import { usePageActions } from "@/components/core/layout/PageActionsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import {
    BarChart3,
    MapPin,
    DollarSign,
    PiggyBank,
    ShoppingBag,
    Wallet,
    ChevronDown,
    ChevronUp,
    LayoutDashboard,
    PieChart,
    Users,
    TrendingUp,
    BarChart,
    Truck,
    Download,
    UploadCloud,
    Heart,
    MessageSquare,
    Share2,
    Eye,
    ArrowRight,
    Calendar,
    Zap,
    Clock,
    FileText,
    Send,
    CheckCircle,
    Plus,
    X,
    Check,
    RefreshCw,
    Activity
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Badge } from "@/components/core/ui/badge";
import { Button } from "@/components/core/ui/button";
import { WilayaHeatmap, generateWilayaOrderData } from "@/app/ecommerce/_components/delivery/wilaya-heatmap";
import { OrdersChart } from "@/app/analytics/_components/OrdersChart";
import { LifecycleFunnel } from "@/app/analytics/_components/charts/lifecycle-funnel";
import PlatformHub, { PlatformCards, PlatformGrowthTrends } from "@/app/marketing/_components/PlatformHub";
import { IFUCalculator } from "@/app/analytics/_components/IFUCalculator";
import { CreatorEarnings } from "@/app/analytics/_components/CreatorEarnings";
import { PaymentMethodAnalytics } from "@/app/analytics/_components/PaymentMethodAnalytics";
import { CarrierComparison } from "@/app/ecommerce/_components/inventory/CarrierComparison";
import { RevenueProfitChart } from "@/app/analytics/_components/RevenueProfitChart";
import SchedulerView from "@/app/creatives/_components/scheduler/SchedulerView";
import PlatformGuides from "./_components/PlatformGuides";
import { Sheet, SheetContent, SheetTrigger } from "@/components/core/ui/sheet";

import { useRightPanel } from "@/components/core/layout/RightPanelContext";

import { DateRangePicker } from "@/components/core/ui/date-range-picker";
import { FeatureCluster } from "@/components/core/ui/FeatureCluster";
import { FeatureClusterGroup } from "@/components/core/ui/FeatureClusterGroup";


import { cn } from "@/lib/utils";
import { QuickActionsBar } from "@/components/core/layout/QuickActionsBar";

// --- Types & Interfaces ---

interface BusinessKpi {
    label: string;
    value: string;
    change: string;
    icon: any;
    colorClass: string;
    bgClass: string;
    subtext?: string;
    subtextClass?: string;
}

// --- Mock Data ---

// Business KPIs (from analytics dashboard) - now includes COD fees
const businessKpis = {
    totalRevenue: "145,230 DA",
    revenueChange: "+12%",
    codFees: "12,450 DA", // COD delivery fees deducted
    netProfit: "42,150 DA", // After COD fees
    profitChange: "+8%",
    totalOrders: "1,247",
    ordersChange: "+15%",
    avgOrderValue: "8,450 DA",
    aovChange: "-3%"
};

const kpiList: BusinessKpi[] = [
    {
        label: "Total Revenue",
        value: businessKpis.totalRevenue,
        change: `${businessKpis.revenueChange} from last month`,
        icon: DollarSign,
        colorClass: "text-[hsl(var(--accent-green))]",
        bgClass: "bg-[hsl(var(--accent-green))]/10"
    },
    {
        label: "Net Profit",
        value: businessKpis.netProfit,
        change: `${businessKpis.profitChange} from last month`,
        icon: PiggyBank,
        colorClass: "text-[hsl(var(--accent-blue))]",
        bgClass: "bg-[hsl(var(--accent-blue))]/10",
        subtext: `-${businessKpis.codFees} COD fees`,
        subtextClass: "text-destructive"
    },
    {
        label: "Total Orders",
        value: businessKpis.totalOrders,
        change: `${businessKpis.ordersChange} from last month`,
        icon: ShoppingBag,
        colorClass: "text-primary",
        bgClass: "bg-primary/10"
    },
    {
        label: "Avg. Order Value",
        value: businessKpis.avgOrderValue,
        change: `${businessKpis.aovChange} from last month`,
        icon: Wallet,
        colorClass: "text-[hsl(var(--accent-orange))]",
        bgClass: "bg-[hsl(var(--accent-orange))]/10"
    }
];



// Engagement Stats Data
// AI Insights Data (merged from SchedulerView)

// --- Inline Accordion Component (Replacement for missing shadcn component) ---

function SimpleAccordionItem({ title, icon: Icon, children, id }: { title: string, icon: any, children: React.ReactNode, id: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded-xl bg-card overflow-hidden">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors select-none"
            >
                <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{title}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>

            {isOpen && (
                <div className="p-4 pt-0 animate-in fade-in slide-in-from-top-1 duration-200 border-t bg-muted/10">
                    <div className="pt-4">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}



function ActionPanelWrapper({
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
}) {
    return (
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
}

// ... existing code ...

export default function AnalyticsPage() {
    const { setConfig, setIsOpen, isOpen } = useRightPanel();
    const { setSuggestions } = usePageActions();

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "trend", title: "Revenue Up", description: "Revenue increased 12% this month - best performing period" },
            { id: "2", type: "timing", title: "Peak Sales", description: "Wednesdays see 25% more orders than average" },
            { id: "3", type: "improvement", title: "COD Fees High", description: "Consider offering online payment discounts to reduce COD fees" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    const closePanel = () => {
        setIsOpen(false);
        setConfig(null);
    };

    const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

    const openSchedulerPanel = () => {
        setIsSchedulerOpen(true);
    };

    return (
        <div className="flex flex-col gap-8 p-6 max-w-[1600px] mx-auto pb-20">
            <Sheet open={isSchedulerOpen} onOpenChange={setIsSchedulerOpen}>
                <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <ActionPanelWrapper
                        title="Social Scheduler"
                        onSave={() => setIsSchedulerOpen(false)}
                        onCancel={() => setIsSchedulerOpen(false)}
                        saveLabel="Done"
                    >
                        <SchedulerView />
                    </ActionPanelWrapper>
                </SheetContent>
            </Sheet>
            {/* Header */}
            <PageHeader
                title="Business Analytics"
                description="Real-time insights and performance metrics"
                icon={<BarChart3 className="h-6 w-6 text-[hsl(var(--accent-purple))]" />}
                actions={
                    <QuickActionsBar
                        variant="inline"
                        primaryAction={{
                            label: "Generate Report",
                            icon: FileText,
                            onClick: () => console.log("Generate report")
                        }}
                        actions={[
                            {
                                id: "export-report",
                                label: "Export Report",
                                icon: Download,
                                onClick: () => console.log("Export report"),
                                hoverColor: "hover:bg-green-50 hover:text-green-600 hover:border-green-200 dark:hover:bg-green-900/20"
                            },
                            {
                                id: "scheduler",
                                label: "Scheduler",
                                icon: Calendar,
                                onClick: openSchedulerPanel,
                                hoverColor: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/20"
                            },
                            {
                                id: "refresh",
                                label: "Refresh Data",
                                icon: RefreshCw,
                                onClick: () => console.log("Refresh data"),
                                hoverColor: "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 dark:hover:bg-orange-900/20"
                            },
                            {
                                id: "health",
                                label: "Data Health",
                                icon: Activity,
                                onClick: () => console.log("Data health"),
                                hoverColor: "hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20"
                            }
                        ]}
                        moreActions={[
                            {
                                id: "upload-data",
                                label: "Upload Data",
                                icon: UploadCloud,
                                onClick: () => console.log("Upload data"),
                                iconColor: "text-purple-500"
                            }
                        ]}
                    />
                }
            />

            {/* SECTION 2: Delivery Hub */}
            <section className="space-y-6">
                <CarrierComparison showFinancials={true} />
            </section>

            {/* SECTION 3: Revenue & Geographic Performance (Moved Up) */}
            <section className="space-y-6">
                <FeatureClusterGroup>
                    {/* Revenue & Earnings Cluster */}
                    <FeatureCluster
                        title="Revenue & Earnings"
                        icon={<TrendingUp className="h-5 w-5" />}
                        storageKey="analytics-revenue-earnings"
                        defaultExpanded={true}
                        headerClassName="bg-[hsl(var(--accent-green))]"
                        actions={
                            <div className="flex items-center gap-2">
                                <DateRangePicker />
                                <Button size="sm" variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 text-white border-0">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            {/* Row 1: Payment Analytics full width */}
                            <PaymentMethodAnalytics />
                            {/* Row 2: IFU Calculator & Creator Earnings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <IFUCalculator />
                                <CreatorEarnings />
                            </div>
                        </div>
                    </FeatureCluster>

                    {/* Geographic Performance Cluster */}
                    <FeatureCluster
                        title="Geographic Performance"
                        icon={<MapPin className="h-5 w-5" />}
                        storageKey="analytics-geo-perf"
                        defaultExpanded={true}
                        headerClassName="bg-[hsl(var(--accent-orange))]"
                    >
                        <Card className="border-0 shadow-none">
                            <CardContent className="p-0">
                                <WilayaHeatmap data={generateWilayaOrderData()} className="min-h-[400px]" />
                            </CardContent>
                        </Card>
                    </FeatureCluster>
                </FeatureClusterGroup>
            </section>

            {/* SECTION 4: Financial Performance + Orders Details (Moved Down) */}
            <section className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Financial Performance with KPIs */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <DollarSign className="h-5 w-5 text-[hsl(var(--accent-green))]" />
                                    Financial Performance
                                </CardTitle>
                            </div>
                            {/* Inline KPIs */}
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="p-3 rounded-lg bg-[hsl(var(--accent-green))]/5 border border-[hsl(var(--accent-green))]/10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <DollarSign className="h-4 w-4 text-[hsl(var(--accent-green))]" />
                                        <span className="text-xs font-medium text-muted-foreground">Total Revenue</span>
                                    </div>
                                    <div className="text-xl font-bold">{businessKpis.totalRevenue}</div>
                                    <span className={`text-xs ${businessKpis.revenueChange.includes('+') ? 'text-[hsl(var(--accent-green))]' : 'text-destructive'}`}>
                                        {businessKpis.revenueChange} from last month
                                    </span>
                                </div>
                                <div className="p-3 rounded-lg bg-[hsl(var(--accent-blue))]/5 border border-[hsl(var(--accent-blue))]/10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <PiggyBank className="h-4 w-4 text-[hsl(var(--accent-blue))]" />
                                        <span className="text-xs font-medium text-muted-foreground">Net Profit</span>
                                    </div>
                                    <div className="text-xl font-bold">{businessKpis.netProfit}</div>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs ${businessKpis.profitChange.includes('+') ? 'text-[hsl(var(--accent-green))]' : 'text-destructive'}`}>
                                            {businessKpis.profitChange}
                                        </span>
                                        <span className="text-xs text-destructive">-{businessKpis.codFees} COD</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <RevenueProfitChart />
                        </CardContent>
                    </Card>

                    {/* Orders Details with KPIs */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <BarChart className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
                                    Orders Details
                                </CardTitle>
                            </div>
                            {/* Inline KPIs */}
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <ShoppingBag className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-medium text-muted-foreground">Total Orders</span>
                                    </div>
                                    <div className="text-xl font-bold">{businessKpis.totalOrders}</div>
                                    <span className={`text-xs ${businessKpis.ordersChange.includes('+') ? 'text-[hsl(var(--accent-green))]' : 'text-destructive'}`}>
                                        {businessKpis.ordersChange} from last month
                                    </span>
                                </div>
                                <div className="p-3 rounded-lg bg-[hsl(var(--accent-orange))]/5 border border-[hsl(var(--accent-orange))]/10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Wallet className="h-4 w-4 text-[hsl(var(--accent-orange))]" />
                                        <span className="text-xs font-medium text-muted-foreground">Avg. Order Value</span>
                                    </div>
                                    <div className="text-xl font-bold">{businessKpis.avgOrderValue}</div>
                                    <span className={`text-xs ${businessKpis.aovChange.includes('+') ? 'text-[hsl(var(--accent-green))]' : 'text-destructive'}`}>
                                        {businessKpis.aovChange} from last month
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <OrdersChart />
                        </CardContent>
                    </Card>
                </div>
            </section>






            {/* SECTION 5: Platform Guides */}
            <section className="space-y-6">
                <FeatureCluster
                    title="Platform Guides"
                    icon={<TrendingUp className="h-5 w-5" />}
                    storageKey="analytics-platform-guides"
                    defaultExpanded={false}
                    headerClassName="bg-[hsl(var(--accent-purple))]"
                >
                    <PlatformGuides />
                </FeatureCluster>
            </section>

        </div >
    );
}
