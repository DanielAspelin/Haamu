'use strict';

/**
 * Haamu Command Channel — isolated directional command transport.
 * Input may bind to one logical Prompt; output may bind to one logical Plate.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const channels=new Map();

const HaamuCommandChannel=Object.freeze({
 family:'command',role:'command.channel',type:'isolated-command-channel',version:'0.2.1',
 create(id,definition={}){
  const channelId=String(id??'').trim();
  if(!channelId)throw new RangeError('Command channel identity required.');
  if(channels.has(channelId))throw new Error('Command channel already exists: '+channelId);
  const shell=String(definition.shell??'client');
  let inputOwner=null,outputOwner=null;

  const channel=Object.freeze({
   type:'command-channel',channelId,shell,
   binding:()=>Object.freeze({input:inputOwner,output:outputOwner}),
   bindInput(promptId){
    const next=String(promptId??'').trim();if(!next)throw new RangeError('Prompt identity required.');
    if(inputOwner&&inputOwner!==next)throw new Error('Command channel input is already bound.');
    inputOwner=next;return this.binding();
   },
   bindOutput(plateId){
    const next=String(plateId??'').trim();if(!next)throw new RangeError('Plate identity required.');
    if(outputOwner&&outputOwner!==next)throw new Error('Command channel output is already bound.');
    outputOwner=next;return this.binding();
   },
   command:Object.freeze({
    input:(value,options={})=>HaamuCommandInput.create(value,{...options,channelId,promptId:options.promptId??inputOwner??'unbound'})
   }),
   terminal:Object.freeze({
    input:(value,options={})=>HaamuTerminalInput.create(value,{...options,shell,source:options.source??inputOwner??channelId,channelId}),
    output:(stream,payload,state='completed',options={})=>HaamuTerminalOutput.create(options.shell??shell,options.command??'',stream,payload,state,{...options,channelId})
   }),
   search:Object.freeze({
    input:(query,options={})=>HaamuSearchInput.create(query,{...options,source:options.source??inputOwner??channelId,channelId}),
    output:(query,results,state='completed',options={})=>HaamuSearchOutput.create(query,results,state,{...options,channelId})
   }),
   shell:Object.freeze({
    input:(command,options={})=>HaamuShellInput.create(command,{...options,shell:options.shell??shell,source:options.source??inputOwner??channelId,channelId}),
    output:(command,payload,state='completed',options={})=>HaamuShellOutput.create(options.shell??shell,command,payload,state,{...options,channelId})
   })
  });
  channels.set(channelId,channel);
  return channel;
 },
 get(id){return channels.get(String(id))??null;},
 ensure(id,definition={}){return this.get(id)??this.create(id,definition);},
 list(){return Object.freeze(Array.from(channels.values()));},
 remove(id){return channels.delete(String(id));}
});
globalThis.HaamuFamilies['command.channel']=Object.freeze({family:'command',role:'command.channel',type:'isolated-command-channel',version:'0.2.1'});
globalThis.HaamuCommandChannel=HaamuCommandChannel;
