
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Download } from "lucide-react";

export default function MediaDownloader() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-blue-500" />
                    Media Downloader
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center p-6 text-muted-foreground border-2 border-dashed rounded-lg">
                    Media Downloader Component Placeholder
                </div>
            </CardContent>
        </Card>
    );
}
