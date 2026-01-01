"use client";

import { Lightbulb, Sparkles, TrendingUp, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/core/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Badge } from "@/components/core/ui/badge";

const CONTENT_IDEAS = [
    { title: "Behind the scenes of your business", category: "Authenticity", trending: true },
    { title: "Customer success story spotlight", category: "Social Proof", trending: false },
    { title: "Quick tip or tutorial video", category: "Educational", trending: true },
    { title: "Before/After transformation", category: "Visual", trending: false },
    { title: "Q&A session with your audience", category: "Engagement", trending: true },
    { title: "Weekly product highlight", category: "Sales", trending: false },
    { title: "Viral Darja Hook Challenge", category: "Trends (DZ)", trending: true },
    { title: "58 Wilayas Delivery Announcement", category: "Logistics", trending: true },
    { title: "Ramadan Prep Checklist", category: "Seasonal", trending: false },
];

export default function IdeasPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-yellow-500" />
                        Content Ideas
                    </h1>
                    <p className="text-muted-foreground">AI-powered content suggestions for your social media</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh Ideas
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CONTENT_IDEAS.map((idea, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <Badge variant="secondary">{idea.category}</Badge>
                                {idea.trending && (
                                    <div className="flex items-center gap-1 text-orange-500 text-xs">
                                        <TrendingUp className="w-3 h-3" />
                                        Trending
                                    </div>
                                )}
                            </div>
                            <h3 className="font-medium mt-2">{idea.title}</h3>
                            <div className="mt-4 flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Schedule
                                </Button>
                                <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Create
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
