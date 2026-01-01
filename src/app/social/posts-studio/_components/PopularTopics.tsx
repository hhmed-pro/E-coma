"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Badge } from "@/components/core/ui/badge";
import { MessageSquare, TrendingUp, ThumbsUp, ArrowUpRight } from "lucide-react";

// Mock Data for Popular Topics
const POPULAR_TOPICS = [
    {
        id: 1,
        topic: "Summer Collection Pricing",
        sentiment: "mixed",
        mentions: 145,
        trend: "+12%",
        platform: "Instagram",
        keywords: ["expensive", "quality", "shipping"]
    },
    {
        id: 2,
        topic: "Delivery Speed",
        sentiment: "positive",
        mentions: 89,
        trend: "+5%",
        platform: "Facebook",
        keywords: ["fast", "ontime", "courier"]
    },
    {
        id: 3,
        topic: "New Colors Request",
        sentiment: "neutral",
        mentions: 67,
        trend: "+24%",
        platform: "TikTok",
        keywords: ["blue", "red", "matte"]
    },
    {
        id: 4,
        topic: "Size Guide Questions",
        sentiment: "negative",
        mentions: 45,
        trend: "-2%",
        platform: "All",
        keywords: ["fit", "chart", "small"]
    }
];

export default function PopularTopics() {
    return (
        <Card className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 border-indigo-100 dark:border-indigo-800/30">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300">
                            <MessageSquare className="h-5 w-5 text-indigo-500" />
                            Popular Posts Comments Subjects
                        </CardTitle>
                        <CardDescription>Trending topics analyzed from user comments</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-white/50 dark:bg-black/20">
                        Top 4 Topics
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {POPULAR_TOPICS.map((topic) => (
                        <div
                            key={topic.id}
                            className="p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-indigo-100/50 dark:border-indigo-800/30 hover:shadow-sm transition-all"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-sm text-foreground">{topic.topic}</h4>
                                <Badge
                                    variant="secondary"
                                    className={`text-[10px] px-1.5 py-0 ${topic.sentiment === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            topic.sentiment === 'negative' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                        }`}
                                >
                                    {topic.sentiment}
                                </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" /> {topic.mentions}
                                </span>
                                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                    <TrendingUp className="h-3 w-3" /> {topic.trend}
                                </span>
                                <span>•</span>
                                <span>{topic.platform}</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {topic.keywords.map((kw) => (
                                    <span key={kw} className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
                                        #{kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
