'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
let sequence=0;
const HaamuTerminalInput=Object.freeze({
 family:'terminal',role:'terminal.input',type:'terminal-input-normalizer',version:'0.2.0',
 create(value,options={}){
  return Object.freeze({type:'terminal-input',value:String(value??''),shell:String(options.shell??'client'),sessionId:String(options.sessionId??'haamu'),sequence:++sequence,timestamp:new Date().toISOString(),source:String(options.source??'unbound'),channelId:String(options.channelId??'unbound')});
 }
});
globalThis.HaamuFamilies['terminal.input']=Object.freeze({family:'terminal',role:'terminal.input',type:'terminal-input-normalizer',version:'0.2.0'});
globalThis.HaamuTerminalInput=HaamuTerminalInput;
