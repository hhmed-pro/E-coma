"use client";

/**
 * ZONE 3: COMMAND - Finance & Insights Page
 * The Owner's Dashboard - Focus on REAL money (COD Cash), not theoretical revenue
 * 
 * Layout:
 * - HERO: Cash Collector (Total Pending COD - the main KPI)
 * - GRID: Profit Calculator vs Pending COD by Age
 * 
 * Algerian Market Labels:
 * - "Revenue" → "Collection Potential"
 * - "Sales" → "Pending COD"
 * - "Returns" → "Rotour"
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Badge } from "@/components/core/ui/badge";
import {
    DollarSign,
    TrendingUp,
    AlertTriangle,
    Clock,
    Banknote,
    Calendar,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

// Import relocated components
import { CashCollector } from "@/views/Command/Finance/CashFlow/CashCollector";
import CodCashTracker from "@/views/Command/Finance/CashFlow/CodCashTracker";
import { ProfitCalculator } from "@/views/Command/Finance/Profitability/ProfitCalculator";

// Pending COD by Age - shows money stuck at carriers
const PENDING_COD_BY_AGE = [
    { range: "0-7 days", amount: 280000, orders: 85, status: "healthy", color: "bg-green-500" },
    { range: "8-14 days", amount: 180000, orders: 52, status: "warning", color: "bg-yellow-500" },
    { range: "15-21 days", amount: 120000, orders: 38, status: "critical", color: "bg-orange-500" },
    { range: "21+ days", amount: 85000, orders: 24, status: "overdue", color: "bg-red-500" },
];

export default function FinancePage() {
    const totalPendingCOD = PENDING_COD_BY_AGE.reduce((sum, item) => sum + item.amount, 0);
    const overdueAmount = PENDING_COD_BY_AGE
        .filter(item => item.status === "critical" || item.status === "overdue")
        .reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Banknote className="h-6 w-6 text-purple-500" />
                    </div>
                    المالية (Finance & Insights)
                </h1>
                <p className="text-muted-foreground mt-1">
                    Track real cash, not theoretical revenue - Focus on Collection Potential
                </p>
            </div>

            {/* HERO: Total Pending COD Summary */}
            <Card className="mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
                <CardContent className="py-8">
                    <div className="grid grid-cols-4 gap-8">
                        {/* Main KPI */}
                        <div className="col-span-2">
                            <p className="text-purple-200 text-sm mb-1 flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                Total Pending COD (Cash at Carriers)
                            </p>
                            <h2 className="text-5xl font-bold mb-2">
                                {totalPendingCOD.toLocaleString()} DA
                            </h2>
                            <p className="text-purple-200 text-sm">
                                Money waiting to be collected from Yalidine, ZR Express, etc.
                            </p>
                            {overdueAmount > 0 && (
                                <Badge className="mt-3 bg-red-500/20 text-red-100 border-red-400/30">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {overdueAmount.toLocaleString()} DA Overdue (15+ days)
                                </Badge>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-4">
                            <div className="p-4 bg-white/10 rounded-xl">
                                <p className="text-purple-200 text-xs mb-1">Collection Potential (This Week)</p>
                                <p className="text-2xl font-bold flex items-center gap-2">
                                    850,000 DA
                                    <ArrowUpRight className="h-5 w-5 text-green-300" />
                                </p>
                            </div>
                            <div className="p-4 bg-white/10 rounded-xl">
                                <p className="text-purple-200 text-xs mb-1">Rotour Cost (Lost Revenue)</p>
                                <p className="text-2xl font-bold flex items-center gap-2 text-red-300">
                                    -125,000 DA
                                    <ArrowDownRight className="h-5 w-5" />
                                </p>
                            </div>
                        </div>

                        {/* Next Virement */}
                        <div className="flex flex-col justify-center">
                            <div className="p-4 bg-white/10 rounded-xl text-center">
                                <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                                <p className="text-purple-200 text-xs mb-1">Next Expected Virement</p>
                                <p className="text-xl font-bold">Wed, Jan 8</p>
                                <p className="text-purple-200 text-sm">~320,000 DA (Yalidine)</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* COD Cash Tracker Component */}
            <div className="mb-6">
                <CodCashTracker />
            </div>

            {/* Cash Collector Component */}
            <Card className="mb-6">
                <CardContent className="py-6">
                    <CashCollector />
                </CardContent>
            </Card>

            {/* Main Grid: Profit Calculator + Pending COD by Age */}
            <div className="grid grid-cols-2 gap-6">
                {/* LEFT: Profit Calculator */}
                <ProfitCalculator />

                {/* RIGHT: Pending COD by Age */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-orange-500" />
                            Pending COD by Age
                        </CardTitle>
                        <CardDescription>
                            ⚠️ Money older than 15 days = Pressure the carrier!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {PENDING_COD_BY_AGE.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border ${item.status === "overdue"
                                        ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                                        : item.status === "critical"
                                            ? "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900"
                                            : "bg-white dark:bg-white/5 border-slate-200 dark:border-slate-800"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-3 w-3 rounded-full ${item.color}`} />
                                        <span className="font-medium">{item.range}</span>
                                        {(item.status === "critical" || item.status === "overdue") && (
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>
                                    <Badge variant="outline">{item.orders} orders</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.color} transition-all`}
                                                style={{ width: `${(item.amount / totalPendingCOD) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="ml-4 text-lg font-bold">
                                        {item.amount.toLocaleString()} DA
                                    </span>
                                </div>
                                {(item.status === "critical" || item.status === "overdue") && (
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                                        🚨 Contact carrier immediately - money is stuck!
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Total Summary */}
                        <div className="pt-4 border-t border-dashed">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Total Pending Collection</span>
                                <span className="text-2xl font-bold text-primary">
                                    {totalPendingCOD.toLocaleString()} DA
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
