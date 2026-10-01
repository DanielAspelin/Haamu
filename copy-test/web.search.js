'use strict';

/**
 * Haamu Web Search — web-wide search contract and provider boundary.
 */
globalThis.HaamuFamilies ??= Object.create(null);

let provider=null;
const HaamuWebSearch=Object.freeze({
 family:'web',role:'web.search',type:'web-search-boundary',version:'0.1.0',

 connect(searchProvider){
  if(typeof searchProvider!=='function')throw new TypeError('Search provider function required.');
  provider=searchProvider;
  return true;
 },

 disconnect(){provider=null;return true;},
 connected(){return typeof provider==='function';},

 search(query,context={}){
  const source=String(query??'').trim();
  if(!source)throw new RangeError('Search query required.');
  if(!provider)return Object.freeze({type:'web-search-result',query:source,state:'unavailable',results:Object.freeze([])});
  const result=provider(source,context);
  return result?.type?result:Object.freeze({type:'web-search-result',query:source,state:'completed',results:Object.freeze(Array.isArray(result)?result:[result])});
 }
});
globalThis.HaamuFamilies['web.search']=Object.freeze({family:'web',role:'web.search',type:'web-search-boundary',version:'0.1.0'});
globalThis.HaamuWebSearch=HaamuWebSearch;
globalThis.HaamuSearch=HaamuWebSearch;
