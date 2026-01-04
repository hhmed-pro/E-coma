"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import {
    Calculator,
    PiggyBank,
    TrendingUp,
    Wallet,
    Clock,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw
} from "lucide-react";
import { Badge } from "@/components/core/ui/badge";
import { Button } from "@/components/core/ui/button";
import { FeatureCluster } from "@/components/core/ui/FeatureCluster";
import { ProfitCalculator } from "../ProfitCalculator";
import { CashCollector } from "../CashCollector";

// Mock ROAS data
const roasData = {
    overall: 2.8,
    facebook: 3.2,
    instagram: 2.4,
    tiktok: 2.1,
    breakEven: 1.5,
};

// Mock cost breakdown
const costBreakdown = [
    { category: "Produits", amount: "45,230 DA", percentage: 35, color: "bg-blue-500" },
    { category: "Livraison", amount: "28,100 DA", percentage: 22, color: "bg-orange-500" },
    { category: "Publicités", amount: "35,800 DA", percentage: 28, color: "bg-pink-500" },
    { category: "Emballage", amount: "12,400 DA", percentage: 10, color: "bg-green-500" },
    { category: "Autres", amount: "6,500 DA", percentage: 5, color: "bg-gray-500" },
];

// Mock pending COD by age
const pendingCodByAge = [
    { period: "7 jours", amount: "45,200 DA", orders: 34, urgency: "low" },
    { period: "14 jours", amount: "28,500 DA", orders: 21, urgency: "medium" },
    { period: "30+ jours", amount: "12,800 DA", orders: 8, urgency: "high" },
];

// Currency rates
const currencyRates = {
    eurDzd: 146.52,
    eurChange: "+0.35%",
    usdDzd: 134.85,
    usdChange: "-0.12%",
};

export function FinanceRentabiliteTab() {
    return (
        <div className="space-y-6">
            {/* Top Row: Calculators */}
            <FeatureCluster
                title="Calculateurs Financiers"
                icon={<Calculator className="h-5 w-5" />}
                storageKey="analytics-finance-calcs"
                defaultExpanded={true}
                headerClassName="bg-[hsl(var(--accent-blue))]"
            >
                <ProfitCalculator />
            </FeatureCluster>

            {/* Middle Row: ROAS + Cost Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ROAS Analyzer - Coming Soon */}
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/95 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <Badge variant="secondary" className="gap-1 text-xs">
                            <Clock className="h-3 w-3" />
                            Bientôt Disponible
                        </Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-[hsl(var(--accent-green))]" />
                            Analyseur ROAS
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Overall ROAS */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                            <div>
                                <p className="text-sm text-muted-foreground">ROAS Global</p>
                                <p className="text-3xl font-bold">{roasData.overall}x</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Seuil Rentabilité</p>
                                <p className="text-lg font-medium text-[hsl(var(--accent-orange))]">{roasData.breakEven}x</p>
                            </div>
                        </div>

                        {/* Platform breakdown */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-center">
                                <p className="text-xs text-muted-foreground">Facebook</p>
                                <p className="text-lg font-bold">{roasData.facebook}x</p>
                            </div>
                            <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-950/20 text-center">
                                <p className="text-xs text-muted-foreground">Instagram</p>
                                <p className="text-lg font-bold">{roasData.instagram}x</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-950/20 text-center">
                                <p className="text-xs text-muted-foreground">TikTok</p>
                                <p className="text-lg font-bold">{roasData.tiktok}x</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cost Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-[hsl(var(--accent-orange))]" />
                            Répartition des Coûts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {costBreakdown.map((cost) => (
                            <div key={cost.category} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{cost.category}</span>
                                    <span className="text-muted-foreground">{cost.amount}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${cost.color} rounded-full transition-all`}
                                            style={{ width: `${cost.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground w-8">{cost.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row: Cash Collector + Currency */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cash Collector - 2/3 */}
                <div className="lg:col-span-2">
                    <CashCollector />
                </div>

                {/* Currency Tracker - 1/3 */}
                <div className="space-y-4">
                    {/* Currency Rates - Coming Soon */}
                    <Card className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/95 backdrop-blur-[1px] z-10 flex items-center justify-center">
                            <Badge variant="secondary" className="gap-1 text-xs">
                                <Clock className="h-3 w-3" />
                                Bientôt Disponible
                            </Badge>
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <DollarSign className="h-4 w-4 text-[hsl(var(--accent-green))]" />
                                    Taux de Change
                                </CardTitle>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div>
                                    <p className="text-xs text-muted-foreground">EUR/DZD</p>
                                    <p className="text-xl font-bold">{currencyRates.eurDzd}</p>
                                </div>
                                <div className="flex items-center text-[hsl(var(--accent-green))] text-sm">
                                    <ArrowUpRight className="h-4 w-4" />
                                    {currencyRates.eurChange}
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div>
                                    <p className="text-xs text-muted-foreground">USD/DZD</p>
                                    <p className="text-xl font-bold">{currencyRates.usdDzd}</p>
                                </div>
                                <div className="flex items-center text-destructive text-sm">
                                    <ArrowDownRight className="h-4 w-4" />
                                    {currencyRates.usdChange}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending COD by Age */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <PiggyBank className="h-4 w-4 text-[hsl(var(--accent-blue))]" />
                                COD en Attente
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {pendingCodByAge.map((item) => (
                                <div
                                    key={item.period}
                                    className={`flex items-center justify-between p-2 rounded-lg ${item.urgency === 'high' ? 'bg-red-50 dark:bg-red-950/20' :
                                            item.urgency === 'medium' ? 'bg-orange-50 dark:bg-orange-950/20' :
                                                'bg-green-50 dark:bg-green-950/20'
                                        }`}
                                >
                                    <div>
                                        <p className="text-sm font-medium">{item.period}</p>
                                        <p className="text-xs text-muted-foreground">{item.orders} commandes</p>
                                    </div>
                                    <p className="font-bold">{item.amount}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
