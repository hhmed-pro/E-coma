"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

// Tab definition
export interface TabDefinition {
    id: string;
    label: string;
    badge?: number;
    icon?: ReactNode;
    content?: ReactNode;
}

// Page-specific panel configuration
export interface RightPanelConfig {
    enabled: boolean;
    title: string;
    subtitle?: string;
    icon?: string;
    tabs?: TabDefinition[];
    content?: ReactNode;
    actions?: ReactNode;
}

// Context value type
interface RightPanelContextType {
    config: RightPanelConfig | null;
    activeTab: string;
    isOpen: boolean;
    isMinimized: boolean;
    setConfig: (config: RightPanelConfig | null) => void;
    setActiveTab: (tabId: string) => void;
    setIsOpen: (isOpen: boolean) => void;
    togglePanel: () => void;
    toggleMinimize: () => void;
    setIsMinimized: (isMinimized: boolean) => void;
}

// Default config (no panel)
const DEFAULT_CONFIG: RightPanelConfig = {
    enabled: false,
    title: "",
    tabs: [],
};

// Create context
const RightPanelContext = createContext<RightPanelContextType | undefined>(undefined);

// Provider component
export function RightPanelProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<RightPanelConfig | null>(null);
    const [activeTab, setActiveTab] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleSetConfig = useCallback((newConfig: RightPanelConfig | null) => {
        setConfig(newConfig);

        // Set first tab as active when config changes, BUT preserve current if it exists
        if (newConfig?.tabs?.length) {
            const tabs = newConfig.tabs;
            setActiveTab(prev => {
                // Check if the current active tab exists in the new config
                const tabExists = tabs.some(t => t.id === prev);

                // If it exists and isn't empty, keep it. Otherwise default to first tab.
                if (tabExists && prev) {
                    return prev;
                }
                return tabs[0].id;
            });
        }
    }, []);

    const togglePanel = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const toggleMinimize = useCallback(() => {
        setIsMinimized(prev => !prev);
    }, []);

    return (
        <RightPanelContext.Provider
            value={{
                config,
                activeTab,
                isOpen,
                isMinimized,
                setConfig: handleSetConfig,
                setActiveTab,
                setIsOpen,
                togglePanel,
                toggleMinimize,
                setIsMinimized,
            }}
        >
            {children}
        </RightPanelContext.Provider>
    );
}

// Hook to use the context
export function useRightPanel() {
    const context = useContext(RightPanelContext);
    if (context === undefined) {
        throw new Error("useRightPanel must be used within a RightPanelProvider");
    }
    return context;
}

// Hook for pages to configure their right panel
export function useConfigureRightPanel(config: RightPanelConfig) {
    const { setConfig } = useRightPanel();

    // This will be called by pages to set their config
    // Use useEffect in the page component
    return useCallback(() => {
        setConfig(config);
        return () => setConfig(null); // Cleanup on unmount
    }, [config, setConfig]);
}

