import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Social Media Content - E-coma",
    description: "Content Creation, Scheduling & Engagement across All Platforms",
};

export default function SocialLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}
