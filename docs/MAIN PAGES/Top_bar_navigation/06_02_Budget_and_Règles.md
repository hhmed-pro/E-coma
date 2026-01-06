# Budget & Règles (Tab)

> **Navigation Hint**: This feature maps to the **Growth Zone** (Ads Manager).
> See: [`Side_bar_navigation/Growth/01_AdsManager.md`](../../Side_bar_navigation/Growth/01_AdsManager.md)

**Parent Page**: Gestionnaire Pubs  
**Route**: `/ads` (Tab: budget-regles)  
**Fichier Tab**: `src/app/ads/_components/tabs/BudgetReglesTab.tsx`

## Tab Overview

Outils de contrôle budgétaire et automatisation. Planification des budgets par jour/semaine/mois, règles automatiques de stop-loss pour couper les campagnes non rentables, et suivi des taux de change pour anticiper les coûts.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Budget Planner <br>*(Integrated)* | Planificateur de budget: allocation par plateforme, par jour de semaine, par campagne. Vue calendrier des dépenses prévues. Alertes de dépassement. | Planifier et contrôler les dépenses publicitaires | Active | Inline Component |
| Stop-Loss Rules <br>*(Integrated)* | Règles automatiques d'arrêt: conditions (ROAS < seuil, dépense > montant, 0 conversions après X€). Actions (pause, alerte, réduction budget). Exécution en temps réel. | Limiter les pertes sur les campagnes non performantes | Active | Inline Rules Builder |
| Currency Tracker <br>*(Integrated)* | Suivi des taux de change EUR/DZD et USD/DZD: taux actuels, évolution, prévisions. Comparaison taux officiel vs parallèle. Alertes de variation significative. | Anticiper les coûts réels et optimiser les moments de paiement | Active | CurrencyTracker.tsx |
| Spend Alerts <br>*(Integrated)* | Alertes configurables: dépense journalière dépassée, budget mensuel à X%, coût par conversion anormal. Notifications push/email. | Réagir rapidement aux anomalies de dépenses | Active | Inline Config |
| Budget Pacing <br>*(Integrated)* | Indicateur de rythme de dépense: en avance/retard par rapport au planning. Recommandations d'ajustement automatique. | Maintenir les dépenses dans les clous | Active | Inline Component |
| Rule Templates <br>*(Integrated)* | Templates de règles prédéfinis: "Stop si pas de vente", "Réduire si CPA trop élevé", "Scaler si ROAS > 3". Application en un clic. | Démarrer rapidement avec des règles éprouvées | Active | Inline Templates |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| BudgetReglesTab | `src/app/ads/_components/tabs/BudgetReglesTab.tsx` | Conteneur principal de l'onglet |
| CurrencyTracker | `src/app/ads/_components/CurrencyTracker.tsx` | Suivi taux de change |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les règles stop-loss s'exécutent via les API Meta/Google avec délai minimal.
