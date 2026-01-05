# Modèles & Flux (Tab)

**Parent Page**: Studio Créatif  
**Route**: `/creatives` (Tab: modeles-flux)  
**Fichier Tab**: `src/app/creatives/_components/tabs/ModelesFluxTab.tsx`

## Tab Overview

Gestion du workflow de production de contenu. Bibliothèque de templates prêts à l'emploi par catégorie, tableau Kanban pour suivre l'avancement du contenu, et planificateur pour programmer les publications.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Template Library | Bibliothèque de templates par catégorie: Publicités (carousels, vidéos), Posts (annonces, testimonials), Stories, Emails. Filtrable, avec preview et duplication. | Démarrer rapidement avec des modèles éprouvés | Active | Inline Component |
| Content Kanban | Tableau Kanban de gestion contenu avec colonnes: Idées, En cours, Review, Approuvé, Publié. Drag-and-drop, assignation, dates limites. | Organiser la production de contenu en équipe | Active | Inline Component |
| Publication Scheduler | Calendrier de planification des publications: vue jour/semaine/mois, multi-plateformes (FB, IG, TikTok), heure optimale suggérée. | Planifier et automatiser les publications | Active | Inline Component |
| Content Pipeline | Vue d'ensemble du pipeline: contenu en attente, en production, prêt à publier. Métriques de vélocité et goulots d'étranglement. | Optimiser le flux de production | Active | Inline Component |
| Template Customization | Éditeur de personnalisation des templates: modification des textes, images, couleurs tout en gardant la structure. Sauvegarde en tant que nouveau template. | Adapter les templates à sa marque | Active | Inline Editor |
| Batch Scheduling | Planification en masse de plusieurs contenus en une fois. Import CSV des posts, assignation automatique des créneaux optimaux. | Gagner du temps sur la planification | Active | Inline Component |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| ModelesFluxTab | `src/app/creatives/_components/tabs/ModelesFluxTab.tsx` | Conteneur principal de l'onglet |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le scheduler suggère les heures optimales basées sur l'engagement historique du marché algérien.
