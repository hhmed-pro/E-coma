# Rapports & Outils (Tab)

> **Navigation Hint**: This feature maps to the **Command Zone** (Finance & Insights).
> See: [`Side_bar_navigation/Command/01_Finance.md`](../../Side_bar_navigation/Command/01_Finance.md)

**Parent Page**: Tableau de Bord  
**Route**: `/analytics` (Tab: rapports-outils)  
**Fichier Tab**: `src/app/analytics/_components/tabs/RapportsOutilsTab.tsx`

## Tab Overview

Centre de reporting et d'intégrations. Actions rapides pour générer/exporter des rapports, gestion des connexions aux plateformes tierces (GA4, Meta Pixel, TikTok), programmation des rapports automatiques et accès aux guides de la plateforme.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Quick Actions <br>*(Integrated)* | 4 boutons d'action rapide: Générer Rapport, Exporter Données, Importer Données, Actualiser. Accès direct aux fonctions courantes. | Effectuer les actions de reporting en un clic | Active | Inline Buttons |
| Report Builder <br>*(Integrated)* | Constructeur de rapports personnalisés avec sélection des métriques à inclure: revenus, commandes, panier moyen, profit, distribution géo, performance livraison. Export PDF/Excel. | Créer des rapports sur mesure pour analyse ou présentation | Active | ExportBuilderModal |
| Data Integrations <br>*(Integrated)* | Gestion des connexions: Google Analytics 4 (connecté, sync 5 min), Meta Pixel (connecté, sync 2 min), TikTok Pixel (déconnecté), Shopify (en attente). Statut et dernière sync. | Centraliser les données de toutes les plateformes | Active | IntegrationModal |
| Scheduled Reports <br>*(Not Implemented)* | Configuration des rapports automatiques: Quotidien (PDF, 8h), Hebdomadaire (Excel, Lundi 9h), Mensuel (PDF, 1er du mois). Envoi par email. | Recevoir les rapports automatiquement sans action manuelle | Coming Soon | Placeholder Card |
| Platform Guides <br>*(Integrated)* | Bibliothèque de tutoriels et guides: Comment configurer les pixels, Optimiser le ROAS, Utiliser le calculateur IFU, etc. Format vidéo et texte. | Former les utilisateurs aux fonctionnalités de la plateforme | Active | PlatformGuides.tsx |
| Add Integration <br>*(Integrated)* | Bouton pour ajouter de nouvelles intégrations avec wizard de configuration. Support pour les principales plateformes e-commerce et marketing. | Étendre les connexions à d'autres outils | Active | Button + Modal |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| RapportsOutilsTab | `src/app/analytics/_components/tabs/RapportsOutilsTab.tsx` | Conteneur principal de l'onglet |
| ExportBuilderModal | `src/components/core/ui/modals/ExportBuilderModal.tsx` | Modal de construction de rapports |
| IntegrationModal | `src/components/core/ui/modals/IntegrationModal.tsx` | Modal de configuration intégration |
| PlatformGuides | `src/app/analytics/_components/PlatformGuides.tsx` | Bibliothèque de guides |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les intégrations utilisent les API officielles des plateformes avec authentification OAuth où disponible.
