"use client";

import { HelpCenterContent } from "@/components/help/HelpCenterContent";
import { useRightPanel } from "@/components/core/layout/RightPanelContext";
import { useEffect, useState } from "react";
import { HelpCircle, BookOpen, Headphones } from "lucide-react";

export default function HelpCenterPage() {
    const { setConfig, activeTab } = useRightPanel();
    const [pageTab, setPageTab] = useState("faq");

    useEffect(() => {
        setConfig({
            enabled: true,
            title: "Help Center",
            subtitle: "Guides and support resources.",
            icon: "❓",
            tabs: [
                { id: "faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4" /> },
                { id: "guides", label: "Guides", icon: <BookOpen className="w-4 h-4" /> },
                { id: "support", label: "Support", icon: <Headphones className="w-4 h-4" /> },
            ]
        });
        return () => setConfig(null);
    }, [setConfig]);

    useEffect(() => {
        if (activeTab) setPageTab(activeTab);
    }, [activeTab]);

    return (
        <HelpCenterContent activeTab={pageTab} />
    );
}
