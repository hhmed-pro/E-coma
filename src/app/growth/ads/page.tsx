/**
 * Zone 2: Growth - Ads Manager Route
 * Route: /growth/ads
 * Imports from: @/views/Growth/AdsManager
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { Target, BarChart3, TrendingUp } from "lucide-react";

// Import relocated components
import Campaigns from "@/views/Growth/AdsManager/Campaigns/Campaigns";
import DeliveryRateKPI from "@/views/Growth/AdsManager/Campaigns/DeliveryRateKPI";

export default function AdsManagerPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                        <Target className="h-6 w-6 text-green-500" />
                    </div>
                    مدير الإعلانات (Ads Manager)
                </h1>
                <p className="text-muted-foreground mt-1">
                    Focus on Delivery Rate, not just clicks - The real Algerian KPI
                </p>
            </div>

            {/* Tabs: Campaigns | Analytics */}
            <Tabs defaultValue="campaigns" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="campaigns" className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Campaigns
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Analytics
                    </TabsTrigger>
                </TabsList>

                {/* Campaigns Tab */}
                <TabsContent value="campaigns" className="space-y-6">
                    {/* Delivery Rate KPI - The Algerian Success Metric */}
                    <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <CardContent className="py-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm">🎯 The REAL Algerian KPI</p>
                                    <h2 className="text-3xl font-bold">Delivery Rate: 68%</h2>
                                    <p className="text-green-200 text-sm mt-1">
                                        Not clicks, not impressions - Only delivered orders matter
                                    </p>
                                </div>
                                <TrendingUp className="h-16 w-16 text-green-200/50" />
                            </div>
                        </CardContent>
                    </Card>
                    <DeliveryRateKPI />
                    <Campaigns />
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Traffic sources, conversion funnel, and offline conversion sync coming soon...
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
