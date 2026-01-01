"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Button } from "@/components/core/ui/button";
import { Badge } from "@/components/core/ui/badge";
import { Sparkles, TrendingUp, AlertTriangle, ArrowRight, DollarSign, Lightbulb } from "lucide-react";

const BUDGET_TIPS = [
    {
        id: 1,
        type: "opportunity",
        title: "Scale Winning Ad Set",
        description: "Ad Set 'Summer Vibes' has 4.5x ROAS. Increasing budget by 20% could generate +50k DA revenue.",
        impact: "High",
        action: "Increase Budget",
        metric: "+20%"
    },
    {
        id: 2,
        type: "saving",
        title: "Cut Wasted Spend",
        description: "Stop ads with CTR < 0.5% in 'Cold Audience'. Estimated saving: 12k DA/week.",
        impact: "Medium",
        action: "Pause Ads",
        metric: "-12k DA"
    },
    {
        id: 3,
        type: "allocation",
        title: "Reallocate to Instagram",
        description: "Instagram Stories are outperforming Facebook Feed by 35%. Shift 15% of budget.",
        impact: "High",
        action: "Reallocate",
        metric: "Optimize"
    }
];

export default function BudgetAiTips() {
    return (
        <Card className="bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-200/60 dark:border-yellow-800/30">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-500">
                            <Sparkles className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            Budget AI Tips
                        </CardTitle>
                        <CardDescription>AI-driven suggestions to optimize your ad spend</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                        3 New Tips
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {BUDGET_TIPS.map((tip) => (
                        <div
                            key={tip.id}
                            className="flex flex-col p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-yellow-100/50 dark:border-yellow-800/30 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className={`p-2 rounded-lg ${tip.type === 'opportunity' ? 'bg-green-100 text-green-600' :
                                        tip.type === 'saving' ? 'bg-red-100 text-red-600' :
                                            'bg-blue-100 text-blue-600'
                                    }`}>
                                    {tip.type === 'opportunity' ? <TrendingUp className="h-4 w-4" /> :
                                        tip.type === 'saving' ? <DollarSign className="h-4 w-4" /> :
                                            <Lightbulb className="h-4 w-4" />}
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {tip.impact} Impact
                                </Badge>
                            </div>

                            <h4 className="font-semibold text-sm mb-2">{tip.title}</h4>
                            <p className="text-xs text-muted-foreground mb-4 flex-1">
                                {tip.description}
                            </p>

                            <Button size="sm" variant="outline" className="w-full justify-between group hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-700 dark:hover:text-yellow-400 hover:border-yellow-200">
                                <span>{tip.action}</span>
                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
