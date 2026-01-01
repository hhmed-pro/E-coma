"use client";

import { useEffect, ReactNode } from "react";
import { useRightPanel, RightPanelConfig } from "@/components/core/layout/RightPanelContext";

interface PageWithRightPanelProps {
    children: ReactNode;
    config: RightPanelConfig;
}

/**
 * Wrapper component for pages that need a right panel.
 * Use this to easily configure the right panel for any page.
 * 
 * Example usage:
 * ```tsx
 * <PageWithRightPanel config={{
 *   enabled: true,
 *   title: "Order Filters",
 *   tabs: [
 *     { id: "all", label: "All", badge: 156 },
 *     { id: "pending", label: "Pending", badge: 24 },
 *   ],
 *   content: <YourPanelContent />
 * }}>
 *   <YourPageContent />
 * </PageWithRightPanel>
 * ```
 */
export function PageWithRightPanel({ children, config }: PageWithRightPanelProps) {
    const { setConfig } = useRightPanel();

    // Create a stable config reference to prevent infinite loops
    // We use JSON.stringify to compare content instead of reference
    const configStr = JSON.stringify(config);

    useEffect(() => {
        setConfig(config);
        return () => setConfig(null); // Cleanup on unmount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configStr, setConfig]);

    return <>{children}</>;
}

/**
 * Hook version for pages that need more control.
 * Returns the active tab for filtering content.
 * 
 * Example usage:
 * ```tsx
 * const { activeTab, setActiveTab } = usePageRightPanel({
 *   enabled: true,
 *   title: "Filters",
 *   tabs: [...]
 * });
 * 
 * // Filter your data based on activeTab
 * const filteredOrders = orders.filter(o => activeTab === "all" || o.status === activeTab);
 * ```
 */
export function usePageRightPanel(config: RightPanelConfig) {
    const { setConfig, activeTab, setActiveTab, isOpen, togglePanel } = useRightPanel();

    useEffect(() => {
        setConfig(config);
        return () => setConfig(null);
    }, [config, setConfig]);

    return { activeTab, setActiveTab, isOpen, togglePanel };
}
