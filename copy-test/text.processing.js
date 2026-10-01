'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuTextProcessing=Object.freeze({
 family:'text',role:'text.processing',type:'text-processor',version:'0.1.0',
 process(value,options={}){
  if(!globalThis.HaamuTextParsing)throw new Error('HaamuTextParsing unavailable.');
  const text=HaamuTextParsing.normalize(value,options.normalization??'NFC'),characters=Array.from(text),parsed=HaamuTextParsing.parse(text,options);
  return Object.freeze({type:'text',text,parsed,lines:Object.freeze(text.split(/\r?\n/)),words:Object.freeze(text.trim()?text.trim().split(/\s+/u):[]),characters:Object.freeze(characters),codePoints:Object.freeze(characters.map(c=>c.codePointAt(0))),direction:options.direction??'auto',language:options.language??'und',writingMode:options.writingMode??'horizontal-tb'});
 }
});
globalThis.HaamuFamilies['text.processing']=Object.freeze({family:'text',role:'text.processing',type:'text-processor',version:'0.1.0'});globalThis.HaamuTextProcessing=HaamuTextProcessing;
