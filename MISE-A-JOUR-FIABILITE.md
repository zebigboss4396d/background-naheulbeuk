# Mise à jour de fiabilité — 19 octobre 2026

Cette archive remplace la version précédente. Extraire son contenu et remplacer les fichiers de même nom à la racine du dépôt GitHub. Ajouter également les nouveaux fichiers JavaScript : character-storage.js, skill-rules.js, equipment-eligibility.js et starting-equipment.js. Conserver les deux modèles PDF et tous les autres fichiers fournis.

## Corrections intégrées

- Bouclier inclus dans la PR totale et les protections locales, exclu du plafond de PR. Le plafond provient d'une définition commune aux profils et tient compte des limites divines chiffrées disponibles.
- PR de la robe sacerdotale corrigée ; distinction explicite entre une PR nulle (***) et une donnée inconnue. Une PR inconnue empêche de générer une fiche chiffrée trompeuse.
- Bonus composés (CHA/COU, AT/PRD…) conservés ; dégâts Fernol lisibles malgré le préfixe de conversion monétaire ; protection de plusieurs localisations reconnue.
- MAGPHYS, MAGPSY, RESMAG, ESQUIVE, INGE, PRES, PERC et PI recalculés à partir des caractéristiques modifiées par le matériel actif. Toutes les moyennes sont arrondies au supérieur.
- Exclusions des compétences corrigées pour le Traîne-Patins, l'Homme-bête et le Sbire, y compris humain. Chance du rempailleur accordée au Sbire lorsque trois caractéristiques sont au plus à 10. Les choix sont vérifiés de nouveau avant validation finale.
- Correction de l'audit : Tannerie, Tire-laine et Compagnonnage sont des compétences spéciales, déjà proposées par les profils concernés ; elles ne sont pas ajoutées à la liste générique. Tire-laine ajoute son D20 au tirage automatique de fortune ; en saisie manuelle, le montant doit inclure le bonus.
- Restrictions explicites d'armes, de boucliers et de protections filtrées dans le catalogue. Les objets de niveau supérieur sont écartés ; les robes de mage ont l'exception prévue par leur tableau : protection utilisable, bonus de niveau inactifs.
- Dotations du noble, du marchand et du Semi-homme de la Loi ajoutées hors budget. Le cheval reste à préciser avec le MJ ; aucun type ou score de monture n'est inventé.
- Instrument du ménestrel offert : un exemplaire au choix, valeur maximale de 300 PO conformément au métier. Cette dotation distincte n'augmente pas la limite des achats à 200 PO.
- Manuels gratuits ordinaires ajoutés automatiquement au paquetage. Les profils du Mooté conservent leurs règles particulières ; aucun titre ou ouvrage offert n'est inventé à partir des trois premières pages des paladins hobbits.
- Relique personnelle du paladin renseignée séparément du catalogue, avec un coût pris sur le budget (0 si fournie par le MJ). Choix et prix à valider avec le MJ. Les anciennes catégories supprimées ne sont pas rétablies.
- Sauvegarde locale durable, export/import JSON, reprise des dés, conservation des décisions compatibles lors d'un retour en arrière et sauvegarde des objets effectivement portés. Les anciens objets devenus incompatibles sont signalés. Un nouveau budget trop faible bloque la validation jusqu'à correction.

## Conventions conservées

Ordre COU, INT, CHA, AD, FOR. Budget d'équipement égal à trois fois la fortune, or de départ conservé et solde d'équipement perdu. Plafond d'achat par objet 200 PO ; bourgeois/noble 360 PO. Classement des objets par prix et des menus par ordre alphabétique. Catalogues conditionnels, gratuité des manuels et grimoire généraliste des mages conservés. Aucune gestion supplémentaire du poids.

## Vérifications et limites

18 cas automatisés de règles et sauvegarde, 6 scénarios de rendu et d'interactions sur DOM simulé, génération des deux PDF et contrôle de champs PDF / widgets / apparences. Première page des deux modèles remplis inspectée visuellement. Aucun essai sur un véritable appareil Android dans cette session.

Les filtres automatisent les interdictions explicites reconnues dans les données disponibles. Les effets conditionnels, les particularités détaillées des cultes, la taille réelle de certaines armes, les objets à charges et les décisions de disponibilité continuent de demander une lecture du manuel et l'accord du MJ. Les effets situatifs sont conservés dans les notes sans être transformés en bonus permanents.
