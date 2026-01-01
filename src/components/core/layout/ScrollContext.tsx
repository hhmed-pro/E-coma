"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ScrollContextType {
    isScrolled: boolean;
    scrollY: number;
}

const ScrollContext = createContext<ScrollContextType>({ isScrolled: false, scrollY: 0 });

export function useScroll() {
    return useContext(ScrollContext);
}

interface ScrollProviderProps {
    children: ReactNode;
    threshold?: number;
}

export function ScrollProvider({ children, threshold = 100 }: ScrollProviderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > threshold);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return (
        <ScrollContext.Provider value={{ isScrolled, scrollY }}>
            {children}
        </ScrollContext.Provider>
    );
}
