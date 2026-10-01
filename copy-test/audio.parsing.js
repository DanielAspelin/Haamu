'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuAudioParsing=Object.freeze({family:'audio',role:'audio.parsing',type:'audio-parser',version:'0.1.0',parse(value,options={}){return Object.freeze({type:'parsed-audio',source:value,format:String(options.format??'unknown'),metadata:Object.freeze({...options})});}});
globalThis.HaamuFamilies['audio.parsing']=Object.freeze({family:'audio',role:'audio.parsing',type:'audio-parser',version:'0.1.0'});globalThis.HaamuAudioParsing=HaamuAudioParsing;
