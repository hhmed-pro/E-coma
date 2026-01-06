# AI Copilot

> **Navigation Hint**: This feature maps to the **Growth Zone**.
> See: [`Side_bar_navigation/02_Growth_Zone.md`](../../Side_bar_navigation/02_Growth_Zone.md)
 / Plateformes & Social (Tab)

**Parent Page**: Marketing & Growth  
**Route**: `/marketing` (Tab: plateformes-social)  
**Fichier Tab**: `src/app/marketing/_components/tabs/PlateformesSocialTab.tsx`

## Tab Overview

Suite d'agents IA pour l'automatisation de l'engagement sur les réseaux sociaux. Bots de réponse aux DM pour vente et support, répondeur automatique aux commentaires, et garde anti-spam pour protéger les publications.

## Features List

| Feature | Description | Purpose | Status | Components Reference |
|---------|-------------|---------|--------|----------------------|
| Platform Hub <br>*(Integrated)* | Hub centralisé des plateformes connectées: Facebook, Instagram, TikTok, WhatsApp. Statut de connexion, métriques récentes, actions rapides. | Gérer toutes les plateformes depuis un seul endroit | Active | PlatformHub.tsx |
| AI Comment Responder <br>*(Integrated)* | Agent IA de réponse automatique aux commentaires: détection d'intention (question, compliment, objection), réponse contextuelle, ton de marque configurable. Stats de réponses. | Répondre 24/7 aux commentaires sans effort | Active | AICommentResponder.tsx |
| DM Sales Agent <br>*(Integrated)* | Agent IA de vente par DM: qualification des leads, présentation produit, traitement des objections, redirection vers commande. Conversation naturelle en darja possible. | Convertir les DM en ventes automatiquement | Active | Inline Component |
| DM Support Agent <br>*(Integrated)* | Agent IA de support par DM: réponse aux questions fréquentes, suivi de commande, gestion des réclamations, escalade vers humain si nécessaire. | Automatiser le support client par messagerie | Active | Inline Component |
| Comments Guard <br>*(Integrated)* | Protection des commentaires: détection et masquage automatique des commentaires négatifs, spam, concurrents. Whitelist/blacklist de mots-clés. Notifications. | Protéger l'image de marque sur les publications | Active | CommentsGuard.tsx |
| Confirmation Bot <br>*(Integrated)* | Bot WhatsApp de confirmation de commande: message automatique post-achat, collecte de confirmation OUI/NON, mise à jour du statut commande. | Automatiser les confirmations de commande | Active | ConfirmationBot.tsx |
| Away Messages <br>*(Integrated)* | Configuration des messages d'absence: heures d'ouverture, message automatique hors horaires, redirection vers FAQ ou humain disponible. | Gérer les attentes pendant les heures de fermeture | Active | AwayMessagesPage.tsx |

## Components Reference

| Component | File Location | Purpose |
|-----------|---------------|---------|
| PlateformesSocialTab | `src/app/marketing/_components/tabs/PlateformesSocialTab.tsx` | Conteneur principal de l'onglet |
| AICommentResponder | `src/app/marketing/_components/AICommentResponder.tsx` | Répondeur IA commentaires |
| CommentsGuard | `src/app/marketing/_components/CommentsGuard.tsx` | Protection commentaires |
| ConfirmationBot | `src/app/marketing/_components/ConfirmationBot.tsx` | Bot confirmation WhatsApp |
| PlatformHub | `src/app/marketing/_components/PlatformHub.tsx` | Hub multi-plateformes |
| AwayMessagesPage | `src/app/marketing/_components/AwayMessagesPage.tsx` | Messages d'absence |
| FeatureCluster | `src/components/core/ui/FeatureCluster.tsx` | Conteneur collapsible |

> **Note**: Les agents IA peuvent répondre en français, arabe standard ou darja algérien selon la configuration.
