# Fournisseurs & Import (Tab)

**Parent Page**: Entrepôt  
**Route**: `/stock` (Tab: fournisseurs-import)  
**Fichier Tab**: `src/app/stock/_components/tabs/FournisseursImportTab.tsx`

## Tab Overview

Outils de sourcing et d'importation. Base de données de fournisseurs vérifiés, service d'import depuis la Chine avec suivi douane, et tracker de budget pour gérer les coûts d'importation (produit + shipping + taxes).

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Import Stats KPIs | 4 indicateurs clés: Imports Actifs (3), En Douane (1), Valeur Totale (850,000 DA), Délai Moyen (21 jours). Vue globale des imports en cours. | Suivre l'état des importations | Active | Inline KPI Cards |
| Active Imports List | Tableau des imports en cours: fournisseur (Shenzhen Electronics, Guangzhou Accessories, Yiwu Trading), nombre d'articles, statut (En Transit/Douane/Commandé), ETA, valeur. Badge de statut coloré. | Tracer chaque import de la commande à la réception | Active | Inline Import List |
| Import Budget Tracker | Calculateur de coût total import: prix produit, shipping maritime/aérien, frais douane, TVA, manutention. Comparaison landed cost vs prix local. Historique des imports. | Calculer le coût réel d'importation pour décision | Active | ImportBudgetTracker.tsx |
| China Import Service | Service d'accompagnement import Chine: recherche fournisseur, négociation, contrôle qualité, consolidation, shipping, dédouanement. Formulaire de demande intégré. | Déléguer la complexité de l'import à un service expert | Active | ChinaImportService.tsx |
| Supplier Database | Base de données de fournisseurs: nom, localisation, spécialité, note qualité, délai moyen, MOQ. Filtres par catégorie et recherche. Fiche détaillée par fournisseur. | Trouver et comparer les fournisseurs rapidement | Active | SupplierDatabase.tsx |
| Import Status Badges | Badges visuels: En Transit (bleu), Douane (rouge - attention requise), Commandé (gris). Code couleur pour action prioritaire. | Identifier les imports nécessitant une action | Active | Integrated in List |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| FournisseursImportTab | `src/app/stock/_components/tabs/FournisseursImportTab.tsx` | Conteneur principal de l'onglet |
| ImportBudgetTracker | `src/app/ecommerce/_components/inventory/ImportBudgetTracker.tsx` | Calculateur budget import |
| ChinaImportService | `src/app/ecommerce/_components/inventory/ChinaImportService.tsx` | Service import Chine |
| SupplierDatabase | `src/app/product-research/_components/SupplierDatabase.tsx` | Base fournisseurs |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Le service import Chine inclut l'accompagnement douanier spécifique à l'Algérie.
