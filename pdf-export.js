'use strict';
// PDF composition stays on the device; original transparent illustrations are bundled locally.
async function createBackgroundPDF(model,assets){
  const {PDFDocument,rgb}=PDFLib;
  const doc=await PDFDocument.create();doc.setTitle('Feuille de background - '+model.name);doc.setAuthor('Les Chroniques de Fangh');doc.setSubject('Récapitulatif des réponses - Donjon de Naheulbeuk');
  const embedKnownFont=async asset=>{const m=asset.metrics;const glyphs=new Map(m.characters.map(([cp,id,advanceWidth])=>[cp,{id,advanceWidth,codePoints:[cp]}]));const font={...m,characterSet:m.characters.map(r=>r[0]),post:{isFixedPitch:false},head:{macStyle:{italic:false}},'OS/2':{sFamilyClass:1},glyphForCodePoint:cp=>glyphs.get(cp)||{id:0,advanceWidth:1200,codePoints:[cp]},layout:t=>({glyphs:Array.from(t,c=>font.glyphForCodePoint(c.codePointAt(0)))})};doc.registerFontkit({create:()=>font});return doc.embedFont(asset.bytes,{subset:false});};
  const regular=await embedKnownFont(assets.fonts.regular),bold=await embedKnownFont(assets.fonts.bold),italic=regular,sans=regular;
  const supported=new Set(regular.getCharacterSet());
  const text=s=>Array.from(String(s??'').replace(/\t/g,' ').replace(/\r/g,'').replace(/[\u2011\u2010]/g,'-')).map(c=>c==='\n'||supported.has(c.codePointAt(0))?c:'[U+'+c.codePointAt(0).toString(16).toUpperCase()+']').join('');

  const ink=rgb(.14,.14,.12),muted=rgb(.40,.39,.34),gold=rgb(.52,.41,.25),green=rgb(.20,.29,.23),pale=rgb(.78,.73,.62);
  const headerName=model.name.length>180?model.name.slice(0,177)+'…':model.name;
  const W=595.28,H=841.89,M=46,bodyW=W-2*M,leading=13.7,size=10.8,bottom=48;
  const portraitImg=assets.portrait?await doc.embedJpg(assets.portrait):null;
  const illustrations=assets.illustrations?await Promise.all(assets.illustrations.map(bytes=>doc.embedPng(bytes))):[];
  let page,y,pages=[],activeSection='';
  const drawText=(s,x,yy,font=regular,sz=size,color=ink)=>page.drawText(text(s),{x,y:yy,size:sz,font,color});
  const linesFor=(s,font,sz,width)=>{const result=[];for(const para of text(s).split('\n')){if(!para.trim()){result.push('');continue;}let line='';for(let word of para.split(/\s+/)){if(font.widthOfTextAtSize(word,sz)>width){if(line){result.push(line);line='';}while(word&&font.widthOfTextAtSize(word,sz)>width){let n=1;while(n<word.length&&font.widthOfTextAtSize(word.slice(0,n+1),sz)<=width)n++;result.push(word.slice(0,n));word=word.slice(n);}line=word;continue;}const trial=line?line+' '+word:word;if(font.widthOfTextAtSize(trial,sz)>width){result.push(line);line=word;}else line=trial;}if(line)result.push(line);}return result;};
  const icons={identity:'M12 1 L15 9 L23 12 L15 15 L12 23 L9 15 L1 12 L9 9 Z M12 5 L12 19 M5 12 L19 12',physical:'M6 9 C6 0 18 0 18 9 L18 13 C18 22 6 22 6 13 Z M8 10 L10 10 M14 10 L16 10 M10 16 Q12 18 15 15',equipment:'M7 8 L7 4 Q12 0 17 4 L17 8 M4 8 L20 8 L21 22 L3 22 Z M7 12 L17 12 L17 18 L7 18 Z',character:'M2 3 L11 5 L11 15 Q5 21 2 13 Z M14 3 L23 5 L23 15 Q17 21 14 13 Z M4 8 L6 8 M8 8 L10 8 M4 12 Q7 16 9 12 M16 8 L18 8 M20 8 L22 8 M16 14 Q19 10 21 14',history:'M1 3 Q7 1 12 5 Q18 1 23 3 L23 21 Q17 19 12 23 Q6 19 1 21 Z M12 5 L12 23 M4 7 L9 8 M15 8 L20 7 M4 12 L9 13 M15 13 L20 12',departure:'M8 23 L10 1 M16 23 L14 1 M12 20 L12 17 M12 13 L12 10 M12 6 L12 4',private:'M6 10 L6 6 Q6 0 12 0 Q18 0 18 6 L18 10 M3 10 L21 10 L21 23 L3 23 Z M12 14 L12 19'};
  function icon(key,x,yy,sz=17,opacity=1){page.drawSvgPath(icons[key]||icons.identity,{x,y:yy,scale:sz/24,borderColor:gold,borderWidth:1.15,borderOpacity:opacity});}
  function watermark(){
    const image=illustrations[(pages.length-1)%illustrations.length];if(!image)return;
    const width=290,height=width*image.height/image.width;
    page.drawImage(image,{x:W-M-width+8,y:40,width,height,opacity:.15});
  }
  function newPage(first=false){page=doc.addPage([W,H]);pages.push(page);page.drawRectangle({x:0,y:0,width:W,height:H,color:rgb(1,.997,.986)});watermark();
    drawText('LES CHRONIQUES DE FANGH',M,H-32,regular,7.2,gold);
    const tag=model.privateMode?'DOSSIER MJ - CONFIDENTIEL':'FEUILLE DE BACKGROUND';drawText(tag,W-M-regular.widthOfTextAtSize(tag,7),H-32,regular,7,muted);
    if(first){const top=H-52,boxW=110,boxH=137.5;
      page.drawRectangle({x:M,y:top-boxH,width:boxW,height:boxH,borderColor:pale,borderWidth:.8,color:rgb(.975,.966,.945)});
      if(portraitImg){const scale=Math.min(boxW/portraitImg.width,boxH/portraitImg.height);page.drawImage(portraitImg,{x:M+(boxW-portraitImg.width*scale)/2,y:top-boxH+(boxH-portraitImg.height*scale)/2,width:portraitImg.width*scale,height:portraitImg.height*scale});}
      else{icon('physical',M+41,top-39,28,.35);drawText('PORTRAIT',M+31,top-87,regular,8,muted);}
      const x=M+128,width=bodyW-128;let yy=top-24;
      drawText('Feuille de background',x,yy,regular,11,gold);yy-=29;
      for(const line of linesFor(headerName,bold,23,width)){drawText(line,x,yy,bold,23,green);yy-=27;}
      yy-=3;for(const line of linesFor(model.subtitle,regular,10,width)){drawText(line,x,yy,regular,10,muted);yy-=13;}
      y=Math.min(top-boxH-20,yy-14);
      page.drawLine({start:{x:M,y:y+9},end:{x:W-M,y:y+9},color:pale,thickness:.6});
    }else{let yy=H-59;for(const line of linesFor(headerName.length>90?headerName.slice(0,87)+'…':headerName,bold,11,bodyW)){drawText(line,M,yy,bold,11,green);yy-=14;}y=yy-12;if(activeSection){drawText(activeSection+' (suite)',M,y,bold,11,gold);y-=22;}}
  }
  function ensure(height){if(y-height<bottom)newPage(false);}
  function heading(title,key='identity',firstParagraph='',number=''){
    activeSection='';ensure(38+Math.min(4,linesFor(firstParagraph,regular,size,bodyW).length)*leading);activeSection=title;
    icon(key,M,y+3,17);drawText((number?number+'  ':'')+title,M+25,y-10,bold,13,green);page.drawLine({start:{x:M+25,y:y-16},end:{x:W-M,y:y-16},color:pale,thickness:.45});y-=32;
  }
  function paragraph(s){const ls=linesFor(s,regular,size,bodyW);let i=0;while(i<ls.length){let capacity=Math.floor((y-bottom)/leading);const remaining=ls.length-i;if(capacity<Math.min(2,remaining)){newPage(false);capacity=Math.floor((y-bottom)/leading);}let take=Math.min(capacity,remaining);if(remaining-take===1&&take>2)take--;for(let j=0;j<take;j++){if(ls[i])drawText(ls[i],M,y);y-=leading;i++;}if(i<ls.length)newPage(false);}y-=3;}
  function recapRows(rows){let pending=null;const cellW=(bodyW-20)/2;const pair=(left,right)=>{const items=[left,right].filter(Boolean).map(r=>({r,lines:linesFor(r.label+' : '+r.value,regular,size,cellW-8)}));const height=Math.max(...items.map(i=>i.lines.length))*leading+4;ensure(height);const startY=y;items.forEach(({r,lines},col)=>{const x=M+col*(cellW+20),prefix=r.label+' : ';lines.forEach((line,i)=>{if(i===0&&line.startsWith(prefix)){drawText(prefix,x,startY,bold,size);drawText(line.slice(prefix.length),x+bold.widthOfTextAtSize(text(prefix),size),startY);}else drawText(line,x,startY-i*leading);});});y-=height;};for(const r of rows){const short=!r.value.includes('\n')&&(r.label.length+r.value.length<65);if(short){if(pending){pair(pending,r);pending=null;}else pending=r;}else{if(pending){pair(pending);pending=null;}paragraph(r.label+' : '+r.value);}}if(pending)pair(pending);}
  newPage(true);
  for(let i=0;i<model.sections.length;i++){const section=model.sections[i];heading(section.title,section.key,section.paragraphs[0],String(i+1).padStart(2,'0'));if(section.rows)recapRows(section.rows);else for(const p of section.paragraphs)paragraph(p);y-=3;}
  if(!model.sections.length){heading('Une histoire à écrire');paragraph('Les rubriques se rempliront au fil des réponses dans l’atelier.');}
  if(model.warnings.length){heading('À vérifier avec le MJ','history',model.warnings[0]);for(const w of model.warnings)paragraph(w);}
  for(let i=0;i<pages.length;i++){page=pages[i];page.drawLine({start:{x:M,y:34},end:{x:W-M,y:34},color:pale,thickness:.4});drawText(model.privateMode?'Secrets et notes au MJ inclus.':'Secrets et notes au MJ exclus.',M,23,regular,7,muted);const n=String(i+1)+' / '+pages.length;drawText(n,W-M-regular.widthOfTextAtSize(n,8),23,regular,8,gold);}
  return doc.save();
}
async function downloadNarrativePDF(){const buttons=[...document.querySelectorAll('[data-pdf]')];buttons.forEach(button=>{button.disabled=true;button.textContent='Composition du PDF…';});try{const bytes=await createBackgroundPDF(documentModel(),{portrait:await croppedPortraitBytes(),fonts:await pdfFontAssets(),illustrations:await pdfIllustrationAssets()});const name=(str('name')||'personnage').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'-').slice(0,60);download('background-'+name+'.pdf',bytes,'application/pdf');toast('PDF récapitulatif téléchargé.');}catch(e){console.error(e);toast('Le PDF n’a pas pu être créé. Réessayez ou utilisez l’impression.');}finally{buttons.forEach(button=>{button.disabled=false;button.textContent='Télécharger le PDF';});}}
let pdfFontsPromise;
function pdfFontAssets(){if(!pdfFontsPromise)pdfFontsPromise=Promise.all(['regular','bold'].map(async key=>{const results=await Promise.all([fetch('assets/fonts/'+key+'.ttf'),fetch('assets/fonts/'+key+'.json')]);if(results.some(r=>!r.ok))throw Error('Police PDF indisponible');return [key,{bytes:new Uint8Array(await results[0].arrayBuffer()),metrics:await results[1].json()}];})).then(Object.fromEntries).catch(e=>{pdfFontsPromise=null;throw e;});return pdfFontsPromise;}

let pdfIllustrationsPromise;
function pdfIllustrationAssets(){if(!pdfIllustrationsPromise)pdfIllustrationsPromise=Promise.all(['souvenirs-v1.png','voyage-v1.png'].map(async name=>{const r=await fetch('assets/pdf/'+name);if(!r.ok)throw Error('Illustration PDF indisponible');return new Uint8Array(await r.arrayBuffer());})).catch(e=>{pdfIllustrationsPromise=null;throw e;});return pdfIllustrationsPromise;}
