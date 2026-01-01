"use client";

import { Card, CardContent } from "@/components/core/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdsManagerPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="w-full max-w-md">
                    <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground mb-4">
                            This page has moved to Ads Center
                        </p>
                        <Link
                            href="/ads"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                            Go to Ads Center
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
