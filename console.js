'use strict';

/**
 * Haamu Console — interactive I/O environment binding one logical Prompt
 * output socket to one corresponding Plate input socket.
 * Shell, Terminal and Search remain independent services used by a Console.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const consoles=new Map();

const create=(id,definition={})=>{
 const consoleId=String(id??'').trim();
 if(!consoleId)throw new RangeError('Console identity required.');
 const role=String(definition.role??consoleId).toLowerCase();
 const prompt=definition.prompt;
 const plate=definition.plate;
 if(!prompt?.outputSocket?.socket)throw new TypeError('Console Prompt output socket required.');
 if(!plate?.inputSocket?.socket)throw new TypeError('Console Plate input socket required.');
 if(prompt.channelId!==plate.channelId)throw new Error('Console Prompt and Plate channel mismatch.');
 const channelId=prompt.channelId;
 return Object.freeze({
  type:'console',consoleId,role,channelId,
  promptId:prompt.promptId,plateId:plate.plateId,
  outputSocket:prompt.outputSocket,
  inputSocket:plate.inputSocket,
  prompt,plate,
  topology:Object.freeze({
   source:'prompt',sourceSocket:prompt.outputSocket.socket.id,
   target:'plate',targetSocket:plate.inputSocket.socket.id,
   direction:'prompt-to-plate',
  }),
 });
};

const HaamuConsole=Object.freeze({
 family:'console',role:'console',type:'interactive-io-console',version:'0.1.0',
 create(id,definition={}){
  const key=String(id??'').trim();
  if(consoles.has(key))throw new Error('Console already exists: '+key);
  const instance=create(key,definition);consoles.set(key,instance);return instance;
 },
 ensure(id,definition={}){return consoles.get(String(id))??this.create(id,definition);},
 get:id=>consoles.get(String(id))??null,
 list:()=>Object.freeze(Array.from(consoles.values())),
});
globalThis.HaamuFamilies['console']=Object.freeze({family:'console',role:'console',type:'interactive-io-console',version:'0.1.0'});
globalThis.HaamuConsole=HaamuConsole;
