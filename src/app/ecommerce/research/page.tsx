"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect to consolidated Product Research page
export default function ResearchRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/product-research");
    }, [router]);

    return (
        <div className="p-6 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <p className="text-muted-foreground">Redirecting to Product Research...</p>
            </div>
        </div>
    );
}
