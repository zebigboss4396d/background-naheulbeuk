// Informations de création présentes dans les fiches, en complément des notes
// compactes utilisées sur la première page. Les choix divins seront complétés
// avec les manuels fournis ultérieurement.
export const ORIGIN_DETAILS={
 'Humain':['Aucune restriction propre à l’origine.'],
 'Barbare':['Aucune magie ni armure complète.','Pas d’armes à mécanisme complexe.'],
 'Nain':['Pas de magie, d’arc ni de véritable arme à deux mains de taille humaine.'],
 'Haut-Elfe':['Armure limitée à PR4 (hors magie) ; charge maximale de 10 kg.','Excellentes vue et ouïe ; bon odorat ; nyctalopie partielle.'],
 'Elfe sylvain':['Armure limitée à PR4 (hors magie) ; charge maximale de 10 kg.','Choisir Tête vide ferme l’accès aux métiers de mage, prêtre et paladin.'],
 'Elfe noir':['Armure limitée à PR3 (hors magie) ; charge maximale de 15 kg.','Pas de grand bouclier.'],
 'Semi-homme':['Armure limitée à PR3 (hors magie) ; charge maximale de 10 kg.','Pas d’arc long ni d’arme à deux mains de taille humaine.'],
 'Orque':['Aucune forme de magie ; pas d’arbalète ni d’arme complexe.','Très bon odorat ; mauvaise vue ; nyctalopie totale.'],
 'Gobelin':['Aucune forme de magie ; charge maximale de 10 kg.','Les armes longues à une main comptent comme armes à deux mains.'],
 'Ogre':['Aucune magie ni arme complexe ; armure limitée à PR4.','Les protections de taille Ogre coûtent 30 % de plus.'],
 'Gnome des forêts du Nord':['Magie limitée aux armes et protections ; armure limitée à PR2 ; charge maximale de 2 kg.','Esquive permanente sans perte d’assaut, selon sa fiche.'],
 'Demi-Elfe de 2e génération':['Armure limitée à PR5 (hors magie) ; charge maximale de 15 kg.'],
 'Demi-Haut-Elfe':['Armure limitée à PR5 (hors magie) ; charge maximale de 15 kg.'],
 'Demi-Sylvain':['Armure limitée à PR5 (hors magie) ; charge maximale de 15 kg.'],
 'Demi-Elfe noir':['Armure limitée à PR4 (hors magie) ; charge maximale de 15 kg.'],
 'Demi-Orque':['Magie limitée aux armes et protections enchantées.','Bon odorat ; nyctalopie partielle.'],
 'Demi-Gobelin':['Charge maximale de 15 kg.','Bonne vue et bon odorat ; nyctalopie partielle.'],
 'Demi-Elfe-Nain':['Armure limitée à PR5 (hors magie) ; charge maximale de 20 kg.'],
 'Semi-Elfe':['Armure limitée à PR4 (hors magie) ; charge maximale de 10 kg.','Pas d’armes à deux mains.'],
 'Demi-Ogre elfique':['Armure limitée à PR4 (hors magie) ; charge maximale de 30 kg.','Trait Puissant+.'],
 'Homme-bête':['Aucune maîtrise de la magie ni de la prêtrise.','Très bon odorat et nyctalopie totale.'],
 'Nain de la mafia':['Armure limitée à PR5 (hors magie) ; charge maximale de 8 kg.','Pas de bouclier, d’arc, d’arme à deux mains ou d’arme longue dans la main gauche.'],
 'Amazone syldérienne':['Armure limitée à PR6 ; aucun bouclier.','Magie limitée aux armes enchantées avec accord du personnage ; armes de contact à deux mains, arc ou javelot à distance.'],
 'Chamane de jungle':['Pas d’armure métallique, de casque intégral ni de matériel béni fanghien.','Pas d’arbalète ni d’arme à poudre ; PR naturelle maximale 4.'],
 'Semi-homme de la Loi':['Profil et restrictions propres au supplément non officiel ; 300 PO indiquées dans sa fiche.'],
 'Mage culinaire hobbit':['Profil de magie culinaire propre au supplément non officiel.'],
 'Paladin semi-homme de Picrate':['Affiliation fixée à Picrate par le profil ; 30 EV et 10 EA à la création.'],
 'Paladin semi-homme de Jord’hun':['Affiliation fixée à Jord’hun par le profil ; 30 EV et 10 EA à la création.']
};
export const BEAST_DETAILS={
 'Homme-bête · Homme-Rat':{born:['Nager','Escalader'],notes:['Queue préhensile de 1,5 m.']},
 'Homme-bête · Homme-Cochon':{born:['Second Petit-Déjeuner','Truc de mauviette','Attire les monstres'],notes:[]},
 'Homme-bête · Homme-Bouc':{born:[],notes:['Grandes cornes : −1 aux épreuves en milieu confiné ou étroit.']},
 'Homme-bête · Homme-Loup':{born:['Nager','Déplacement silencieux'],notes:['Pelage épais et physique canin.']},
 'Homme-bête · Homme-Taureau':{born:['Intimider'],notes:['Grandes cornes : −2 aux épreuves en milieu confiné ou étroit.','Trait Puissant+.']},
 'Homme-bête · Homme-Lézard':{born:['Intimider'],notes:['Queue préhensile de 1,5 m ; immunité aux maladies.']}
};
export const JOB_DETAILS={
 'Assassin / Ninja':['Armure limitée à PR3 (hors magie).','AT 11 comprend déjà le bonus d’Adresse.'],
 'Bourgeois / Noble':['Second tirage de fortune ajouté au premier.','Maison de ville moyenne et cheval ; métier définitif.'],
 'Guerrier / Gladiateur':['Limite de protection de l’origine augmentée de 1.','Coup spécial hérité à choisir parmi les quatre proposés.'],
 'Ingénieur':['Armure limitée à PR3 (hors magie) ; pas d’armes de bourrin.'],
 'Mage / Sorcier':['Armure limitée à PR2 (hors magie) ; charge maximale de 10 kg.','Armes de contact : bâton, poignard, dague ou gourdin ; pas d’arc, d’arbalète ni de bouclier.'],
 'Marchand':['Armure limitée à PR3 (hors magie) ; pas d’armes de bourrin.','Charrette, cheval et maison dans un village.'],
 'Ménestrel':['Armure limitée à PR2 (hors magie) ; pas de bouclier.','Armes de contact : bâton, poignard, dague, gourdin ou instrument ; instrument de départ d’une valeur maximale de 300 PO.'],
 'Paladin':['Relique de la divinité requise pour utiliser les pouvoirs ; obligations selon le culte choisi.'],
 'Pirate / Flibustier':['Armure limitée à PR3 (hors magie) ; pas d’arme de bourrin ; métier définitif.'],
 'Prêtre':['Armes, protections et règles de vie définies par la divinité choisie.'],
 'Ranger':['Armure limitée à PR4 (hors magie et équipements spéciaux).'],
 'Voleur':['Armure limitée à PR3 (hors magie).'],
 'Traîne-Patins':['Armure limitée à PR3 ; la compétence Érudition est inaccessible.'],
 'Bourreau':['Armure limitée à PR5 (hors magie) ; armes et magie également soumises à l’origine.'],
 'Sbire':['Armes, protections et magie soumis aux restrictions de l’origine.']
};
