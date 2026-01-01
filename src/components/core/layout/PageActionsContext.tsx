"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface PageAction {
    id: string;
    label: string;
    icon?: ReactNode;
    variant?: "default" | "outline" | "ghost";
    onClick: () => void;
}

interface PageActionsContextType {
    actions: PageAction[];
    setActions: (actions: PageAction[]) => void;
    clearActions: () => void;
}

const PageActionsContext = createContext<PageActionsContextType | null>(null);

export function PageActionsProvider({ children }: { children: ReactNode }) {
    const [actions, setActionsState] = useState<PageAction[]>([]);

    const setActions = useCallback((newActions: PageAction[]) => {
        setActionsState(newActions);
    }, []);

    const clearActions = useCallback(() => {
        setActionsState([]);
    }, []);

    return (
        <PageActionsContext.Provider value={{ actions, setActions, clearActions }}>
            {children}
        </PageActionsContext.Provider>
    );
}

export function usePageActions() {
    const context = useContext(PageActionsContext);
    if (!context) {
        throw new Error("usePageActions must be used within a PageActionsProvider");
    }
    return context;
}

// Hook to register page actions - use in page components
export function useRegisterPageActions(actions: PageAction[], deps: React.DependencyList = []) {
    const { setActions, clearActions } = usePageActions();

    // This is designed to be called within useEffect in page components
    return { setActions, clearActions };
}
