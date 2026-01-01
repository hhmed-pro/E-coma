"use client";

import { useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Button } from "@/components/core/ui/button";
import { Badge } from "@/components/core/ui/badge";
import { Separator } from "@/components/core/ui/separator";
import { ScrollArea } from "@/components/core/ui/scroll-area";
import { Input } from "@/components/core/ui/input";
import { Switch } from "@/components/core/ui/switch";
import {
    FileText, Download, Upload, UploadCloud, Megaphone, Users, BarChart3,
    Plus, Play, Pause, ShieldCheck, DollarSign, TrendingUp,
    Target, Sparkles, Lightbulb, Search, Filter,
    Eye, MousePointerClick, Activity, Globe, Wrench, ShieldAlert, Info,
    Wallet, ImagePlus, CheckCircle, Clock, ArrowUpRight, Users2, Gift, Share2, Store, Wand2,
    ChevronDown, ChevronUp, Bot, MessageSquare, Shield, LayoutDashboard, PieChart, CreditCard, HelpCircle,
    Zap, Heart
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { FeatureFavoriteStar } from "@/components/core/ui/FeatureFavoriteStar";
import { FeatureCluster } from "@/components/core/ui/FeatureCluster";
import { FeatureClusterGroup } from "@/components/core/ui/FeatureClusterGroup";
import { cn } from "@/lib/utils";

// Import traffic components for Analytics
import { TrafficKPIDashboard } from '@/components/marketing/traffic/TrafficKPIDashboard';
import { TrafficSourcesChart } from '@/components/marketing/traffic/TrafficSourcesChart';
import { TopLandingPages } from '@/components/marketing/traffic/TopLandingPages';
import { TrafficTimelineChart } from '@/components/marketing/traffic/TrafficTimeline';

// Import Budget AI Tips
import BudgetAiTips from "@/app/marketing/ads-manager/_components/BudgetAiTips";

// Import Financial Charts from analytics


// Ads Components
import AccountHealthMonitor from "@/components/ads/AccountHealthMonitor";
import CurrencyTracker from "@/components/ads/CurrencyTracker";

import AgencyAccountManager from "@/components/ads/AgencyAccountManager";
import DeliveryRateKPI from "@/components/ads/DeliveryRateKPI";
import { LifecycleFunnel, TrafficAcquisitionSection } from "@/components/analytics/charts/lifecycle-funnel";
import { OfflineConversionSync } from "@/components/sales/OfflineConversionSync";

// ============ MOCK DATA ============

const ADS_DATA = [
    { id: 1, name: "Summer Promo - Video A", status: "active", spend: "12,500 DA", conversions: 45, roas: "3.2x", aiRating: 92, platform: "Instagram", impressions: "450K", ctr: "3.2%", revenue: "40,000 DA", deliveryRate: "85%" },
    { id: 2, name: "Flash Sale - Image B", status: "paused", spend: "8,200 DA", conversions: 12, roas: "1.8x", aiRating: 65, platform: "Facebook", impressions: "120K", ctr: "1.5%", revenue: "14,760 DA", deliveryRate: "60%" },
    { id: 3, name: "New Arrival - Carousel", status: "draft", spend: "0 DA", conversions: 0, roas: "-", aiRating: null, platform: "TikTok", impressions: "-", ctr: "-", revenue: "0 DA", deliveryRate: "-" },
    { id: 4, name: "Retargeting - Catalog", status: "active", spend: "5,400 DA", conversions: 28, roas: "4.5x", aiRating: 88, platform: "Google", impressions: "85K", ctr: "2.1%", revenue: "24,300 DA", deliveryRate: "92%" },
];

const KPI_DATA = [
    { title: "Overall ROAS", value: "3.6x", change: "+9%", icon: Target, color: "text-[hsl(var(--accent-blue))]" },
    { title: "Total Ad Spend", value: "163,500 DA", change: "+11%", icon: DollarSign, color: "text-[hsl(var(--accent-green))]" },
    { title: "Total Revenue", value: "582,900 DA", change: "+14%", icon: TrendingUp, color: "text-[hsl(var(--accent-blue))]" },
    { title: "Active Campaigns", value: "12", change: "+2", icon: Play, color: "text-[hsl(var(--accent-orange))]" },
];

const STOP_LOSS_RULES = [
    { id: 1, name: "Low ROAS Alert", condition: "ROAS < 2.0x for 24h", action: "Pause Campaign", status: "active", triggered: 3 },
    { id: 2, name: "Budget Overrun", condition: "Spend > 110% of daily budget", action: "Stop Ads", status: "active", triggered: 1 },
    { id: 3, name: "CTR Drop", condition: "CTR < 0.5%", action: "Notify", status: "paused", triggered: 0 },
];

const trafficKpiData = {
    visitors: "24,521", visitorsChange: 12,
    pageviews: "89,432", pageviewsChange: 15,
    bounceRate: 38.2, bounceChange: -3,
    avgSession: "03:45", sessionChange: 8,
    conversionRate: 2.4, conversionChange: 0.5
};

const sourceData = [
    { name: 'Facebook Ads', value: 10298, percentage: 42 },
    { name: 'Instagram', value: 5885, percentage: 24 },
    { name: 'Direct', value: 4414, percentage: 18 },
    { name: 'WhatsApp', value: 2452, percentage: 10 },
    { name: 'Google', value: 1472, percentage: 6 },
];

const landingPages = [
    { title: 'Wireless Earbuds', url: '/products/wireless-earbuds', visitors: 12432, bounceRate: 32, conversions: 1020 },
    { title: 'Smart Watch', url: '/products/smart-watch', visitors: 8921, bounceRate: 28, conversions: 670 },
];

const timelineData = [
    { date: '2023-11-01', visitors: 3200, pageviews: 12400, sessions: 3500 },
    { date: '2023-11-02', visitors: 3800, pageviews: 14200, sessions: 4100 },
    { date: '2023-11-03', visitors: 4100, pageviews: 15800, sessions: 4500 },
];

const ENGAGEMENT_DATA = [
    { metric: "Total Reach", value: "1.2M", change: "+18%", icon: Eye },
    { metric: "Engagement Rate", value: "4.8%", change: "+0.6%", icon: Activity },
    { metric: "Click-through Rate", value: "2.3%", change: "+0.4%", icon: MousePointerClick },
    { metric: "Conversions", value: "3,420", change: "+22%", icon: Target },
    { metric: "Conversions", value: "3,420", change: "+22%", icon: Target },
];

// Mock Data for Traffic & Acquisition
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

// Top Performing Content Data
const TOP_CONTENT_DATA = [
    {
        id: 1,
        platform: "Instagram",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80",
        title: "Summer Collection Launch Teaser",
        metrics: { views: "45.2K", likes: "3.2K", shares: "850" },
        roi: "12.5x"
    },
    {
        id: 2,
        platform: "TikTok",
        thumbnail: "https://images.unsplash.com/photo-1542206391-7f9492806184?w=100&q=80",
        title: "Behind the Scenes: Packaging",
        metrics: { views: "120K", likes: "15.4K", shares: "2.1K" },
        roi: "8.2x"
    },
    {
        id: 3,
        platform: "Facebook",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&q=80",
        title: "Flash Sale Announcement - 24h",
        metrics: { views: "15K", likes: "850", shares: "120" },
        roi: "24.0x"
    },
];

// AI Insights Data
const AI_INSIGHTS = [
    { title: "Best posting time", value: "6:00 PM - 8:00 PM", trend: "+23% engagement", icon: Clock },
    { title: "Top content type", value: "Video Reels", trend: "4.2x more reach", icon: TrendingUp },
    { title: "Optimal post length", value: "80-150 characters", trend: "+18% CTR", icon: FileText },
];

// ============ COMPONENTS ============

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        active: "bg-[hsl(var(--accent-green))]/15 text-[hsl(var(--accent-green))]",
        warning: "bg-[hsl(var(--accent-orange))]/15 text-[hsl(var(--accent-orange))]",
        inactive: "bg-muted text-muted-foreground",
        paused: "bg-[hsl(var(--accent-orange))]/15 text-[hsl(var(--accent-orange))]",
        draft: "bg-muted text-muted-foreground",
    };
    return <Badge variant="outline" className={cn("capitalize px-2 py-0.5", styles[status] || styles.inactive)}>{status}</Badge>;
};

