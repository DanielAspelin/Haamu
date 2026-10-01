'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuVideoParsing=Object.freeze({family:'video',role:'video.parsing',type:'video-parser',version:'0.1.0',parse(value,options={}){return Object.freeze({type:'parsed-video',source:value,format:String(options.format??'unknown'),metadata:Object.freeze({...options})});}});
globalThis.HaamuFamilies['video.parsing']=Object.freeze({family:'video',role:'video.parsing',type:'video-parser',version:'0.1.0'});globalThis.HaamuVideoParsing=HaamuVideoParsing;
