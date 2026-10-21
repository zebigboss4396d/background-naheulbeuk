// Toutes les conditions portent sur les scores attribués avant les choix propres au métier.
export const ORDER = ['COU','INT','CHA','AD','FOR'];
const O=(name,min={},max={},ev=30,extra={})=>({name,min,max,ev,...extra});
export const origins=[
 O('Humain',{}, {},30,{note:'Polyvalent. Trois compétences optionnelles à la création ; avec métier, deux de la fiche métier et une compétence générique.'}),
 O('Barbare',{FOR:13,COU:12},{},35,{at:9,prd:9,note:'Magie et armure complète interdites ; pas d’armes complexes. Tête vide acquise.'}),
 O('Nain',{FOR:12,COU:11},{},35,{note:'Pas de magie, d’arc ni d’arme à deux mains de taille humaine.'}),
 O('Haut-Elfe',{CHA:12,AD:12,INT:11},{FOR:12},25,{note:'Charge 10 kg ; PR d’armure 4. +1 CHA aux niveaux 2 et 3.'}),
 O('Elfe sylvain',{CHA:12,AD:12},{FOR:11},25,{note:'Charge 10 kg ; PR d’armure 4. +1 CHA aux niveaux 2 et 3. Tête vide est un choix optionnel qui ferme l’accès aux carrières magiques.'}),
 O('Elfe noir',{AD:13,INT:12},{FOR:12},25,{note:'Charge 15 kg ; PR d’armure 3.'}),
 O('Semi-homme',{COU:12,INT:10},{FOR:10},25,{note:'PR d’armure 3 ; charge 10 kg ; pas d’arc long ni d’arme à deux mains de taille humaine.'}),
 O('Orque',{FOR:12},{INT:8,CHA:10},35,{at:9,prd:9,note:'Aucune magie ; armes complexes interdites ; Tête vide acquise.'}),
 O('Gobelin',{}, {INT:10,CHA:8,COU:10,FOR:9},20,{note:'Aucune magie ; Tête vide acquise ; charge 10 kg.'}),
 O('Ogre',{FOR:13},{INT:9,AD:11,CHA:10},45,{at:9,prd:9,note:'Pas de magie ; PR d’armure 4. À la création, convertir jusqu’à 3 points d’AT/PRD en autant de dégâts de contact.'}),
 O('Gnome des forêts du Nord',{AD:13,INT:10},{FOR:8},15,{at:10,prd:8,note:'Magie limitée aux armes/protections ; PR d’armure 2 ; charge 2 kg.'}),
 O('Demi-Elfe de 2e génération',{CHA:10,AD:11},{},28,{note:'PR d’armure 5 ; charge 15 kg.'}),
 O('Demi-Haut-Elfe',{CHA:11,AD:11,INT:11},{},28,{note:'PR d’armure 5 ; charge 15 kg.'}),
 O('Demi-Sylvain',{CHA:11,AD:10},{},28,{note:'PR d’armure 5 ; charge 15 kg.'}),
 O('Demi-Elfe noir',{INT:11,AD:12},{},28,{note:'PR d’armure 4 ; charge 15 kg.'}),
 O('Demi-Orque',{FOR:12},{INT:10,CHA:11},35,{note:'Magie limitée aux armes/protections enchantées ; Tête vide acquise.'}),
 O('Demi-Gobelin',{}, {CHA:10,INT:12,FOR:11},25,{note:'Charge 15 kg. La fiche donne +1D4 PV par niveau ultérieur.'}),
 O('Demi-Elfe-Nain',{INT:11,AD:11,COU:11,FOR:11},{},30,{note:'PR d’armure 5 ; charge 20 kg.'}),
 O('Semi-Elfe',{INT:11,COU:11},{FOR:11},28,{note:'PR d’armure 4 ; charge 10 kg ; pas d’armes à deux mains.'}),
 O('Demi-Ogre elfique',{FOR:13},{INT:11,AD:12,CHA:9},38,{note:'PR d’armure 4 ; charge 30 kg ; Puissant+.'}),
 O('Homme-bête',{FOR:12},{INT:10,CHA:10},null,{note:'Version tirée au D6 ; modifications de caractéristiques et EV propres à la version. Tête vide acquise ; magie et prêtrise interdites.',beast:true}),
 O('Nain de la mafia',{COU:10,INT:11,AD:12,FOR:11},{},38,{at:10,prd:9,bundle:true,note:'Origine et métier indissociables. PR d’armure 5 ; charge 8 kg ; pas de bouclier.'}),
 O('Amazone syldérienne',{COU:12,CHA:12,AD:11,FOR:12},{},38,{at:10,prd:8,bundle:true,note:'Origine et métier indissociables. Tête vide ; PR d’armure 6 ; armes de contact à deux mains.'}),
 O('Chamane de jungle',{INT:11,CHA:11,AD:11},{},34,{at:10,prd:9,bundle:true,note:'Origine et métier indissociables. Humain ; PR naturelle 4 ; pas d’armure métallique.'}),
 O('Semi-homme de la Loi',{INT:12,CHA:12},{FOR:10},30,{at:8,prd:10,bundle:true,unofficial:true,note:'Origine et métier indissociables ; supplément non officiel. Pas de magie ; PR d’armure 3 ; 300 PO et possessions propres à la fiche.'}),
 O('Mage culinaire hobbit',{COU:12,INT:11},{FOR:10},30,{at:8,prd:10,ea:20,bundle:true,unofficial:true,note:'Origine et métier indissociables ; supplément non officiel. Magie culinaire ; PR d’armure 3 ; aucun bonus de PI magiques fondé sur l’INT.'}),
 O('Paladin semi-homme de Picrate',{COU:12,INT:10,CHA:11,FOR:10},{FOR:10},30,{ea:10,bundle:true,unofficial:true,note:'Profil propre au manuel ; règles de création tirées des trois premières pages seulement. FOR exactement 10 ; PR d’armure 3.'}),
 O('Paladin semi-homme de Jord’hun',{COU:12,INT:10,CHA:11,FOR:10},{FOR:10},30,{ea:10,bundle:true,unofficial:true,note:'Profil propre au manuel ; règles de création tirées des trois premières pages seulement. FOR exactement 10 ; PR d’armure 3.'})
];
export const beasts=[
 {name:'Homme-Rat',ev:35,delta:{FOR:-2,CHA:-3,AD:2}},
 {name:'Homme-Cochon',ev:44,delta:{FOR:1,INT:-1,CHA:-2}},
 {name:'Homme-Bouc',ev:40,delta:{AD:1,COU:1,FOR:-1}},
 {name:'Homme-Loup',ev:38,delta:{CHA:1}},
 {name:'Homme-Taureau',ev:45,delta:{FOR:2,CHA:1,AD:-2,INT:-2}},
 {name:'Homme-Lézard',ev:40,delta:{AD:1,INT:1,FOR:1,CHA:-2}}
];
const J=(name,min={},max={},extra={})=>({name,min,max,...extra});
export const jobs=[
 J('Assassin / Ninja',{AD:13},{},{at:11,prd:8,adIncluded:true,note:'AT 11 comprend déjà le bonus d’AD ; PR d’armure 3.'}),
 J('Bourgeois / Noble',{INT:10,CHA:11},{},{at:7,prd:9,note:'Deuxième tirage de fortune ; maison et cheval. Métier définitif.'}),
 J('Guerrier / Gladiateur',{FOR:12,COU:12},{},{evPlus:5,note:'EV +5 ; +1 en AT ou PRD. Peut échanger 1 point entre AT et PRD. Limite de PR de l’origine +1 ; coup spécial hérité au choix.'}),
 J('Ingénieur',{AD:11},{},{note:'Retirer 1 en AT ou PRD et l’ajouter en INT ou AD ; PR d’armure 3.'}),
 J('Mage / Sorcier',{INT:12},{},{magic:true,ea:30,note:'EV 20 pour l’Humain ; sinon EV de l’origine −30 %, arrondie au supérieur. PR d’armure 2 ; charge 10 kg.'}),
 J('Marchand',{INT:12,CHA:11},{},{note:'Retirer 1 en AT ou PRD et l’ajouter en INT ou CHA ; PR d’armure 3. Maison, charrette et cheval.'}),
 J('Ménestrel',{AD:11,CHA:12},{},{note:'PR d’armure 2 ; instrument de départ (300 PO maximum).'}),
 J('Paladin',{COU:12,INT:10,CHA:11,FOR:9},{},{magic:true,ea:10,note:'EV 32 pour l’Humain ; sinon EV de l’origine +2 ; affiliation divine à préciser ensuite.'}),
 J('Pirate / Flibustier',{AD:11,COU:11},{},{note:'PR d’armure 3 ; métier définitif.'}),
 J('Prêtre',{CHA:12},{},{magic:true,ea:20,note:'EV selon l’origine ; affiliation divine à préciser ensuite.'}),
 J('Ranger',{AD:10,CHA:10},{},{note:'Peut déplacer 1 point d’une caractéristique vers une autre au niveau 1 ; PR d’armure 4.'}),
 J('Voleur',{AD:12},{},{note:'PR d’armure 3.'}),
 J('Traîne-Patins',{},{},{evPlus:-2,at:7,prd:8,note:'Toutes origines ; PR d’armure 3 ; Érudition inaccessible.'}),
 J('Bourreau',{},{},{evPlus:2,at:10,prd:8,note:'Toutes origines sauf Gnome des forêts du Nord ; PR d’armure 5.'}),
 J('Sbire',{},{COU:10,INT:11,CHA:11},{at:9,prd:9,note:'Métier adapté aux faibles scores ; compétence Chance du rempailleur si trois caractéristiques ≤ 10.'})
];
export function isEligible(stats,entry){return ORDER.every(k=>(entry.min[k]===undefined||stats[k]>=entry.min[k])&&(entry.max[k]===undefined||stats[k]<=entry.max[k]));}
export function compatible(origin,job){
 if(job.name==='Bourreau'&&origin.name==='Gnome des forêts du Nord')return false;
 if(!job.magic)return true;
 const type=origin.beastDelta?'Homme-bête':origin.name;
 if(job.name==='Mage / Sorcier'&&['Barbare','Nain','Orque','Gobelin','Ogre','Gnome des forêts du Nord','Demi-Orque','Homme-bête'].includes(type))return false;
 if(['Barbare','Orque','Gobelin','Ogre','Demi-Orque','Homme-bête'].includes(type))return false;
 return true;
}
export function derivedValues(stats){return {
 magphys:Math.ceil((stats.INT+stats.AD)/2),
 magpsy:Math.ceil((stats.INT+stats.CHA)/2),
 resmag:Math.ceil((stats.COU+stats.INT+stats.FOR)/3)
};}
export function startValues(stats,origin,job){
 let at=job?.at??origin.at??8,prd=job?.prd??origin.prd??10,ev=origin.ev,ea=job?.ea??origin.ea??null;
 if(job?.name==='Mage / Sorcier')ev=origin.name==='Humain'?20:Math.ceil(ev*.7);
 else if(job?.name==='Paladin')ev=origin.name==='Humain'?32:ev+2;
 else if(job?.evPlus)ev+=job.evPlus;
 let adChoice=null;
 if(stats.AD>12&&!job?.adIncluded)adChoice='+1 AT ou +1 PRD (AD ≥ 13)';
 if(stats.AD<=8)adChoice='−1 AT ou −1 PRD (AD ≤ 8)';
 return {at,prd,ev,ea,adChoice,impact:stats.FOR>12?stats.FOR-12:stats.FOR<=8?-1:0,spell:origin.name==='Mage culinaire hobbit'?0:stats.INT>12?stats.INT-12:0};
}
