'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuWebScheduling=Object.freeze({
 family:'web',role:'web.scheduling',type:'web-scheduler-router',version:'0.1.0',
 scheduler(kind){const s={text:globalThis.HaamuTextScheduling,audio:globalThis.HaamuAudioScheduling,video:globalThis.HaamuVideoScheduling}[String(kind)];if(!s)throw new RangeError('Unavailable web scheduler: '+kind);return s;},
 schedule(kind,units,options={}){return this.scheduler(kind).schedule(units,options);}
});
globalThis.HaamuFamilies['web.scheduling']=Object.freeze({family:'web',role:'web.scheduling',type:'web-scheduler-router',version:'0.1.0'});
globalThis.HaamuWebScheduling=HaamuWebScheduling;
