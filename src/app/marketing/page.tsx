"use client";

import { useState, Suspense, useEffect } from "react";
import { usePageActions } from "@/components/core/layout/PageActionsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Button } from "@/components/core/ui/button";
import { Badge } from "@/components/core/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/core/ui/collapsible";
import { useToast } from "@/components/core/ui/toast";
import {
    FileText, Download, Upload, Users, DollarSign, Link2, Copy,
    CheckCircle, Clock, Plus, Eye,
    Wallet, ArrowUpRight, Users2, TrendingUp, Gift, Share2, Store, Wand2,
    ChevronDown, ChevronUp, Bot, MessageSquare, Shield, Settings, Heart, X, Check, UserPlus, LayoutDashboard
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { QuickActionsBar } from "@/components/core/layout/QuickActionsBar";
import { DateRangePicker } from "@/components/core/ui/date-range-picker";

import { FeatureCluster } from "@/components/core/ui/FeatureCluster";
import { FeatureClusterGroup } from "@/components/core/ui/FeatureClusterGroup";
import { InfluencerMarketplace } from "@/app/marketing/_components/InfluencerMarketplace";
import { InfluencerRateCalculator } from "@/app/marketing/_components/InfluencerRateCalculator";
import { ContractGenerator } from "@/app/marketing/_components/ContractGenerator";
// Import SectionHeader from creatives shared (or global if moved) - using relative path for now or component import
import { SectionHeader } from "@/app/creatives/_components/shared/SectionHeader";
import { InfluencerPayments } from "@/app/marketing/_components/InfluencerPayments";
import { TierComparison } from "@/app/marketing/_components/TierComparison";

import { ConfirmationBot } from "@/app/marketing/_components/ConfirmationBot";
import { AICommentResponder } from "@/app/marketing/_components/AICommentResponder";
import { CommentsGuard } from "@/app/marketing/_components/CommentsGuard";
import { Sheet, SheetContent } from "@/components/core/ui/sheet";
import PlatformHub, { PlatformCards, PlatformGrowthTrends } from "@/app/marketing/_components/PlatformHub";

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

// ============ MOCK DATA ============

const ENGAGEMENT_STATS = {
    totalEngagement: "2.4K",
    engagementChange: "+340 today",
    likes: 1850,
    comments: 320,
    shares: 230
};

const POPULAR_TOPICS = [
    { id: 1, topic: "Summer Collection Pricing", sentiment: "mixed", mentions: 145, trend: "+12%", platform: "Instagram", keywords: ["expensive", "quality", "shipping"] },
    { id: 2, topic: "Delivery Speed", sentiment: "positive", mentions: 89, trend: "+5%", platform: "Facebook", keywords: ["fast", "ontime", "courier"] },
    { id: 3, topic: "New Colors Request", sentiment: "neutral", mentions: 67, trend: "+24%", platform: "TikTok", keywords: ["blue", "red", "matte"] },
    { id: 4, topic: "Size Guide Questions", sentiment: "negative", mentions: 45, trend: "-2%", platform: "All", keywords: ["fit", "chart", "small"] }
];

const AFFILIATES = [
    { id: 1, name: "Ahmed M.", email: "ahmed@example.com", sales: 45, earnings: "12,500 DA", status: "active", joined: "Jan 2024" },
    { id: 2, name: "Fatima K.", email: "fatima@example.com", sales: 32, earnings: "8,900 DA", status: "active", joined: "Feb 2024" },
    { id: 3, name: "Youcef B.", email: "youcef@example.com", sales: 18, earnings: "4,200 DA", status: "pending", joined: "Mar 2024" },
    { id: 4, name: "Sarah L.", email: "sarah@example.com", sales: 0, earnings: "0 DA", status: "inactive", joined: "Mar 2024" },
];

const KPI_DATA = [
    { title: "Total Affiliates", value: "24", change: "+3", icon: Users },
    { title: "Total Commissions", value: "145,200 DA", change: "+12%", icon: DollarSign },
    { title: "Affiliate Sales", value: "342", change: "+18%", icon: TrendingUp },
    { title: "Conversion Rate", value: "8.2%", change: "+1.2%", icon: Share2 },
];

const PAYOUTS = [
    { id: 1, affiliate: "Ahmed M.", amount: "5,500 DA", status: "completed", date: "Dec 10, 2024" },
    { id: 2, affiliate: "Fatima K.", amount: "3,200 DA", status: "pending", date: "Dec 15, 2024" },
    { id: 3, affiliate: "Youcef B.", amount: "1,800 DA", status: "processing", date: "Dec 14, 2024" },
];

const LINKS = [
    { id: "main", name: "Main Store Link", url: "https://yourstore.dz?ref=", clicks: 1234, conversions: 89 },
    { id: "promo", name: "Summer Promo", url: "https://yourstore.dz/promo?ref=", clicks: 567, conversions: 42 },
    { id: "product", name: "Bestseller Product", url: "https://yourstore.dz/product/123?ref=", clicks: 234, conversions: 18 },
];


// ============ MAIN PAGE ============
function MarketingContent() {
    const [copied, setCopied] = useState<string | null>(null);
    const [showTierComparison, setShowTierComparison] = useState(false);
    const [isAuxiliaryOpen, setIsAuxiliaryOpen] = useState(false);
    const { warning } = useToast();
    const { setSuggestions } = usePageActions();

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "content", title: "Top Topics", description: "Summer Collection and Delivery Speed trending" },
            { id: "2", type: "trend", title: "Engagement Up", description: "+340 interactions today" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    // Replaced useRightPanel with local state for Sheet
    const [activePanelPlugin, setActivePanelPlugin] = useState<{ component: React.ReactNode; title: string } | null>(null);

    const handleCopy = (id: string, url: string) => {
        navigator.clipboard.writeText(url + "YOUR_CODE");
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const closePanel = () => {
        setActivePanelPlugin(null);
    };

    const openBotPanel = (component: React.ReactNode, title: string) => {
        setActivePanelPlugin({ component, title });
    };

    return (
        <div className="space-y-8 p-6 pb-20 max-w-[1600px] mx-auto">
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

            {/* Header */}
            <PageHeader
                title="Marketing & Growth"
                description="Scale your business with affiliates, influencers, and automation"
                icon={<Users2 className="h-6 w-6 text-[hsl(var(--accent-orange))]" />}
                actions={
                    <QuickActionsBar
                        variant="inline"
                        primaryAction={{
                            label: "New Campaign",
                            icon: Wand2,
                            onClick: () => { }
                        }}
                        actions={[
                            { id: "responder", label: "AI Responder", icon: Bot, onClick: () => openBotPanel(<AICommentResponder />, "AI Responder") },
                            { id: "guard", label: "Comments Guard", icon: Shield, onClick: () => openBotPanel(<CommentsGuard />, "Comments Guard") },
                            { id: "contracts", label: "Contracts", icon: FileText, onClick: () => openBotPanel(<ContractGenerator />, "Contract Generator") },
                            { id: "health", label: "Campaign Health", icon: TrendingUp, onClick: () => console.log("Campaign health") },
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
                                id: "invite",
                                label: "Invite Affiliate",
                                icon: UserPlus,
                                onClick: () => console.log("Invite affiliate"),
                                iconColor: "text-blue-500"
                            }
                        ]}
                        className="mb-0" // Reset margin if needed, though variant handles padding/bg
                    />
                }
            />


            {/* ============================================================================== */}
            {/* SECTION 1: OVERVIEW (High-Level Stats)                                         */}
            {/* ============================================================================== */}
            {/* ============================================================================== */}
            <section className="space-y-4">
                <SectionHeader
                    title="Dashboard Overview"
                    icon={LayoutDashboard}
                    actions={
                        <div className="flex items-center gap-2">
                            <DateRangePicker />
                            <Button variant="outline" size="sm" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Report
                            </Button>
                        </div>
                    }
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {KPI_DATA.map((kpi) => (
                        <Card key={kpi.title} className="border-2 hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <kpi.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-xs font-medium text-[hsl(var(--accent-green))] flex items-center gap-0.5">
                                        {kpi.change}<ArrowUpRight className="h-3 w-3" />
                                    </span>
                                </div>
                                <p className="text-2xl font-bold">{kpi.value}</p>
                                <p className="text-xs text-muted-foreground">{kpi.title}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* ============================================================================== */}
            {/* SECTION 1.5: Audience Buzz & Platform Hub                                      */}
            {/* ============================================================================== */}
            <section className="space-y-6">
                {/* Audience Buzz (with Bot Actions) */}
                <Card className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 border-indigo-100 dark:border-indigo-800/30">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            {/* Audience Buzz Title */}
                            <h3 className="flex items-center gap-2 text-base font-semibold text-indigo-900 dark:text-indigo-300">
                                <MessageSquare className="h-4 w-4 text-indigo-500" />
                                Audience Buzz
                            </h3>
                            {/* Bot Actions */}
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 bg-white/50 dark:bg-black/20"
                                    onClick={() => openBotPanel(<AICommentResponder />, "AI Responder")}
                                >
                                    <Bot className="h-3.5 w-3.5" />
                                    AI Responder
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 bg-white/50 dark:bg-black/20"
                                    onClick={() => openBotPanel(<CommentsGuard />, "Comments Guard")}
                                >
                                    <Shield className="h-3.5 w-3.5" />
                                    Guard
                                </Button>
                            </div>
                        </div>

                        {/* Engagement Stats */}
                        <div className="mb-6 p-4 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-[hsl(var(--accent-blue))]/10 rounded-lg">
                                        <MessageSquare className="h-4 w-4 text-[hsl(var(--accent-blue))]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Engagement</p>
                                        <p className="text-2xl font-bold text-[hsl(var(--accent-blue))]">{ENGAGEMENT_STATS.totalEngagement}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-[hsl(var(--accent-green))] bg-[hsl(var(--accent-green))]/5 border-[hsl(var(--accent-green))]/20">
                                    {ENGAGEMENT_STATS.engagementChange}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center p-2 rounded bg-background/50">
                                    <Heart className="h-3 w-3 mx-auto mb-1 text-[hsl(var(--accent-orange))]" />
                                    <span className="block text-sm font-bold">{ENGAGEMENT_STATS.likes.toLocaleString()}</span>
                                    <span className="text-[10px] text-muted-foreground">likes</span>
                                </div>
                                <div className="text-center p-2 rounded bg-background/50">
                                    <MessageSquare className="h-3 w-3 mx-auto mb-1 text-[hsl(var(--accent-blue))]" />
                                    <span className="block text-sm font-bold">{ENGAGEMENT_STATS.comments.toLocaleString()}</span>
                                    <span className="text-[10px] text-muted-foreground">comments</span>
                                </div>
                                <div className="text-center p-2 rounded bg-background/50">
                                    <Share2 className="h-3 w-3 mx-auto mb-1 text-[hsl(var(--accent-green))]" />
                                    <span className="block text-sm font-bold">{ENGAGEMENT_STATS.shares.toLocaleString()}</span>
                                    <span className="text-[10px] text-muted-foreground">shares</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {POPULAR_TOPICS.map((topic) => (
                                <div key={topic.id} className="p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-indigo-100/50 dark:border-indigo-800/30">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium text-sm">{topic.topic}</h4>
                                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${topic.sentiment === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            topic.sentiment === 'negative' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                            }`}>
                                            {topic.sentiment}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {topic.mentions}</span>
                                        <span className="flex items-center gap-1 text-green-600"><TrendingUp className="h-3 w-3" /> {topic.trend}</span>
                                        <span>{topic.platform}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {topic.keywords.map((kw) => (
                                            <span key={kw} className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
                                                #{kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Platform Hub */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <PlatformCards />
                    <PlatformGrowthTrends />
                </div>
            </section>


            {/* ============================================================================== */}
            {/* SECTION 2A: AFFILIATE HUB (Split View + Full Width)                            */}
            {/* Left: Affiliates List | Right: Payout Overview + Transactions                  */}
            {/* Full Width: Commission Links                                                   */}
            {/* ============================================================================== */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Affiliate Hub</h2>
                    <Badge variant="secondary" className="ml-2">Pay-to-Sell</Badge>
                </div>

                {/* Split View: Affiliates List (Left) + Payouts (Right) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Left Pane: Affiliates List (Master) */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <div>
                                <CardTitle className="text-lg">Active Affiliates</CardTitle>
                                <CardDescription>Top performing partners</CardDescription>
                            </div>
                            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Invite</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {AFFILIATES.map((affiliate) => (
                                    <div key={affiliate.id} className="flex items-center justify-between p-3 rounded-xl border hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {affiliate.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{affiliate.name}</p>
                                                <p className="text-xs text-muted-foreground">{affiliate.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm">{affiliate.earnings}</p>
                                            <Badge variant={affiliate.status === "active" ? "default" : "secondary"} className="text-[10px] h-5 px-1.5">
                                                {affiliate.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Pane: Payout Overview + Recent Transactions */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-lg"><Wallet className="h-5 w-5 text-primary" />Payout Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4">
                                    <div><p className="text-xs text-muted-foreground mb-1">Paid (Month)</p><p className="text-xl font-bold text-primary">45,200 DA</p></div>
                                    <div><p className="text-xs text-muted-foreground mb-1">Pending</p><p className="text-xl font-bold text-[hsl(var(--accent-orange))]">12,800 DA</p></div>
                                    <div><p className="text-xs text-muted-foreground mb-1">Total Paid</p><p className="text-xl font-bold">892,500 DA</p></div>
                                </div>
                                <Button className="w-full gap-2 mt-6"><Gift className="h-4 w-4" />Process All Payouts</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {PAYOUTS.map((payout) => (
                                        <div key={payout.id} className="flex items-center justify-between p-3 rounded-xl border">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-full ${payout.status === 'completed' ? 'bg-[hsl(var(--accent-green))]/10 text-[hsl(var(--accent-green))]' : payout.status === 'pending' ? 'bg-[hsl(var(--accent-orange))]/10 text-[hsl(var(--accent-orange))]' : 'bg-[hsl(var(--accent-blue))]/10 text-[hsl(var(--accent-blue))]'}`}>
                                                    {payout.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{payout.affiliate}</p>
                                                    <p className="text-xs text-muted-foreground">{payout.date}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-sm">{payout.amount}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Commission Links Grid (Full Width) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold flex items-center gap-2"><Link2 className="h-5 w-5 text-[hsl(var(--accent-blue))]" />Commission Links</h3>
                            <p className="text-sm text-muted-foreground">Manage your referral links and track performance</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2"><Plus className="h-4 w-4" />Create Link</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {LINKS.map((link) => (
                            <Card key={link.id} className="group hover:shadow-md transition-all">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 bg-[hsl(var(--accent-blue))]/10 rounded-lg"><Link2 className="h-5 w-5 text-[hsl(var(--accent-blue))]" /></div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(link.id, link.url)}>
                                            {copied === link.id ? <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-green))]" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <h3 className="font-semibold mb-1">{link.name}</h3>
                                    <code className="text-xs bg-muted px-2 py-1 rounded block w-full truncate mb-4 text-muted-foreground">{link.url}YOUR_CODE</code>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1.5 text-muted-foreground"><Eye className="h-4 w-4" />{link.clicks}</div>
                                        <div className="flex items-center gap-1.5 text-[hsl(var(--accent-green))] font-medium"><TrendingUp className="h-4 w-4" />{link.conversions} conv.</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            {/* ============================================================================== */}
            {/* SECTION 2B: INFLUENCER HUB (Split View + Clusters)                             */}
            {/* Left: Marketplace | Right: Rate Calculator + Tier Comparison                   */}
            {/* Clusters: Contracts & Payments, UGC Services                                   */}
            {/* ============================================================================== */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                    <Store className="h-5 w-5 text-[hsl(var(--accent-orange))]" />
                    <h2 className="text-xl font-bold">Influencer Hub</h2>
                </div>

                {/* Split View: Marketplace (Left) + Rate Calculator (Right) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Left Pane: Marketplace */}
                    <div className="xl:max-h-[600px] xl:overflow-y-auto xl:pr-2">
                        <InfluencerMarketplace />
                    </div>

                    {/* Right Pane: Rate Calculator + Tier Comparison (Collapsible) */}
                    <div className="space-y-4">
                        <InfluencerRateCalculator />

                        {/* Tier Comparison Toggle */}
                        <Button
                            variant="outline"
                            className="w-full justify-between"
                            onClick={() => setShowTierComparison(!showTierComparison)}
                        >
                            <span className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Tier Comparison Reference
                            </span>
                            {showTierComparison ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                        {showTierComparison && (
                            <div className="animate-in fade-in-50 slide-in-from-top-2">
                                <TierComparison />
                            </div>
                        )}
                    </div>
                </div>

                {/* Clusters for P3 Tools */}
                <FeatureClusterGroup>
                    <FeatureCluster
                        title="Contracts & Deals"
                        icon={<FileText className="h-5 w-5" />}
                        storageKey="marketing-contracts-deals"
                        defaultExpanded={false}
                        headerClassName="bg-[hsl(var(--accent-blue))]"
                    >
                        <Tabs defaultValue="contracts" className="space-y-4">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                                <TabsTrigger value="payments">Payments</TabsTrigger>
                            </TabsList>
                            <TabsContent value="contracts">
                                <ContractGenerator />
                            </TabsContent>
                            <TabsContent value="payments">
                                <InfluencerPayments />
                            </TabsContent>
                        </Tabs>
                    </FeatureCluster>


                </FeatureClusterGroup>
            </section>


            {/* ============================================================================== */}
            {/* SECTION 2C: AUTOMATION (Collapsible Cluster)                                   */}
            {/* ============================================================================== */}



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
                            <h3 className="font-semibold text-sm">Tools & Exports</h3>
                        </div>
                        <CollapsibleTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
                            {isAuxiliaryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="p-4 pt-0 flex flex-wrap gap-2">
                            <Button variant="outline" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Generate Report
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                Export Data
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Upload className="h-4 w-4" />
                                Import Affiliates
                            </Button>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </section>

        </div>
    );
}

export default function MarketingPage() {
    return (
        <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">Loading Marketing...</div>}>
            <MarketingContent />
        </Suspense>
    );
}
