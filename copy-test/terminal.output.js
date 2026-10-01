'use strict';

/* module-private execution scope */
(() => {
globalThis.HaamuFamilies ??= Object.create(null);
let sequence=0;
const HaamuTerminalOutput=Object.freeze({
 family:'terminal',role:'terminal.output',type:'terminal-output-contract',version:'0.2.0',
 create(shell,command,stream,payload,state='completed',options={}){
  return Object.freeze({type:'terminal-output',shell:String(shell??'client'),commandId:String(options.commandId??('terminal:'+Date.now()+':'+(sequence+1))),sessionId:String(options.sessionId??'haamu'),sequence:++sequence,timestamp:new Date().toISOString(),stream:String(stream??'stdout'),payload:String(payload??''),state:String(state),channelId:String(options.channelId??'unbound')});
 },
 validate(output){return !!output&&output.type==='terminal-output'&&typeof output.payload==='string'&&typeof output.shell==='string';}
});
globalThis.HaamuFamilies['terminal.output.contract']=Object.freeze({family:'terminal',role:'terminal.output',type:'terminal-output-contract',version:'0.2.0'});
globalThis.HaamuTerminalOutput=HaamuTerminalOutput;
})();
