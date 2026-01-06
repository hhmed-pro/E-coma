# Livraison & Wilayas (Tab)

> **Navigation Hint**: This feature maps to the **Command Zone** (Finance & Insights).
> See: [`Side_bar_navigation/Command/01_Finance.md`](../../Side_bar_navigation/Command/01_Finance.md)

**Parent Page**: Tableau de Bord  
**Route**: `/analytics` (Tab: livraison-wilayas)  
**Fichier Tab**: `src/app/analytics/_components/tabs/LivraisonWilayasTab.tsx`

## Tab Overview

Vue géographique complète de la performance logistique. Compare les transporteurs algériens, affiche une carte thermique des wilayas par volume de commandes, et analyse les revenus par région (Nord, Centre, Est, Sud).

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Carrier Comparison <br>*(Integrated)* | Tableau comparatif des transporteurs: Yalidine, Maystro, ZR-Express. Métriques: tarifs, délais moyens, taux de livraison, zones couvertes. Avec données financières optionnelles. | Choisir le meilleur transporteur selon les critères | Active | CarrierComparison.tsx |
| Wilaya Heatmap <br>*(Integrated)* | Carte interactive de l'Algérie avec heatmap des commandes par wilaya. Couleurs selon le volume. Drill-down au clic pour détails. | Visualiser la distribution géographique des ventes | Active | WilayaHeatmap.tsx |
| Regional Revenue <br>*(Integrated)* | Breakdown des revenus par région: Nord (62%, 89,500 DA, 782 commandes), Centre (22%), Est (10%), Sud (6%). Barres de progression visuelles. | Identifier les régions les plus rentables | Active | Inline Component |
| Carrier API Health <br>*(Not Implemented)* | Monitoring en temps réel des API transporteurs: Yalidine (connecté, 45ms), Maystro (connecté, 62ms), ZR-Express (déconnecté). Latence et statut. | Surveiller la disponibilité des intégrations transporteurs | Coming Soon | Placeholder Card |
| Average Delivery Time <br>*(Not Implemented)* | Indicateur du délai moyen de livraison national (2.4 jours) avec comparaison par région et transporteur. | Suivre et améliorer les délais de livraison | Coming Soon | Placeholder Card |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| LivraisonWilayasTab | `src/app/analytics/_components/tabs/LivraisonWilayasTab.tsx` | Conteneur principal de l'onglet |
| CarrierComparison | `src/app/ecommerce/_components/inventory/CarrierComparison.tsx` | Comparaison transporteurs |
| WilayaHeatmap | `src/app/ecommerce/_components/delivery/wilaya-heatmap.tsx` | Carte thermique wilayas |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: La carte des wilayas couvre les 58 wilayas d'Algérie avec données générées dynamiquement.
