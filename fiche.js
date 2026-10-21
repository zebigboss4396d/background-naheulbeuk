import {isHobbitProfile,equipmentPriceText} from './equipment-pricing.js';
import {mooteMagicProfile,mooteMagicError,mooteSpellLines,knownMooteSpells} from './moote-magic.js';
import {mooteMagicSummaryHTML} from './moote-magic-ui.js';
import {characterStorage} from './character-storage.js';
import {origins,jobs} from './data.js';
import {acquiredSkills,uniqueSkills,validateSkillSelection} from './skill-rules.js';
import {characterPrLimit,equipmentEligibility} from './equipment-eligibility.js';
import {DIVINE_DETAILS} from './affiliations.js';
import {groupEquipment,quantityName} from './equipment-quantities.js';
import {catalogForProfile,resolveEquipmentItem,animalLabel} from './equipment-rules.js';
import {equipmentKind} from './equipment-categories.js';
import {routeEquipment,armorOrder} from './equipment-routing.js';
import {ORIGIN_DETAILS,BEAST_DETAILS,JOB_DETAILS} from './creation-details.js';
import {profileNotes,withoutNumericLimits} from './profile-limits.js';
import {SENSES,lowlightRule,SENSORY_RULE,LOWLIGHT_RULES} from './creation-rules.js';
import {computeEquipmentEffects,accessoryEffectItems,defaultArmorIndices,armorLocations,parseEquipmentEffect} from './equipment-effects.js';
const root=document.getElementById('sheet-root');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const profile=JSON.parse(characterStorage.getItem('naheul-character')||'null');
const valid=profile&&['COU','INT','CHA','AD','FOR'].every(k=>Number.isFinite(profile.stats?.[k]))&&Number.isFinite(profile.gold);
if(!valid){root.innerHTML='<h2>Personnage manquant</h2><p>Validez la création et le paquetage avant de préparer les fiches.</p><a class="primary continue-link" href="index.html">Commencer la création</a>';}
else init().catch(err=>{root.innerHTML=`<h2>Fiches indisponibles</h2><p>${esc(err.message)}</p><a href="equipement.html">Revenir au choix de l’équipement</a>`;});
const ceil=Math.ceil;
export function prepareData(c,skillCatalog={}){
 const s=c.stats;const born=acquiredSkills(c.origin,c.job,c.stats,skillCatalog,BEAST_DETAILS[c.origin]?.born||[]);
 const skills=uniqueSkills([...born,...(c.skills||[])]);
 const detail=profileNotes([...(ORIGIN_DETAILS[c.origin?.startsWith('Homme-bête')?'Homme-bête':c.origin]||[]),...(BEAST_DETAILS[c.origin]?.notes||[]),...(JOB_DETAILS[c.job]||[]),...(c.creationNotes||[]),...(DIVINE_DETAILS[`${c.job}:${c.affiliation}`]||[])],{name:c.origin},{name:c.job},c.affiliation);
 const affinity=c.affiliation||(/Picrate|Jord.hun/.test(c.origin)?c.origin.match(/Picrate|Jord.hun/)?.[0]:'')||'';
 const sense=SENSES[c.origin?.startsWith('Homme-bête')?'Homme-bête':c.origin]||{};
 const sourceItems=Array.isArray(c.equipment)?c.equipment:[];
 const items=groupEquipment(sourceItems).map(i=>({...i,originalName:i.name,name:animalLabel({...i,name:quantityName(i)})}));
 const pc=items.reduce((total,i)=>total+(Number(i.pricePc)||0),0);
 const money=pc=>`${(pc/100).toLocaleString('fr-FR',{maximumFractionDigits:2})} PO`;
 const values={magphys:ceil((s.INT+s.AD)/2),magpsy:ceil((s.INT+s.CHA)/2),resmag:ceil((s.COU+s.INT+s.FOR)/3),esquive:s.AD,inge:ceil((s.INT+s.AD)/2),pres:ceil((s.AD+s.CHA)/2),perc:s.INT,impact:(s.FOR>12?s.FOR-12:s.FOR<=8?-1:0)+(Number(c.choices?.ogreAt)||0)+(Number(c.choices?.ogrePrd)||0)};
 const equipment={weapons:items.filter(i=>equipmentKind(i)==='weapon'),armor:items.filter(i=>equipmentKind(i)==='armor'),food:items.filter(i=>equipmentKind(i)==='food'),poisons:items.filter(i=>equipmentKind(i)==='poison'),potions:items.filter(i=>equipmentKind(i)==='potion'),books:items.filter(i=>equipmentKind(i)==='book'),mounts:items.filter(i=>equipmentKind(i)==='mount'),munitions:items.filter(i=>equipmentKind(i)==='munition'),ingredients:items.filter(i=>equipmentKind(i)==='ingredient'),bags:items.filter(i=>equipmentKind(i)==='bag')};
 const normalize=x=>String(x??'').replace(/[\t\r\n]+/g,' ').trim();
 const basics=[`Nom : ${c.name}`,`Sexe : ${c.sex||'Non précisé'}`,`Origine : ${c.origin}`,`Métier : ${c.job||'Sans métier'}`,`Niveau : 1`,...['COU','INT','CHA','AD','FOR'].map(k=>`${k} : ${s[k]}`),`AT : ${c.at} · PRD : ${c.prd} · EV : ${c.ev??'—'} · EA : ${c.ea??'—'}`,`MAGPHYS : ${values.magphys} · MAGPSY : ${values.magpsy} · RESMAG : ${values.resmag}`,`ESQUIVE : ${values.esquive} · INGE : ${values.inge} · PRES : ${values.pres} · PERC : ${values.perc}`,`PI de FOR : ${values.impact>=0?'+':''}${values.impact} (avec les conversions choisies, avant équipement)`,`PI magiques : +${(c.origin==='Mage culinaire hobbit'?0:Math.max(0,s.INT-12))} si applicable`,`Points de destin : ${c.destiny}`,`Pièces d'or conservées : ${c.gold} PO`,`Budget d'équipement : ${c.gold*3} PO · Dépensé : ${money(pc)} · Solde perdu : ${money(c.gold*300-pc)}`];
 const choiceLabels={warriorBonus:'Guerrier : point supplémentaire en',warriorTrade:'Guerrier : échange AT / PRD',warriorTechnique:'Coup spécial',tradeFrom:'Point retiré à',tradeTo:'Point ajouté à',rangerFrom:'Ranger : point retiré à',rangerTo:'Ranger : point ajouté à',ogreAt:'Ogre : AT convertis en dégâts',ogrePrd:'Ogre : PRD convertis en dégâts',address:'Bonus / malus d’Adresse appliqué à'};const choices=Object.entries(c.choices||{}).filter(([k,v])=>v!=null&&v!==''&&v!=='aucun'&&v!=='0').map(([k,v])=>`${choiceLabels[k]||k} : ${v}`);
 const modifiers=[`Modificateurs : Vue ${sense.vue||0} · Ouïe ${sense.ouie||0} · Odorat ${sense.odorat||0}`,lowlightRule(sense.nuit),SENSORY_RULE,LOWLIGHT_RULES];
 if(isHobbitProfile(c))basics.push('Tarif semi-homme : +20 % sur les vêtements et protections, hors articles conçus pour hobbit ; dotations gratuites conservées.');
 const groups=[['Caractéristiques avant équipement',basics],['Choix de création',[c.allocation?`Répartition des tirages : ${c.allocation}`:'',...choices,affinity?`Spécialité ou divinité : ${affinity}`:'Aucune spécialité ou divinité choisie',withoutNumericLimits(c.affiliationNote)].filter(Boolean)],['Compétences de naissance et choisies',skills.length?skills:['Aucune compétence enregistrée']],['Perception et conditions',modifiers],['Avantages et restrictions du profil',detail.length?detail:['Consulter les manuels du profil et du métier']],['Paquetage retenu',items.length?items.map(i=>`${normalize(i.name)} · ${equipmentPriceText(i,money)}${i.source?.startsWith('Fernol')?' · prix régional provisoire':''}`):['Aucun objet sélectionné']]];
 const mooteLines=mooteSpellLines(c.mooteMagic,c,c.skills);if(mooteLines.length)groups.push(['Fédulogie et grimoire du Mooté',mooteLines]);
 equipment.armor.sort(armorOrder);return {...c,skills,detail,affinity,values,equipment,items,pc,money,groups,routed:routeEquipment(items)};
}
export function withEffects(data,weaponIndex=0,armorIndices=defaultArmorIndices(data.equipment.armor),activeAccessories=accessoryEffectItems(data)){
 const effect=computeEquipmentEffects(data,weaponIndex,armorIndices,activeAccessories);effect.prLimit=characterPrLimit(data);effect.limitExceeded=effect.prLimit!==null&&effect.cappedPr>effect.prLimit;
 const effectsLines=[`Autres objets actifs : ${effect.activeAccessories.map(i=>i.name).join('; ')||'aucun'}`,`Arme utilisée : ${effect.weapon?.name||'aucune'}`,`Protections portées : ${effect.selected.map(i=>i.name).join(' ; ')||'aucune'}`,`Caractéristiques avec matériel : ${['COU','INT','CHA','AD','FOR'].map(k=>`${k} ${effect.altered[k]}`).join(' · ')}`,`AT avec arme utilisée : ${effect.attack} · PRD : ${effect.parry}`,`Valeurs avec matériel : MAGPHYS ${effect.values.magphys} · MAGPSY ${effect.values.magpsy} · RESMAG ${effect.values.resmag} · ESQUIVE ${effect.values.esquive} · INGE ${effect.values.inge} · PRES ${effect.values.pres} · PERC ${effect.values.perc} · PI ${effect.values.impact}`,`PR totale : ${effect.basePr} ; PR soumise à la limite (hors bouclier ; part magique séparée si renseignée) : ${effect.cappedPr}${effect.prLimit!==null?' · limite du profil : '+effect.prLimit:''}${effect.unknownPr.length?' (pièces dont la PR n’est pas indiquée : '+effect.unknownPr.map(i=>i.name).join(', ')+')':''}`];
 const itemLines=data.items.map(i=>{const parsed=parseEquipmentEffect({...i,dwarf:/^Nain(?: de la mafia)?$/.test(data.origin||'')});return `${i.name} : ${parsed.summary||'aucun modificateur chiffré'}${parsed.damage?' · dégâts '+parsed.damage:''}${parsed.rupture?' · rupture '+parsed.rupture:''}${data.equipment.armor.includes(i)?effect.selected.includes(i)?' · porté':' · transporté':''}`;});
 const magicGroups=data.groups.filter(([title])=>title==='Fédulogie et grimoire du Mooté');
 const otherGroups=data.groups.filter(([title])=>title!=='Fédulogie et grimoire du Mooté');
 return {...data,effect,values:effect.values,groups:[...otherGroups,['Effets du matériel',[...effectsLines,...itemLines]],...magicGroups]};
}
function textField(form,name,value,max=100){
 try{const field=form.getTextField(name);if(typeof field.disableCombing==='function')field.disableCombing();if(/^Text(?:[2-7])?$/.test(name))field.setFontSize(30);if(/^(?:ArmeBonMal|ArmureBonMal|Arme0|Armure0)/.test(name))field.setFontSize(9);field.setText(String(value??'').slice(0,max));return true;}catch{return false;}
}
function fillInteractive(form,d){
 const s=d.stats,v=d.values,e=d.equipment,fx=d.effect;
 const map={NOM:d.name,Origine01:d.origin,Origine02:d.job||'Sans métier',Origine03:d.sex==='Masculin'?'M':d.sex==='Féminin'?'F':d.sex||'',COU:s.COU,INT:s.INT,CHA:s.CHA,AD:s.AD,FO:s.FOR,Niveau:1,EXP:0,RM:v.resmag,Destin:d.destiny,PVMAX:d.ev,PV01:d.ev,PAMAX:d.ea,PA01:d.ea,Riche01:d.gold,MagiePhys:v.magphys,MagiePsy:v.magpsy,ScoreATBase:d.at,ScorePRDBase:d.prd,AT01:d.at,PRD01:d.prd,Competences:d.skills.join('\n'),EquipementTrucs:d.items.filter(i=>!e.weapons.includes(i)&&!e.armor.includes(i)).map(i=>i.name).join('\n'),Ingredients:e.ingredients.map(i=>i.name).join('\n'),MesLivres:e.books.map(i=>i.name).join('\n'),Nourriture:e.food.map(i=>i.name).join('\n'),ObjetsSpeciaux:d.affinity?`Spécialité ou culte : ${d.affinity}`:'',Monture01:e.mounts[0]?.name||'',Monture02:e.mounts[1]?.name||'',BonusFO:v.impact,Notes01:`${d.affinity?'Spécialité ou divinité : '+d.affinity+'\n':''}${d.detail.join('\n')}${mooteMagicProfile(d)?'\nGrimoire du Mooté : '+[...knownMooteSpells(d.mooteMagic,d,d.skills).common,...knownMooteSpells(d.mooteMagic,d,d.skills).fixed].map(s=>s.name).join(' ; '):''}`};
 for(const [key,value] of Object.entries(map))if(value!==undefined)textField(form,key,value,key==='Competences'||key==='EquipementTrucs'||key==='Notes01'?2200:150);
 e.weapons.slice(0,3).forEach((i,n)=>textField(form,`Arme0${n+1}`,i.name,65));
 e.armor.slice(0,7).forEach((i,n)=>textField(form,`Armure0${n+1}`,i.name,65));
 e.munitions.slice(0,7).forEach((i,n)=>textField(form,`Munition0${n+1}`,i.name,65));
 e.potions.slice(0,13).forEach((i,n)=>textField(form,`Potion0${n+1}`,i.name,65));
 e.poisons.slice(0,7).forEach((i,n)=>textField(form,`Poison0${n+1}`,i.name,65));
 for(const key of ['COU','INT','CHA','AD','FOR'])if(fx.modifiers[key])textField(form,key==='FOR'?'FOmod':`${key}mod`,fx.altered[key]);
 const weapons=[...(fx.weapon?[fx.weapon]:[]),...e.weapons.filter(i=>i!==fx.weapon)].slice(0,3);
 weapons.forEach((i,index)=>{
  const n=String(index+1).padStart(2,'0'),effect=fx.perItem.get(i),armorAt=fx.modifiers.AT-(fx.weapon?fx.perItem.get(fx.weapon).mods.AT:0),armorPrd=fx.modifiers.PRD-(fx.weapon?fx.perItem.get(fx.weapon).mods.PRD:0);
  textField(form,`Arme${n}`,i.name,65);textField(form,`ArmeBonMal${n}`,effect.summary||'—',85);textField(form,`ArmeNotes${n}`,i.notes||'',115);textField(form,`ArmePI${n}`,effect.damage,25);textField(form,`ArmeRUP${n}`,effect.rupture,20);
  textField(form,`AT${n}`,Number(d.at)+armorAt+effect.mods.AT);textField(form,`PRD${n}`,Number(d.prd)+armorPrd+effect.mods.PRD);
 });
 e.armor.slice(0,7).forEach((i,index)=>{const n=String(index+1).padStart(2,'0'),effect=fx.perItem.get(i);
  textField(form,`ArmureBonMal${n}`,`${effect.summary||'—'}${fx.selected.includes(i)?'':' (non porté)'}`,85);
  if(i.pr!==undefined&&i.pr!==null)textField(form,`PRNat${n}`,i.pr);
  textField(form,`RupPR${n}`,effect.rupture,20);
 });
 const locations=Object.fromEntries(['tête','bras','bouclier','torse','mains','jambes','pieds'].map(k=>[k,0]));
 for(const i of fx.selected)for(const loc of armorLocations(i))locations[loc]+=Number(i.pr)||0;
 for(const loc of ['tête','bras','torse','mains','jambes','pieds'])locations[loc]+=locations.bouclier;
 ['tête','bras','bouclier','torse','mains','jambes','pieds'].forEach((k,n)=>{if(locations[k])textField(form,`PRLOC0${n+1}`,locations[k]);});
 if(fx.basePr)textField(form,'PRTOTAL',fx.basePr);
}
function fillClassic(form,d,font=null){
 const s=d.stats,v=d.values,e=d.equipment,fx=d.effect;
 const map={Nom:d.name,Origine:d.origin,'Métiers':d.job||'Sans métier',Niveau:1,'EV-PV MAX':d.ev,PV1:d.ev,'EA-PA Max':d.ea,PA1:d.ea,'Points de destin':d.destiny,MagiePhys:v.magphys,MagiePsy:v.magpsy,ResitMagie:v.resmag,OR:d.gold,COU:s.COU,INT:s.INT,CHA:s.CHA,AD:s.AD,FO:s.FOR,Attaque:d.at,Attaque1:d.at,Parade:d.prd,Parrade1:d.prd,Experience:0,Competences:d.skills[0]||'',Competences1:d.skills[1]||'',Competences2:d.skills[2]||'',Competences3:d.skills[3]||'',Competences4:d.skills[4]||'',Competences5:d.skills[5]||'',Competences6:d.skills[6]||'',Competences7:d.skills[7]||'',Competences8:d.skills[8]||'',Competences9:d.skills[9]||'',Competences10:d.skills[10]||'',Competences11:d.skills[11]||'',ArmePrincipale:e.weapons[0]?.name||'',ArmeSecondaire:e.weapons[1]?.name||'',ArmeSupplementaire:e.weapons[2]?.name||'',Tente:(d.routed.tents||[]).map(i=>i.name).join(' ; '),Matelas:(d.routed.mattresses||[]).map(i=>i.name).join(' ; '),Couverture:(d.routed.blankets||[]).map(i=>i.name).join(' ; '),Sac:(d.routed.backpacks||[]).map(i=>i.name).join(' ; '),Besace:(d.routed.satchels||[]).map(i=>i.name).join(' ; '),Bourse:d.routed.purses?.[0]?.name||'',Bourse2:(d.routed.purses||[]).slice(1).map(i=>i.name).join(' ; '),Autre:(d.routed.containers||[]).map(i=>i.name).join(' ; ')};
 e.armor.slice(0,7).forEach((i,n)=>map[`Armures et proctections ${n+1}`]=i.name);
 e.food.slice(0,7).forEach((i,n)=>map[['Bouffe','Bouffe1','Bouffe2','Bouffe3','Bouffe4','Bouffe5','Bouffe6'][n]]=i.name);
 [...e.potions,...e.poisons].slice(0,7).forEach((i,n)=>map[['Doses','Doses2','Doses3','Doses4','Doses5','Doses6','Doses7'][n]]=i.name);
 (d.routed.special||[]).slice(0,6).forEach((i,n)=>{const suffix=n?String(n+1):'';map['Objets speciaux'+suffix]=i.name;map['Objets speciaux effets'+suffix]=i.notes||'';});
 (d.routed.mounts||[]).slice(0,4).forEach((i,n)=>map['Machins Precieux'+(n?String(n+1):'')]=i.name);
 const campingLines=wrap((d.routed.camping||[]).map(i=>i.name).join(' ; '),font||{widthOfTextAtSize:(t,size)=>t.length*size*.55},30,640);
 campingLines.slice(0,7).forEach((line,n)=>map[n?'Text'+(n+1):'Text']=line);

 for(const [name,value] of Object.entries(map))if(value!==undefined)textField(form,name,value,95);
 for(const [key,field] of Object.entries({COU:'cou1',INT:'INT1',CHA:'CHA1',AD:'AD1',FOR:'FO1'}))if(fx.modifiers[key])textField(form,field,fx.altered[key]);
 textField(form,'Attaque1',fx.attack);textField(form,'Parrade1',fx.parry);
 const weapons=[...(fx.weapon?[fx.weapon]:[]),...e.weapons.filter(i=>i!==fx.weapon)].slice(0,3);
 weapons.forEach((i,index)=>{const effect=fx.perItem.get(i),n=index+1;
  textField(form,['ArmePrincipale','ArmeSecondaire','ArmeSupplementaire'][index],i.name,64);
  textField(form,`PI${n}`,effect.damage,20);textField(form,`RupArme${n}`,effect.rupture,20);
  if(index>0){const armorAt=fx.modifiers.AT-(fx.weapon?fx.perItem.get(fx.weapon).mods.AT:0),armorPrd=fx.modifiers.PRD-(fx.weapon?fx.perItem.get(fx.weapon).mods.PRD:0);textField(form,`Attaque${n}`,Number(d.at)+armorAt+effect.mods.AT);textField(form,`Parrade${n}`,Number(d.prd)+armorPrd+effect.mods.PRD);}
 });
 const ammoSlots=['ArmePrincipale','ArmeSecondaire','ArmeSupplementaire'].slice(weapons.length);
 e.munitions.slice(0,ammoSlots.length).forEach((i,n)=>textField(form,ammoSlots[n],'Munitions : '+i.name,100));
 const armorAndClothes=[...e.armor,...(d.routed.clothes||[])];
 armorAndClothes.slice(0,7).forEach((i,n)=>{const effect=fx.perItem.get(i)||parseEquipmentEffect(i),isArmor=e.armor.includes(i);textField(form,`Armures et proctections ${n+1}`,`${i.name}${isArmor?' · PR '+i.pr:''}${effect.summary?' ('+effect.summary+')':''}${isArmor&&!fx.selected.includes(i)?' [non porté]':''}`,110);textField(form,`RupArmures${n+1}`,effect.rupture,20);});

 const locations=Object.fromEntries(['tête','bras','bouclier','torse','mains','jambes','pieds'].map(k=>[k,0]));
 for(const i of fx.selected)for(const loc of armorLocations(i))locations[loc]+=Number(i.pr)||0;
 for(const loc of ['tête','bras','torse','mains','jambes','pieds'])locations[loc]+=locations.bouclier;
 for(const [loc,field] of Object.entries({'tête':'Tete','bras':'Bras','bouclier':'Bouclier','torse':'Torse','mains':'Mains','jambes':'Jambes','pieds':'Pieds'}))if(locations[loc])textField(form,field,locations[loc]);
 if(fx.basePr)textField(form,'TotalProtection',fx.basePr);
 if(d.sex==='Masculin'||d.sex==='Féminin'){
  try{form.getCheckBox(d.sex==='Masculin'?'Sexe1':'Sexe2').check();}catch{}
 }
}
function printable(v){return String(v??'').replace(/[\u0000-\u001f]/g,' ').replace(/[^\u0020-\u00ff\u0152\u0153\u0160\u0161\u0178\u20ac\u2018\u2019\u201c\u201d\u2013\u2014]/gu,'?').replace(/[\u0152\u0153\u0160\u0161\u0178\u2018\u2019\u201c\u201d\u2013\u2014]/g,c=>({'Œ':'OE','œ':'oe','Š':'S','š':'s','Ÿ':'Y','‘':"'",'’':"'",'“':'"','”':'"','–':'-','—':'-'}[c]||c));}
function wrap(text,font,size,maxWidth){const words=printable(text).split(/\s+/);const lines=[];let line='';for(const word of words){const trial=line?line+' '+word:word;if(font.widthOfTextAtSize(trial,size)>maxWidth&&line){lines.push(line);line=word;}else line=trial;}if(line)lines.push(line);return lines;}
function addAnnex(pdf,d){const {StandardFonts,rgb}=window.PDFLib;return (async()=>{
 const font=await pdf.embedFont(StandardFonts.Helvetica),bold=await pdf.embedFont(StandardFonts.HelveticaBold);
 const pageWidth=595.28,height=841.89,margin=48;let page,y;
 const newPage=()=>{page=pdf.addPage([pageWidth,height]);y=height-margin;page.drawText('ANNEXE DE CRÉATION · NIVEAU 1',{x:margin,y,size:15,font:bold,color:rgb(.27,.17,.11)});y-=25;page.drawText(printable(d.name+' · '+d.origin+' · '+(d.job||'Sans métier')).slice(0,100),{x:margin,y,size:9,font});y-=20;page.drawLine({start:{x:margin,y},end:{x:pageWidth-margin,y},color:rgb(.67,.53,.38),thickness:1});y-=23;};
 newPage();for(const [title,lines] of d.groups){if(y<margin+65)newPage();page.drawText(printable(title),{x:margin,y,size:11,font:bold,color:rgb(.33,.22,.13)});y-=18;
  for(const entry of lines){const parts=wrap('- '+entry,font,9,pageWidth-2*margin-7);if(y-parts.length*11<margin)newPage();for(const part of parts){page.drawText(part,{x:margin+7,y,size:9,font,color:rgb(.15,.15,.15)});y-=11;}y-=2;}y-=10;
 }
 if(y<margin+44)newPage();page.drawText('La disponibilité, la protection portée et les effets du matériel restent à valider par le MJ.',{x:margin,y,size:8,font,color:rgb(.43,.33,.26)});
 })();}
