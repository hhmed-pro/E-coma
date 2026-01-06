/**
 * Zone 3: Command - Finance Route
 * Route: /command/finance
 * Imports from: @/views/Command/Finance/page
 */

import FinancePage from "@/views/Command/Finance/page";

export default function CommandFinancePage() {
    return <FinancePage />;
}

export const metadata = {
    title: "Finance & Insights | E-Coma",
    description: "المالية - Track real cash, not theoretical revenue",
};
