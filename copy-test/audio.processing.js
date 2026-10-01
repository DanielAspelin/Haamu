'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const finite=(v,f)=>Number.isFinite(Number(v))?Number(v):f;
const HaamuAudioProcessing=Object.freeze({family:'audio',role:'audio.processing',type:'audio-processor',version:'0.1.0',process(value,options={}){if(!globalThis.HaamuAudioParsing)throw new Error('HaamuAudioParsing unavailable.');const parsed=HaamuAudioParsing.parse(value,options);return Object.freeze({type:'audio',source:value,parsed,sampleRate:finite(options.sampleRate,48000),channels:Math.max(1,Math.trunc(finite(options.channels,2))),duration:Math.max(0,finite(options.duration,0)),format:parsed.format});}});
globalThis.HaamuFamilies['audio.processing']=Object.freeze({family:'audio',role:'audio.processing',type:'audio-processor',version:'0.1.0'});globalThis.HaamuAudioProcessing=HaamuAudioProcessing;
