
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Plug } from "lucide-react";

export default function IntegrationsView() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plug className="h-5 w-5 text-green-500" />
                    Integrations
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Integrations Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
