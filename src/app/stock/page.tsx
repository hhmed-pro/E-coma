"use client";

import { Button } from "@/components/core/ui/button";
import { Badge } from "@/components/core/ui/badge";
import {
    Download, Package, Truck,
    Box, AlertTriangle, TrendingDown, TrendingUp,
    ShoppingBag, Network, Globe,
    Tag, Upload, Plus
} from "lucide-react";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { FeatureCluster } from "@/components/core/ui/FeatureCluster";
import { FeatureClusterGroup } from "@/components/core/ui/FeatureClusterGroup";

import { FeatureFavoriteStar } from "@/components/core/ui/FeatureFavoriteStar";

// ✅ RESTRUCTURE: Import Stock Components 
import { Product } from "@/components/store/inventory/ProductCard";
import { InventorySplitView } from "@/components/store/inventory/InventorySplitView";
import InventoryAiScore from "@/components/store/inventory/InventoryAiScore";
import { OffersModule } from "@/components/store/inventory/OffersModule";

import { CarrierStockSync } from "@/components/store/inventory/CarrierStockSync";
import { ImportBudgetTracker } from "@/components/store/inventory/ImportBudgetTracker";

import SupplierDatabase from "@/components/shared/research/SupplierDatabase";
import { ChinaImportService } from "@/components/store/inventory/ChinaImportService";
import { QuickActionsBar } from "@/components/core/layout/QuickActionsBar";

// ✅ RESTRUCTURE: Mock Products for Sales Metrics (P1 - moved to Section 1)
const PRODUCTS_SALES_DATA = [
    { id: "p1", name: "Wireless Earbuds Pro", sales: 450, revenue: 5625000, trend: "+12%" },
    { id: "p2", name: "Smart Watch Series 5", sales: 230, revenue: 8050000, trend: "+8%" },
    { id: "p3", name: "Laptop Stand Aluminum", sales: 85, revenue: 382500, trend: "+5%" },
    { id: "p4", name: "USB-C Hub 7-in-1", sales: 120, revenue: 780000, trend: "+15%" },
    { id: "p5", name: "Mechanical Keyboard", sales: 65, revenue: 1170000, trend: "+3%" },
];

// Mock Products for Offers Module
const PRODUCTS_FOR_OFFERS = [
    { id: "p1", name: "Wireless Earbuds Pro" },
    { id: "p2", name: "Smart Watch Series 5" },
    { id: "p3", name: "Laptop Stand Aluminum" },
    { id: "p4", name: "USB-C Hub 7-in-1" },
    { id: "p5", name: "Mechanical Keyboard" },
];

// ✅ Return Rate Analysis Data (merged from /analytics)
const PRODUCT_RETURN_RATES = [
    { name: "Bluetooth Speaker Mini", sold: 120, returned: 18, returnRate: 15.0, reason: "Quality Issues" },
    { name: "Wireless Mouse Pro", sold: 85, returned: 10, returnRate: 11.8, reason: "Not as Described" },
    { name: "Phone Case Clear", sold: 320, returned: 22, returnRate: 6.9, reason: "Size Mismatch" },
    { name: "LED Desk Lamp", sold: 95, returned: 5, returnRate: 5.3, reason: "Defective" },
    { name: "USB Cable 3-Pack", sold: 450, returned: 12, returnRate: 2.7, reason: "Damaged in Transit" },
];

// ✅ RESTRUCTURE: Mock Products Data for Stock Overview
const products: Product[] = [
    {
        id: "p1",
        name: "Wireless Earbuds Pro",
        sku: "WE-001",
        price: 12500,
        stock: 85,
        localStock: 45,
        carrierStock: { 'yalidine': 25, 'zr-express': 15 },
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
        variants: [{ id: "v1", name: "Black" }, { id: "v2", name: "White" }],
        status: 'active',
        sales: 450,
        activeOffers: [
            { id: "o1", name: "Summer Sale", discount: "20%", endDate: "2024-08-31" }
        ],
        activeLPs: [
            { id: "lp1", name: "Tech Enthusiasts Landing", url: "/lp/tech-promo", conversionRate: "4.5%" }
        ]
    },
    {
        id: "p2",
        name: "Smart Watch Series 5",
        sku: "SW-005",
        price: 35000,
        stock: 90,
        localStock: 12,
        carrierStock: { 'yalidine': 48, 'maystro': 30 },
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
        variants: [{ id: "v3", name: "44mm" }, { id: "v4", name: "40mm" }],
        status: 'active',
        sales: 230,
        activeOffers: [
            { id: "o2", name: "Bundle Deal", discount: "15%", endDate: "2024-07-15" }
        ],
        activeLPs: []
    },
    {
        id: "p3",
        name: "Laptop Stand Aluminum",
        sku: "LS-ALU",
        price: 4500,
        stock: 8,
        localStock: 3,
        carrierStock: { 'maystro': 5 },
        image: "https://images.unsplash.com/photo-1616353071588-708dcff912e2?w=400&q=80",
        variants: [],
        status: 'active',
        sales: 85
    },
    {
        id: "p4",
        name: "Mechanical Keyboard",
        sku: "MK-RGB",
        price: 18000,
        stock: 8,
        localStock: 8,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80",
        variants: [{ id: "v5", name: "Blue Switch" }, { id: "v6", name: "Red Switch" }],
        status: 'draft',
        sales: 0
    },
    {
        id: "p5",
        name: "USB-C Hub 7-in-1",
        sku: "HUB-007",
        price: 6500,
        stock: 158,
        localStock: 150,
        carrierStock: { 'yalidine': 8 },
        image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80",
        variants: [],
        status: 'active',
        sales: 120
    }
];

