
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Hash } from "lucide-react";

export default function HashtagGenerator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-pink-500" />
                    Hashtag Generator
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Hashtag Generator Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
