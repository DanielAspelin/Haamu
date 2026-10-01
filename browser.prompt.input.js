'use strict';

/**
 * Haamu Prompt Input — native editing/IME ingress for a logical Prompt.
 * Native controls own browser mutation/composition; WebText records semantic
 * intent/result state. This boundary never grants execution authority.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const bindings=new WeakMap();

const snapshot=(element,event,phase)=>{
 const webText=globalThis.HaamuWebText;
 const state={
  selectionStart:element.selectionStart??0,
  selectionEnd:element.selectionEnd??element.selectionStart??0,
 };
 return Object.freeze({
  type:'prompt-input-state',
  phase,
  value:String(element.value??''),
  composing:element.dataset.composing==='true'||!!event?.isComposing,
  input:webText?.input?.(event??{},state)??null,
  selection:webText?.selection?.({anchor:state.selectionStart,focus:state.selectionEnd})??null,
 });
};

const HaamuBrowserPromptInput=Object.freeze({
 family:'browser',role:'browser.prompt.input',type:'prompt-native-ime-input',version:'0.1.0',
 bind(element,options={}){
  if(!(element instanceof HTMLTextAreaElement||element instanceof HTMLInputElement))
   throw new TypeError('Prompt native input element required.');
  if(bindings.has(element))return bindings.get(element);
  const promptId=String(options.promptId??element.dataset.logicalPrompt??'').trim();
  if(!promptId)throw new RangeError('Prompt identity required.');
  let before=null,current=snapshot(element,null,'ready');
  const listeners={
   compositionstart:event=>{element.dataset.composing='true';current=snapshot(element,event,'compositionstart');},
   compositionupdate:event=>{current=snapshot(element,event,'compositionupdate');},
   compositionend:event=>{delete element.dataset.composing;current=snapshot(element,event,'compositionend');},
   beforeinput:event=>{before=snapshot(element,event,'beforeinput');current=before;},
   input:event=>{current=snapshot(element,event,'input');},
   keydown:event=>{current=snapshot(element,event,'keydown');},
   keyup:event=>{current=snapshot(element,event,'keyup');},
   select:event=>{current=snapshot(element,event,'selection');},
  };
  for(const [name,listener] of Object.entries(listeners))element.addEventListener(name,listener);
  const binding=Object.freeze({
   type:'prompt-input-binding',promptId,element,
   state:()=>current,before:()=>before,
   unbind(){for(const [name,listener] of Object.entries(listeners))element.removeEventListener(name,listener);bindings.delete(element);}
  });
  bindings.set(element,binding);return binding;
 }
});
globalThis.HaamuFamilies['browser.prompt.input']=Object.freeze({family:'browser',role:'browser.prompt.input',type:'prompt-native-ime-input',version:'0.1.0'});
globalThis.HaamuBrowserPromptInput=HaamuBrowserPromptInput;