// ============ MAIN PAGE ============
function AdsContent() {
    const [selectedAdId, setSelectedAdId] = useState<number | null>(1);
    const [showRealData, setShowRealData] = useState(false);

    // Exchange rate constants for True ROAS calculation
    const OFFICIAL_RATE = 134;
    const REAL_RATE = 240;
    const RATE_MULTIPLIER = REAL_RATE / OFFICIAL_RATE;

    const getDisplayMetrics = (ad: typeof ADS_DATA[0]) => {
        if (!showRealData) return ad;
        const numericSpend = parseInt(ad.spend.replace(/[^0-9]/g, ''));
        const numericRevenue = parseInt(ad.revenue.replace(/[^0-9]/g, ''));
        const realSpend = Math.round(numericSpend * RATE_MULTIPLIER);
        const realRoas = numericRevenue > 0 ? (numericRevenue / realSpend).toFixed(1) + 'x' : '-';
        return { ...ad, spend: realSpend.toLocaleString() + ' DA', roas: realRoas };
    };

    const selectedAdRaw = ADS_DATA.find(ad => ad.id === selectedAdId);
    const selectedAd = selectedAdRaw ? getDisplayMetrics(selectedAdRaw) : undefined;

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <PageHeader
                title="Ads Center"
                description="Manage your campaigns and track performance across all platforms"
                icon={<Megaphone className="h-6 w-6 text-[hsl(var(--accent-blue))]" />}
                actions={
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="gap-2 hidden sm:flex">
                            <FileText className="h-4 w-4" />
                            Generate Report
                        </Button>
                        <Button variant="outline" className="gap-2 hidden sm:flex">
                            <Upload className="h-4 w-4" />
                            Import
                        </Button>
                        <Button variant="outline" className="gap-2 hidden sm:flex">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                        <FeatureFavoriteStar featureId="ads-manager" size="lg" />
                    </div>
                }
            />

            {/* ============ SECTION 1: DATA TOGGLE + KPIs ============ */}
            {/* ✅ RESTRUCTURE: Moved from Tab 1 to always visible */}
            <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-[hsl(var(--accent-blue))]" />
                    <span className="text-sm font-medium">Data View Mode</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-xs ${!showRealData ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                        Platform Data (Official Rate)
                    </span>
                    <Switch checked={showRealData} onCheckedChange={setShowRealData} />
                    <span className={`text-xs ${showRealData ? 'font-bold text-[hsl(var(--accent-orange))]' : 'text-muted-foreground'}`}>
                        Real Cost (Black Market +{Math.round((RATE_MULTIPLIER - 1) * 100)}%)
                    </span>
                </div>
            </div>

            {/* ✅ RESTRUCTURE: KPIs - 5 column grid (Compact density) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {KPI_DATA.map((kpi) => {
                    let displayValue = kpi.value;
                    if (showRealData && kpi.title === "Total Ad Spend") {
                        const numericVal = parseInt(kpi.value.replace(/[^0-9]/g, ''));
                        displayValue = Math.round(numericVal * RATE_MULTIPLIER).toLocaleString() + ' DA';
                    }
                    if (showRealData && kpi.title === "Overall ROAS") {
                        const numericVal = parseFloat(kpi.value);
                        displayValue = (numericVal / RATE_MULTIPLIER).toFixed(1) + 'x';
                    }
                    return (
                        <Card key={kpi.title} className="bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between pb-2">
                                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                                </div>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <h3 className="text-2xl font-bold">{displayValue}</h3>
                                    <span className={`text-xs font-medium ${kpi.change.startsWith('+') ? 'text-[hsl(var(--accent-green))]' : 'text-destructive'}`}>{kpi.change}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
                <DeliveryRateKPI delivered={480} totalOrders={600} trend={2.5} />
            </div>

            <Separator />

            {/* ============ SECTION 2: SPLIT-VIEW CAMPAIGN WORKSPACE ============ */}
            {/* ✅ RESTRUCTURE: Preserved from Tab 1 - primary workflow */}
            <div className="grid grid-cols-12 gap-6 min-h-[400px]">
                {/* Left: Campaign List */}
                <Card className="col-span-12 md:col-span-4 flex flex-col overflow-hidden">
                    <div className="p-4 border-b space-y-3">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search campaigns..." className="pl-9" />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-3 space-y-2">
                            {ADS_DATA.map((adRaw) => {
                                const ad = getDisplayMetrics(adRaw);
                                return (
                                    <div
                                        key={ad.id}
                                        onClick={() => setSelectedAdId(ad.id)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedAdId === ad.id ? "bg-primary/5 border-primary/50" : "hover:bg-muted/30"}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <StatusBadge status={ad.status} />
                                            {ad.aiRating && (
                                                <span className="flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[hsl(var(--accent-green))]/10 text-[hsl(var(--accent-green))]">
                                                    <Sparkles className="h-2.5 w-2.5" />{ad.aiRating}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-semibold text-sm mb-2">{ad.name}</h4>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                            <div><span className="text-[10px] uppercase">Spend</span><br /><span className={`font-medium ${showRealData ? 'text-[hsl(var(--accent-orange))]' : 'text-foreground'}`}>{ad.spend}</span></div>
                                            <div><span className="text-[10px] uppercase">ROAS</span><br /><span className={`font-medium ${showRealData ? 'text-[hsl(var(--accent-orange))]' : 'text-foreground'}`}>{ad.roas}</span></div>
                                            <div className="col-span-2 mt-1 border-t pt-1 flex justify-between">
                                                <span className="text-[10px] uppercase text-muted-foreground">Delivery Rate</span>
                                                <span className="font-bold text-xs">{ad.deliveryRate}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </Card>

                {/* Right: Details */}
                <Card className="col-span-12 md:col-span-8 overflow-hidden">
                    <CardContent className="p-6">
                        {selectedAd ? (
                            <div className="space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedAd.name}</h2>
                                        <p className="text-muted-foreground text-sm">{selectedAd.platform} • {selectedAd.status}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="outline" size="sm">{selectedAd.status === "active" ? "Pause" : "Resume"}</Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Card className="bg-primary/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Impressions</p><p className="text-xl font-bold">{selectedAd.impressions}</p></CardContent></Card>
                                    <Card className="bg-primary/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground">CTR</p><p className="text-xl font-bold">{selectedAd.ctr}</p></CardContent></Card>
                                    <Card className="bg-primary/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Conversions</p><p className="text-xl font-bold">{selectedAd.conversions}</p></CardContent></Card>
                                    <Card className="bg-primary/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Delivery Rate</p><p className="text-xl font-bold">{selectedAd.deliveryRate}</p></CardContent></Card>
                                </div>
                                <Card className="bg-[hsl(var(--accent-green))]/10"><CardContent className="p-4"><p className="text-xs text-[hsl(var(--accent-green))]">Revenue</p><p className="text-xl font-bold text-[hsl(var(--accent-green))]">{selectedAd.revenue}</p></CardContent></Card>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground">Select a campaign</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Separator />

            {/* ============ SECTION 3: FEATURE CLUSTERS ============ */}
            <FeatureClusterGroup>
                {/* ✅ RESTRUCTURE: Budget & Currency Cluster */}
                <FeatureCluster
                    title="Budget & Currency Tools"
                    icon={<Wallet className="h-5 w-5 text-[hsl(var(--accent-green))]" />}
                    storageKey="ads-budget-currency"
                    defaultExpanded={true}
                >
                    <div className="space-y-6">
                        <BudgetAiTips />

                        {/* Stop-Loss Rules */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="h-5 w-5 text-[hsl(var(--accent-blue))]" />Smart Stop-Loss Rules</CardTitle>
                                    <CardDescription>Automated protection for your ad spend</CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="gap-2"><Plus className="h-3.5 w-3.5" />Add Rule</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {STOP_LOSS_RULES.map((rule) => (
                                        <div key={rule.id} className="flex items-center justify-between p-3 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-full ${rule.status === "active" ? "bg-[hsl(var(--accent-green))]/10 text-[hsl(var(--accent-green))]" : "bg-muted"}`}>
                                                    {rule.status === "active" ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{rule.name}</p>
                                                    <p className="text-xs text-muted-foreground">{rule.condition}</p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary">{rule.action}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <CurrencyTracker />
                    </div>
                </FeatureCluster>

                {/* ✅ RESTRUCTURE: Account Safety Cluster - Moved from Tab 2 & 3 */}
                <FeatureCluster
                    title="Account Safety & Management"
                    icon={<ShieldAlert className="h-5 w-5 text-[hsl(var(--accent-orange))]" />}
                    storageKey="ads-account-safety"
                    defaultExpanded={true}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AccountHealthMonitor />
                        <AgencyAccountManager />
                    </div>
                </FeatureCluster>

                {/* ✅ RESTRUCTURE: Ad Platform Sync - Moved from Analytics */}
                <FeatureCluster
                    title="Ad Platform Sync"
                    icon={<UploadCloud className="h-5 w-5" />}
                    storageKey="ads-platform-sync"
                    defaultExpanded={false}
                    headerClassName="bg-gradient-to-r from-[#6a9bcc] to-[#6a9bcc]/90"
                >
                    <div className="max-w-2xl">
                        <OfflineConversionSync />
                    </div>
                </FeatureCluster>
            </FeatureClusterGroup>

            <FeatureClusterGroup>


                {/* ✅ RESTRUCTURE: Analytics Cluster - Moved from Tab 4 */}
                <FeatureCluster
                    title="Analytics & Performance"
                    icon={<BarChart3 className="h-5 w-5 text-[hsl(var(--accent-blue))]" />}
                    storageKey="ads-analytics"
                    defaultExpanded={false}
                >
                    <div className="space-y-8">
                        {/* Engagement KPIs */}
                        <div>
                            <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Target className="h-5 w-5 text-[hsl(var(--accent-orange))]" />Engagement & Conversion</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {ENGAGEMENT_DATA.map((item) => (
                                    <Card key={item.metric}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <item.icon className="h-5 w-5 text-muted-foreground" />
                                                <span className="text-xs text-[hsl(var(--accent-green))]">{item.change}</span>
                                            </div>
                                            <p className="text-2xl font-bold mt-2">{item.value}</p>
                                            <p className="text-xs text-muted-foreground">{item.metric}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Revenue & Profit */}


                        {/* Traffic Analytics */}
                        <div>
                            <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Globe className="h-5 w-5 text-[hsl(var(--accent-blue))]" />Ads-Traffic Analytics</h3>
                            <TrafficKPIDashboard data={trafficKpiData} />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                                <div className="lg:col-span-2"><TrafficTimelineChart data={timelineData} /></div>
                                <div><TrafficSourcesChart data={sourceData} /></div>
                            </div>
                            <div className="mt-6"><TopLandingPages pages={landingPages} /></div>

                            <div className="mt-6 pt-6 border-t">
                                <TrafficAcquisitionSection
                                    trafficSourcesData={TRAFFIC_SOURCES_DATA}
                                    ordersSourceData={ORDERS_SOURCE_DATA}
                                />
                            </div>
                        </div>
                    </div>
                </FeatureCluster>

                <FeatureCluster
                    title="Top Performing Content"
                    icon={<Heart className="h-5 w-5 text-rose-500" />}
                    storageKey="ads-top-content"
                    defaultExpanded={true}
                >
                    <div className="space-y-6">
                        {/* Main Grid: Content Cards + AI Insights Sidebar */}
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                            {/* Content Cards (8 cols) */}
                            <div className="xl:col-span-8 space-y-3">
                                {TOP_CONTENT_DATA.map((content) => (
                                    <div key={content.id} className="group relative flex gap-3 p-3 rounded-lg border bg-card hover:shadow-md transition-all">
                                        <div className="w-16 h-16 rounded-md bg-muted overflow-hidden flex-shrink-0 relative">
                                            <img src={content.thumbnail} alt="Content thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute top-1 left-1">
                                                <Badge variant="secondary" className="h-4 px-1 text-[8px]">{content.platform}</Badge>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                            <div>
                                                <h4 className="text-sm font-medium leading-none truncate mb-1">{content.title}</h4>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" /> {content.metrics.views}</span>
                                                    <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" /> {content.metrics.likes}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-[10px] text-muted-foreground">ROI Performance</span>
                                                <span className="text-xs font-bold text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded-sm">
                                                    {content.roi}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* AI Insights Sidebar (4 cols) */}
                            <div className="xl:col-span-4 space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <Zap className="h-4 w-4 text-yellow-500" />
                                    </div>
                                    <h3 className="text-sm font-bold">AI Insights</h3>
                                </div>
                                <div className="space-y-2">
                                    {AI_INSIGHTS.map((insight, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-white/50 dark:bg-muted/30 border border-border/50 hover:shadow-sm transition-all">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg">
                                                    <insight.icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{insight.title}</p>
                                                    <p className="text-sm font-bold text-foreground">{insight.value}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                                        <p className="text-xs text-green-600 font-medium">{insight.trend}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </FeatureCluster>
            </FeatureClusterGroup>
        </div>
    );
}

export default function AdsPage() {
    return (
        <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">Loading Ads Center...</div>}>
            <AdsContent />
        </Suspense>
    );
}
