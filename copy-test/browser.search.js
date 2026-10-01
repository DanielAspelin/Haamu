'use strict';

/**
 * Haamu Browser Search — browser-facing search ingress/egress adapter.
 * It does not select or silently install an external search provider.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuBrowserSearch=Object.freeze({
 family:'browser',role:'browser.search',type:'browser-search-adapter',version:'0.1.0',

 input(query,metadata={}){
  if(globalThis.HaamuBrowserInput?.text)return HaamuBrowserInput.text(query,{kind:'search',...metadata});
  return Object.freeze({type:'browser-input',kind:'search',source:'browser',payload:Object.freeze({value:String(query??''),...metadata})});
 },

 search(query,context={}){
  if(!globalThis.HaamuWebSearch?.search)throw new Error('HaamuWebSearch unavailable.');
  return HaamuWebSearch.search(String(query??''),{...context,browserInput:this.input(query,context.metadata??{})});
 },

 output(result,metadata={}){
  if(!globalThis.HaamuBrowserOutput?.record)throw new Error('HaamuBrowserOutput unavailable.');
  return HaamuBrowserOutput.record('search',result,metadata);
 }
});
globalThis.HaamuFamilies['browser.search']=Object.freeze({family:'browser',role:'browser.search',type:'browser-search-adapter',version:'0.1.0'});
globalThis.HaamuBrowserSearch=HaamuBrowserSearch;
