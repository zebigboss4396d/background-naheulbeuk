'use strict';
// Fenêtres sur les planches originales : aucun dessin n’est recomposé ou déformé.
const FORM_ART={
 village:{sheet:'symboles',rect:[180,9,424,187]},
 landscape:{sheet:'scenes',rect:[0,0,348,181]},
 faces:{sheet:'symboles',rect:[0,202,431,160]},
 expressions:{sheet:'scenes',rect:[0,370,410,107]},
 reader:{sheet:'scenes',rect:[0,188,256,179]},
 pack:{sheet:'symboles',rect:[482,367,176,153]},
 arms:{sheet:'scenes',rect:[872,478,342,192]},
 coins:{sheet:'symboles',rect:[666,375,125,145]},
 tavern:{sheet:'scenes',rect:[0,815,350,201]},
 tastes:{sheet:'symboles',rect:[0,366,380,154]},
 animals:{sheet:'scenes',rect:[0,652,441,159]},
 family:{sheet:'symboles',rect:[0,680,268,140]},
 mentor:{sheet:'symboles',rect:[770,675,279,148]},
 journey:{sheet:'symboles',rect:[1002,204,529,162]},
 departure:{sheet:'scenes',rect:[636,816,244,202]},
 quill:{sheet:'symboles',rect:[1237,529,294,148]}
};
const PANEL_ART=[['village','landscape'],['faces','expressions','reader'],['arms','pack'],['expressions','tastes','animals'],['mentor','family'],['departure','faces','quill']];
const CHAPTER_SIGNATURE=['quill','expressions','coins','tastes','family','pack'];
function formArtwork(key,extraClass=''){
 const art=FORM_ART[key];if(!art)return '';
 const [x,y,w,h]=art.rect;
 return `<div class="form-art ${extraClass}" aria-hidden="true" style="--art-ratio:${w}/${h};--art-max-width:${185*w/h}px;--signature-max-width:${78*w/h}px"><img src="assets/formulaire/planche-${art.sheet}.png" alt="" draggable="false" decoding="async" style="width:${1536/w*100}%;left:${-x/w*100}%;top:${-y/h*100}%"></div>`;
}
function chapterArtwork(step,panel){return formArtwork(PANEL_ART[step]?.[panel]||PANEL_ART[step]?.[0],'chapter-art');}
function chapterSignature(step){return formArtwork(CHAPTER_SIGNATURE[step],'form-signature');}
