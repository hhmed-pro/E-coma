"use client";

import { useState, useEffect, Suspense } from "react";
import {
    Megaphone,
    Target,
    Wallet,
    Globe,
    ShieldAlert
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { usePageActions } from "@/components/core/layout/PageActionsContext";

// Import Tab Components
import { CampagnesROASTab } from "./_components/tabs/CampagnesROASTab";
import { BudgetReglesTab } from "./_components/tabs/BudgetReglesTab";
import { TraficTunnelTab } from "./_components/tabs/TraficTunnelTab";
import { CompteRapportsTab } from "./_components/tabs/CompteRapportsTab";

// Tab Configuration
const adsHubTabs = [
    {
        id: "campagnes-roas",
        label: "Campagnes & ROAS",
        icon: Target,
        description: "Gestion & Performance",
    },
    {
        id: "budget-regles",
        label: "Budget & Règles",
        icon: Wallet,
        description: "Stop-Loss & Devises",
    },
    {
        id: "trafic-tunnel",
        label: "Trafic & Tunnel",
        icon: Globe,
        description: "Analytics & Conversions",
    },
    {
        id: "compte-rapports",
        label: "Compte & Rapports",
        icon: ShieldAlert,
        description: "Santé & Exports",
    },
];

function AdsContent() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("campagnes-roas");

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "trend", title: "Alerte ROAS", description: "Campagne 'Promo Été' a 3.2x ROAS - augmentez le budget" },
            { id: "2", type: "timing", title: "Heures de Pointe", description: "Vos pubs performent 35% mieux entre 18h-21h" },
            { id: "3", type: "improvement", title: "CTR Faible", description: "Flash Sale a un CTR bas. Essayez de nouvelles créas." }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto pb-20">
            {/* Hub Header */}
            <PageHeader
                title="Gestionnaire Pubs"
                description="Campagnes, ROAS & Performance Multi-Plateformes"
                icon={<Megaphone className="h-6 w-6 text-[hsl(var(--accent-blue))]" />}
            />

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
                    {adsHubTabs.map((tab) => (
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
                    <TabsContent value="campagnes-roas" className="mt-0">
                        <CampagnesROASTab />
                    </TabsContent>

                    <TabsContent value="budget-regles" className="mt-0">
                        <BudgetReglesTab />
                    </TabsContent>

                    <TabsContent value="trafic-tunnel" className="mt-0">
                        <TraficTunnelTab />
                    </TabsContent>

                    <TabsContent value="compte-rapports" className="mt-0">
                        <CompteRapportsTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default function AdsPage() {
    return (
        <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">Chargement Gestionnaire Pubs...</div>}>
            <AdsContent />
        </Suspense>
    );
}
