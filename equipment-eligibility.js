import {profileLimits} from './profile-limits.js';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const isShield=i=>/bouclier|pavois/i.test((i.name||'')+' '+(i.section||''));
export const isMagicArmor=i=>/ench\.|enchante|magique/i.test(norm([i.name,i.section].join(' ')));
export const armorPrForLimit=i=>isShield(i)?0:Number(i.prForLimit??i.pr)||0;
export function characterPrLimit(p){
 const limits=profileLimits({name:p.origin},{name:p.job},p.affiliation);return limits.pr??limits.naturalPr;
}
export function equipmentEligibility(item,p){
 const n=norm(item.name),section=norm(item.section),o=p.origin||'',j=p.job||'',god=p.affiliation||'';
 const weapon=item.kind==='weapon',shield=isShield(item),metal=/metall|metal|maille|acier|fer\b|bronze|thritil/.test(n+' '+section),two=/deux mains|2 mains|piques|armes d.hast/.test(section+' '+n);
 const bow=section==='arcs',cross=section==='arbaletes',powder=section==='armes a poudre';
 const level=Number(n.match(/\bniv(?:eau|eaux)?\.?\s*(\d+)/)?.[1]||1);
 const robe=item.kind==='armor'&&/robe/.test(n)&&section==='robes et vetements de mage';
 const fail=reason=>({allowed:false,reason});
 if(level>1&&!robe)return fail(`Réservé au niveau ${level} ou supérieur.`);
 if(j==='Mage / Sorcier'){
  if(shield||bow||cross)return fail('Le mage ne peut utiliser ni arc, ni arbalète, ni bouclier.');
  if(weapon&&!powder&&!/baton|bourdon|crosse|gourdin|poignard|dague|baguette/.test(n))return fail('Arme de contact incompatible avec le métier de mage.');
 }
 if(j==='Ménestrel'&&(shield||weapon&&!bow&&!cross&&!powder&&!/baton|gourdin|poignard|dague|instrument/.test(n)))return fail('Arme ou bouclier incompatible avec le ménestrel.');
 if(['Ingénieur','Marchand','Pirate / Flibustier'].includes(j)&&weapon&&two)return fail('Ce métier ne permet pas les armes de bourrin.');
 if(['Barbare','Orque','Ogre','Chamane de jungle'].includes(o)&&(cross||powder))return fail('Arme à mécanisme incompatible avec cette origine.');
 if(o==='Nain de la mafia'&&(shield||bow||weapon&&two))return fail('Bouclier, arc et arme à deux mains interdits au Nain de la mafia.');
 if(o==='Nain'&&(bow||weapon&&two&&!/nain/.test(n)))return fail('Arc ou arme à deux mains de taille humaine interdit au Nain.');
 if(/Semi-homme|hobbit/.test(o)&&(weapon&&two&&!/hobbit|semi.homme|camhif/.test(n+' '+section)||bow&&/long/.test(n)))return fail('Arme trop grande pour un semi-homme.');
 if(o==='Semi-Elfe'&&weapon&&two)return fail('Le Semi-Elfe ne peut manier d’arme à deux mains.');
 if(o==='Elfe noir'&&shield&&/grand/.test(n))return fail('Le grand bouclier est interdit à l’Elfe noir.');
 if(o==='Amazone syldérienne'&&(shield||cross||powder||weapon&&!two&&!bow&&section!=='javelots'))return fail('L’Amazone utilise les armes de contact à deux mains, arcs et javelots.');
 if(['Semi-homme de la Loi','Mage culinaire hobbit','Paladin semi-homme de Picrate','Paladin semi-homme de Jord’hun'].includes(o)&&item.kind==='armor'&&(metal||/armure complete/.test(n+' '+section)))return fail('Ce profil du Mooté ne porte pas de métal ni d’armure complète.');
 if(['Semi-homme de la Loi','Mage culinaire hobbit','Paladin semi-homme de Picrate'].includes(o)&&bow)return fail('Ce profil du Mooté n’utilise pas d’arc.');
 if(j==='Prêtre'&&['Slanoush','Youclidh'].includes(god)&&item.kind==='armor'&&metal)return fail(`Protection métallique incompatible avec ${god}.`);
 if(j==='Prêtre'&&god==='Slanoush'&&(weapon&&two||item.kind==='armor'&&/armure complete/.test(n+' '+section)))return fail('Équipement interdit au prêtre de Slanoush.');
 const prLimit=characterPrLimit(p);
 if(item.kind==='armor'&&!shield&&prLimit!==null&&armorPrForLimit(item)>prLimit)return fail(`PR de cette pièce supérieure à la limite ${prLimit} du profil.`);
 return {allowed:true,reason:robe&&level>1?`Robe utilisable au niveau 1 ; bonus du niveau ${level} inactifs.`:''};
}
