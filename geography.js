'use strict';
const GEO_KEYS=['worldArea','geoRegion','geoPlace','geoRelation','geoDetail','geoSecondPlace','geoUnknown','geoUnknownNotes','geoHabitat','geoLegacy','geoTerritoryChosen','geoBranch','geoOtherRegion','geoSituation','geoFlowVersion','geoPrevious','geoLandscape'];
const cataloguePlace=id=>PLACES.find(p=>p.id===id);
const foldGeo=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').toLowerCase();
function scopedPlaces(){return PLACES.filter(p=>p.scope==='shared'||(str('worldArea')==='outside'?p.scope==='outside':p.scope==='fangh'));}
function originUnknown(){return str('geoUnknown')==='yes';}
function referencePlace(){return cataloguePlace(str('geoPlace'));}
function inferredRegion(p=referencePlace()){return p?(p.kind==='Région'?p:PLACES.find(r=>r.kind==='Région'&&r.name===p.region)):cataloguePlace(str('geoRegion'))||null;}
function locationEntries(){if(originUnknown())return [];return [...new Set([referencePlace(),inferredRegion()].filter(Boolean))];}
function habitatsFor(p=referencePlace()){
 const name=p?foldGeo(p.name+' '+p.region+' '+p.kind):'';
 if(/foret|bois|schlipak|sylv|galbois/.test(name)&&(!p||['Région','Zone géographique'].includes(p.kind)))return ['Communauté forestière','Hameau forestier','Cabane isolée','Campement','Habitation près de la lisière','Caravane de passage'];
 if(/souterraine|mine|jambfer|zuruk|piolroc|barundil|martenbur/.test(name))return ['Cité souterraine','Quartier de mineurs','Habitation en surface','Village minier','Ferme des alentours','Campement'];
 if(p&&['Ville ou bourg'].includes(p.kind))return ['Quartier populaire','Quartier marchand','Quartier aisé','Quartier d’artisans','Habitation périphérique','Ferme des alentours','Domaine voisin','Caravane de passage'];
 if(/marais|marecage/.test(name))return ['Village sur pilotis','Hameau du marais','Cabane isolée','Communauté du marécage','Campement','Habitation en bordure'];
 if(/ile|archipel|crique|port|oasis|cote|mer/.test(name)&&p?.kind!=='Ville ou bourg')return ['Village côtier','Quartier portuaire','Habitation isolée','Campement','Communauté insulaire','À bord d’un bateau'];
 return ['Village','Ferme isolée','Domaine rural','Hameau','Quartier urbain','Communauté forestière','Cité souterraine','Village minier','Campement','Caravane itinérante','Habitation isolée'];
}
function anchorPhrase(p){const n=p.name;if(n==='Birmilistan'||n==='Dandiskar')return 'au '+n;if(['Esturlie','Syldérie','Galzanie','Caladie','Fernol'].includes(n))return 'en '+n;if(n.startsWith('Pays de '))return 'au '+n.charAt(0).toLowerCase()+n.slice(1);if(n==='Caladie'||n==='Fernol'||n==='Galzanie')return 'en '+n;if(n.startsWith('Forêt ')||n.startsWith('Côte ')||n.startsWith('Vallée '))return 'dans la '+n.charAt(0).toLowerCase()+n.slice(1);if(n.startsWith('Bois ')||n.startsWith('Marais ')||n.startsWith('Marécage ')||n.startsWith('Désert '))return 'dans le '+n.charAt(0).toLowerCase()+n.slice(1);if(/^(Montagnes|Collines|Terres|Jungles|Confins|Dunes|Chaînes)/.test(n))return 'dans les '+n.charAt(0).toLowerCase()+n.slice(1);if(n.startsWith('Le '))return 'dans le '+n.slice(3);if(p.kind==='Ville ou bourg'||p.kind==='Village ou localité')return 'à '+n;return (p.kind==='Région'?'dans la région « ':'dans le lieu « ')+n+' »';}
function locationText(){if(originUnknown())return 'Ses origines géographiques précises restent inconnues'+(str('geoUnknownNotes')?' ; '+str('geoUnknownNotes'):'')+'.';const p=referencePlace(),area=str('worldArea')==='outside'?'hors de la Terre de Fangh':'en Terre de Fangh';let text='';const habitat=str('geoHabitat');
 const habitatWords={'Village':'un village','Ferme isolée':'une ferme isolée','Domaine rural':'un domaine rural','Hameau':'un hameau','Quartier urbain':'un quartier urbain','Communauté forestière':'une communauté forestière','Cité souterraine':'une cité souterraine','Village minier':'un village minier','Campement':'un campement','Caravane itinérante':'une caravane itinérante','Habitation isolée':'une habitation isolée','Quartier populaire':'un quartier populaire','Quartier marchand':'un quartier marchand','Quartier aisé':'un quartier aisé','Quartier d’artisans':'un quartier d’artisans','Habitation périphérique':'une habitation périphérique','Ferme des alentours':'une ferme','Domaine voisin':'un domaine','Caravane de passage':'une caravane de passage','Hameau forestier':'un hameau forestier','Cabane isolée':'une cabane isolée','Habitation près de la lisière':'une habitation près de la lisière','Quartier de mineurs':'un quartier de mineurs','Habitation en surface':'une habitation en surface','Village sur pilotis':'un village sur pilotis','Hameau du marais':'un hameau du marais','Communauté du marécage':'une communauté du marécage','Habitation en bordure':'une habitation en bordure','Village côtier':'un village côtier','Quartier portuaire':'un quartier portuaire','Communauté insulaire':'une communauté insulaire','À bord d’un bateau':'un bateau'};
 if(str('geoLandscape')&&habitat===str('geoLandscape'))text='J’ai grandi dans '+habitat.charAt(0).toLowerCase()+habitat.slice(1);
 else if(habitat)text='J’ai grandi '+(habitat==='À bord d’un bateau'?'à bord d’un bateau':'dans '+(habitatWords[habitat]||'un cadre de vie décrit comme « '+habitat+' »'));
 else text='J’ai grandi';
 if(p){if(str('geoRelation')==='around')text+=', dans les alentours de '+p.name;else text+=(habitat?', ':' ')+anchorPhrase(p);}else text+=' '+area;
 if(str('geoDetail'))text+=' ; '+str('geoDetail');if(p?.scope==='outside'||str('worldArea')==='outside')text+=' (origine hors Fangh à valider avec le MJ)';else if(p?.scope==='shared')text+=' (territoire maritime ou transfrontalier à préciser avec le MJ)';if(str('geoLegacy'))text+=' ; précision conservée : '+str('geoLegacy');return text.replace(/[.]+$/,'')+'.';}
