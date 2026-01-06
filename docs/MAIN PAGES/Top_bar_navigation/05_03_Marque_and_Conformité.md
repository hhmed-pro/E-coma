# Marque & Conformité (Tab)

> **Navigation Hint**: This feature maps to the **Growth Zone** (Creative Studio).
> See: [`Side_bar_navigation/Growth/02_CreativeStudio.md`](../../Side_bar_navigation/Growth/02_CreativeStudio.md)

**Parent Page**: Studio Créatif  
**Route**: `/creatives` (Tab: marque-conformite)  
**Fichier Tab**: `src/app/creatives/_components/tabs/MarqueConformiteTab.tsx`

## Tab Overview

Outils de cohérence de marque et conformité du contenu. Profil de voix de marque pour guider l'IA, vérificateur de conformité avant publication, et presets de format par plateforme.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Brand Voice Profile <br>*(Integrated)* | Configuration du profil de marque: ton (professionnel, décontracté, luxe), valeurs, mots-clés à utiliser/éviter, exemples de contenus. Guide l'IA dans ses générations. | Maintenir une voix de marque cohérente sur tous les contenus | Active | BrandVoiceProfile.tsx |
| Content Safety Checker <br>*(Integrated)* | Vérification automatique du contenu avant publication: détection de termes interdits, vérification des claims produits, conformité réglementaire, risques de signalement. | Éviter les problèmes de modération et légaux | Active | ContentSafetyChecker.tsx |
| Format Presets <br>*(Integrated)* | Presets de format par plateforme: dimensions images/vidéos, durées, limites de caractères. Application automatique lors de la création. Inclut: Feed FB/IG, Story, Reels, TikTok. | Créer du contenu aux bonnes dimensions sans erreur | Active | FormatPresets.tsx |
| Brand Guidelines Library <br>*(Integrated)* | Documentation des guidelines de marque: logos (usage correct), palette couleurs, typographies, do's and don'ts. Partageable en équipe. | Centraliser les règles de marque pour référence | Active | Inline Component |
| Compliance History <br>*(Integrated)* | Historique des vérifications de conformité: contenus analysés, alertes levées, corrections apportées. Audit trail pour traçabilité. | Suivre les vérifications pour audit et amélioration | Active | Inline Component |
| Auto-Apply Brand <br>*(Integrated)* | Application automatique des éléments de marque sur les créations: logo, couleurs, police. Sans manipulation manuelle à chaque création. | Automatiser le branding du contenu | Active | Integrated in Editor |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| MarqueConformiteTab | `src/app/creatives/_components/tabs/MarqueConformiteTab.tsx` | Conteneur principal de l'onglet |
| BrandVoiceProfile | `src/app/creatives/_components/BrandVoiceProfile.tsx` | Configuration voix de marque |
| ContentSafetyChecker | `src/app/creatives/_components/ContentSafetyChecker.tsx` | Vérificateur conformité |
| FormatPresets | `src/app/creatives/_components/FormatPresets.tsx` | Presets de format |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le Safety Checker inclut des règles spécifiques à la publicité en Algérie.
