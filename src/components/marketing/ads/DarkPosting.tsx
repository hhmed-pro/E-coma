
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Zap } from "lucide-react";

export default function DarkPostingPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Dark Posting
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Dark Posting Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
