"use client";

import { Suspense, useState, useEffect } from "react";
import { usePageActions } from "@/components/core/layout/PageActionsContext";
import TrendingProductAds from "@/app/ecommerce/_components/research/TrendingProductAds";
import SocialMediaTopics from "@/app/ecommerce/_components/research/SocialMediaTopics";
import ProductSearch from "@/app/ecommerce/_components/research/ProductSearch";
import TrackerDashboard from "@/app/ecommerce/_components/research/TrackerDashboard";
import WinningProductAiScore from "@/app/ecommerce/_components/research/WinningProductAiScore";
import CompetitorTrackerEnhanced from "@/app/ecommerce/_components/research/CompetitorTrackerEnhanced";
import SupplierDatabase from "@/app/product-research/_components/SupplierDatabase";
import AlgeriaTrends from "@/app/ecommerce/_components/research/AlgeriaTrends";
import { Button } from "@/components/core/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Badge } from "@/components/core/ui/badge";
import { FileText, Download, Upload, TrendingUp, TrendingDown, Star, Target, Eye, ShoppingCart, ChevronDown, ChevronUp, Settings, Search, Sparkles, Globe, Plus } from "lucide-react";

import { PageHeader } from "@/components/core/layout/PageHeader";
import { QuickActionsBar } from "@/components/core/layout/QuickActionsBar";
import { FeatureCluster } from "@/components/core/ui/FeatureCluster";
import { DateRangePicker } from "@/components/core/ui/date-range-picker";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/core/ui/collapsible";


// Mock Data - Bestseller Trends (Migrated from Orders)
const BESTSELLER_TRENDS = [
    { name: "Wireless Earbuds Pro", thisMonth: 450, lastMonth: 380, trend: "+18%", avgOrderValue: 12500 },
    { name: "Smart Watch Series 5", thisMonth: 230, lastMonth: 195, trend: "+18%", avgOrderValue: 35000 },
    { name: "USB-C Hub 7-in-1", thisMonth: 120, lastMonth: 92, trend: "+30%", avgOrderValue: 6500 },
    { name: "Laptop Stand Aluminum", thisMonth: 85, lastMonth: 78, trend: "+9%", avgOrderValue: 4500 },
    { name: "Mechanical Keyboard RGB", thisMonth: 65, lastMonth: 70, trend: "-7%", avgOrderValue: 18000 },
];

// Product Performance KPIs (from analytics dashboard)
const PRODUCT_PERFORMANCE_KPIS = [
    { label: "Product Views", value: "45,200", change: "+18%", icon: Eye, color: "bg-[hsl(var(--accent-blue))]/10", iconColor: "text-[hsl(var(--accent-blue))]" },
    { label: "Add to Cart", value: "12,800", change: "+12%", icon: ShoppingCart, color: "bg-[hsl(var(--accent-orange))]/10", iconColor: "text-[hsl(var(--accent-orange))]" },
    { label: "Conversion Rate", value: "3.2%", change: "+0.5%", icon: Target, color: "bg-[hsl(var(--accent-green))]/10", iconColor: "text-[hsl(var(--accent-green))]" },
    { label: "Avg. Order Value", value: "8,450 DA", change: "-3%", icon: TrendingDown, color: "bg-destructive/10", iconColor: "text-destructive" },
];

