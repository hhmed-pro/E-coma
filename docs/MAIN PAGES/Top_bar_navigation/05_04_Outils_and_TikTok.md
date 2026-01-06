# Outils & TikTok (Tab)

> **Navigation Hint**: This feature maps to the **Growth Zone** (Creative Studio).
> See: [`Side_bar_navigation/Growth/02_CreativeStudio.md`](../../Side_bar_navigation/Growth/02_CreativeStudio.md)

**Parent Page**: Studio Créatif  
**Route**: `/creatives` (Tab: outils-tiktok)  
**Fichier Tab**: `src/app/creatives/_components/tabs/OutilsTikTokTab.tsx`

## Tab Overview

Outils spécialisés pour TikTok et contenu UGC. Assistant de monétisation TikTok, optimiseur de qualité vidéo, et service de demande de création de contenu UGC par des créateurs.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| TikTok Monetization Wizard <br>*(Integrated)* | Assistant étape par étape pour optimiser la monétisation TikTok: configuration TikTok Shop, liens affiliés, créateur fund, best practices. Checklist de conformité. | Maximiser les revenus depuis TikTok | Active | TikTokMonetizationWizard.tsx |
| Quality Optimizer <br>*(Integrated)* | Optimiseur de qualité média: amélioration automatique de la résolution, stabilisation vidéo, correction couleur, compression intelligente. Prévisualisation avant/après. | Produire des vidéos de qualité professionnelle | Active | QualityOptimizer.tsx |
| UGC Service Request <br>*(Integrated)* | Interface de demande de création UGC: brief produit, style souhaité, budget, délai. Matching avec créateurs du réseau. Suivi de commande intégré. | Obtenir du contenu authentique créé par des utilisateurs | Active | RequestUGCService.tsx |
| Quality Checklist <br>*(Integrated)* | Liste de vérification qualité avant publication: résolution OK, audio clair, sous-titres, hook fort, CTA présent. Score de qualité. | S'assurer que chaque vidéo respecte les standards | Active | QualityChecklist.tsx |
| TikTok Best Practices <br>*(Integrated)* | Guide des meilleures pratiques TikTok: durées optimales, hooks qui marchent, hashtags tendances DZ, sons viraux. Mis à jour régulièrement. | Suivre les dernières tendances TikTok | Active | Inline Component |
| UGC Creator Network <br>*(Integrated)* | Accès au réseau de créateurs UGC algériens: profils, portfolios, tarifs, avis. Sélection et contact direct. | Trouver le bon créateur pour son produit | Active | Integrated in RequestUGCService |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| OutilsTikTokTab | `src/app/creatives/_components/tabs/OutilsTikTokTab.tsx` | Conteneur principal de l'onglet |
| TikTokMonetizationWizard | `src/app/creatives/_components/TikTokMonetizationWizard.tsx` | Assistant monétisation TikTok |
| QualityOptimizer | `src/app/creatives/_components/QualityOptimizer.tsx` | Optimiseur qualité vidéo |
| QualityChecklist | `src/app/creatives/_components/QualityChecklist.tsx` | Checklist qualité |
| RequestUGCService | `src/app/marketing/_components/RequestUGCService.tsx` | Service demande UGC |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le réseau UGC comprend des créateurs algériens vérifiés avec des tarifs en DZD.
