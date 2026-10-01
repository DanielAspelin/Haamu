'use strict';

/**
 * Haamu Browser Prompt Systems — governed input ownership per logical Prompt.
 * Prompt interprets and records input intent; execution authority remains with
 * Command, Shell, Search, Terminal or later provider boundaries.
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
 if(!commandLine)throw new Error('HaamuCommandLine unavailable.');

 const transition=(next,detail={})=>{
  if(!PROMPT_STATES.includes(next))throw new RangeError('Unknown Prompt state.');
  const prior=promptStates.get(promptId);
  const snapshot=Object.freeze({
   type:'prompt-state',promptId,state:next,previous:prior?.state??null,
   reason:detail.reason??null,sequence:(prior?.sequence??0)+1,
  });
  promptStates.set(promptId,snapshot);
  return snapshot;
 };

 const interpret=value=>{
  const source=String(value??'');
  const trimmed=source.trim();
  const prefix=trimmed.match(/^([?!>$])\s*/)?.[1]??null;
  const mode=prefix==='?'?'search':prefix==='!'||prefix==='$'?'shell':prefix==='>'?'prompt':'command';
  const body=prefix?trimmed.slice(1).trimStart():source;
  return Object.freeze({
   type:'prompt-interpretation',mode,source,body,prefix,
   structured:Object.freeze({
    instruction:mode==='prompt'?body:null,
    query:mode==='search'?body:null,
    command:(mode==='command'||mode==='shell')?body:null,
    context:null,
   }),
  });
 };

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
   mode:metadata.mode??interpret(source).mode,sequence:entries.length+1,
  });
  entries.push(entry);
  return entry;
 };
 const recall=(offset=1)=>{
  const entries=history();
  const distance=Math.max(1,Math.trunc(Number(offset)||1));
  return entries[Math.max(0,entries.length-distance)]??null;
 };
 const complete=(value,candidates=[])=>{
  const source=String(value??'');
  const matches=Array.from(new Set(candidates.map(String))).filter(candidate=>candidate.startsWith(source));
  return Object.freeze({type:'prompt-completion',source,matches:Object.freeze(matches),exact:matches.includes(source)});
 };
 const suggest=(value,candidates=[])=>{
  const raw=String(value??''),source=raw.toLowerCase();
  const matches=Array.from(new Set(candidates.map(String))).filter(candidate=>candidate.toLowerCase().includes(source));
  return Object.freeze({type:'prompt-suggestion',source:raw,matches:Object.freeze(matches)});
 };

 transition('ready',{reason:'created'});

 return Object.freeze({
  type:'prompt-input-systems',promptId,channelId,shell,channel,commandLine,
  state:()=>promptStates.get(promptId),transition,interpret,remember,recall,
  history:()=>Object.freeze([...history()]),complete,suggest,
  command:Object.freeze({input:value=>channel.command.input(value,{promptId,source:'prompt'})}),
  terminal:Object.freeze({input:value=>channel.terminal.input(value,{source:promptId})}),
  search:Object.freeze({input:query=>channel.search.input(query,{source:promptId})}),
  shellInput:Object.freeze({input:command=>HaamuShellInput.create(command,{channelId,shell,source:promptId})}),
  submit(value,context={}){
   const input=channel.command.input(value,{promptId,source:'prompt'});
   return commandLine.submit(input,{...context,promptId});
  },
 });
};

const HaamuBrowserPromptSystems=Object.freeze({
 family:'browser',role:'browser.prompt.systems',type:'per-prompt-input-systems',version:'0.5.1',
 forPrompt(prompt,definition={}){
  const promptId=String(typeof prompt==='string'?prompt:(prompt?.dataset?.logicalPrompt??prompt?.id??'')).trim();
  if(!promptId)throw new RangeError('Prompt identity required.');
  if(!systems.has(promptId))systems.set(promptId,create(promptId,definition));
  return systems.get(promptId);
 },
 remove(id){id=String(id);promptStates.delete(id);promptHistories.delete(id);return systems.delete(id);},
 prompts:()=>Object.freeze(Array.from(systems.keys())),
});
globalThis.HaamuFamilies['browser.prompt.systems']=Object.freeze({
 family:'browser',role:'browser.prompt.systems',type:'per-prompt-input-systems',version:'0.5.1'
});
globalThis.HaamuBrowserPromptSystems=HaamuBrowserPromptSystems;
