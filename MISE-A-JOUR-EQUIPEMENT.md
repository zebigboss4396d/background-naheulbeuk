# Correction du catalogue et de la fiche classique — 18 octobre 2026

## Installation sur le site GitHub

Décompresser l’archive puis envoyer ses fichiers dans le dépôt `creation-personnage-nhb` avec **Add file → Upload files**, en remplaçant les fichiers existants. Les deux nouveaux modules `equipment-routing.js` et `equipment-quantities.js` doivent être ajoutés avec les fichiers modifiés. Enregistrer avec **Commit changes**, attendre la publication GitHub Pages et recharger le site.

La mise à jour concerne le créateur de personnages, pas le site de background.

## Répartition sur la fiche classique

- Page 1 : protections triées par torse, pieds/jambes, mains/bras, tête, puis bouclier ; vêtements ordinaires après les protections.
- Page 2 : sacs à dos, besaces, autres contenants et bourses dans leurs lignes respectives ; aucun doublon dans les objets spéciaux.
- Camping : tente, matelas et couverture dans leurs cases ; éclairage, feu et matériel de bivouac dans les lignes en dessous.
- Objets spéciaux : objets enchantés, artefacts, bijoux magiques et vêtements à effets particuliers tels que les capes concernées ; plus aucun classement par défaut du matériel ordinaire dans cet encart.
- Animaux, montures et véhicules : Machins précieux.
- Munitions et nourriture identiques : une entrée avec quantité, par exemple « Flèche de base ×5 ». Le panier recalcule les quantités et le prix total après chaque ajout ou retrait. Les munitions occupent les lignes d’armes disponibles après les armes ; l’annexe conserve toujours l’inventaire complet.

Les emplacements du modèle original sont en nombre limité. Les entrées dépassant le nombre de lignes disponibles restent détaillées dans l’annexe de création jointe au PDF. Les livres et ingrédients sans case dédiée dans le modèle classique y sont également conservés.

## Catalogue

- Choix explicite Épée, Sabre ou Rapière pour les quatre entrées regroupées ; choix Marteau ou Masse pour les cinq entrées regroupées correspondantes, dont l’arme d’artisan nain. Le nom exact est repris au panier et au PDF. Prix, effets et restrictions de taille inchangés. Les armes nommées explicitement restent telles quelles.
- Dégâts, PR, modificateurs et rupture présentés en blocs distincts. Les précisions complètes du tableau restent consultables.
- Rupture affichée sous la forme « Rupt: 1 à x » lorsque le tableau indique une plage de rupture.
- PR absente d’une protection : PR 0.
- Livres ordinaires et connaissances supprimés du choix pour tous les profils.
- Manuels de départ de magie et de culte conservés selon le métier et l’affiliation.

## Contrôles réalisés

Tests des actions d’ajout/retrait du panier, regroupement des quantités et conservation des variantes d’armes ; contrôle des destinations du matériel et de la PR 0 ; génération d’une fiche classique remplie ; contrôle des champs PDF interactifs et de leurs apparences ; rendu et inspection des deux premières pages.

Le rendu interactif dans un navigateur n’a pas été testé dans cet environnement. Aucun fichier n’a été envoyé directement dans le dépôt GitHub : l’archive doit y être importée.

## Modificateurs des objets

Les autres objets portés ou utilisés (accessoires, bijoux, vêtements, etc.) contribuent également aux caractéristiques modifiées, à l’attaque et à la parade, dans les deux modèles PDF. Sur la page de préparation du PDF, des cases permettent de désactiver les effets des objets simplement transportés. Les valeurs initiales sont conservées dans les cases d’origine ; les valeurs modifiées sont inscrites à côté.

Les effets conditionnels, les bonus à un jet précis et les consommables non utilisés restent décrits dans les effets des objets et dans l’annexe ; ils ne sont pas traités comme des bonus permanents.

## Grimoire commun aux mages

Le « Grimoire des Ordres Néfastes — Magie généraliste — niveau 1 » est disponible gratuitement dans les Livres de sorcellerie pour tous les mages, y compris les mages culinaires hobbits. Il s’ajoute au grimoire gratuit de spécialité lorsqu’il existe. Un seul exemplaire peut être ajouté au paquetage.

## Nom et description des animaux

Dès l’ajout d’un animal ou d’une monture au paquetage, deux champs facultatifs permettent de saisir son nom (50 caractères) et une description sommaire (160 caractères). Chaque animal possède ses propres champs, même lorsque deux animaux du même type sont achetés. Ces informations sont conservées pendant la création et reprises dans le récapitulatif et le PDF, dans « Machins précieux » pour la fiche classique. Le texte complet reste dans l’annexe si la ligne de la fiche manque de place.

## Présentation du petit matériel de bivouac

Le petit matériel de camping (outre, torches, briquet, etc.) est désormais inscrit à la suite, séparé par des points-virgules. Le texte passe à la ligne uniquement lorsque la largeur disponible est atteinte. Les emplacements dédiés à la tente, au matelas et à la couverture sont conservés.
