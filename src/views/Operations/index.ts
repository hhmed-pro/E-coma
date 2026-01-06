// Zone 1: Operations - Barrel Export
export { default as ConfirmationCommandPage } from "./ConfirmationCommand/page";

// FilteringCalling components
export { default as ReturnRiskCalculator } from "./ConfirmationCommand/FilteringCalling/ReturnRiskCalculator";
export { CallCenterScripts } from "./ConfirmationCommand/FilteringCalling/CallCenterScripts";
export { default as OrdersAiScores } from "./ConfirmationCommand/FilteringCalling/OrdersAiScores";
export { default as PreOrdersQueue } from "./ConfirmationCommand/FilteringCalling/PreOrdersQueue";

// Shipping components
export { default as ShipmentTracker } from "./LogisticsRecovery/Shipping/ShipmentTracker";
export { default as CarrierComparison } from "./LogisticsRecovery/Shipping/CarrierComparison";
export { default as DeliveryCompaniesHub } from "./LogisticsRecovery/Shipping/DeliveryCompaniesHub";

// Inventory components
export { default as StockOverview } from "./LogisticsRecovery/Inventory/StockOverview";
export { default as LowStockAlerts } from "./LogisticsRecovery/Inventory/LowStockAlerts";
export { default as CarrierStockSync } from "./LogisticsRecovery/Inventory/CarrierStockSync";
