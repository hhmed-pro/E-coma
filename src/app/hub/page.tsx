"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Feature configuration based on provided assets
import { HUB_CATEGORIES, PageInfo } from "@/config/hub-config";

// Flatten all pages from categories for the grid view
const ALL_PAGES = HUB_CATEGORIES.flatMap(category =>
    category.pages.map(page => ({
        ...page,
        categoryId: category.id,
        categoryColor: category.textColor // Use category color theme if needed
    }))
);

export default function HubPage() {
    return (
        <div className="h-screen w-full bg-background text-foreground font-body p-6 md:p-10 transition-colors duration-300 overflow-y-auto scrollbar-thin">
            <div className="max-w-7xl mx-auto space-y-12 pb-20">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20">
                            <Sparkles className="w-4 h-4" />
                            <span>Control Center</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-primary">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl font-light">
                            Manage your entire operation from one central hub. Access analytics, marketing, and inventory tools instantly.
                        </p>
                    </div>
                </header>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_PAGES.map((page, idx) => (
                        <Link
                            key={page.href}
                            href={page.href}
                            className={cn(
                                "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                                "hover:shadow-lg hover:scale-[1.01] hover:border-primary/50",
                                page.name === "Business Analytics" && "md:col-span-2 lg:col-span-2", // Highlight Business Analytics
                                "animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                            )}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Image Container */}
                            <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
                                {page.image ? (
                                    <Image
                                        src={page.image}
                                        alt={page.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                                        <Sparkles className="w-12 h-12 text-muted-foreground/50" />
                                    </div>
                                )}
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <h3 className="text-2xl font-heading font-bold mb-1 drop-shadow-md">
                                        {page.name}
                                    </h3>
                                    {/* Feature Clusters (SubTabs) Display */}
                                    {page.subTabs && page.subTabs.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {page.subTabs.map((tab, i) => (
                                                <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white/90 border border-white/10">
                                                    {tab.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                                <div className="space-y-3">
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {page.description}
                                    </p>

                                    {/* Problem → Solution Display */}
                                    {page.problemSolution && (
                                        <div className="space-y-2 pt-2 border-t border-border/50">
                                            <div className="flex items-start gap-2">
                                                <span className="text-red-500/80 text-xs font-bold shrink-0">⚡</span>
                                                <p className="text-xs text-muted-foreground/80 leading-relaxed">
                                                    {page.problemSolution.problem}
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-green-500/80 text-xs font-bold shrink-0">✓</span>
                                                <p className="text-xs text-primary/80 leading-relaxed font-medium">
                                                    {page.problemSolution.solution}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <span className={cn(
                                        "text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary/5 border border-secondary/10 uppercase tracking-wider",
                                        "text-foreground/70"
                                    )}>
                                        Launch App
                                    </span>
                                    <div className={cn(
                                        "p-2 rounded-full transition-all duration-300",
                                        "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                                    )}>
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer / Additional Info */}
                <div className="pt-10 border-t border-border mt-10 text-center">
                    <p className="text-muted-foreground text-sm">
                        Need assistance? <Link href="/admin/help" className="text-primary font-medium hover:underline">Visit the Help Center</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
