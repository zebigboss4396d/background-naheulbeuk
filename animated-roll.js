import {diceFace} from './dice-controller.js';
export function rollUniform(sides,source=globalThis.crypto){
 if(!Number.isInteger(sides)||sides<2||sides>256)throw Error('Nombre de faces invalide.');
 if(!source?.getRandomValues)return Math.floor(Math.random()*sides)+1;
 const sample=new Uint8Array(1),limit=Math.floor(256/sides)*sides;do{source.getRandomValues(sample);}while(sample[0]>=limit);return sample[0]%sides+1;
}
export function animatedDieHTML(sides,value=null){
 if(sides===6)return `<span class="moote-die-shape moote-d6">${value?diceFace(value):'<span>?</span>'}</span><small>D6</small>`;
 return `<span class="moote-die-shape moote-d${sides}"><span>${value||'?'}</span></span><small>D${sides}</small>`;
}
export async function animateDie(button,sides,result,duration=950){
 const shape=button.querySelector('.moote-die-shape');if(!shape)return;
 if(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
 let timer;
 try{
  timer=setInterval(()=>{const value=Math.floor(Math.random()*sides)+1;shape.innerHTML=sides===6?diceFace(value):`<span>${value}</span>`;},85);
  if(shape.animate){const a=shape.animate([{transform:'translateY(0) rotateX(0deg) rotateZ(0deg)'},{transform:'translateY(-16px) rotateX(230deg) rotateZ(-110deg)'},{transform:'translateY(3px) rotateX(410deg) rotateZ(-270deg)'},{transform:'translateY(-5px) rotateX(630deg) rotateZ(-340deg)'},{transform:'translateY(0) rotateX(720deg) rotateZ(-360deg)'}],{duration,easing:'ease-out'});await a.finished;}
  else await new Promise(resolve=>setTimeout(resolve,duration));
 }catch{}finally{clearInterval(timer);shape.innerHTML=sides===6?diceFace(result):`<span>${result}</span>`;}
}
