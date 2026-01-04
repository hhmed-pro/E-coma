"use client";

import { useState, useEffect, Suspense } from "react";
import {
    Sparkles,
    PenTool,
    Palette,
    Video
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { usePageActions } from "@/components/core/layout/PageActionsContext";

// Import Tab Components
import { CreationIATab } from "./_components/tabs/CreationIATab";
import { ModelesFluxTab } from "./_components/tabs/ModelesFluxTab";
import { MarqueConformiteTab } from "./_components/tabs/MarqueConformiteTab";
import { OutilsTikTokTab } from "./_components/tabs/OutilsTikTokTab";

// Tab Configuration
const creativesHubTabs = [
    {
        id: "creation-ia",
        label: "Création & IA",
        icon: Sparkles,
        description: "AI Copywriter & Hooks",
    },
    {
        id: "modeles-flux",
        label: "Modèles & Flux",
        icon: PenTool,
        description: "Templates & Pipeline",
    },
    {
        id: "marque-conformite",
        label: "Marque & Conformité",
        icon: Palette,
        description: "Brand Voice & Safety",
    },
    {
        id: "outils-tiktok",
        label: "Outils & TikTok",
        icon: Video,
        description: "Monétisation & Qualité",
    },
];

function CreativesContent() {
    const { setSuggestions } = usePageActions();
    const [activeTab, setActiveTab] = useState("creation-ia");

    useEffect(() => {
        setSuggestions([
            { id: "1", type: "timing", title: "Heure Optimale", description: "Publications 9-11h = +23% engagement en Algérie" },
            { id: "2", type: "trend", title: "Hashtag Tendance", description: "#AlgeriaVibes est trending - ajoutez-le" },
            { id: "3", type: "content", title: "Idée Contenu", description: "Les vidéos unboxing ont 4x plus d'engagement" }
        ]);
        return () => setSuggestions([]);
    }, [setSuggestions]);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto pb-20">
            {/* Hub Header */}
            <PageHeader
                title="Studio Créatif"
                description="Création de Contenu IA & Publishing"
                icon={<Sparkles className="h-6 w-6 text-[hsl(var(--accent-purple))]" />}
            />

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
                    {creativesHubTabs.map((tab) => (
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
                    <TabsContent value="creation-ia" className="mt-0">
                        <CreationIATab />
                    </TabsContent>

                    <TabsContent value="modeles-flux" className="mt-0">
                        <ModelesFluxTab />
                    </TabsContent>

                    <TabsContent value="marque-conformite" className="mt-0">
                        <MarqueConformiteTab />
                    </TabsContent>

                    <TabsContent value="outils-tiktok" className="mt-0">
                        <OutilsTikTokTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default function CreativesPage() {
    return (
        <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">Chargement Studio Créatif...</div>}>
            <CreativesContent />
        </Suspense>
    );
}
