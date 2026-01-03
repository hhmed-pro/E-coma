"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/core/ui/button";
import { Label } from "@/components/core/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/core/ui/radio-group";
import { Checkbox } from "@/components/core/ui/checkbox";
import { Progress } from "@/components/core/ui/progress";
import {
    Download,
    FileJson,
    FileSpreadsheet,
    FileText,
    Image,
    CheckCircle,
    Loader2,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

type ExportFormat = "json" | "csv" | "pdf" | "images";

interface ExportOption {
    id: ExportFormat;
    label: string;
    description: string;
    icon: React.ElementType;
}

const EXPORT_OPTIONS: ExportOption[] = [
    { id: "json", label: "JSON", description: "Full data with all fields", icon: FileJson },
    { id: "csv", label: "CSV", description: "Spreadsheet compatible", icon: FileSpreadsheet },
    { id: "pdf", label: "PDF Report", description: "Formatted document", icon: FileText },
    { id: "images", label: "Images", description: "Export all media", icon: Image },
];

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedItems?: string[];
    onExport?: (format: ExportFormat, options: ExportOptions) => void;
}

interface ExportOptions {
    includeMedia: boolean;
    includeDrafts: boolean;
    includeMetadata: boolean;
}

/**
 * ExportModal - Export format picker with options
 * Uses unified Framer Motion modal pattern for consistency
 */
export function ExportModal({
    isOpen,
    onClose,
    selectedItems = [],
    onExport,
}: ExportModalProps) {
    const [format, setFormat] = useState<ExportFormat>("json");
    const [options, setOptions] = useState<ExportOptions>({
        includeMedia: true,
        includeDrafts: false,
        includeMetadata: true,
    });
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        setExportProgress(0);

        // Simulate export progress
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setExportProgress(i);
        }

        setIsExporting(false);
        setIsComplete(true);
        onExport?.(format, options);

        // Reset after showing success
        setTimeout(() => {
            setIsComplete(false);
            onClose();
        }, 1500);
    };

    const handleClose = () => {
        if (!isExporting) {
            onClose();
        }
    };

    const itemCount = selectedItems.length || "All";

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-background rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
                    onClick={e => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="export-modal-title"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2">
                            <Download className="h-5 w-5 text-primary" />
                            <h2 id="export-modal-title" className="text-lg font-semibold">Export Content</h2>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleClose} disabled={isExporting} aria-label="Close">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {/* Item count */}
                        <p className="text-sm text-muted-foreground">
                            Exporting {itemCount} items
                        </p>

                        {/* Format Selection */}
                        <div className="space-y-2">
                            <Label>Export Format</Label>
                            <RadioGroup value={format} onValueChange={(v) => setFormat(v as ExportFormat)}>
                                <div className="grid grid-cols-2 gap-2">
                                    {EXPORT_OPTIONS.map((option) => (
                                        <div key={option.id}>
                                            <RadioGroupItem
                                                value={option.id}
                                                id={option.id}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor={option.id}
                                                className={cn(
                                                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                                                    format === option.id
                                                        ? "border-primary bg-primary/5"
                                                        : "border-muted hover:border-muted-foreground/30"
                                                )}
                                            >
                                                <option.icon className={cn(
                                                    "h-6 w-6",
                                                    format === option.id ? "text-primary" : "text-muted-foreground"
                                                )} />
                                                <span className="font-medium text-sm">{option.label}</span>
                                                <span className="text-[10px] text-muted-foreground text-center">
                                                    {option.description}
                                                </span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            <Label>Options</Label>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="include-media"
                                        checked={options.includeMedia}
                                        onCheckedChange={(checked) =>
                                            setOptions(prev => ({ ...prev, includeMedia: !!checked }))
                                        }
                                    />
                                    <Label htmlFor="include-media" className="text-sm font-normal">
                                        Include media files
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="include-drafts"
                                        checked={options.includeDrafts}
                                        onCheckedChange={(checked) =>
                                            setOptions(prev => ({ ...prev, includeDrafts: !!checked }))
                                        }
                                    />
                                    <Label htmlFor="include-drafts" className="text-sm font-normal">
                                        Include drafts
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="include-metadata"
                                        checked={options.includeMetadata}
                                        onCheckedChange={(checked) =>
                                            setOptions(prev => ({ ...prev, includeMetadata: !!checked }))
                                        }
                                    />
                                    <Label htmlFor="include-metadata" className="text-sm font-normal">
                                        Include metadata & analytics
                                    </Label>
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        {isExporting && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Exporting...</span>
                                    <span>{exportProgress}%</span>
                                </div>
                                <Progress value={exportProgress} />
                            </div>
                        )}

                        {/* Success */}
                        {isComplete && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 text-green-600 justify-center py-2"
                            >
                                <CheckCircle className="h-5 w-5" />
                                <span>Export complete!</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t flex justify-end gap-2">
                        <Button variant="outline" onClick={handleClose} disabled={isExporting}>
                            Cancel
                        </Button>
                        <Button onClick={handleExport} disabled={isExporting || isComplete}>
                            {isExporting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </>
                            )}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
