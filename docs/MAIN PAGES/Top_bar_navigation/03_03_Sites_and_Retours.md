# Sites & Retours (Tab)

> **Navigation Hint**: This feature maps to the **Operations Zone** (Logistics & Recovery).
> See: [`Side_bar_navigation/Operations/02_Logistics.md`](../../Side_bar_navigation/Operations/02_Logistics.md)

**Parent Page**: Entrepôt  
**Route**: `/stock` (Tab: sites-retours)  
**Fichier Tab**: `src/app/stock/_components/tabs/SitesRetoursTab.tsx`

## Tab Overview

Gestion des stocks multi-emplacements et cycle des retours. Visualise le stock réparti entre l'entrepôt principal et les hubs transporteurs, synchronise les niveaux en temps réel, et suit les retours clients de la réception au traitement.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Location Overview KPIs <br>*(Integrated)* | 4 indicateurs: Sites Actifs (4), Transporteurs (3), Retours en Cours (5), Taux Retour (8.2%). Vue globale de la distribution du stock. | Avoir une vision macro des emplacements et retours | Active | Inline KPI Cards |
| Stock by Location <br>*(Integrated)* | Tableau des emplacements: Entrepôt Principal (Alger, 450 unités, 1,250,000 DA), Yalidine Hub, Maystro Stock, ZR-Express. Statut sync (Local/Synchronisé/En attente). | Voir où est physiquement le stock | Active | Inline Location List |
| Carrier Stock Sync <br>*(Integrated)* | Interface de synchronisation bidirectionnelle avec les transporteurs. Push du stock vers les hubs, pull des niveaux actuels. Statut de dernière sync et bouton de sync manuelle. | Maintenir les stocks transporteurs à jour | Active | CarrierStockSync.tsx |
| Returns Tracking <br>*(Integrated)* | Liste des retours en cours: ID commande, produit, raison retour (Défectueux/Taille/Changement avis/Non conforme), statut (En transit/Reçu/En cours/Terminé), action prévue (Remboursement/Échange/Réintégration). | Suivre chaque retour jusqu'à résolution | Active | Inline Returns List |
| Return Status Badges <br>*(Integrated)* | Badges visuels par statut: Terminé (vert ✓), Reçu (bleu), En transit (orange), En cours (violet). Progression visuelle du traitement. | Identifier rapidement l'état des retours | Active | Integrated in List |
| Action Assignment <br>*(Integrated)* | Chaque retour a une action assignée: Remboursement, Échange ou Réintégration stock. Configurable selon la politique retour. | Standardiser le traitement des retours | Active | Integrated in List |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| SitesRetoursTab | `src/app/stock/_components/tabs/SitesRetoursTab.tsx` | Conteneur principal de l'onglet |
| CarrierStockSync | `src/app/ecommerce/_components/inventory/CarrierStockSync.tsx` | Synchronisation transporteurs |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: La sync transporteurs utilise les API Yalidine, Maystro et ZR-Express pour les niveaux de stock en temps réel.
