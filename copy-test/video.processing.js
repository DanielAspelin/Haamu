'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const finite=(v,f)=>Number.isFinite(Number(v))?Number(v):f;
const HaamuVideoProcessing=Object.freeze({family:'video',role:'video.processing',type:'video-processor',version:'0.1.0',process(value,options={}){if(!globalThis.HaamuVideoParsing)throw new Error('HaamuVideoParsing unavailable.');const parsed=HaamuVideoParsing.parse(value,options);return Object.freeze({type:'video',source:value,parsed,width:Math.max(0,Math.trunc(finite(options.width,0))),height:Math.max(0,Math.trunc(finite(options.height,0))),frameRate:Math.max(0,finite(options.frameRate,0)),duration:Math.max(0,finite(options.duration,0)),format:parsed.format});}});
globalThis.HaamuFamilies['video.processing']=Object.freeze({family:'video',role:'video.processing',type:'video-processor',version:'0.1.0'});globalThis.HaamuVideoProcessing=HaamuVideoProcessing;
