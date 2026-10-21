// Limites explicites de l'origine et du métier, en protection non magique et en kg.
// Une valeur absente signifie qu'aucune limite chiffrée n'est indiquée par cette fiche.
const origins={
 'Haut-Elfe':{pr:4,kg:10},'Elfe sylvain':{pr:4,kg:10},'Elfe noir':{pr:3,kg:15},
 'Semi-homme':{pr:3,kg:10},'Gobelin':{kg:10},'Ogre':{pr:4},
 'Gnome des forêts du Nord':{pr:2,kg:2},
 'Demi-Elfe de 2e génération':{pr:5,kg:15},'Demi-Haut-Elfe':{pr:5,kg:15},
 'Demi-Sylvain':{pr:5,kg:15},'Demi-Elfe noir':{pr:4,kg:15},
 'Demi-Gobelin':{kg:15},'Demi-Elfe-Nain':{pr:5,kg:20},
 'Semi-Elfe':{pr:4,kg:10},'Demi-Ogre elfique':{pr:4,kg:30},
 'Nain de la mafia':{pr:5,kg:8},'Amazone syldérienne':{pr:6},
 'Semi-homme de la Loi':{pr:3},'Mage culinaire hobbit':{pr:3},
 'Paladin semi-homme de Picrate':{pr:3},'Paladin semi-homme de Jord’hun':{pr:3}
};
const jobs={
 'Assassin / Ninja':{pr:3},'Ingénieur':{pr:3},'Mage / Sorcier':{pr:2,kg:10},
 'Marchand':{pr:3},'Ménestrel':{pr:2},'Pirate / Flibustier':{pr:3},
 'Ranger':{pr:4},'Voleur':{pr:3},'Traîne-Patins':{pr:3},'Bourreau':{pr:5}
};
const originWeapons={
 'Barbare':['Pas d’arme à mécanisme complexe'],
 'Nain':['Pas d’arc','Pas de véritable arme à deux mains de taille humaine'],
 'Elfe noir':['Pas de grand bouclier'],
 'Semi-homme':['Pas d’arc long','Pas d’arme à deux mains de taille humaine'],
 'Orque':['Pas d’arbalète','Pas d’arme complexe'],
 'Gobelin':['Arme longue à une main maniée comme une arme à deux mains'],
 'Ogre':['Pas d’arme complexe'],
 'Semi-Elfe':['Pas d’arme à deux mains'],
 'Nain de la mafia':['Pas de bouclier','Pas d’arc','Pas d’arme à deux mains','Pas d’arme longue en main gauche'],
 'Amazone syldérienne':['Armes de contact à deux mains','À distance : arc ou javelot','Pas de bouclier'],
 'Chamane de jungle':['Pas d’arbalète','Pas d’arme à poudre']
};
const jobWeapons={
 'Ingénieur':['Pas d’arme de bourrin'],
 'Mage / Sorcier':['Au contact : bâton, poignard, dague ou gourdin','Pas d’arc, d’arbalète ni de bouclier'],
 'Marchand':['Pas d’arme de bourrin'],
 'Ménestrel':['Au contact : bâton, poignard, dague, gourdin ou instrument','Pas de bouclier'],
 'Pirate / Flibustier':['Pas d’arme de bourrin'],
 'Prêtre':['Armes et protections précisées par la divinité choisie en page 2'],
 'Paladin':['Armes et protections à vérifier selon la divinité choisie en page 2']
};
const divinePrLimits={'Prêtre:Niourgl':5,'Prêtre:Adathie':5,'Prêtre:Dlul':5};
export function profileLimits(origin,job,affiliation=''){
 const o=origins[origin.name]||{},j=jobs[job?.name]||{};
 const warrior=job?.name==='Guerrier / Gladiateur';
 const originPr=o.pr==null?null:o.pr+(warrior?1:0);
 const pr=[originPr,j.pr,divinePrLimits[`${job?.name}:${affiliation}`]].filter(Number.isFinite);
 const kg=[o.kg,j.kg].filter(Number.isFinite);
 return {pr:pr.length?Math.min(...pr):null,kg:kg.length?Math.min(...kg):null,
  naturalPr:origin.name==='Chamane de jungle'?4:null,
  weapons:[...new Set([...(originWeapons[origin.name]||[]),...(jobWeapons[job?.name]||[])])]
 };
}

// Les anciennes limites isolées ne doivent pas contredire le profil combiné.
export function withoutNumericLimits(note){
 return String(note||'')
  .replace(/(?:armure limitée à\s*PR|PR d[’']armure|PR max(?:imale)?\s*:?|PR naturelle)\s*\d+(?:\s*\([^)]*\))?/gi,match=>/équipements spéciaux/i.test(match)?'Équipements spéciaux : limites selon leur fiche':'')
  .replace(/(?:charge(?: maximale)?(?: de)?|poids maximal porté(?: de)?|transport de charges limité à)\s*\d+(?:[,.]\d+)?\s*kg/gi,'')
  .replace(/([.;])\s*[;.,]+/g,'$1').replace(/^[\s;,.]+|[\s;,.]+$/g,'').trim();
}
export function limitSummary(origin,job,affiliation=''){
 const limits=profileLimits(origin,job,affiliation);
 const pr=limits.pr??limits.naturalPr;
 return `Limites retenues : PR max ${pr??'sans limite chiffrée'}${pr===null?'':' (hors magie)'} ; poids maximal porté ${limits.kg===null?'sans limite chiffrée':limits.kg+' kg'}.`;
}
export function profileNotes(notes,origin,job,affiliation=''){
 return [limitSummary(origin,job,affiliation),...notes.map(withoutNumericLimits).filter(Boolean)];
}
