# Comms & Automatisations (Tab)

**Parent Page**: Centre de Confirmation  
**Route**: `/sales-dashboard` (Tab: comms-automatisations)  
**Fichier Tab**: `src/app/sales-dashboard/_components/tabs/CommsAutomatisationsTab.tsx`

## Tab Overview

Onglet de gestion des communications automatisées. Configure les bots WhatsApp pour confirmation automatique et collecte GPS, gère les modèles SMS pour différentes étapes du parcours client, et affiche l'historique complet des communications.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Bot Stats Dashboard | 4 KPIs d'automatisation: Confirmations Bot (42 aujourd'hui), GPS Collectés (28 via WhatsApp), Réponses Auto (156 cette semaine), Temps Réponse Moyen (12s) | Mesurer l'efficacité des automatisations | Active | Inline KPI Cards |
| WhatsApp Confirmation Bot | Bot automatisé envoyant des messages de confirmation aux clients avec template personnalisable. Détecte les réponses OUI/NON pour mise à jour automatique du statut. Toggle on/off disponible. | Automatiser les confirmations de commande et gagner du temps | Active | Inline Config Card |
| GPS Request Bot | Bot WhatsApp demandant automatiquement la position GPS aux clients après confirmation. Message guidé avec instructions pour partager la localisation. Toggle on/off disponible. | Collecter des adresses précises sans intervention manuelle | Active | Inline Config Card |
| SMS Templates | Bibliothèque de 4 modèles SMS: Confirmation, Expédition, Livraison, Retour. Chaque template avec variables dynamiques ({nom}, {id}, {montant}, {lien}). Statut actif/inactif par template. | Standardiser et automatiser les SMS transactionnels | Active | Inline Template List |
| Communication Log | Historique chronologique de toutes les communications: client, type (SMS/WhatsApp/Appel), message, heure, statut (envoyé/complété). Filtrable par type. | Tracer toutes les interactions clients pour suivi et audit | Active | Inline Log Table |
| Call Recording | Enregistrement automatique des appels de confirmation pour améliorer la qualité. Réécoute et analyse disponibles. | Améliorer la qualité du service par le feedback | Coming Soon | Placeholder Card |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| CommsAutomatisationsTab | `src/app/sales-dashboard/_components/tabs/CommsAutomatisationsTab.tsx` | Conteneur principal de l'onglet |
| ConfirmationBot | `src/app/marketing/_components/ConfirmationBot.tsx` | Configuration bot confirmation |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible pour features |

> **Note**: Les bots WhatsApp nécessitent une intégration avec l'API WhatsApp Business.
