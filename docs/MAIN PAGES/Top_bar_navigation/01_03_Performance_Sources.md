# Performance Sources (Tab)

> **Navigation Hint**: This feature maps to the **Operations Zone** (Confirmation Center).
> See: [`Side_bar_navigation/Operations/01_Confirmation.md`](../../Side_bar_navigation/Operations/01_Confirmation.md)

**Parent Page**: Centre de Confirmation  
**Route**: `/operations/confirmation` (Tab: performance-sources)  
**Fichier Tab**: `src/views/Operations/ConfirmationCommand/FilteringCalling/order-charts.tsx`

## Tab Overview

Onglet d'analyse des performances commerciales. Visualise le volume des commandes, les taux de retour par produit, l'attribution des sources de trafic (Facebook, Instagram, TikTok, WhatsApp) et le tunnel de conversion. Permet de synchroniser les conversions offline vers les plateformes publicitaires.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Orders Volume Chart <br>*(Integrated)* | Graphique interactif affichant l'évolution des commandes sur une période sélectionnable (7j, 30j, 90j). Avec comparaison période précédente. | Suivre les tendances de volume et identifier les pics/creux | Active | OrdersChart.tsx |
| Product Return Rates <br>*(Integrated)* | Tableau des produits avec le plus de retours: nom produit, quantité vendue, quantité retournée, taux de retour %, raison principale. Code couleur par gravité. | Identifier les produits problématiques pour action corrective | Active | Inline Table |
| Traffic Sources Analysis <br>*(Integrated)* | Répartition des commandes par source: Facebook Ads (40%), Instagram Organic (30%), TikTok Ads (20%), WhatsApp Referral, Direct. Avec nombre de visiteurs, commandes et taux de conversion. | Comprendre quels canaux génèrent le plus de conversions | Active | Inline Component |
| Source Distribution Chart <br>*(Integrated)* | Visualisation en barres horizontales de la répartition des sources avec codes couleur par plateforme et pourcentage. | Vue rapide de la distribution des sources de commandes | Active | Inline Chart |
| Conversion Funnel <br>*(Integrated)* | Tunnel de conversion montrant: Visiteurs → Ajouts panier → Commandes → Confirmées → Livrées. Avec taux de passage entre chaque étape. | Identifier les points de friction dans le parcours client | Active | LifecycleFunnel.tsx |
| Offline Conversion Sync <br>*(Integrated)* | Synchronisation des événements de conversion (confirmations, livraisons) vers Facebook CAPI, Google Ads, TikTok. Pour améliorer l'optimisation des campagnes. | Améliorer le ROAS en envoyant les conversions réelles aux plateformes | Active | OfflineConversionSync.tsx |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| PerformanceSourcesTab | `src/app/sales-dashboard/_components/tabs/PerformanceSourcesTab.tsx` | Conteneur principal de l'onglet |
| OrdersChart | `src/app/analytics/_components/OrdersChart.tsx` | Graphique évolution commandes |
| LifecycleFunnel | `src/app/analytics/_components/charts/lifecycle-funnel.tsx` | Tunnel de conversion visuel |
| OfflineConversionSync | `src/app/sales-dashboard/_components/OfflineConversionSync.tsx` | Sync conversions vers plateformes |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible pour features |

> **Note**: Les données de sources sont alimentées par l'intégration avec Meta Pixel, TikTok Pixel et Google Analytics.
