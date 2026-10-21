export const DICE_ORDER=['COU','INT','CHA','AD','FOR'];
const FULL={COU:'Courage',INT:'Intelligence',CHA:'Charisme',AD:'Adresse',FOR:'Force'};
const DOTS={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
const ANGLES={1:[0,0],2:[-90,0],3:[0,-90],4:[0,90],5:[90,0],6:[0,180]};
export function rollD6(cryptoSource=globalThis.crypto){
 if(!cryptoSource?.getRandomValues)return Math.floor(Math.random()*6)+1;
 const draw=new Uint8Array(1);do{cryptoSource.getRandomValues(draw);}while(draw[0]>=252);return draw[0]%6+1;
}
export function diceFace(value){return `<span class="d6-pips" aria-hidden="true">${Array.from({length:9},(_,i)=>`<i class="${DOTS[value]?.includes(i+1)?'shown':''}"></i>`).join('')}</span>`;}
export function restoreDice(saved){
 const values=Array.isArray(saved)?saved:saved?.values;
 return {mode:saved?.mode==='manual'?'manual':'random',values:DICE_ORDER.map((_,i)=>Number.isInteger(values?.[i])&&values[i]>=1&&values[i]<=6?values[i]:null)};
}
export function initDiceController({document,storage,onInvalidate=()=>{},draw=rollD6,duration=1050}){
 const $=s=>document.querySelector(s),grid=$('#dice-grid'),form=$('#dice-form');
 // Chaque ouverture de la page propose un nouveau tirage, même si des dés sont sauvegardés.
 let mode='random',values=DICE_ORDER.map(()=>null),epoch=0;
 const pending=new Set(),animations=new Map(),buttons=new Map(),selectors=new Map();
 const persist=()=>storage.setItem('naheul-dice',JSON.stringify({version:2,mode,values}));
 const announce=text=>{$('#dice-status').textContent=text;};
 const count=()=>values.filter(Boolean).length;
 const complete=()=>count()===5&&!pending.size;
 function refresh(){
  $('#analyze-dice').disabled=!complete();$('#roll-random').disabled=mode==='manual'||pending.size>0||count()===5;
  $('#roll-random').hidden=mode==='manual';$('#dice-entry-mode').value=mode;
  for(const [index,key]of DICE_ORDER.entries()){
   const button=buttons.get(key),rolling=pending.has(key),locked=mode==='random'&&Boolean(values[index]);
   button.disabled=rolling||locked;button.classList.toggle('is-locked',locked&&!rolling);button.classList.toggle('is-rolling',rolling);
   button.setAttribute('aria-busy',String(rolling));button.setAttribute('aria-label',`${FULL[key]} : ${rolling?'dé en cours de lancer':values[index]?`${values[index]} sur le dé${mode==='random'?', résultat verrouillé':''}`:mode==='random'?'cliquer pour lancer le dé':'choisir un résultat dans la liste'}`);
   selectors.get(key).hidden=mode!=='manual';selectors.get(key).value=values[index]||'';
   $(`#die-${key}`).value=rolling?'':values[index]||'';
   grid.querySelector(`[data-die-status="${key}"]`).textContent=rolling?'Ça roule…':values[index]?mode==='random'?'Résultat verrouillé':'Résultat saisi':'À lancer';
  }
 }
 function showFace(key,value){
  const button=buttons.get(key),cube=button.querySelector('.dice-cube');
  button.classList.toggle('is-empty',!value);const [x,y]=ANGLES[value]||[0,0];cube.style.transform=`rotateX(${x}deg) rotateY(${y}deg)`;
 }
 function reset(nextMode=mode){
  epoch++;for(const animation of animations.values())animation.cancel();animations.clear();pending.clear();values=DICE_ORDER.map(()=>null);mode=nextMode;
  for(const key of DICE_ORDER)showFace(key,null);
  persist();onInvalidate();refresh();announce('Les cinq dés sont effacés. Pas un mot au MJ !');
 }
 async function roll(key){
  const index=DICE_ORDER.indexOf(key);if(mode!=='random'||index<0||values[index]||pending.has(key))return;
  const result=draw();if(!Number.isInteger(result)||result<1||result>6)throw Error('Résultat de D6 invalide');
  const token=epoch;values[index]=result;pending.add(key);persist();onInvalidate();refresh();
  const button=buttons.get(key),cube=button.querySelector('.dice-cube'),[x,y]=ANGLES[result];button.classList.remove('is-empty');
  const reduced=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const end=`rotateX(${x}deg) rotateY(${y}deg)`;cube.style.transform=end;
  try{
   if(cube.animate&&!reduced){
    const animation=cube.animate([
     {transform:'translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',offset:0},
     {transform:'translateY(-19px) rotateX(270deg) rotateY(180deg) rotateZ(-18deg)',offset:.28},
     {transform:'translateY(2px) rotateX(550deg) rotateY(390deg) rotateZ(10deg)',offset:.57},
     {transform:`translateY(-7px) rotateX(${720+x-70}deg) rotateY(${720+y-60}deg) rotateZ(-5deg)`,offset:.79},
     {transform:`translateY(0) rotateX(${720+x}deg) rotateY(${720+y}deg) rotateZ(0deg)`,offset:1}
    ],{duration,easing:'ease-out'});animations.set(key,animation);await animation.finished;
   }else await new Promise(resolve=>setTimeout(resolve,reduced?80:duration));
  }catch{}finally{
   if(token!==epoch)return;
   animations.delete(key);pending.delete(key);showFace(key,result);persist();refresh();
   announce(`${FULL[key]} : ${result} sur le dé, soit ${result+7}. ${complete()?'Les cinq dés sont prêts : vous pouvez analyser vos tirages.':`${count()-pending.size} dé(s) arrêté(s) sur 5.`}`);
  }
 }
 for(const [index,key]of DICE_ORDER.entries()){
  const div=document.createElement('div');div.className='die';
  div.innerHTML=`<span class="die-label" id="die-label-${key}">${key}</span><input id="die-${key}" name="${key}" type="hidden"><button type="button" class="d6-button is-empty" data-die="${key}" aria-describedby="die-label-${key}"><span class="dice-scene" aria-hidden="true"><span class="dice-cube">${[1,6,3,4,2,5].map(n=>`<span class="dice-face dice-face-${n}">${diceFace(n)}</span>`).join('')}</span><span class="dice-question">?</span></span></button><small>${FULL[key]}</small><span class="die-state" data-die-status="${key}">À lancer</span><select id="manual-${key}" class="manual-die" aria-label="Résultat de votre dé de ${FULL[key]}" hidden><option value="">—</option>${[1,2,3,4,5,6].map(n=>`<option value="${n}">${n}</option>`).join('')}</select>`;
  grid.append(div);buttons.set(key,div.querySelector('[data-die]'));selectors.set(key,div.querySelector('select'));showFace(key,values[index]);
  buttons.get(key).addEventListener('click',()=>{if(mode==='manual'){selectors.get(key).focus();return;}void roll(key);});
  selectors.get(key).addEventListener('change',event=>{if(mode!=='manual')return;const value=Number(event.target.value);values[index]=Number.isInteger(value)&&value>=1&&value<=6?value:null;showFace(key,values[index]);persist();onInvalidate();refresh();announce(complete()?'Les cinq résultats sont prêts. Vous pouvez les analyser.':'Complétez les cinq résultats.');});
 }
 $('#reset-dice').addEventListener('click',()=>reset());
 $('#dice-entry-mode').addEventListener('change',event=>reset(event.target.value==='manual'?'manual':'random'));
 $('#roll-random').addEventListener('click',()=>{for(const key of DICE_ORDER)void roll(key);});
 form.addEventListener('submit',event=>{if(!complete()){event.preventDefault();event.stopImmediatePropagation();announce('Terminez les cinq dés avant de lancer l’analyse.');}});
 // Effacer uniquement les dés précédents ; le personnage déjà créé reste sauvegardé.
 persist();refresh();announce('Cliquez sur chaque dé pour le lancer.');
 document.defaultView?.addEventListener('pageshow',event=>{if(event.persisted)reset('random');});
 return {roll,reset,isComplete:complete,getState:()=>({mode,values:[...values],pending:[...pending]})};
}