export async function buildPdf(kind,d,template){
 const {PDFDocument,StandardFonts}=window.PDFLib;
 const magicIssue=mooteMagicError(d.mooteMagic,d,d.skills);if(magicIssue)throw Error(magicIssue);
 if(!d.effect)d=withEffects(d);
 if(d.pc>d.gold*300)throw Error('Budget d’équipement dépassé.');
 if(d.job==='Paladin'&&(!d.relic?.name?.trim()||!d.relic?.confirmed))throw Error('La relique du paladin doit être définie et validée avec le MJ en page 3.');
 const forbidden=d.items.filter(i=>!i.startingGift&&!i.id?.startsWith('dotation-relique-')&&!equipmentEligibility(i,d).allowed);if(forbidden.length)throw Error('Équipement incompatible : '+forbidden.map(i=>i.name).join(', '));
 if(d.effect.unknownPr.length)throw Error('PR à confirmer pour : '+d.effect.unknownPr.map(i=>i.name).join(', '));
 if(d.effect.conflicts.length)throw Error('Deux protections occupent le même emplacement : '+d.effect.conflicts.join(' ; '));if(d.effect.limitExceeded)throw Error('Protection '+d.effect.cappedPr+' supérieure à la limite '+d.effect.prLimit+' du profil. Modifiez les pièces portées.');
 const pdf=await PDFDocument.load(template,{ignoreEncryption:false});const form=pdf.getForm();
 const fieldFont=await pdf.embedFont(StandardFonts.Helvetica);
 if(kind==='interactive')fillInteractive(form,d);else fillClassic(form,d,fieldFont);
 // Conserver des champs éditables, y compris après téléchargement.
 form.updateFieldAppearances(fieldFont);
 await addAnnex(pdf,d);
 return pdf.save({useObjectStreams:false});
}
async function init(){
 const magicIssue=mooteMagicError(profile.mooteMagic,profile,profile.skills);if(magicIssue){root.innerHTML=`<h2>Grimoire à compléter</h2><p>${esc(magicIssue)}</p><a class="primary continue-link" href="creation.html">Revenir aux tirages de Fédulogie</a>`;return;}
 if(!window.PDFLib)throw Error('Le module PDF est manquant. Ajoutez pdf-lib.min.js au dépôt.');
 const response=await fetch('./skills.json');if(!response.ok)throw Error('La liste de compétences manque.');
 const skills=await response.json();const generic=await fetch('./generic-skills.json').then(r=>r.json());const skillError=validateSkillSelection(profile,jobs.find(j=>j.name===profile.job)||null,skills,generic,BEAST_DETAILS[profile.origin]?.born||[],Boolean(origins.find(o=>o.name===profile.origin)?.bundle));if(skillError){root.innerHTML=`<h2>Compétences à revoir</h2><p>${esc(skillError)}</p><a href="creation.html" class="primary continue-link">Revenir à la page 2</a>`;return;}const catalogResponse=await fetch('./equipment-catalog.json');if(!catalogResponse.ok)throw Error('Le catalogue d’équipement manque.');const catalog=catalogForProfile(await catalogResponse.json(),profile);const byId=new Map(catalog.map(i=>[i.id,i]));const missing=(profile.equipment||[]).filter(i=>!byId.has(i.baseId||i.id));if(missing.length)throw Error('Paquetage à revoir sur la page Équipement : '+missing.map(i=>i.name).join(', ')+'. Certains objets ne sont plus disponibles pour ce profil ou dépassent le plafond après majoration.');const enriched={...profile,equipment:(profile.equipment||[]).map(i=>resolveEquipmentItem(i,byId)).filter(Boolean)};const data=prepareData(enriched,skills);
 const accessories=accessoryEffectItems(data);let activeAccessories=profile.loadout?.accessories?accessories.filter(i=>profile.loadout.accessories.includes(i.id)):[...accessories];
 let weaponIndex=Math.max(0,data.equipment.weapons.findIndex(i=>i.id===profile.loadout?.weapon)),worn=profile.loadout?.armor?data.equipment.armor.map((i,n)=>profile.loadout.armor.includes(i.id)?n:-1).filter(n=>n>=0):defaultArmorIndices(data.equipment.armor);
 function selection(){return withEffects(data,weaponIndex,worn,activeAccessories);}
 function summary(){const fx=selection().effect;const mods=['COU','INT','CHA','AD','FOR'].filter(k=>fx.modifiers[k]).map(k=>`${k} ${fx.altered[k]} (${fx.modifiers[k]>0?'+':''}${fx.modifiers[k]})`);return `<strong>Valeurs avec le matériel porté :</strong> ${mods.map(esc).join(' · ')||'Aucune caractéristique modifiée'} · AT ${fx.attack} · PRD ${fx.parry} · PR du matériel ${fx.basePr} (soumise à la limite : ${fx.cappedPr}).<br>MAGPHYS ${fx.values.magphys} · MAGPSY ${fx.values.magpsy} · RESMAG ${fx.values.resmag} · PI ${fx.values.impact}.${fx.unknownPr.length?` <span class="equipment-error">PR à confirmer pour : ${fx.unknownPr.map(i=>esc(i.name)).join(', ')}.</span>`:''}${fx.limitExceeded?`<p class="equipment-error">La PR portée (${fx.cappedPr}) dépasse la limite du profil (${fx.prLimit}).</p>`:''}${fx.conflicts.length?`<p class="equipment-error">Protections superposées : ${fx.conflicts.map(esc).join(' ; ')}. Décochez l’une des pièces avant le téléchargement.</p>`:''}`;}
 root.innerHTML=`<h2>${esc(data.name)}</h2><p>${esc(data.origin)} · ${esc(data.job||'Sans métier')} · Niveau 1</p><p><strong>COU ${data.stats.COU} · INT ${data.stats.INT} · CHA ${data.stats.CHA} · AD ${data.stats.AD} · FOR ${data.stats.FOR}</strong></p><p>AT ${esc(data.at)} · PRD ${esc(data.prd)} · EV ${esc(data.ev)} · EA ${esc(data.ea)} · ${esc(data.destiny)} PD · ${esc(data.gold)} PO conservées.</p><p>${esc(data.detail[0])}</p><p>${data.items.length} objets sélectionnés · ${esc(data.money(data.pc))} consacrées au paquetage.</p>${mooteMagicSummaryHTML(profile.mooteMagic,profile,profile.skills,true)}<div class="equipment-configuration"><h3>Équipement utilisé sur la fiche</h3>${data.equipment.weapons.length?`<label class="wizard-field">Arme utilisée<select id="selected-weapon">${data.equipment.weapons.map((i,n)=>`<option value="${n}" ${n===weaponIndex?'selected':''}>${esc(i.name)}${parseEquipmentEffect(i).summary?' · '+esc(parseEquipmentEffect(i).summary):''}</option>`).join('')}</select></label>`:'<p>Aucune arme achetée.</p>'}${data.equipment.armor.length?`<fieldset class="armor-choices"><legend>Protections portées</legend>${data.equipment.armor.map((i,n)=>`<label><input type="checkbox" data-worn="${n}" ${worn.includes(n)?'checked':''}><span>${esc(i.name)} · ${esc(armorLocations(i).join(', '))}${i.pr!=null?' · PR '+esc(i.pr):''}${parseEquipmentEffect(i).summary?' · '+esc(parseEquipmentEffect(i).summary):''}</span></label>`).join('')}</fieldset>`:'<p>Aucune protection achetée.</p>'}${accessories.length?`<fieldset class="armor-choices"><legend>Autres objets portés ou utilisés</legend><p>Décochez les objets simplement transportés : leurs bonus et malus ne seront pas appliqués.</p>${accessories.map((i,n)=>`<label><input type="checkbox" data-accessory="${n}" ${activeAccessories.includes(i)?'checked':''}><span>${esc(i.name)} · ${esc(parseEquipmentEffect(i).summary)}</span></label>`).join('')}</fieldset>`:''}<div id="equipment-effect-summary" class="wizard-note">${summary()}</div><p class="equipment-hint">Les modificateurs avec un astérisque, une condition ou un usage particulier sont inscrits à côté de l’objet ; ils ne changent pas les valeurs permanentes.</p></div><div class="pdf-choice"><article><h3>Fiche interactive (9 pages)</h3><p>Modèle détaillé avec champs modifiables et annexe récapitulative.</p><button type="button" class="primary" data-pdf="interactive">Télécharger la fiche interactive</button></article><article><h3>Fiche classique (2 pages)</h3><p>Fiche de personnage et d’équipement, avec champs modifiables et annexe.</p><button type="button" class="primary" data-pdf="classic">Télécharger la fiche classique</button></article></div><p class="wizard-note">Les bonus et malus reconnus figurent dans les cases prévues. L’annexe conserve les effets complets, y compris ceux que le MJ doit vérifier.</p><p id="pdf-message" role="status" aria-live="polite"></p>`;
 root.addEventListener('change',ev=>{if(ev.target.id==='selected-weapon')weaponIndex=Number(ev.target.value);else if(ev.target.dataset.worn!==undefined){const n=Number(ev.target.dataset.worn);worn=ev.target.checked?[...worn,n]:worn.filter(i=>i!==n);}else if(ev.target.dataset.accessory!==undefined){const item=accessories[Number(ev.target.dataset.accessory)];activeAccessories=ev.target.checked?[...activeAccessories,item]:activeAccessories.filter(i=>i!==item);}else return;profile.loadout={weapon:data.equipment.weapons[weaponIndex]?.id,armor:worn.map(n=>data.equipment.armor[n].id),accessories:activeAccessories.map(i=>i.id)};characterStorage.setItem('naheul-character',JSON.stringify(profile));root.querySelector('#equipment-effect-summary').innerHTML=summary();});
 root.addEventListener('click',async ev=>{
  const button=ev.target.closest('[data-pdf]');if(!button||button.disabled)return;
  button.disabled=true;const message=root.querySelector('#pdf-message');message.textContent='Préparation du fichier PDF…';
  try{const kind=button.dataset.pdf;const uri=kind==='interactive'?'fiche-interactive.pdf':'fiche-classique.pdf';const selected=selection();if(selected.effect.conflicts.length)throw Error('Deux protections se superposent : '+selected.effect.conflicts.join(' ; '));if(selected.effect.limitExceeded)throw Error('La PR portée ('+selected.effect.cappedPr+') dépasse la limite du profil ('+selected.effect.prLimit+').');const res=await fetch('./'+uri);if(!res.ok)throw Error('Modèle PDF introuvable : '+uri);
   const bytes=await buildPdf(kind,selected,await res.arrayBuffer());const blob=new Blob([bytes],{type:'application/pdf'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`fiche-${kind}-${(data.name||'personnage').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9-]+/gi,'-').toLowerCase()}.pdf`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),60000);message.textContent='Téléchargement prêt.';
  }catch(e){message.textContent='La génération du PDF a échoué : '+e.message;console.error(e);}finally{button.disabled=false;}
 });
}
