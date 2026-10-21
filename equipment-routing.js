import {equipmentKind} from './equipment-categories.js';
import {armorLocations} from './equipment-effects.js';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function classicDestination(item){
 const n=norm(item.name),section=norm(item.section),kind=equipmentKind(item),notes=norm(item.notes);
 if(kind==='weapon')return 'weapons';
 if(kind==='armor')return 'armor';
 if(kind==='mount')return 'mounts';
 if(/\bbourse\b/.test(n))return 'purses';
 if(/sac a dos/.test(n))return 'backpacks';
 if(/besace|sacoche/.test(n))return 'satchels';
 if(kind==='bag')return 'containers';
 if(kind==='food')return 'food';
 if(kind==='potion')return 'potions';
 if(kind==='poison')return 'poisons';
 if(kind==='book')return 'books';
 if(kind==='ingredient')return 'ingredients';
 if(kind==='munition')return 'munitions';
 if(/camping|couchage|eclairage et feu/.test(section)||/\b(tente|matelas|couverture|torche|briquet)\b|lampe a huile|flacon d.huile/.test(n))return /^tente\b/.test(n)?'tents':/^matelas\b/.test(n)?'mattresses':/^couverture\b/.test(n)?'blankets':'camping';
 // Une cape à effet particulier fait exception aux vêtements ordinaires.
 if(/\bcape\b/.test(n)&&/\b(?:ad|cha|pr|at|prd)\s*[+−-]\s*\d|magiqu|enchante|maudit|competence|charges?/.test(notes))return 'special';
 if(/vetements ordinaires|vetements et accessoires|robes et vetements|toques et tenues/.test(section)&&!/^stage|^guerisseur|^transport en/.test(n))return 'clothes';
 if(/enchante|reliqu|artefact|objets a charges|bagues et accessoires|baguettes.*parchemins/.test(section)||/\b(?:bague|anneau|pendentif|amulette|medaillon|fibule|talisman)\b/.test(n)&&/magiqu|enchante|maudit|competence|charge|sort|absorb|terreur/.test(notes)||/maudit|enchante|relique|artefact/.test(n))return 'special';
 if(/outils et materiel d.aventure|cuisine et vaisselle|hygiene et soins courants/.test(section))return 'camping';
 return 'other';
}
export function armorOrder(a,b){const rank=i=>{const loc=armorLocations(i);if(loc.includes('torse'))return 0;if(loc.some(l=>['pieds','jambes'].includes(l)))return 1;if(loc.some(l=>['mains','bras'].includes(l)))return 2;if(loc.includes('tête'))return 3;return 4;};return rank(a)-rank(b);}
export function routeEquipment(items){const groups={};for(const item of items){const key=classicDestination(item);(groups[key]??=[]).push(item);}groups.armor=(groups.armor||[]).slice().sort(armorOrder);return groups;}
