"use client";

import { useState, Suspense, useEffect } from "react";
import { Button } from "@/components/core/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/core/ui/collapsible";
import {
    Download, Upload, Sparkles, Wand2,
    PenTool, Clock, ChevronDown, ChevronUp,
    MessageSquare, Video, Shield, Languages, Palette, Image, Smartphone,
    LayoutTemplate
} from "lucide-react";
import { FeatureFavoriteStar } from "@/components/core/ui/FeatureFavoriteStar";
import { PageHeader } from "@/components/core/layout/PageHeader";
import { useWindowLayout } from "@/components/core/layout/WindowLayoutContext";

// Import Creation Studio components
import MultiContentGenerator from "@/app/social/creation-studio/_components/MultiContentGenerator";
import BrandVoiceProfile from "./_components/BrandVoiceProfile";

// Import External Services & Tools
import { UGCServiceBanner } from "@/components/marketing/UGCServiceBanner";

// Import NEW UX Components
import { SectionHeader } from "./_components/shared";
import { QuickActionsBar } from "./_components/QuickActionsBar";
import { ToolGrid, ToolGridSection } from "./_components/ToolGrid";
import { ContentKanban } from "./_components/kanban";
import { ToolCard } from "./_components/shared/ToolCard";

// Import Onboarding Components
import { ProductTour } from "./_components/onboarding";

// Import Templates
import { TemplateLibrary } from "./_components/templates";

// Import Creation Wizard
import { CreationWizard } from "./_components/wizard";

// Import Command Palette
import { CommandPalette } from "./_components/CommandPalette";

// Import Backend Feature UIs
import { VersionHistory } from "./_components/VersionHistory";
import { ExportModal } from "./_components/ExportModal";
import { ImportDropzone } from "./_components/ImportDropzone";

// Import Existing Tools
import HookGenerator from "./_components/HookGenerator";
import HookAnalyzer from "./_components/HookAnalyzer";
import AIMediaEditor from "./_components/AIMediaEditor";
import DarjaOptimizer from "./_components/DarjaOptimizer";
import QualityOptimizer from "./_components/QualityOptimizer";
import TikTokMonetizationWizard from "./_components/TikTokMonetizationWizard";
import ContentSafetyChecker from "./_components/ContentSafetyChecker";
import FormatPresets from "./_components/FormatPresets";

