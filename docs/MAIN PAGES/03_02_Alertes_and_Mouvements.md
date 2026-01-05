# Alertes & Mouvements (Tab)

**Parent Page**: Entrepôt  
**Route**: `/stock` (Tab: alertes-mouvements)  
**Fichier Tab**: `src/app/stock/_components/tabs/AlertesMouvementsTab.tsx`

## Tab Overview

Centre de gestion proactive du stock. Alertes en temps réel pour les produits sous seuil, historique complet des mouvements de stock et suggestions IA pour optimiser le réapprovisionnement basées sur les tendances de vente.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Alert Overview KPIs | 4 indicateurs d'alerte: Urgentes (2 rouge), Stock Faible (4 orange), Entrées 7j (52 vert), Sorties 7j (127 bleu). Vue rapide des mouvements récents. | Prioriser les actions sur le stock | Active | Inline KPI Cards |
| Low Stock Alerts | Liste des produits sous seuil avec: nom, SKU, stock actuel vs seuil, emplacement (Local/Yalidine/Maystro), niveau d'urgence (high/medium/low). Bouton Commander direct. | Réapprovisionner avant rupture | Active | Inline Alert List |
| Stock Movements History | Historique chronologique des mouvements: produit, type (Entrée ↑/Sortie ↓/Ajustement ↺), quantité, date, utilisateur, raison. Filtrable par type et période. | Tracer tous les mouvements pour audit et analyse | Active | Inline Movement Log |
| AI Reorder Suggestions | Suggestions IA de réapprovisionnement: produit, stock actuel, quantité suggérée, raison (forte demande/tendance stable/stock critique), niveau de confiance (%). Bouton Commander. | Optimiser les commandes fournisseurs avec l'IA | Active | Inline Suggestion Cards |
| Movement Type Badges | Badges colorés pour chaque type de mouvement: Entrée (vert +), Sortie (rouge), Ajustement (bleu). Distinction visuelle immédiate. | Identifier le type de mouvement d'un coup d'œil | Active | Integrated in Log |
| Quick Reorder Button | Bouton d'action rapide sur chaque alerte pour lancer une commande fournisseur pré-remplie avec le produit et quantité suggérée. | Accélérer le processus de réapprovisionnement | Active | Button Actions |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| AlertesMouvementsTab | `src/app/stock/_components/tabs/AlertesMouvementsTab.tsx` | Conteneur principal de l'onglet |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les suggestions IA sont calculées à partir de l'historique des ventes et des tendances saisonnières.
