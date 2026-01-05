"use client";

import { useState, useEffect, Suspense } from "react";
import { Users2 } from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent } from "@/components/core/ui/tabs";
import { usePageActions } from "@/components/core/layout/PageActionsContext";

// Import Tab Components
import { InfluenceursUGCTab } from "./_components/tabs/InfluenceursUGCTab";
import { AffiliationTab } from "./_components/tabs/AffiliationTab";
import { PlateformesSocialTab } from "./_components/tabs/PlateformesSocialTab";
import { AnalysesConfigTab } from "./_components/tabs/AnalysesConfigTab";

function MarketingContent() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("influenceurs-ugc");

    // Listen for tab changes from Ecosystem Bar
    useEffect(() => {
        const handleTabChange = (e: CustomEvent<{ tabId: string; pathname: string }>) => {
            if (e.detail.pathname === '/marketing') {
                setActiveTab(e.detail.tabId);
            }
        };
        window.addEventListener('page-tab-change', handleTabChange as EventListener);
        return () => window.removeEventListener('page-tab-change', handleTabChange as EventListener);
    }, []);

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

            {/* Tab Contents - Navigation handled by Ecosystem Bar */}
            <Tabs value={activeTab} className="w-full">
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
