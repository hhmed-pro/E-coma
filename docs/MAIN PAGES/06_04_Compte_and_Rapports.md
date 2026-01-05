# Compte & Rapports (Tab)

**Parent Page**: Gestionnaire Pubs  
**Route**: `/ads` (Tab: compte-rapports)  
**Fichier Tab**: `src/app/ads/_components/tabs/CompteRapportsTab.tsx`

## Tab Overview

Gestion des comptes publicitaires et reporting. Monitoring de la santé des comptes (Facebook, Google, TikTok), gestion multi-comptes pour les agences, et génération de rapports de performance personnalisés.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Account Health Monitor | Monitoring de la santé des comptes pub: statut (actif/restreint/désactivé), politique de paiement, limite de dépense, alertes récentes. Actions recommandées si problème. | Prévenir les blocages de compte et réagir rapidement | Active | AccountHealthMonitor.tsx |
| Agency Account Manager | Gestion multi-comptes pour agences: tous les comptes clients en un seul endroit, switch rapide, permissions par équipe, facturation consolidée. | Gérer plusieurs clients efficacement | Active | AgencyAccountManager.tsx |
| Performance Reports | Générateur de rapports de performance: sélection des métriques, période, format (PDF/Excel). Templates de rapport par client. White-label possible. | Créer des rapports clients professionnels | Active | Inline Report Builder |
| Account Alerts | Centre de notifications des alertes compte: problèmes de paiement, politique violée, performance anormale, limites atteintes. Historique et actions. | Centraliser les alertes pour réponse rapide | Active | Inline Alert Center |
| Scheduled Reports | Programmation de rapports automatiques: fréquence (quotidien/hebdo/mensuel), destinataires, format. Envoi par email automatique. | Automatiser le reporting récurrent | Active | Inline Scheduler |
| Billing Overview | Vue de la facturation: total dépensé, factures récentes, méthode de paiement, prochain prélèvement. Alerte si paiement échoué. | Suivre les dépenses et prévenir les interruptions | Active | Inline Component |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| CompteRapportsTab | `src/app/ads/_components/tabs/CompteRapportsTab.tsx` | Conteneur principal de l'onglet |
| AccountHealthMonitor | `src/app/ads/_components/AccountHealthMonitor.tsx` | Monitoring santé comptes |
| AgencyAccountManager | `src/app/ads/_components/AgencyAccountManager.tsx` | Gestion comptes agence |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le monitoring de santé détecte les violations de politique Meta/Google avant restriction.
