const gift=(id,name,kind='misc')=>({id:'dotation-'+id,name,pricePc:0,kind,catalog:'standard',category:'Divers',section:'Dotation de départ',source:'Dotation du métier',notes:'Déjà possédé à la création ; hors budget d’achat.',unique:true,startingGift:true});
export function startingPossessions(p){
 if(p.origin==='Semi-homme de la Loi')return [gift('maison-loi','Maison luxueuse dans le Mooté (5 à 8 pièces)'),gift('poney-loi','Poney du Semi-homme de la Loi','mount'),gift('charrette-loi','Petite charrette du Semi-homme de la Loi','mount'),{...gift('textes-loi','Textes réglementaires de référence (codes de droit, cadastre…)','book'),notes:'Obligation du profil : les garder sur soi. Contenu à préciser avec le MJ.'}];
 if(p.job==='Bourgeois / Noble')return [gift('maison-noble','Maison du bourgeois / noble'),gift('cheval-noble','Cheval du bourgeois / noble (à préciser avec le MJ)','mount')];
 if(p.job==='Marchand')return [gift('maison-marchand','Maison du marchand'),gift('charrette-marchand','Charrette du marchand','mount'),gift('cheval-marchand','Cheval du marchand (à préciser avec le MJ)','mount')];
 return [];
}
// L’instrument offert est une dotation prévue par le métier (300 PO), pas un achat du catalogue.
export function instrumentGifts(items,p){
 return p.job==='Ménestrel'?items.filter(i=>i.section.startsWith('Instruments')&&i.pricePc<=30000&&i.starterAvailable!==false).map(i=>({...i,id:'dotation-instrument-'+i.id,baseId:undefined,name:i.name+' — instrument offert',pricePc:0,originalPricePc:i.pricePc,section:'Instrument offert (un au choix)',startingGift:true,unique:true,source:'Dotation du ménestrel (300 PO maximum)'})):[];
}
export function personalRelic(p){
 if(p.job!=='Paladin'||!p.relic?.name?.trim())return null;
 return {...gift('relique-paladin','Relique de '+p.affiliation+' : '+p.relic.name.trim()),pricePc:Math.max(0,Number(p.relic.price)||0)*100,startingGift:false,notes:'Support des pouvoirs du paladin ; choix et prix à valider avec le MJ.'};
}
