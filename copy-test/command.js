'use strict';

/**
 * Haamu Command — renderer-independent command contract and registry.
 *
 * Companion to Command Line: Command defines/validates individual commands;
 * Command Line owns interactive mode, routing and history. Registration grants
 * no execution, network, shell or privilege authority.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const registry=new Map();
let sequence=0;

const normalizeName=value=>{
 const name=String(value??'').trim().toLowerCase();
 if(!/^[a-z][a-z0-9._-]*$/u.test(name))throw new RangeError('Invalid command name.');
 return name;
};

const HaamuCommand=Object.freeze({
 family:'command',role:'command.system',type:'command-contract-registry',version:'0.1.0',

 create(name,definition={}){
  const commandName=normalizeName(name);
  const aliases=Object.freeze(Array.from(new Set((definition.aliases??[]).map(normalizeName))));
  return Object.freeze({
   type:'command',id:String(definition.id??('command:'+commandName)),
   name:commandName,aliases,
   description:String(definition.description??''),
   target:String(definition.target??'terminal'),
   authority:String(definition.authority??'ungranted'),
   execute:typeof definition.execute==='function'?definition.execute:null
  });
 },

 register(command){
  if(!command||command.type!=='command')throw new TypeError('Command record required.');
  if(registry.has(command.name))throw new Error('Command already registered: '+command.name);
  for(const alias of command.aliases){
   if(registry.has(alias))throw new Error('Command alias already registered: '+alias);
  }
  registry.set(command.name,command);
  for(const alias of command.aliases)registry.set(alias,command);
  return command;
 },

 define(name,definition={}){
  return this.register(this.create(name,definition));
 },

 resolve(name){
  const key=String(name??'').trim().toLowerCase();
  return registry.get(key)??null;
 },

 parse(value,options={}){
  const source=String(value??'').trim();
  const parts=source?source.split(/\s+/u):[];
  const name=parts.shift()?.toLowerCase()??'';
  const command=name?this.resolve(name):null;
  return Object.freeze({
   type:'command-invocation',id:'invocation:'+(++sequence),
   channelId:String(options.channelId??'unbound'),
   source,name,args:Object.freeze(parts),command,
   timestamp:new Date().toISOString()
  });
 },

 execute(invocation,context={}){
  if(!invocation||invocation.type!=='command-invocation')throw new TypeError('Command invocation required.');
  if(!invocation.command)return Object.freeze({
   type:'command-result',invocationId:invocation.id,channelId:invocation.channelId,
   state:'unknown',payload:'Unknown command: '+invocation.name
  });
  if(typeof invocation.command.execute!=='function')return Object.freeze({
   type:'command-result',invocationId:invocation.id,channelId:invocation.channelId,
   state:'unavailable',payload:'Command is registered but has no executor.'
  });
  const result=invocation.command.execute(invocation.args,{...context,invocation});
  return result?.type==='command-result'?result:Object.freeze({
   type:'command-result',invocationId:invocation.id,channelId:invocation.channelId,
   state:'completed',payload:result
  });
 },

 list(){
  return Object.freeze(Array.from(new Set(registry.values())));
 }
});

globalThis.HaamuFamilies['command.system']=Object.freeze({
 family:HaamuCommand.family,role:HaamuCommand.role,type:HaamuCommand.type,version:HaamuCommand.version,
});
globalThis.HaamuCommand=HaamuCommand;
