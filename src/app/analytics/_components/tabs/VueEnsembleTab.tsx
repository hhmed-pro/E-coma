"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import {
    DollarSign,
    PiggyBank,
    ShoppingBag,
    Wallet,
    TrendingUp,
    BarChart,
    Download
} from "lucide-react";
import { Button } from "@/components/core/ui/button";
import { DateRangePicker } from "@/components/core/ui/date-range-picker";
import { FeatureCluster } from "@/components/core/ui/FeatureCluster";
import { PaymentMethodAnalytics } from "../PaymentMethodAnalytics";
import { IFUCalculator } from "../IFUCalculator";
import { CreatorEarnings } from "../CreatorEarnings";
import { RevenueProfitChart } from "../RevenueProfitChart";
import { OrdersChart } from "../OrdersChart";

// Business KPIs data
const businessKpis = {
    totalRevenue: "145,230 DA",
    revenueChange: "+12%",
    codFees: "12,450 DA",
    netProfit: "42,150 DA",
    profitChange: "+8%",
    totalOrders: "1,247",
    ordersChange: "+15%",
    avgOrderValue: "8,450 DA",
    aovChange: "-3%"
};

export function VueEnsembleTab() {
    return (
        <div className="space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-[hsl(var(--accent-green))]/10">
                                <DollarSign className="h-4 w-4 text-[hsl(var(--accent-green))]" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">Revenus Total</span>
                        </div>
                        <div className="text-2xl font-bold">{businessKpis.totalRevenue}</div>
                        <span className="text-xs text-[hsl(var(--accent-green))]">
                            {businessKpis.revenueChange} ce mois
                        </span>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-[hsl(var(--accent-blue))]/10">
                                <PiggyBank className="h-4 w-4 text-[hsl(var(--accent-blue))]" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">Bénéfice Net</span>
                        </div>
                        <div className="text-2xl font-bold">{businessKpis.netProfit}</div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[hsl(var(--accent-green))]">{businessKpis.profitChange}</span>
                            <span className="text-xs text-destructive">-{businessKpis.codFees} COD</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <ShoppingBag className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">Total Commandes</span>
                        </div>
                        <div className="text-2xl font-bold">{businessKpis.totalOrders}</div>
                        <span className="text-xs text-[hsl(var(--accent-green))]">
                            {businessKpis.ordersChange} ce mois
                        </span>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-[hsl(var(--accent-orange))]/10">
                                <Wallet className="h-4 w-4 text-[hsl(var(--accent-orange))]" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">Panier Moyen</span>
                        </div>
                        <div className="text-2xl font-bold">{businessKpis.avgOrderValue}</div>
                        <span className="text-xs text-destructive">
                            {businessKpis.aovChange} ce mois
                        </span>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue & Earnings Section */}
            <FeatureCluster
                title="Revenus & Gains"
                icon={<TrendingUp className="h-5 w-5" />}
                storageKey="analytics-revenue-earnings"
                defaultExpanded={true}
                headerClassName="bg-[hsl(var(--accent-green))]"
                actions={
                    <div className="flex items-center gap-2">
                        <DateRangePicker />
                        <Button size="sm" variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 text-white border-0">
                            <Download className="h-4 w-4" />
                            Exporter
                        </Button>
                    </div>
                }
            >
                <div className="space-y-4">
                    {/* Payment Analytics */}
                    <PaymentMethodAnalytics />

                    {/* IFU & Creator Earnings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <IFUCalculator />
                        <CreatorEarnings />
                    </div>
                </div>
            </FeatureCluster>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue/Profit Chart */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <DollarSign className="h-5 w-5 text-[hsl(var(--accent-green))]" />
                            Performance Financière
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RevenueProfitChart />
                    </CardContent>
                </Card>

                {/* Orders Chart */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <BarChart className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
                            Détails Commandes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OrdersChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
