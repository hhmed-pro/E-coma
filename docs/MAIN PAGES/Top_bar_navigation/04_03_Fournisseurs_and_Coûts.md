# Fournisseurs & Coûts (Tab)

> **Navigation Hint**: This feature maps to the **Command Zone** (Sourcing).
> See: [`Side_bar_navigation/Command/02_Sourcing.md`](../../Side_bar_navigation/Command/02_Sourcing.md)

**Parent Page**: Découverte Produits  
**Route**: `/product-research` (Tab: fournisseurs-couts)  
**Fichier Tab**: `src/app/product-research/_components/tabs/FournisseursCoutsTab.tsx`

## Tab Overview

Outils de sourcing et calcul de rentabilité. Base de données de fournisseurs vérifiés avec notes et historique, calculateur de coût complet incluant tous les frais d'import, et analyse du landed cost pour décision d'achat éclairée.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Supplier Database <br>*(Integrated)* | Base de 500+ fournisseurs vérifiés: nom, pays, spécialités, note qualité (5 étoiles), délai moyen, MOQ, certifications. Filtres avancés et recherche. Fiches détaillées. | Trouver des fournisseurs fiables rapidement | Active | SupplierDatabase.tsx |
| Cost Calculator <br>*(Integrated)* | Calculateur de coût total: prix unitaire produit, quantité, shipping (maritime/aérien/express), frais douane (5-30% selon catégorie), TVA 19%, frais manutention. Résultat: coût unitaire rendu Algérie. | Calculer le vrai coût d'un produit avant commande | Active | Inline Calculator |
| Landed Cost Analysis <br>*(Integrated)* | Comparaison prix achat vs landed cost vs prix de vente marché. Calcul automatique de la marge brute possible. Alerte si marge insuffisante. | Valider la rentabilité avant investissement | Active | Inline Analysis |
| Supplier Comparison <br>*(Integrated)* | Tableau comparatif de plusieurs fournisseurs pour le même produit: prix, MOQ, délai, qualité. Aide à la décision. | Choisir le meilleur fournisseur objectivement | Active | Inline Component |
| Quick Quote Request <br>*(Integrated)* | Formulaire de demande de devis rapide envoyé directement au fournisseur. Historique des demandes et réponses. | Obtenir des prix précis sans quitter la plateforme | Active | Inline Form |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| FournisseursCoutsTab | `src/app/product-research/_components/tabs/FournisseursCoutsTab.tsx` | Conteneur principal de l'onglet |
| SupplierDatabase | `src/app/product-research/_components/SupplierDatabase.tsx` | Base fournisseurs |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les frais de douane algériens varient selon la catégorie de produit (électronique, textile, etc.).
