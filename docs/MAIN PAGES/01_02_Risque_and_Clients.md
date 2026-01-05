# Risque & Clients (Tab)

**Parent Page**: Centre de Confirmation  
**Route**: `/sales-dashboard` (Tab: risque-clients)  
**Fichier Tab**: `src/app/sales-dashboard/_components/tabs/RisqueClientsTab.tsx`

## Tab Overview

Onglet dédié à l'évaluation et la gestion des risques clients. Affiche les commandes à risque élevé, gère la blacklist clients, calcule les scores de risque avec IA et visualise les taux de retour par wilaya. Permet de demander des paiements anticipés pour les clients à risque.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Risk KPI Dashboard | 4 KPIs critiques: Commandes à Risque (8), Clients Blacklistés (24), Score Risque Moyen (4.2/10), Paiements Anticipés Demandés (12) | Visualiser l'état global des risques en un coup d'œil | Active | Inline KPI Cards |
| High-Risk Orders Alert | Liste des commandes détectées à risque élevé avec score, raison (historique retours, nouvelle adresse, zone à risque), montant. Actions rapides: demander paiement ou bloquer. | Identifier et traiter immédiatement les commandes problématiques | Active | Inline Component |
| Risk Calculator IA | Calculateur utilisant l'IA pour évaluer le risque de retour d'une commande basé sur: historique client, wilaya, montant, produit, heure de commande. | Prédire le risque de retour avant confirmation pour prendre des décisions éclairées | Active | ReturnRiskCalculator.tsx |
| Customer Blacklist | Gestion de la liste noire clients avec ajout/suppression, raison du blocage, date, et blocage automatique sur nouvelles commandes. | Éviter les commandes de clients problématiques récurrents | Active | CustomerBlacklist.tsx |
| Wilaya Risk Map | Visualisation du taux de retour par wilaya avec barres de progression colorées (vert <10%, orange 10-15%, rouge >15%). Affiche le nombre de commandes par région. | Identifier les zones géographiques à risque pour adapter la stratégie | Active | Inline Component |
| Upfront Payment Request | Possibilité de demander un paiement anticipé (partiel ou total) pour les commandes à risque via WhatsApp ou autre canal. | Sécuriser les commandes à risque avant expédition | Active | Button Actions |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| RisqueClientsTab | `src/app/sales-dashboard/_components/tabs/RisqueClientsTab.tsx` | Conteneur principal de l'onglet |
| ReturnRiskCalculator | `src/app/sales-dashboard/_components/ReturnRiskCalculator.tsx` | Calculateur de risque IA |
| CustomerBlacklist | `src/app/sales-dashboard/_components/CustomerBlacklist.tsx` | Gestion blacklist clients |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible pour features |

> **Note**: Le score de risque est calculé sur 10, avec des seuils: <4 (faible), 4-7 (moyen), >7 (élevé).
