# Traitement Commandes (Tab)

> **Navigation Hint**: This feature maps to the **Operations Zone** (Confirmation Center).
> See: [`Side_bar_navigation/Operations/01_Confirmation.md`](../../Side_bar_navigation/Operations/01_Confirmation.md)

**Parent Page**: Centre de Confirmation  
**Route**: `/operations/confirmation` (Tab: traitement-commandes)  
**Fichier Tab**: `src/views/Operations/ConfirmationCommand/FilteringCalling/PreOrdersQueue.tsx`

## Tab Overview

Onglet principal de gestion des commandes avec vue Kanban, workflow de confirmation téléphonique, scripts d'appel, collecte GPS via WhatsApp et suivi des expéditions en temps réel. Affiche des KPIs en temps réel: nouvelles commandes, appels en attente, confirmées, expédiées, livrées et taux de confirmation.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Orders Kanban <br>*(Integrated)* | Tableau Kanban visuel avec colonnes: Nouvelles, Appelées, Confirmées, En Traitement, Expédiées, Livrées. Drag-and-drop des commandes entre les colonnes avec tags de risque. | Visualiser et gérer le flux de commandes de manière intuitive | Active | VisualBoardModal |
| KPI Dashboard <br>*(Integrated)* | Affichage des métriques principales avec cartes colorées: nouvelles commandes (24), à appeler (8), confirmées (142), expédiées (89), livrées (67), taux confirmation (78%) | Avoir une vue instantanée de l'état des commandes | Active | Inline KPI Cards |
| Confirmation Workflow <br>*(Integrated)* | Flux de confirmation téléphonique avancé avec suivi des appels, notes clients, et statuts multiples. Interface dédiée pour les agents call center. | Standardiser et optimiser le processus de confirmation téléphonique | Active | ConfirmationWorkflow.tsx |
| Call Scripts <br>*(Integrated)* | Bibliothèque de scripts d'appel prédéfinis pour différents scénarios: confirmation standard, upsell, problème livraison. Affichage contextuel selon le type de commande. | Guider les agents pour des appels efficaces et cohérents | Active | CallCenterScripts.tsx |
| GPS Collection WhatsApp <br>*(Integrated)* | Bot automatisé qui envoie un message WhatsApp demandant la position GPS du client. Collecte et affiche les coordonnées pour faciliter la livraison. | Améliorer le taux de livraison en obtenant des adresses précises | Active | LocationCollector.tsx |
| Shipment Tracker <br>*(Integrated)* | Suivi en temps réel des expéditions avec statut transporteur, numéro de suivi, et historique de tracking. Intégration multi-transporteurs. | Suivre les colis et anticiper les problèmes de livraison | Active | ShipmentTracker.tsx (from ecommerce) |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| TraitementCommandesTab | `src/app/sales-dashboard/_components/tabs/TraitementCommandesTab.tsx` | Conteneur principal de l'onglet |
| ConfirmationWorkflow | `src/app/sales-dashboard/_components/ConfirmationWorkflow.tsx` | Flux de confirmation des commandes |
| CallCenterScripts | `src/app/sales-dashboard/_components/CallCenterScripts.tsx` | Scripts d'appel pour agents |
| LocationCollector | `src/app/sales-dashboard/_components/LocationCollector.tsx` | Collecte GPS via WhatsApp |
| ShipmentTracker | `src/app/ecommerce/_components/delivery/ShipmentTracker.tsx` | Suivi des expéditions |
| VisualBoardModal | `src/components/core/ui/modals/VisualBoardModal.tsx` | Modal Kanban réutilisable |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible pour features |

> **Note**: Ce tab utilise des composants partagés de `ecommerce` pour le tracking des expéditions.
