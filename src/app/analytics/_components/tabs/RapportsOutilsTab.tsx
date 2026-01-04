"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import {
    FileText,
    Download,
    Upload,
    RefreshCw,
    Database,
    Clock,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Calendar,
    Mail,
    Settings
} from "lucide-react";
import { Button } from "@/components/core/ui/button";
import { Badge } from "@/components/core/ui/badge";
import { ExportBuilderModal, IntegrationModal } from "@/components/core/ui/modals";
import PlatformGuides from "../PlatformGuides";
import { FeatureCluster } from "@/components/core/ui/FeatureCluster";

// Integration statuses
const integrations = [
    { name: "Google Analytics 4", status: "connected", icon: "📊", lastSync: "Il y a 5 min" },
    { name: "Meta Pixel", status: "connected", icon: "📘", lastSync: "Il y a 2 min" },
    { name: "TikTok Pixel", status: "disconnected", icon: "🎵", lastSync: "-" },
    { name: "Shopify", status: "pending", icon: "🛒", lastSync: "En attente..." },
];

// Report types
const reportTypes = [
    { id: "daily", name: "Rapport Quotidien", format: "PDF", schedule: "Tous les jours à 8h" },
    { id: "weekly", name: "Rapport Hebdomadaire", format: "Excel", schedule: "Lundi à 9h" },
    { id: "monthly", name: "Rapport Mensuel", format: "PDF", schedule: "1er du mois" },
];

export function RapportsOutilsTab() {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showIntegrationModal, setShowIntegrationModal] = useState(false);
    const [selectedIntegration, setSelectedIntegration] = useState("");

    const handleIntegrationClick = (name: string) => {
        setSelectedIntegration(name);
        setShowIntegrationModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={() => setShowExportModal(true)}
                >
                    <FileText className="h-6 w-6 text-[hsl(var(--accent-blue))]" />
                    <span>Générer Rapport</span>
                </Button>
                <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={() => setShowExportModal(true)}
                >
                    <Download className="h-6 w-6 text-[hsl(var(--accent-green))]" />
                    <span>Exporter Données</span>
                </Button>
                <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                >
                    <Upload className="h-6 w-6 text-[hsl(var(--accent-purple))]" />
                    <span>Importer Données</span>
                </Button>
                <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                >
                    <RefreshCw className="h-6 w-6 text-[hsl(var(--accent-orange))]" />
                    <span>Actualiser</span>
                </Button>
            </div>

            {/* Integrations + Scheduled Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Data Integrations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5 text-[hsl(var(--accent-purple))]" />
                            Intégrations Données
                        </CardTitle>
                        <CardDescription>Statut des connexions et dernière synchronisation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {integrations.map((integration) => (
                            <div
                                key={integration.name}
                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                                onClick={() => handleIntegrationClick(integration.name)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{integration.icon}</span>
                                    <div>
                                        <p className="font-medium">{integration.name}</p>
                                        <p className="text-xs text-muted-foreground">{integration.lastSync}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {integration.status === "connected" && (
                                        <Badge variant="outline" className="gap-1 text-[hsl(var(--accent-green))] border-[hsl(var(--accent-green))]/30 bg-[hsl(var(--accent-green))]/10">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Connecté
                                        </Badge>
                                    )}
                                    {integration.status === "disconnected" && (
                                        <Badge variant="outline" className="gap-1 text-destructive border-destructive/30 bg-destructive/10">
                                            <XCircle className="h-3 w-3" />
                                            Déconnecté
                                        </Badge>
                                    )}
                                    {integration.status === "pending" && (
                                        <Badge variant="outline" className="gap-1 text-[hsl(var(--accent-orange))] border-[hsl(var(--accent-orange))]/30 bg-[hsl(var(--accent-orange))]/10">
                                            <AlertCircle className="h-3 w-3" />
                                            En attente
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full mt-2 gap-2">
                            <Database className="h-4 w-4" />
                            Ajouter une intégration
                        </Button>
                    </CardContent>
                </Card>

                {/* Scheduled Reports - Coming Soon */}
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/95 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <Badge variant="secondary" className="gap-1 text-xs">
                            <Clock className="h-3 w-3" />
                            Bientôt Disponible
                        </Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
                            Rapports Programmés
                        </CardTitle>
                        <CardDescription>Automatisez l'envoi de vos rapports</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {reportTypes.map((report) => (
                            <div
                                key={report.id}
                                className="flex items-center justify-between p-3 rounded-lg border"
                            >
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">{report.name}</p>
                                        <p className="text-xs text-muted-foreground">{report.schedule}</p>
                                    </div>
                                </div>
                                <Badge variant="secondary">{report.format}</Badge>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full mt-2 gap-2">
                            <Settings className="h-4 w-4" />
                            Configurer automatisation
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Platform Guides */}
            <FeatureCluster
                title="Guides & Tutoriels"
                icon={<FileText className="h-5 w-5" />}
                storageKey="analytics-platform-guides"
                defaultExpanded={false}
                headerClassName="bg-[hsl(var(--accent-purple))]"
            >
                <PlatformGuides />
            </FeatureCluster>

            {/* Modals */}
            <ExportBuilderModal
                open={showExportModal}
                onOpenChange={setShowExportModal}
                title="Générer Rapport Analytique"
                description="Sélectionnez les données à inclure dans votre rapport."
                columns={[
                    { id: "revenue", label: "Revenus Total" },
                    { id: "orders", label: "Total Commandes" },
                    { id: "aov", label: "Panier Moyen" },
                    { id: "profit", label: "Bénéfice Net" },
                    { id: "geo_distribution", label: "Distribution Géographique" },
                    { id: "delivery_performance", label: "Performance Livraison" },
                ]}
                onExport={async (config) => {
                    console.log("Exporting with config:", config);
                }}
            />

            <IntegrationModal
                open={showIntegrationModal}
                onOpenChange={setShowIntegrationModal}
                serviceName={selectedIntegration}
                status="disconnected"
            />
        </div>
    );
}
