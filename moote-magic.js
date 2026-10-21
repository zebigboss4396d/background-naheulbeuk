import {MOOTE_MAGIC_PROFILES} from './moote-magic-data.js';
import {skillKey} from './skill-rules.js';
export {MOOTE_MAGIC_PROFILES};
export const isMooteExtension=profile=>profile.origin==='Semi-homme de la Loi'||Boolean(mooteMagicProfile(profile));
export const mooteMagicProfile=profile=>MOOTE_MAGIC_PROFILES[profile?.origin]||MOOTE_MAGIC_PROFILES[profile?.job]||null;
export const commonSpellCount=(profile,skills=[])=>{const config=mooteMagicProfile(profile);return config?2+(skills.some(s=>skillKey(s)===skillKey(config.bonusSkill))?2:0):0;};
const emptySlot=()=>({roll:null,variantRoll:null,attempts:[]});
export function syncMooteMagic(saved,profile){
 const config=mooteMagicProfile(profile);if(!config)return null;
 const existing=saved?.version===1&&saved.profile===config.id?saved.slots:[];
 return {version:1,profile:config.id,slots:Array.from({length:4},(_,i)=>{const slot=existing?.[i]||{};const roll=Number.isInteger(slot.roll)&&slot.roll>=1&&slot.roll<=config.die?slot.roll:null;
 const variantRoll=roll&&config.common[roll-1].variants&&Number.isInteger(slot.variantRoll)&&slot.variantRoll>=1&&slot.variantRoll<=6?slot.variantRoll:null;
 return {roll,variantRoll,attempts:Array.isArray(slot.attempts)?slot.attempts.filter(n=>Number.isInteger(n)&&n>=1&&n<=config.die).slice(-100):[]};})};
}
export function recordCommonRoll(state,profile,skills,index,result){
 const config=mooteMagicProfile(profile),count=commonSpellCount(profile,skills);
 if(!config||state?.profile!==config.id||!Number.isInteger(index)||index<0||index>=count)throw Error('Emplacement de Fédulogie indisponible.');
 const slot=state.slots[index];if(slot.roll)return {status:'locked'};
 if(!Number.isInteger(result)||result<1||result>config.die)throw Error(`Résultat de D${config.die} invalide.`);
 slot.attempts=[...slot.attempts,result].slice(-100);
 if(state.slots.slice(0,count).some((s,i)=>i!==index&&s.roll===result))return {status:'duplicate',result};
 slot.roll=result;slot.variantRoll=null;return {status:'accepted',result};
}
export function recordVariantRoll(state,profile,skills,index,result){
 const config=mooteMagicProfile(profile);if(!config||state?.profile!==config.id||!Number.isInteger(index)||index<0||index>=commonSpellCount(profile,skills))throw Error('Emplacement de variante indisponible.');
 const slot=state.slots[index],entry=config.common[slot?.roll-1];
 if(!entry?.variants)throw Error('Ce sort ne demande aucun D6 de variante.');
 if(slot.variantRoll)return {status:'locked'};
 if(!Number.isInteger(result)||result<1||result>6)throw Error('Résultat de D6 invalide.');
 slot.variantRoll=result;return {status:'accepted',result};
}
export function mooteMagicError(state,profile,skills=[]){
 const config=mooteMagicProfile(profile);if(!config)return '';
 if(state?.version!==1||state?.profile!==config.id||!Array.isArray(state.slots))return 'Tirez vos sorts communs de Fédulogie.';
 const used=new Set();
 for(let n=0;n<commonSpellCount(profile,skills);n++){
  const slot=state.slots[n];if(!slot||!Number.isInteger(slot.roll)||slot.roll<1||slot.roll>config.die)return `Tirez le sort commun ${n+1}.`;
  if(used.has(slot.roll))return 'Deux sorts communs identiques ont été enregistrés. Relancez le doublon.';used.add(slot.roll);
  if(config.common[slot.roll-1].variants&&(!Number.isInteger(slot.variantRoll)||slot.variantRoll<1||slot.variantRoll>6))return `Tirez le D6 de variante du sort commun ${n+1}.`;
 }
 return '';
}
export function knownMooteSpells(state,profile,skills=[]){
 const config=mooteMagicProfile(profile);if(!config)return {common:[],fixed:[]};
 const valid=state?.profile===config.id&&Array.isArray(state.slots);
 const common=valid?state.slots.slice(0,commonSpellCount(profile,skills)).flatMap((slot,index)=>{
  const entry=Number.isInteger(slot.roll)?config.common[slot.roll-1]:null;if(!entry)return [];
  const variant=entry.variants?.[slot.variantRoll-1]||'';
  return [{...entry,id:`${config.id}-commun-${entry.id}`,slot:index,variantRoll:slot.variantRoll,variant,name:entry.name+(variant?' : '+variant:entry.variants?' : variante à tirer':''),source:`${config.manual}, pages ${config.commonPages}`,draw:`D${config.die} : ${slot.roll}${entry.variants?` ; D6 : ${slot.variantRoll||'à tirer'}`:''}`}];
 }):[];
 return {common,fixed:config.fixed.map((s,i)=>({...s,id:`${config.id}-niveau1-${s.id}`,source:`${config.manual}, page ${6+i}`}))};
}
export function mooteSpellLines(state,profile,skills=[]){
 const config=mooteMagicProfile(profile);if(!config)return [];
 const spells=knownMooteSpells(state,profile,skills);
 const line=s=>`${s.name} — ${s.cost} ; ${s.casting} ; portée : ${s.range} ; durée : ${s.duration}. ${s.effect}${s.notes?' '+s.notes:''} [${s.source}${s.draw?' ; '+s.draw:''}]`;
 return [`Ouvrage de départ : ${config.book}`,`${commonSpellCount(profile,skills)} sorts communs ; les effets s’utilisent en partie et ne modifient pas les statistiques de départ.`,...spells.common.map(line),'Sorts et prodiges de niveau 1 déjà connus :',...spells.fixed.map(line)];
}
