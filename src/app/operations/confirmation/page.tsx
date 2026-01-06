/**
 * Zone 1: Operations - Confirmation Route
 * Route: /operations/confirmation
 * Imports from: @/views/Operations/ConfirmationCommand/page
 */

import ConfirmationCommandPage from "@/views/Operations/ConfirmationCommand/page";

export default function OperationsConfirmationPage() {
    return <ConfirmationCommandPage />;
}

export const metadata = {
    title: "Confirmation Center | E-Coma",
    description: "مركز التأكيد - Single Pane of Glass for order confirmation",
};
