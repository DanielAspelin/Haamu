'use strict';

/**
 * Haamu Browser Prompt Systems — input ownership per logical Prompt.
 * A Prompt owns Command, Terminal, Search and Shell input creation only.
 * Output ownership belongs to the corresponding logical Plate.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const systems=new Map();
const promptStates=new Map();
const promptHistories=new Map();
const PROMPT_STATES=Object.freeze(['ready','primary','continuation','submitted','executing']);

const create=(promptId,definition={})=>{
 const channelId=String(definition.channelId??promptId);
 const shell=String(definition.shell??'client');
 const channel=globalThis.HaamuCommandChannel?.ensure?.(channelId,{shell});
 if(!channel)throw new Error('HaamuCommandChannel unavailable.');
 channel.bindInput(promptId);
 const commandLine=globalThis.HaamuCommandLine?.forChannel?.(channelId,{channel,shell});
 const transition=(next,detail={})=>{
  if(!PROMPT_STATES.includes(next))throw new RangeError('Unknown Prompt state.');
  const previous=promptStates.get(promptId)?.state ?? null;
  const snapshot=Object.freeze({
   type:'prompt-state',promptId,state:next,previous,
   reason:detail.reason ?? null,sequence:(promptStates.get(promptId)?.sequence ?? 0)+1,
  });
  promptStates.set(promptId,snapshot);
  return snapshot;
 };
 transition('ready',{reason:'created'});
 if(!commandLine)throw new Error('HaamuCommandLine unavailable.');

 const history=()=>{
  if(!promptHistories.has(promptId))promptHistories.set(promptId,[]);
  return promptHistories.get(promptId);
 };
 const remember=(value,metadata={})=>{
  const source=String(value??'');
  if(!source.trim())return null;
  const entries=history();
  const entry=Object.freeze({
   type:'prompt-history-entry',promptId,value:source,
   mode:metadata.mode ?? interpret(source).mode,
   sequence:entries.length+1,
  });
  entries.push(entry);
  return entry;
 };
 const recall=(offset=1)=>{
  const entries=history();
  const index=Math.max(0,entries.length-Math.max(1,Math.trunc(Number(offset)||1)));
  return entries[index] ?? null;
 };
 const complete=(value,candidates=[])=>{
  const source=String(value??'');
  const matches=Array.from(new Set(candidates.map(String))).filter(candidate=>candidate.startsWith(source));
  return Object.freeze({type:'prompt-completion',source,matches:Object.freeze(matches),exact:matches.includes(source)});
 };
 const suggest=(value,candidates=[])=>{
  const source=String(value??'').toLowerCase();
  const matches=Array.from(new Set(candidates.map(String))).filter(candidate=>candidate.toLowerCase().includes(source));
  return Object.freeze({type:'prompt-suggestion',source:String(value??''),matches:Object.freeze(matches)});
 };

 const interpret=value=>{
  const source=String(value??'');
  const trimmed=source.trim();
  const prefix=trimmed.match(/^([?!>$])\s*/)?.[1] ?? null;
  const mode=prefix==='?'?'search':prefix==='!'||prefix===',promptId,channelId,shell,channel,commandLine,
  state(){return promptStates.get(promptId);},
  transition,
  interpret,
  remember,
  recall,
  history(){return Object.freeze([...history()]);},
  complete,
  suggest,
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
 family:'browser',role:'browser.prompt.systems',type:'per-prompt-input-systems',version:'0.5.0',
 forPrompt(prompt,definition={}){
  const promptId=String(typeof prompt==='string'?prompt:(prompt?.dataset?.logicalPrompt??prompt?.id??'')).trim();
  if(!promptId)throw new RangeError('Prompt identity required.');
  if(!systems.has(promptId))systems.set(promptId,create(promptId,definition));
  return systems.get(promptId);
 },
 remove(id){id=String(id);promptStates.delete(id);promptHistories.delete(id);return systems.delete(id);},
 prompts(){return Object.freeze(Array.from(systems.keys()));}
});
globalThis.HaamuFamilies['browser.prompt.systems']=Object.freeze({family:'browser',role:'browser.prompt.systems',type:'per-prompt-input-systems',version:'0.4.0'});
globalThis.HaamuBrowserPromptSystems=HaamuBrowserPromptSystems;
?'shell':prefix==='>'?'prompt':'command';
  const body=prefix?trimmed.slice(trimmed.indexOf(prefix)+1).trimStart():source;
  return Object.freeze({
   type:'prompt-interpretation',mode,source,body,prefix,
   structured:Object.freeze({
    instruction:mode==='prompt'?body:null,
    query:mode==='search'?body:null,
    command:(mode==='command'||mode==='shell')?body:null,
    context:null,
   })
  });
 };

 return Object.freeze({
  type:'prompt-input-systems',promptId,channelId,shell,channel,commandLine,
  state(){return promptStates.get(promptId);},
  transition,
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
 family:'browser',role:'browser.prompt.systems',type:'per-prompt-input-systems',version:'0.4.0',
 forPrompt(prompt,definition={}){
  const promptId=String(typeof prompt==='string'?prompt:(prompt?.dataset?.logicalPrompt??prompt?.id??'')).trim();
  if(!promptId)throw new RangeError('Prompt identity required.');
  if(!systems.has(promptId))systems.set(promptId,create(promptId,definition));
  return systems.get(promptId);
 },
 remove(id){id=String(id);promptStates.delete(id);return systems.delete(id);},
 prompts(){return Object.freeze(Array.from(systems.keys()));}
});
globalThis.HaamuFamilies['browser.prompt.systems']=Object.freeze({family:'browser',role:'browser.prompt.systems',type:'per-prompt-input-systems',version:'0.3.0'});
globalThis.HaamuBrowserPromptSystems=HaamuBrowserPromptSystems;
