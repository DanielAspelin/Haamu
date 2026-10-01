'use strict';

/**
 * Haamu Browser API — bounded browser API capability registry.
 *
 * Discovers and exposes browser-native APIs without granting permissions,
 * credentials, network authority, device access or privileged execution.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const resolvePath=path=>{
  const parts=String(path??'').split('.').filter(Boolean);
  let value=globalThis;
  for(const part of parts){
    if(value==null||!(part in value))return undefined;
    value=value[part];
  }
  return value;
};

const HaamuBrowserAPI=Object.freeze({
 family:'browser',role:'browser.api',type:'browser-api-boundary',version:'0.1.0',

 has(path){return resolvePath(path)!==undefined;},

 get(path){
  const value=resolvePath(path);
  return value===undefined?null:value;
 },

 capability(path){
  const value=resolvePath(path);
  return Object.freeze({
    type:'browser-api-capability',
    path:String(path),
    available:value!==undefined,
    valueType:value===undefined?'undefined':typeof value,
  });
 },

 capabilities(paths=[]){
  return Object.freeze(Array.from(paths,path=>this.capability(path)));
 },

 invoke(path,args=[],options={}){
  if(options.allow!==true)throw new Error('Explicit browser API invocation permission required.');
  const parts=String(path??'').split('.').filter(Boolean);
  if(!parts.length)throw new RangeError('Browser API path required.');
  const name=parts.pop();
  const owner=parts.length?resolvePath(parts.join('.')):globalThis;
  const fn=owner?.[name];
  if(typeof fn!=='function')throw new TypeError('Browser API function unavailable: '+path);
  return Reflect.apply(fn,owner,Array.from(args));
 }
});

globalThis.HaamuFamilies['browser.api']=Object.freeze({
 family:HaamuBrowserAPI.family,role:HaamuBrowserAPI.role,
 type:HaamuBrowserAPI.type,version:HaamuBrowserAPI.version,
});
globalThis.HaamuBrowserAPI=HaamuBrowserAPI;
