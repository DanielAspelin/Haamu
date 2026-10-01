'use strict';


/* module-private execution scope */
(() => {
/**
 * Haamu Command Input — command ingress contract.
 * Ownership is assigned by a later Prompt binding; this module has no DOM.
 */
globalThis.HaamuFamilies ??= Object.create(null);
let sequence=0;
const HaamuCommandInput=Object.freeze({
 family:'command',role:'command.input',type:'command-input-contract',version:'0.1.0',
 create(value,options={}){
  return Object.freeze({
   type:'command-input',value:String(value??''),
   channelId:String(options.channelId??'unbound'),
   promptId:String(options.promptId??'unbound'),
   sessionId:String(options.sessionId??'haamu'),
   sequence:++sequence,timestamp:new Date().toISOString(),
   source:String(options.source??'prompt')
  });
 },
 validate(input){return !!input&&input.type==='command-input'&&typeof input.value==='string'&&typeof input.channelId==='string';}
});
globalThis.HaamuFamilies['command.input']=Object.freeze({family:'command',role:'command.input',type:'command-input-contract',version:'0.1.0'});
globalThis.HaamuCommandInput=HaamuCommandInput;
})();
