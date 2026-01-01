
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { LayoutGrid } from "lucide-react";

export default function AdsCentral() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5 text-indigo-500" />
                    Ads Central
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Ads Central Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
