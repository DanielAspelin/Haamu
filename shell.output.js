'use strict';

/** Haamu Shell Output — renderer-independent shell egress contract. */
globalThis.HaamuFamilies ??= Object.create(null);
let sequence=0;
const HaamuShellOutput=Object.freeze({
 family:'shell',role:'shell.output',type:'shell-output-contract',version:'0.1.0',
 create(shell,command,payload,state='completed',options={}){
  return Object.freeze({
   type:'shell-output',shell:String(shell??'client'),command:String(command??''),
   payload:String(payload??''),state:String(state),stream:String(options.stream??'stdout'),
   channelId:String(options.channelId??'unbound'),sessionId:String(options.sessionId??'haamu'),
   sequence:++sequence,timestamp:new Date().toISOString()
  });
 },
 validate(output){return !!output&&output.type==='shell-output'&&typeof output.payload==='string'&&typeof output.channelId==='string';}
});
globalThis.HaamuFamilies['shell.output']=Object.freeze({family:'shell',role:'shell.output',type:'shell-output-contract',version:'0.1.0'});
globalThis.HaamuShellOutput=HaamuShellOutput;
