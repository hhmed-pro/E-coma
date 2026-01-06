# Social & Validation (Tab)

> **Navigation Hint**: This feature maps to the **Command Zone** (Sourcing).
> See: [`Side_bar_navigation/Command/02_Sourcing.md`](../../Side_bar_navigation/Command/02_Sourcing.md)

**Parent Page**: Découverte Produits  
**Route**: `/product-research` (Tab: social-validation)  
**Fichier Tab**: `src/app/product-research/_components/tabs/SocialValidationTab.tsx`

## Tab Overview

Outils de validation sociale et veille concurrentielle. Surveille les concurrents et leurs produits, analyse les signaux sociaux (engagement, viralité) et évalue le potentiel marché avant lancement.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Competitor Tracker <br>*(Integrated)* | Suivi des boutiques concurrentes: nouveaux produits lancés, changements de prix, promotions actives, créatives utilisées. Alertes sur les mouvements importants. | Surveiller la concurrence pour rester compétitif | Active | Inline Tracker |
| Social Signals <br>*(Integrated)* | Analyse des signaux sociaux pour un produit: likes, partages, commentaires, sauvegardes sur FB/IG/TikTok. Score de viralité potentielle. | Évaluer le potentiel viral d'un produit | Active | Inline Component |
| Engagement Analysis <br>*(Integrated)* | Métriques d'engagement détaillées: taux d'engagement par plateforme, sentiment des commentaires (positif/négatif), questions fréquentes. | Comprendre la réception du produit par le marché | Active | Inline Component |
| Market Validation Score <br>*(Integrated)* | Score global de validation marché combinant: demande (recherches), offre (concurrence), signal social (engagement), prix (marge possible). Note sur 100 avec détail. | Décision data-driven sur le lancement d'un produit | Active | Inline Score Card |
| Trending Product Alerts <br>*(Integrated)* | Alertes automatiques quand un produit devient viral ou quand un concurrent lance une nouvelle offre. Configurable par seuil et catégorie. | Réagir rapidement aux opportunités du marché | Active | Inline Config |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| SocialValidationTab | `src/app/product-research/_components/tabs/SocialValidationTab.tsx` | Conteneur principal de l'onglet |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les signaux sociaux sont collectés via les API publiques des plateformes et le scraping autorisé.
