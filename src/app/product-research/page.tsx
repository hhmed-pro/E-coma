"use client";

import { useState, useEffect, Suspense } from "react";
import {
    Search,
    TrendingUp,
    MapPin,
    Globe,
    Target
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { usePageActions } from "@/components/core/layout/PageActionsContext";

// Import Tab Components
import { RechercheTendancesTab } from "./_components/tabs/RechercheTendancesTab";
import { MarcheAlgerienTab } from "./_components/tabs/MarcheAlgerienTab";
import { FournisseursCoutsTab } from "./_components/tabs/FournisseursCoutsTab";
import { SocialValidationTab } from "./_components/tabs/SocialValidationTab";

// Tab Configuration
const productResearchHubTabs = [
    {
        id: "recherche-tendances",
        label: "Recherche & Tendances",
        icon: Search,
        description: "Découverte & Tracking",
    },
    {
        id: "marche-algerien",
        label: "Marché Algérien",
        icon: MapPin,
        description: "Tendances Locales",
    },
    {
        id: "fournisseurs-couts",
        label: "Fournisseurs & Coûts",
        icon: Globe,
        description: "Sourcing & Landed Cost",
    },
    {
        id: "social-validation",
        label: "Social & Validation",
        icon: Target,
        description: "Concurrents & Signaux",
    },
];

function ProductResearchContent() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("recherche-tendances");

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "trend", title: "Produit Tendance", description: "Écouteurs Sans Fil +30% cette semaine en Algérie" },
            { id: "2", type: "content", title: "Niche Opportunité", description: "Produits organisation maison = faible concurrence" },
            { id: "3", type: "improvement", title: "Alerte Prix", description: "Concurrent a baissé les prix sur 3 articles suivis" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto pb-20">
            {/* Hub Header */}
            <PageHeader
                title="Découverte Produits"
                description="Recherche Produits Gagnants avec Analyse IA"
                icon={<Search className="h-6 w-6 text-[hsl(var(--accent-purple))]" />}
            />

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
                    {productResearchHubTabs.map((tab) => (
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
                    <TabsContent value="recherche-tendances" className="mt-0">
                        <RechercheTendancesTab />
                    </TabsContent>

                    <TabsContent value="marche-algerien" className="mt-0">
                        <MarcheAlgerienTab />
                    </TabsContent>

                    <TabsContent value="fournisseurs-couts" className="mt-0">
                        <FournisseursCoutsTab />
                    </TabsContent>

                    <TabsContent value="social-validation" className="mt-0">
                        <SocialValidationTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default function ProductResearchPage() {
    return (
        <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">Chargement Découverte Produits...</div>}>
            <ProductResearchContent />
        </Suspense>
    );
}
