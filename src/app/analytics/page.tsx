"use client";

import { useState, useEffect } from "react";
import { usePageActions } from "@/components/core/layout/PageActionsContext";
import { PieChart } from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent } from "@/components/core/ui/tabs";

// Import Tab Components
import { VueEnsembleTab } from "./_components/tabs/VueEnsembleTab";
import { LivraisonWilayasTab } from "./_components/tabs/LivraisonWilayasTab";
import { FinanceRentabiliteTab } from "./_components/tabs/FinanceRentabiliteTab";
import { RapportsOutilsTab } from "./_components/tabs/RapportsOutilsTab";

export default function AnalyticsPage() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("vue-ensemble");

    // Listen for tab changes from Ecosystem Bar
    useEffect(() => {
        const handleTabChange = (e: CustomEvent<{ tabId: string; pathname: string }>) => {
            if (e.detail.pathname === '/analytics') {
                setActiveTab(e.detail.tabId);
            }
        };
        window.addEventListener('page-tab-change', handleTabChange as EventListener);
        return () => window.removeEventListener('page-tab-change', handleTabChange as EventListener);
    }, []);

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

            {/* Tab Contents - Navigation handled by Ecosystem Bar */}
            <Tabs value={activeTab} className="w-full">
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
            </Tabs>
        </div>
    );
}

