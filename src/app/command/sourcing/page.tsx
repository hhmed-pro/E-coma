/**
 * Zone 3: Command - Sourcing Route
 * Route: /command/sourcing
 * Imports from: @/views/Command/Sourcing
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { Package, Search, Users } from "lucide-react";

// Import relocated components
import SupplierDatabase from "@/views/Command/Sourcing/Suppliers/SupplierDatabase";

export default function SourcingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Package className="h-6 w-6 text-orange-500" />
                    </div>
                    المصادر (Sourcing)
                </h1>
                <p className="text-muted-foreground mt-1">
                    Find winning products and reliable suppliers - Local (El-Eulma/Hamiz) & China
                </p>
            </div>

            {/* Tabs: Research | Suppliers */}
            <Tabs defaultValue="research" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="research" className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Research
                    </TabsTrigger>
                    <TabsTrigger value="suppliers" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Suppliers
                    </TabsTrigger>
                </TabsList>

                {/* Research Tab */}
                <TabsContent value="research" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Research Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                    <h3 className="font-semibold mb-2">🔥 Trending Ads DZ</h3>
                                    <p className="text-sm text-muted-foreground">
                                        See what's selling now in Algeria
                                    </p>
                                </div>
                                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                    <h3 className="font-semibold mb-2">🤖 AI Winning Score</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Predict product success rate
                                    </p>
                                </div>
                                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                    <h3 className="font-semibold mb-2">📊 Market Analysis</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Competition and pricing insights
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Suppliers Tab */}
                <TabsContent value="suppliers" className="space-y-6">
                    <SupplierDatabase />
                </TabsContent>
            </Tabs>
        </div>
    );
}
