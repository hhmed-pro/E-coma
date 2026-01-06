# Trafic & Tunnel (Tab)

> **Navigation Hint**: This feature maps to the **Growth Zone** (Ads Manager).
> See: [`Side_bar_navigation/Growth/01_AdsManager.md`](../../Side_bar_navigation/Growth/01_AdsManager.md)

**Parent Page**: Gestionnaire Pubs  
**Route**: `/ads` (Tab: trafic-tunnel)  
**Fichier Tab**: `src/app/ads/_components/tabs/TraficTunnelTab.tsx`

## Tab Overview

Analyse approfondie du trafic et du parcours de conversion. Métriques de trafic par source, visualisation du tunnel de conversion étape par étape, et performance des pages d'atterrissage.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Traffic Analytics <br>*(Integrated)* | Analyse du trafic par source: visiteurs, sessions, pages vues, temps sur site, taux de rebond. Breakdown par campagne et par device. Graphiques d'évolution. | Comprendre d'où vient le trafic et sa qualité | Active | Inline Component |
| Conversion Funnel <br>*(Integrated)* | Tunnel de conversion visuel: Clic pub → Visite LP → Ajout panier → Checkout → Commande → Confirmation → Livraison. Taux de passage et abandons à chaque étape. | Identifier les points de friction dans le parcours | Active | Inline Funnel Component |
| Landing Page Performance <br>*(Integrated)* | Tableau de performance des pages: URL, visites, taux de conversion, temps moyen, taux de rebond. Tri par performance. Identification des pages à optimiser. | Optimiser les pages d'atterrissage | Active | Inline Table |
| Drop-off Analysis <br>*(Integrated)* | Analyse des abandons: où les utilisateurs quittent, raisons probables (temps de chargement, prix, formulaire), suggestions d'amélioration. | Réduire les abandons à chaque étape | Active | Inline Component |
| A/B Test Results <br>*(Integrated)* | Résultats des tests A/B en cours: variante A vs B, métriques comparées, gagnant statistique, recommandation. | Prendre des décisions basées sur les données | Active | Inline Component |
| Heatmap Integration <br>*(Integrated)* | Lien vers les heatmaps et recordings de session (si intégration Hotjar/MS Clarity active). Vue comportementale des visiteurs. | Comprendre le comportement utilisateur visuel | Active | External Link |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| TraficTunnelTab | `src/app/ads/_components/tabs/TraficTunnelTab.tsx` | Conteneur principal de l'onglet |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le tunnel inclut les étapes post-achat (confirmation, livraison) cruciales pour le marché COD algérien.