function sourceURL(p){return p.source?'sources/'+encodeURIComponent(p.source)+'#page='+p.page:p.url;}

const OUTSIDE_BRANCHES=[['fernol','Fernol'],['caladie','Caladie'],['jungles','Jungles d’Ammouka et Sungul'],['givre','Confins du Givre'],['other','Autres contrées']];
const GEO_SITUATIONS=[
 ['inside','Dans le lieu même','inside',''],
 ['outskirts','Dans ses faubourgs','around','Habitation périphérique'],
 ['hamlet','Dans un hameau paumé des alentours','around','Hameau'],
 ['farm','Dans une ferme ou un domaine isolé','around','Ferme isolée'],
 ['camp','Dans un campement à proximité','around','Campement'],
 ['other','Autre situation — je précise','around','']
];
const geoRegionByName=name=>PLACES.find(p=>p.kind==='Région'&&p.name===name);
function outsideBranchFor(p){const name=foldGeo(p?.region||p?.name);return name==='fernol'?'fernol':name==='caladie'?'caladie':/ammouka|sungul/.test(name)?'jungles':name==='confins du givre'?'givre':'other';}
function geographyBranches(){return str('worldArea')==='outside'?OUTSIDE_BRANCHES.map(([id,name])=>({id,name})):PLACES.filter(p=>p.kind==='Région'&&p.scope!=='outside').map(p=>({id:p.id,name:p.name==='Sud-ouest fanghien'?'Sud-ouest fanghien · Valtordu et Loubet':p.name}));}
function selectedGeoBranch(){return geographyBranches().find(b=>b.id===str('geoBranch'));}
function otherGeoRegions(){return PLACES.filter(p=>p.kind==='Région'&&(p.scope==='outside'||(p.scope==='shared'&&referencePlace()?.scope==='shared'&&p.name===referencePlace()?.region))&&outsideBranchFor(p)==='other').sort((a,b)=>a.name.localeCompare(b.name,'fr'));}
function flowRegions(){
 if(!selectedGeoBranch())return [];
 if(str('worldArea')!=='outside')return [cataloguePlace(str('geoBranch'))].filter(Boolean);
 const branch=str('geoBranch');if(branch==='other')return [cataloguePlace(str('geoOtherRegion'))].filter(p=>otherGeoRegions().includes(p));
 return PLACES.filter(p=>p.kind==='Région'&&p.scope==='outside'&&outsideBranchFor(p)===branch);
}
function flowPlaces(){const regions=flowRegions();return PLACES.filter(p=>p.kind!=='Région'&&regions.some(r=>r.name===p.region)&&(str('worldArea')==='outside'?p.scope!=='fangh':p.scope!=='outside')).sort((a,b)=>a.name.localeCompare(b.name,'fr'));}
function migrateGeography(raw,s){
 const old=raw.values||{};
 if(![5,6].includes(raw.version)){
  if(!s.values.geoPlace&&cataloguePlace(s.values.geoRegion))s.values.geoPlace=s.values.geoRegion;
  if(old.place&&!s.values.geoHabitat){const map={'Village agricole':'Village','Quartier populaire de Glargh':'Quartier populaire','Bourg commerçant':'Quartier marchand','Domaine rural':'Domaine rural','Communauté forestière':'Communauté forestière','Cité souterraine':'Cité souterraine','Village minier':'Village minier','Campement des plaines':'Campement','Caravane itinérante':'Caravane itinérante','Hameau isolé':'Hameau','Quartier aisé':'Quartier aisé'};if(map[old.place])s.values.geoHabitat=map[old.place];else if(old.place==='Lieu inconnu')s.values.geoUnknown='yes';else s.values.geoDetail=[s.values.geoDetail,'Ancienne indication : '+old.place].filter(Boolean).join(' ; ');if(old.place==='Quartier populaire de Glargh'&&!s.values.geoPlace)s.values.geoPlace=PLACES.find(p=>p.name==='Glargh')?.id||'';}
  if(typeof old.detail_place==='string')s.values.geoDetail=[s.values.geoDetail,old.detail_place].filter(Boolean).join(' ; ');
  if(old.geoRelation==='Entre'){const a=cataloguePlace(old.geoPlace),b=cataloguePlace(old.geoSecondPlace);s.values.geoLegacy=['Entre',a?.name,b?'et '+b.name:'(second lieu non précisé)'].filter(Boolean).join(' ');s.values.geoRelation='around';}else s.values.geoRelation=['Dans les alentours de','À proximité de'].includes(old.geoRelation)?'around':'inside';
 }
 if(!['inside','around'].includes(s.values.geoRelation))s.values.geoRelation='inside';
 const ref=cataloguePlace(s.values.geoPlace);if(ref){s.values.geoRegion=(ref.kind==='Région'?ref:geoRegionByName(ref.region))?.id||'';if(ref.scope==='outside')s.values.worldArea='outside';}
 else delete s.values.geoPlace;
 if(old.geoFlowVersion!=='1'){
  if(ref||s.values.geoHabitat||s.values.geoDetail||s.values.worldArea==='outside')s.values.geoTerritoryChosen='yes';
  const region=ref?(ref.kind==='Région'?ref:geoRegionByName(ref.region)):cataloguePlace(s.values.geoRegion);
  if(region){s.values.geoBranch=s.values.worldArea==='outside'?outsideBranchFor(region):region.id;if(s.values.geoBranch==='other')s.values.geoOtherRegion=region.id;}
  if(ref)s.values.geoSituation=s.values.geoRelation==='around'?'other':'inside';
 }
 if(!['yes',''].includes(s.values.geoTerritoryChosen||''))s.values.geoTerritoryChosen='';
 s.values.geoFlowVersion='1';delete s.values.geoSecondPlace;return s;
}
function clearGeoDescendants(keys){
 if(keys.includes('geoDetail')&&(str('geoDetail')||str('geoHabitat'))){state.values.geoPrevious=[referencePlace()?.name,str('geoHabitat'),str('geoDetail')].filter(Boolean).join(' — ');}
 for(const key of keys)delete state.values[key];
}
function selectGeoTerritory(scope){
 if(!['fangh','outside'].includes(scope))return;
 if(str('worldArea')!==scope)clearGeoDescendants(['geoBranch','geoOtherRegion','geoRegion','geoPlace','geoSituation','geoRelation','geoHabitat','geoDetail','geoLandscape']);
 state.values.worldArea=scope;state.values.geoTerritoryChosen='yes';state.values.geoFlowVersion='1';state.values.geoUnknown='';persist();render();
}
function selectGeoBranch(id){
 if(!geographyBranches().some(b=>b.id===id))return;
 if(str('geoBranch')!==id)clearGeoDescendants(['geoOtherRegion','geoRegion','geoPlace','geoSituation','geoRelation','geoHabitat','geoDetail','geoLandscape']);
 state.values.geoBranch=id;const regions=flowRegions();if(regions.length===1)state.values.geoRegion=regions[0].id;persist();render();
}
function selectOtherRegion(id){
 if(!otherGeoRegions().some(r=>r.id===id))return;
 if(str('geoOtherRegion')!==id)clearGeoDescendants(['geoPlace','geoSituation','geoRelation','geoHabitat','geoDetail','geoLandscape']);
 state.values.geoOtherRegion=id;state.values.geoRegion=id;persist();render();
}
function setReference(id){
 const p=cataloguePlace(id);if(!p||![...flowPlaces(),...flowRegions()].includes(p))return;
 if(str('geoPlace')!==id)clearGeoDescendants(['geoSituation','geoRelation','geoHabitat','geoDetail','geoLandscape']);
 state.values.geoPlace=id;state.values.geoRegion=(p.kind==='Région'?p:geoRegionByName(p.region))?.id||'';state.values.geoUnknown='';persist();render();
}
function selectGeoSituation(id){const choice=GEO_SITUATIONS.find(c=>c[0]===id);if(!choice)return;state.values.geoSituation=id;state.values.geoRelation=referencePlace()?.kind==='Région'?'inside':choice[2];state.values.geoHabitat=choice[3];persist();render();}
function geoChoice(attribute,id,label,selected){return `<button type="button" ${attribute}="${esc(id)}" aria-pressed="${selected}" class="${selected?'selected':''}">${esc(label)}</button>`;}
function geoCardHTML(){const p=referencePlace();return p?`<details class="geo-source-note"><summary>À propos de ${esc(p.name)} · source ↗</summary><p>${esc(p.description)}</p>${geoSourcesHTML()}</details>`:'';}
function flowPlaceButtons(query=''){
 const q=foldGeo(query),regions=flowRegions(),places=flowPlaces().filter(p=>!q||foldGeo(p.name+' '+p.kind).includes(q));
 const regionChoices=regions.filter(r=>!q||foldGeo(r.name).includes(q)).map(r=>geoChoice('data-reference',r.id,regions.length>1?'Quelque part dans '+r.name:'Quelque part dans cette région',str('geoPlace')===r.id)).join('');
 return `<div class="choices geo-place-choices">${regionChoices}${places.map(p=>geoChoice('data-reference',p.id,p.name+(p.kind==='Ancien site'?' · ruines':''),str('geoPlace')===p.id)).join('')}</div>${!places.length&&!regionChoices?'<p class="help">Aucun lieu correspondant. Vous pouvez choisir la région sans lieu précis, puis écrire votre précision.</p>':''}`;
}
function geographyHTML(){
 let html=`<div class="geography origin-flow"><label class="checkline"><input type="checkbox" id="geoUnknown" ${originUnknown()?'checked':''}>Je ne connais pas précisément mes origines.</label>`;
 if(originUnknown())return html+`<label for="geoUnknownNotes">Les souvenirs qui restent — même le facteur hésite</label><textarea id="geoUnknownNotes" data-input="geoUnknownNotes" placeholder="Une contrée supposée, un souvenir…">${esc(str('geoUnknownNotes'))}</textarea><div class="location-preview">${esc(locationText())}</div></div>`;
 html+=`<section class="geo-stage"><h3>1 · Le territoire — de quel côté de la carte ?</h3><div class="choices">${geoChoice('data-scope','fangh','Terre de Fangh',str('geoTerritoryChosen')==='yes'&&str('worldArea')==='fangh')}${geoChoice('data-scope','outside','Hors Terre de Fangh',str('geoTerritoryChosen')==='yes'&&str('worldArea')==='outside')}</div></section>`;
 if(str('geoTerritoryChosen')!=='yes')return html+'</div>';
 if(str('worldArea')==='outside')html+='<p class="help geo-mj">Origine hors Terre de Fangh : à valider avec le MJ.</p>';
 html+=`<section class="geo-stage"><h3>2 · La grande région — on déplie quelle carte ?</h3><div class="choices">${geographyBranches().map(b=>geoChoice('data-geo-branch',b.id,b.name,str('geoBranch')===b.id)).join('')}</div></section>`;
 if(!selectedGeoBranch())return html+'</div>';
 if(str('worldArea')==='outside'&&str('geoBranch')==='other'){
  html+=`<section class="geo-stage geo-substage"><h3>La contrée — un peu plus loin sur la carte</h3><div class="choices">${otherGeoRegions().map(r=>geoChoice('data-other-region',r.id,r.name,str('geoOtherRegion')===r.id)).join('')}</div></section>`;
 }
 if(!flowRegions().length)return html+'</div>';
 const landscapeFirst=str('worldArea')==='outside'&&str('geoBranch')==='other';
 if(landscapeFirst){const region=flowRegions()[0];html+=`<section class="geo-stage"><h3>3 · Le paysage — dans quel coin avez-vous grandi ?</h3>${landscapeChoicesHTML(region)}<details class="geo-named-places" ${referencePlace()&&referencePlace().kind!=='Région'?'open':''}><summary>Je préfère choisir un lieu nommé dans les sources</summary><div id="geoResults">${flowPlaceButtons()}</div></details>${geoCardHTML()}</section>`;}
 else html+=`<section class="geo-stage"><h3>3 · Le lieu — où faut-il envoyer le courrier ?</h3>${flowPlaces().length>12?'<label class="help" for="geoSearch">Filtrer les lieux de cette région</label><input id="geoSearch" type="search" placeholder="Nom d’une ville, d’un village ou d’un lieu…" aria-controls="geoResults">':''}<div id="geoResults">${flowPlaceButtons()}</div>${geoCardHTML()}</section>`;
 const p=referencePlace();if(!p)return html+'</div>';
 const situations=GEO_SITUATIONS.filter(c=>p.kind!=='Région'||c[0]!=='outskirts').map(c=>p.kind==='Région'?[c[0],({inside:'Dans cette région, sans autre précision',hamlet:'Dans un hameau paumé de cette région',farm:'Dans une ferme ou un domaine isolé',camp:'Dans un campement de cette région'})[c[0]]||c[1],c[2],c[3]]:c);
 if(p.kind==='Région'&&!landscapeFirst)html+=`<section class="geo-stage"><h3>4 · Le paysage — à quoi ressemblait votre chez-vous ?</h3>${landscapeChoicesHTML(p)}</section>`;
 else if(p.kind!=='Région')html+=`<section class="geo-stage"><h3>4 · Votre coin — au centre ou au bout du chemin ?</h3><div class="choices">${situations.map(c=>geoChoice('data-geo-situation',c[0],c[1],str('geoSituation')===c[0])).join('')}</div></section>`;
 if(str('geoSituation'))html+=`<section class="geo-stage"><h3>${landscapeFirst&&p.kind==='Région'?4:5} · Une précision, si vous en avez une</h3>${str('geoHabitat')?`<p class="help">Cadre de vie : ${esc(str('geoHabitat'))}.</p>`:''}<label for="geoDetail">Quartier, nom du hameau, distance…</label><textarea id="geoDetail" data-input="geoDetail" placeholder="Ex. : le hameau des Trois-Chèvres, à une demi-journée de marche vers l’ouest…">${esc(str('geoDetail'))}</textarea><details class="customanswer"><summary>Préciser le cadre de vie</summary><input id="geoCustomHabitat" value="${esc(str('geoHabitat'))}" placeholder="Quartier d’artisans, communauté forestière, caravane…"><button id="applyHabitat" type="button">Appliquer</button></details>${str('geoLegacy')?`<details class="customanswer"><summary>Précision de l’ancienne fiche</summary><p>${esc(str('geoLegacy'))}</p></details>`:''}</section>`;
 if(str('geoPrevious'))html+=`<details class="geo-source-note"><summary>Ancienne précision conservée à part</summary><p>${esc(str('geoPrevious'))}</p><p class="help">Elle n’est pas reprise dans le background actuel. Vous pouvez en recopier un détail utile.</p></details>`;
 return html+`<div class="location-preview" aria-live="polite">${esc(locationText())}</div></div>`;
}
function geoSourcesHTML(){const list=locationEntries();return list.length?`<div class="geosources"><p class="help">Documents destinés au MJ : ils peuvent contenir des éléments de scénario.</p>${list.map(p=>`<a href="${esc(sourceURL(p))}" target="_blank" rel="noopener noreferrer">${esc(p.name)} · ${p.source?'source, p. '+p.page:'extension officielle'} ↗</a>`).join('<br>')}</div>`:'';}
function bindReferenceResults(){$$('[data-reference]').forEach(b=>b.onclick=()=>setReference(b.dataset.reference));}
function bindGeography(){
 if(!$('#geoUnknown'))return;
 $('#geoUnknown').onchange=e=>{state.values.geoUnknown=e.target.checked?'yes':'';persist();render();};
 $$('[data-scope]').forEach(b=>b.onclick=()=>selectGeoTerritory(b.dataset.scope));
 $$('[data-geo-branch]').forEach(b=>b.onclick=()=>selectGeoBranch(b.dataset.geoBranch));
 $$('[data-other-region]').forEach(b=>b.onclick=()=>selectOtherRegion(b.dataset.otherRegion));
 $$('[data-geo-landscape]').forEach(b=>b.onclick=()=>selectGeoLandscape(b.dataset.geoLandscape));
 $$('[data-geo-situation]').forEach(b=>b.onclick=()=>selectGeoSituation(b.dataset.geoSituation));
 if($('#geoSearch'))$('#geoSearch').oninput=e=>{$('#geoResults').innerHTML=flowPlaceButtons(e.target.value);bindReferenceResults();};bindReferenceResults();
 if($('#applyHabitat'))$('#applyHabitat').onclick=()=>{state.values.geoHabitat=$('#geoCustomHabitat').value.trim();if(state.values.geoLandscape)state.values.geoLandscape=state.values.geoHabitat;persist();render();};
}
