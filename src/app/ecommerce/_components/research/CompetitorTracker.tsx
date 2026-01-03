"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Badge } from "@/components/core/ui/badge";
import { TrendingUp, TrendingDown, Eye, DollarSign, Globe } from "lucide-react";

const TRACKED_ITEMS = [
    {
        id: 1,
        product: "Wireless Earbuds Pro",
        competitor: "TechStore DZ",
        currentPrice: "11,500 DA",
        myPrice: "12,500 DA",
        change: "-500 DA",
        status: "lower",
        lastUpdate: "2h ago"
    },
    {
        id: 2,
        product: "Smart Watch S5",
        competitor: "BestDeal",
        currentPrice: "36,000 DA",
        myPrice: "35,000 DA",
        change: "+1000 DA",
        status: "higher",
        lastUpdate: "5h ago"
    }
];

export default function CompetitorTracker() {
    return (
        <Card className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
                            <Eye className="h-5 w-5 text-blue-500" />
                            Search Tracking
                        </CardTitle>
                        <CardDescription>Competitor pricing & market updates</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {TRACKED_ITEMS.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-4 p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-blue-100/50 dark:border-blue-800/30 items-center">
                            <div className="col-span-5">
                                <p className="font-medium text-sm">{item.product}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Globe className="h-3 w-3" /> {item.competitor}
                                </div>
                            </div>
                            <div className="col-span-3 text-center">
                                <p className="font-bold text-sm text-foreground">{item.currentPrice}</p>
                                <p className="text-[10px] text-muted-foreground">Competitor</p>
                            </div>
                            <div className="col-span-4 flex justify-end items-center gap-2">
                                <Badge variant="outline" className={`${item.status === 'lower' ? 'text-red-600 border-red-200 bg-red-50 dark:bg-red-900/20' :
                                        'text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20'
                                    }`}>
                                    {item.status === 'lower' ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                                    {item.change}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
