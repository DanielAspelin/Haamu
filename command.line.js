'use strict';

/**
 * Haamu Command Line — companion controller for Command.
 * Consumes Command Input, controls Terminal/Shell/Search mode and emits the
 * corresponding isolated channel output. No authority is implied by mode.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const SHELLS=Object.freeze(['client','server','local','global']);
const MODES=Object.freeze(['terminal','shell','search']);
const systems=new Map();

const create=(id,definition={})=>{
 const channelId=String(id??'').trim();
 if(!channelId)throw new RangeError('Command line identity required.');
 const channel=definition.channel??globalThis.HaamuCommandChannel?.ensure?.(channelId,{shell:definition.shell});
 if(!channel)throw new Error('HaamuCommandChannel unavailable.');
 let mode=MODES.includes(definition.mode)?definition.mode:'terminal';
 let shell=SHELLS.includes(definition.shell)?definition.shell:channel.shell;
 let searchProvider=typeof definition.searchProvider==='function'?definition.searchProvider:null;
 const history=[];

 const state=()=>Object.freeze({type:'command-line-state',channelId,mode,shell,searchConnected:!!searchProvider,historyLength:history.length});
 const control=(input)=>{
  const source=input.value.trim(),parts=source?source.split(/\s+/u):[],head=(parts[0]??'').toLowerCase();
  if(head==='terminal'&&parts.length===1){mode='terminal';return state();}
  if(head==='search'&&parts.length===1){mode='search';return state();}
  if(head==='shell'&&parts.length===2&&SHELLS.includes(parts[1].toLowerCase())){shell=parts[1].toLowerCase();mode='shell';return state();}
  return null;
 };
 const asTransaction=(input,kind,typedInput,output)=>{const tx=Object.freeze({type:'command-line-transaction',channelId,kind,mode,shell,commandInput:input,input:typedInput,output,timestamp:new Date().toISOString()});history.push(tx);return tx;};

 const system=Object.freeze({
  type:'command-line-system',channelId,channel,state,
  history:()=>Object.freeze(Array.from(history)),
  connectSearch(provider){if(typeof provider!=='function')throw new TypeError('Search provider function required.');searchProvider=provider;return state();},
  disconnectSearch(){searchProvider=null;return state();},

  submit(input,context={}){
   if(typeof input==='string')input=channel.command.input(input,{promptId:context.promptId});
   if(!globalThis.HaamuCommandInput?.validate?.(input))throw new TypeError('Command input required.');
   if(input.channelId!==channelId)throw new Error('Cross-channel command input rejected.');

   const invocation=globalThis.HaamuCommand?.parse?.(input.value,{channelId});
   if(invocation?.command){
    const result=HaamuCommand.execute(invocation,{...context,commandLine:this,channel});
    const output=channel.terminal.output(result.state==='completed'?'stdout':'system',result.payload,result.state,{command:input.value});
    return asTransaction(input,'command',invocation,output);
   }

   const changed=control(input);
   if(changed){
    const output=channel.terminal.output('system',mode==='shell'?shell:mode,'selected',{command:input.value});
    return asTransaction(input,'control',input,output);
   }

   if(mode==='search'){
    const typed=channel.search.input(input.value);
    let output;
    if(!searchProvider)output=channel.search.output(typed.query,[],'unavailable');
    else {
     const result=searchProvider(typed.query,{...context,channelId,input:typed});
     output=result?.type==='search-output'?result:channel.search.output(typed.query,Array.isArray(result)?result:[result]);
    }
    return asTransaction(input,'search',typed,output);
   }

   if(mode==='shell'){
    const typed=globalThis.HaamuShellInput.create(input.value,{channelId,shell,source:input.promptId});
    const router=context.router;
    let output;
    if(!router?.execute)output=globalThis.HaamuShellOutput.create(shell,typed.command,'Shell router is not connected.','unavailable',{channelId,stream:'system'});
    else {
     const result=router.execute(shell,typed.command,{...context,channelId,shellInput:typed});
     output=result?.type==='shell-output'?result:globalThis.HaamuShellOutput.create(shell,typed.command,result?.payload??result,result?.state??'completed',{channelId,stream:result?.stream??'stdout'});
    }
    return asTransaction(input,'shell',typed,output);
   }

   const typed=globalThis.HaamuTerminalInput.create(input.value,{channelId,shell,source:input.promptId});
   const router=context.router;
   let output;
   if(!globalThis.HaamuTerminalShell?.execute||!router){
    output=channel.terminal.output('system','Terminal shell is not connected.','unavailable',{command:input.value});
   }else{
    const result=HaamuTerminalShell.execute(typed,router,{...context,channelId});
    output=result?.type==='terminal-output'&&result.channelId===channelId
      ? result
      : channel.terminal.output(result?.stream??'stdout',result?.payload??result,result?.state??'completed',{
          command:input.value,commandId:result?.commandId,sessionId:result?.sessionId
        });
   }
   return asTransaction(input,'terminal',typed,output);
  },

  interpret(value,context={}){return this.submit(channel.command.input(value,{promptId:context.promptId}),context);}
 });
 return system;
};

const HaamuCommandLine=Object.freeze({
 family:'command',role:'command.line',type:'terminal-shell-search-command-line',version:'0.2.1',
 modes:MODES,shells:SHELLS,create,
 forChannel(id,definition={}){
  const key=String(id??'').trim();if(!key)throw new RangeError('Command channel identity required.');
  if(!systems.has(key))systems.set(key,create(key,definition));
  return systems.get(key);
 },
 remove(id){return systems.delete(String(id));},
 channels(){return Object.freeze(Array.from(systems.keys()));}
});
globalThis.HaamuFamilies['command.line']=Object.freeze({family:'command',role:'command.line',type:'terminal-shell-search-command-line',version:'0.2.1'});
globalThis.HaamuCommandLine=HaamuCommandLine;
