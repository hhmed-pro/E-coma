# Recherche & Tendances (Tab)

> **Navigation Hint**: This feature maps to the **Command Zone** (Sourcing).
> See: [`Side_bar_navigation/Command/02_Sourcing.md`](../../Side_bar_navigation/Command/02_Sourcing.md)

**Parent Page**: Découverte Produits  
**Route**: `/product-research` (Tab: recherche-tendances)  
**Fichier Tab**: `src/app/product-research/_components/tabs/RechercheTendancesTab.tsx`

## Tab Overview

Onglet principal de découverte produits. Affiche les KPIs de performance produits, moteur de recherche multi-plateformes avec scraping d'URL, score IA de potentiel gagnant, tendances des bestsellers et dashboard de suivi des produits d'intérêt.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Product KPIs <br>*(Integrated)* | 4 métriques clés: Vues Produits (45,200, +18%), Ajouts Panier (12,800, +12%), Taux Conversion (3.2%, +0.5%), Valeur Moy. Commande (8,450 DA, -3%). Cartes avec indicateurs de tendance. | Comprendre la performance globale du catalogue | Active | Inline KPI Cards |
| Product Search Engine <br>*(Integrated)* | Moteur de découverte multi-plateformes: recherche par mot-clé ou scraping d'URL (AliExpress, Amazon, Alibaba, Temu). Affiche produits avec prix, notes, ventes estimées. | Trouver des produits depuis n'importe quelle source | Active | ProductSearch.tsx |
| AI Winning Score <br>*(Integrated)* | Score IA évaluant le potentiel gagnant d'un produit sur 100: demande de marché, concurrence, marge potentielle, facilité de sourcing, potentiel viral. Avec recommandations. | Évaluer objectivement si un produit vaut l'investissement | Active | WinningProductAiScore.tsx |
| Bestseller Trends <br>*(Integrated)* | Liste des 5 produits les plus vendus avec: nom, ventes ce mois vs mois précédent, tendance %, panier moyen. Code couleur tendance (vert positif, rouge négatif). | Identifier les produits qui fonctionnent pour réplication | Active | Inline Trend List |
| Tracker Dashboard <br>*(Integrated)* | Tableau de suivi des produits d'intérêt: ajout de produits à surveiller, suivi des prix, stock fournisseur, nouvelles concurrentes. Alertes configurables. | Suivre les produits potentiels avant décision d'achat | Active | TrackerDashboard.tsx |
| URL Scraping <br>*(Integrated)* | Extraction automatique des infos produit depuis une URL: images, description, prix, variantes, avis. Support AliExpress, Amazon, Alibaba. | Récupérer les données produit sans saisie manuelle | Active | Integrated in ProductSearch |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| RechercheTendancesTab | `src/app/product-research/_components/tabs/RechercheTendancesTab.tsx` | Conteneur principal de l'onglet |
| ProductSearch | `src/app/ecommerce/_components/research/ProductSearch.tsx` | Moteur de recherche produits |
| WinningProductAiScore | `src/app/ecommerce/_components/research/WinningProductAiScore.tsx` | Score IA potentiel gagnant |
| TrackerDashboard | `src/app/ecommerce/_components/research/TrackerDashboard.tsx` | Suivi produits d'intérêt |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le score IA utilise des données de marché et des signaux sociaux pour évaluer le potentiel.
