'use strict';

/**
 * Haamu Web Interpreter — one command-line interpretation boundary.
 *
 * The prompt supplies browser input. Interpreter classifies that input and
 * routes shell commands, terminal output and search requests without granting
 * server/local/global execution or external search authority by itself.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const SHELLS=Object.freeze(['client','server','local','global']);
const terminalRecord=(shell,command,stream,payload,state='completed')=>Object.freeze({
 type:'terminal-output',shell:String(shell),commandId:'interpreter:'+Date.now(),
 sessionId:'haamu',sequence:0,timestamp:new Date().toISOString(),
 stream,payload:String(payload??''),state,
});

const HaamuWebInterpreter=Object.freeze({
 family:'web',role:'web.interpreter',type:'command-line-interpreter',version:'0.1.0',

 parse(value,context={}){
  const source=String(value??'').trim();
  const defaultShell=SHELLS.includes(context.shell)?context.shell:'client';
  if(!source)return Object.freeze({type:'interpreted-command',kind:'empty',source,shell:defaultShell,args:Object.freeze([])});

  const parts=source.split(/\s+/u),head=parts[0].toLowerCase(),args=Object.freeze(parts.slice(1));
  if(head==='search'||head==='?')return Object.freeze({type:'interpreted-command',kind:'search',source,shell:defaultShell,query:args.join(' '),args});
  if(head==='shell'&&SHELLS.includes(String(parts[1]??'').toLowerCase())){
   const shell=String(parts[1]).toLowerCase();
   return Object.freeze({type:'interpreted-command',kind:'shell-select',source,shell,args:Object.freeze(parts.slice(2))});
  }
  return Object.freeze({type:'interpreted-command',kind:'shell',source,shell:defaultShell,args});
 },

 execute(value,context={}){
  const interpreted=this.parse(value,context);
  if(interpreted.kind==='empty')return terminalRecord(interpreted.shell,'','stdout','');
  if(interpreted.kind==='shell-select')return terminalRecord(interpreted.shell,interpreted.source,'system',interpreted.shell,'selected');
  if(interpreted.kind==='search'){
   if(!interpreted.query)return terminalRecord(interpreted.shell,interpreted.source,'stderr','Search query required.','rejected');
   if(typeof context.search!=='function')return terminalRecord(interpreted.shell,interpreted.source,'system','Search is not connected.','unavailable');
   const result=context.search(interpreted.query,context);
   return result?.type==='terminal-output'?result:terminalRecord(interpreted.shell,interpreted.source,'stdout',result);
  }
  const router=context.router;
  if(!router?.execute)return terminalRecord(interpreted.shell,interpreted.source,'system','Shell router is not connected.','unavailable');
  return router.execute(interpreted.shell,interpreted.source,context);
 }
});

globalThis.HaamuFamilies['web.interpreter']=Object.freeze({
 family:HaamuWebInterpreter.family,role:HaamuWebInterpreter.role,
 type:HaamuWebInterpreter.type,version:HaamuWebInterpreter.version,
});
globalThis.HaamuWebInterpreter=HaamuWebInterpreter;
