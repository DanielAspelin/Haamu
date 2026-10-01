'use strict';

/**
 * Haamu Command Channel — renderer-independent Prompt/Plate preparation.
 *
 * A channel owns distinct Terminal, Search and Shell input/output contracts.
 * No DOM, Prompt or Plate is bound here. Bindings are intentionally deferred.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const channels=new Map();

const HaamuCommandChannel=Object.freeze({
 family:'command',role:'command.channel',type:'isolated-command-channel',version:'0.1.0',
 create(id,definition={}){
  const channelId=String(id??'').trim();
  if(!channelId)throw new RangeError('Command channel identity required.');
  if(channels.has(channelId))throw new Error('Command channel already exists: '+channelId);
  const shell=String(definition.shell??'client');
  const channel=Object.freeze({
   type:'command-channel',channelId,shell,
   binding:Object.freeze({input:'unbound',output:'unbound'}),
   terminal:Object.freeze({
    input:(value,options={})=>HaamuTerminalInput.create(value,{...options,shell,source:options.source??channelId,channelId}),
    output:(stream,payload,state='completed',options={})=>HaamuTerminalOutput.create(shell,options.command??'',stream,payload,state,{...options,channelId})
   }),
   search:Object.freeze({
    input:(query,options={})=>HaamuSearchInput.create(query,{...options,source:options.source??channelId,channelId}),
    output:(query,results,state='completed',options={})=>HaamuSearchOutput.create(query,results,state,{...options,channelId})
   }),
   shell:Object.freeze({
    input:(command,options={})=>HaamuShellInput.create(command,{...options,shell,source:options.source??channelId,channelId}),
    output:(command,payload,state='completed',options={})=>HaamuShellOutput.create(shell,command,payload,state,{...options,channelId})
   })
  });
  channels.set(channelId,channel);
  return channel;
 },
 get(id){return channels.get(String(id))??null;},
 list(){return Object.freeze(Array.from(channels.values()));},
 remove(id){return channels.delete(String(id));}
});
globalThis.HaamuFamilies['command.channel']=Object.freeze({family:'command',role:'command.channel',type:'isolated-command-channel',version:'0.1.0'});
globalThis.HaamuCommandChannel=HaamuCommandChannel;
