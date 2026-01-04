'use client';

import { useState, useEffect } from 'react';
import {
    BarChart,
    Package,
    ShieldAlert,
    TrendingUp,
    Bot
} from 'lucide-react';
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { usePageActions } from "@/components/core/layout/PageActionsContext";

// Import Tab Components
import { TraitementCommandesTab } from "./_components/tabs/TraitementCommandesTab";
import { RisqueClientsTab } from "./_components/tabs/RisqueClientsTab";
import { PerformanceSourcesTab } from "./_components/tabs/PerformanceSourcesTab";
import { CommsAutomatisationsTab } from "./_components/tabs/CommsAutomatisationsTab";

// Tab Configuration
const salesDashboardTabs = [
    {
        id: "traitement-commandes",
        label: "Traitement Commandes",
        icon: Package,
        description: "Validation, Appels & Suivi",
    },
    {
        id: "risque-clients",
        label: "Risque & Clients",
        icon: ShieldAlert,
        description: "Scoring, Blacklist & Historique",
    },
    {
        id: "performance-sources",
        label: "Performance Sources",
        icon: TrendingUp,
        description: "Canaux, ROAS & Conversions",
    },
    {
        id: "comms-automatisations",
        label: "Comms & Automatisations",
        icon: Bot,
        description: "SMS, WhatsApp & Bots",
    },
];

export default function SalesDashboardPage() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("traitement-commandes");

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "trend", title: "Taux de Retour Élevé", description: "Vérifiez la qualité des 3 produits les plus retournés" },
            { id: "2", type: "timing", title: "Heures de Pointe", description: "La plupart des commandes confirmées entre 14h-17h" },
            { id: "3", type: "improvement", title: "Bot GPS", description: "Activez le bot GPS pour améliorer les livraisons" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto pb-20">
            {/* Hub Header */}
            <PageHeader
                title="Centre de Confirmation"
                description="Gestion des Commandes & Clients"
                icon={<BarChart className="h-6 w-6 text-[hsl(var(--accent-green))]" />}
            />

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
                    {salesDashboardTabs.map((tab) => (
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
                    <TabsContent value="traitement-commandes" className="mt-0">
                        <TraitementCommandesTab />
                    </TabsContent>

                    <TabsContent value="risque-clients" className="mt-0">
                        <RisqueClientsTab />
                    </TabsContent>

                    <TabsContent value="performance-sources" className="mt-0">
                        <PerformanceSourcesTab />
                    </TabsContent>

                    <TabsContent value="comms-automatisations" className="mt-0">
                        <CommsAutomatisationsTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
