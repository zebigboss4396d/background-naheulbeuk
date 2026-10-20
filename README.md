# Les Chroniques de Fangh — version GitHub Pages

Version complète du générateur de background : six chapitres de choix, sélection géographique progressive et ses PDF sources, description physique, équipement, entourage, récapitulatif, export PDF illustré et portrait recadrable. La demande d’illustration est préparée dans le site puis envoyée manuellement dans ChatGPT.

Aucune installation, compilation, clé API ni base de données n’est nécessaire. Les scripts, polices, illustrations et documents utilisés par le site sont inclus. L’adresse GitHub Pages peut contenir le nom du dépôt : les chemins des ressources sont relatifs.

## Un site autonome

Créer un nouveau dépôt `background-naheulbeuk`, distinct du dépôt du générateur de personnages. Cette archive ne remplace aucun fichier de ce dernier. Le générateur de background a sa propre adresse et ses sauvegardes sont isolées par chemin de publication. Aucun lien ni échange automatique avec le générateur de personnages n’est imposé.

## Mettre le site en ligne — depuis un ordinateur

1. Extraire l’archive ZIP. Ouvrir le dossier extrait qui contient `index.html`. Ne pas envoyer le ZIP sur GitHub : envoyer les fichiers qu’il contient.
2. Se connecter à https://github.com puis choisir **New repository**. Nom conseillé : `background-naheulbeuk`. Choisir **Public** pour utiliser GitHub Pages avec GitHub Free. Cliquer sur **Create repository**.
3. Dans le dépôt vide, choisir **uploading an existing file**. Si le dépôt contient déjà un README, choisir **Add file → Upload files**.
4. Glisser tous les fichiers et dossiers situés à côté de `index.html` dans la zone de dépôt. Conserver les dossiers `assets`, `sources` et `vendor` avec leur contenu. Le fichier `index.html` doit arriver à la racine du dépôt, pas dans un sous-dossier `chroniques-de-fangh`.
5. Cliquer sur **Commit changes** pour enregistrer les fichiers sur la branche `main`.
6. Ouvrir **Settings → Pages**. Dans **Build and deployment**, choisir **Source : Deploy from a branch**, puis **Branch : main**, dossier **/(root)**. Cliquer sur **Save**.
7. Attendre la fin du déploiement. Cette même page fournit le bouton **Visit site** et l’adresse du site. Avec le nom de dépôt conseillé : `https://VOTRE-PSEUDO.github.io/background-naheulbeuk/`.

Le fichier `.nojekyll` fourni désactive le traitement Jekyll. S’il n’a pas été envoyé, le créer sur GitHub avec **Add file → Create new file**, nom `.nojekyll`, contenu vide, puis **Commit changes**.

## Retrouver une fiche commencée sur l’ancien site

Sur l’ancien site, cliquer sur **Sauvegarder ma fiche** pour télécharger la sauvegarde JSON. Ouvrir ensuite le nouveau site GitHub Pages et cliquer sur **Importer** pour sélectionner ce fichier.

La sauvegarde automatique appartient à chaque navigateur et à chaque adresse de site. Elle ne se transfère pas automatiquement à la nouvelle adresse. Les images de portrait et de référence ne sont pas incluses dans le JSON : les choisir à nouveau sur le nouveau site. La sauvegarde JSON complète contient aussi les secrets et notes au MJ : la garder sur son appareil, sans l’ajouter au dépôt du site.

## Après publication

- Tester les six chapitres, les embranchements géographiques et un lien de source.
- À la dernière étape, cliquer dans le cadre portrait, choisir une image et régler son cadrage.
- Télécharger le PDF et vérifier le portrait ainsi que les deux illustrations décoratives.
- Tester l’export JSON puis son import.

Le PDF et les données du personnage sont composés dans le navigateur. Le site ne contient aucun personnage prérempli ni sauvegarde personnelle. L’ouverture de ChatGPT se fait à la demande du joueur.

## Mettre le site à jour

Dans le dépôt, **Add file → Upload files**, envoyer les fichiers modifiés en conservant leurs noms et dossiers, puis **Commit changes**. GitHub Pages republie automatiquement depuis `main`. Si une nouvelle version supprime un fichier, supprimer aussi cet ancien fichier dans le dépôt.

## En cas de problème

