'use strict';


/* module-private execution scope */
(() => {
/** Haamu Shell Input — renderer-independent shell ingress contract. */
globalThis.HaamuFamilies ??= Object.create(null);
let sequence=0;
const HaamuShellInput=Object.freeze({
 family:'shell',role:'shell.input',type:'shell-input-contract',version:'0.1.0',
 create(command,options={}){
  return Object.freeze({
   type:'shell-input',command:String(command??''),shell:String(options.shell??'client'),
   channelId:String(options.channelId??'unbound'),sessionId:String(options.sessionId??'haamu'),
   sequence:++sequence,timestamp:new Date().toISOString(),
   source:String(options.source??'unbound')
  });
 },
 validate(input){return !!input&&input.type==='shell-input'&&typeof input.command==='string'&&typeof input.shell==='string'&&typeof input.channelId==='string';}
});
globalThis.HaamuFamilies['shell.input']=Object.freeze({family:'shell',role:'shell.input',type:'shell-input-contract',version:'0.1.0'});
globalThis.HaamuShellInput=HaamuShellInput;
})();
