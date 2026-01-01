
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { PenTool } from "lucide-react";

export default function ContentEditor() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-blue-500" />
                    Content Editor
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Content Editor Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
