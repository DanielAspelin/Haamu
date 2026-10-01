'use strict';

/**
 * Haamu Browser Prompt Systems — isolated Terminal, Search and Shell systems
 * owned by each logical prompt. Mobile/desktop projections of one prompt share
 * that prompt's systems; different prompts never share mutable system state.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const systems=new Map();
const shellTypes=Object.freeze({SERVER:'server',LOCAL:'local',GLOBAL:'global',CLIENT:'client'});

const createPromptSystems=(promptId,definition={})=>{
 const shellType=String(definition.shell??'client');
 const router=globalThis.HaamuShell?.router?.(definition.shells??{});
 const searchProvider=typeof definition.search==='function'?definition.search:null;

 const shell=Object.freeze({
  type:'prompt-shell-system',promptId,shellType,router,
  execute(command,context={}) {
   if(!router?.execute)throw new Error('Prompt shell router unavailable.');
   return router.execute(shellType,String(command??''),{...context,promptId});
  }
 });

 const search=Object.freeze({
  type:'prompt-search-system',promptId,
  connected:()=>typeof searchProvider==='function',
  execute(query,context={}) {
   const input=globalThis.HaamuTerminalInput?.create(String(query??''),{shell:shellType,source:promptId});
   if(!globalThis.HaamuTerminalSearch?.execute)throw new Error('HaamuTerminalSearch unavailable.');
   return HaamuTerminalSearch.execute(input??String(query??''),searchProvider,{...context,promptId,shell:shellType,query});
  }
 });

 const terminal=Object.freeze({
  type:'prompt-terminal-system',promptId,shellType,
  input(value,options={}) {
   if(!globalThis.HaamuTerminalInput?.create)throw new Error('HaamuTerminalInput unavailable.');
   return HaamuTerminalInput.create(value,{...options,shell:shellType,source:promptId});
  },
  execute(value,context={}) {
   const input=this.input(value,context);
   if(!globalThis.HaamuTerminalShell?.execute)throw new Error('HaamuTerminalShell unavailable.');
   return HaamuTerminalShell.execute(input,router,{...context,promptId});
  },
  process(output,plate,options={}){return globalThis.HaamuTerminal?.process(output,plate,{...options,promptId});},
  allocate(output,plate,options={}){return globalThis.HaamuTerminal?.allocate(output,plate,{...options,promptId});},
  render(output,plate,options={}){return globalThis.HaamuTerminal?.render(output,plate,{...options,promptId});}
 });

 return Object.freeze({type:'prompt-systems',promptId,shellType,terminal,search,shell});
};

const HaamuBrowserPromptSystems=Object.freeze({
 family:'browser',role:'browser.prompt.systems',type:'per-prompt-systems',version:'0.1.0',
 forPrompt(prompt,definition={}){
  const promptId=String(typeof prompt==='string'?prompt:(prompt?.dataset?.logicalPrompt??prompt?.id??'')).trim();
  if(!promptId)throw new RangeError('Prompt identity required.');
  if(!systems.has(promptId))systems.set(promptId,createPromptSystems(promptId,definition));
  return systems.get(promptId);
 },
 configure(prompt,definition={}){
  const promptId=String(typeof prompt==='string'?prompt:(prompt?.dataset?.logicalPrompt??prompt?.id??'')).trim();
  if(!promptId)throw new RangeError('Prompt identity required.');
  systems.set(promptId,createPromptSystems(promptId,definition));
  return systems.get(promptId);
 },
 remove(promptId){return systems.delete(String(promptId));},
 prompts(){return Object.freeze(Array.from(systems.keys()));},
 shellTypeForTitle(title){return shellTypes[String(title??'').toUpperCase()]??'client';}
});

globalThis.HaamuFamilies['browser.prompt.systems']=Object.freeze({
 family:HaamuBrowserPromptSystems.family,role:HaamuBrowserPromptSystems.role,
 type:HaamuBrowserPromptSystems.type,version:HaamuBrowserPromptSystems.version,
});
globalThis.HaamuBrowserPromptSystems=HaamuBrowserPromptSystems;
