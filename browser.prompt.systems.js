'use strict';

/**
 * Haamu Browser Prompt Systems — input ownership per logical Prompt.
 * A Prompt owns Command, Terminal, Search and Shell input creation only.
 * Output ownership belongs to the corresponding logical Plate.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const systems=new Map();

const create=(promptId,definition={})=>{
 const channelId=String(definition.channelId??promptId);
 const shell=String(definition.shell??'client');
 const channel=globalThis.HaamuCommandChannel?.ensure?.(channelId,{shell});
 if(!channel)throw new Error('HaamuCommandChannel unavailable.');
 channel.bindInput(promptId);
 const commandLine=globalThis.HaamuCommandLine?.forChannel?.(channelId,{channel,shell});
 if(!commandLine)throw new Error('HaamuCommandLine unavailable.');

 return Object.freeze({
  type:'prompt-input-systems',promptId,channelId,shell,channel,commandLine,
  command:Object.freeze({input:value=>channel.command.input(value,{promptId,source:'prompt'})}),
  terminal:Object.freeze({input:value=>channel.terminal.input(value,{source:promptId})}),
  search:Object.freeze({input:query=>channel.search.input(query,{source:promptId})}),
  shellInput:Object.freeze({input:command=>HaamuShellInput.create(command,{channelId,shell,source:promptId})}),
  submit(value,context={}){
   const input=channel.command.input(value,{promptId,source:'prompt'});
   return commandLine.submit(input,{...context,promptId});
  }
 });
};

const HaamuBrowserPromptSystems=Object.freeze({
 family:'browser',role:'browser.prompt.systems',type:'per-prompt-input-systems',version:'0.2.0',
 forPrompt(prompt,definition={}){
  const promptId=String(typeof prompt==='string'?prompt:(prompt?.dataset?.logicalPrompt??prompt?.id??'')).trim();
  if(!promptId)throw new RangeError('Prompt identity required.');
  if(!systems.has(promptId))systems.set(promptId,create(promptId,definition));
  return systems.get(promptId);
 },
 remove(id){return systems.delete(String(id));},
 prompts(){return Object.freeze(Array.from(systems.keys()));}
});
globalThis.HaamuFamilies['browser.prompt.systems']=Object.freeze({family:'browser',role:'browser.prompt.systems',type:'per-prompt-input-systems',version:'0.2.0'});
globalThis.HaamuBrowserPromptSystems=HaamuBrowserPromptSystems;
