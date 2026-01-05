# Finance & Rentabilité (Tab)

**Parent Page**: Tableau de Bord  
**Route**: `/analytics` (Tab: finance-rentabilite)  
**Fichier Tab**: `src/app/analytics/_components/tabs/FinanceRentabiliteTab.tsx`

## Tab Overview

Suite d'outils financiers avancés pour maximiser la rentabilité. Calculateur de profit détaillé, analyse ROAS multi-plateforme, répartition des coûts, collecteur de paiements COD et suivi des taux de change.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Profit Calculator | Calculateur de bénéfice complet: prix de vente, coût produit, frais livraison, frais pub, emballage. Calcul automatique de la marge brute et nette. Simulation de scénarios. | Calculer précisément la rentabilité de chaque produit/commande | Active | ProfitCalculator.tsx |
| ROAS Analyzer | Analyse du Return On Ad Spend par plateforme: Global (2.8x), Facebook (3.2x), Instagram (2.4x), TikTok (2.1x). Avec seuil de rentabilité (1.5x). | Mesurer et optimiser l'efficacité des dépenses publicitaires | Coming Soon | Placeholder Card |
| Cost Breakdown | Répartition visuelle des coûts: Produits (35%, 45,230 DA), Livraison (22%), Publicités (28%), Emballage (10%), Autres (5%). Barres colorées par catégorie. | Identifier où va l'argent pour optimiser les dépenses | Active | Inline Component |
| Cash Collector | Tableau de bord de collecte COD: suivi des montants en attente chez les transporteurs, âge des créances (7j, 14j, 30j+), actions de réclamation. | Récupérer l'argent COD rapidement et éviter les impayés | Active | CashCollector.tsx |
| Currency Tracker | Suivi des taux de change EUR/DZD (146.52, +0.35%) et USD/DZD (134.85, -0.12%) pour les imports. Actualisation et alertes. | Optimiser les achats en devise étrangère | Coming Soon | Placeholder Card |
| Pending COD by Age | Ventilation des COD en attente par ancienneté: 7 jours (45,200 DA, 34 commandes), 14 jours (28,500 DA), 30+ jours (12,800 DA - urgent). Code couleur par urgence. | Prioriser la collecte des COD les plus anciens | Active | Inline Component |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| FinanceRentabiliteTab | `src/app/analytics/_components/tabs/FinanceRentabiliteTab.tsx` | Conteneur principal de l'onglet |
| ProfitCalculator | `src/app/analytics/_components/ProfitCalculator.tsx` | Calculateur de profit détaillé |
| CashCollector | `src/app/analytics/_components/CashCollector.tsx` | Gestion collecte COD |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le Cash Collector s'intègre avec les API transporteurs pour récupérer les statuts de paiement.
