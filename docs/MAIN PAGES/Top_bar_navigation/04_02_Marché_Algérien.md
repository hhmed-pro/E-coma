# Marché Algérien (Tab)

> **Navigation Hint**: This feature maps to the **Command Zone** (Sourcing).
> See: [`Side_bar_navigation/Command/02_Sourcing.md`](../../Side_bar_navigation/Command/02_Sourcing.md)

**Parent Page**: Découverte Produits  
**Route**: `/product-research` (Tab: marche-algerien)  
**Fichier Tab**: `src/app/product-research/_components/tabs/MarcheAlgerienTab.tsx`

## Tab Overview

Analyse des tendances spécifiques au marché algérien. Identifie les produits qui fonctionnent localement, les publicités performantes en DZ, les niches en croissance et la demande locale par catégorie.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Algeria Trends <br>*(Integrated)* | Produits tendances sur le marché algérien avec volume de recherche, croissance, et niveau de concurrence. Données issues des marketplaces locales et réseaux sociaux DZ. | Identifier ce qui marche spécifiquement en Algérie | Active | Inline Component |
| Trending Ads DZ <br>*(Integrated)* | Galerie des publicités performantes en Algérie: visuels, accroches, produits. Filtrable par plateforme (Facebook DZ, Instagram DZ, TikTok DZ). Métriques d'engagement. | S'inspirer des créatives qui convertissent localement | Active | Inline Component |
| Niche Topics <br>*(Integrated)* | Liste des niches en croissance en Algérie: catégorie, taux de croissance, niveau de saturation, recommandation. Ex: Organisation maison (+45%, faible concurrence). | Trouver des opportunités de marché moins saturées | Active | Inline Component |
| Local Demand Analysis <br>*(Integrated)* | Analyse de la demande par wilaya et saison. Cartographie des préférences régionales et pics saisonniers (Ramadan, Rentrée, Été). | Adapter l'offre aux spécificités régionales et temporelles | Active | Inline Component |
| DZ Price Benchmarking <br>*(Integrated)* | Comparaison des prix pratiqués en Algérie vs prix aliexpress + landed cost. Indication de la marge possible sur le marché local. | Évaluer la viabilité économique avant import | Active | Inline Component |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| MarcheAlgerienTab | `src/app/product-research/_components/tabs/MarcheAlgerienTab.tsx` | Conteneur principal de l'onglet |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les données du marché algérien sont agrégées depuis les réseaux sociaux locaux et les marketplaces DZ.
