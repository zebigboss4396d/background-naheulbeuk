# Dés animés — 20 octobre 2026

Page 1 : cliquer sur chaque dé déclenche un lancer animé d’environ une seconde. Le résultat aléatoire de 1 à 6 est ensuite verrouillé. Les caractéristiques restent dans l’ordre COU, INT, CHA, AD, FOR et reçoivent +7 comme auparavant.

Le bouton « Je relance… mais chut, pas un mot au MJ ! » efface les cinq dés, y compris pendant un lancer. Sous le bouton : « Efface les cinq dés. Même celui qui avait fait 6. »

L’analyse est disponible uniquement lorsque les cinq dés sont arrêtés. Le bouton commun lance seulement les dés encore vierges ; il ne permet pas de relancer un résultat déjà obtenu.

Le mode « Saisir mes propres tirages » accepte les dés lancés sur table. Changer de mode efface les cinq résultats. À chaque ouverture de la page, les cinq dés affichent « ? » et sont prêts à lancer. Le personnage déjà créé reste sauvegardé indépendamment. Les dés restent verrouillés tant que cette page demeure ouverte, jusqu’au bouton de relance globale.

L’animation utilise un cube CSS à six faces et respecte la préférence système de réduction des animations. Aucun service externe ni bibliothèque graphique supplémentaire.

## Installation

Remplacer index.html, app.js et styles.css, puis ajouter dice-controller.js. Ou remplacer le contenu complet du dépôt avec cette archive, qui conserve les autres pages et modèles PDF.

## Vérifications

18 contrôles automatisés, dont verrouillage, double clic, reset pendant animation, persistance, saisie manuelle et intégration avec l’analyse de la page 1, sur un DOM simulé. Syntaxe JavaScript vérifiée. Pas de contrôle visuel sur un véritable navigateur Android dans cette session.
