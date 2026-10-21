# Dés et rappels du personnage — 21 octobre 2026

- À chaque ouverture de la page 1, les cinq dés affichent « ? », prêts à lancer, y compris si d’anciens résultats sont sauvegardés. Le retour à la page via le cache du navigateur remet également les dés à zéro. L’animation et le verrouillage après chaque lancer restent actifs. La sauvegarde du personnage est conservée indépendamment des dés.
- Les rappels du personnage indiquent la plus basse des limites de PR et de poids de l’origine et du métier. Exemple : Demi-Elfe noir mage → PR max 2 et 10 kg. Les anciennes limites isolées sont retirées des notes pour éviter les contradictions. Les cas particuliers déjà prévus (guerrier, divinité et équipement spécial) sont conservés.
- La perception en très basse lumière est décrite par la règle, jamais par un seuil ou un malus calculé depuis l’INT actuelle : aucune nyctalopie → INT / 2 arrondie au supérieur ; partielle → INT − 4 ; totale → INT. Le cas « moyenne » reste à préciser avec le MJ. Les bonus fixes des sens sont conservés.
- Les mêmes rappels sont utilisés en page 1, dans la pré-fiche, dans le récapitulatif d’équipement et dans les données de l’annexe PDF.

Aucun suivi du poids des objets ni contrôle supplémentaire d’encombrement ajouté.

Installation : remplacer le contenu du dépôt par les fichiers extraits de cette archive complète. Fichiers de code modifiés : app.js, dice-controller.js, profile-limits.js, creation-rules.js, creation.js, equipment-eligibility.js, equipment.js et fiche.js.

Vérifications : 14 contrôles automatisés sur les dés, les règles de limites, le rendu des résumés et les données de l’annexe PDF, ainsi que la syntaxe JavaScript et les imports. Les tests d’interface utilisent un DOM simulé ; aucun essai sur un véritable appareil Android dans cette session.
