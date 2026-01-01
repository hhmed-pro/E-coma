
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Rocket } from "lucide-react";

export default function Launcher() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-orange-500" />
                    Ad Launcher
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Ad Launcher Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
