'use strict';

/**
 * Haamu Browser Cookies — bounded document-cookie adapter.
 *
 * Operates only on cookies visible to the current browser document. HttpOnly
 * cookies remain inaccessible by design. No consent, authentication or
 * authorization is inferred from cookie presence.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const encode=value=>encodeURIComponent(String(value??''));
const decode=value=>{try{return decodeURIComponent(value);}catch{return value;}};

const HaamuBrowserCookies=Object.freeze({
 family:'browser',role:'browser.cookies',type:'browser-cookie-adapter',version:'0.1.0',

 available(){
  return typeof document!=='undefined'&&typeof document.cookie==='string';
 },

 list(){
  if(!this.available())return Object.freeze([]);
  const records=document.cookie?document.cookie.split(/;\s*/u).filter(Boolean).map(pair=>{
   const index=pair.indexOf('=');
   const name=index<0?pair:pair.slice(0,index);
   const value=index<0?'':pair.slice(index+1);
   return Object.freeze({name:decode(name),value:decode(value)});
  }):[];
  return Object.freeze(records);
 },

 get(name){
  const key=String(name);
  return this.list().find(cookie=>cookie.name===key)?.value??null;
 },

 has(name){return this.get(name)!==null;},

 set(name,value,options={}){
  if(!this.available())throw new Error('Browser cookies unavailable.');
  const key=String(name).trim();
  if(!key)throw new RangeError('Cookie name required.');
  let cookie=encode(key)+'='+encode(value);
  if(options.path!==false)cookie+='; Path='+String(options.path??'/');
  if(options.maxAge!==undefined)cookie+='; Max-Age='+Math.trunc(Number(options.maxAge));
  if(options.expires!==undefined){
   const date=options.expires instanceof Date?options.expires:new Date(options.expires);
   if(Number.isNaN(date.getTime()))throw new RangeError('Invalid cookie expiry.');
   cookie+='; Expires='+date.toUTCString();
  }
  if(options.sameSite)cookie+='; SameSite='+String(options.sameSite);
  if(options.secure!==false&&globalThis.location?.protocol==='https:')cookie+='; Secure';
  document.cookie=cookie;
  return this.get(key);
 },

 remove(name,options={}){
  this.set(name,'',{...options,maxAge:0,expires:new Date(0)});
  return !this.has(name);
 }
});

globalThis.HaamuFamilies['browser.cookies']=Object.freeze({
 family:HaamuBrowserCookies.family,role:HaamuBrowserCookies.role,
 type:HaamuBrowserCookies.type,version:HaamuBrowserCookies.version,
});
globalThis.HaamuBrowserCookies=HaamuBrowserCookies;
