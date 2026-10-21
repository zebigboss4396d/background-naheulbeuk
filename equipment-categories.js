export const EQUIPMENT_CATEGORIES=['Armes','Protections','Divers','Prêtres et Paladins','Mages et Sorciers'];
export function compareSections(category,a,b){return a.localeCompare(b,'fr',{sensitivity:'base'});}
// Le rangement dans le catalogue est indépendant du rôle de l'objet sur la fiche PDF.
export function equipmentKind(item){
 if(item.kind)return item.kind;
 const section=item.section||'',category=item.category||'',name=item.name||'';
 if(/Munitions/.test(section))return 'munition';
 if(category==='Armes'||section.startsWith('Armes régionales')||category==='CAMHiF'&&/Dagues|Hachoirs|Poëles|Brochettes|Marteaux|Louches de combat/i.test(section))return 'weapon';
 if(category==='Protections'||category==='Fernol-Caladie'&&/Casques|Vestes|Robes|Étoles|Gantelets|Chaussant/i.test(section))return 'armor';
 if(/Nourriture|Denrées|Manger boire/.test(section+' '+item.source))return 'food';
 if(/Poisons/.test(section))return 'poison';
 if(/Potions/.test(section))return 'potion';
 if(/Livres|Grimoires|Recueil/.test(section+' '+name))return 'book';
 if(/Véhicules et animaux/.test(section))return 'mount';
 if(/Ingrédients/.test(section))return 'ingredient';
 if(/Sacs et transport/.test(section))return 'bag';
 return 'misc';
}
