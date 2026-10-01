'use strict';

/* module-private execution scope */
(() => {
globalThis.HaamuFamilies ??= Object.create(null);
const finite=(v,f)=>Number.isFinite(Number(v))?Number(v):f;
const HaamuVideoAllocation=Object.freeze({family:'video',role:'video.allocation',type:'video-allocator',version:'0.1.0',allocate(value,options={}){if(!globalThis.HaamuVideoProcessing)throw new Error('HaamuVideoProcessing unavailable.');const record=HaamuVideoProcessing.process(value,options),start=Math.max(0,finite(options.start,0));return Object.freeze({type:'video-allocation',start,end:start+record.duration,duration:record.duration,units:'seconds',record});}});
globalThis.HaamuFamilies['video.allocation']=Object.freeze({family:'video',role:'video.allocation',type:'video-allocator',version:'0.1.0'});globalThis.HaamuVideoAllocation=HaamuVideoAllocation;
})();
