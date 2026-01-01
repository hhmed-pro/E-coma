"use client";

import { FeatureCollapsible } from "@/components/core/ui/feature-collapsible";
import { Button } from "@/components/core/ui/button";
import { Card, CardContent } from "@/components/core/ui/card";
import { ArrowRight, BarChart3, Box, LineChart, Megaphone, Palette, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function FeaturesDemoPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Feature Stack Demo</h1>
                <p className="text-xl text-muted-foreground">
                    Demonstrating the new SVG assets with the FeatureCollapsible component.
                </p>
            </div>

            <div className="space-y-4">
                {/* Sales */}
                <FeatureCollapsible
                    feature="sales"
                    title="Sales Dashboard"
                    description="Order processing, confirmation, and revenue tracking"
                    defaultOpen={true}
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4 text-primary" />
                                Key Metrics
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Revenue is up 12% this week. You have 15 pending orders.
                            </p>
                        </div>
                        <div className="flex items-center justify-end">
                            <Button asChild>
                                <Link href="/sales-dashboard">Go to Sales <ArrowRight className="ml-2 w-4 h-4" /></Link>
                            </Button>
                        </div>
                    </div>
                </FeatureCollapsible>

                {/* Stock */}
                <FeatureCollapsible
                    feature="stock"
                    title="Inventory Management"
                    description="Track stock levels across all warehouses"
                >
                    <div className="p-4 bg-background/80 rounded-lg border">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Box className="w-8 h-8 text-[hsl(var(--accent-green))]" />
                                <div>
                                    <p className="font-medium">Main Warehouse</p>
                                    <p className="text-xs text-muted-foreground">4,230 items in stock</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/stock">Manage Stock</Link>
                            </Button>
                        </div>
                    </div>
                </FeatureCollapsible>

                {/* Creatives */}
                <FeatureCollapsible
                    feature="creatives"
                    title="Creative Studio"
                    description="AI-powered content generation and design tools"
                >
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                <Palette className="w-6 h-6 text-muted-foreground/50" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button variant="secondary" asChild>
                            <Link href="/creatives">Open Studio</Link>
                        </Button>
                    </div>
                </FeatureCollapsible>

                {/* Ads */}
                <FeatureCollapsible
                    feature="ads"
                    title="Ad Campaigns"
                    description="Manage Meta and TikTok campaigns"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Active Campaigns: <strong>3</strong></span>
                        <Button size="sm" asChild>
                            <Link href="/ads">View Campaigns</Link>
                        </Button>
                    </div>
                </FeatureCollapsible>

                {/* Analytics */}
                <FeatureCollapsible
                    feature="analytics"
                    title="Analytics & Reports"
                    description="Deep dive into your business data"
                >
                    <div className="h-32 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                        <BarChart3 className="w-8 h-8 text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">Chart Placeholder</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button variant="outline" asChild>
                            <Link href="/analytics">View Reports</Link>
                        </Button>
                    </div>
                </FeatureCollapsible>

                {/* Marketing */}
                <FeatureCollapsible
                    feature="marketing"
                    title="Marketing Hub"
                    description="Influencer connections and automation bots"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="font-medium">Active Influencers</p>
                            <p className="text-xs text-muted-foreground">12 active contracts</p>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button asChild>
                            <Link href="/marketing">Go to Hub</Link>
                        </Button>
                    </div>
                </FeatureCollapsible>

                {/* Product Research */}
                <FeatureCollapsible
                    feature="product-research"
                    title="Product Research"
                    description="Discover winning products and suppliers"
                >
                    <div className="space-y-2">
                        <p className="text-sm">Latest Trend: <strong>Summer Essentials</strong></p>
                        <Button className="w-full" variant="secondary" asChild>
                            <Link href="/product-research">Start Researching</Link>
                        </Button>
                    </div>
                </FeatureCollapsible>

            </div>
        </div>
    );
}
