# Vue d'Ensemble (Tab)

> **Navigation Hint**: This feature maps to the **Command Zone** (Finance & Insights).
> See: [`Side_bar_navigation/Command/01_Finance.md`](../../Side_bar_navigation/Command/01_Finance.md)

**Parent Page**: Tableau de Bord  
**Route**: `/analytics` (Tab: vue-ensemble)  
**Fichier Tab**: `src/app/analytics/_components/tabs/VueEnsembleTab.tsx`

## Tab Overview

Dashboard principal de performance avec vue globale des KPIs business. Affiche les revenus totaux, bénéfices nets, total commandes et panier moyen. Inclut l'analyse des méthodes de paiement, le calculateur IFU pour la fiscalité algérienne, et le suivi des gains créateurs/affiliés.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Revenue KPI Cards <br>*(Integrated)* | 4 cartes KPI colorées: Revenus Total (145,230 DA, +12%), Bénéfice Net (42,150 DA, +8%), Total Commandes (1,247, +15%), Panier Moyen (8,450 DA, -3%). Avec indicateurs de tendance. | Vue instantanée de la performance financière | Active | Inline KPI Cards |
| Payment Method Analytics <br>*(Integrated)* | Analyse détaillée des paiements: répartition COD vs paiement en ligne, frais COD (12,450 DA), taux par méthode. Visualisation graphique. | Comprendre l'impact des méthodes de paiement sur la rentabilité | Active | PaymentMethodAnalytics.tsx |
| IFU Calculator <br>*(Integrated)* | Calculateur fiscal algérien pour estimer les taxes IFU selon le régime (forfaitaire, réel simplifié, réel). Calcul automatique selon le CA. | Prévoir les obligations fiscales et optimiser la structure | Active | IFUCalculator.tsx |
| Creator Earnings <br>*(Integrated)* | Suivi des gains des créateurs de contenu et affiliés. Répartition par créateur, commissions dues, et paiements en attente. | Gérer la rémunération des partenaires marketing | Active | CreatorEarnings.tsx |
| Revenue/Profit Chart <br>*(Integrated)* | Graphique comparatif revenus vs bénéfices sur période sélectionnable. Courbes avec code couleur et tendances. | Visualiser l'évolution de la rentabilité dans le temps | Active | RevenueProfitChart.tsx |
| Orders Chart <br>*(Integrated)* | Graphique détaillé des commandes avec breakdown par statut (confirmées, expédiées, livrées, retournées). | Suivre le flux des commandes et les taux de succès | Active | OrdersChart.tsx |
| Date Range Picker <br>*(Integrated)* | Sélecteur de période avec presets (Aujourd'hui, 7j, 30j, Ce mois, Mois dernier) et sélection personnalisée. | Filtrer les données sur n'importe quelle période | Active | DateRangePicker |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| VueEnsembleTab | `src/app/analytics/_components/tabs/VueEnsembleTab.tsx` | Conteneur principal de l'onglet |
| PaymentMethodAnalytics | `src/app/analytics/_components/PaymentMethodAnalytics.tsx` | Analyse des méthodes de paiement |
| IFUCalculator | `src/app/analytics/_components/IFUCalculator.tsx` | Calculateur taxe IFU Algérie |
| CreatorEarnings | `src/app/analytics/_components/CreatorEarnings.tsx` | Suivi gains créateurs |
| RevenueProfitChart | `src/app/analytics/_components/RevenueProfitChart.tsx` | Graphique revenus/profits |
| OrdersChart | `src/app/analytics/_components/OrdersChart.tsx` | Graphique des commandes |
| DateRangePicker | `src/components/core/ui/date-range-picker.tsx` | Sélecteur de dates |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le calculateur IFU est spécifique à la fiscalité algérienne avec les régimes locaux.