// Mock Stock Movements
const stockMovements = [
    { id: "m1", createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), product: products[0], type: "in" as const, quantity: 50, reason: "Supplier purchase", user: { name: "Admin", initials: "AD" } },
    { id: "m2", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), product: products[1], type: "out" as const, quantity: 2, reason: "Sale", user: { name: "System", initials: "SY" } },
];

export default function StockPage() {
    // ✅ RESTRUCTURE: Removed tab state - using vertical sections instead

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* ═══════════════════════════════════════════════════════════════════
                SECTION 1: OVERVIEW (P1 - Always Visible)
                ✅ RESTRUCTURE: Moved from tabs to top vertical section
            ════════════════════════════════════════════════════════════════════ */}
            <section className="space-y-6">
                {/* Header */}
                <PageHeader
                    title="Stock Management"
                    description="Manage inventory, track stock levels, and handle suppliers"
                    icon={<Package className="h-6 w-6 text-[hsl(var(--accent-blue))]" />}
                    actions={
                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="gap-2 hidden sm:flex">
                                <Upload className="h-4 w-4" />
                                Import
                            </Button>
                            <Button variant="outline" className="gap-2 hidden sm:flex">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Product
                            </Button>
                            <FeatureFavoriteStar featureId="stock-management" size="lg" />
                        </div>
                    }
                />

                {/* Quick Actions Bar */}
                <QuickActionsBar
                    primaryAction={{
                        label: "Add Product",
                        icon: Plus,
                        onClick: () => console.log("Add product")
                    }}
                    actions={[
                        {
                            id: "sync-carriers",
                            label: "Sync Carriers",
                            icon: Truck,
                            onClick: () => console.log("Sync carriers"),
                            hoverColor: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/20"
                        },
                        {
                            id: "import-stock",
                            label: "Import",
                            icon: Upload,
                            onClick: () => console.log("Import stock"),
                            hoverColor: "hover:bg-green-50 hover:text-green-600 hover:border-green-200 dark:hover:bg-green-900/20"
                        }
                    ]}
                    moreActions={[
                        {
                            id: "export-stock",
                            label: "Export Stock",
                            icon: Download,
                            onClick: () => console.log("Export stock"),
                            iconColor: "text-purple-500"
                        },
                        {
                            id: "low-stock-alerts",
                            label: "Low Stock Alerts",
                            icon: AlertTriangle,
                            onClick: () => console.log("Low stock alerts"),
                            iconColor: "text-orange-500"
                        }
                    ]}
                />

                {/* ✅ RESTRUCTURE: AI Inventory Score with merged Top Sellers, Low Stock Alerts, Return Rates & Recent Movements */}
                <InventoryAiScore
                    products={products}
                    topProducts={PRODUCTS_SALES_DATA}
                    movements={stockMovements}
                    returnRates={PRODUCT_RETURN_RATES}
                    lowStockThreshold={10}
                />
            </section>

            <div className="border-t border-border/50 my-2" />

            {/* ═══════════════════════════════════════════════════════════════════
                SECTION 2: MAIN WORKSPACE - PRODUCT OPERATIONS (P1)
                ✅ RESTRUCTURE: Full width split view for product CRUD
            ════════════════════════════════════════════════════════════════════ */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
                    <h2 className="text-lg font-semibold">Product Operations</h2>
                </div>
                <InventorySplitView products={products} />
            </section>

            <div className="border-t border-border/50 my-2" />

            {/* ═══════════════════════════════════════════════════════════════════
                SECTION 2B & 2C: DELIVERY & SOURCING (Smart Expand Group)
            ════════════════════════════════════════════════════════════════════ */}
            <FeatureClusterGroup>
                <FeatureCluster
                    title="Delivery & Carriers"
                    icon={<Truck className="h-5 w-5" />}
                    storageKey="stock-carriers"
                    defaultExpanded={true}
                    headerClassName="bg-[hsl(var(--accent-blue))]"
                >
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                            {/* Left: Carrier Stock Sync (100%) */}
                            <div className="xl:col-span-5">
                                <CarrierStockSync />
                            </div>
                        </div>
                    </div>
                </FeatureCluster>

                <FeatureCluster
                    title="Sourcing & Compliance"
                    icon={<Globe className="h-5 w-5" />}
                    storageKey="stock-sourcing"
                    defaultExpanded={false}
                    headerClassName="bg-[hsl(var(--accent-green))]"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Suppliers (66%) */}
                        <div className="lg:col-span-2 space-y-6">
                            <SupplierDatabase />
                            <ChinaImportService />
                        </div>

                        {/* Right Column: Compliance Tools */}
                        <div className="lg:col-span-1 space-y-6">
                            <ImportBudgetTracker />
                        </div>
                    </div>
                </FeatureCluster>

                <FeatureCluster
                    title="Offers & Promotions"
                    icon={<Tag className="h-5 w-5" />}
                    storageKey="stock-offers"
                    defaultExpanded={false}
                    headerClassName="bg-[hsl(var(--accent-orange))]"
                >
                    <div className="max-w-4xl">
                        <OffersModule products={PRODUCTS_FOR_OFFERS} />
                    </div>
                </FeatureCluster>
            </FeatureClusterGroup>

        </div>
    );
}
