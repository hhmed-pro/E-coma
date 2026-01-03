"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Team, TEAMS } from "@/config/teams";

type ScreenMode = "ADMIN" | "TEAM";

interface ModeContextType {
    mode: ScreenMode;
    activeTeam: Team | null;
    sessionObjective: string;
    setSessionObjective: (objective: string) => void;
    switchToTeamMode: (teamId: string) => void;
    switchToAdminMode: (pin: string) => boolean;
    getTeamFromPath: (pathname: string) => Team | null;
    isAdmin: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ScreenMode>("ADMIN");
    const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
    const [sessionObjective, setSessionObjective] = useState<string>("Q4 Growth Strategy Implementation");

    // Load state from localStorage on mount
    useEffect(() => {
        const savedMode = localStorage.getItem("system-mode") as ScreenMode;
        const savedTeamId = localStorage.getItem("active-team-id");
        if (savedMode) setMode(savedMode);
        if (savedTeamId) setActiveTeamId(savedTeamId);
    }, []);

    const activeTeam = activeTeamId ? TEAMS.find(t => t.id === activeTeamId) || null : null;

    const switchToTeamMode = (teamId: string) => {
        setMode("TEAM");
        setActiveTeamId(teamId);
        localStorage.setItem("system-mode", "TEAM");
        localStorage.setItem("active-team-id", teamId);
    };

    const switchToAdminMode = (pin: string): boolean => {
        // Mock PIN validation - 1234
        if (pin === "1234") {
            setMode("ADMIN");
            setActiveTeamId(null);
            localStorage.setItem("system-mode", "ADMIN");
            localStorage.removeItem("active-team-id");
            return true;
        }
        return false;
    };

    const getTeamFromPath = (pathname: string): Team | null => {
        if (pathname.includes("/sales")) return TEAMS.find(t => t.id === "sales") || null;
        if (pathname.includes("/marketing") || pathname.includes("/ads") || pathname.includes("/creatives")) return TEAMS.find(t => t.id === "marketing") || null; // Mapping multiple paths to marketing for now, or split if needed
        if (pathname.includes("/product-research")) return TEAMS.find(t => t.id === "research") || null;
        return null;
    };

    return (
        <ModeContext.Provider value={{
            mode,
            activeTeam,
            sessionObjective,
            setSessionObjective,
            switchToTeamMode,
            switchToAdminMode,
            getTeamFromPath,
            isAdmin: mode === "ADMIN"
        }}>
            {children}
        </ModeContext.Provider>
    );
}

export function useMode() {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error("useMode must be used within a ModeProvider");
    }
    return context;
}
