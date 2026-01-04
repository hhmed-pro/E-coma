"use client";

import { useState, useEffect } from "react";
import {
    Package,
    Box,
    AlertTriangle,
    MapPin,
    Globe
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { usePageActions } from "@/components/core/layout/PageActionsContext";

// Import Tab Components
import { EtatStockTab } from "./_components/tabs/EtatStockTab";
import { AlertesMouvementsTab } from "./_components/tabs/AlertesMouvementsTab";
import { SitesRetoursTab } from "./_components/tabs/SitesRetoursTab";
import { FournisseursImportTab } from "./_components/tabs/FournisseursImportTab";

// Tab Configuration
const stockHubTabs = [
    {
        id: "etat-stock",
        label: "État du Stock",
        icon: Box,
        description: "Inventaire & Vue Globale",
    },
    {
        id: "alertes-mouvements",
        label: "Alertes & Mouvements",
        icon: AlertTriangle,
        description: "Réapprovisionnement & Historique",
    },
    {
        id: "sites-retours",
        label: "Sites & Retours",
        icon: MapPin,
        description: "Emplacements & Suivi Retours",
    },
    {
        id: "fournisseurs-import",
        label: "Fournisseurs & Import",
        icon: Globe,
        description: "Sourcing & Douane",
    },
];

export default function StockPage() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("etat-stock");

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "trend", title: "Alerte Stock", description: "3 produits sous le seuil de réapprovisionnement" },
            { id: "2", type: "timing", title: "Timing Réappro", description: "Réapprovisionnez les Écouteurs avant le weekend" },
            { id: "3", type: "improvement", title: "Stock Lent", description: "Envisagez des promotions sur 2 articles à faible rotation" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto pb-20">
            {/* Hub Header */}
            <PageHeader
                title="Entrepôt"
                description="Gestion des Stocks, Fournisseurs & Import"
                icon={<Package className="h-6 w-6 text-[hsl(var(--accent-green))]" />}
            />

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
                    {stockHubTabs.map((tab) => (
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
                    <TabsContent value="etat-stock" className="mt-0">
                        <EtatStockTab />
                    </TabsContent>

                    <TabsContent value="alertes-mouvements" className="mt-0">
                        <AlertesMouvementsTab />
                    </TabsContent>

                    <TabsContent value="sites-retours" className="mt-0">
                        <SitesRetoursTab />
                    </TabsContent>

                    <TabsContent value="fournisseurs-import" className="mt-0">
                        <FournisseursImportTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
