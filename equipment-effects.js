import {isShield,armorPrForLimit} from './equipment-eligibility.js';
import {equipmentKind} from './equipment-categories.js';
// Les chiffres portant un astérisque ou une condition appartiennent à un jet/situation.
// Ils figurent dans la colonne de l'objet, mais ne changent pas les valeurs permanentes.
export const EFFECT_KEYS=['COU','INT','CHA','AD','FOR','AT','PRD'];
const EMPTY=()=>Object.fromEntries(EFFECT_KEYS.map(k=>[k,0]));
const keyOf={FO:'FOR',FOR:'FOR',COU:'COU',INT:'INT',CHA:'CHA',AD:'AD',AT:'AT',PRD:'PRD'};
export function parseEquipmentEffect(item){
 const notes=String(item.notes||'');const mods=EMPTY(),terms=[];
 const expression=/\b((?:COU|INT|CHA|AD|FOR|FO|AT|PRD)(?:\s*\/\s*(?:COU|INT|CHA|AD|FOR|FO|AT|PRD))*)\s*([+−-])\s*(\d+)(\*)?/g;
 for(const match of notes.matchAll(expression)){
  const context=notes.slice(Math.max(0,match.index-17),match.index);
  const tail=notes.slice(match.index+match[0].length);
  const dwarf=/\bNain\s*:\s*$/i.test(context),exceptDwarf=/\(sauf Nain\)/i.test(tail.slice(0,20));
  const situational=Boolean(/Effet de groupe|Ennemis\s*:|Toute personne dans la zone|Spécial\*/i.test(notes)||/^\s*(?:à \"|pendant|pour alliés|si quelqu|pour \d|[·,]\s*\d+\s*(?:mn|jour|H))/i.test(tail)||match[4]||/^\s*\((?!sauf Nain\))/.test(tail)||/\b(contre|porteur|sort|combat)\s*$/i.test(context));
  const value=Number(match[3])*(match[2]==='+'?1:-1);
  const keys=match[1].split('/').map(k=>keyOf[k.trim()]);
  const permanent=!item.bonusInactive&&!situational&&(!dwarf||item.dwarf===true)&&(!exceptDwarf||item.dwarf!==true);
  for(const key of keys)if(permanent)mods[key]+=value;
  terms.push({label:match[0],keys,value,permanent,situational,dwarf,exceptDwarf});
 }
 const rupture=notes.match(/\b(\d+)\s*à\s*(\d+)\s*$/);
 const first=notes.replace(/^Prix local.*? · /,'');const damage=/^\s*(?:\d+D(?:\s*[+−-]\s*\d+)?(?:\s*\/\s*\d+D(?:\s*[+−-]\s*\d+)?)?|\d+\s*\+\s*poison)\b/i.exec(first);
 return {mods,terms,summary:terms.map(t=>t.label).join(' · '),rupture:rupture?`${rupture[1]} à ${rupture[2]}`:'',damage:damage?.[0]?.trim()||''};
}
export function armorLocations(item){
 const label=String(item.name||'').toLocaleLowerCase('fr');
 if(isShield(item))return ['bouclier'];
 const explicit=label.match(/\(([^)]+)\)/g)?.join(' ')||'';
 const locations=[['tête',/tete|tête/],['torse',/torse/],['bras',/bras/],['mains',/mains/],['jambes',/jambes/],['pieds',/pieds/]].filter(([,r])=>r.test(explicit)).map(([k])=>k);
 if(locations.length)return locations;
 if(/set d.armure|set armure|armure complète|toutes local/.test(label))return ['tête','torse','bras','mains','jambes','pieds'];
 if(/casque|heaume|chapeau|calotte|couronne|toque|coiffe|capuche|tête/.test(label))return ['tête'];
 if(/botte|chauss|chausson|pieds/.test(label))return ['pieds'];
 if(/gant|gantelet|mains/.test(label))return ['mains'];
 if(/jambe|jambi|pantalon/.test(label))return ['jambes'];
 if(/bras|brassière/.test(label))return ['bras'];
 if(/avec manches|cotte de maille.*manches|robe|tunique/.test(label))return ['torse','bras'];
 return ['torse'];
}
export function defaultArmorIndices(armor){
 const occupied=new Set(),chosen=[];
 armor.forEach((item,index)=>{const loc=armorLocations(item);if(loc.every(k=>!occupied.has(k))){chosen.push(index);loc.forEach(k=>occupied.add(k));}});
 return chosen;
}
export function accessoryEffectItems(data){
 return (data.items||[]).filter(i=>!['weapon','armor','munition','food','potion','poison','ingredient'].includes(equipmentKind(i))&&parseEquipmentEffect({...i,dwarf:/^Nain(?: de la mafia)?$/.test(data.origin||'')}).terms.some(t=>t.permanent));
}
export function computeEquipmentEffects(data,selectedWeapon=0,worn=defaultArmorIndices(data.equipment.armor),activeAccessories=accessoryEffectItems(data)){
 const weapons=data.equipment.weapons,armor=data.equipment.armor;
 const weapon=weapons[selectedWeapon]||null,selected=worn.map(i=>armor[i]).filter(Boolean);
 const occupied=new Map(),conflicts=[];
 for(const item of selected)for(const loc of armorLocations(item)){
  if(occupied.has(loc))conflicts.push(`${loc} : ${occupied.get(loc)} / ${item.name}`);
  else occupied.set(loc,item.name);
 }
 const dwarf=/^Nain(?: de la mafia)?$/.test(data.origin||'');const modifiers=EMPTY(),perItem=new Map();
 for(const item of [...weapons,...armor,...activeAccessories])perItem.set(item,parseEquipmentEffect({...item,dwarf}));
 for(const item of [...selected,...activeAccessories,...(weapon?[weapon]:[])])for(const key of EFFECT_KEYS)modifiers[key]+=perItem.get(item).mods[key];
 const altered=Object.fromEntries(['COU','INT','CHA','AD','FOR'].map(k=>[k,data.stats[k]+modifiers[k]]));
 const attack=Number(data.at)+modifiers.AT,parry=Number(data.prd)+modifiers.PRD;
 const basePr=selected.reduce((total,i)=>total+(Number.isInteger(Number(i.pr))?Number(i.pr):0),0);
 const unknownPr=selected.filter(i=>i.pr===undefined||i.pr===null);
 const cappedPr=selected.reduce((n,i)=>n+armorPrForLimit(i),0);
 const values={magphys:Math.ceil((altered.INT+altered.AD)/2),magpsy:Math.ceil((altered.INT+altered.CHA)/2),resmag:Math.ceil((altered.COU+altered.INT+altered.FOR)/3),esquive:altered.AD,inge:Math.ceil((altered.INT+altered.AD)/2),pres:Math.ceil((altered.AD+altered.CHA)/2),perc:altered.INT,impact:(altered.FOR>12?altered.FOR-12:altered.FOR<=8?-1:0)+(Number(data.choices?.ogreAt)||0)+(Number(data.choices?.ogrePrd)||0)};
 return {weapon,selected,activeAccessories,selectedWeapon,worn,modifiers,altered,attack,parry,basePr,cappedPr,values,unknownPr,conflicts,perItem};
}

export function ruptureLabel(item){const r=parseEquipmentEffect(item).rupture;return r?'Rupt: 1 à '+r.split(' à ').pop():/incassable/i.test(item.notes||'')?'Rupt: incassable':'';}
