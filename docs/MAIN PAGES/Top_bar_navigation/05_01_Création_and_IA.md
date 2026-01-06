# Création & IA (Tab)

> **Navigation Hint**: This feature maps to the **Growth Zone** (Creative Studio).
> See: [`Side_bar_navigation/Growth/02_CreativeStudio.md`](../../Side_bar_navigation/Growth/02_CreativeStudio.md)

**Parent Page**: Studio Créatif  
**Route**: `/creatives` (Tab: creation-ia)  
**Fichier Tab**: `src/app/creatives/_components/tabs/CreationIATab.tsx`

## Tab Overview

Suite d'outils IA pour la création de contenu marketing. Générateur de textes multi-format, créateur d'accroches virales, éditeur média IA et optimiseur pour transformer le contenu en arabe algérien (darja). Suivi des stats de création.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| AI Creation Stats <br>*(Integrated)* | 4 KPIs de création: Contenus Générés (156), Accroches Créées (89), Images Éditées (42), Darja Conversions (67). Suivi de l'utilisation des outils IA. | Mesurer la productivité créative | Active | Inline KPI Cards |
| AI Copywriter <br>*(Integrated)* | Générateur de textes marketing IA: descriptions produits, posts réseaux sociaux, emails, pages de vente. Plusieurs tons (professionnel, fun, urgent). Optimisé pour le marché DZ. | Créer des textes marketing persuasifs en quelques clics | Active | ToolCard + HookAnalyzer.tsx |
| Hook Generator <br>*(Integrated)* | Créateur d'accroches virales IA: génère des hooks pour vidéos, pubs et posts. Styles variés (question, statistique, histoire, controverse). Avec analyse de performance prédictive. | Capturer l'attention dès les premières secondes | Active | HookGenerator.tsx |
| AI Media Editor <br>*(Integrated)* | Éditeur d'images et vidéos avec IA: suppression de fond, retouche automatique, redimensionnement multi-format, ajout de texte. Sans compétences design requises. | Créer des visuels professionnels sans designer | Active | AIMediaEditor.tsx |
| Darja Optimizer <br>*(Integrated)* | Convertisseur et optimiseur pour l'arabe algérien (darja). Transforme le français/arabe classique en darja naturelle. Adapte le ton au public algérien. | Créer du contenu authentique pour le marché algérien | Active | DarjaOptimizer.tsx |
| Multi-Content Generator <br>*(Integrated)* | Générateur avancé créant plusieurs variantes de contenu simultanément: textes, images, formats. Idéal pour les tests A/B et la production en volume. | Produire du contenu à grande échelle pour tester | Active | MultiContentGenerator.tsx |
| Quick Tool Cards <br>*(Integrated)* | Interface de sélection rapide des outils avec cartes cliquables. Chaque outil s'ouvre dans un panel dédié. Toggle on/off. | Accéder rapidement à l'outil souhaité | Active | ToolCard.tsx |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| CreationIATab | `src/app/creatives/_components/tabs/CreationIATab.tsx` | Conteneur principal de l'onglet |
| MultiContentGenerator | `src/app/creatives/_components/MultiContentGenerator.tsx` | Générateur multi-contenu |
| HookGenerator | `src/app/creatives/_components/HookGenerator.tsx` | Générateur d'accroches |
| HookAnalyzer | `src/app/creatives/_components/HookAnalyzer.tsx` | Analyseur de hooks |
| AIMediaEditor | `src/app/creatives/_components/AIMediaEditor.tsx` | Éditeur média IA |
| DarjaOptimizer | `src/app/creatives/_components/DarjaOptimizer.tsx` | Optimiseur darja |
| ToolCard | `src/app/creatives/_components/shared/ToolCard.tsx` | Carte outil réutilisable |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le Darja Optimizer utilise un modèle IA entraîné spécifiquement sur l'arabe algérien.
