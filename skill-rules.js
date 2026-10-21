// Une seule définition des compétences acquises et sélectionnables, utilisée par les pages 2 et 4.
export const skillKey=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/gi,'').toLowerCase().replace(/^armes?debourrin$/,'armesdebourrin').replace(/^langues?desmonstres$/,'languesdesmonstres').replace(/^runes?bizarres?$/,'runesbizarres').replace(/^arnaques?etcarambouilles?$/,'arnaqueetcarambouille').replace(/^campingsousterrain$/,'campingsouterrain');
export const uniqueSkills=list=>[...new Map(list.map(s=>[skillKey(s),s])).values()];
export function acquiredSkills(origin,job,stats,catalog,beastBorn=[]){
 const born=[...(catalog[origin.startsWith('Homme-bête')?'Homme-bête':origin]?.born||[]),...(catalog[job]?.born||[]),...beastBorn];
 if(job==='Sbire'&&['COU','INT','CHA','AD','FOR'].filter(k=>stats[k]<=10).length>=3)born.push('Chance du rempailleur');
 return uniqueSkills(born);
}
export function skillOptions(origin,job,stats,catalog,generic,beastBorn=[],bundle=false){
 const born=acquiredSkills(origin,job?.name,stats,catalog,beastBorn),skip=new Set(born.map(skillKey));
 const banned=new Set(['appeldusauvage']);
 if(job?.magic)banned.add('tetevide');
 if(job?.name==='Traîne-Patins'||origin.startsWith('Homme-bête'))banned.add('erudition');
 if(job?.name==='Sbire'){banned.add('chefdegroupe');banned.add('chercherdesnoises');}
 const exclude=list=>uniqueSkills(list).filter(s=>!skip.has(skillKey(s))&&!banned.has(skillKey(s))).sort((a,b)=>a.localeCompare(b,'fr'));
 const o=catalog[origin.startsWith('Homme-bête')?'Homme-bête':origin]||{choices:[]},j=catalog[job?.name]||{choices:[]},all=exclude(generic);
 if(origin==='Humain')return {born,groups:job?[{label:'Deux compétences du métier',quota:2,skills:job.name==='Sbire'?all:exclude(j.choices)},{label:'Une compétence générique',quota:1,skills:all}]:[{label:'Trois compétences génériques',quota:3,skills:all}]};
 return {born,groups:[{label:bundle?'Compétences du profil':'Deux compétences parmi l’origine et le métier',quota:2,skills:exclude(bundle?o.choices:[...o.choices,...(job?.name==='Sbire'?generic:j.choices)])}]};
}
export function validateSkillSelection(profile,job,catalog,generic,beastBorn=[],bundle=false){
 const {born,groups}=skillOptions(profile.origin,job,profile.stats,catalog,generic,beastBorn,bundle);
 const picked=(profile.skills||[]).map(skillKey),acquired=new Set(born.map(skillKey));
 if(new Set(picked).size!==picked.length||picked.some(k=>acquired.has(k)))return 'Une compétence choisie est déjà acquise ou figure deux fois. Revoyez la page 2.';
 const slots=groups.flatMap(g=>Array.from({length:g.quota},()=>new Set(g.skills.map(skillKey))));
 function assign(index,remaining){if(index===slots.length)return remaining.length===0;return remaining.some((k,n)=>slots[index].has(k)&&assign(index+1,remaining.filter((_,j)=>j!==n)));}
 return picked.length===slots.length&&assign(0,picked)?'':'La sélection de compétences ne respecte plus les règles de ce profil. Revoyez la page 2.';
}
