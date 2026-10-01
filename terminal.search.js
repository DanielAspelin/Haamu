'use strict';

/**
 * Haamu Terminal Search — terminal/search bridge.
 * Search providers are explicit capabilities; this module grants no network authority.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuTerminalSearch=Object.freeze({
 family:'terminal',role:'terminal.search',type:'terminal-search-bridge',version:'0.1.0',

 execute(input,provider,context={}){
  const value=input?.type==='terminal-input'?input.value:String(input??'');
  const query=String(context.query??value).replace(/^\s*(?:search|\?)\s*/iu,'').trim();
  const shell=String(input?.shell??context.shell??'client');
  if(!query){
   return globalThis.HaamuTerminalOutput?.create
    ? HaamuTerminalOutput.create(shell,value,'stderr','Search query required.','rejected',context)
    : Object.freeze({type:'terminal-output',shell,commandId:'search',sessionId:'haamu',sequence:0,timestamp:new Date().toISOString(),stream:'stderr',payload:'Search query required.',state:'rejected'});
  }
  if(typeof provider!=='function'){
   return globalThis.HaamuTerminalOutput?.create
    ? HaamuTerminalOutput.create(shell,value,'system','Search is not connected.','unavailable',context)
    : Object.freeze({type:'terminal-output',shell,commandId:'search',sessionId:'haamu',sequence:0,timestamp:new Date().toISOString(),stream:'system',payload:'Search is not connected.',state:'unavailable'});
  }
  const result=provider(query,{...context,terminalInput:input});
  if(result?.type==='terminal-output')return result;
  return globalThis.HaamuTerminalOutput?.create
   ? HaamuTerminalOutput.create(shell,value,'stdout',result,'completed',context)
   : result;
 }
});
globalThis.HaamuFamilies['terminal.search']=Object.freeze({family:'terminal',role:'terminal.search',type:'terminal-search-bridge',version:'0.1.0'});
globalThis.HaamuTerminalSearch=HaamuTerminalSearch;
