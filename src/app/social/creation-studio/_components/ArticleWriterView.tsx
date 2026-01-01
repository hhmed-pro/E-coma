"use client";

import { PenTool, Sparkles } from "lucide-react";
import { Button } from "@/components/core/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";

export default function ArticleWriterPage() {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <PenTool className="w-6 h-6 text-indigo-600" />
                    Article Writer
                </h1>
                <p className="text-muted-foreground">Generate SEO-optimized long-form articles</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Article Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Topic / Title</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="e.g., Top 10 E-commerce Trends for 2025"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Target Keywords</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="e.g., ecommerce, online shopping, trends"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Article Length</label>
                        <select className="w-full px-3 py-2 border rounded-lg">
                            <option>Short (500-800 words)</option>
                            <option>Medium (800-1500 words)</option>
                            <option>Long (1500-2500 words)</option>
                        </select>
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Article
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