function CreativesContent() {
    const [isBrandVoiceOpen, setIsBrandVoiceOpen] = useState(false);
    const [activeToolId, setActiveToolId] = useState<string | null>(null);

    // New state for wizard and templates
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

    // State for backend feature UIs
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    // Tool Modal/Panel handlers
    const handleOpenTool = (toolId: string) => {
        setActiveToolId(activeToolId === toolId ? null : toolId);
    };

    return (
        <>
            {/* Creation Wizard Modal */}
            <CreationWizard
                isOpen={isWizardOpen}
                onClose={() => setIsWizardOpen(false)}
                onComplete={(data) => console.log("Wizard completed:", data)}
            />

            {/* Template Library Modal */}
            <TemplateLibrary
                isOpen={isTemplatesOpen}
                onClose={() => setIsTemplatesOpen(false)}
                onSelectTemplate={(template) => console.log("Template selected:", template)}
            />

            {/* Command Palette (⌘K) */}
            <CommandPalette
                onStartWizard={() => setIsWizardOpen(true)}
                onOpenTool={handleOpenTool}
                onOpenTemplates={() => setIsTemplatesOpen(true)}
            />

            {/* Export Modal */}
            <ExportModal
                isOpen={isExportOpen}
                onClose={() => setIsExportOpen(false)}
                onExport={(format, options) => console.log("Export:", format, options)}
            />

            {/* Import Dropzone */}
            <ImportDropzone
                isOpen={isImportOpen}
                onClose={() => setIsImportOpen(false)}
                onImport={(files) => console.log("Import:", files)}
            />

            {/* Version History Panel */}
            <VersionHistory
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                onRestore={(versionId) => console.log("Restore:", versionId)}
            />

            <div className="space-y-8 p-6 pb-20 max-w-[1600px] mx-auto">
                {/* Header */}
                <PageHeader
                    title="Creatives & Content"
                    description="From idea to posting — Create, design, and publish across all platforms"
                    icon={<Sparkles className="h-6 w-6 text-[hsl(var(--accent-blue))]" />}
                />

                {/* ============================================================================== */}
                {/* SECTION 2: QUICK ACTIONS BAR                                                  */}
                {/* ============================================================================== */}
                <div className="flex items-center gap-3">
                    <QuickActionsBar
                        onStartWizard={() => setIsWizardOpen(true)}
                        onOpenHookGenerator={() => handleOpenTool("hook-generator")}
                        onOpenMediaEditor={() => handleOpenTool("media-editor")}
                        onOpenDarja={() => handleOpenTool("darja")}
                        onOpenSafetyChecker={() => handleOpenTool("safety")}
                    />
                    <Button variant="outline" onClick={() => setIsTemplatesOpen(true)} className="gap-2">
                        <LayoutTemplate className="h-4 w-4" />
                        Templates
                    </Button>
                    <ProductTour />
                </div>

                {/* ============================================================================== */}
                {/* SECTION 3: CONTENT KANBAN BOARD                                               */}
                {/* ============================================================================== */}
                <section className="space-y-4">
                    <SectionHeader
                        title="Content Pipeline"
                        icon={PenTool}
                        iconColor="text-[hsl(var(--accent-blue))]"
                        badge="Drag to update"
                    />
                    <ContentKanban />
                </section>

                {/* ============================================================================== */}
                {/* SECTION 4: UGC SERVICE BANNER                                                 */}
                {/* ============================================================================== */}
                <UGCServiceBanner />

                {/* ============================================================================== */}
                {/* SECTION 5: TOOL GRID - ORGANIZED BY CATEGORY                                  */}
                {/* ============================================================================== */}
                <ToolGrid>
                    {/* Creation Tools (Blue) */}
                    <ToolGridSection
                        title="Creation Tools"
                        icon={Sparkles}
                        iconColor="text-blue-500"
                        defaultOpen={true}
                    >
                        <ToolCard
                            title="Hook Generator"
                            description="Generate viral opening lines for videos"
                            icon={MessageSquare}
                            colorCategory="creation"
                            isActive={activeToolId === "hook-generator"}
                            onClick={() => handleOpenTool("hook-generator")}
                        />
                        <ToolCard
                            title="Hook Analyzer"
                            description="Score your video hooks (first 3 seconds)"
                            icon={Video}
                            colorCategory="analysis"
                            isActive={activeToolId === "hook-analyzer"}
                            onClick={() => handleOpenTool("hook-analyzer")}
                        />
                        <ToolCard
                            title="AI Media Editor"
                            description="Edit photos & videos with AI"
                            icon={Image}
                            colorCategory="creation"
                            isActive={activeToolId === "media-editor"}
                            onClick={() => handleOpenTool("media-editor")}
                        />
                    </ToolGridSection>

                    {/* Algeria-Specific Tools (Green) */}
                    <ToolGridSection
                        title="Algeria-Specific 🇩🇿"
                        icon={Languages}
                        iconColor="text-green-500"
                        defaultOpen={false}
                    >
                        <ToolCard
                            title="Darja Optimizer"
                            description="Convert content to Algerian Arabic"
                            icon={Languages}
                            colorCategory="algeria"
                            isActive={activeToolId === "darja"}
                            onClick={() => handleOpenTool("darja")}
                        />
                        <ToolCard
                            title="Quality Optimizer"
                            description="Optimize for 4G/ADSL networks"
                            icon={Smartphone}
                            colorCategory="algeria"
                            isActive={activeToolId === "quality"}
                            onClick={() => handleOpenTool("quality")}
                        />
                        <ToolCard
                            title="TikTok Monetization"
                            description="Unlock Creator Fund from Algeria"
                            icon={Video}
                            colorCategory="algeria"
                            isActive={activeToolId === "tiktok"}
                            onClick={() => handleOpenTool("tiktok")}
                        />
                    </ToolGridSection>

                    {/* Brand & Safety (Purple/Red) */}
                    <ToolGridSection
                        title="Brand & Safety"
                        icon={Shield}
                        iconColor="text-purple-500"
                        defaultOpen={false}
                    >
                        <ToolCard
                            title="Brand Voice Profile"
                            description="Maintain consistent brand voice"
                            icon={Palette}
                            colorCategory="brand"
                            isActive={activeToolId === "brand-voice"}
                            onClick={() => handleOpenTool("brand-voice")}
                        />
                        <ToolCard
                            title="Content Safety"
                            description="Prevent shadowbans & penalties"
                            icon={Shield}
                            colorCategory="safety"
                            isActive={activeToolId === "safety"}
                            onClick={() => handleOpenTool("safety")}
                        />
                        <ToolCard
                            title="Format Presets"
                            description="Optimal dimensions for platforms"
                            icon={Image}
                            colorCategory="brand"
                            isActive={activeToolId === "formats"}
                            onClick={() => handleOpenTool("formats")}
                        />
                    </ToolGridSection>
                </ToolGrid>

                {/* ============================================================================== */}
                {/* SECTION 6: EXPANDED TOOL PANELS                                               */}
                {/* ============================================================================== */}
                {activeToolId && (
                    <section className="space-y-4 border rounded-xl p-4 bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Tool Panel</h3>
                            <Button variant="ghost" size="sm" onClick={() => setActiveToolId(null)}>
                                Close
                            </Button>
                        </div>
                        {activeToolId === "hook-generator" && <HookGenerator />}
                        {activeToolId === "hook-analyzer" && <HookAnalyzer />}
                        {activeToolId === "media-editor" && <AIMediaEditor />}
                        {activeToolId === "darja" && <DarjaOptimizer />}
                        {activeToolId === "quality" && <QualityOptimizer />}
                        {activeToolId === "tiktok" && <TikTokMonetizationWizard />}
                        {activeToolId === "brand-voice" && <BrandVoiceProfile />}
                        {activeToolId === "safety" && <ContentSafetyChecker />}
                        {activeToolId === "formats" && <FormatPresets />}
                    </section>
                )}

                {/* ============================================================================== */}
                {/* SECTION 7: CONTENT CREATION - MULTI GENERATOR                                 */}
                {/* ============================================================================== */}
                <section className="space-y-4">
                    <SectionHeader
                        title="Content Creation"
                        icon={PenTool}
                        iconColor="text-[hsl(var(--accent-blue))]"
                    />

                    <Collapsible
                        open={isBrandVoiceOpen}
                        onOpenChange={setIsBrandVoiceOpen}
                        className="border rounded-xl bg-card overflow-hidden"
                    >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium hover:bg-accent/50 transition-colors">
                            <div className="flex items-center gap-2 text-sm text-foreground">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                <span>Brand Voice & Style Settings</span>
                            </div>
                            {isBrandVoiceOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 pt-0 border-t bg-muted/10">
                            <div className="pt-4">
                                <BrandVoiceProfile />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <MultiContentGenerator
                        onHistory={() => setIsHistoryOpen(true)}
                        onImport={() => setIsImportOpen(true)}
                        onExport={() => setIsExportOpen(true)}
                    />
                </section>
            </div>
        </>
    );
}

export default function CreativesPage() {
    return (
        <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">Loading Creatives & Content...</div>}>
            <CreativesContent />
        </Suspense>
    );
}
