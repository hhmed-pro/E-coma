# État du Stock (Tab)

**Parent Page**: Entrepôt  
**Route**: `/stock` (Tab: etat-stock)  
**Fichier Tab**: `src/app/stock/_components/tabs/EtatStockTab.tsx`

## Tab Overview

Vue d'ensemble de l'inventaire avec KPIs, score IA de santé du stock et interface split view pour la gestion des produits. Affiche les tendances des bestsellers, les taux de retour et permet les opérations courantes sur les produits.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Stock KPI Cards | 4 KPIs principaux: Total Produits (156), Valeur Stock (2,450,000 DA, +5%), Stock Faible (8 à réapprovisionner), Rupture Stock (2 urgents). Cartes colorées par statut. | Vue instantanée de la santé du stock | Active | Inline KPI Cards |
| AI Inventory Score | Score IA de santé de l'inventaire analysant: diversification produits, rotation stock, taux de retour, bestsellers. Recommendations automatiques avec score global. | Évaluation intelligente de la performance du stock | Active | InventoryAiScore.tsx |
| Product Operations Split View | Interface en deux panneaux: liste des produits (filtrable, triable) à gauche, détails/actions produit à droite. Affiche SKU, prix, stock local/transporteur, variantes, statut. | Gérer les produits efficacement dans une interface ergonomique | Active | InventorySplitView.tsx |
| Stock Value Tracking | Suivi de la valeur totale du stock avec évolution mensuelle et breakdown par catégorie de produits. | Monitorer l'investissement en inventaire | Active | Integrated in KPIs |
| Bestseller Trends | Liste des produits les plus vendus avec: nom, ventes ce mois, mois précédent, tendance %, valeur moyenne commande. | Identifier les produits stars pour réapprovisionner en priorité | Active | Inline in InventoryAiScore |
| Low Stock Indicator | Badge visuel sur chaque produit indiquant le niveau de stock: vert (OK), orange (faible), rouge (critique/rupture). | Repérer visuellement les produits à réapprovisionner | Active | Integrated in ProductCard |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| EtatStockTab | `src/app/stock/_components/tabs/EtatStockTab.tsx` | Conteneur principal de l'onglet |
| InventoryAiScore | `src/app/ecommerce/_components/inventory/InventoryAiScore.tsx` | Score IA inventaire |
| InventorySplitView | `src/app/ecommerce/_components/inventory/InventorySplitView.tsx` | Vue split produits |
| ProductCard | `src/app/ecommerce/_components/inventory/ProductCard.tsx` | Carte produit individuelle |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les produits affichent le stock local ET le stock chez chaque transporteur (Yalidine, Maystro, etc.).