- **404 à l’ouverture** : vérifier que `index.html` est bien à la racine et que Pages utilise `main` avec `/(root)`.
- **Images ou PDF sources manquants** : envoyer les dossiers entiers, sans modifier les noms ni les majuscules des fichiers.
- **Le PDF ne se télécharge pas en ouvrant directement index.html sur l’ordinateur** : utiliser l’adresse GitHub Pages ; l’accès aux polices et aux images par `fetch` nécessite une page servie en HTTP/HTTPS.
- **Version ancienne affichée** : vérifier la fin du déploiement dans **Actions**, puis recharger la page.
- **Modifications à partir d’un téléphone** : la sélection de dossiers complets est généralement plus simple depuis un ordinateur.

## Fichiers principaux

- `index.html` : point d’entrée.
- `style.css` : présentation du site.
- `data.js`, `geography-data.js` : choix et références géographiques.
- `app.js`, `geography.js`, `appearance.js`, `relationships.js`, `portrait.js` : interface et interactions.
- `narrative.js` : modèle du récapitulatif des réponses, malgré son nom historique.
- `pdf-export.js` : composition du PDF dans le navigateur.
- `assets/` : fond du site, illustrations du PDF et polices.
- `sources/` : documents géographiques accessibles depuis le catalogue.
- `vendor/` : PDF-lib et sa licence.

## Références et crédits

Projet amateur dans l’univers du Donjon de Naheulbeuk. Les crédits de l’univers et des sources sont conservés dans le site. Les documents de référence restent attribués à leurs auteurs ; leur inclusion ne transfère pas leurs droits. Les licences de PDF-lib et des polices sont fournies avec leurs fichiers. Les consignes de création des illustrations sont dans `ILLUSTRATIONS.md`.

Documentation GitHub utilisée pour ces étapes :
- https://docs.github.com/fr/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

Version exportée : 18 octobre 2026. Source : 190478685e27d70c8266e2c9cf75f5cc3f9e5eed.

## Correctifs du 19 octobre 2026

- L’import réussi d’une sauvegarde réinitialise le portrait, la référence de style et le cadrage. Une importation annulée ou invalide conserve les images courantes.
- Les postures qui utilisent du matériel ou un animal sont proposées selon les éléments déclarés. Une ancienne posture incompatible est remplacée par une posture naturelle dans la demande d’illustration.

## Habillage illustré des formulaires

Les dessins des deux planches du projet accompagnent désormais les rubriques, fondus dans le papier et adaptés à leur thème. Lors de la mise à jour, inclure `illustrations.js` et le dossier `assets/formulaire/` avec les fichiers habituels. Les illustrations du PDF restent inchangées.

## Origine géographique progressive — 20 octobre 2026

La rubrique Les racines présente successivement : territoire, grande région, lieu, situation par rapport à ce lieu, puis précision facultative. Le catalogue séparé est supprimé. Le bouton de source reste accessible auprès du lieu choisi.

Hors Fangh, cinq branches sont proposées : Fernol ; Caladie ; Jungles d’Ammouka et Sungul ; Confins du Givre ; Autres contrées. Dans Autres contrées, le joueur choisit une contrée avant d’accéder aux lieux. Le rapport `sources/Environs-TerredeFangh-MJ.pdf` complète les références, avec les pages correspondantes. Les descriptions courtes ne révèlent pas les événements de scénario.

Les identifiants des lieux déjà présents sont conservés pour reprendre les anciennes sauvegardes. Au changement de territoire ou de région, les choix devenus incompatibles sont réinitialisés. Les anciennes précisions textuelles sont conservées à part dans une section repliée, sans être intégrées au nouveau background.

Pour installer cette version, remplacer les fichiers de l’archive et ajouter le nouveau PDF dans le dossier `sources`. Les illustrations des formulaires et les corrections d’import/portrait restent incluses.

## Cadres de vie selon les régions

Dans « Autres contrées », la sélection principale propose désormais des cadres de vie correspondant à la région : caravane, hameau, quartier portuaire, campement, etc. Les lieux nommés dans les sources restent accessibles dans un volet facultatif. Pour les autres branches, ces cadres sont proposés lorsque le joueur choisit la région sans lieu précis. Un choix personnel est toujours possible. Ces descriptions sont des suggestions narratives et ne sont pas ajoutées comme localités officielles au catalogue des références.

Le nouveau fichier `geography-landscapes.js` doit être envoyé avec les fichiers mis à jour. Le cadre retenu figure dans le récapitulatif et le PDF, et est conservé dans la sauvegarde JSON.
