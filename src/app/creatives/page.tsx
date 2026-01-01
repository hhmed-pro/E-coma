"use client";

import { useState } from "react";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Button } from "@/components/core/ui/button";
import { Badge } from "@/components/core/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/core/ui/collapsible";
import {
    FileText, Download, Upload, Sparkles, Lightbulb, PenTool,
    Clock, CheckCircle, FileEdit,
    ChevronDown, ChevronUp, Settings, Send
} from "lucide-react";
import { FeatureFavoriteStar } from "@/components/core/ui/FeatureFavoriteStar";
import { PageHeader } from "@/components/core/layout/PageHeader";

// Import all Creation Studio components
import MultiContentGenerator from "@/app/social/creation-studio/_components/MultiContentGenerator";
import BrandVoiceProfile from "./_components/BrandVoiceProfile";

// Import External Services & Tools
import { RequestUGCService } from "@/components/marketing/RequestUGCService";
// SlideshowGenerator import removed

// KPI Data for the overview
const KPI_DATA = [
    { label: "Content Ideas", value: 12, icon: Lightbulb, color: "bg-[hsl(var(--accent-orange))]/10", iconColor: "text-[hsl(var(--accent-orange))]" },
    { label: "Drafts", value: 8, icon: FileEdit, color: "bg-[hsl(var(--accent-blue))]/10", iconColor: "text-[hsl(var(--accent-blue))]" },
    { label: "Scheduled", value: 15, icon: Clock, color: "bg-primary/10", iconColor: "text-primary" },
    { label: "Published Today", value: 6, icon: CheckCircle, color: "bg-[hsl(var(--accent-green))]/10", iconColor: "text-[hsl(var(--accent-green))]" },
];

// Active Queue Items (Moved from Analytics/Scheduler)
const QUEUE_ITEMS = [
    { id: 1, title: "New Product Announcement", platform: "Instagram", status: "Ready", date: "Now" },
    { id: 2, title: "Weekend Sale Promo", platform: "Facebook", status: "Draft", date: "Saved 2h ago" },
    { id: 3, title: "Customer Review Share", platform: "TikTok", status: "Scheduled", date: "Tomorrow 9:00 AM" },
    { id: 4, title: "Weekly Tips & Tricks", platform: "LinkedIn", status: "Scheduled", date: "Mon 10:00 AM" },
];


function CreativesContent() {
    const [isAuxiliaryOpen, setIsAuxiliaryOpen] = useState(false);
    const [isBrandVoiceOpen, setIsBrandVoiceOpen] = useState(false);

    return (
        <div className="space-y-8 p-6 pb-20 max-w-[1600px] mx-auto">
            {/* Header */}
            <PageHeader
                title="Creatives & Content"
                description="From idea to posting — Create, design, and publish across all platforms"
                icon={<Sparkles className="h-6 w-6 text-[hsl(var(--accent-blue))]" />}
                actions={<FeatureFavoriteStar featureId="creatives-content" size="lg" />}
            />

            {/* ============================================================================== */}
            {/* SECTION 1: ACTIVE QUEUE & OVERVIEW                                         */}
            {/* ============================================================================== */}
            <section className="space-y-4">
                {/* Combined KPI & Queue Grid (8 Cards Total) */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                    {/* 1.1 KPI Stats (First 4) */}
                    {KPI_DATA.map((kpi) => (
                        <Card key={kpi.label} className="cursor-pointer transition-all hover:border-primary/50 bg-card/50">
                            <CardContent className="p-2 flex items-center gap-2 h-full">
                                <div className={`p-1.5 rounded-md flex-shrink-0 ${kpi.color}`}>
                                    <kpi.icon className={`h-3.5 w-3.5 ${kpi.iconColor}`} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-muted-foreground leading-tight truncate">{kpi.label}</p>
                                    <p className="text-sm font-bold leading-tight">{kpi.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* 1.2 Queue Items (Next 4) */}
                    {QUEUE_ITEMS.map((item) => (
                        <Card key={item.id} className="cursor-pointer hover:shadow-md transition-all group border-l-2 border-l-green-500/50">
                            <CardContent className="p-2 flex items-center justify-between gap-1.5 h-full">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <div className={`p-1.5 rounded-md flex-shrink-0 ${item.status === "Ready" ? "bg-green-50 text-green-600 dark:bg-green-900/20" :
                                        item.status === "Scheduled" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" :
                                            "bg-gray-50 text-gray-500 dark:bg-gray-800/50"
                                        }`}>
                                        {item.status === "Ready" && <CheckCircle className="h-3.5 w-3.5" />}
                                        {item.status === "Scheduled" && <Clock className="h-3.5 w-3.5" />}
                                        {item.status === "Draft" && <FileText className="h-3.5 w-3.5" />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-[11px] leading-tight truncate">{item.title}</p>
                                        <div className="flex items-center gap-1 text-[9px] text-muted-foreground mt-0.5">
                                            <span className="font-medium px-1 py-0 bg-muted rounded-[2px]">{item.platform}</span>
                                            <span className="truncate">{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                                {item.status === "Ready" && (
                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-green-600 hover:text-green-700 hover:bg-green-50 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Send className="h-3 w-3" />
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>


            {/* ============================================================================== */}
            {/* SECTION 1B: UGC CREATOR SERVICE                                                */}
            {/* ============================================================================== */}
            <section className="space-y-4">
                <RequestUGCService />
            </section>


            {/* ============================================================================== */}
            {/* SECTION 2A: CONTENT CREATION                                                   */}
            {/* ============================================================================== */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                    <PenTool className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
                    <h2 className="text-xl font-bold">Content Creation</h2>
                </div>

                <Collapsible 
                    open={isBrandVoiceOpen} 
                    onOpenChange={setIsBrandVoiceOpen}
                    className="border rounded-xl bg-card overflow-hidden"
                >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span>Brand Voice & Style Settings</span>
                            {!isBrandVoiceOpen && <Badge variant="secondary" className="text-[10px] h-5">Customizable</Badge>}
                        </div>
                        {isBrandVoiceOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0 border-t bg-muted/10">
                        <div className="pt-4">
                             <BrandVoiceProfile />
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <MultiContentGenerator />
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
                                <Upload className="h-4 w-4" />
                                Import
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </section>

        </div>
    );
}

export default function CreativesPage() {
    return (
        <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">Loading Creatives & Content...</div>}>
            <CreativesContent />
        </Suspense>
    );
}
