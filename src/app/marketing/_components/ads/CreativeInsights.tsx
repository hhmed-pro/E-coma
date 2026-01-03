
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Lightbulb } from "lucide-react";

export default function CreativeInsightsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Creative Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Creative Insights Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
