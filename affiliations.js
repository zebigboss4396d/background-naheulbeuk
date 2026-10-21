// Sources : Règles de magie/prêtrise ; Descriptifs des disciplines magiques ;
// grimoires et manuels de prêtrise/paladin fournis par le joueur.
export const MAGIC_DISCIPLINES=[
 {name:'Magie de combat',description:'Sorts offensifs, protections et renforts de combat.'},
 {name:'Magie domestique',description:'Magie utile à la vie quotidienne, en ville ou à la maison.'},
 {name:'Magie du feu',description:'Sorts liés au feu, offensifs et parfois dangereux pour l’entourage.'},
 {name:'Métamorphose',description:'Transformations et magie chaotique.'},
 {name:'Thermodynamique',description:'Gestion de chaleur et d’énergie ; techniques plus élaborées à haut niveau.'},
 {name:'Nécromancie',description:'Magie des morts ; la carrière reste limitée à cette spécialisation et à la magie généraliste.'},
 {name:'Illusion',description:'Diversions et illusions ; consommation d’énergie souvent modérée.'},
 {name:'Eau et glace',description:'Sorts d’eau, de glace, protections et invocations.'},
 {name:'Terre',description:'Camouflage, soutien, magie offensive et défensive.'},
 {name:'Air',description:'Protection, soutien et contrôle du vent.'},
 {name:'Invocation',description:'Appel de créatures ; une autre spécialité seulement à partir du niveau 5, hors Nécromancie et Tzinntch.'},
 {name:'Magie noire de Tzinntch',description:'Affiliation au culte : CHA +1, FOR −2, EV −5, EA +5 dès le départ ; moitié des gains reversée au culte. Aucune autre spécialité.'}
];
export const PRIEST_DEITIES=[
 {name:'Niourgl',description:'Maladies et corruption ; restrictions d’hygiène et de soins.'},
 {name:'Adathie',description:'Justice et défense de la loi ; obligations juridiques et alimentaires.'},
 {name:'Slanoush',description:'Plaisir, relations sociales et armes atypiques ; restrictions d’équipement.'},
 {name:'Dlul',description:'Sommeil et confort ; obligations de repos et restrictions d’armes.'},
 {name:'Youclidh',description:'Soins et santé ; obligations d’hygiène et d’assistance aux blessés.'}
];
export const PALADIN_DEITIES=[
 {name:'Niourgl',description:'Maladies, infection et combat ; restrictions liées à la propreté et aux soins.'},
 {name:'Braav',description:'Protection et lutte contre les morts-vivants ; obligations strictes.'},
 {name:'Slanoush',description:'Combat et divinité du plaisir ; restrictions sur les protections.'},
 {name:'Dlul',description:'Sommeil, marteau et affrontement des peaux-vertes ; obligations de repos.'},
 {name:'Khornettoh',description:'Combat violent et armes tranchantes ; obligations envers les ennemis du culte.'}
];
export const DIVINE_DETAILS={
 'Prêtre:Niourgl':['Repos EV/EA ×1,5 ; maladie et repas avariés donnent des avantages selon la fiche.','Malus de CHA en négociation et séduction ; pas de savon ni de soins extérieurs ; armure limitée à PR5.'],
 'Prêtre:Adathie':['Bonus de dégâts contre les hors-la-loi, connaissance juridique, EV +1 après un repas au barbecue.','Armure limitée à PR5 ; obligations de justice et d’assistance aux compagnons.'],
 'Prêtre:Slanoush':['Bonus conditionnel avec les armes atypiques et contre certains cultes ennemis.','Pas d’armure complète ou métallique ; pas d’arme à deux mains ; obligations d’hygiène.'],
 'Prêtre:Dlul':['Bonus conditionnels contre les peaux-vertes et certains cultes ; repos amélioré avec le matériel requis.','Porter oreiller, couverture et pyjama ; restrictions d’armes ; armure limitée à PR5.'],
 'Prêtre:Youclidh':['Repos EV/EA ×1,5 ; bonus de soin et contre les adeptes de Niourgl.','Pas d’armure métallique ni d’arme empoisonnée ; protéger les blessés ; hygiène quotidienne.'],
 'Paladin:Niourgl':['Bonus conditionnels liés aux maladies et aux blessures.','Respecter les interdits de soins et d’hygiène indiqués dans le manuel.'],
 'Paladin:Braav':['Bonus conditionnels contre morts-vivants, démons et peaux-vertes.','Obligations de lutte contre les nuisibles et de comportement précis selon le manuel.'],
 'Paladin:Slanoush':['Bonus conditionnels contre Dlul et Tzinntch et avec les armes atypiques.','Restrictions sur les protections métalliques et les obligations d’hygiène.'],
 'Paladin:Dlul':['Bonus conditionnels contre peaux-vertes et avec le marteau ; repos amélioré.','Oreiller, couverture, pyjama, sieste et repos réguliers requis.'],
 'Paladin:Khornettoh':['Pas de restriction d’armure ; bonus conditionnels avec les armes tranchantes et contre certains adversaires.','Restrictions de compétences et obligations envers les cultes rivaux ; voir le manuel.']
};
