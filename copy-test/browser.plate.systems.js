'use strict';

/**
 * Haamu Browser Plate Systems — isolated input/received-output ownership per logical Plate.
 * Projection is deliberately data-bound only; visual rendering remains deferred.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const systems=new Map();

const create=(plateId,definition={})=>{
 const channelId=String(definition.channelId??plateId);
 const outputs=[];
 const channel=globalThis.HaamuCommandChannel?.ensure?.(channelId,{shell:definition.shell??'client'});
 let area=Object.freeze({type:'plate-area',mode:'text',snap:'plate',live:false,inputPromptId:null});
 const accept=(kind,output)=>{
  if(!output)throw new TypeError('Output record required.');
  if(output.channelId&&output.channelId!=='unbound'&&output.channelId!==channelId)
   throw new Error('Cross-channel Plate output rejected.');
  const record=globalThis.HaamuBrowserOutput?.record
   ? HaamuBrowserOutput.record(kind,output,{plateId,channelId})
   : Object.freeze({type:'browser-output',kind,payload:output,metadata:Object.freeze({plateId,channelId})});
  outputs.push(record);
  return record;
 };
 return Object.freeze({
  type:'plate-input-systems',plateId,channelId,
  inputSocket:Object.freeze({type:'plate-input-socket',plateId,channelId,socket:channel?.inputSocket??null}),
  area:()=>area,
  configureArea(definition={}){
   const mode=definition.mode==='live'?'live':'text';
   let inputPromptId=null,inputSocket=null,inputChannelId=null;
   if(mode==='live'&&definition.input!==false){
    inputPromptId=String(definition.inputPromptId??(plateId+':live-prompt'));
    inputChannelId=String(definition.inputChannelId??(channelId+':live'));
    const prompt=globalThis.HaamuBrowserPromptSystems?.forPrompt?.(inputPromptId,{channelId:inputChannelId,shell:definition.shell??'client'});
    inputSocket=prompt?.outputSocket??null;
   }
   area=Object.freeze({type:'plate-area',mode,snap:'plate',live:mode==='live',plateId,inputSocket:channel?.inputSocket??null,inputPromptId,inputChannelId,promptOutputSocket:inputSocket});
   return area;
  },
  text:Object.freeze({accept:output=>accept('text',output)}),
  command:Object.freeze({accept:output=>accept('command',output)}),
  prompt:Object.freeze({accept:output=>accept('prompt',output)}),
  terminal:Object.freeze({accept:output=>accept('terminal',output)}),
  search:Object.freeze({accept:output=>accept('search',output)}),
  shell:Object.freeze({accept:output=>accept('shell',output)}),
  accept(output){
   if(output?.type==='web-text-output'||output?.type==='text-output')return this.text.accept(output);
   if(output?.type==='command-output')return this.command.accept(output);
   if(output?.type==='prompt-output')return this.prompt.accept(output);
   if(output?.type==='terminal-output')return this.terminal.accept(output);
   if(output?.type==='search-output')return this.search.accept(output);
   if(output?.type==='shell-output')return this.shell.accept(output);
   throw new TypeError('Text, command, prompt, terminal, search or shell output required.');
  },
  history:()=>Object.freeze(Array.from(outputs)),
  latest:()=>outputs.at(-1)??null
 });
};

const HaamuBrowserPlateSystems=Object.freeze({
 family:'browser',role:'browser.plate.systems',type:'per-plate-input-output-receiver',version:'0.6.1',
 forPlate(plate,definition={}){
  const plateId=String(typeof plate==='string'?plate:(plate?.id??plate?.dataset?.plate??'')).trim();
  if(!plateId)throw new RangeError('Plate identity required.');
  if(!systems.has(plateId))systems.set(plateId,create(plateId,definition));
  return systems.get(plateId);
 },
 remove(id){return systems.delete(String(id));},
 plates(){return Object.freeze(Array.from(systems.keys()));}
});
globalThis.HaamuFamilies['browser.plate.systems']=Object.freeze({family:'browser',role:'browser.plate.systems',type:'per-plate-input-output-receiver',version:'0.6.1'});
globalThis.HaamuBrowserPlateSystems=HaamuBrowserPlateSystems;
