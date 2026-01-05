# Campagnes & ROAS (Tab)

**Parent Page**: Gestionnaire Pubs  
**Route**: `/ads` (Tab: campagnes-roas)  
**Fichier Tab**: `src/app/ads/_components/tabs/CampagnesROASTab.tsx`

## Tab Overview

Interface principale de gestion des campagnes publicitaires. Vue split avec liste des campagnes et détails sélectionnés, KPIs globaux (ROAS, dépenses, revenus), toggle taux officiel/réel pour les coûts, et notation IA des campagnes.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Data Mode Toggle | Basculement entre Taux Officiel et Coût Réel (+79% avec taux parallèle). Recalcule automatiquement tous les indicateurs pour refléter le vrai coût en DZD. | Avoir une vision réaliste des coûts publicitaires | Active | Inline Toggle |
| Global KPIs | 5 indicateurs clés: ROAS Global (3.6x, +9%), Dépenses Totales (163,500 DA, +11%), Revenus Totaux (582,900 DA, +14%), Campagnes Actives (12, +2), Taux Livraison (80%). | Vue d'ensemble de la performance publicitaire | Active | Inline KPI Cards + DeliveryRateKPI |
| Campaign List | Liste des campagnes avec recherche: nom, statut (Actif/Pause/Brouillon), dépense, ROAS, notation IA (0-100). Cartes cliquables pour sélection. Code couleur par statut. | Naviguer rapidement entre les campagnes | Active | Inline Campaign Cards |
| Campaign Details Panel | Panneau de détails de la campagne sélectionnée: nom, plateforme, statut, métriques (Impressions, CTR, Conversions, Taux Livraison), revenus. Boutons Éditer et Pause/Reprendre. | Analyser en profondeur une campagne spécifique | Active | Inline Detail Panel |
| AI Campaign Rating | Score IA de 0-100 pour chaque campagne basé sur: ROAS, CTR, coût par conversion, tendance. Badge coloré (vert >80, orange 60-80, rouge <60). | Identifier rapidement les campagnes performantes/problématiques | Active | Integrated in Campaign Cards |
| Delivery Rate KPI | Indicateur spécifique du taux de livraison (commandes livrées/commandes totales). Crucial en Algérie où le ROAS pub ne reflète pas la rentabilité réelle sans livraison. | Mesurer la vraie performance jusqu'à la livraison | Active | DeliveryRateKPI.tsx |
| Platform Filter | Filtrage des campagnes par plateforme: Facebook, Instagram, TikTok, Google. Multi-sélection possible. | Analyser par plateforme publicitaire | Active | Integrated in Search |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| CampagnesROASTab | `src/app/ads/_components/tabs/CampagnesROASTab.tsx` | Conteneur principal de l'onglet |
| DeliveryRateKPI | `src/app/ads/_components/DeliveryRateKPI.tsx` | KPI taux de livraison |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le toggle Taux Officiel/Réel prend en compte le différentiel EUR/DZD sur le marché parallèle.
