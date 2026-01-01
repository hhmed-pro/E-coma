"use client";

import { Image as ImageIcon, Upload, Folder, Grid, List } from "lucide-react";
import { Button } from "@/components/core/ui/button";
import { Card, CardContent } from "@/components/core/ui/card";

const MOCK_MEDIA = [
    { id: 1, type: "image", name: "product-1.jpg", size: "2.4 MB" },
    { id: 2, type: "image", name: "banner.png", size: "1.8 MB" },
    { id: 3, type: "video", name: "promo.mp4", size: "12.5 MB" },
    { id: 4, type: "image", name: "logo.svg", size: "45 KB" },
];

export default function MediaStudioPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-purple-500" />
                        Media Studio
                    </h1>
                    <p className="text-muted-foreground">Manage your media assets and brand materials</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                        <Grid className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <List className="w-4 h-4" />
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                    </Button>
                </div>
            </div>

            {/* Folders */}
            <div className="flex gap-4">
                {["All Media", "Products", "Marketing", "Brand"].map((folder) => (
                    <Card key={folder} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Folder className="w-5 h-5 text-yellow-500" />
                            <span className="font-medium">{folder}</span>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {MOCK_MEDIA.map((media) => (
                    <Card key={media.id} className="cursor-pointer hover:shadow-lg transition-shadow group">
                        <CardContent className="p-0">
                            <div className="aspect-square bg-muted flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="w-8 h-8" />
                            </div>
                            <div className="p-2">
                                <p className="text-sm font-medium truncate">{media.name}</p>
                                <p className="text-xs text-muted-foreground">{media.size}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
