'use strict';

/* module-private execution scope */
(() => {
globalThis.HaamuFamilies ??= Object.create(null);
const finite=(v,f)=>Number.isFinite(Number(v))?Number(v):f;
const HaamuAudioAllocation=Object.freeze({family:'audio',role:'audio.allocation',type:'audio-allocator',version:'0.1.0',allocate(value,options={}){if(!globalThis.HaamuAudioProcessing)throw new Error('HaamuAudioProcessing unavailable.');const record=HaamuAudioProcessing.process(value,options),start=Math.max(0,finite(options.start,0));return Object.freeze({type:'audio-allocation',start,end:start+record.duration,duration:record.duration,units:'seconds',record});}});
globalThis.HaamuFamilies['audio.allocation']=Object.freeze({family:'audio',role:'audio.allocation',type:'audio-allocator',version:'0.1.0'});globalThis.HaamuAudioAllocation=HaamuAudioAllocation;
})();
