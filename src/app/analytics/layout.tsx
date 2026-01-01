import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Business Analytics - E-coma",
    description: "Complete business performance overview",
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
