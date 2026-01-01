"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Button } from "@/components/core/ui/button";
import {
    BarChart3, TrendingUp, Clock, CheckCircle,
    FileText, MoreHorizontal, Send, Zap
} from "lucide-react";

// Mock Data
const INSIGHTS = [
    { title: "Best posting time", value: "6:00 PM - 8:00 PM", trend: "+23% engagement", icon: Clock },
    { title: "Top content type", value: "Video Reels", trend: "4.2x more reach", icon: TrendingUp },
    { title: "Optimal post length", value: "80-150 characters", trend: "+18% CTR", icon: FileText },
];

const QUEUE_ITEMS = [
    { id: 1, title: "New Product Announcement", platform: "Instagram", status: "Ready", date: "Now" },
    { id: 2, title: "Weekend Sale Promo", platform: "Facebook", status: "Draft", date: "Saved 2h ago" },
    { id: 3, title: "Customer Review Share", platform: "TikTok", status: "Scheduled", date: "Tomorrow 9:00 AM" },
    { id: 4, title: "Weekly Tips & Tricks", platform: "LinkedIn", status: "Scheduled", date: "Mon 10:00 AM" },
    { id: 5, title: "Behind the Scenes", platform: "Instagram", status: "Draft", date: "Wed 2:00 PM" },
    { id: 6, title: "Flash Sale Alert", platform: "Twitter", status: "Ready", date: "Fri 5:00 PM" },
    { id: 7, title: "Team Spotlight", platform: "LinkedIn", status: "Scheduled", date: "Thu 11:00 AM" },
    { id: 8, title: "User Poll", platform: "Instagram", status: "Draft", date: "Sat 1:00 PM" },
];

export default function IntelligentQueue() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: Insights Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Zap className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">AI Insights</h2>
                </div>
                <div className="space-y-3">
                    {INSIGHTS.map((insight, i) => (
                        <Card key={i} className="bg-white/50 dark:bg-muted/30 border-none shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm group">
                            <CardContent className="p-4 flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <insight.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{insight.title}</p>
                                    <p className="text-sm font-bold text-foreground">{insight.value}</p>
                                    <div className="flex items-center gap-1 mt-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-xs text-green-600 font-medium">{insight.trend}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Right: Active Queue (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <Send className="h-5 w-5 text-green-600" />
                        </div>
                        <h2 className="text-lg font-bold">Active Queue</h2>
                        <span className="px-2.5 py-0.5 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 text-xs rounded-full font-bold border border-green-200 dark:border-green-500/30">
                            {QUEUE_ITEMS.length} Items
                        </span>
                    </div>
                    <Button size="sm" variant="ghost" className="hover:bg-muted/50">View All</Button>
                </div>

                <Card className="flex-1 border-none shadow-sm bg-white/50 dark:bg-muted/20 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                            {QUEUE_ITEMS.map((item) => (
                                <div key={item.id} className="p-2 bg-background/80 hover:bg-background border border-transparent hover:border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col items-center text-center gap-2 aspect-[4/5] justify-center relative">
                                    <div className={`p-2 rounded-lg mb-1 ${item.status === "Ready" ? "bg-green-50 text-green-600 dark:bg-green-900/20" :
                                        item.status === "Scheduled" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" :
                                            "bg-gray-50 text-gray-500 dark:bg-gray-800/50"
                                        }`}>
                                        {item.status === "Ready" && <CheckCircle className="h-4 w-4" />}
                                        {item.status === "Scheduled" && <Clock className="h-4 w-4" />}
                                        {item.status === "Draft" && <FileText className="h-4 w-4" />}
                                    </div>
                                    <div className="w-full">
                                        <p className="font-semibold text-xs text-foreground mb-0.5 line-clamp-2 leading-tight h-8 flex items-center justify-center">{item.title}</p>
                                        <p className="text-[10px] text-muted-foreground font-medium">{item.platform}</p>
                                    </div>

                                    {/* Hover Actions Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center bg-gradient-to-t from-background via-background/90 to-transparent pt-4">
                                        <Button size="icon" variant="ghost" className="h-6 w-6">
                                            <MoreHorizontal className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
