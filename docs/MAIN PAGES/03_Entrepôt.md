# Entrepôt

## Page Overview

Hub de gestion des stocks, fournisseurs et imports. Centralise la vue de l'inventaire avec score IA, les alertes de réapprovisionnement, la gestion multi-sites avec synchronisation transporteurs, et les outils d'import depuis la Chine.

**Route**: `/stock`  
**Fichier Principal**: `src/app/stock/page.tsx`

## Tabs List

| Tab Name | Features | Description | Purpose | Status |
|----------|----------|-------------|---------|--------|
| État du Stock | AI Inventory Score, Product Operations, Stock KPIs, Stock Value | Vue globale de l'inventaire avec score IA, opérations produits en split view, et indicateurs clés (total produits, valeur, stock faible, ruptures). | Avoir une vision complète et intelligente de l'état du stock | Active |
| Alertes & Mouvements | Low Stock Alerts, Stock Movements History, AI Reorder Suggestions | Alertes de stock faible par urgence, historique complet des mouvements (entrées/sorties/ajustements), et suggestions IA de réapprovisionnement. | Anticiper les ruptures et tracer tous les mouvements de stock | Active |
| Sites & Retours | Stock Locations, Carrier Stock Sync, Returns Tracking | Gestion multi-sites (entrepôt + transporteurs), synchronisation des stocks avec Yalidine/Maystro/ZR-Express, et suivi des retours clients. | Gérer les stocks répartis et le cycle des retours | Active |
| Fournisseurs & Import | Supplier Database, China Import Service, Import Budget Tracker | Base de données fournisseurs, service d'import Chine avec suivi douane, et tracker de budget import avec analyse des coûts. | Sourcer et importer efficacement depuis l'étranger | Active |
