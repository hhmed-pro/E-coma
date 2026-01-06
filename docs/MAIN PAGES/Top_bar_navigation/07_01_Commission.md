# Commission

> **Navigation Hint**: This feature maps to the **Growth Zone**.
> See: [`Side_bar_navigation/02_Growth_Zone.md`](../../Side_bar_navigation/02_Growth_Zone.md)
 / Affiliation (Tab)

**Parent Page**: Marketing & Growth  
**Route**: `/marketing` (Tab: affiliation)  
**Fichier Tab**: `src/app/marketing/_components/tabs/AffiliationTab.tsx`

## Tab Overview

Système complet de gestion d'affiliation. Gestion des affiliés avec suivi des performances, création et suivi des liens de commission, tableau de bord des paiements avec historique des transactions.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Affiliates List <br>*(Integrated)* | Liste des affiliés actifs: nom, email, nombre de ventes, gains totaux, statut (actif/en attente/inactif), date d'inscription. Avatar avec initiale, bouton Inviter. | Gérer le réseau d'affiliés | Active | Inline Affiliate List |
| Payment Overview Card <br>*(Integrated)* | Vue d'ensemble des paiements: Payé ce mois (45,200 DA), En Attente (12,800 DA), Total Payé historique (892,500 DA). Bouton "Traiter Tous les Paiements". | Avoir une vision financière de l'affiliation | Active | Inline Overview Card |
| Recent Transactions <br>*(Integrated)* | Historique des transactions récentes: affilié, montant, statut (complété/en attente/en cours), date. Badge de statut coloré et icône. | Suivre les paiements en cours | Active | Inline Transaction List |
| Commission Links <br>*(Integrated)* | Gestion des liens de commission: Lien Principal, liens promotionnels, liens produits spécifiques. URL avec paramètre ref, stats (clics, conversions). Bouton copier. | Créer et partager des liens trackés | Active | Inline Link Cards |
| Link Creation <br>*(Integrated)* | Bouton de création de nouveau lien de commission: choix de la destination (accueil, promo, produit), génération automatique du paramètre de tracking. | Multiplier les points d'entrée affiliés | Active | Button + Inline Form |
| Affiliate Invite <br>*(Integrated)* | Système d'invitation de nouveaux affiliés: formulaire d'invitation par email, lien d'inscription, conditions de commission. | Recruter de nouveaux affiliés | Active | Button + Modal |
| Performance by Affiliate <br>*(Integrated)* | Vue détaillée par affilié: ventes générées, clics, taux de conversion, gain moyen, évolution. Export possible. | Analyser la performance de chaque affilié | Active | Click on Affiliate Row |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| AffiliationTab | `src/app/marketing/_components/tabs/AffiliationTab.tsx` | Conteneur principal de l'onglet |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les paiements peuvent être effectués en masse ou individuellement en DZD.
