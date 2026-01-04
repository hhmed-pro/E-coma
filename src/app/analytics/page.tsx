"use client";

import { useState, useEffect } from "react";
import { usePageActions } from "@/components/core/layout/PageActionsContext";
import {
    PieChart,
    LayoutDashboard,
    Truck,
    Calculator,
    FileText
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";

// Import Tab Components
import { VueEnsembleTab } from "./_components/tabs/VueEnsembleTab";
import { LivraisonWilayasTab } from "./_components/tabs/LivraisonWilayasTab";
import { FinanceRentabiliteTab } from "./_components/tabs/FinanceRentabiliteTab";
import { RapportsOutilsTab } from "./_components/tabs/RapportsOutilsTab";

// Tab Configuration
const analyticsHubTabs = [
    {
        id: "vue-ensemble",
        label: "Vue d'Ensemble",
        icon: LayoutDashboard,
        description: "Performance Globale & KPIs",
    },
    {
        id: "livraison-wilayas",
        label: "Livraison & Wilayas",
        icon: Truck,
        description: "Transporteurs & Cartographie",
    },
    {
        id: "finance-rentabilite",
        label: "Finance & Rentabilité",
        icon: Calculator,
        description: "Profits, Coûts & IFU",
    },
    {
        id: "rapports-outils",
        label: "Rapports & Outils",
        icon: FileText,
        description: "Exports & Intégrations",
    },
];

export default function AnalyticsPage() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("vue-ensemble");

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "trend", title: "Revenus en Hausse", description: "Les revenus ont augmenté de 12% ce mois - meilleure période de performance" },
            { id: "2", type: "timing", title: "Pic des Ventes", description: "Les mercredis génèrent 25% de commandes en plus que la moyenne" },
            { id: "3", type: "improvement", title: "Frais COD Élevés", description: "Envisagez des réductions pour paiement en ligne afin de réduire les frais COD" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto pb-20">
            {/* Hub Header */}
            <PageHeader
                title="Tableau de Bord"
                description="Centre de Performance & Statistiques"
                icon={<PieChart className="h-6 w-6 text-[hsl(var(--accent-blue))]" />}
            />

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
                    {analyticsHubTabs.map((tab) => (
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
                    <TabsContent value="vue-ensemble" className="mt-0">
                        <VueEnsembleTab />
                    </TabsContent>

                    <TabsContent value="livraison-wilayas" className="mt-0">
                        <LivraisonWilayasTab />
                    </TabsContent>

                    <TabsContent value="finance-rentabilite" className="mt-0">
                        <FinanceRentabiliteTab />
                    </TabsContent>

                    <TabsContent value="rapports-outils" className="mt-0">
                        <RapportsOutilsTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
