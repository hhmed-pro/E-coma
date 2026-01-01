"use client";

import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { SUBTABS_CONFIG, getDefaultTab } from "@/components/core/layout/SecondTopBar";

/**
 * Hook to get the current active sub-tab for the current route
 * Returns the tab param from URL or the default first tab
 */
export function useSubTab(): string | null {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab");

    // If no tab in URL, return the default tab for this route
    if (!currentTab) {
        return getDefaultTab(pathname);
    }

    return currentTab;
}

/**
 * Hook to check if a specific tab is active
 */
export function useIsTabActive(tabParam: string): boolean {
    const currentTab = useSubTab();
    return currentTab === tabParam;
}
