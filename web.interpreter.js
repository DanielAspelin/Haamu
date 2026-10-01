'use strict';

/**
 * Haamu Web Interpreter — compatibility interpretation boundary.
 * Canonical command execution is delegated to Command Line when a channel is
 * supplied. Legacy parsing remains available for callers not yet migrated.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const SHELLS=Object.freeze(['client','server','local','global']);

const HaamuWebInterpreter=Object.freeze({
 family:'web',role:'web.interpreter',type:'command-line-interpreter-adapter',version:'0.2.0',

 parse(value,context={}){
  const source=String(value??'').trim();
  const defaultShell=SHELLS.includes(context.shell)?context.shell:'client';
  if(!source)return Object.freeze({type:'interpreted-command',kind:'empty',source,shell:defaultShell,args:Object.freeze([])});
  const parts=source.split(/\s+/u),head=parts[0].toLowerCase(),args=Object.freeze(parts.slice(1));
  if(head==='search'||head==='?')return Object.freeze({type:'interpreted-command',kind:'search',source,shell:defaultShell,query:args.join(' '),args});
  if(head==='shell'&&SHELLS.includes(String(parts[1]??'').toLowerCase()))
   return Object.freeze({type:'interpreted-command',kind:'shell-select',source,shell:String(parts[1]).toLowerCase(),args:Object.freeze(parts.slice(2))});
  return Object.freeze({type:'interpreted-command',kind:'shell',source,shell:defaultShell,args});
 },

 execute(value,context={}){
  const line=context.commandLine??(context.channelId?globalThis.HaamuCommandLine?.forChannel?.(context.channelId,{shell:context.shell}):null);
  if(line?.submit){
   const input=globalThis.HaamuCommandInput?.create?.(value,{channelId:line.channelId,promptId:context.promptId,source:'web-interpreter'});
   if(!input)throw new Error('HaamuCommandInput unavailable.');
   return line.submit(input,context);
  }

  /* Compatibility-only path for callers without a command channel. */
  const interpreted=this.parse(value,context);
  const output=(stream,payload,state='completed')=>globalThis.HaamuTerminalOutput?.create
   ? HaamuTerminalOutput.create(interpreted.shell,interpreted.source,stream,payload,state,context)
   : Object.freeze({type:'terminal-output',shell:interpreted.shell,stream,payload:String(payload??''),state});

  if(interpreted.kind==='empty')return output('stdout','');
  if(interpreted.kind==='shell-select')return output('system',interpreted.shell,'selected');
  if(interpreted.kind==='search'){
   if(!interpreted.query)return output('stderr','Search query required.','rejected');
   if(typeof context.search!=='function')return output('system','Search is not connected.','unavailable');
   const result=context.search(interpreted.query,context);
   return result?.type==='terminal-output'?result:output('stdout',result);
  }
  if(!context.router?.execute)return output('system','Shell router is not connected.','unavailable');
  return context.router.execute(interpreted.shell,interpreted.source,context);
 }
});
globalThis.HaamuFamilies['web.interpreter']=Object.freeze({family:HaamuWebInterpreter.family,role:HaamuWebInterpreter.role,type:HaamuWebInterpreter.type,version:HaamuWebInterpreter.version});
globalThis.HaamuWebInterpreter=HaamuWebInterpreter;
