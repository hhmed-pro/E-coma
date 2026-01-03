"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/core/ui/table";
import { Badge } from "@/components/core/ui/badge";
import { ExternalLink, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LandingPage {
    id?: string;
    title?: string;
    url: string;
    visitors?: number;
    visits?: number;
    bounceRate?: number;
    conversions: number;
    conversionRate?: number;
}

interface TopLandingPagesProps {
    /** Landing pages data - uses mock data if not provided */
    pages?: LandingPage[];
    /** Show bounce rate column */
    showBounceRate?: boolean;
    /** Show title column */
    showTitle?: boolean;
    /** Show rank numbers */
    showRank?: boolean;
    /** Locale for labels */
    locale?: 'en' | 'fr';
    /** Additional className */
    className?: string;
}

// Mock data for when no pages are provided
const MOCK_PAGES: LandingPage[] = [
    { id: '1', url: '/products/ecouteurs-pro', visits: 12500, conversions: 450, conversionRate: 3.6 },
    { id: '2', url: '/products/montre-sport', visits: 8900, conversions: 320, conversionRate: 3.5 },
    { id: '3', url: '/collections/promo-ete', visits: 15600, conversions: 480, conversionRate: 3.0 },
    { id: '4', url: '/products/ventilateur', visits: 6200, conversions: 210, conversionRate: 3.3 },
    { id: '5', url: '/bundles/pack-tech', visits: 4500, conversions: 180, conversionRate: 4.0 },
];

const STRINGS = {
    en: {
        title: 'Top Landing Pages',
        pageUrl: 'Page URL',
        page: 'Page',
        visitors: 'Visitors',
        visits: 'Visits',
        bounceRate: 'Bounce Rate',
        conversions: 'Conversions',
        convRate: 'Conv. Rate'
    },
    fr: {
        title: 'Meilleurs Landing Pages',
        pageUrl: 'Page URL',
        page: 'Page',
        visitors: 'Visiteurs',
        visits: 'Visites',
        bounceRate: 'Taux Rebond',
        conversions: 'Conversions',
        convRate: 'Taux Conv.'
    }
};

/**
 * TopLandingPages Component
 * 
 * Consolidated from:
 * - components/analytics/TopLandingPages.tsx (mock data, basic)
 * - components/marketing/traffic/TopLandingPages.tsx (props-based, bounce rate)
 */
export function TopLandingPages({
    pages,
    showBounceRate = false,
    showTitle = false,
    showRank = false,
    locale = 'fr',
    className
}: TopLandingPagesProps) {
    const t = STRINGS[locale];
    const displayPages = pages || MOCK_PAGES;

    return (
        <Card className={cn("h-full", className)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5 text-indigo-600" />
                    {t.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{showTitle ? t.page : t.pageUrl}</TableHead>
                            <TableHead className="text-right">
                                {displayPages[0]?.visitors !== undefined ? t.visitors : t.visits}
                            </TableHead>
                            {showBounceRate && (
                                <TableHead className="text-right">{t.bounceRate}</TableHead>
                            )}
                            <TableHead className="text-right">{t.conversions}</TableHead>
                            {displayPages[0]?.conversionRate !== undefined && (
                                <TableHead className="text-right">{t.convRate}</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayPages.map((page, index) => (
                            <TableRow key={page.id || page.url}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {showRank && (
                                            <span className="text-muted-foreground text-sm w-6">
                                                {index + 1}.
                                            </span>
                                        )}
                                        <div>
                                            {showTitle && page.title && (
                                                <p className="font-medium truncate max-w-[200px]">
                                                    {page.title}
                                                </p>
                                            )}
                                            <p className={cn(
                                                "truncate max-w-[200px]",
                                                showTitle && page.title
                                                    ? "text-xs text-muted-foreground"
                                                    : "font-medium"
                                            )}>
                                                {page.url}
                                            </p>
                                        </div>
                                        {!showTitle && (
                                            <ExternalLink className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    {(page.visitors || page.visits || 0).toLocaleString()}
                                </TableCell>
                                {showBounceRate && page.bounceRate !== undefined && (
                                    <TableCell className="text-right">
                                        <Badge variant={page.bounceRate > 50 ? 'destructive' : 'secondary'}>
                                            {page.bounceRate}%
                                        </Badge>
                                    </TableCell>
                                )}
                                <TableCell className="text-right font-medium text-green-600">
                                    {page.conversions}
                                </TableCell>
                                {page.conversionRate !== undefined && (
                                    <TableCell className="text-right text-green-600 font-medium">
                                        {page.conversionRate}%
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default TopLandingPages;
