const normalized=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const HOBBIT_PROFILES=new Set(['semi-homme','semi-homme de la loi','mage culinaire hobbit','paladin semi-homme de picrate','paladin semi-homme de jord’hun'].map(normalized));
export const isHobbitProfile=profile=>HOBBIT_PROFILES.has(normalized(profile?.origin))||HOBBIT_PROFILES.has(normalized(profile?.job));
export function isHobbitEquipment(item){
 if(typeof item.hobbitSized==='boolean')return item.hobbitSized;
 // CAMHiF est le catalogue propre aux semi-hommes du Mooté.
 if(item.catalog==='camhif')return true;
 return [item.section,item.originalSection,item.name].some(value=>/\bpour (?:les )?(?:semi[- ]hommes?|hobbits?)\b|\((?:semi[- ]hommes?|hobbits?)\)/.test(normalized(value)));
}
export function isClothingOrProtection(item){
 if(typeof item.clothingOrProtection==='boolean')return item.clothingOrProtection;
 if(item.kind==='armor'||item.category==='Protections'||item.originalCategory==='Protections')return true;
 // Classer l'objet, même lorsqu'il est rangé dans Divers ou un rayon magique.
 return /^(?:chaussettes?|chaussures?|bott(?:es?|ines?)|short|pantalon|ceintur(?:e|on)|chemise|tunique|gants?|kimono|manteau|chapeau|cap(?:e|uche|eline)|bonnet|bandeau|masque|tricorne|haut-de-forme|robe|aube|soutane|etole|mitre|veste|toque|bretelles?|tenue)\b/.test(normalized(item.name));
}
export function priceEquipment(item,profile){
 // Conserver la base permet les sauvegardes, les changements de profil et les appels répétés.
 const basePricePc=Math.max(0,Math.round(Number(item.basePricePc??item.pricePc)||0));
 const hobbitSurcharge=isHobbitProfile(profile)&&isClothingOrProtection(item)&&basePricePc>0&&!item.startingGift&&!isHobbitEquipment(item);
 const pricePc=hobbitSurcharge?Math.ceil(basePricePc*6/5):basePricePc;
 return {...item,basePricePc,pricePc,hobbitSurcharge,hobbitSized:isHobbitEquipment(item)};
}
export function equipmentPriceText(item,money,quantity=1){
 const total=money(item.pricePc*quantity);
 return item.hobbitSurcharge?`${total} (prix catalogue ${money(item.basePricePc*quantity)} ; +20 % semi-homme)`:total;
}
export function equipmentPriceHTML(item,money,quantity=1){
 if(!item.pricePc)return 'Gratuit';
 if(item.hobbitSurcharge)return `<span class="hobbit-price"><del aria-label="Prix catalogue">${money(item.basePricePc*quantity)}</del> <strong>${money(item.pricePc*quantity)}</strong><small>+20 % semi-homme</small></span>`;
 return `${money(item.pricePc*quantity)}${item.hobbitSized?'<small class="hobbit-price-exempt">Taille semi-homme : sans surcoût</small>':''}`;
}
