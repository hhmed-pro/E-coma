"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { ComparisonBarChart } from "@/components/analytics/charts/charts";
import { CreditCard } from "lucide-react";

const COST_DATA = [
    { name: "Jan", cost: 12500, adSpend: 8500 },
    { name: "Feb", cost: 14200, adSpend: 9200 },
    { name: "Mar", cost: 13800, adSpend: 8800 },
    { name: "Apr", cost: 15500, adSpend: 10500 },
    { name: "May", cost: 14900, adSpend: 9800 },
    { name: "Jun", cost: 16800, adSpend: 11200 },
    { name: "Jul", cost: 18200, adSpend: 12500 },
    { name: "Aug", cost: 17500, adSpend: 11800 },
    { name: "Sep", cost: 19100, adSpend: 13200 },
    { name: "Oct", cost: 20500, adSpend: 14500 },
    { name: "Nov", cost: 22800, adSpend: 15800 },
    { name: "Dec", cost: 24500, adSpend: 16900 },
];

export function CostAdSpendChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-indigo-500" />
                    Cost & Ad Spend Analysis
                </CardTitle>
                <CardDescription>
                    Monthly breakdown of operational costs vs advertising spend
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ComparisonBarChart
                    data={COST_DATA}
                    dataKeys={["cost", "adSpend"]}
                    colors={["#f43f5e", "#8b5cf6"]} // Rose for Coet, Violet for Ad Spend
                    height={350}
                    radius={4}
                    className="mt-2"
                />
            </CardContent>
        </Card>
    );
}
