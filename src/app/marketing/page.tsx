"use client";

import { useState, useEffect, Suspense } from "react";
import {
    Users2,
    Store,
    Wallet,
    Share2,
    BarChart3
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { usePageActions } from "@/components/core/layout/PageActionsContext";

// Import Tab Components
import { InfluenceursUGCTab } from "./_components/tabs/InfluenceursUGCTab";
import { AffiliationTab } from "./_components/tabs/AffiliationTab";
import { PlateformesSocialTab } from "./_components/tabs/PlateformesSocialTab";
import { AnalysesConfigTab } from "./_components/tabs/AnalysesConfigTab";

// Tab Configuration
const marketingHubTabs = [
    {
        id: "influenceurs-ugc",
        label: "Influenceurs & UGC",
        icon: Store,
        description: "Marketplace & Tarifs",
    },
    {
        id: "affiliation",
        label: "Affiliation",
        icon: Wallet,
        description: "Affiliés & Commissions",
    },
    {
        id: "plateformes-social",
        label: "Plateformes & Social",
        icon: Share2,
        description: "Engagement & Bots",
    },
    {
        id: "analyses-config",
        label: "Analyses & Config",
        icon: BarChart3,
        description: "KPIs & Paramètres",
    },
];

function MarketingContent() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("influenceurs-ugc");

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "content", title: "Sujets Tendance", description: "Collection Été et Livraison sont trending" },
            { id: "2", type: "trend", title: "Engagement en Hausse", description: "+340 interactions aujourd'hui" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto pb-20">
            {/* Hub Header */}
            <PageHeader
                title="Partenariats & Croissance"
                description="Influenceurs, Affiliés & Automatisation Marketing"
                icon={<Users2 className="h-6 w-6 text-[hsl(var(--accent-orange))]" />}
            />

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
                    {marketingHubTabs.map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="flex flex-col items-center gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all"
                        >
                            <tab.icon className="h-5 w-5" />
                            <span className="text-sm font-medium hidden sm:block">{tab.label}</span>
                            <span className="text-xs text-muted-foreground hidden md:block">{tab.description}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Tab Contents */}
                <div className="mt-6">
                    <TabsContent value="influenceurs-ugc" className="mt-0">
                        <InfluenceursUGCTab />
                    </TabsContent>

                    <TabsContent value="affiliation" className="mt-0">
                        <AffiliationTab />
                    </TabsContent>

                    <TabsContent value="plateformes-social" className="mt-0">
                        <PlateformesSocialTab />
                    </TabsContent>

                    <TabsContent value="analyses-config" className="mt-0">
                        <AnalysesConfigTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default function MarketingPage() {
    return (
        <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">Chargement Partenariats & Croissance...</div>}>
            <MarketingContent />
        </Suspense>
    );
}
