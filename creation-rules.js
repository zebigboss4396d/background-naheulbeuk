import {ORDER,derivedValues,startValues} from './data.js';

// Les sens absents des fiches sont normaux. « Nyctalopie moyenne » est conservée
// explicitement : le tableau de base ne définit que partielle et totale.
export const SENSES={
 'Haut-Elfe':{vue:2,ouie:2,odorat:1,nuit:'partielle'},
 'Elfe sylvain':{vue:2,ouie:2,odorat:1,nuit:'totale'},
 'Elfe noir':{vue:2,ouie:2,nuit:'totale'},
 'Orque':{vue:-1,odorat:2,nuit:'totale'},
 'Gobelin':{vue:1,odorat:2,nuit:'totale'},
 'Ogre':{odorat:2},
 'Demi-Elfe de 2e génération':{vue:2,ouie:1,nuit:'partielle'},
 'Demi-Haut-Elfe':{vue:2,ouie:1,nuit:'partielle'},
 'Demi-Sylvain':{vue:1,ouie:1,odorat:1,nuit:'partielle'},
 'Demi-Elfe noir':{vue:1,ouie:1,nuit:'totale'},
 'Demi-Orque':{odorat:1,nuit:'partielle'},
 'Demi-Gobelin':{vue:1,odorat:1,nuit:'partielle'},
 'Demi-Elfe-Nain':{vue:2,nuit:'moyenne'},
 'Semi-Elfe':{vue:1,nuit:'moyenne'},
 'Demi-Ogre elfique':{vue:1,odorat:1,nuit:'moyenne'},
 'Homme-bête':{odorat:1,nuit:'totale'}
};
export const WARRIOR_TECHNIQUES=['Coup de bouclier','Double attaque','Désarmement','Œil de Robinoude'];
export const isWarrior=job=>job?.name==='Guerrier / Gladiateur';
export const isEngineer=job=>job?.name==='Ingénieur';
export const isMerchant=job=>job?.name==='Marchand';
export const isRanger=job=>job?.name==='Ranger';
export const needsMagic=job=>job?.name==='Mage / Sorcier';
export const needsDeity=job=>['Prêtre','Paladin'].includes(job?.name);
export function adjustedValues(base,origin,job,choices={},magic=''){
 const stats={...base};
 const val=startValues(base,origin,job);
 let at=val.at,prd=val.prd,impactExtra=0,ev=val.ev,ea=val.ea;
 if(isEngineer(job)||isMerchant(job)){
  const validTo=isEngineer(job)?['INT','AD']:['INT','CHA'];
  if(['AT','PRD'].includes(choices.tradeFrom)&&validTo.includes(choices.tradeTo)){
   if(choices.tradeFrom==='AT')at--;else prd--;
   stats[choices.tradeTo]++;
  }
 }
 if(isRanger(job)&&ORDER.includes(choices.rangerFrom)&&ORDER.includes(choices.rangerTo)&&choices.rangerFrom!==choices.rangerTo&&stats[choices.rangerFrom]>1){
  stats[choices.rangerFrom]--;stats[choices.rangerTo]++;
 }
 if(isWarrior(job)){
  if(choices.warriorBonus==='AT')at++;else if(choices.warriorBonus==='PRD')prd++;
  if(choices.warriorTrade==='AT vers PRD'){at--;prd++;}
  if(choices.warriorTrade==='PRD vers AT'){prd--;at++;}
 }
 if(origin.name==='Ogre'){
  const fromAt=Math.min(3,Math.max(0,Number(choices.ogreAt)||0));
  const fromPrd=Math.min(3,Math.max(0,Number(choices.ogrePrd)||0));
  if(fromAt+fromPrd<=3&&at>=fromAt&&prd>=fromPrd){at-=fromAt;prd-=fromPrd;impactExtra=fromAt+fromPrd;}
 }
 if(needsMagic(job)&&magic==='Magie noire de Tzinntch'){
  stats.CHA++;stats.FOR-=2;ev-=5;ea+=5;
 }
 if(stats.AD>=13&&!job?.adIncluded){
  if(choices.address==='AT')at++;else if(choices.address==='PRD')prd++;
 }else if(stats.AD<=8){
  if(choices.address==='AT')at--;else if(choices.address==='PRD')prd--;
 }
 const derived=derivedValues(stats);
 return {stats,at,prd,ev,ea,magphys:derived.magphys,magpsy:derived.magpsy,resmag:derived.resmag,
  inge:Math.ceil((stats.INT+stats.AD)/2),pres:Math.ceil((stats.AD+stats.CHA)/2),perc:stats.INT,
  esquive:stats.AD,impact:(stats.FOR>12?stats.FOR-12:stats.FOR<=8?-1:0)+impactExtra,
  spell:origin.name==='Mage culinaire hobbit'?0:Math.max(0,stats.INT-12),impactExtra};
}
export function perception(stats,origin){
 const sense=SENSES[origin.beastDelta?'Homme-bête':origin.name]||{};
 const base=stats.INT;
 const lowlight=sense.nuit==='totale'?base:sense.nuit==='partielle'?base-4:sense.nuit==='moyenne'?null:Math.ceil(base/2);
 return {sense,base,vue:base+(sense.vue||0),odorat:base+(sense.odorat||0),ouie:base+(sense.ouie||0),lowlight};
}

export const SENSORY_RULE='Sens mauvais : −1 ; normal : 0 ; bon : +1 ; excellent : +2.';
export const LOWLIGHT_RULES='Très basse lumière : sans nyctalopie, épreuve sous INT / 2, arrondie au supérieur ; nyctalopie partielle, épreuve sous INT − 4 ; nyctalopie totale, épreuve sous INT.';
export function lowlightRule(night){
 if(night==='moyenne')return 'Nyctalopie moyenne : effet à préciser avec le MJ, ce cas étant absent du tableau de base.';
 if(night==='totale')return 'Nyctalopie totale : épreuve sous INT en très basse lumière.';
 if(night==='partielle')return 'Nyctalopie partielle : épreuve sous INT − 4 en très basse lumière.';
 return 'Aucune nyctalopie : épreuve sous INT / 2 en très basse lumière, arrondie au supérieur.';
}
