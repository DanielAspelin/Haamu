'use strict';
(()=>{
  const VERSION='0.1.0';
  const states=new WeakMap();
  const FONT="600 14px Rajdhani,sans-serif";
  function linesFor(ctx,text,width){
    const lines=[''];
    for(const ch of text){
      if(ch==='\n'){lines.push('');continue;}
      const cur=lines[lines.length-1];
      if(cur&&ctx.measureText(cur+ch).width>width) lines.push(ch);
      else lines[lines.length-1]=cur+ch;
    }
    return lines;
  }
  function render(textarea){
    const state=states.get(textarea); if(!state)return;
    const {canvas,ctx}=state, r=canvas.getBoundingClientRect();
    if(r.width<1||r.height<1)return;
    const d=Math.min(2,devicePixelRatio||1);
    canvas.width=Math.max(1,Math.round(r.width*d)); canvas.height=Math.max(1,Math.round(r.height*d));
    ctx.setTransform(d,0,0,d,0,0); ctx.clearRect(0,0,r.width,r.height);
    const off=document.createElement('canvas'), oc=off.getContext('2d',{willReadFrequently:true});
    off.width=Math.max(1,Math.floor(r.width)); off.height=Math.max(1,Math.floor(r.height));
    oc.font=FONT; oc.textBaseline='alphabetic'; oc.fillStyle='#fff';
    const text=textarea.value||'', left=12, right=12, lineHeight=17;
    const lines=linesFor(oc,text,Math.max(1,r.width-left-right));
    const active=Math.max(0,lines.length-1), first=Math.max(0,active-2);
    const baseline=Math.round(r.height/2+5), shift=active*lineHeight;
    for(let li=first;li<lines.length;li++) oc.fillText(lines[li],left,baseline+li*lineHeight-shift);
    const caretIndex=Math.max(0,Math.min(text.length,textarea.selectionStart??text.length));
    let consumed=0, caretLine=0, caretColumn=0;
    for(let li=0;li<lines.length;li++){
      const len=lines[li].length;
      if(caretIndex<=consumed+len){caretLine=li;caretColumn=Math.max(0,caretIndex-consumed);break;}
      consumed+=len; if(text[consumed]==='\n')consumed++;
      caretLine=Math.min(li+1,lines.length-1); caretColumn=lines[caretLine]?.length||0;
    }
    if(document.activeElement===textarea&&textarea.selectionStart===textarea.selectionEnd&&caretLine>=first){
      const sample=lines[caretLine]||text||'Hg', m=oc.measureText(sample);
      const ascent=m.actualBoundingBoxAscent||11, descent=m.actualBoundingBoxDescent||3;
      const cb=baseline+caretLine*lineHeight-shift, top=cb-ascent, bottom=cb+descent;
      const base=(bottom-top)*1.025, morph=.75+.275*((Math.sin(state.phase)+1)/2), h=base*morph;
      const center=(top+bottom)/2-1, x=Math.min(r.width-right-1,left+oc.measureText((lines[caretLine]||'').slice(0,caretColumn)).width+2);
      oc.fillRect(x,center-h/2,1,h);
    }
    const data=oc.getImageData(0,0,off.width,off.height).data; ctx.fillStyle='#dce8f5'; let n=0;
    for(let y=0;y<off.height&&n<12000;y++)for(let x=0;x<off.width&&n<12000;x++){
      const a=data[(y*off.width+x)*4+3]; if(a<=8)continue;
      const z=.76; ctx.globalAlpha=Math.max(.18,a/255); ctx.beginPath();
      ctx.moveTo(x,y-z);ctx.lineTo(x+z,y);ctx.lineTo(x,y+z);ctx.lineTo(x-z,y);ctx.closePath();ctx.fill();n++;
    }
    ctx.globalAlpha=1; canvas.dataset.particles=String(n);
  }
  function attach(textarea,host){
    if(!textarea||!host||states.has(textarea))return null;
    const canvas=document.createElement('canvas'); canvas.className='plate-prompt-particle-projection'; canvas.setAttribute('aria-hidden','true');
    Object.assign(canvas.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',zIndex:'3'});
    host.appendChild(canvas);
    const state={canvas,ctx:canvas.getContext('2d'),phase:0,raf:0};
    states.set(textarea,state);
    const draw=()=>render(textarea), animate=()=>{state.phase+=.045;render(textarea);state.raf=requestAnimationFrame(animate);};
    ['input','focus','keyup','click','select'].forEach(type=>textarea.addEventListener(type,draw));
    document.fonts?.ready?.then(draw); state.raf=requestAnimationFrame(animate); return Object.freeze({canvas,render:draw});
  }
  globalThis.HaamuPromptParticle=Object.freeze({version:VERSION,attach,render});
})();