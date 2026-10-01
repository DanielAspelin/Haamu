'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const registry=Object.freeze({
 text:()=>globalThis.HaamuTextParsing,
 audio:()=>globalThis.HaamuAudioParsing,
 video:()=>globalThis.HaamuVideoParsing,
});
const HaamuWebParsing=Object.freeze({
 family:'web',role:'web.parsing',type:'web-parser-router',version:'0.1.0',
 parser(kind){const get=registry[String(kind)];const parser=get?.();if(!parser)throw new RangeError('Unavailable web parser: '+kind);return parser;},
 parse(kind,value,options={}){return this.parser(kind).parse(value,options);}
});
globalThis.HaamuFamilies['web.parsing']=Object.freeze({family:'web',role:'web.parsing',type:'web-parser-router',version:'0.1.0'});
globalThis.HaamuWebParsing=HaamuWebParsing;
