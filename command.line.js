'use strict';

/**
 * Haamu Command Line — renderer-independent control system for one isolated
 * command channel. It can select/configure Terminal, Shell and Search routing
 * state, but grants no execution, provider, network or privilege authority.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const SHELLS=Object.freeze(['client','server','local','global']);
const MODES=Object.freeze(['terminal','shell','search']);

const create=(id,definition={})=>{
 const channelId=String(id??'').trim();
 if(!channelId)throw new RangeError('Command line identity required.');

 let mode=MODES.includes(definition.mode)?definition.mode:'terminal';
 let shell=SHELLS.includes(definition.shell)?definition.shell:'client';
 let searchProvider=typeof definition.searchProvider==='function'?definition.searchProvider:null;
 const history=[];

 const snapshot=()=>Object.freeze({
  type:'command-line-state',channelId,mode,shell,
  searchConnected:typeof searchProvider==='function',
  historyLength:history.length
 });

 const system=Object.freeze({
  type:'command-line-system',channelId,

  state:snapshot,
  history:()=>Object.freeze(Array.from(history)),

  terminal(){
   mode='terminal';return snapshot();
  },

  useShell(type=shell){
   type=String(type);
   if(!SHELLS.includes(type))throw new RangeError('Unknown shell type.');
   shell=type;mode='shell';return snapshot();
  },

  useSearch(){
   mode='search';return snapshot();
  },

  connectSearch(provider){
   if(typeof provider!=='function')throw new TypeError('Search provider function required.');
   searchProvider=provider;return snapshot();
  },

  disconnectSearch(){
   searchProvider=null;return snapshot();
  },

  interpret(value,context={}){
   const source=String(value??'').trim();
   const parts=source.split(/\s+/u);
   const head=(parts[0]??'').toLowerCase();

   if(head==='terminal'&&parts.length===1)return this.terminal();
   if(head==='shell'&&parts.length===2&&SHELLS.includes(parts[1].toLowerCase()))return this.useShell(parts[1].toLowerCase());
   if(head==='search'&&parts.length===1)return this.useSearch();

   let input,output;
   if(mode==='search'){
    input=globalThis.HaamuSearchInput?.create(source,{channelId,source:'command-line'});
    if(!input)throw new Error('HaamuSearchInput unavailable.');
    if(!searchProvider){
     output=globalThis.HaamuSearchOutput?.create(source,[],'unavailable',{channelId});
    }else{
     const result=searchProvider(source,{...context,channelId,input});
     output=result?.type==='search-output'?result:
      globalThis.HaamuSearchOutput?.create(source,Array.isArray(result)?result:[result],'completed',{channelId});
    }
   }else if(mode==='shell'){
    input=globalThis.HaamuShellInput?.create(source,{channelId,shell,source:'command-line'});
    if(!input)throw new Error('HaamuShellInput unavailable.');
    const router=context.router;
    if(!router?.execute){
     output=globalThis.HaamuShellOutput?.create(shell,source,'Shell router is not connected.','unavailable',{channelId,stream:'system'});
    }else{
     const result=router.execute(shell,source,{...context,channelId,shellInput:input});
     output=result?.type==='shell-output'?result:
      globalThis.HaamuShellOutput?.create(shell,source,result?.payload??result,result?.state??'completed',{channelId,stream:result?.stream??'stdout'});
    }
   }else{
    input=globalThis.HaamuTerminalInput?.create(source,{channelId,shell,source:'command-line'});
    if(!input)throw new Error('HaamuTerminalInput unavailable.');
    const router=context.router;
    if(!globalThis.HaamuTerminalShell?.execute||!router){
     output=globalThis.HaamuTerminalOutput?.create(shell,source,'system','Terminal shell is not connected.','unavailable',{channelId});
    }else{
     output=HaamuTerminalShell.execute(input,router,{...context,channelId});
    }
   }

   const transaction=Object.freeze({type:'command-line-transaction',channelId,mode,shell,input,output,timestamp:new Date().toISOString()});
   history.push(transaction);
   return transaction;
  }
 });
 return system;
};

const systems=new Map();
const HaamuCommandLine=Object.freeze({
 family:'command',role:'command.line',type:'terminal-shell-search-command-line',version:'0.1.0',
 modes:MODES,shells:SHELLS,
 create,
 forChannel(id,definition={}){
  const key=String(id??'').trim();
  if(!key)throw new RangeError('Command channel identity required.');
  if(!systems.has(key))systems.set(key,create(key,definition));
  return systems.get(key);
 },
 remove(id){return systems.delete(String(id));},
 channels(){return Object.freeze(Array.from(systems.keys()));}
});

globalThis.HaamuFamilies['command.line']=Object.freeze({
 family:HaamuCommandLine.family,role:HaamuCommandLine.role,
 type:HaamuCommandLine.type,version:HaamuCommandLine.version,
});
globalThis.HaamuCommandLine=HaamuCommandLine;
