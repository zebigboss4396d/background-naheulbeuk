// Sauvegarde locale du navigateur + fichier exportable, sans compte ni serveur.
const KEYS=['naheul-selection','naheul-draft','naheul-character','naheul-equipment','naheul-dice'];
const memory=new Map();let unavailable=false;
export const characterStorage={
 getItem(key){try{const value=localStorage.getItem(key);if(value!==null)return value;}catch{}try{return sessionStorage.getItem(key)||memory.get(key)||null;}catch{return memory.get(key)||null;}},
 setItem(key,value){memory.set(key,String(value));try{sessionStorage.setItem(key,value);}catch{}try{localStorage.setItem(key,value);}catch{if(!unavailable){unavailable=true;globalThis.alert?.('La sauvegarde durable est indisponible dans ce navigateur. Utilisez « Exporter ma sauvegarde » avant de fermer la page.');}}},
 removeItem(key){memory.delete(key);try{localStorage.removeItem(key);}catch{}try{sessionStorage.removeItem(key);}catch{}}
};
export function validateBackup(data){
 if(data?.format!=='naheulbeuk-character'||data.version!==1||!data.values||typeof data.values!=='object')throw Error('Ce fichier n’est pas une sauvegarde de cet assistant.');
 for(const key of Object.keys(data.values)){
  if(!KEYS.includes(key)||typeof data.values[key]!=='string'||data.values[key].length>2000000)throw Error('Contenu de sauvegarde invalide.');
  const value=JSON.parse(data.values[key]);
  if(!value||typeof value!=='object')throw Error('Données manquantes.');
  if(['naheul-character','naheul-selection'].includes(key)&&!['COU','INT','CHA','AD','FOR'].every(k=>Number.isInteger(value.stats?.[k])&&value.stats[k]>0&&value.stats[k]<100))throw Error('Caractéristiques invalides.');
 }
 return data.values;
}
if(typeof document!=='undefined'&&document.createElement){
 const install=()=>{
  const panel=document.createElement('section');panel.className='save-tools';panel.setAttribute('aria-label','Sauvegarde du personnage');
  panel.innerHTML='<p>Vos choix sont enregistrés sur cet appareil. Exportez-les pour les conserver ou changer d’appareil.</p><button type="button" data-export>Exporter ma sauvegarde</button> <button type="button" data-import>Importer une sauvegarde</button><input type="file" accept="application/json,.json" hidden data-backup-file><p role="status" data-backup-status></p>';
  (document.querySelector('main')||document.body).append(panel);
  panel.querySelector('[data-export]').addEventListener('click',()=>{const values=Object.fromEntries(KEYS.map(k=>[k,characterStorage.getItem(k)]).filter(([,v])=>v!==null));const blob=new Blob([JSON.stringify({format:'naheulbeuk-character',version:1,values},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='personnage-naheulbeuk-sauvegarde.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);});
  const input=panel.querySelector('[data-backup-file]');panel.querySelector('[data-import]').addEventListener('click',()=>input.click());
  input.addEventListener('change',async()=>{try{const file=input.files[0];if(!file)return;if(file.size>5000000)throw Error('Fichier trop volumineux.');const values=validateBackup(JSON.parse(await file.text()));KEYS.forEach(k=>characterStorage.removeItem(k));for(const [k,v]of Object.entries(values))characterStorage.setItem(k,v);location.href=values['naheul-character']?'equipement.html':values['naheul-selection']?'creation.html':'index.html';}catch(e){panel.querySelector('[data-backup-status]').textContent=e.message;input.value='';}});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
}
