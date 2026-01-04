"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { MapPin, Truck, Clock, TrendingUp, AlertCircle, CheckCircle2, Wifi } from "lucide-react";
import { Badge } from "@/components/core/ui/badge";
import { FeatureCluster } from "@/components/core/ui/FeatureCluster";
import { CarrierComparison } from "@/app/ecommerce/_components/inventory/CarrierComparison";
import { WilayaHeatmap, generateWilayaOrderData } from "@/app/ecommerce/_components/delivery/wilaya-heatmap";

// Mock data for regional revenue
const regionalRevenue = [
    { region: "Nord", revenue: "89,500 DA", percentage: 62, orders: 782 },
    { region: "Centre", revenue: "32,100 DA", percentage: 22, orders: 298 },
    { region: "Est", revenue: "15,200 DA", percentage: 10, orders: 112 },
    { region: "Sud", revenue: "8,430 DA", percentage: 6, orders: 55 },
];

// Carrier API Health (Coming Soon placeholder)
const carrierApiHealth = [
    { name: "Yalidine", status: "connected", latency: "45ms" },
    { name: "Maystro", status: "connected", latency: "62ms" },
    { name: "ZR-Express", status: "disconnected", latency: "-" },
];

export function LivraisonWilayasTab() {
    return (
        <div className="space-y-6">
            {/* Carrier Comparison - Full Width */}
            <CarrierComparison showFinancials={true} />

            {/* Geographic + Regional Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Wilaya Heatmap - 2/3 width */}
                <div className="lg:col-span-2">
                    <FeatureCluster
                        title="Carte des Wilayas"
                        icon={<MapPin className="h-5 w-5" />}
                        storageKey="analytics-wilaya-map"
                        defaultExpanded={true}
                        headerClassName="bg-[hsl(var(--accent-orange))]"
                    >
                        <Card className="border-0 shadow-none">
                            <CardContent className="p-0">
                                <WilayaHeatmap data={generateWilayaOrderData()} className="min-h-[400px]" />
                            </CardContent>
                        </Card>
                    </FeatureCluster>
                </div>

                {/* Regional Revenue Sidebar - 1/3 width */}
                <div className="space-y-4">
                    {/* Regional Revenue */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <TrendingUp className="h-4 w-4 text-[hsl(var(--accent-green))]" />
                                Revenus par Région
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {regionalRevenue.map((region) => (
                                <div key={region.region} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{region.region}</span>
                                        <span className="text-muted-foreground">{region.revenue}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[hsl(var(--accent-blue))] rounded-full transition-all"
                                                style={{ width: `${region.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground w-8">{region.percentage}%</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{region.orders} commandes</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Carrier API Health - Coming Soon */}
                    <Card className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/95 backdrop-blur-[1px] z-10 flex items-center justify-center">
                            <Badge variant="secondary" className="gap-1 text-xs">
                                <Clock className="h-3 w-3" />
                                Bientôt Disponible
                            </Badge>
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Wifi className="h-4 w-4 text-[hsl(var(--accent-purple))]" />
                                Santé API Transporteurs
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {carrierApiHealth.map((carrier) => (
                                <div key={carrier.name} className="flex items-center justify-between py-2 border-b last:border-0">
                                    <div className="flex items-center gap-2">
                                        {carrier.status === "connected" ? (
                                            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--accent-green))]" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 text-destructive" />
                                        )}
                                        <span className="text-sm font-medium">{carrier.name}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{carrier.latency}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Average Delivery Time - Coming Soon */}
                    <Card className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/95 backdrop-blur-[1px] z-10 flex items-center justify-center">
                            <Badge variant="secondary" className="gap-1 text-xs">
                                <Clock className="h-3 w-3" />
                                Bientôt Disponible
                            </Badge>
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Truck className="h-4 w-4 text-[hsl(var(--accent-orange))]" />
                                Délai Moyen Livraison
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">2.4 jours</div>
                            <p className="text-xs text-muted-foreground mt-1">Moyenne nationale</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
