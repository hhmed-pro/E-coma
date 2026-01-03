
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Copy } from "lucide-react";

export default function BulkCreationPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Copy className="h-5 w-5 text-purple-500" />
                    Bulk Creation
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Bulk Creation Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
