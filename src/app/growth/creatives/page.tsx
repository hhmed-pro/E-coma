/**
 * Zone 2: Growth - Creative Studio Route
 * Route: /growth/creatives
 * Imports from: @/views/Growth/CreativeStudio
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { Palette, Users, Archive } from "lucide-react";

// Import relocated components
import DarjaOptimizer from "@/views/Growth/CreativeStudio/Production/DarjaOptimizer";
import { ContentKanban } from "@/views/Growth/CreativeStudio/Production/ContentKanban";
import { RequestUGCService } from "@/views/Growth/CreativeStudio/Influencers/RequestUGCService";
import { UGCServiceBanner } from "@/views/Growth/CreativeStudio/Influencers/UGCServiceBanner";
import { InfluenceursUGCTab } from "@/views/Growth/CreativeStudio/Influencers/InfluenceursUGCTab";

export default function CreativeStudioPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Palette className="h-6 w-6 text-purple-500" />
                    </div>
                    ستوديو الإبداع (Creative Studio)
                </h1>
                <p className="text-muted-foreground mt-1">
                    Create content that sells - Darja converts better than Fusha!
                </p>
            </div>

            {/* Tabs: Production | Influencers | Legacy */}
            <Tabs defaultValue="production" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="production" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Production
                    </TabsTrigger>
                    <TabsTrigger value="influencers" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Influencers
                    </TabsTrigger>
                    <TabsTrigger value="legacy" className="flex items-center gap-2">
                        <Archive className="h-4 w-4" />
                        Legacy
                    </TabsTrigger>
                </TabsList>

                {/* Production Tab */}
                <TabsContent value="production" className="space-y-6">
                    <DarjaOptimizer />
                    <ContentKanban />
                </TabsContent>

                {/* Influencers Tab */}
                <TabsContent value="influencers" className="space-y-6">
                    <UGCServiceBanner />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RequestUGCService />
                        <InfluenceursUGCTab />
                    </div>
                </TabsContent>

                {/* Legacy Tools Tab (Buried) */}
                <TabsContent value="legacy" className="space-y-6">
                    <Card className="border-dashed border-muted-foreground/30">
                        <CardHeader>
                            <CardTitle className="text-muted-foreground flex items-center gap-2">
                                <Archive className="h-5 w-5" />
                                Legacy Tools (Deprioritized)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-4">
                                These tools are available but not recommended for the Algerian market:
                            </p>
                            <ul className="text-muted-foreground text-sm space-y-2">
                                <li>• <strong>Email Marketing</strong> - Low open rates in Algeria (use SMS/WhatsApp instead)</li>
                                <li>• <strong>Blog Post Writer</strong> - Algerian e-com is ad-driven, not SEO-driven</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