function ProductResearchView() {
    const [isAuxiliaryOpen, setIsAuxiliaryOpen] = useState(false);
    const { setSuggestions } = usePageActions();

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "trend", title: "Trending Product", description: "Wireless Earbuds are up 30% this week in Algeria" },
            { id: "2", type: "content", title: "Niche Opportunity", description: "Home organization products have low competition" },
            { id: "3", type: "improvement", title: "Price Alert", description: "Competitor lowered prices on 3 tracked items" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    return (
        <div className="space-y-8 p-6 pb-20 max-w-[1600px] mx-auto">
            {/* Header */}
            <PageHeader
                title="Product Research"
                description="Discover winning products with AI-powered market analysis"
                icon={<Search className="h-6 w-6 text-[hsl(var(--accent-purple))]" />}
                actions={
                    <QuickActionsBar
                        variant="inline"
                        primaryAction={{
                            label: "New Search",
                            icon: Search,
                            onClick: () => console.log("New search")
                        }}
                        actions={[
                            {
                                id: "track",
                                label: "Track Product",
                                icon: Target,
                                onClick: () => console.log("Track product"),
                                hoverColor: "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 dark:hover:bg-orange-900/20"
                            },
                            {
                                id: "competitors",
                                label: "Competitors",
                                icon: Eye,
                                onClick: () => console.log("Compare competitors"),
                                hoverColor: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/20"
                            },
                            {
                                id: "suppliers",
                                label: "Suppliers",
                                icon: Globe,
                                onClick: () => console.log("Find suppliers"),
                                hoverColor: "hover:bg-green-50 hover:text-green-600 hover:border-green-200 dark:hover:bg-green-900/20"
                            },
                            {
                                id: "ai-score",
                                label: "AI Score",
                                icon: Sparkles,
                                onClick: () => console.log("AI Score"),
                                hoverColor: "hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 dark:hover:bg-purple-900/20"
                            },
                            {
                                id: "health",
                                label: "Research Status",
                                icon: Target,
                                onClick: () => console.log("Research status"),
                                hoverColor: "hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20"
                            }
                        ]}
                        moreActions={[
                            {
                                id: "report",
                                label: "Generate Full Report",
                                icon: FileText,
                                onClick: () => console.log("Generate report"),
                                iconColor: "text-blue-500"
                            },
                            {
                                id: "import",
                                label: "Import Product List",
                                icon: Upload,
                                onClick: () => console.log("Import products"),
                                iconColor: "text-purple-500"
                            },
                            {
                                id: "export",
                                label: "Export Research Data",
                                icon: Download,
                                onClick: () => console.log("Export data"),
                                iconColor: "text-green-500",
                                separator: true
                            }
                        ]}
                    />
                }
            />

            {/* ============================================================================== */}
            {/* SECTION 1: OVERVIEW (High-Level Stats)                                         */}
            {/* ============================================================================== */}
            <section className="space-y-6">
                {/* 1.1 KPI Grid - Compact Mode */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PRODUCT_PERFORMANCE_KPIS.map((kpi) => (
                        <Card key={kpi.label} className="hover:shadow-md transition-all">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${kpi.color}`}>
                                    <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-xl font-bold">{kpi.value}</p>
                                        <span className={`text-xs ${kpi.change.startsWith("+") ? "text-[hsl(var(--accent-green))]" : "text-destructive"}`}>{kpi.change}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* 1.2 Tracker Dashboard Summary */}
                <FeatureCluster
                    title="Active Tracking Overview"
                    icon={<Target className="h-5 w-5" />}
                    storageKey="product-research-tracker"
                    defaultExpanded={true}
                    headerClassName="bg-[hsl(var(--accent-orange))]"
                    actions={
                        <div className="flex items-center gap-2">
                            <DateRangePicker />
                            <Button variant="ghost" size="sm"><FileText className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                        </div>
                    }
                >
                    <TrackerDashboard />
                </FeatureCluster>
            </section>


            {/* ============================================================================== */}
            {/* SECTION 2A: DISCOVERY (Split View)                                             */}
            {/* Left: Product Search (Master) | Right: AI Score + Bestsellers (Detail/Context) */}
            {/* ============================================================================== */}
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-8 flex flex-col gap-6">
                    {/* Master Pane: Product Search */}
                    <Card className="h-full shadow-md border-primary/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Eye className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
                                Product Discovery Engine
                            </CardTitle>
                            <CardDescription>Search across multiple platforms or scrape via URL</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProductSearch />
                        </CardContent>
                    </Card>
                </div>

                <div className="xl:col-span-4 flex flex-col gap-6">
                    {/* Right Pane: AI Score & Context */}
                    <WinningProductAiScore />

                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Star className="h-4 w-4 text-[hsl(var(--accent-orange))]" />
                                Bestseller Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {BESTSELLER_TRENDS.slice(0, 5).map((product) => (
                                    <div key={product.name} className="p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                        <div className="text-sm">
                                            <p className="font-medium line-clamp-1">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">{product.thisMonth} sold this month</p>
                                        </div>
                                        <Badge
                                            variant={product.trend.startsWith("+") ? "default" : "secondary"}
                                            className={`text-[10px] h-5 px-1.5 ${product.trend.startsWith("+") ? "bg-[hsl(var(--accent-green))]/10 text-[hsl(var(--accent-green))]" : "bg-destructive/10 text-destructive"}`}
                                        >
                                            {product.trend}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>


            {/* ============================================================================== */}
            {/* SECTION 2B: MARKET INTELLIGENCE (Split View)                                   */}
            {/* Left: Trending Ads (Master) | Right: Trends + Topics (Context)                 */}
            {/* ============================================================================== */}
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-[hsl(var(--accent-blue))]" />
                        Market Intelligence
                    </h2>
                </div>

                <div className="xl:col-span-7 flex flex-col gap-6">
                    {/* Master Pane: Trending Ads */}
                    <Card className="shadow-md border-[hsl(var(--accent-blue))]/10">
                        <CardHeader>
                            <CardTitle>Top Performing Ads</CardTitle>
                            <CardDescription>Viral creative analysis from social platforms</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TrendingProductAds />
                        </CardContent>
                    </Card>
                </div>

                <div className="xl:col-span-5 flex flex-col gap-6">
                    {/* Right Pane: Trends & Topics */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Algeria Market Trends</CardTitle>
                        </CardHeader>
                        <CardContent className="px-2">
                            <AlgeriaTrends />
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Niche Topics</CardTitle>
                        </CardHeader>
                        <CardContent className="px-2">
                            <SocialMediaTopics />
                        </CardContent>
                    </Card>
                </div>
            </section>


            {/* ============================================================================== */}
            {/* SECTION 2C: DEEP ANALYSIS (Full Width)                                         */}
            {/* Competitor Tracking & Sourcing                                                 */}
            {/* ============================================================================== */}
            <section className="space-y-8">
                <div className="flex items-center gap-2 border-b pb-2">
                    <Target className="h-5 w-5 text-[hsl(var(--accent-orange))]" />
                    <h2 className="text-xl font-bold">Deep Analysis & Sourcing</h2>
                </div>

                {/* Competitor Tracker - Needs Full Width for Tables */}
                <div className="bg-background rounded-xl border p-1 shadow-sm">
                    <CompetitorTrackerEnhanced />
                </div>

                {/* Supplier Database - Needs Full Width for Grid */}
                <div className="bg-background rounded-xl border p-1 shadow-sm">
                    <SupplierDatabase />
                </div>
            </section>


            {/* ============================================================================== */}
            {/* SECTION 3: AUXILIARY (Bottom Actions)                                          */}
            {/* ============================================================================== */}
            <section>
                <Collapsible
                    open={isAuxiliaryOpen}
                    onOpenChange={setIsAuxiliaryOpen}
                    className="border rounded-lg bg-muted/20"
                >
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold text-sm">Research Tools & Exports</h3>
                        </div>
                        <CollapsibleTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
                            {isAuxiliaryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="p-4 pt-0 flex flex-wrap gap-2">
                            <Button variant="outline" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Generate Full Report (PDF)
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Upload className="h-4 w-4" />
                                Import Product List (CSV)
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                Export Research Data (Excel)
                            </Button>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </section>

        </div>
    );
}

// Main Page Component
export default function ProductResearchPage() {
    return (
        <Suspense fallback={<div className="p-6">Loading...</div>}>
            <ProductResearchView />
        </Suspense>
    );
}
