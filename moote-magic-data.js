// Supplément non officiel « Semi-hommes du Mooté », Robin de la Chopine.
// Résumés de création, niveau 1. Les effets restent des pouvoirs à utiliser en partie.
const variants=(a,b,c,d)=>[a,a,a,b,c,d];
const common=(roll,id,name,effect,extra={})=>({roll,id,name,effect,cost:'3 PA',casting:'Automatique',duration:'10 minutes par niveau, sauf précision de l’effet',range:'Mesurée depuis le lanceur ; voir effet',...extra});
const delivery=common(1,'mat-hom','Livraison express de Mat-Hom','Livre un objet emballé de moins de 1 kg, muni de l’adresse du destinataire, dans une boîte aux lettres non pleine.',{duration:'Livraison en une heure dans le Mooté, en 24 heures ailleurs en Terre de Fangh',range:'Toute la Terre de Fangh'});
const smoke=common(2,'fumee','Fumée de ma pipe en bois','Dessine des formes simples dans la fumée d’une pipe hobbite ; +4 à la compétence lors des concours de fumée.',{duration:'Une heure'});
const paths=common(3,'sentiers','Connaissance des sentiers et des chemins','Indique la première habitation non hostile dans la direction souhaitée.',{range:'200 mètres par niveau'});
const cleaning=common(4,'nettoyage','Nettoyage','Réduit de moitié le temps de nettoyage et enlève les taches de terre, poussière, aliments et gras.',{variants:variants('la vaisselle','les outils de jardin','le linge','sa chambre')});
const detect=(roll)=>common(roll,'detection','Détection','Repère la plus grande quantité de l’aliment recherché dans la zone, sans garantir sa qualité.',{range:'30 mètres de rayon par niveau',variants:variants('les champignons','les framboises et fraises des bois','les mûres','le miel sauvage')});
const destruction=(roll)=>common(roll,'destruction','Destruction massive','Détruit les nuisibles désignés dans la zone. Les cadavres restent à ramasser ; ce pouvoir déplaît aux amis de la nature.',{range:'10 mètres de rayon',variants:variants('les limaces de potager','les pucerons de jardin','les doryphores et autres coléoptères','les vers des vignes')});
const charm=(roll)=>common(roll,'charme','Charme','Permet de donner des ordres simples à l’espèce de petits animaux désignée.',{range:'30 mètres de rayon',variants:variants('les taupes','les écureuils','les lapins','les grenouilles')});
const livestock=(roll)=>common(roll,'aneries','Âneries','Calme les animaux domestiques désignés ; +2 aux épreuves de compétence appropriées, par exemple la traite.',{range:'30 mètres de rayon',variants:variants('les ânes ou poneys','les cochons','les vaches','les volailles')});
const fixed=(id,name,effect,cost,casting,range,duration,notes='')=>({id,name,effect,cost,casting,range,duration,notes,level:1});
export const MOOTE_MAGIC_PROFILES={
 'Mage culinaire hobbit':{
  id:'mage-culinaire',die:8,bonusSkill:'Runes bizarres de ma grand-mère',manual:'Manuel du Mage hobbit, v2.1',commonPages:'3–4',
  book:'Recueil des arcanes de magie culinaire hobbite — La cuisine pour les Nuls',
  common:[delivery,smoke,paths,cleaning,detect(5),destruction(6),charm(7),livestock(8)],
  fixed:[
   fixed('glace','Boule de glace (à la crème)','Projectile de froid magique : 1D6 + niveau, sans bonus d’INT. Sur un 6 au dé de dégâts, la cible humanoïde teste son AD ; en cas d’échec, elle perd trois assauts à se relever.','3 PA','MagiePhys +2, jusqu’au niveau 6','5 mètres','Immédiat','Incantation : un assaut. Parfum personnalisable avec le MJ.'),
   fixed('casse-croute','Casse-croûte minute','Produit une part par niveau ; chaque part rend 1 EV par niveau du mage.','6 PA','MagiePhys +2, jusqu’au niveau 6','Contact','Immédiat','Incantation : huit assauts ; hors combat. Nécessite un œuf. Gourmandise : test COU +3 avant de sacrifier l’aliment. Une part/jour/personne ; trois pour un hobbit ou un ogre.'),
   fixed('merguez','Merguez flambée','Chaque projectile inflige 1D6 + niveau de feu magique, sans bonus d’INT et en ignorant la PR naturelle. Après le sort, jet AD +2 pour toucher, séparé pour chaque merguez ; pas d’esquive.','5 PA par merguez','MagiePhys, jusqu’au niveau 6','10 mètres','Immédiat','Un assaut d’incantation par merguez ; merguez et onguent de feu d’Altela nécessaires. Gourmandise : test COU +3 pour chaque merguez sacrifiée.'),
   fixed('pizza','Pizza de saison express','Produit une part par niveau : chaque part nourrit une personne, rend 3 EV et donne COU +1 pendant 24 heures. À manger dans la minute.','5 PA','MagiePhys +2, jusqu’au niveau 6','Contact','Immédiat','Incantation : trois assauts ; hors combat ; coûte aussi 1 PO. Une part/jour/personne ; trois pour un hobbit ou un ogre. Seul le plus fort bonus de sort s’applique.')
  ]
 },
 'Paladin semi-homme de Picrate':{
  id:'picrate',die:8,bonusSkill:'Trucs et astuces de mon beau-père',manual:'Manuel du Paladin semi-homme de Picrate, v1.2',commonPages:'3–4',
  book:'Recueil d’astuces et de blagues par Michou Koloutchi / Catalogue complet des Vins — La Bible selon Roby Parterre',
  common:[delivery,smoke,
   common(3,'ruelles','Connaissance des ruelles et des impasses','Guide vers le débit de boisson le plus proche dans une ville ou un village.',{range:'50 mètres par niveau'}),
   common(4,'sommelier','Instinct du sommelier','Trouve la meilleure bouteille à proximité et aide à en estimer la qualité.',{range:'3 mètres de rayon',duration:'Cinq minutes'}),
   common(5,'excuse','Excuse bidon','Permet de faire accepter une excuse à son retour tardif et aviné.',{casting:'Automatique ; l’effet demande une épreuve d’INT +4'}),
   common(6,'amities','Amitiés liquides','Permet d’obtenir un verre de vin gratuit. Les Nains y sont immunisés.',{casting:'Automatique ; l’effet demande une épreuve de CHA +4',notes:'Une utilisation par jour, pour un seul verre.'}),
   common(7,'vin','Amélioration','Améliore le goût du vin ; sa valeur augmente de 25 % si vendu dans les 24 heures. Donne +2 aux épreuves de coupage et d’assemblage.',{variants:variants('le vin rouge','le vin blanc','le rosé','le vin pétillant')}),
   common(8,'sarment','Destruction massive','Détruit les nuisibles de la vigne désignés dans la zone.',{range:'10 mètres de rayon',variants:variants('les vers de sarment','les pucerons des ceps','les guêpes du raisin','les chenilles de vigne')})
  ],
  fixed:[
   fixed('eau-vin','Changer l’eau en vin','Au niveau 1, transforme un quart de litre d’eau en vin de piètre qualité.','1 PA par niveau','MagiePhys +2, jusqu’au niveau 6','10 mètres','Un jour','Incantation : cinq assauts ; le contenant évolue avec le niveau. Critique réussi : vin permanent et de meilleure qualité.'),
   fixed('ivresse','Ivresse du combat','Une attaque au corps à corps bénéficie de AT +2 et de +2 PI magiques aux niveaux 1 à 3 ; encore +2 PI contre une cible ayant Radin. Sans bonus d’INT.','2 PA','AT +2','Contact','Une attaque','Avoir bu au moins un verre de vin dans la journée. Un assaut ; avec ou sans arme. Coûte 1 PA si l’attaque rate, 2 PA si elle est parée ou esquivée. Non cumulable avec un coup spécial ou autre prodige dans le même assaut.')
  ]
 },
 'Paladin semi-homme de Jord’hun':{
  id:'jordhun',die:10,bonusSkill:'Trucs et astuces de mon grand-père',manual:'Manuel du Paladin semi-homme de Jord’hun, v1.1',commonPages:'3–4',
  book:'Almanach du Père Joc',
  common:[delivery,smoke,paths,
   common(4,'herbes','Détection des fleurs et herbes médicinales','Facilite la récolte d’ingrédients pour les mixtures du culte : 1D3 herbes à chaque utilisation.',{range:'30 mètres de rayon',notes:'Le D3 de récolte se lance en partie, pas pendant la création.'}),
   common(5,'jardinier','Maître-jardinier','Permet d’entretenir parfaitement environ 10 m² de jardinet. Aucune rémunération, mais le gîte et le couvert peuvent être offerts.',{duration:'Une heure'}),
   common(6,'ruche','Maître de la ruche','Apaise les abeilles géantes du Mooté. Si le paladin est attaqué, elles le protègent avec PR 8 ; il ne peut leur ordonner d’attaquer.',{duration:'Une minute par niveau',notes:'À chaque utilisation : D6 1–4 → trois doses de miel (3 EV/dose) ; 5 → cire pour trois bougies ; 6 → gelée royale (5 EV, COU/INT/CHA +1 pendant 24 h). Ce D6 se lance en partie ; aucune récompense n’est acquise à la création.'}),
   detect(7),destruction(8),charm(9),livestock(10)
  ],
  fixed:[
   fixed('abri','Abri de Fort Thun','Au niveau 1, crée un abri de feuillages et fougères avec un feu de camp, pour une personne.','4 PA','MagiePhys, jusqu’au niveau 6','10 mètres','4 heures + 1 heure par niveau','Incantation : cinq minutes aux niveaux 1 à 6 ; extérieur uniquement. L’abri évolue avec les niveaux.'),
   fixed('boue','Flaque de boue','Transforme le sol naturel en boue ; le déplacement y est divisé par deux.','3 PA','MagiePsy +2, jusqu’au niveau 6','20 mètres ; 2 m² par niveau','1D6 minutes + 1 minute par niveau','Incantation : deux assauts ; extérieur uniquement. Paladins de Braav, Elfes et Nains testent COU +3 pour entrer dans la zone.'),
   fixed('force','Force de la terre','Une attaque avec une arme au corps à corps gagne AT +2 et +2 PI magiques aux niveaux 1 à 3 ; encore +2 PI contre morts-vivants et démons. Sans bonus d’INT.','2 PA','AT +2','Contact','Une attaque','Un assaut ; coûte 1 PA si l’attaque rate, 2 PA si elle est parée ou esquivée. Non cumulable avec un coup spécial ou autre prodige dans le même assaut.'),
   fixed('rateaux','Piège à râteaux','Déclenche 1D3 râteaux infligeant chacun 1D6 + niveau de dégâts contondants non magiques. Sur un 6 au dé de dégâts, la cible teste sa FOR ou reste étourdie trois assauts.','4 PA','MagiePhys, jusqu’au niveau 6','En vue, jusqu’à 20 mètres ; zone circulaire de 2 mètres par niveau','Une heure par niveau','Incantation : quatre assauts ; extérieur et terrain naturel uniquement ; quelques feuilles mortes. Un mot de commande protège les compagnons. Le piège peut toucher les badauds.')
  ]
 }
};
